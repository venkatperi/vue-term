import { PluginObject, VueConstructor } from "vue"
import VueXterm from './VueXterm'

export default VueXterm

const plugin: PluginObject<any> = {
    install(Vue: VueConstructor) {
        Vue.component('vue-xterm', VueXterm)
    }
}

// @ts-ignore
VueXterm.install = plugin.install

declare global {
    interface Window {
        Vue: VueConstructor
    }
}

if (window && window.Vue) {
    // @ts-ignore
    window.Vue.use(VueXterm)
}

export
{
    plugin
}

