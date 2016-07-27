#version 150

// these are for the programmable pipeline system and are passed in
// by default from OpenFrameworks
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 textureMatrix;
uniform mat4 modelViewProjectionMatrix;

// Loopin default src
uniform sampler2DRect srcSampler;
uniform mat4 srcMatrix;

// Loopin feedback


// Loopin frame
uniform float frameTime;
uniform int   frameIndex;
uniform float frameDelta;

// openframeworks default model format
in vec4 position;
in vec4 color;
in vec4 normal;
in vec2 texcoord;

// varying
out vec2 srcCoord;


void main()
{
    // here we move the texture coordinates
    srcCoord = vec2(texcoord.x, texcoord.y);
    srcCoord = (srcMatrix*vec4(srcCoord.x,srcCoord.y,0,1)).xy;
    vTex *= textureSize( srcSampler );


    // send the vertices to the fragment shader
    gl_Position = modelViewProjectionMatrix * position;
}
