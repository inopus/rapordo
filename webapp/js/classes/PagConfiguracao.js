function PagConfiguracao() {
	this.usuario = undefined;
	this.senha = undefined;
	this.email = undefined;
	this.dataCriacao = undefined;
	this.atualizadoEm = undefined;
	this.btnSalvar = undefined;
	
	this.construir = function() {
		this.montaPagHtml();
		
		this.usuario = document.getElementById("formUsuarioConfiguracaoUsuario");
		this.senha = document.getElementById("formUsuarioConfiguracaoSenha");
		this.email = document.getElementById("formUsuarioConfiguracaoEmail");
		this.dataCriacao = document.getElementById("formUsuarioConfiguracaoDataCriacao");
		this.atualizadoEm = document.getElementById("formUsuarioConfiguracaoAtualizadoEm");
		this.btnSalvar = document.getElementById("formUsuarioConfiguracaoBtnSalvar");
		this.alterarSenhaCampo = document.getElementById("formUsuarioConfiguracaoAlterarSenhaCampo");
		this.alterarSenhaLabel = document.getElementById("formUsuarioConfiguracaoAlterarSenhaLabel");
		this.novaSenha = document.getElementById("formUsuarioConfiguracaoNovaSenha");
		
		document.getElementById("formUsuarioConfiguracaoAlterarSenha").addEventListener("click", function() {
			pag.alterarSenhaCampo.style.display = "block";
			pag.alterarSenhaLabel.style.display = "none";
		});
		
		document.getElementById("formUsuarioConfiguracaoBtnDesativar").addEventListener("click", function() {
			var usr = new Usuario();
			if(usr.setSenha(pag.senha.value)) {
				if(usr.getSenha() == usuario.getSenha()) {
					var str = "Para reativar sua conta será necessário apenas redefinir a sua senha.\n\n" + 
					"Tem certeza que deseja desativar a sua conta?";
					if(confirm(str)) {
						var hr = new HttpReq("post", pagina.getWs() + "usuario/desativar", function(res) {
							if(res == "1") {
								pagina.usuarioSair();
								alerta.abrirSucesso("Sua conta foi desativada. Para reativá-la será necessário apenas redefinir a sua senha.", 15000);
							} else {
								alerta.abrirErro("Não foi possível desativar a sua conta. Verifique a sua senha atual e tente novamente mais tarde.");
							}
						});
						hr.enviar("senha=" + usr.getSenha(), true);
					}
				} else {
					alerta.abrirErro("Senha atual inválida");
					pag.senha.classList.add("inputTxtInvalido");
				}
			} else {
				pag.senha.classList.add("inputTxtInvalido");
				alerta.abrirErro("Informe a sua senha atual corretamente");
			}
		});
		
		this.btnSalvar.addEventListener("click", function() {
			var usr = new Usuario();
			var usr2 = new Usuario();
			if(usr2.setSenha(pag.senha.value)) {
				if(usr2.getSenha() == usuario.getSenha()) {
					if(usr.setEmail(pag.email.value)) {
						if(usr.setUsuario(pag.usuario.value)) {
							var hr = new HttpReq("post", pagina.getWs() + "usuario/alterar", function(res) {
								// DICIONÁRIO DE RESPOSTA:
								// 1 = tudoCerto
								// 0 = senha atual inválida
								// -1 = Verifique os dados enviados e tente novamente mais tarde.
								// -2 = E-mail em uso
								// -3 = Usuário em uso
								console.log("RES: " + res);
								if(res == "1") {
									alerta.abrirSucesso("As alterações foram salvas com sucesso.");
									usuario.setEmail(pag.email.value);
									usuario.setUsuario(pag.usuario.value);
									if(pag.novaSenha.value != "") {
										usuario.setSenha(pag.novaSenha.value);
									}
									pagina.abrirPaginas("configuracao");
								} else if(res == "-1") {
									// Não deve cair aqui nunca porque todos os campos já foram verificados antes de enviar
									alerta.abrirErro("Não foi possível salvar as alterações. Verifique os campos e tente novamente mais tarde.");
								} else if(res == "0") {
									alerta.abrirErro("Senha atual inválida");
								} else if(res == "-2") {
									alerta.abrirErro("E-mail já em uso");
								} else if(res == "-3") {
									alerta.abrirErro("Usuário já em uso");
								} else {
									// Não deve cair aqui nunca, porque a página sempre responde alguma coisa que está nesses ifs
									alerta.abrirErro("Não foi possível salvar as alterações! Verifique os campos e tente novamente mais tarde!");
								}
							});
							var podeEnviarNovaSenha = true;
							if(pag.novaSenha.value != "") {
								if(!usr.setSenha(pag.novaSenha.value)) {
									podeEnviarNovaSenha = false;
								}
							} else {
								usr.setSenha("");
							}
							if(podeEnviarNovaSenha) {
								hr.enviar("usuario=" + usr.jsonString() + "&senha=" + usr2.getSenha(), true);
							} else {
								alerta.abrirErro("Nova senha inválida.");
								pag.novaSenha.classList.add("inputTxtInvalido");
							}
						} else {
							alerta.abrirErro("Usuário inválido. " + pag.usuario.getAttribute("title"));
							pag.usuario.classList.add("inputTxtInvalido");
						}
					} else {
						alerta.abrirErro("E-mail inválido.");
						pag.email.classList.add("inputTxtInvalido");
					}
				} else {
					alerta.abrirErro("Senha atual inválida.");
					pag.senha.classList.add("inputTxtInvalido");
				}
			} else {
				pag.senha.classList.add("inputTxtInvalido");
				alerta.abrirErro("Informe a sua senha atual corretamente.");
			}
		});
		
		this.abrir();
	}
	
	this.abrir = function() {
		this.alterarSenhaCampo.style.display = "none";
		this.alterarSenhaLabel.style.display = "block";
		this.preenche();
		this.camposTravar();
		var hr = new HttpReq("post", pagina.getWs() + "usuario/logado", function(res) {
			usuarioSv = new Usuario();
			usuarioSv.json(res);
			// Se nao for igual eu estou assumindo que o do servidor é mais recente
			if(usuarioSv.getAtualizadoEm() != usuario.getAtualizadoEm()) {
				usuario.json(usuarioSv.jsonString());
				pag.preenche()
			}
			pag.btnSalvar.style.display = "inline-block";
			pag.camposLiberar();
		});
		hr.enviar("", true, false);
		return true;
	}
	
	this.camposTravar = function() {
		this.usuario.setAttribute("readonly", true);
		this.senha.setAttribute("readonly", true);
		this.email.setAttribute("readonly", true);
		this.dataCriacao.setAttribute("readonly", true);
		this.atualizadoEm.setAttribute("readonly", true);
		this.usuario.classList.add("inputTxtReadOnly");
		this.senha.classList.add("inputTxtReadOnly");
		this.email.classList.add("inputTxtReadOnly");
		this.dataCriacao.classList.add("inputTxtReadOnly");
		this.atualizadoEm.classList.add("inputTxtReadOnly");
		this.btnSalvar.style.display = "none";
	}
	
	this.camposLiberar = function() {
		this.usuario.removeAttribute("readonly");
		this.senha.removeAttribute("readonly");
		this.email.removeAttribute("readonly");
		this.dataCriacao.removeAttribute("readonly");
		this.atualizadoEm.removeAttribute("readonly");
		this.usuario.classList.remove("inputTxtReadOnly");
		this.senha.classList.remove("inputTxtReadOnly");
		this.email.classList.remove("inputTxtReadOnly");
		this.btnSalvar.style.display = "inline-block";
	}
	
	this.preenche = function() {
		this.usuario.value = usuario.getUsuario();
		this.email.value = usuario.getEmail();
		this.senha.value = "";
		this.novaSenha.value = "";
		this.dataCriacao.value = usuario.getDataCriacao();
		this.atualizadoEm.value = usuario.getAtualizadoEm();
		return true;
	}
	
	this.montaPagHtml = function() {
		pagina.getMain().empty();
		var div = document.createElement("div");
		div.setAttribute("class", "limitaLargura fundo");
		var form = document.createElement("form");
		form.setAttribute("id", "formUsuarioConfiguracao");
		form.setAttribute("class", "formulario fundo");
		form.setAttribute("target", "_top");
		form.setAttribute("method", "post");
		form.setAttribute("spellcheck", false);
		form.setAttribute("novalidate", true);
		var h1 = document.createElement("h1");
		h1.setAttribute("style", "font-size: 1.6em; margin-top: 0;");
		txt = document.createTextNode("Configurações da conta");
		h1.appendChild(txt);
		form.appendChild(h1);
		var p = document.createElement("p");
		txt = document.createTextNode("Você só poderá alterar as suas configurações quando estiver conectado com a Internet.");
		form.appendChild(p);
		var div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		div1.setAttribute("style", "display: none;");
		var label = document.createElement("label");
		label.setAttribute("for", "formUsuarioConfiguracaoAtualizadoEm");
		txt = document.createTextNode("Última atualização da conta no servidor");
		label.appendChild(txt);
		div1.appendChild(label);
		var span = document.createElement("span");
		span.setAttribute("class", "msgInvalido");
		span.setAttribute("id", "formUsuarioConfiguracaoAtualizadoEmErro");
		div1.appendChild(span);
		var input = document.createElement("input");
		input.setAttribute("type", "datetime");
		input.setAttribute("name", "atualizadoEm");
		input.setAttribute("placeholder", "AAAA-MM-DD HH:MM:SS");
		input.setAttribute("class", "inputTxt");
		input.setAttribute("id", "formUsuarioConfiguracaoAtualizadoEm");
		input.setAttribute("title", "Última vez que os seus dados foram atualizados no servidor");
		div1.appendChild(input);
		form.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		label = document.createElement("label");
		label.setAttribute("for", "formUsuarioConfiguracaoUsuario");
		txt = document.createTextNode("Usuário");
		label.appendChild(txt);
		div1.appendChild(label);
		span = document.createElement("span");
		span.setAttribute("class", "msgInvalido");
		span.setAttribute("id", "formUsuarioConfiguracaoUsuarioErro");
		div1.appendChild(span);
		input = document.createElement("input");
		input.setAttribute("type", "text");
		input.setAttribute("name", "usuario");
		input.setAttribute("placeholder", "Usuário");
		input.setAttribute("class", "inputTxt");
		input.setAttribute("id", "formUsuarioConfiguracaoUsuario");
		input.setAttribute("title", "Deve conter de 3 a 30 caracteres, sendo aceitos somente a-z, 0-9, '_' e '.'");
		div1.appendChild(input);
		form.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		label = document.createElement("label");
		label.setAttribute("for", "formUsuarioConfiguracaoEmail");
		txt = document.createTextNode("E-mail");
		label.appendChild(txt);
		div1.appendChild(label);
		span = document.createElement("span");
		span.setAttribute("class", "msgInvalido");
		span.setAttribute("id", "formUsuarioConfiguracaoEmailErro");
		div1.appendChild(span);
		input = document.createElement("input");
		input.setAttribute("type", "email");
		input.setAttribute("name", "email");
		input.setAttribute("placeholder", "E-mail");
		input.setAttribute("class", "inputTxt");
		input.setAttribute("id", "formUsuarioConfiguracaoEmail");
		input.setAttribute("title", "Endereço de e-mail válido");
		div1.appendChild(input);
		form.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		label = document.createElement("label");
		label.setAttribute("for", "formUsuarioConfiguracaoSenha");
		txt = document.createTextNode("Senha atual");
		label.appendChild(txt);
		div1.appendChild(label);
		span = document.createElement("span");
		span.setAttribute("class", "msgInvalido");
		span.setAttribute("id", "formUsuarioConfiguracaoSenhaErro");
		div1.appendChild(span);
		input = document.createElement("input");
		input.setAttribute("type", "password");
		input.setAttribute("name", "senha");
		input.setAttribute("placeholder", "Senha atual");
		input.setAttribute("class", "inputTxt");
		input.setAttribute("id", "formUsuarioConfiguracaoSenha");
		input.setAttribute("title", "Deve conter no mínimo 6 caracteres");
		div1.appendChild(input);
		form.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		div1.setAttribute("style", "margin-top: 1.5em;");
		div1.setAttribute("id", "formUsuarioConfiguracaoAlterarSenhaLabel");
		label = document.createElement("label");
		label.setAttribute("for", "formUsuarioConfiguracaoNovaSenha");
		var a = document.createElement("a");
		a.setAttribute("href", "#configuracaoAlterarSenha");
		a.setAttribute("title", "Alterar senha de acesso");
		a.setAttribute("id", "formUsuarioConfiguracaoAlterarSenha");
		txt = document.createTextNode("Alterar senha");
		a.appendChild(txt);
		label.appendChild(a);
		div1.appendChild(label);
		form.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		div1.setAttribute("style", "display: none;");
		div1.setAttribute("id", "formUsuarioConfiguracaoAlterarSenhaCampo");
		label = document.createElement("label");
		label.setAttribute("for", "formUsuarioConfiguracaoNovaSenha");
		txt = document.createTextNode("Nova senha");
		label.appendChild(txt);
		div1.appendChild(label);
		span = document.createElement("span");
		span.setAttribute("class", "msgInvalido");
		span.setAttribute("id", "formUsuarioConfiguracaoSenhaErro");
		div1.appendChild(span);
		input = document.createElement("input");
		input.setAttribute("type", "password");
		input.setAttribute("name", "novaSenha");
		input.setAttribute("placeholder", "Nova senha");
		input.setAttribute("class", "inputTxt");
		input.setAttribute("id", "formUsuarioConfiguracaoNovaSenha");
		input.setAttribute("title", "Deve conter no mínimo 6 caracteres");
		div1.appendChild(input);
		form.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		div1.setAttribute("style", "display: none;");
		label = document.createElement("label");
		label.setAttribute("for", "formUsuarioConfiguracaoDataCriacao");
		txt = document.createTextNode("Data de cadastro");
		label.appendChild(txt);
		div1.appendChild(label);
		span = document.createElement("span");
		span.setAttribute("class", "msgInvalido");
		span.setAttribute("id", "formUsuarioConfiguracaoDataCriacaoErro");
		div1.appendChild(span);
		input = document.createElement("input");
		input.setAttribute("type", "datetime");
		input.setAttribute("name", "email");
		input.setAttribute("placeholder", "AAAA-MM-DD HH:MM:SS");
		input.setAttribute("class", "inputTxt");
		input.setAttribute("id", "formUsuarioConfiguracaoDataCriacao");
		input.setAttribute("title", "Deve conter no mínimo 6 caracteres");
		div1.appendChild(input);
		form.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		div1.setAttribute("style", "margin-top: 1.4em; display: -webkit-flex; display: -moz-flex; display: flex; -webkit-justify-content: space-between; -moz-justify-content: space-between; justify-content: space-between; -webkit-align-items: center; -moz-align-items: center; align-items: center;");
		input = document.createElement("input");
		input.setAttribute("type", "button");
		input.setAttribute("class", "btn btnVermelho");
		input.setAttribute("id", "formUsuarioConfiguracaoBtnDesativar");
		input.setAttribute("value", "Desativar conta");
		div1.appendChild(input);
		input = document.createElement("input");
		input.setAttribute("type", "button");
		input.setAttribute("class", "btn");
		input.setAttribute("id", "formUsuarioConfiguracaoBtnSalvar");
		input.setAttribute("value", "Salvar alterações");
		div1.appendChild(input);
		form.appendChild(div1);
		div.appendChild(form);
		pagina.getMain().appendChild(div);
		return true;
	}
	
	this.getTitle = function() {
		return "";
	}
	
	this.construir();
}