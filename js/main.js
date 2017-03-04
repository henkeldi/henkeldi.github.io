
function main() {
	var canvas = document.getElementById("canvas")
	var gl = document.getElementById("canvas").getContext("webgl");
	main = new Main(gl, canvas);
}

class Main {

	constructor(gl, canvas){
		this.gl = gl;
		this.canvas = canvas;
		window.addEventListener('resize', this.onResize, false);
		this.shader = new Shader(gl, "js/shader/simple.vs", "js/shader/simple.frag");
		this.shader.compile();

		this.color1 = new Texture(gl, 0, gl.RGBA, window.innerWidth, window.innerHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
		this.color1.setFilter(gl.LINEAR, gl.LINEAR)
		this.color1.setWrap(gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE)

		this.fbo = new Framebuffer(gl, [[gl.COLOR_ATTACHMENT0, this.color1]]);

		this.blur_shader = new Shader(gl, "js/shader/blur.vs", "js/shader/blur.frag");
		this.blur_shader.compile()

		this.onResize();
	}

	onResize() {
	    canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.draw();
	}

	draw() {
        var gl = this.gl;
        this.fbo.bind();
		this.shader.use();
		this.shader.attributeSetFloats("pos", 3, [
			-1, 0, 0,
			0, 1, 0,
			0, -1, 0,
			1, 0, 0,
		]);
    	gl.clearColor(0.55, 0.2, 0.3, 1);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.viewport(0, 0, window.innerWidth, window.innerHeight);
    	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    	
    	this.fbo.unbind();
    	gl.clearColor(0.8, 0.0, 0.0, 1);
    	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    	gl.viewport(0, 0, window.innerWidth, window.innerHeight);
    	this.blur_shader.use();
		this.blur_shader.attributeSetFloats("position", 2, [
			-1, -1,
			1, -1, 
			1, 1,
			-1, 1
		]);
		this.blur_shader.attributeSetFloats("texCoords", 2, [
			0, 0,
			1, 0, 
			1, 1,
			0, 1
		]);

    	gl.activeTexture(gl.TEXTURE0);
    	gl.uniform1i( gl.getUniformLocation(this.blur_shader.id, "uSampler"), 0);
    	this.color1.bind();
    	gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    	this.color1.unbind();
	}

}