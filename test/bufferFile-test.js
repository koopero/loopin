const util = require('./util')

const loopin = util.newLoopin()

loopin.preset('bars')
loopin.plugin('bufferFile')

loopin.bufferFile('bars')
.then( ( result ) => loopin.log('done', 'test', { result: result } ) )
.then( () => loopin.close() )
