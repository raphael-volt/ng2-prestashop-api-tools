import { Observable, Observer } from "rxjs";
export interface APIConfig {
    key: string
    url: string
}
export class APIInterface {

    private _readline: any = require('readline')

    configuration(): Observable<APIConfig> {
        return Observable.create((observer: Observer<APIConfig>) => {
            let result: APIConfig = { url: "", key: "" }
            const readline: any = this._readline
            const rl: any = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question(`Shop url : `, (answer: any) => {
                result.url = answer
                rl.question(`API key : `, (answer: any) => {
                    result.key = answer
                    rl.close()
                    observer.next(result)
                    observer.complete()
                })
            })
        })
    }
}