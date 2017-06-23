import * as chai from 'chai';
import * as sinon from 'sinon';
import * as mocha from 'mocha';

import { Http, JSONResponse } from "../src/core/http";
import { ResourceDescriptor, ResourceDescriptorCollection, ResourceSynopsis } from "../src/model/resource-descriptor";
import { APIConfig } from "../src/model/api-config";
const assert = chai.assert;

let http: Http
let prodDesc: ResourceDescriptor

describe('Http', () => {

    it('should connect successfully', (done) => {
        http = Http.instance
        http.connect({ url: "http://localhost:3001", key: "1XNCKZMANDQ8BFWGPPS5G8UNG7CL3Z7A" })
            .subscribe((response: JSONResponse) => {
                if (response.ok)
                    done()
                else
                    done("authentication fail")
            },
            (error: any) => {
                done(error)
            })

    });

    it('should get languages', (done) => {
        http.get("languages", { display: "full" })
            .subscribe((response: JSONResponse) => {
                if (response.ok)
                    done()
                else
                    done("get languages fail")
            },
            (error: any) => {
                done(error)
            })
    })

    it('should get resource descriptors', (done) => {
        http.getResourceDescriptorCollection().subscribe((result: ResourceDescriptorCollection) => {
            chai.expect(result).to.not.null
            chai.expect(result).to.not.undefined
            let n: number = 0
            let productsFound: boolean = true
            for (let p in result) {
                if (!productsFound && p == "products")
                    productsFound = true
                n++
            }
            chai.expect(n).to.be.greaterThan(0)
            let desc: ResourceDescriptor = result["products"]
            chai.expect(desc.get).to.be.true
            chai.expect(desc.post).to.be.true
            chai.expect(desc.put).to.be.true
            chai.expect(desc.delete).to.be.true
            prodDesc = desc
            done()
        },
            error => {
                done(error)
            })
    })
    it('should get resource synopsis', (done) => {
        http.getSynopsis("products").subscribe((synopsis: ResourceSynopsis) => {
            chai.expect(synopsis).to.not.null
            chai.expect(synopsis).to.not.undefined
            chai.expect(synopsis.nodeName).to.equal("product")
            chai.expect(synopsis.properties).to.not.null
            chai.expect(synopsis.properties).to.not.undefined

            chai.expect(synopsis.properties["active"]).to.not.undefined
            chai.expect(synopsis.properties["active"]).to.not.null
            chai.expect(synopsis.properties["active"].readOnly).to.be.false
            chai.expect(synopsis.properties["active"].required).to.be.false
            chai.expect(synopsis.properties["active"].translatable).to.be.false
            chai.expect(synopsis.properties["active"].validator).to.not.null
            chai.expect(synopsis.properties["active"].validator).to.not.undefined
            chai.expect(synopsis.properties["active"].validator.method).to.equal("isBool")
            chai.expect(synopsis.properties["active"].validator.maxSize).to.equal(0)
            chai.expect(synopsis.properties["active"].validator.maxSize).to.equal(0)

            chai.expect(synopsis.associations).not.to.null
            chai.expect(synopsis.associations).not.to.undefined
            chai.expect(synopsis.associations["product_bundle"]).not.to.undefined
            chai.expect(synopsis.associations["product_bundle"]).not.to.null
            chai.expect(synopsis.associations["product_bundle"]["product"]).not.to.null
            chai.expect(synopsis.associations.product_bundle.product).not.to.undefined
            chai.expect(synopsis.associations.product_bundle.product.id).to.be.true
            chai.expect(synopsis.associations["product_bundle"]["product"]["quantity"]).not.to.undefined
            chai.expect(synopsis.associations["product_bundle"]["product"]["quantity"]).not.to.null
            chai.expect(synopsis.associations["product_bundle"]["product"]["quantity"]).to.be.false
            done()
        })
    })
})