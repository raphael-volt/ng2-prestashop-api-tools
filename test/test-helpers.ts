
import * as commander from 'commander';
import * as fs from 'fs';
import * as path from 'path';

export class TestHelper {
    static rmdir(dir: string) : void {
        if(! fs.existsSync(dir)) {
            return
        }
        let list = fs.readdirSync(dir);
        for (var i = 0; i < list.length; i++) {
            var filename = path.join(dir, list[i]);
            var stat = fs.statSync(filename);

            if (filename == "." || filename == "..") {
                // pass these files
            } else if (stat.isDirectory()) {
                // rmdir recursively
                TestHelper.rmdir(filename);
            } else {
                // rm fiilename
                fs.unlinkSync(filename);
            }
        }
        fs.rmdirSync(dir);
    }
}