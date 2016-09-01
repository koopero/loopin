#version 150

uniform sampler2D srcSampler;

in vec2 srcCoord;
out vec4 outputColour;

void main()
{
  vec2 coord = srcCoord;
  coord -= vec2(.5,.5);
  coord /= 1.01;
  coord += vec2(.5,.5);


  vec4 c = texture(srcSampler, coord);
  c *= 0.94;
  c.a = 1.0;
  outputColour = c;
}
