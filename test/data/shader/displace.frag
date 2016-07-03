#version 150

uniform sampler2DRect displaceSampler;
uniform sampler2DRect srcSampler;

in vec2 srcCoord;
in vec2 displaceCoord;
in vec2 displaceAmount;

out vec4 outputColour;

void main()
{
  vec2 tex = srcCoord;

  vec2 displace = texture(displaceSampler, displaceCoord ).xy;
  displace *= vec2( 2.0, 2.0 );
  displace -= vec2( 1.0, 1.0 );


  tex += displace * displaceAmount;
  vec4 c = texture(srcSampler, tex );

  outputColour = vec4( c.r, c.g, c.b, c.a );
}
