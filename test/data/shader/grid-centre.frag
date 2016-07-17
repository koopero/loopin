#version 150

// this is how we receive the texture
uniform sampler2DRect src;
uniform sampler2DRect src1;
// this is how we receive the texture
uniform mat3 srcMatrix;
uniform mat3 src1Matrix;

in vec2 v_tex;
out vec4 outputColor;

void main()
{
  // vec4 texV4 = vec4( v_tex.x, v_tex.y, 0.0, 1.0 );
  // vec2 texSize = textureSize( src );
  //
  // vec4 c = texture(src, (texV4 * srcMatrix).xy * texSize );
  // vec4 d = texture(src1, v_tex );

  outputColor.r = v_tex.x;
  outputColor.g = v_tex.y;
  outputColor.b = 0.0 - v_tex.y;
  outputColor.a = 1.0;


  // outputColor = vec4( , v_tex.y, c.b * d.b, 1.0 );
  // outputColor = vec4( 1.0, 1.0, 0.0, c.a );

}
