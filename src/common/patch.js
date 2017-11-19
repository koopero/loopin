const yaml = require('js-yaml')

module.exports = loopinPatch
function loopinPatch() {
  const loopin = this
      , Promise = loopin.Promise
      , H = require('horten')
      , data = new H.Mutant()

  loopin.patch = patch
  loopin.patchYAML = patchYAML
  loopin.patchGet = data.get.bind( data )

  function patchYAML( string ) {
    const path = H.path.slice( arguments, 1 )
    var data = yaml.load( string )
    data = H.util.compose( data )
    patch( data, patch )
  }

  async function patch( value ) {
    const path = H.path.slice( arguments, 1 )
    var mutant = new H.Mutant()

    mutant.set( value, path )
    await loopin.hookAll('patchMutate', mutant )
    value = mutant.get( path )

    data.patch( value, path )
    loopin.log( 'patch', H.path.resolve( path ), mutant.get( path ) )




    return loopin.hookAll( 'patch', mutant.get() )
  }

  loopin.patch.apply( loopin, arguments )

  return loopin.patch
}
