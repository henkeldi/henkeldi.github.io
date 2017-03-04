precision highp float;

varying vec2 TexCoords;

uniform sampler2D uSampler;

void main(){
	// vec4(0.2, 0.3, 0.8, 1.0);
	gl_FragColor = texture2D(uSampler, TexCoords);
}
