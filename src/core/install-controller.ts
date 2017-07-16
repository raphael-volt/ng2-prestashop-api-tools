import { Subject } from "rxjs";
import {
    ResourceDescriptorCollection,
    ResourceDescriptor,
    ResourceSynopsis
} from "../model/resource-descriptor";
import { Http } from './http'
import {
    TemplatesManager,
    LIBRARY_NAME,
    CORE_DIRNAME,
    SHARED_DIRNAME,
    RESOURCE_TYPES_FILENAME,
    RESOURCE_DESCRIPTOR_FILENAME,
    RESOURCE_SERVICE_FILENAME
} from "../model/templates-manager"
import { ProgressBar } from "../utils/progress-bar";

import * as fs from "fs-extra"
import * as path from 'path'

export const LIB_DIRNAME: string = LIBRARY_NAME
export const VO_FILENAME: string = RESOURCE_TYPES_FILENAME + ".ts"

export enum InstallProcess {
    VO,
    VO_DESCRIPTOR,
    VO_SERVICES,
    FORM
}

export enum InstallStatus {
    INIT,
    PROGRESS,
    COMPLETE
}

export interface InstallEvent {
    process: InstallProcess,
    status: InstallStatus,
    progress: number,
    total: number
}

export class InstallController {

    readonly notifier: Subject<InstallEvent> = new Subject<InstallEvent>()

    private http: Http = Http.instance
    private currentDir: string
    checkDirectory(currentDir: string): boolean {
        this.currentDir = fs.pathExistsSync(path.join(currentDir, LIB_DIRNAME)) ?
            undefined : currentDir
        return this.currentDir !== undefined
    }

    private resources: string[]

    private resourceDescriptors: ResourceDescriptorCollection
    private resourceDescriptorsList: ResourceDescriptor[]
    private numRessources: number
    private currentFileName: string
    private synopsisCollection: {
        [resource: string]: {
            descriptor: ResourceDescriptor,
            synopsis: ResourceSynopsis
        }
    } = {}

    private progressBar: ProgressBar = new ProgressBar()

