function Categoria() {
	this.id = undefined;
	this.nome = "";
	this.privado = "";
	this.usuario_id = "";
	
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
			this.setNome(j.nome);
			this.setPrivado(j.privado);
			this.setUsuario_id(j.usuario_id);
			return true;
		} else {
			return false;
		}
	}
	
	this.getId = function() {
		return this.id;
	}
	
	this.setId = function(id) {
		if(regex(8, 1).test(id)) {
			this.id = parseInt(id);
			return true;
		} else if(id == undefined || id == "0" || id == 0) {
			this.id = 0;
			return true;
		} else if(id == "-1" || id == -1) {
			this.id = -1;
			return true;
		} else if(id == "-2" || id == -2) {
			this.id = -2;
			return true;
		} else {
			return false;
		}
	}
	
	this.getNome = function() {
		return this.nome;
	}
	
	this.setNome = function(nome) {
		if(regex(10, 1).test(nome)) {
			this.nome = nome;
			return true;
		} else {
			return false;
		}
	}
	
	this.getPrivado = function() {
		return this.privado;
	}
	
	this.setPrivado = function(p) {
		if(p == 1) {
			this.privado = 1;
		} else {
			this.privado = 0;
		}
		return true;
	}
	
	this.getUsuario_id = function() {
		return this.usuario_id;
	}
	
	this.setUsuario_id = function(u) {
		if(regex(8, 1).test(u)) {
			this.usuario_id = parseInt(u);
			return true;
		} else {
			return false;
		}
	}
}