module.exports = loopinAnimate


function loopinAnimate() {
  const loopin = this

  // Make sure clock is ahead of us in the event chain
  loopin.plugin('clock')
  .on('frame', animate )



  var _callbacks = []

  loopin.animate = function ( callback ) {
    _callbacks.push( callback )
  }


  function animate( frame ) {
    _callbacks.forEach( function ( callback ) {
      const result = callback.call( loopin, frame )
      if ( result )
        loopin.patch( result )
    })
  }
}
