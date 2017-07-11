module.exports = test

const path = require('path')

test.resolveData = path.resolve.bind( null, __dirname, 'data/' )

test.options = require('boptions')({
  '#inline': ['name','preset', 'func'],
  'name': 'anonymous-test',
  'preset': '',
  'func': '#function'
})


function test ( func ) {
  const opt = test.options( arguments )


  if ( global.describe ) {
    wrapMocha()
  } else {
    return run()
  }

  function wrapMocha() {
    describe( opt.name, function () {
      it('works', function ( cb ) {
        run()
        .then( () => cb() )
      })
    } )
  }


  function run() {
    const Loopin = require('../../node.js')
        , loopin = Loopin()

    loopin.plugin('files')
    loopin.filesRoot( test.resolveData() )

    loopin.plugin('presetDir', { autoload: false } )
    loopin.plugin('preset')
    loopin.plugin('log')
    loopin.plugin('test')

    loopin.patch( opt.name, 'window/title')
    loopin.patch( opt.name, 'osd/client')


    if ( opt.preset ) {
      loopin.preset( opt.preset )
    }

    var promise = loopin.plugin('bootstrap', {
      native: {
        verbose: true,
        runCwd: test.resolveData()
      }
    })

    promise = promise.delay(1000)

    if ( opt.func ) {
      promise = promise.then( () => opt.func( loopin ) )
    }

    promise = promise.then( function() {
      return loopin.close()
    })

    return promise
  }
}
