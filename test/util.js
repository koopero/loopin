const path = require('path')
exports.resolveData = path.resolve.bind( null, __dirname, 'data' )
