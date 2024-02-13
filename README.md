# pino-spy

TODO description

### How to use it

`pino-spy` record in `input` and `output` of `pino` logging methods, so tests can assert what is sent to and what's the ouput - that's important especially having custom serializer (link).

```js
test('the service should fail to on ...', async (t) => {
  const logger = pinoSpy()
  const app = fastify({ logger })

  await app.listen()

  assert.equal(logger._info.input.at(-1), 'server started')
  assert.deepEqual(logger._info.output.at(-1), { msg: 'server started' })
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
