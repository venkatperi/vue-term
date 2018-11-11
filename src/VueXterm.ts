import { Component, Lifecycle, p, Prop, Watch } from 'av-ts';
import { ResizeSensor } from "css-element-queries"
import Vue from 'vue';
import { ITerminalOptions, Terminal } from 'xterm'
import 'xterm/dist/xterm.css'
import LocalEchoController from '../../local-echo';
import { XTermReadable, XTermWritable } from "../work/Streams"
import { fit } from "./fit"
import { CmdHandlerFn, WatchAllCallback } from "./types"


const props = ['fontFamily', 'termName', 'bellSound', 'fontWeight',
    'fontWeightBold', 'bellStyle', 'cursorStyle', 'allowTransparency',
    'cancelEvents', 'convertEol', 'cursorBlink', 'debug', 'disableStdin',
    'enableBold', 'macOptionIsMeta', 'popOnBell', 'rightClickSelectsWord',
    'screenKeys', 'useFlowControl', 'visualBell', 'colors', 'fontSize',
    'letterSpacing', 'lineHeight', 'tabStopWidth', 'scrollback', 'handler',
    'theme', 'cols', 'rows']

const events = ['blur', 'focus', 'linefeed', 'selection', 'data', 'key',
    'keypress', 'keydown', 'refresh', 'resize', 'scroll', 'title',]

@Component({
    name: 'VueXterm',
    template: '<div :class="xClass"/>',
    props: {
        cmdHandler: Function
    },
})
export default class VueXterm extends Vue {
    /////
    @Prop allowTransparency = p(Boolean)

    @Prop bellSound = p(String)

    @Prop bellStyle = p(String)

    @Prop cancelEvents = p(Boolean)

    cmdHandler!: CmdHandlerFn

    @Prop colors = p(Array)

    @Prop cols = p(Number)

    @Prop convertEol = p(Boolean)

    @Prop cursorBlink = p(Boolean)

    @Prop cursorStyle = p(String)

    @Prop debug = p(Boolean)

    @Prop disableStdin = p(Boolean)

    @Prop enableBold = p(Boolean)

    @Prop fontFamily = p(String)

    @Prop fontSize = p(Number)

    @Prop fontWeight = p(String)

    @Prop fontWeightBold = p(String)

    @Prop handler = p(Function)

    @Prop letterSpacing = p(Number)

    @Prop lineHeight = p(Number)

    @Prop localEcho = p(Boolean)

    @Prop macOptionIsMeta = p(Boolean)

    options: ITerminalOptions = {}

    @Prop popOnBell = p(Boolean)

    @Prop prompt = p({type: String, default: '> '})

    @Prop rightClickSelectsWord = p(Boolean)

    @Prop rows = p(Number)

    @Prop screenKeys = p(Boolean)

    @Prop scrollback = p(Number)

    @Prop tabStopWidth = p(Number)

    @Prop termName = p(String)

    @Prop theme = p(Object)

    @Prop title = p(String)

    @Prop useFlowControl = p(Boolean)

    @Prop value = p({type: String, default: ''})

    @Prop visualBell = p(Boolean)

    @Prop xClass = p(String)

    private $localEcho?: LocalEchoController

    private $terminal?: Terminal

    private parentResizeSensor?: ResizeSensor = undefined


    async _readInput() {
        try {
            if (this.$localEcho && this.$terminal) {
                let str = await this.$localEcho.read(this.prompt)
                let writable = new XTermWritable({terminal: this.$terminal})
                let readable = new XTermReadable({terminal: this.$terminal})
                await this.cmdHandler(str, {readable, writable})
                writable.close()
                readable.close()
            }
        } catch (e) {
        }
        this.readInput()
    }

    @Lifecycle beforeDestroy() {
        if (this.$terminal) {
            this.$terminal.dispose()
        }
    }

    @Lifecycle mounted() {
        let term = new Terminal(this.options)
        term.open(this.$el)
        this.$terminal = term
        this.addEventListeners()
        this.watchOptions()
        this.trackParentSize()
        if (this.cmdHandler) {
            this.useLocalEcho()
        }
    }

    @Watch('value')
    onValueChanged() {
        if (this.$localEcho) {
            this.$localEcho.println(this.value)
        }
        else if (this.$terminal) {
            this.$terminal.writeln(this.value)
        }
    }

    readInput() {
        setImmediate(() => this._readInput())
    }

    private $watchAll(props: string[], callback: WatchAllCallback) {
        for (const prop of props) {
            this.$watch(prop, function (n: any, o: any) {
                callback(prop, n, o)
            });
        }
    }

    private __readInput() {
        if (this.$localEcho) {
            this.$localEcho.read(this.prompt)
                .then((input: string) => this.$emit('input', input))
                .catch((error: any) => {
                    this.$emit('error', error)
                    setImmediate(() => this.readInput())
                });
        }
    }

    private addEventListeners() {
        if (this.$terminal) {
            for (const event of events) {
                let self = this
                this.$terminal.on(event,
                    (...args) => self.$emit(event, ...args))
            }
        }
    }

    private fit() {
        if (this.$terminal) {
            fit(this.$terminal, this.$el.parentElement)
        }
    }

    private trackParentSize() {
        let parent = this.$el.parentElement
        if (parent) {
            this.fit()
            this.parentResizeSensor =
                new ResizeSensor(parent, this.fit.bind(this))
        }
    }

    private useLocalEcho() {
        if (this.$terminal) {
            this.$localEcho = new LocalEchoController(this.$terminal)
            this.$localEcho.println(this.value)
            this.readInput()
        }
    }

    private watchOptions() {
        let self = this
        this.$watchAll(props, function (name: string, n: any,) {
            if (self.$terminal) {
                self.$terminal.setOption(name, n)
            }
        })
    }
}
