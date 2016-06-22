function regex(er, tipo) {
	if(er == 1) {
		// Email
		if(tipo == 1) {
			return /^([a-z0-9\._-]{1,30})@([a-z0-9_\.-]{2,30})\.([a-z0-9_\.-]{2,30})$/;
		}
	} else if(er == 2) {
		// Usuário
		if(tipo == 1) {
			return /^([a-z0-9_\-\.]{3,30})$/;
		}
	} else if(er == 3) {
		// Senha
		if(tipo == 1) {
			return /^((.){6,})$/;
		}
	} else if(er == 4) {
		// Números inteiros positivos e negativos
		if(tipo == 1) {
			return /^-?[0-9]+$/;
		}
	} else if(er == 5) {
		// Chave de segurança para redefinir senha
		if(tipo == 1) {
			return /^(([0-9]{3})\-([0-9]{3}))$/;
		}
	} else if(er == 6) {
		// datetime mysql (aaaa-mm-dd hh:mm:ss) / data no formato "aaaa-mm-dd hh:mm:ss"
		if(tipo == 1) {
			return /^(([0-9]{4})-((0[0-9])|(1[0-2]))-(([0-3][0-9])|((30)|(31))) ((0|1|2)([0-9])):((0|1|2|3|4|5|6)([0-9])):((0|1|2|3|4|5|6)([0-9])))$/;
		}
	} else if(er == 7) {
		// hash
		if(tipo == 1) {
			return /^([0-9a-fA-F]{128})$/;
		}
	} else if(er == 8) {
		// números inteiros positivos
		if(tipo == 1) {
			return /^[0-9]+$/;
		}
	} else if(er == 9) {
		// tipo de imagem
		if(tipo == 1) {
			return /^image\//;
		}
	} else if(er == 10) {
		// nome do site
		if(tipo == 1) {
			return /^(.{1,30})$/;
		}
	} else if(er == 11) {
		// URL http válida
		if(tipo == 1) {
			return /^((https?\:\/\/)([a-z0-9_-]{1,30})\.([a-z0-9_\.-]{2,30})(\/(.{0,930}))?)$/;
		}
	} else if(er == 12) {
		// paginas para swipe quando logado
		if(tipo == 1) {
			return /^((sites)|(sitesAdicionar)|(sitesCategoria)|(configuracao))$/;
		}
	} else if(er == 13) {
		// paginas para swipe quando não logado
		if(tipo == 1) {
			return /^((preInicio)|(inicio)|(recuperarDados)|(sobre))$/;
		}
	} else if(er == 14) {
		// dataUrl imagem (soh para jpeg)
		if(tipo == 1) {
			return /^data:(image\/jpeg);base64,(.{64,})/;
		}
	}
}