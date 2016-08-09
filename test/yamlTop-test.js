const assert = require('assert')
describe('yamlTop', function () {
  const yamlTop = require('../src/util/yamlTop')

  it('works', function () {
    const source = [
      '# ',
      '# Description',
      '# Second Line',
      '# ',
      '',
      'somekey: somevalue',
      '#ignore this comment'
    ].join('\n')

    const result = yamlTop( source )
    assert.equal( result, 'Description\nSecond Line')
  })

  it('deals with blank header', function () {
    const source = [
      '# ',
      '#',
      '#',
      '# ',
      '',
      'somekey: somevalue',
      '#ignore this comment'
    ].join('\n')

    const result = yamlTop( source )
    assert.equal( result, '' )
  })


})
