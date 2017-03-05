
function main() {
	var canvas = document.getElementById("canvas")
	var gl = document.getElementById("canvas").getContext("webgl");
	main = new Main(gl, canvas);
}

class Main {

	constructor(gl, canvas){
		this.gl = gl;
		this.canvas = canvas;
	    canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
		window.addEventListener('resize', this.onResize, false);
		this.texture_shader = new Shader(gl, "js/shader/texture.vs", "js/shader/texture.frag");
		this.texture_shader.compile();

		this.color1 = new Texture(gl, gl.LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE)
		this.color1.texImage(0, gl.RGBA, window.innerWidth, window.innerHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)

		this.fbo = new Framebuffer(gl, [[gl.COLOR_ATTACHMENT0, this.color1]]);

		this.screen_shader = new Shader(gl, "js/shader/screen.vs", "js/shader/screen.frag");
		this.screen_shader.compile()

		this.texture = new Texture(gl, gl.LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE);		

  		this.texture.image = new Image();

		self = this;
  		this.texture.image.onload = function() { 
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  			self.texture.texImage2D(0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, self.texture.image)
  			self.draw()
  		}
  		this.texture.image.src = "js/assets/img/024.png";
	}

	onResize() {
	    canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
	}

	draw() {
        var gl = this.gl;
        this.fbo.bind();
		this.texture_shader.use();
		this.texture_shader.attributeSetFloats("position", 3, [
			-1, 0, 0,
			0, -1, 0,
			1, 0, 0,
			0, 1, 0
		]);
		this.screen_shader.attributeSetFloats("texCoords", 2, [
			0, 0,
			1, 0,
			1, 1,
			0, 1
		]);
    	gl.clearColor(54/255.0, 52/255.0, 64/255.0, 1);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.viewport(0, 0, window.innerWidth, window.innerHeight);
    	
    	gl.activeTexture(gl.TEXTURE0);
    	gl.uniform1i( gl.getUniformLocation(this.screen_shader.id, "uSampler"), 0);
    	this.texture.bind();
    	gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    	this.texture.unbind();

    	this.fbo.unbind();
    	gl.clearColor(0.8, 0.0, 0.0, 1);
    	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    	gl.viewport(0, 0, window.innerWidth, window.innerHeight);
    	this.screen_shader.use();
		this.screen_shader.attributeSetFloats("position", 2, [
			-1, -1,
			1, -1,
			1, 1,
			-1, 1
		]);
		this.screen_shader.attributeSetFloats("texCoords", 2, [
			0, 0,
			1, 0, 
			1, 1,
			0, 1
		]);

    	gl.activeTexture(gl.TEXTURE0);
    	gl.uniform1i( gl.getUniformLocation(this.screen_shader.id, "uSampler"), 0);
    	this.color1.bind();
    	gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    	this.color1.unbind();
	}

}