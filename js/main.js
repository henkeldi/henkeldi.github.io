
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

		this.rect_shader = new Shader(gl, "js/shader/rect.vs", "js/shader/rect.frag");
		this.rect_shader.compile();

		this.vertexbuffer = new Vertexbuffer(gl, new Float32Array(vert_norms), gl.STATIC_DRAW);
		this.vertexformat = new Vertexformat(gl, this.texture_shader,
								[ 	["position", 3, gl.FLOAT, false, 5*4, 0],
									["texCoords", 2, gl.FLOAT, false, 5*4, 3*4]]);


		var vert_norms_rect = 
		[	
			-0.2, -0.2,0,
			0.2, -0.2, 0, 
			0.2, 0.2,  0, 
			-0.2, 0.2, 0,
		]

		this.vbo_rect_buffer = new Vertexbuffer(gl, new Float32Array(vert_norms_rect), gl.DYNAMIC_DRAW);
		this.vbo_rect_format = new Vertexformat(gl, this.texture_shader,
								[["position", 2, gl.FLOAT, false, 2*4, 0]]);

		this.draw();
		this.dragged = false;
		this.curX = 0.0
		this.curY = 0.0
	    window.onmousedown = function(ev) {
	        self.dragged = true;
			self.curX = 2.0*ev.clientX / self.canvas.width - 1.0;
			self.curY = -2.0*ev.clientY / self.canvas.height + 1.0; 
	    };

    	window.onmouseup = function(ev) {
        	self.dragged = false;
        	self.draw()
	    };

		window.addEventListener('resize', this.on_resize, false);
		window.onmousemove = function(ev) {
			if(self.dragged) {
				var norm_X = 2.0*ev.clientX / self.canvas.width - 1.0;
				var norm_Y = -2.0*ev.clientY / self.canvas.height + 1.0; 

				var x_min = Math.min(self.curX, norm_X)
				var x_max = Math.max(self.curX, norm_X)
				var y_min = Math.min(self.curY, norm_Y)
				var y_max = Math.max(self.curY, norm_Y)
	
				var vert_norms_rect = 
				[	
					x_min, y_min,
					x_max, y_min, 
					x_max, y_max, 
					x_min, y_max
				]
				self.vbo_rect_buffer.bufferSubData(0, new Float32Array(vert_norms_rect))
				self.draw()
			}
        }
		this.texture_loaded = false;
		gl.enable(gl.BLEND)
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
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
		this.vertexbuffer.bind()
		this.vertexformat.bind()
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
		if(self.dragged) {
			this.rect_shader.use()
			this.vbo_rect_buffer.bind()
			this.vbo_rect_format.bind()
			gl.enable(gl.BLEND)
			gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
			gl.disable(gl.BLEND)
			gl.lineWidth(2.0)
			gl.drawArrays(gl.LINE_LOOP, 0, 4);
		}

	}

}