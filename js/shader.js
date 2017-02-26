
class Shader {

	constructor(gl, vertex_shader_path, fragment_shader_path) {
		this.gl = gl;
		this.vertex_shader_path = vertex_shader_path;
		this.fragment_shader_path = fragment_shader_path;
	}

	compile(){
		var gl = this.gl;
		
		var vertex_shader = this._compileShader(this.vertex_shader_path, gl.VERTEX_SHADER);
		var fragment_shader = this._compileShader(this.fragment_shader_path, gl.FRAGMENT_SHADER);

		this.program = gl.createProgram();
		
		gl.attachShader(this.program, vertex_shader);
		gl.attachShader(this.program, fragment_shader);
		
		gl.linkProgram(this.program);

        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            console.log(glGetProgramInfoLog(this.program));
            throw "Shader linking failed!";
		} else {
            //console.log("Shader linked.");
		}
		gl.deleteShader(vertex_shader);
		gl.deleteShader(fragment_shader);
	}

	_compileShader(shader_path, shader_type){
		var gl = this.gl;
        var shader_code = this._readFile(shader_path)
        var shader = gl.createShader(shader_type);
        gl.shaderSource(shader, shader_code);
        gl.compileShader(shader);
        if (! gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(shader));
            throw 'Shader compilation failed!';
        } else {
            //console.log("Shader compiled ({0}).", shader_path);
        }
        return shader;
	}

	_readFile(path) {
		var request = new XMLHttpRequest();
		request.open('GET', path, false);  // `false` makes the request synchronous
		request.overrideMimeType('text/plain');
		request.send(null);

		if (request.status === 200) {

		  return request.responseText;
		} else {
			throw "Could not read file.";
		}
	}

	use() {
		this.gl.useProgram(this.program);
	}

	attributeSetFloats(attr_name, rsize, arr) {
		var gl = this.gl;
		var prog = this.program
		gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arr), gl.STATIC_DRAW);
		var attr = gl.getAttribLocation(prog, attr_name);
		gl.enableVertexAttribArray(attr);
		gl.vertexAttribPointer(attr, rsize, gl.FLOAT, false, 0, 0);
	}
}