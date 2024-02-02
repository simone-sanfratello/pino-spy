'use strict'

const assert = require('node:assert')
const { test } = require('node:test')
const { pinoSpy } = require('../src')
const pino = require('pino')
const { setTimeout } = require('node:timers/promises')

test('should replace pino to spy it', async t => {
  const spy = pinoSpy()

  const myApp = async function ({ logger }) {
    await setTimeout(50)
    logger.info({ port: 123 }, 'app started')
    await setTimeout(50)
    logger.info({ routes: ['GET /route1', 'POST /route2'] }, 'app is ready')
    await setTimeout(50)
    logger.error({ err: new Error('OH_NO') }, 'something wrong')
    await setTimeout(50)
    logger.fatal('app crashed')
  }

  await myApp({ logger: spy })

  assert.equal(spy._info.length, 2)
  assert.equal(spy._error.length, 1)
  assert.equal(spy._fatal.length, 1)

  assert.deepStrictEqual(spy._info, [[{ port: 123 }, 'app started'], [{ routes: ['GET /route1', 'POST /route2'] }, 'app is ready']])
  assert.deepEqual(spy._error, [[{ err: new Error('OH_NO') }, 'something wrong']])
  assert.deepStrictEqual(spy._fatal, [['app crashed']])
})

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
