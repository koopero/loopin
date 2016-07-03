module.exports = test

const path = require('path')

test.resolveData = path.resolve.bind( null, __dirname, 'data/' )

test.newLoopin = function ( opt ) {
  const Loopin = require('../node.js')
      , loopin = Loopin()

  loopin.plugin('files')
  loopin.filesRoot( test.resolveData() )

  loopin.plugin('presetDir')

  loopin.plugin('preset')

  loopin.plugin('bootstrap', {
    builder: {
      verbose: true,
      cwd: test.resolveData()
    }
  })


  return loopin
}

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
      this.timeout( 15000 )
      it('works', function ( cb ) {
        run()
        .then( () => cb() )
      })
    } )
  }


  function run() {
    const Loopin = require('../node.js')
        , loopin = Loopin()

    loopin.plugin('files')
    loopin.filesRoot( test.resolveData() )

    loopin.plugin('presetDir')
    loopin.plugin('preset')
    loopin.plugin('log')
    loopin.plugin('test')

    loopin.patch( opt.name, 'window/title')

    if ( opt.preset ) {
      loopin.preset( opt.preset )
    }

    var promise = loopin.plugin('bootstrap', {
      native: {
        verbose: true,
        runCwd: test.resolveData()
      }
    })

    if ( opt.func ) {
      promise = promise.then( () => opt.func( loopin ) )
    }

    promise = promise.then( function() {
      return loopin.close()
    })

    return promise
  }
}