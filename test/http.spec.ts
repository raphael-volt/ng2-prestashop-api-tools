import * as chai from 'chai';
import * as sinon from 'sinon';

import { Http, JSONResponse } from "../src/core/http";
import { APIConfig } from "../src/core/api-interface";
const assert = chai.assert;

let http: Http

describe('Http', () => {
    describe('#connect', () => {
        it('should connect successfully', (done) => {
            http = new Http()
            http.connect({url: "http://localhost:8090", key: "1XNCKZMANDQ8BFWGPPS5G8UNG7CL3Z7A"})
            .subscribe((response: JSONResponse) => {
                if(response.ok)
                    done()
                else
                    done("authentication fail")
                },
                (error: any) => {
                    done(error)
            })
            
        });

        it('should get languages', (done) => {
            http.get("languages", {display: "full"})
            .subscribe((response: JSONResponse) => {
                if(response.ok)
                    done()
                else
                    done("get languages fail")
                },
                (error: any) => {
                    done(error)
            })
        })
    })
})