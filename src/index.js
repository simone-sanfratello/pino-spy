'use strict'

const pino = require('pino')
const writeStream = require('flush-write-stream')

const defaultOptions = {
  mode: 'input'
}

function pinoSpy (pinoOptions = defaultOptions) {
  // TODO validate options
  // TODO option output y/n
  // TODO forward pino options
  // TODO custom levels

  if (pinoOptions.mode === 'input') {
    return input(pinoOptions)
  }
  if (pinoOptions.mode === 'output') {
    return output(pinoOptions)
  }
}

function output (options) {
  // TODO accumulate
  // TODO custom parser, default 'json'
  const stream = writeStream(function (data, _enc, cb) {
    try {
      const out = JSON.parse(data.toString('utf8'))
      // TODO filter on out
      spy['_' + pino.levels.labels[out.level]].push(out)
    } catch (err) {
      cb(new Error('PINO_SPY_UNABLE_TO_DECODE_OUTPUT', { cause: err }))
      return
    }

    cb()
  })
  const streams = [stream]

  // TODO use pino options
  const spy = pino({}, pino.multistream(streams))

  // extend spy
  spy._trace = []
  spy._debug = []
  spy._info = []
  spy._warn = []
  spy._error = []
  spy._fatal = []

  spy.reset = function () {
    this._trace = []
    this._debug = []
    this._info = []
    this._warn = []
    this._error = []
    this._fatal = []
  }

  return spy
}

function input (options) {
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
