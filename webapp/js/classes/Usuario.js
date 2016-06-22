function Usuario() {
	this.id = "";
	this.usuario = "";
	this.senha = "";
	this.email = "";
	this.dataCriacao = "";
	this.compatibilidadeAntigo = "";
	this.atualizadoEm = "";
	this.token = "";
	
	this.construtur = function() {
		this.setToken(new Token("", ""));
	}
	
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
			this.setUsuario(j.usuario);
			if(regex(7, 1).test(j.senha)) {
				this.setSenhaSemVerificar(j.senha);
			} else {
				this.setSenha(j.senha);
			}
			this.setEmail(j.email);
			this.setDataCriacao(j.dataCriacao);
			this.setCompatibilidadeAntigo(j.compatibilidadeAntigo);
			this.setAtualizadoEm(j.atualizadoEm);
			try{
				this.setToken(new Token(j.token.seq, j.token.expira));
			} catch(err) {
				this.setToken(new Token("", ""));
			}
			return true;
		} else {
			return false;
		}
	}
	
	// sets e gets
	this.getId = function() {
		return this.id;
	}
	this.setId = function(id) {
		if(regex(4, 1).test(id)) {
			this.id = parseInt(id);
			return true;
		} else {
			return false;
		}
	}
	this.getUsuario = function() {
		return this.usuario;
	}
	this.setUsuario = function(usuario) {
		if(regex(2, 1).test(usuario)) {
			this.usuario = usuario;
			return true;
		} else {
			return false;
		}
	}
	this.getSenha = function() {
		return this.senha;
	}
	this.setSenha = function(senha) {
		if(regex(3, 1).test(senha)) {
			return this.setSenhaSemVerificar(CryptoJS.SHA512(senha).toString());
		} else {
			return false;
		}
	}
	this.setSenhaSemVerificar = function(senha) {
		// Esse metodo so pode ser utilizardo pelo objeto: (FormInicialUsuarioEntrar para setar a senha no objeto
		// usuario depois que ele recebe a confirmacao de login com sucesso do servidor) e
		// (pela tentativa de regerar o token automaticamente do HttpReq) e (por essa propria classe) e
		// pelo FormRedefinirSenha
		this.senha = senha;
		// console.log("***** " + this.senha);
		// if(this.senha != "62c7fcc92075b5b71da7500d360c9fde0481d765d401fb6d9e955b0e83883b757fcbf0c53a0ea338148df0b77a0de2cf82a9f1df9ece608e5fb650e8f14f8b44") {
			// alert("Se você estiver com o usuário otavio, deu merda com a senha agora, se não ta de boa");
		// }
		return true;
	}
	this.getEmail = function() {
		return this.email;
	}
	this.setEmail = function(email) {
		if(regex(1, 1).test(email)) {
			this.email = email;
			return true;
		} else {
			return false;
		}
	}
	this.getDataCriacao = function() {
		return this.dataCriacao;
	}
	this.setDataCriacao = function(dataCriacao) {
		// verificar se é uma data válida
		this.dataCriacao = dataCriacao;
		return true;
	}
	this.getCompatibilidadeAntigo = function() {
		return this.compatibilidadeAntigo;
	}
	this.setCompatibilidadeAntigo = function(compatibilidadeAntigo) {
		this.compatibilidadeAntigo = compatibilidadeAntigo;
		return true;
	}
	this.getAtualizadoEm = function() {
		return this.atualizadoEm;
	}
	this.setAtualizadoEm = function(atualizadoEm) {
		// verificar se é uma data válida
		this.atualizadoEm = atualizadoEm;
		return true;
	}
	this.getToken = function() {
		return this.token;
	}
	this.setToken = function(t) {
		// FIXME
		// veriricar se é mesmo um obj Token
		this.token = t;
		return true;
	}
	
	this.construtur();
}