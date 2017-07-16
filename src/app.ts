import * as commander from 'commander';
import { JSONResponse } from "./core/http";
import { APIConfig } from "./model/api-config";
import { ConnectionfForm } from "./core/connection-form";
import { ResourceDescriptorCollection } from "./model/resource-descriptor";
import { readJsonSync } from "fs-extra";
import { resolve } from "path";
export class App {

    private commander: commander.CommanderStatic;
    private package: any
    private resourceDescriptors: ResourceDescriptorCollection
    constructor() {
        this.commander = commander;
        this.package = readJsonSync(resolve(__dirname, "..", "package.json"))
    }

    public initialize() {
        this.commander
            .version(this.package.version)
            .description('Manage your own prestashop-api module.')
            .option('-I, --install', 'Create the prestashop-api module.')
            .option('-U, --update', 'Update the prestashop-api module.')
        this.commander.parse(process.argv)

        const install = commander.install || false
        const update = commander.update || false
        if (install && update) {
            console.log("Can't update and install in the same time!")
            process.exit(1)
        }
        if (!install && !update) {
            console.log("No operation!")
            process.exit(1)
        }
        if(install)
            this.checkInstall()
        else
            this.checkUpdate()
    }

    private initConnection() {

        let form: ConnectionfForm = new ConnectionfForm()
        
        form.init().subscribe((response: JSONResponse) => {
            this.resourceDescriptors = <ResourceDescriptorCollection>response.json
            process.exit(0)
        })
    }
/*
--__dirname
    -- prestashop-api
        prestashop-api.module.ts
        prestashop-api.service.ts
        -- core
            vo.class.ts
            vo.descriptor.ts
            vo.descriptor.ts
        -- config
            api-config.module.ts
            api-config.service.ts
            api-config.ts
        -- form
            api-form.module.ts
            api-form-service.ts
*/
    private checkInstall() {
        
    }

    private checkUpdate() {
        console.log("checkUpdate")
    }


    private parseArgs(env: string, command: any): void {
        console.log(command.args[1])
    }

}

