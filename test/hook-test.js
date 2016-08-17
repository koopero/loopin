'use strict'

const Loopin = require('../node')
    , assert = require('chai').assert

describe('hook', function () {
  it('does not smoke', function () {
    const loopin = Loopin()
    loopin.plugin('hook')


    const func = () => 'bar'
    loopin.hookAdd('foo', func )


    const result = loopin.hookCollect( 'foo' )

    assert.deepEqual( result, [ func ] )
  })
})
