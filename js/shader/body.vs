
attribute vec3 position;
attribute vec3 normal;

uniform mat4 model;
uniform mat4 view;
uniform mat4 proj;

varying vec3 Normal;
varying vec3 LightDir;
varying vec3 ViewDir;

uniform vec3 light_pos;

void main(void){
	mat4 mv_matrix = view * model;

	vec4 P = mv_matrix * vec4(position, 1.0);

	Normal = mat3(mv_matrix) * normalize(normal);
	LightDir = light_pos - P.xyz;
	ViewDir = -P.xyz;

	gl_Position = proj * P;
}