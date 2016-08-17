'use strict'

module.exports = loopinHook

const _ = require('lodash')

function loopinHook() {
  const loopin = this
      , Promise = loopin.Promise

  // hooks has format
  // { name: [ { value } ] }
  const hooks = {}

  loopin.hookAdd = hookAdd
  loopin.hookCollect = hookCollect



  function hookAdd( name, value, options ) {
    if ( !name || !_.isString( name ) )
      throw new Error('Expected hook name to be string')

    const hook = _.extend( {}, options )
    hook.value = value
    hook.weight = parseInt( hook.weight ) || 0

    const hooksName = hooks[name] = hooks[name] || []
    hooksName.push( hook )
    hooksName.sort( sortByWeight )
  }

  function hookCollect( name ) {
    if ( !hooks[name] )
      return []

    return hooks[name]
    .map( hook => hook.value )
  }
}

function sortByWeight( a, b ) {
  if ( a.weight < b.weight )
    return -1

  if ( a.weight > b.weight )
    return 1

  return 0
}
