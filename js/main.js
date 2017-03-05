
function main() {
	var canvas = document.getElementById("canvas")
	var gl = document.getElementById("canvas").getContext("webgl");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	main = new Main(gl, canvas);
}

class Main {

	constructor(gl, canvas){
		this.gl = gl;
		gl.clearColor(54/255.0, 52/255.0, 64/255.0, 1);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.viewport(0, 0, window.innerWidth, window.innerHeight);
		this.canvas = canvas;
		self = this;

		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		this.texture_shader = new Shader(gl, "js/shader/texture.vs", "js/shader/texture.frag");
		this.texture_shader.compile();

		this.init_fbo(this);

		this.screen_shader = new Shader(gl, "js/shader/screen.vs", "js/shader/screen.frag");
		this.screen_shader.compile();

		this.texture = new Texture(gl, gl.LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE);

		this.texture.image = new Image();
		this.texture.image.onload = function() { self.on_texture_loaded(self, gl, self.texture) };
		this.texture.image.src = "js/assets/img/024.png";

		var vert_norms = 
		[	
			-1, 0, 0, 0, 0,
			0, -1, 0, 1, 0,
			1, 0, 0, 1, 1,
			0, 1, 0, 0, 1,
			-1, -1, 0, 0, 0,
			1, -1, 0, 1, 0, 
			1, 1, 0, 1, 1,
			-1, 1, 0, 0, 1
		]

		//fetch("js/assets/img/024.png").then((res) => console.log(res))

		this.vertexbuffer = new Vertexbuffer(gl, new Float32Array(vert_norms), gl.STATIC_DRAW);

		this.vertexformat = new Vertexformat(gl, this.texture_shader,
								[ 	["position", 3, gl.FLOAT, false, 5*4, 0],
									["texCoords", 2, gl.FLOAT, false, 5*4, 3*4]]);

		this.vertexbuffer.bind()
		this.vertexformat.bind()

		this.draw();
		window.addEventListener('resize', this.on_resize, false);
		this.texture_loaded = false;
	}

	init_fbo(self){
		var gl = self.gl;
		self.color1 = new Texture(gl, gl.LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE);
		self.color1.texImage(0, gl.RGBA, window.innerWidth, window.innerHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
		self.fbo = new Framebuffer(gl, [[gl.COLOR_ATTACHMENT0, self.color1]]);	
	}

	on_texture_loaded(self, gl, texture){
		self.texture.texImage2D(0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, self.texture.image);
		self.texture_loaded = true
		self.draw();
	}

	on_resize() {
		self.canvas.width = window.innerWidth;
		self.canvas.height = window.innerHeight;
		
		self.color1.delete();
		self.fbo.delete();

		self.init_fbo(self);
		self.draw();
	}

	draw() {
		var gl = this.gl;
		
		// PASS 0
		if(this.texture_loaded){
			this.fbo.bind();
				this.texture_shader.use();
					gl.clearColor(54/255.0, 52/255.0, 64/255.0, 1);
					gl.clear(gl.COLOR_BUFFER_BIT);
					gl.viewport(0, 0, window.innerWidth, window.innerHeight);
					
					gl.activeTexture(gl.TEXTURE0);
					gl.uniform1i( gl.getUniformLocation(this.texture_shader.id, "uSampler"), 0);
					this.texture.bind();
						gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
					this.texture.unbind();
			this.fbo.unbind();
		}

		// PASS 1
		this.screen_shader.use();
			gl.clearColor(0.8, 0.0, 0.0, 1);
			gl.clear(gl.COLOR_BUFFER_BIT);
			gl.viewport(0, 0, window.innerWidth, window.innerHeight);
	
			gl.activeTexture(gl.TEXTURE0);
			gl.uniform1i( gl.getUniformLocation(this.screen_shader.id, "uSampler"), 0);
			this.color1.bind();
				gl.drawArrays(gl.TRIANGLE_FAN, 4, 4);
			this.color1.unbind();
	}

}