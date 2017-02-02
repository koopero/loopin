'use strict'

const Loopin = require('../node')
    , assert = require('chai').assert

describe('patch', function () {
  describe('patchGet', function () {
    it('does not smoke', function () {
      const loopin = Loopin()
      loopin.patch('bar', 'foo' )
      const result = loopin.patchGet()
      assert.deepEqual( result, { foo: 'bar' } )
    })
  })
})
