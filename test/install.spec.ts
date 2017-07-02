require("./http.spec.ts")
import { TestHelper } from './test-helpers'
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as mocha from 'mocha';
import * as fs from 'fs';
import * as path from 'path';

import { Http } from "../src/core/http";
import { 
    ResourceDescriptor,
    ResourceSynopsis
 } from "../src/model/resource-descriptor";
import { 
    InstallController, 
    LIB_DIRNAME, 
    InstallEvent, 
    InstallStatus, 
    InstallProcess 
} from "../src/core/install-controller";
import { TemplatesManager } from "../src/model/templates-manager";

import { TestData } from "./test-data";

let testData: TestData = TestData.instance
let http: Http = Http.instance
let errorFlag: boolean = false
let rmdir = TestHelper.rmdir

const CURRENT_DIR: string = path.join(path.dirname(path.dirname(__dirname)) ,"ps-api-output")
const LIB_DIR_PATH: string = path.join( CURRENT_DIR, LIB_DIRNAME )

let ctrl: InstallController
let expect = chai.expect

describe('InstallController', () => {

    before(() => {
        if (!http.connected)
            throw new Error("http must be connected ! Aborting!")
        ctrl = new InstallController()
        rmdir(LIB_DIR_PATH)
        if(! ctrl.checkDirectory(CURRENT_DIR)) {
            throw new Error("Invalide output directory ! Aborting!")
        }
    })

    afterEach(() => {
        if (errorFlag) {

            throw new Error("An error as occured ! Aborting!")
        }
    })

    it('should create vos', (done) => {
        let sub: any = ctrl.notifier.subscribe((event: InstallEvent) => {
            expect(event.process).to.equal(InstallProcess.VO)
            if (event.process == InstallProcess.VO && event.status == InstallStatus.COMPLETE) {
                sub.unsubscribe()
                done()
            }
        },
        error => {
            done(error)
        })
        ctrl.makeInstall(testData.resourceDescriptors)
        expect(fs.existsSync(LIB_DIR_PATH)).to.be.true
    })

    it("should watch create descriptors", (done) => {
        let sub: any = ctrl.notifier.subscribe((event: InstallEvent) => {
            expect(event.process).to.equal(InstallProcess.VO_DESCRIPTOR)
            if (event.process == InstallProcess.VO_DESCRIPTOR && event.status == InstallStatus.COMPLETE) {
                sub.unsubscribe()
                done()
            }
        })
    })

    it("should watch create services", (done) => {
        let sub: any = ctrl.notifier.subscribe((event: InstallEvent) => {
            expect(event.process).to.equal(InstallProcess.VO_SERVICES)
            if (event.process == InstallProcess.VO_SERVICES && event.status == InstallStatus.COMPLETE) {
                sub.unsubscribe()
                done()
            }
        })
    })

    it("should create a simple prestashop object", (done) => {
        http.getSynopsis("addresses").subscribe((synopsis: ResourceSynopsis) => {
            fs.writeFileSync(
                path.join(CURRENT_DIR, "test-object.ts"),
                TemplatesManager.interfaceTamplate(synopsis)
            )
            done()
        })
    })

    it("should create a prestashop object with associations", (done) => {
        http.getSynopsis("products").subscribe((synopsis: ResourceSynopsis) => {
            fs.appendFileSync(
                path.join(CURRENT_DIR, "test-object.ts"),
                TemplatesManager.interfaceTamplate(synopsis)
            )
            done()
        })
    })

    it("should create a simple descriptor", (done) => {
        
        http.getSynopsis("addresses").subscribe((synopsis: ResourceSynopsis) => {
            fs.writeFileSync(
                path.join(CURRENT_DIR, "test-descriptor.ts"),
                TemplatesManager.descriptorTemplate(synopsis, {
                    get: true,
                    post: true,
                    put: true,
                    delete: true,
                    synopsis: true,
                    resource: "addresses"
                })
            )
            done()
        })
    })

    it("should create a descriptor with associations", (done) => {
        
        http.getSynopsis("products").subscribe((synopsis: ResourceSynopsis) => {
            fs.appendFileSync(
                path.join(CURRENT_DIR, "test-descriptor.ts"),
                TemplatesManager.descriptorTemplate(synopsis, {
                    get: true,
                    post: true,
                    put: true,
                    delete: true,
                    synopsis: true,
                    resource: "products"
                })
            )
            done()
        })
    })

    it("should stop process", (done) => {
        console.log("INSTALL TEST DONE")
        setTimeout(()=>{
            done()
        }, 100)
    })
})