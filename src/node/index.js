[
  'bootstrap',
  'files',
  'presetDir',
  'image',
  'save',
  'stdio',
  'log'
].map( ( k ) => exports[k] = require('./'+k) )
