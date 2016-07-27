#version 150

uniform sampler2DRect srcSampler;


in vec2 srcCoord;
out vec4 outputColour;

void main()
{
  vec4 c = texture(srcSampler, srcCoord);

  outputColour = vec4( c.r, c.g, c.b, c.a );
}
