<!--
  // Copyright 2018, Venkat Peri.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.
  -->

<template>
  <vue-splitter-h :handle-size="5">
    <template slot="top">
      <vue-x-term :cmd-handler="onTerm1Cmd"
                  :value="term1Output"
                  :prompt="ps1" />
    </template>
    <template slot="bottom">
      <vue-x-term :cmd-handler="onTerm2Cmd"
                  :value="term2Output"
                  prompt="T2> " />
    </template>
  </vue-splitter-h>
</template>


<script lang="ts">
    import { Component, Lifecycle } from "av-ts";
    import chalk from 'chalk'
    import Vue from 'vue'
    import { VueSplitterH, VueSplitterV } from 'vue-splitter-pane'
    import VueXTerm from '../../../src'
    import { CmdHandlerFnOptions } from '../../../src/types';

    const colors = new chalk.constructor({level: 2});

    @Component({
        name: "App",
        components: {
            VueSplitterH,
            VueSplitterV,
            VueXTerm
        }
    })
    export default class App extends Vue {

        term1Output: string = ''

        term2Output: string = ''

        ps1 = colors.red('T1> ')

        async onTerm1Cmd(input: string,
            opts: CmdHandlerFnOptions): Promise<any> {
            opts.writable.write(input.toUpperCase())
        }

        async onTerm2Cmd(input: string,
            opts: CmdHandlerFnOptions): Promise<any> {
            opts.writable.write(input.toLowerCase())
        }

        @Lifecycle mounted() {
        }

    }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Source+Code+Pro');

  $border-color: lighten(#0F192A, 10%);

  body {
    margin: 0;
    padding: 0;
    background: $border-color;
  }

  #app {
    width: 100%;
    height: 100vh;
  }

  .cm {
    width: 100%;
    height: 100%;
  }

  .gutter-marker {
    font-size: 8px;
    margin-left: 3px;
  }

  .CodeMirror {
    font-family: "Source Code Pro", monospace;
  }

  .cm1 .CodeMirror {
    font-size: 16px;
  }

  .cm2 .CodeMirror {
    font-size: 12px;
  }

  .cm3 .CodeMirror {
    font-size: 14px;
  }

  .cm1 .cm-s-midnight .CodeMirror-gutters {
    border-right: solid 1px darkred !important;
  }

  .cm2 .cm-s-midnight .CodeMirror-gutters {
    border-right: solid 1px $border-color !important;
    font-size: 12px;
  }

  .cm3 .cm-s-midnight .CodeMirror-gutters {
    border-right: solid 1px forestgreen !important;
  }

  .VueSplitter-Handle-item {
    background: #888;
    z-index: 100;
  }
</style>

