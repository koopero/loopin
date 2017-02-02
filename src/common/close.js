module.exports = loopinClose

function loopinClose() {
  const loopin = this

  loopin.plugin('hook')

  loopin.close = function () {
    return loopin.hookAll( 'close' )
  }
}
