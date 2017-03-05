
class Material {

	constructor(ambient, diffuse, specular, shininess){
		this.ambient = new Float32Array(ambient);
		this.diffuse = new Float32Array( diffuse);
		this.specular = new Float32Array( specular);
		this.shininess = shininess;
	}

	to_gl(shader) {
		var gl = shader.gl
		gl.uniform3fv(gl.getUniformLocation(shader.id, 'material.ambient'), this.ambient)
		gl.uniform3fv(gl.getUniformLocation(shader.id, 'material.diffuse'), this.diffuse)
		gl.uniform3fv(gl.getUniformLocation(shader.id, 'material.specular'), this.specular)
		gl.uniform1f(gl.getUniformLocation(shader.id, 'material.shininess'), this.shininess)
	}

}

Material.Emerald        = new Material( [0.633     , 0.727811  , 0.633     ], [0.07568   , 0.61424   , 0.07568   ], [0.0215    , 0.1745    , 0.0215    ], 0.6       )
Material.Jade           = new Material( [0.316228  , 0.316228  , 0.316228  ], [0.54      , 0.89      , 0.63      ], [0.135     , 0.2225    , 0.1575    ], 0.1       )
Material.Obsidian       = new Material( [0.332741  , 0.328634  , 0.346435  ], [0.18275   , 0.17      , 0.22525   ], [0.05375   , 0.05      , 0.06625   ], 0.3       )
Material.Pearl          = new Material( [0.296648  , 0.296648  , 0.296648  ], [1         , 0.829     , 0.829     ], [0.25      , 0.20725   , 0.20725   ], 0.088     )
Material.Ruby           = new Material( [0.727811  , 0.626959  , 0.626959  ], [0.61424   , 0.04136   , 0.04136   ], [0.1745    , 0.01175   , 0.01175   ], 0.6       )
Material.Turquoise      = new Material( [0.297254  , 0.30829   , 0.306678  ], [0.396     , 0.74151   , 0.69102   ], [0.1       , 0.18725   , 0.1745    ], 0.1       )

Material.Brass          = new Material( [0.992157  , 0.941176  , 0.807843  ], [0.780392  , 0.568627  , 0.113725  ], [0.329412  , 0.223529  , 0.027451  ], 0.21794872)
Material.Bonze          = new Material( [0.393548  , 0.271906  , 0.166721  ], [0.714     , 0.4284    , 0.18144   ], [0.2125    , 0.1275    , 0.054     ], 0.2       )
Material.Chrome         = new Material( [0.774597  , 0.774597  , 0.774597  ], [0.4       , 0.4       , 0.4       ], [0.25      , 0.25      , 0.25      ], 0.6       )
Material.Copper         = new Material( [0.256777  , 0.137622  , 0.086014  ], [0.7038    , 0.27048   , 0.0828    ], [0.19125   , 0.0735    , 0.0225    ], 0.1       )
Material.Gold           = new Material( [0.628281  , 0.555802  , 0.366065  ], [0.75164   , 0.60648   , 0.22648   ], [0.24725   , 0.1995    , 0.0745    ], 0.4       )
Material.Silver         = new Material( [0.508273  , 0.508273  , 0.508273  ], [0.50754   , 0.50754   , 0.50754   ], [0.19225   , 0.19225   , 0.19225   ], 0.4       )

Material.BlackPlastic   = new Material( [0.50      , 0.50      , 0.50      ], [0.01      , 0.01      , 0.01      ], [0.0       , 0.0       , 0.0       ], 0.25      )
Material.CyanPlastic    = new Material( [0.50196078, 0.50196078, 0.50196078], [0.0       , 0.50980392, 0.50980392], [0.0       , 0.1       , 0.06      ], 0.25      )
Material.GreenPlastic   = new Material( [0.45      , 0.55      , 0.45      ], [0.1       , 0.35      , 0.1       ], [0.0       , 0.0       , 0.0       ], 0.25      )
Material.RedPlastic     = new Material( [0.7       , 0.6       , 0.6       ], [0.5       , 0.0       , 0.0       ], [0.0       , 0.0       , 0.0       ], 0.25      )
Material.WhitePlastic   = new Material( [0.70      , 0.70      , 0.70      ], [0.55      , 0.55      , 0.55      ], [0.0       , 0.0       , 0.0       ], 0.25      )
Material.YellowPlastic  = new Material( [0.60      , 0.60      , 0.50      ], [0.5       , 0.5       , 0.0       ], [0.0       , 0.0       , 0.0       ], 0.25      )

Material.BlackRubber    = new Material( [0.4       , 0.4       , 0.4       ], [0.01      , 0.01      , 0.01      ], [0.02      , 0.02      , 0.02      ], 0.078125  )
Material.CyanRubber     = new Material( [0.04      , 0.7       , 0.7       ], [0.4       , 0.5       , 0.5       ], [0.0       , 0.05      , 0.05      ], 0.078125  )
Material.GreenRubber    = new Material( [0.04      , 0.7       , 0.04      ], [0.4       , 0.5       , 0.4       ], [0.0       , 0.05      , 0.0       ], 0.078125  )
Material.RedRubber      = new Material( [0.7       , 0.04      , 0.04      ], [0.5       , 0.4       , 0.4       ], [0.05      , 0.0       , 0.0       ], 0.078125  )
Material.WhiteRubber    = new Material( [0.7       , 0.7       , 0.7       ], [0.5       , 0.5       , 0.5       ], [0.05      , 0.05      , 0.05      ], 0.078125  )
Material.YellowRubber   = new Material( [0.7       , 0.7       , 0.04      ], [0.5       , 0.5       , 0.4       ], [0.05      , 0.05      , 0.0       ], 0.078125  )

// Source: http://devernay.free.fr/cours/opengl/materials.html