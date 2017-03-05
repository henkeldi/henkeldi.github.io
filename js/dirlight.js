
class DirLight {

	constructor(light_pos, ambient, diffuse, specular){
		this.light_pos = new Float32Array(light_pos)
		this.ambient = new Float32Array(ambient)
		this.diffuse = new Float32Array(diffuse)
		this.specular = new Float32Array(specular)
	}

	to_gl(shader){
		var gl = shader.gl
        gl.uniform3fv(gl.getUniformLocation(shader.id, "dirLight.ambient"), this.ambient)
        gl.uniform3fv(gl.getUniformLocation(shader.id, "dirLight.diffuse"), this.diffuse)
        gl.uniform3fv(gl.getUniformLocation(shader.id, "dirLight.specular"), this.specular)
        gl.uniform3fv(gl.getUniformLocation(shader.id, "light_pos"), this.light_pos)
	}

}