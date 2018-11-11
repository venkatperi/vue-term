declare module 'local-echo' {
    import { Terminal } from 'xterm'

    type LocalEchoControllerOptions = {
        // The maximum number of entries to keep in history
        historySize: number
        // The maximum number of auto-complete entries, after which the user
        // will have to confirm before the entries are displayed.
        maxAutocompleteEntries: number
    }

    type AutoCompletionCallback = (index: number, tokens: Array<string>,
        ...args: Array<any>) => Array<string>


    export default class LocalEchoController {

        constructor(term: Terminal, options?: LocalEchoControllerOptions)

        abortRead(reason: string): void

        addAutocompleteHandler(fn: AutoCompletionCallback,
            ...args: Array<any>): void

        print(message: string): void

        printWide(items: Array<string>, padding?: number): void

        println(message: string): void

        read(prompt: string, continuationPrompt?: string): Promise<string>

        readChar(prompt: string): void

        removeAutocompleteHandler(fn: AutoCompletionCallback): void

    }
}


