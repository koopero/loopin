[
  'bootstrap',
  'files',
  'tmp',
  'presetDir',
  'image',
  'save',
  'shader',
  'shaderDir',
  'log',
  'assetDir',
  'imageDir',
  'bufferFile',
  'watchFile',
].map( ( k ) => exports[k] = require('./'+k) )
