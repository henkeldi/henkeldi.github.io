precision highp float;

struct Material {
	vec3 ambient;
	vec3 diffuse;
    vec3 specular;
    float shininess;
};

struct DirLight {
	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
};

uniform Material material;
uniform DirLight dirLight;

varying vec3 Normal;
varying vec3 LightDir;
varying vec3 ViewDir;

void main(){
	vec3 Normal = normalize(Normal);
	vec3 LightDir = normalize(LightDir);
	vec3 ViewDir = normalize(ViewDir);
	vec3 ambient = material.ambient;
	vec3 diffuse = max(dot(Normal, LightDir), 0.0) * material.diffuse;
	
	vec3 R = reflect(-LightDir, Normal);
	vec3 specular = pow(max(dot(R, ViewDir), 0.0), material.shininess) * material.specular;

	gl_FragColor = vec4( 	dirLight.ambient * ambient +
							dirLight.diffuse * diffuse +
							dirLight.specular * specular, 1.0);
}
