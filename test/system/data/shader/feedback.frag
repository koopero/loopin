#version 150

// Default uniforms
uniform sampler2D srcSampler;
uniform float clockDelta;
uniform int clockIndex;

uniform float feedbackBlurRadius = 0.0002;

//
uniform int feedbackBlurSamples = 3;

in vec2 srcCoord;
out vec4 outputColour;

float rand(vec2 co){
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

vec2 randVec2( vec2 co ) {
  return vec2(
    2.0 * rand( co.xy ) - 1.0,
    2.0 * rand( co.yx ) - 1.0
  );
}

void main()
{
  vec2 blurCoord = srcCoord;
  blurCoord -= vec2(.5,.5);
  blurCoord += vec2(.5,.5);

  vec4 blurColour = vec4(0.,0.,0.,0.);
  for ( int blurSample = feedbackBlurSamples - 1; blurSample >= 0; blurSample-- ) {
    vec2 blurSampleCoord = blurCoord;

    blurSampleCoord += randVec2( vec2( clockIndex, blurSample ) + gl_FragCoord.xy ) * feedbackBlurRadius;

    blurColour += texture(srcSampler, blurSampleCoord );
  }

  blurColour = blurColour * (1. / feedbackBlurSamples);

  vec4 fadeColour = blurColour;

  fadeColour *= 0.999;
  fadeColour.a = 1.0;
  outputColour = fadeColour;
}
