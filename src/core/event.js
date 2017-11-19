module.exports = Event

function Event( init ) {
  if ( init instanceof Event )
    return init

  let event = Object.create( Event.prototype )
  Object.assign( event, init )

  Object.defineProperty( event, '_throw', { value: _throw } )

  return event
  function _throw () {
    let data = event.data || {}
      , path = event.path || ''
      , msg = path +'  '+(event.data.error || `Unknown error of type ${event.type}`)
      , error = new Error( msg )

    error.data = data

    throw error
  }


}


Event.fromArguments = require('boptions')({
  '#inline': ['type','path','time'],
  '#leftovers': 'data',
  'path': '',
  'type': '<unknown>',
  'data': {
    'type': 'extend'
  },
  'time': NaN
})
