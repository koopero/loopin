module.exports = loopinHorten

const H = require('horten')

function loopinHorten( opt ) {

  let { 
    path = 'loopin/',
    root = null,
    listen = 'read,done,move',
  } = opt || {}
  const loopin = this

  var useEvents = []

  root = root || H.root
  persistDispatch( listen )
  let mutant = root.walk( path )


  loopin.H = H


  let cursor = new H.Cursor({
    mutant,
    onDelta,
    root,
    echo: false,
    listening: true
  })

  let patching = false

  loopin.plugin('patch')
  loopin.plugin('dispatch')
  loopin.dispatchListen('*', onDispatch )
  loopin.hookAdd('close', () => { cursor.listening = false } )
  loopin.persistDispatch = persistDispatch

  cursor.value = cursor.value || {}
  onDelta( cursor.value )

  function onPatch( value, path ) {
    if ( !patching )
      cursor.patch( value, path )
  }

  function onDelta( delta ) {
    patching = true
    // console.log('PATCHING', delta )

    loopin.patch( delta )
    patching = false
  }

  function onDispatch( event ) {
    let { type } = event
    if ( useEvents.indexOf( type ) != -1 )
      cursor.patch( event.data, event.path )

    return true
  }

  function persistDispatch( events ) {
    if ( 'string' == typeof events )
      events = events.split(/[\,\s]/g)

    events.map( type => useEvents.push( type ) )
  }
}
