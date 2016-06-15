[
  'bootstrap',
  'files',
  'tmp',
  'presetDir',
  'image',
  'save',
  'stdio',
  'shader',
  'log',
  'assetDir',
  'bufferFile'
].map( ( k ) => exports[k] = require('./'+k) )
