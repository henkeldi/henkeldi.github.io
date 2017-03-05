precision highp float;

varying vec2 TexCoords;

uniform sampler2D uSampler;

void main(){
	gl_FragColor = texture2D(uSampler, TexCoords);
	//gl_FragColor.a = 1.0;
}
