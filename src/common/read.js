module.exports = read

function read() {
  const loopin = this
  loopin.plugin('dispatch')
  loopin.read = read

  function read( path ) {
    path = loopin.H.path.resolve( path )

    loopin.patch( path, 'read' )
    return loopin.dispatchListen( 'read::'+path )
      .then( function ( event ) {
        return event.data
      } )
  }
}
