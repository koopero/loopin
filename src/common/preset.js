module.exports = preset

const _ = require('lodash')

function preset() {
  const loopin = this

  const presets = {}

  loopin.preset = preset
  loopin.preset._presets = presets
  loopin.presetAdd = presetAdd

  function preset( key, path ) {
    const preset = presets[key]

    if ( !_.isUndefined( preset ) ) {
      return loopin.patch( preset, path )
    }
  }

  function presetAdd( key, data ) {
    // console.log("presetAdd", key, data )
    // loopin.log('presetAdd', { key: key, data: data })
    presets[key] = data
  }
}
