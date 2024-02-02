'use strict'

// const split = require('split2')

const defaultOptions = {
  mode: 'dummy'
}

function pinoSpy (pinoOptions = defaultOptions) {
  // TODO validate options

  if (pinoOptions.mode === 'dummy') {
    return dummy(pinoOptions)
  }
  if (pinoOptions.mode === 'transparent') {
    return transparent(pinoOptions)
  }
}

function transparent (options) {
  // TODO

//   function pinoSink(spyfunc: (...args)  {
//   const result = split(data => {
//     try {
//       return JSON.parse(data)
//     } catch (err) {
//       // TODO not a json
//     }
//   })
//   result.on('data', data => {
//     return spyfunc(data)
//   })
//   return result
// }
}

function dummy (options) {
  return {
    _trace: [],
    _debug: [],
    _info: [],
    _warn: [],
    _error: [],
    _fatal: [],

    levels: {},
    trace: function (...args) { this._trace.push(args) },
    debug: function (...args) { this._debug.push(args) },
    info: function (...args) { this._info.push(args) },
    warn: function (...args) { this._warn.push(args) },
    error: function (...args) { this._error.push(args) },
    fatal: function (...args) { this._fatal.push(args) },
    silent: () => { },
    child: function () { return this },
    onChild: function () { },

    reset: function () {
      this._trace = []
      this._debug = []
      this._info = []
      this._warn = []
      this._error = []
      this._fatal = []
    }
  }
}

module.exports = { pinoSpy }
