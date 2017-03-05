

class Camera {

	constructor(){
		this.view = [1,0,0,0,
					 0,1,0,0,
					 0,0,1,0,
					 0,0,0,1]
		this.proj = [1,0,0,0,
					 0,1,0,0,
					 0,0,1,0,
					 0,0,0,1]
		this.model = [0,-1,0,0,
					 1,0,0,0,
					 0,0,-1,0,
					 0,0,0,1]
		this.model = [-1,0,0,0,
					  0,0,1,0,
					  0,1,0,0,
					  0,0,0,1]
	}

	static normalize(vector){
		var norm = 0.0;
		for(var i=0; i < vector.length; i++){
			norm += vector[i]*vector[i];
		}
		norm = Math.sqrt(norm)
		var new_vector = [];
		for(var i=0; i < vector.length; i++){
			new_vector.push( 1.0*vector[i] / norm )
		}
		return new_vector;
	}

	static cross(a, b){
		return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
	}

	look_at(pos, target, up){
		var z = Camera.normalize( [ pos[0]-target[0], pos[1]-target[1], pos[2]-target[2], ] );
		var x = Camera.normalize(Camera.cross(up, z));
		var y = Camera.normalize(Camera.cross(z, x));

		this.view = [ x[0], x[1], x[2], - (x[0]*pos[0] + x[1]*pos[1] + x[2]*pos[2]),
					  y[0], y[1], y[2], - (y[0]*pos[0] + y[1]*pos[1] + y[2]*pos[2]),
					  z[0], z[1], z[2], - (z[0]*pos[0] + z[1]*pos[1] + z[2]*pos[2]),
					  0	  ,  0  ,  0  , 1]
		console.log(this.view)
	}

	glOrtho(left, right, bottom, top, nearVal, farVal){
        /*
            Source: https://www.opengl.org/sdk/docs/man2/xhtml/glOrtho.xhtml
        */
        var tx = - (right+left) / (right-left)
        var ty = - (top+bottom) / (top-bottom)
        var tz = - (farVal+nearVal) / (farVal-nearVal)

		this.proj = [ 2./(right-left),      0.,                     0.,                         tx ,
                             0.,                   2. / (top - bottom),    0.,                         ty  ,
                             0.,                   0.,                     -2. / (farVal - nearVal),   tz  ,
                             0.,                   0.,                     0.,                         1. ]
	}

	to_gl(shader){
		var gl = shader.gl;
		gl.uniformMatrix4fv(gl.getUniformLocation(shader.id, "model"), false, new Float32Array(this.model))
		gl.uniformMatrix4fv(gl.getUniformLocation(shader.id, "view"), false, new Float32Array(this.view))
		gl.uniformMatrix4fv(gl.getUniformLocation(shader.id, "proj"), false, new Float32Array(this.proj))
	}

}