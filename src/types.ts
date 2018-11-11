import { Readable, Writable } from "stream"

export type WatchAllCallback = (name: string, n: any, o: any) => void

export type CmdHandlerFnOptions = {
    readable: Readable,
    writable: Writable,
}

export type CmdHandlerFn = (cmd: string,
    opts: CmdHandlerFnOptions) => Promise<any>
