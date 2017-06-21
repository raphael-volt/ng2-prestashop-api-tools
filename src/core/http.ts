import { Observable, Observer } from "rxjs";
import { APIConfig } from "../core/api-interface";

const XMLHttpRequest: any = require("xmlhttprequest").XMLHttpRequest;
const XSSI_PREFIX = /^\)\]\}',?\n/;
const isSuccess = (status: number): boolean => (status >= 200 && status < 300);
const btoa = require('btoa')

export interface JSONResponse {
    ok: boolean,
    json: any
}
export class Http {

    private _config: APIConfig

    connect(config: APIConfig): Observable<JSONResponse> {
        return Observable.create((observer: Observer<JSONResponse>) => {

            this._headers = this.getAuthHeaders(config.key)
            this._config = config
            let _xhr = this.createXHR(
                config.url + "/api",
                "GET",
                this._headers,
                {
                    output_format: "JSON"
                }
            )

            this.send(_xhr, observer)
        })
    }
    
    get(resource: string, search: {[key: string]: string}): Observable<JSONResponse> {
        search.output_format = "JSON"
        return Observable.create((observer: Observer<JSONResponse>) => {
            let _xhr = this.createXHR(
                this._config.url + "/api/" + resource,
                "GET",
                this._headers,
                search
            )

            this.send(_xhr, observer)
        })
    }

    private send(_xhr: XMLHttpRequest, responseObserver: Observer<JSONResponse>, bodyStr: string = undefined) {
        const onLoad = () => {
            // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
            let status: number = _xhr.status === 1223 ? 204 : _xhr.status;

            let body: any = null;

            // HTTP 204 means no content
            if (status !== 204) {
                // responseText is the old-school way of retrieving response (supported by IE8 & 9)
                // response/responseType properties were introduced in ResourceLoader Level2 spec
                // (supported by IE10)
                body = (typeof _xhr.response === 'undefined') ? _xhr.responseText : _xhr.response;

                // Implicitly strip a potential XSSI prefix.
                if (typeof body === 'string') {
                    body = body.replace(XSSI_PREFIX, '');
                }
            }
            // fix status code when it is 0 (0 status is undocumented).
            // Occurs when accessing file resources or on Android 4.1 stock browser
            // while retrieving files from application cache.
            if (status === 0) {
                status = body ? 200 : 0;
            }

            const response: JSONResponse = {
                ok: false,
                json: undefined
            }
            response.ok = isSuccess(status);
            if (response.ok) {
                try {
                    response.json = JSON.parse(body)
                } catch (error) {
                    unhandle()
                    responseObserver.error(error)
                    return
                }
                unhandle()
                responseObserver.next(response);
                // TODO(gdi2290): defer complete if array buffer until done
                responseObserver.complete();
                return;
            }
            responseObserver.error("Request fail");
        };
        // error event handler
        const onError = (err: ErrorEvent) => {
            console.log("Request fail", err.message)
            unhandle()
            responseObserver.error(err);
        };

        const unhandle = () => {
            _xhr.removeEventListener('load', onLoad);
            _xhr.removeEventListener('error', onError);
            _xhr.abort();
        }

        _xhr.addEventListener('load', onLoad);
        _xhr.addEventListener('error', onError);

        _xhr.send(bodyStr);
    }

    private createXHR(url: string, method: string, header: any, search: any): XMLHttpRequest {
        const _xhr: XMLHttpRequest = new XMLHttpRequest();
        if (search) {
            let l: string[] = []
            for (let p in search) {
                l.push(p + "=" + search[p])
            }
            if (l.length)
                url += "?" + l.join("&")
        }
        _xhr.open(method, url)

        if (header) {
            for (let p in header)
                _xhr.setRequestHeader(p, header[p])
        }
        return _xhr
    }

    private _headers: { [key: string]: string }

    getAuthData(data: string): string {
        return btoa(data + ":")
    }
    private getAuthValue(authData: string): string {
        return "Basic " + authData
    }

    private getAuthHeaders(key: string): { [name: string]: string } {
        let h: { [key: string]: string } = {}
        h.Authorization = this.getAuthValue(
            this.getAuthData(key)
        )
        h['content-type'] = 'application/json'
        return h
    }
}