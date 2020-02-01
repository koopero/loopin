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

  async function patchYAML( string ) {
    const path = H.path.slice( arguments, 1 )
    var data = yaml.load( string )
    data = H.util.compose( data )
    await patch( data, patch )
  }

  async function patch( value ) {
    const path = H.path.slice( arguments, 1 )
    var mutant = new H.Mutant()

    mutant.patch( value, path )
    await loopin.hookAll('patchMutate', mutant )
    value = mutant.get( path )

    data.patch( value, path )
    loopin.log( 'patch', H.path.resolve( path ), { data: value } )
    let result = await loopin.hookAll( 'patch', mutant.get() )
    loopin.emit('patch', { value, path } )
    return result
  }

  loopin.patch.apply( loopin, arguments )

  return loopin.patch
}
