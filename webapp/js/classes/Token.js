function Token(exSeq, exExpira) {
	// FIXME
	// O expira que o usuário tem no navegador não serve para nada. O usuário tem somente o primeiro expira
	// certo, ou seja, aquele que vem quando ele usa o entrar(), depois ele fica desatualizado.
	// e o ideial é que um Token valido eh quando o Expira e a Seq estiverem Ok.
	this.seq = undefined;
	this.expira = undefined;
	
	this.construtor = function(exSeq, exExpira) {
		if((exSeq == undefined && exExpira == undefined) || (exSeq == "" && exExpira == "")) {
			this.setSeq("");
			this.setExpira("");
		} else {
			this.setSeq(exSeq);
			this.setExpira(exExpira);
		}
	}
	
	this.jsonString = function() {
		return JSON.stringify(this);
	}
	
	this.setSeq = function(s) {
		if(regex(7, 1).test(s)) {
			this.seq = s;
			return true;
		} else {
			return false;
		}
	}
	
	this.getSeq = function() {
		return this.seq;
	}
	
	this.setExpira = function(ex) {
		if(regex(6, 1).test(ex)) {
			this.expira = ex;
		} else {
			this.expira = "1970-01-01 00:00:00";
		}
		return true;
	}
	
	this.getExpira = function() {
		return this.expira;
	}
	
	this.construtor(exSeq, exExpira);
}