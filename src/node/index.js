[
  'bootstrap',
  'files',
  'tmp',
  'presetDir',
  'image',
  'save',
  'stdio',
  'shader',
  'shaderDir',
  'log',
  'assetDir',
  'imageDir',
  'bufferFile'
].map( ( k ) => exports[k] = require('./'+k) )
