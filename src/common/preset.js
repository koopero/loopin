module.exports = preset

const _ = require('lodash')
    , H = require('horten')

function preset() {
  const loopin = this

  const presets = {}

  loopin.preset = preset
  loopin.preset._presets = presets

  loopin.presetAdd = presetAdd
  loopin.presetList = presetList

  function preset( key, path ) {
    const preset = presets[key]

    if ( !_.isUndefined( preset ) ) {
      return loopin.patch( preset.data, path )
    } else {
      loopin.log('presetNotFound', { key } )
    }
  }

  function presetAdd( key, data, meta ) {
    meta = meta || {}
    meta.name = key
    meta.title = meta.title || key
    meta.data = H.util.compose( data )
    presets[key] = meta
  }

  function presetList() {
    return presets
  }
}
