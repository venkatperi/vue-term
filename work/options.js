//  Copyright 2018, Venkat Peri.
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the
//  "Software"), to deal in the Software without restriction, including
//  without limitation the rights to use, copy, modify, merge, publish,
//  distribute, sublicense, and/or sell copies of the Software, and to permit
//  persons to whom the Software is furnished to do so, subject to the
//  following conditions:
//
//  The above copyright notice and this permission notice shall be included
//  in all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//  OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
//  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
//  NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
//  OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
//  USE OR OTHER DEALINGS IN THE SOFTWARE.


let options = ['fontFamily,termName,bellSound;string',
  'fontWeight,fontWeightBold;null,normal,bold,100,200,300,400,500,600,700,800,900',
  'bellStyle;null,none,visual,sound,both',
  'cursorStyle;null,block,underline,bar',
  'allowTransparency,cancelEvents,convertEol,cursorBlink,debug,disableStdin,enableBold,macOptionIsMeta,popOnBell,rightClickSelectsWord,screenKeys,useFlowControl,visualBell;boolean',
  'colors;string[]',
  'fontSize,letterSpacing,lineHeight,tabStopWidth,scrollback;number',
  'handler;function',
  'theme;ITheme',
  'cols,rows;number',
]

function capitalize(x) {
  return x[0].toUpperCase() + x.substr(1)
}

let allKeys = []
for ( let opt of options ) {
  let [_keys, _values] = opt.split( ';' )
  let keys = _keys.split( ',' )
  let values = _values.split( ',' )
  for ( let k of keys ) {
    allKeys.push(k)
    // let v =  values.length === 1 ? capitalize(values[0]) : 'String'
    // console.log( `@Prop ${k} = p(${v})` )
  }
}

console.log(allKeys)
