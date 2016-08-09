const assert = require('chai').assert

describe('path', function () {
  const path = require('../src/util/path')

  describe('flattenObject', function () {
    const flattenObject = path.flattenObject
    it('works', function () {
      const source = {
        '/foo/bar/': 4,
        'bar':3,
      }
      const expected = {
        foo: {
          bar: 4
        },
        bar: 3
      }

      const result = flattenObject( source )
      assert.deepEqual( result, expected )
    })

    it('does inner paths', function () {
      const source = {
        'bar': {
          'bean/bonk/': 5
        },
      }
      const expected = {
        bar: { bean: { bonk: 5 }}
      }

      const result = flattenObject( source )
      assert.deepEqual( result, expected )
    })

    it('similar paths', function () {
      const source = {
        'bar/bonk/baz': 6,
        '/bar/bonk/foo/': 5
      }
      const expected = {
        bar: { bonk: { baz: 6, foo: 5 } }
      }

      const result = flattenObject( source )
      assert.deepEqual( result, expected )
    })
  })

})
