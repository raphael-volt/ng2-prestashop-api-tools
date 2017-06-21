import * as commander from 'commander';

import { APIInterface, APIConfig } from "./core/api-interface";
// type Command = commander.Command
export class App {

    private commander: commander.CommanderStatic;
    private package: any
    private apiConfig: APIConfig

    constructor() {
        this.commander = commander;
        this.package = require('../../package.json');
    }

    public initialize() {
        this.commander
            .version('0.0.1')
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

        let apiInterface: APIInterface = new APIInterface()
        
        apiInterface.configuration().subscribe((config: APIConfig) => {
            this.apiConfig = config
            console.log("apiConfig", config)
            process.exit(0)
        })
    }

    private checkInstall() {
        console.log("checkInstall")
    }

    private checkUpdate() {
        console.log("checkUpdate")
    }


    private parseArgs(env: string, command: any): void {
        console.log(command.args[1])
    }

}

let app = new App();
app.initialize();

