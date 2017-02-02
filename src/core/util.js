const _ = require('lodash')
const util = exports

util.leadingDot = ( str ) => !str || !str.length ? '' : str[0] == '.' ? str : '.' + str
