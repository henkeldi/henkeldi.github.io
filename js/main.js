
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
		var shader = new Shader(gl, "js/shader/simple.vs", "js/shader/simple.frag");
		shader.compile();
		shader.use();
		shader.attributeSetFloats("pos", 3, [
			-1, 0, 0,
			0, 1, 0,
			0, -1, 0,
			1, 0, 0,
		]);
		this.onResize();
	}

	onResize() {
	    canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.draw();
	}

	draw() {
        var gl = this.gl;
        gl.viewport(0, 0, window.innerWidth, window.innerHeight);
    	gl.clearColor(0.2, 0.2, 0.3, 1);
		gl.clear(gl.COLOR_BUFFER_BIT);

    	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	}



}