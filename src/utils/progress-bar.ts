var readline = require('readline');
var os = require("os");

export class ProgressBar {

    constructor(
        public width: number = 40,
        public message: string = "operation") {
    }

    symbols: {
        leftBorder: string,
        rightBorder: string,
        loaded: string,
        notLoaded: string
    } = {
        leftBorder: '[',
        rightBorder: ']',
        loaded: '=',
        notLoaded: '-'
    }

    update(progress: number, total: number) {
        const ratio: number = progress / total
        const done: number = Math.floor(ratio * (this.width-2))
        let bar: string[] = [this.symbols.leftBorder]
        let i: number
        for (i = 1; i <= done; i++) {
            bar.push(this.symbols.loaded)
        }
        for (; i < this.width-1; i++)
            bar.push(this.symbols.notLoaded)
        bar.push(this.symbols.rightBorder)
        this.clear()
        process.stdout.write(`${bar.join("")} ${this.message} ${progress} / ${total}`)
        if(progress == total) {
            process.stdout.write(os.EOL)
        }
    }

    clear() {
        readline.cursorTo(process.stdout, 0)
        readline.clearLine(process.stdout, 1)
    }
}
