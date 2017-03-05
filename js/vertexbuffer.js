

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

	bufferSubData(offset, data){
		var gl = this.gl;
		this.bind()
		gl.bufferSubData(gl.ARRAY_BUFFER, offset, data)
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