[
  'bootstrap',
  'files',
  'presetDir',
  'image',
  'save',
  'stdio',
  'shader',
  'log',
  'assetDir'
].map( ( k ) => exports[k] = require('./'+k) )
