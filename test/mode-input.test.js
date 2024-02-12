'use strict'

const assert = require('node:assert')
const { test } = require('node:test')
const { pinoSpy } = require('../src')
const pino = require('pino')

test('input mode', t => {
  t.test('should record logging calls', t => {
    const spy = pinoSpy()
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
