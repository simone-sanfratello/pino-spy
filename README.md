# pino-spy

TODO description

### How to use it

`pino-spy` works in 2 ways: `input` and `output`

### input mode (default)

In `input` mode, the tests purpose is to spy the **input** of the logger functions

TODO review, significant example, working code

```js
test('the service should fail to on ...', async (t) => {
  const logger = pinoSpy()
  const app = fastify({ logger })

  await app.listen()

  assert.equal(logger._info_.at(-1), 'server started')
```

It's not relevant for the testing case how the input are serialized.

### output mode

In `output` mode, the tests purpose is to spy the **output** for the logger functions, to check the serialization along with the input.

TODO review, significant example, working code

```js
test('the service should fail to on ...', async (t) => {
  const logger = pinoSpy({ mode: 'output' })
  const app = fastify({ logger })

  await app.listen()

  assert.deepEqual(logger._info_.at(-1), { msg: 'server started' })
```

---

# TODO

- mode: input: collect messages
  - level
- more: real: use real pino instance and get output (serializers)
  - filter props

- examples
  - use with node:test

- csj support
- esm support
- ts support
  - jsdoc
- option validation
- 100% coverage
- support pino custom levels

see 

https://github.com/pinojs/pino/issues/837
https://github.com/pinojs/pino/issues/1445
https://github.com/fastify/help/issues/677#issuecomment-1456738991
