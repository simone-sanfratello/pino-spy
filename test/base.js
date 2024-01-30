'use strict'

const assert = require('node:assert')
const { test } = require('node:test')
const { pinoSpy } = require('../src')
const pino = require('pino')

test('should have the same pino properties', t => {
  const spy = pinoSpy()
  const logger = pino()

  for (const p of Object.getOwnPropertyNames(logger)) {
    assert.ok(spy[p], `${p} is missing`)
    assert.equal(typeof spy[p], typeof logger[p], `${p} is not a ${typeof logger[p]}`)
  }
})

test('should reset recorded calls', t => {
  const spy = pinoSpy()
  const levels = Object.values(pino().levels.labels)

  for (const level of levels) {
    spy[level]({ data: { something: 'relevant' } }, 'logging message')
  }

  for (const level of levels) {
    assert.deepStrictEqual(spy['_' + level], [[{ data: { something: 'relevant' } }, 'logging message']])
  }

  spy.reset()

  for (const level of levels) {
    assert.deepStrictEqual(spy['_' + level], [])
  }

})
