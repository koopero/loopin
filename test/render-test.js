const util = require('./util')

const Loopin = require('../node.js')
    , loopin = Loopin()

loopin.plugin('log')
loopin.plugin('bootstrap', {
  builder: {
    verbose: true,
    cwd: util.resolveData()
  }
})
.then( function () {
  loopin.patch( {
    image:    { indian: "indian.png", bars: 'bars.png' },
    render:   { out: {
      src: 'indian',
      shader: 'rainbow',
      tex: {
        src1: 'indian'
      }
    }},
    buffer:   { out: {
      width: 320,
      height: 240
    }},
    show: 'out'
  })

  setTimeout( function () {
    loopin.read('render')
      .then( console.log )
  },5000)

  setTimeout( function () {
    loopin.destroy()
    .then( () => console.log('done') )
  },120000)

})
