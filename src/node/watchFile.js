module.exports = watchFilePlugin

watchFilePlugin.options = require('boptions')({
  '#inline': ['file'],
  file: '#string',
  name: '',
  buffer: '',
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
      // console.log( { opt } )
      // process.exit()
      // if ( scan ) this.scan()
      if ( watch ) this.watch()
    }

    async load() {
      const { file, opt } = this
      let dir = pathlib.dirname( file )
      let ext = pathlib.extname( file )
      let base = pathlib.basename( file, ext )
      let type = opt.type || extensionToType( ext )
      let name = opt.name || base
      let patch = null
      let text = ''
      let error = null
      let buffer = opt.buffer || name


      switch( type ) {
        case 'preset':
          await loadText()
          patch = text
        break

        case 'image':
          patch = `
            image/${name}:
              src: "${file}"
              buffer: "${buffer}"
          `
        break
      }

      let result = { file, name, type, text, patch, error, buffer }
      this.emit( 'load', result )
      loopin.log( 'watchFile', file, { data: { name, type, buffer } } )

      if ( patch )
        await loopin.patchYAML( patch )

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
      let onWatch = _.debounce( () => this.scan(), 200 )
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