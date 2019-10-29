module.exports = watchFilePlugin

watchFilePlugin.options = require('boptions')({
  '#inline': ['file'],
  file: '#string'
})

const _ = require('lodash')
const pathlib = require('path')
const fs = require('fs-extra')
const chokidar = require('chokidar')
const Emitter = require('events')
const YAML = require('js-yaml')


function watchFilePlugin () {
  const loopin = this
  const opt = watchFilePlugin.options( arguments )
  const Promise = loopin.Promise

  loopin.watchFile = watchFile

  class watchFileInterface extends Emitter {
    constructor() {
      super()
      const opt = watchFilePlugin.options( arguments )
      let { file, scan=true, watch=true } = opt 
      this.file = loopin.filesResolve( file )
      this.opt = opt
      if ( scan ) this.scan()
      if ( watch ) this.watch()
    }

    async load() {
      const { file } = this
      let dir = pathlib.dirname( file )
      let ext = pathlib.extname( file )
      let base = pathlib.basename( file, ext )
      let type = opt.type || extensionToType( ext )
      let name = opt.name || base
      let patch = null
      let text = ''
      let data = null
      let error = null


      switch( type ) {
        case 'preset':
          await loadText()
          try {
            data = YAML.safeLoad( text )
          } catch( err ) {
            error = err 
          }
        break
      }


      let result = { file, name, type, text, data, patch, error }

      this.emit( 'load', result )
      return result


      async function loadText() {
        text = await fs.readFile( file, 'utf8' )
      }
    }

    async scan() {
      try {
        var stat = await fs.stat( this.file )
      } catch ( err ) {
        return false
      }

      if ( !stat.size )
        return false

      if ( !stat.isFile() )
        return false

      this.emit('change')
      return this.load()
    }

    watch() {
      this.unwatch()
      let usePolling = true
      this.watcher = chokidar.watch( this.file, {
        persistent: false,
        atomic: true,
        usePolling
      } )
      let onWatch = _.debounce( () => this.scan(), 100 )
      this.watcher.on( 'add', onWatch )
      this.watcher.on( 'change', onWatch )
    }

    unwatch() {
      if ( this.watcher ) {
        this.watcher.close()
      }
    }
  }

  function watchFile() {
    const opt = watchFilePlugin.options( arguments )
    let inter = new watchFileInterface( opt )
    return inter
  }
}

function extensionToType( ext ) {
  while ( ext[0] == '.' )
    ext = ext.substr( 1 )

  ext = ext.toLowerCase()

  if ( ['jpg','jpeg','png'].indexOf( ext ) != -1 )
    return 'image'

  if ( ['json','yaml','yml'].indexOf( ext ) != -1 )
    return 'preset'
  
  return ''
}