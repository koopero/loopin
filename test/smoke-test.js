
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
    image:    { img: "indian.png" },
    show: 'img'
  })

  setTimeout( function () {
    loopin.destroy()
    .then( () => console.log('done') )
  },120000)

})
