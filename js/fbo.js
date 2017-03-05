
class Framebuffer {

	constructor(gl, attachments) {
		this.gl = gl;
		this.id = gl.createFramebuffer();
		this.bind()
		for(var i=0 ; i< attachments.length; i++){
			var attachement_type = attachments[i][0]
			var attachement = attachments[i][1]
			if (attachement instanceof Texture){
				gl.framebufferTexture2D(gl.FRAMEBUFFER, attachement_type, gl.TEXTURE_2D, attachement.id, 0)
			}else if(attachement instanceof Renderbuffer){
				gl.framebufferRenderbuffer(gl.FRAMEBUFFER, attachement_type, gl.RENDERBUFFER, attachement.id)
			}else
				throw 'Invalid framebuffer attachement.';
		}

		var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
		if (gl.FRAMEBUFFER_COMPLETE !== status) {
			throw 'Framebuffer not complete.';	
		}
		this.unbind()
	}

	bind(){
		var gl = this.gl;
		gl.bindFramebuffer(gl.FRAMEBUFFER, this.id);
	}

	unbind(){
		var gl = this.gl;
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	}

	delete(){
		var gl = this.gl;
		gl.deleteFramebuffer(this.id);	
	}

}