const util = require('./util')

const loopin = util.newLoopin()

loopin.plugin('read')

loopin.preset('bars')



const Promise = require('bluebird')
    , modeDelay = () => Promise.delay( 1000 )
    , readDelay = () => Promise.delay( 100 )

loopin.on( 'open', () =>
  Promise.resolve()
  .then( () => loopin.read("window") )
  .then( ( data ) => loopin.log( 'initial', '_test', { data: data } ) )
  .then( modeDelay )

  .then( () => loopin.patch( { fullscreen: true }, 'window' ) )
  .then( readDelay )
  .then( () => loopin.read("window") )
  .then( ( data ) => loopin.log( 'fullscreen', '_test', { data: data } ) )
  .then( modeDelay )

  .then( () => loopin.patch( { fullscreen: false, width: 160, height: 120 }, 'window' ) )
  .then( readDelay )
  .then( () => loopin.read("window") )
  .then( ( data ) => loopin.log( 'nintendo', '_test', { data: data } ) )
  .then( modeDelay )

  .then( () => loopin.close() )
)
