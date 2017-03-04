
class Texture {

	constructor(gl, level, internalformat, W, H, border, format, type, pixels) {
		this.gl = gl
		this.id = gl.createTexture()
		this.bind()
		gl.texImage2D(gl.TEXTURE_2D, level, internalformat, W, H, border, format, type, pixels);
		gl.generateMipmap(gl.TEXTURE_2D);
		this.unbind()
	}

	setFilter(min_filter, max_filter){
		var gl = this.gl
		this.bind()
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, min_filter)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, max_filter)
		this.unbind()
	}

	setWrap(wrap_s, wrap_t) {
		var gl = this.gl
		this.bind()
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap_s)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap_t)
		this.unbind()
	}

	subImage(level, xoffset, yoffset, width, height,
						data_format, data_type, pixels){
		var gl = this.gl
		this.bind()
		gl.texSubImage2D(gl.TEXTURE_2D, level, xoffset, yoffset, 
            width, height, data_format, data_type, pixels)
		this.unbind()		
	}

	bind(){
		var gl = this.gl;
		gl.bindTexture(gl.TEXTURE_2D, this.id);
	}

	unbind(){
		var gl = this.gl;
		gl.bindTexture(gl.TEXTURE_2D, null);	
	}

}