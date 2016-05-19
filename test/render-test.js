const util = require('./util')

const Loopin = require('../node.js')
    , loopin = Loopin()

loopin.plugin('log')
loopin.plugin('bootstrap', {
  builder: {
    cwd: util.resolveData()
  }
})
.then( function () {
  loopin.patch( {
    // image: {
    //   foo: "bars.png",
    //   bar: 'indian.png'
    // }
    kinect: {
      foo: true,
    },
    show: 'foo'
  })

  setTimeout( function () {
    loopin.destroy()
    .then( () => console.log('done') )
  },100000)

})
