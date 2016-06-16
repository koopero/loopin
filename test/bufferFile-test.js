const util = require('./util')

const loopin = util.newLoopin()

loopin.preset('bars')
loopin.plugin('bufferFile')


const Promise = require('bluebird')
    , modeDelay = () => Promise.delay( 1000 )
    , readDelay = () => Promise.delay( 100 )

const buffer = 'bars'

loopin.on( 'open', () =>
  loopin.bufferFile( buffer )
  .then( ( result ) => loopin.log('done', 'test', { result: result } ) )
  .then( modeDelay )

  // .then( () => loopin.bufferFile( buffer, 'result/ping.png' ) )
  // .then( ( result ) => loopin.log('done', 'test', { result: result } ) )
  // .then( modeDelay )

  .then( () => loopin.close() )
)
