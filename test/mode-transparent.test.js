'use strict'

const assert = require('node:assert')
const { test } = require('node:test')
const { pinoSpy } = require('../src')
const pino = require('pino')

test('transparent mode', t => {
  t.test('should record logging calls', t => {
    // TODO here use pino instance or pino options > set min level
    const spy = pinoSpy({ mode: 'transparent' })
    const levels = Object.values(pino().levels.labels)

    for (const level of levels) {
      spy[level]({ data: { something: 'relevant' } }, 'logging message')
    }

    for (const level of levels) {
      assert.strictEqual(spy['_' + level].length, 1)
      assert.deepStrictEqual(spy['_' + level], [[{ data: { something: 'relevant' } }, 'logging message']])
    }
  })
})
