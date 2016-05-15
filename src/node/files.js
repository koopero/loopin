module.exports = files

files.options = require('boptions')({
  root: {
    '#type': 'string',
    '#default': ''
  }
})

const path = require('path')

function files () {
  const loopin = this
      , opt = files.options( arguments )

  loopin.filesResolve = function () {
    return path.resolve.bind( null, opt.root ).apply( null, arguments )
  }
}
