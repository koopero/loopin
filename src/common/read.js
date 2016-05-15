module.exports = read

function read() {
  const loopin = this

  loopin.read = read

  function read( path ) {
    path = path || ''
    loopin.patch( path, 'read' )
    return loopin.listen( 'read::'+path )
      .then( function ( event ) {
        return event.data
      } )
  }
}