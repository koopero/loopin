#version 150
/*
  A simple, old-school rotozoomer effect.
  Does not require non-default frag shader.
*/
uniform mat4 modelViewProjectionMatrix;

uniform float clockTime;

uniform float bufferAspect;

// openframeworks default model format
in vec4 position;

// varying
out vec2 srcCoord;


void main()
{
  float aspect = bufferAspect;
  float roto = clockTime;
  float zoom = cos( clockTime / 2.34 ) * 1. + 1.2;

  float sn = sin( roto );
  float cs = cos( roto );

  // here we move the texture coordinates
  srcCoord.x = position.x * cs * aspect - position.y * sn;
  srcCoord.y = position.x * sn * aspect + position.y * cs;
  srcCoord *= zoom;
  srcCoord += vec2( 0.5, 0.5 );
  // srcCoord = texcoord;


  // send the vertices to the fragment shader
  gl_Position = modelViewProjectionMatrix * position;
}
