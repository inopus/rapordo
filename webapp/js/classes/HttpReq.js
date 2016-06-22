function HttpReq(metodoRecebido, urlRecebido, fSucesso, fErro) {
	this.url = undefined;
	this.metodo = undefined;
	this.xmlHttpRequest = undefined;
	this.variaveisCache = undefined; // acho que eu fiz essa para poder reenviar a requisição automaticamente
	
	this.construtor = function(metodoRecebido, urlRecebido) {
		this.metodo = metodoRecebido;
		this.url = urlRecebido;
		this.xmlHttpRequest = new XMLHttpRequest();
		if(!fSucesso) {
			fSucesso = function(res) {
				console.log("Sucesso:" + res);
			}
		}
		if(!fErro) {
			fErro = function(res) {
				pagina.erroPadraoConexao();
			}
		}
		return true;
	}
	
	this.enviar = function(variaveis, logado, telaCarregando, tempoEsgotado) {
		if(typeof variaveis == "undefined") {
			variaveis = "";
		} else {
			this.variaveisCache = variaveis;
		}
		if(typeof logado == "undefined") {
			// tem que enviar o token (para paginas restritas do servidor)
			logado = false;
		}
		if(typeof telaCarregando == "undefined") {
			// aparecer a tela de carregando
			telaCarregando = true;
		}
		
		// FIXME
		// Esse if aqui precisa verificar se é um numero também
		if(typeof tempoEsgotado == "undefined" || tempoEsgotado < 1) {
			// tempo para abort() requisição
			tempoEsgotado = 30000;
		}
		this.xmlHttpRequest.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				fSucesso(this.response);
				if(telaCarregando) {
					carregando.fechar();
				}
			} else if(this.readyState == 4 && this.status != 200) {
				if(this.status == 401) {
					if(regex(4, 1).test(usuario.getId())) {
						var httpReq = new HttpReq("post", pagina.getWs() + "usuario/entrar", function(res) {
							if(res == "-2" || res == "-1") {
								alerta.abrirErro("Esse acesso precisa ser autenticado.", 10000);
								pagina.usuarioSair();
							} else {
								var senha = usuario.getSenha();
								usuario.json(res);
								usuario.setSenhaSemVerificar(senha);
								if(regex(4, 1).test(usuario.getId())) {
									pagina.setLSUsuario(usuario);
									// alerta.abrirAviso("Sua autenticação anterior não é mais válida, por isso acabou de ser renovada.");
									// console.log(metodoRecebido + ";" + urlRecebido + ";" + variaveis + ";" + logado + ";" + telaCarregando + ";" + tempoEsgotado);
									var hr = new HttpReq(metodoRecebido, urlRecebido, fSucesso, fErro);
									hr.enviar(variaveis, logado, telaCarregando, tempoEsgotado);
								} else {
									alerta.abrirErro("Erro desconhecido. Tente novamente mais tarde.");
									pagina.usuarioSair();
								}
							}
						}, function(res) {
							pagina.erroPadraoConexao();
							usuario = new Usuario();
						});
						httpReq.enviar("usuario=" + usuario.jsonString());
						if(typeof fErro == typeof Function){
							fErro();
						}
					} else {
						alerta.abrirErro("Esse acesso precisa ser autenticado.");
						pagina.usuarioSair();
					}
				} else if(this.status == 404) {
					alerta.abrirErro("O serviço solicitado não foi encontrado.", 8000);
					if(telaCarregando) {
						carregando.fechar();
					}
					if(typeof fErro == typeof Function){
						fErro();
					}
				} else if(this.status == 403) {
					alerta.abrirErro("Requisição recusada. Tente novamente mais tarde.");
					if(telaCarregando) {
						carregando.fechar();
					}
					if(typeof fErro == typeof Function){
						fErro();
					}
				} else {
					alerta.abrirErro("O serviço solicitado não foi encontrado. Verifique a sua conexão com a Internet e tente novamente.");
					console.log("Erro!");
					console.log("Servidor: ");
					console.log("readyState: " + this.readyState);
					console.log("Status: " + this.status);
					console.log("Res: " + this.response);
					// pagina.wsAlterar();
					pagina.setWs("http://rapordo.com/ws/");
					carregando.terminar(fErro);
				}
			}
		};
		if(this.metodo == "post") {
			this.xmlHttpRequest.open("POST", this.url, true);
			this.xmlHttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
			this.xmlHttpRequest.timeout = tempoEsgotado;
			this.xmlHttpRequest.send(variaveis + ((logado) ? ("&usuario_id=" + usuario.getId() + "&usuario_token=" + usuario.getToken().jsonString()) : ""));
			if(telaCarregando) {
				carregando.abrir(tempoEsgotado, "Verifique a sua conexão com a Internet e tente novamente.");
			}
		} else {
			alert("Método inválido: " + this.metodo);
			return false;
		}
		return true;
	}
	
	/* DESCONTINUADO 2015-06-18
	this.info = function() {
		console.log(this.url + " : " + " : " + this.metodo + " : " + this.xmlHttpRequest + " : " + this.variaveisCache + " : " + this.id_setTimeout);
	}
	*/
	
	this.construtor(metodoRecebido, urlRecebido);
}