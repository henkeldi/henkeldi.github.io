

class Vertexbuffer {

	constructor(gl, data, usage){
		this.gl = gl;
		this.id = gl.createBuffer()
		this.bufferData(data, usage)
	}

	bufferData(data, usage){
		var gl = this.gl;
		this.bind()
		gl.bufferData(gl.ARRAY_BUFFER, data, usage)
		this.unbind()
	}

	bind() {
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.id)
	}

	unbind() {
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null)
	}

	delete() {
		var gl = this.gl;
		gl.deleteBuffer(this.id)
	}

}