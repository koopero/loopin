const _ = require('lodash')

require('./test')( 'aspect-test', 'aspect-test', function ( loopin ) {
  const Promise = loopin.Promise
  const layerPath = 'render/output/'

  // loopin.logShow('patch')

  const width = randInt( 120, 1600 )
      , height = randInt( 120, 720 )
      , aspect = Math.pow( 10, Math.random() * 2 - 1 )

  loopin.patch( { width: width, height: height }, 'window/' )
  loopin.patch( aspect, 'buffer/output/aspect' )
  if ( aspect > 1 ) {
    loopin.patch( { width: width / aspect, height: height }, 'buffer/output/' )
  } else {
    loopin.patch( { width: width, height: height * aspect }, 'buffer/output/' )
  }

  return Promise.resolve( [
    { image: 'image/30x10.png', aspect: 30/10 },
    { image: 'image/33x33.png', aspect: 1 },
    { image: 'image/16x9.png', aspect: 16/9 },
  ])
  .then( _.shuffle )
  .mapSeries( function ( conf ) {
    const image = conf.image, aspect = conf.aspect
    loopin.patch( image, 'image/gate' )
    // loopin.patch( aspect, 'render/output/aspect' )
    loopin.patch( aspect, 'mesh/sprite/aspect' )

    loopin.patch( 0, 'camera/view/roll' )
    loopin.patch( 0, 'render/output/transform/rotate')

    loopin.patch( conf.image, 'osd/text' )

    return Promise.resolve()
    .then( () => loopin.patch( 'cover', 'render/output/transform/mode' ) )
    .then( () => loopin.testDelay() )
    .then( () => loopin.testPatchAndDisplay( 'contain', 'render/output/transform/mode' ) )
    .then( () => loopin.testDelay() )
    .then( () => loopin.patch( './transform/rotate', 'osd/text') )
    .then( () => loopin.testAnimate('render/output/transform/rotate', rand( 360 ) ) )
    .then( () => loopin.patch( 0, 'render/output/transform/rotate') )
    .then( () => loopin.patch( 'camera/view/roll', 'osd/text') )
    .then( () => loopin.testAnimate('camera/view/roll', rand( 360 ) ) )


  } )
  .then( () => loopin.testDelay() )
} )

function rand( v ) {
  v = parseFloat(v) || 1
  return Math.random() * v
}

function randInt( min, max  ) {
  return Math.floor( ( max - min ) * Math.random() ) + min
}
//   .then( () => loopin.testAnimate('render/output/layer/a/transform/rotate', 360, 4 ) )
//   .then( () => loopin.testDelay() )
//   .then( () => loopin.testAnimate('camera/spin/yaw', 180, 1 ) )
//   .then( () => loopin.testAnimate('camera/spin/roll', 45, 1 ) )
//   .then( () => loopin.testAnimate('camera/spin/zoom', 1, 1 ) )
//   .then( () => loopin.testAnimate('render/output/layer/a/transform/x', -1, 1 ) )
//   .then( () => loopin.testAnimate('render/output/layer/b/transform/scale', 0.1, 1, 1 ) )
//
//
//
// } )
