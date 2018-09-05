module.exports = loopinHorten

const H = require('horten')

function loopinHorten( mutant ) {
  const loopin = this
  loopin.H = H

  var useEvents = [ 'read', 'done' ]


  if ( Array.isArray( mutant ) || 'string' == typeof mutant ) {
    mutant = H.root.walk( mutant )
  } else if ( mutant == null ) {
    mutant = H.root
  } else if ( !H.Mutant.isMutant( mutant ) ) {
    throw new Error('initializer must be Mutant')
  }

  let cursor = new H.Cursor({
    mutant,
    onDelta,
    echo: false,
    listening: true
  })

  let patching = false

  loopin.plugin('patch')
  loopin.plugin('dispatch')

  loopin.dispatchListen('*', onDispatch )

  loopin.hookAdd('close', () => { cursor.listening = false } )

  // cursor.pull()
  // console.log( "LOOPIN HORTEN INIT", cursor.value )

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
}
