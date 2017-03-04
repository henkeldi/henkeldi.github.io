
class Renderbuffer{

	constructor(gl, internalformat, W, H){
		this.gl = gl;
		this.id = gl.createRenderbuffer();
		this.bind();
		gl.renderbufferStorage(gl.RENDERBUFFER, internalformat, W, H );
		this.unbind();
	}

	bind() {
		var gl = this.gl;
		gl.bindRenderbuffer(gl.RENDERBUFFER, this.id);
	}

	unbind() {
		var gl = this.gl;
		gl.bindRenderbuffer(gl.RENDERBUFFER, null);
	}

}