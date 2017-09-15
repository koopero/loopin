module.exports = bootstrap


function bootstrap() {
  const loopin = this
      , Promise = loopin.Promise

  loopin.plugin('hook')
  loopin.bootstrap = bootstrap

  function bootstrap() {
    return loopin.hookAll('bootstrap')
  }
}
