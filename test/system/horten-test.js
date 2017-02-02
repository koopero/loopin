const H = require('horten')
new H.Tracer( {
  path: 'loopin/',
  listening: true
})

require('./test')( 'horten-test', function ( loopin ) {
  loopin.plugin('horten', 'loopin/')

  H.root.patch( 'image/earth.jpg', 'loopin/image/out/src' )

  return loopin.testDelay()
})
