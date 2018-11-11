import { Readable, ReadableOptions, Writable, WritableOptions } from "stream";
import { Terminal } from 'xterm'

export interface ICloseable {
    close(): void
}

export class XTermWritable extends Writable implements ICloseable {
    terminal: Terminal

    constructor(options: WritableOptions & { terminal: Terminal }) {
        super(options);
        this.terminal = options.terminal
    }

    _write(chunk: any, enc: string, cb: (error?: Error | null) => void): void {
        this.terminal.write(chunk.toString())
        cb()
    }

    close() {
    }
}


export class XTermReadable extends Readable implements ICloseable {
    data: string[] = []

    terminal: Terminal

    constructor(options: ReadableOptions & { terminal: Terminal }) {
        super(options);
        this.terminal = options.terminal
        this.terminal.on('data', this.onData.bind(this))
    }

    _read(size: number): void {
        for (let d of this.data) {
            this.push(d)
        }
        this.data = []
    }

    close() {
        this.terminal.off('data', this.onData.bind(this))
    }

    onData(data: string) {
        this.data.push(data)
    }
}

