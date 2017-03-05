

class Vertexformat {

	constructor(gl, shader, attribs) {
		this.gl = gl;
		this.shader = shader;
		this.attribs = attribs
		for(var i = 0; i<attribs.length; i++){
			var attrib_name = attribs[i][0];
			var size = attribs[i][1];
			var type = attribs[i][2];
			var normalized = attribs[i][3];
			var stride = attribs[i][4];
			var offset = attribs[i][5];
			var attrib_location = shader.attrib(attrib_name)
			gl.enableVertexAttribArray(attrib_location);
			gl.vertexAttribPointer(attrib_location, size, type, normalized, stride, offset);
		}
	}

	bind() {
		var attribs = this.attribs;
		var shader = this.shader;
		var gl = this.gl;
		for(var i = 0; i<attribs.length; i++){
			var attrib_name = attribs[i][0];
			var size = attribs[i][1];
			var type = attribs[i][2];
			var normalized = attribs[i][3];
			var stride = attribs[i][4];
			var offset = attribs[i][5];
			var attrib_location = shader.attrib(attrib_name)
			gl.vertexAttribPointer(attrib_location, size, type, normalized, stride, offset);
		}
	}

}