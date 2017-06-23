import { Observable, Observer } from "rxjs";
import { Http, JSONResponse } from "./http";
import { APIConfig } from "../model/api-config";

export class ConnectionfForm {

    private _readline: any = require('readline')
    private observer: Observer<JSONResponse>
    init(): Observable<JSONResponse> {

        return Observable.create((observer: Observer<JSONResponse>) => {
            this.observer = observer
            this.createInterface({key: "", url:""})
        })
    }
    private printError(config: APIConfig) {
        console.log("Connection error")
        this.createInterface(config)
    }

    private createInterface(config: APIConfig) {
        const readline: any = this._readline
        const rl: any = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(`Shop url : `, (answer: any) => {
            config.url = answer
            rl.question(`API key : `, (answer: any) => {
                config.key = answer
                rl.close()
                let http: Http = Http.instance
                http.connect(config).subscribe((response: JSONResponse) => {
                    if (response.ok) {
                        console.log("Connection success")
                        this.observer.next(response)
                        this.observer.complete()
                    }
                    else {
                        this.printError(config)
                    }
                },
                    (error: any) => {
                        this.printError(config)
                    })
            })
        })
    }
}