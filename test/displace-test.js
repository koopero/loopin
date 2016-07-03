require('./test')( 'displace', 'shader-test', function ( loopin ) {
  return loopin.Promise.resolve()
  .then( () => loopin.testAnimate('render/output/float/amount', 0.1, 15 ) )
  .then( () => loopin.read() )
  .then( JSON.stringify )
  .then( console.log )
  // .then( () => loopin.testResult() )

  // .then( () => loopin.testDelay( 10000 ) )
  // .then( () => interval && clearInterval( interval ) )

} )
