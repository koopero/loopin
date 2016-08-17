const Loopin = require('../../node')
    , test = require('./test')


describe('tmp', function () {
  describe('tmpFile', function () {
    it('works', function () {
      const loopin = Loopin()

      loopin.plugin('files')
      loopin.filesRoot( test.resolveData() )

      loopin.plugin('tmp')

      const result = loopin.tmpFile()
      loopin.log( result )
    })
  })
})
