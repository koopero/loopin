#version 150

// these are for the programmable pipeline system and are passed in
// by default from OpenFrameworks
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 modelViewProjectionMatrix;

// Loopin default src
uniform sampler2DRect srcSampler;
uniform mat4 srcMatrix;



// Loopin feedback



// openframeworks default model format
in vec4 position;
in vec4 color;
in vec4 normal;
in vec2 texcoord;

// Loopin texture 'displace'
uniform sampler2DRect displaceSampler;
uniform mat4 displaceMatrix;

uniform float amount;

// varying
out vec2 srcCoord;
out vec2 displaceCoord;
out vec2 displaceAmount;


void main()
{
    // here we move the texture coordinates
    srcCoord = vec2(texcoord.x, texcoord.y);
    srcCoord = (srcMatrix*vec4(srcCoord.x,srcCoord.y,0,1)).xy;
    srcCoord *= textureSize( srcSampler );

    displaceCoord = vec2(texcoord.x, texcoord.y);
    displaceCoord = (displaceMatrix*vec4(displaceCoord.x,displaceCoord.y,0,1)).xy;
    displaceCoord *= textureSize( displaceSampler );

    displaceAmount = textureSize( displaceSampler ) * amount;


    // send the vertices to the fragment shader
    gl_Position = modelViewProjectionMatrix * position;
}
