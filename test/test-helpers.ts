
import * as fs from 'fs-extra';

export class TestHelper {
    static rmdirSync(dir: string) : void {
        if(fs.pathExistsSync(dir)) {
            fs.removeSync(dir)
        }
    }
}