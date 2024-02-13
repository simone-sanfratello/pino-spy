'use strict'

const pino = require('pino')
const writeStream = require('flush-write-stream')

const defaultOptions = {
  mode: 'input'
}

function pinoSpy(pinoOptions = defaultOptions) {
  // TODO validate options
  // TODO option output y/n
  // TODO forward pino options
  // TODO custom levels

  // TODO accumulate
  // TODO custom parser, default 'json'
  const stream = writeStream(function (data, _enc, cb) {
    try {
      const out = JSON.parse(data.toString('utf8'))
      // TODO filter on out
      spy['_' + pino.levels.labels[out.level]].output.push(out)
    } catch (err) {
      cb(new Error('PINO_SPY_UNABLE_TO_DECODE_OUTPUT', { cause: err }))
      return
    }

    cb()
  })
  const streams = [stream]

  // TODO use pino options
  const spy = pino({}, pino.multistream(streams))

  // wrap pino logging methods
  const orig = {
    trace: spy.trace,
    debug: spy.debug,
    info: spy.info,
    warn: spy.warn,
    error: spy.error,
    fatal: spy.fatal,
  }
  spy.trace = function (...args) { this._trace.input.push(args); spy.trace(...args) },
  spy.debug = function (...args) { this._debug.input.push(args); spy.debug(...args) },
  spy.info = function (...args) { this._info.input.push(args); spy.info(...args) },
  spy.warn = function (...args) { this._warn.input.push(args); spy.warn(...args) },
  spy.error = function (...args) { this._error.input.push(args); spy.error(...args) },
  spy.fatal = function (...args) { this._fatal.input.push(args); spy.fatal(...args) },

  // extend spy
  spy._trace = { input: [], output: [] }
  spy._debug = { input: [], output: [] }
  spy._info = { input: [], output: [] }
  spy._warn = { input: [], output: [] }
  spy._error = { input: [], output: [] }
  spy._fatal = { input: [], output: [] }

  spy.reset = function () {
    this._trace = { input: [], output: [] }
    this._debug = { input: [], output: [] }
    this._info = { input: [], output: [] }
    this._warn = { input: [], output: [] }
    this._error = { input: [], output: [] }
    this._fatal = { input: [], output: [] }
  }

  return spy
}


module.exports = { pinoSpy }
