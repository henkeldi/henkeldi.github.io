
attribute vec3 position;
attribute vec2 texCoords;

varying vec2 TexCoords;

void main(void){
	gl_Position = vec4(position, 2.0);
	TexCoords = texCoords;
}