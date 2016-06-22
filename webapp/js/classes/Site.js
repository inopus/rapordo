function Site() {
	this.id = undefined;
	this.url = "";
	this.nome = "";
	this.descricao = "";
	this.imagem = "";
	this.posicao = "";
	this.privado = "";
	this.categoria_id = "";
	this.usuario_id = "";
	this.imagemEnviar = "";
	this.acessos = "";
	
	this.jsonString = function() {
		return JSON.stringify(this);
	}
	
	this.json = function(j) {
		var ok = false;
		if(typeof j == typeof "x") {
			j = JSON.parse(j);
			ok = true;
		} else if(typeof j == typeof new Object) {
			ok = true;
		} else {
			ok = false;
		}
		if(ok) {
			this.setId(j.id);
			this.setUrl(j.url);
			this.setNome(j.nome);
			this.setDescricao(j.descricao);
			this.setImagem(j.imagem);
			this.setPosicao(j.posicao);
			this.setPrivado(j.privado);
			this.setCategoria_id(j.categoria_id);
			this.setUsuario_id(j.usuario_id);
			this.setImagemEnviar(j.imagemEnviar);
			this.setAcessos(j.acessos);
			return true;
		} else {
			return false;
		}
	}
	
	this.setId = function(id) {
		if(regex(8, 1).test(id)) {
			this.id = parseInt(id);
			return true;
		} else if(id == undefined) {
			this.id = undefined;
			return true;
		} else {
			return false;
		}
	}
	
	this.getId = function() {
		return this.id;
	}
	
	this.setUrl = function(url) {
		if(regex(11, 1).test(url)) {
			this.url = encodeURIComponent(url);
			return true;
		} else if(regex(11, 1).test(decodeURIComponent(url))) {
			this.url = url;
		} else {
			return false;
		}
	}
	
	this.getUrl = function() {
		return decodeURIComponent(this.url);
	}
	
	this.setNome = function(nome) {
		if(regex(10, 1).test(nome)) {
			this.nome = nome;
			return true;
		} else {
			return false;
		}
	}
	
	this.getNome = function() {
		return this.nome;
	}
	
	this.setDescricao = function(descricao) {
		// FIXME
		// veirificar se é uma descricao valida
		this.descricao = descricao;
		return true;
	}
	
	this.getDescricao = function() {
		return this.descricao;
	}
	
	this.setImagem = function(url) {
		if(regex(11, 1).test(url)) {
			this.imagem = url;
			return true;
		} else if(url == undefined) {
			this.imagem = undefined;
			return true;
		} else {
			return false;
		}
	}
	
	this.getImagem = function() {
		return this.imagem;
	}
	
	this.setPosicao = function(p) {
		if(regex(8, 1).test(p)) {
			this.posicao = parseInt(p);
		} else {
			this.posicao = 0;
		}
		return true;
	}
	
	this.getPosicao = function() {
		return this.posicao;
	}
	
	this.setPrivado = function(p) {
		if(p == 1) {
			this.privado = 1;
		} else {
			this.privado = 0;
		}
		return true;
	}
	
	this.getPrivado = function() {
		return this.privado;
	}
	
	this.setCategoria_id = function(c) {
		if(regex(8, 1).test(c)) {
			this.categoria_id = parseInt(c);
			return true;
		} else {
			return false;
		}
	}
	
	this.getCategoria_id = function() {
		return this.categoria_id;
	}
	
	this.setUsuario_id = function(u) {
		if(regex(8, 1).test(u)) {
			this.usuario_id = parseInt(u);
			return true;
		} else {
			return false;
		}
	}
	
	this.getUsuario_id = function() {
		return this.usuario_id;
	}
	
	this.getImagemEnviar = function() {
		return this.imagemEnviar;
	}
	
	this.setImagemEnviar = function(imgDataUrl) {
		if(regex(14, 1).test(imgDataUrl)) {
			this.imagemEnviar = imgDataUrl;
			return true;
		} else {
			return false;
		}
	}
	
	this.getAcessos = function() {
		return this.acessos;
	}
	
	this.setAcessos = function(a) {
		if(regex(8, 1).test(a)) {
			this.acessos = parseInt(a);
		} else {
			this.acessos = 0;
		}
		return true;
	}
}