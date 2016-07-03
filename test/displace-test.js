require('./test')( 'displace', 'shader-test', function ( loopin ) {
  return loopin.Promise.resolve()
  .then( () => loopin.testAnimate('render/output/float/amount', 0.1, 5 ) )
} )
