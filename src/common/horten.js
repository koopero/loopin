module.exports = loopinHorten

const H = require('horten')

function loopinHorten( mutant ) {
  const loopin = this
  loopin.H = H



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
    listening: true
  })

  let patching = false

  loopin.plugin('patch')
  loopin.plugin('dispatch')

  loopin.dispatchListen('*', onDispatch )

  loopin.hookAdd('close', () => { cursor.listening = false } )

  cursor.pull()

  function onPatch( value, path ) {
    if ( !patching )
      cursor.patch( value, path )
  }

  function onDelta( delta ) {
    patching = true
    loopin.patch( delta )
    patching = false
  }

  function onDispatch( event ) {
    switch( event.type ) {
      case 'frame':
      case 'pixels':
      case 'mousemove':


      break

      default:
        cursor.patch( event.data, event.path )
    }

    return true
  }
}