    makeInstall(resourceDescriptors: ResourceDescriptorCollection) {
        if (!this.currentDir)
            throw new Error("Installation directory has not been tested")

        this.resourceDescriptors = resourceDescriptors
        fs.ensureDirSync(path.join(this.currentDir, LIB_DIRNAME, SHARED_DIRNAME))

        this.resources = this.getResourceDescriptorsNames()
        this.numRessources = this.resources.length
        let tm = TemplatesManager
        this.currentFileName = path.join(this.currentDir, LIBRARY_NAME, SHARED_DIRNAME, VO_FILENAME)

        fs.writeFileSync(this.currentFileName, TemplatesManager.resourcesHeader())

        this.progressBar.message = "creating interfaces"
        this.notify(InstallProcess.VO, InstallStatus.INIT, 0)
        this.nextResource()
    }
    private getDescriptor(resource: string) {
        for(let i in this.resourceDescriptors)
            if(this.resourceDescriptors[i].resource == resource)
                return this.resourceDescriptors[i]
        return undefined
    }
    private nextResource() {
        if (this.resources.length) {
            let resource: string = this.resources.shift()
            this.http.getSynopsis(resource).subscribe((synopsis: ResourceSynopsis) => {

                this.synopsisCollection[resource] = {
                    synopsis: synopsis,
                    descriptor: this.getDescriptor(resource)
                }

                fs.appendFile(this.currentFileName, TemplatesManager.interfaceTamplate(synopsis), (error: any) => {
                    this.notify(InstallProcess.VO, InstallStatus.PROGRESS, this.numRessources - this.resources.length)
                    this.nextResource()
                })
            })
        }
        else {
            this.notify(InstallProcess.VO, InstallStatus.COMPLETE, this.numRessources)
            this.notify(InstallProcess.VO_DESCRIPTOR, InstallStatus.INIT, 0)
            this.currentFileName = path.join(this.currentDir, LIBRARY_NAME, SHARED_DIRNAME, RESOURCE_DESCRIPTOR_FILENAME + ".ts")
            fs.writeFile(this.currentFileName, TemplatesManager.descriptorHeader(), (error => {
                if (error) {
                    throw error
                }
                for (let name in this.synopsisCollection)
                    this.descriptorsList.push(this.synopsisCollection[name])
                this.descriptorsList.sort((a: {
                    descriptor: ResourceDescriptor,
                    synopsis: ResourceSynopsis
                }, b: {
                    descriptor: ResourceDescriptor,
                    synopsis: ResourceSynopsis
                }) => {
                    let l: string[] = [a.synopsis.nodeName, b.synopsis.nodeName]

                    return l.sort().indexOf(a.synopsis.nodeName) == 0 ? -1 : 1
                })
                this.progressBar.message = "creating resources descriptors"
                this.progressBar.update(0, this.numRessources)
                this.nextDescriptor()
            }))
        }
    }
    private descriptorsList: {
        descriptor: ResourceDescriptor,
        synopsis: ResourceSynopsis
    }[] = []
    nextDescriptor() {
        if (this.descriptorsList.length) {
            let data: {
                descriptor: ResourceDescriptor,
                synopsis: ResourceSynopsis
            } = this.descriptorsList.shift()
            fs.appendFile(this.currentFileName, TemplatesManager.descriptorTemplate(
                data.synopsis,
                data.descriptor
            ), (error) => {
                if (error)
                    throw error
                this.notify(
                    InstallProcess.VO_DESCRIPTOR, InstallStatus.PROGRESS,
                    this.numRessources - this.descriptorsList.length
                )
                this.nextDescriptor()
            })

        } else {
            this.notify(
                InstallProcess.VO_DESCRIPTOR, InstallStatus.COMPLETE,
                this.numRessources - this.descriptorsList.length
            )

            this.notify(
                InstallProcess.VO_SERVICES, InstallStatus.INIT,
                0
            )
            this.currentFileName = path.join(this.currentDir, LIBRARY_NAME, RESOURCE_SERVICE_FILENAME + ".ts")
            fs.writeFile(this.currentFileName, TemplatesManager.servicesHeader(), (error => {
                if (error) {
                    throw error
                }
                this.servicesInputs = TemplatesManager.getServiceTemplateInputs()
                this.progressBar.message = "creating resources services"
                this.progressBar.update(0, this.numRessources)
                this.nextService()
            }))
        }
    }
    private nextService() {
        if(this.servicesInputs.length) {
            fs.appendFile(this.currentFileName, TemplatesManager.serviceTemplate(this.servicesInputs.shift()), error => {
                this.notify(
                    InstallProcess.VO_SERVICES, InstallStatus.PROGRESS,
                    this.numRessources - this.servicesInputs.length
                )
                this.nextService()
            })
        } else {
            this.notify(
                InstallProcess.VO_SERVICES,
                InstallStatus.COMPLETE,
                this.numRessources
            )
            // git clone !!!
        }
    }
    private servicesInputs: { type: string, descriptor: string }[]
    private getResourceDescriptorsNames(): string[] {
        let l: string[] = []
        for (let p in this.resourceDescriptors) {
            if (this.resourceDescriptors[p].synopsis)
                l.push(this.resourceDescriptors[p].resource)
        }
        return l.sort()
    }
    private notify(
        process: InstallProcess,
        status: InstallStatus,
        progress: number,
        total?: number): void {
        if (!total)
            total = this.numRessources

        if (status == InstallStatus.PROGRESS)
            this.progressBar.update(progress, total)
        this.notifier.next(this.getEvent(process, status, progress, total))
    }
    private getEvent(
        process: InstallProcess,
        status: InstallStatus,
        progress: number,
        total: number): InstallEvent {
        return {
            process: process,
            status: status,
            progress: progress,
            total: total
        }
    }

    makeUpdate() {

    }
}
/*
echo "# prestashop-api-core" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/raphael-volt/prestashop-api-core.git
git push -u origin master

*/