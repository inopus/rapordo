function PagInicio() {
	var usuarioEmailForm = undefined;
	var senhaFormEntrar = undefined;
	
	var usuarioForm = undefined;
	var usuarioMsgErro = undefined;
	var senhaForm = undefined;
	var senhaMsgErro = undefined;
	var emailForm = undefined;
	var emailMsgErro = undefined;
	
	this.construtor = function() {
		this.montaPagHtml();
		
		// usuarioEmailForm = document.getElementById("formEntrarTxtUsuarioEmail");
		// senhaFormEntrar = document.getElementById("formEntrarTxtSenha");
		
		// document.getElementById("btnUsuarioEntrar").addEventListener("click", function() {
			// pag.entrar();
		// });
		
		// this.getSenhaEntrar().addEventListener("keyup", function(event) {
			// event.keyCode é obsoleto. event.key é o certo, mas quase ninguém aceita ainda
			// if(event.key == "Enter" || event.keyCode == 13) {
				// document.getElementById("btnUsuarioEntrar").focus();
				// pag.entrar();
			// } else {
				// this.classList.remove("inputTxtInvalido");
			// }
		// });
		// usuarioEmailForm.addEventListener("keyup", function(event) {
			// event.keyCode é obsoleto. event.key é o certo, mas quase ninguém aceita ainda
			// if(event.key == "Enter" || event.keyCode == 13) {
				// document.getElementById("btnUsuarioEntrar").focus();
				// pag.entrar();
			// } else {
				// this.classList.remove("inputTxtInvalido");
			// }
		// });
		
		this.setUsuario(document.getElementById("formUsuarioCadastrarUsuario"));
		this.setSenha(document.getElementById("formUsuarioCadastrarSenha"));
		this.setEmail(document.getElementById("formUsuarioCadastrarEmail"));
		this.setUsuarioMsgErro(document.getElementById("formUsuarioCadastrarUsuarioErro"));
		this.setSenhaMsgErro(document.getElementById("formUsuarioCadastrarSenhaErro"));
		this.setEmailMsgErro(document.getElementById("formUsuarioCadastrarEmailErro"));
		document.getElementById("btnUsuarioCadastrar").addEventListener("click", function() {
			pag.cadastrar();
		});
		document.getElementById("formUsuarioCadastrarUsuario").addEventListener("keyup", function(event) {
			if(event.key == "Enter" || event.keyCode == 13) {
				document.getElementById("btnUsuarioCadastrar").focus();
				pag.cadastrar();
			} else {
				pag.limparErro("usuario");
			}
		});
		document.getElementById("formUsuarioCadastrarSenha").addEventListener("keyup", function(event) {
			if(event.key == "Enter" || event.keyCode == 13) {
				document.getElementById("btnUsuarioCadastrar").focus();
				pag.cadastrar();
			} else {
				pag.limparErro("senha");
			}
		});
		document.getElementById("formUsuarioCadastrarEmail").addEventListener("keyup", function(event) {
			if(event.key == "Enter" || event.keyCode == 13) {
				document.getElementById("btnUsuarioCadastrar").focus();
				pag.cadastrar();
			} else {
				pag.limparErro("email");
			}
		});
	}
	
	this.entrar = function() {
		var controle = 0;
		if(!usuario.setEmail(usuarioEmailForm.value) && !usuario.setUsuario(usuarioEmailForm.value)) {
			controle++;
			usuarioEmailForm.classList.add("inputTxtInvalido");
		}
		if(!usuario.setSenha(this.getSenhaEntrar().value)) {
			controle++;
			this.getSenhaEntrar().classList.add("inputTxtInvalido");
		}
		if(controle == 0) {
			var httpReq = new HttpReq("post", pagina.getWs() + "usuario/entrar", function(res) {
				if(res == "-2") {
					alerta.abrirAtencao("O Rapordo mudou! Para entrar na sua conta do antigo Rapordo é necessário resetar sua senha.", (60000 * 6));
					// pagina.usuarioSair();
					usuario = new Usuario();
					pagina.abrirPaginas("recuperarDados");
				} else if(res == "-1") {
					alerta.abrirErro("Usuário ou senha inválido.");
					// pagina.usuarioSair();
					usuario = new Usuario();
					// pagina.abrirPaginas("inicio");
				} else {
					var senha = usuario.getSenha();
					usuario.json(res);
					usuario.setSenhaSemVerificar(senha);
					if(regex(4, 1).test(usuario.getId())) {
						pagina.setLSUsuario(usuario);
						pagina.alteraConfig("autenticado");
					} else {
						alerta.abrirErro("Erro desconhecido. Tente novamente mais tarde.");
						pagina.usuarioSair();
					}
				}
			}, function(res) {
				pagina.erroPadraoConexao();
				pagina.usuarioSair();
			});
			httpReq.enviar("usuario=" + usuario.jsonString());
		} else {
			alerta.abrirErro("Preencha os campos corretamente.");
			pagina.scrollTo(this.getFormEntrar());
		}
	}
	
	// this.getEmail = function() {
		// return usuarioEmailForm;
	// }
	
	this.getSenhaEntrar = function() {
		return senhaFormEntrar;
	}
	
	this.cadastrar = function() {
		var controle = 0; // para ver se esta tudo válido antes de enviar, se estiver vai ser controle == 3.
		var u = new Usuario();
		if(u.setUsuario((this.getUsuario().value))) {
			controle++;
		} else {
			this.getUsuarioMsgErro().innerHTML = "(" + this.getUsuario().title + ")";
			this.getUsuario().classList.add("inputTxtInvalido");
		}
		if(u.setSenha((this.getSenha().value))) {
			controle++;
		} else {
			this.getSenhaMsgErro().innerHTML = "(" + this.getSenha().title + ")";
			this.getSenha().classList.add("inputTxtInvalido");
		}
		if(u.setEmail((this.getEmail().value))) {
			controle++;
		} else {
			this.getEmailMsgErro().innerHTML = "(" + this.getEmail().title + ")";
			this.getEmail().classList.add("inputTxtInvalido");
		}		
		if(controle == 3) {
			this.limparErro();
			usuario.setUsuario(this.getUsuario().value);
			usuario.setSenha(this.getSenha().value);
			usuario.setEmail(this.getEmail().value);
			var httpReq = new HttpReq("post", pagina.getWs() + "usuario/cadastrar", function(res) {
				if(res == "-1") {
					alerta.abrirErro("Usuário já em uso.");
					pag.getUsuarioMsgErro().innerHTML = "(Usuário já em uso)";
					pagina.scrollTo(pag.getUsuarioMsgErro());
					pag.getUsuario().classList.add("inputTxtInvalido");
					usuario = new Usuario();
				} else if(res == "-2") {
					alerta.abrirErro("Email já em uso.");
					pag.getEmailMsgErro().innerHTML = "(Email já em uso)";
					pagina.scrollTo(pag.getEmailMsgErro());
					pag.getEmail().classList.add("inputTxtInvalido");
					usuario = new Usuario();
				} else if(res == "-3") {
					alerta.abrirErro("Erro. Tente novamente mais tarde.");
					usuario = new Usuario();
				} else {
					var senha = usuario.getSenha();
					usuario.json(res);
					usuario.setSenha(senha);
					if(regex(4, 1).test(usuario.getId())) {
						pagina.setLSUsuario(usuario);
						pagina.alteraConfig("autenticado");
						alerta.abrirSucesso("Usuário cadastrado com sucesso!");
					} else {
						alerta.abrirErro("Erro desconhecido. Tente novamente mais tarde.");
						usuario = new Usuario();
					}
				}
			}, function(res) {
				pagina.erroPadraoConexao();
				usuario = new Usuario();
			});
			httpReq.enviar("usuario=" + usuario.jsonString());
		} else {
			alerta.abrirErro("Verifique as condições de cada campo.");
			pagina.scrollTo(this.getFormCadastrar());
		}
	}
	this.limparErro = function(erro) { // qual é o erro que será limpo está na variavel "erro"
		if(erro == "" || erro == "usuario") {
			pag.getUsuarioMsgErro().innerHTML = "";
		}
		if(erro == "" || erro == "senha") {
			pag.getSenhaMsgErro().innerHTML = "";
		}
		if(erro == "" || erro == "email") {
			pag.getEmailMsgErro().innerHTML = "";
		}
	}
	
	// gets e sets
	this.getUsuario = function() {
		return usuarioForm;
	}
	this.setUsuario = function(usr) {
		usuarioForm = usr;
		return true;
	}
	this.setUsuarioMsgErro = function(ume) {
		usuarioMsgErro = ume;
		return true;
	}
	this.getUsuarioMsgErro = function() {
		return usuarioMsgErro;
	}
	this.getSenha = function() {
		return senhaForm;
	}
	this.setSenha = function(sen) {
		senhaForm = sen;
		return true;
	}
	this.setSenhaMsgErro = function(sme) {
		senhaMsgErro = sme;
		return true;
	}
	this.getSenhaMsgErro = function() {
		return senhaMsgErro;
	}
	this.getEmail = function() {
		return emailForm;
	}
	this.setEmail = function(eml) {
		emailForm = eml;
		return true;
	}
	this.setEmailMsgErro = function(eme) {
		emailMsgErro = eme;
		return true;
	}
	this.getEmailMsgErro = function() {
		return emailMsgErro;
	}
	this.getFormEntrar = function() {
		return formEntrar;
	}
	this.getFormCadastrar = function() {
		return formCadastrar;
	}
	this.setFormEntrar = function(f) {
		formEntrar = f;
		return true;
	}
	this.setFormCadastrar = function(f) {
		formCadastrar = f;
		return true;
	}
	
	this.montaPagHtml = function() {
		pagina.getMain().empty();
		var input = document.createElement("input");
		input.setAttribute("type", "text");
		input.setAttribute("name", "txtUsuarioEmail");
		input.setAttribute("placeholder", "Usuário ou Email");
		input.setAttribute("class", "inputTxt");
		input.setAttribute("id", "formEntrarTxtUsuarioEmail");
		input.setAttribute("title", "Usuário ou Email");
		var div = document.createElement("div");
		div.setAttribute("class", "espacoForm");
		div.appendChild(input);
		// var form1 = document.createElement("form");
		// this.setFormEntrar(form1);
		// form1.setAttribute("id", "formUsuarioEntrar");
		// form1.setAttribute("class", "formulario fundo");
		// form1.setAttribute("style", "background: transparent; margin-top: 1em;");
		// form1.setAttribute("spellcheck", false);
		// form1.setAttribute("novalidate", true);
		// form1.appendChild(div);
		// input = document.createElement("input");
		// input.setAttribute("type", "password");
		// input.setAttribute("name", "txtSenha");
		// input.setAttribute("placeholder", "Senha");
		// input.setAttribute("class", "inputTxt");
		// input.setAttribute("id", "formEntrarTxtSenha");
		// input.setAttribute("title", "Senha válida");
		// div = document.createElement("div");
		// div.setAttribute("class", "espacoForm");
		// div.appendChild(input);
		// form1.appendChild(div);
		// var a = document.createElement("a");
		// a.setAttribute("href", "#recuperarDados");
		// a.addEventListener("click", function() {
			// pagina.abrirPaginas("recuperarDados");
		// });
		// a.setAttribute("title", "Esqueceu sua senha?");
		// a.appendChild(document.createTextNode("Esqueceu sua senha?"));
		// input = document.createElement("input");
		// input.setAttribute("type", "button");
		// input.setAttribute("class", "btn");
		// input.setAttribute("id", "btnUsuarioEntrar");
		// input.setAttribute("value", "Entrar");
		// div = document.createElement("div");
		// div.setAttribute("class", "espacoForm");
		// div.setAttribute("style", "display: -webkit-flex; display: -moz-flex; display: flex; -webkit-justify-content: space-between; -moz-justify-content: space-between; justify-content: space-between; -webkit-align-items: center; -moz-align-items: center; align-items: center;");
		// div.appendChild(a);
		// div.appendChild(input);
		// form1.appendChild(div);
		var form2 = document.createElement("form");
		this.setFormCadastrar(form2);
		form2.setAttribute("id", "formUsuarioCadastrar");
		form2.setAttribute("class", "formulario fundo");
		form2.setAttribute("style", "background: transparent; margin-top: 1em;");
		form2.setAttribute("spellcheck", false);
		form2.setAttribute("novalidate", true);
		var h1 = document.createElement("h1");
		h1.setAttribute("style", "font-size: 1.3em; margin-top: 0;");
		txt = document.createTextNode("Novo no Rapordo? Cadastre-se!");
		h1.appendChild(txt);
		form2.appendChild(h1);
		var span = document.createElement("span");
		span.setAttribute("class", "msgInvalido");
		span.setAttribute("id", "formUsuarioCadastrarUsuarioErro");
		input = document.createElement("input");
		input.setAttribute("type", "text");
		input.setAttribute("name", "usuario");
		input.setAttribute("placeholder", "Usuário");
		input.setAttribute("class", "inputTxt");
		input.setAttribute("id", "formUsuarioCadastrarUsuario");
		input.setAttribute("title", "Deve conter de 3 a 30 caracteres, sendo aceitos somente a-z, 0-9, '_' e '.'");
		div = document.createElement("div");
		div.setAttribute("class", "espacoForm");
		div.appendChild(span);
		div.appendChild(input);
		form2.appendChild(div);
		span = document.createElement("span");
		span.setAttribute("class", "msgInvalido");
		span.setAttribute("id", "formUsuarioCadastrarEmailErro");
		input = document.createElement("input");
		input.setAttribute("type", "email");
		input.setAttribute("name", "email");
		input.setAttribute("placeholder", "E-mail");
		input.setAttribute("class", "inputTxt");
		input.setAttribute("id", "formUsuarioCadastrarEmail");
		input.setAttribute("title", "Endereço de Email válido");
		div = document.createElement("div");
		div.setAttribute("class", "espacoForm");
		div.appendChild(span);
		div.appendChild(input);
		form2.appendChild(div);
		span = document.createElement("span");
		span.setAttribute("class", "msgInvalido");
		span.setAttribute("id", "formUsuarioCadastrarSenhaErro");
		input = document.createElement("input");
		input.setAttribute("type", "password");
		input.setAttribute("name", "senha");
		input.setAttribute("placeholder", "Senha");
		input.setAttribute("class", "inputTxt");
		input.setAttribute("id", "formUsuarioCadastrarSenha");
		input.setAttribute("title", "Deve conter no mínimo 6 caracteres");
		div = document.createElement("div");
		div.setAttribute("class", "espacoForm");
		div.appendChild(span);
		div.appendChild(input);
		form2.appendChild(div);
		input = document.createElement("input");
		input.setAttribute("type", "button");
		input.setAttribute("class", "btn btnVerde");
		input.setAttribute("id", "btnUsuarioCadastrar");
		input.setAttribute("value", "Cadastrar");
		input.setAttribute("style", "width: 100%; max-width: 20em;");
		div = document.createElement("div");
		div.setAttribute("class", "espacoForm");
		div.setAttribute("style", "text-align: center;");
		div.appendChild(input);
		form2.appendChild(div);
		var img = document.createElement("img");
		img.setAttribute("src", "im/logo/logo128.png");
		img.setAttribute("alt", "Logo Rapordo");
		img.setAttribute("style", "border-radius: 100%; width: 1em; height: auto; margin-right: 0.3em;");
		span = document.createElement("span");
		txt = document.createTextNode("Rapordo");
		span.appendChild(txt);
		h1 = document.createElement("h1");
		h1.setAttribute("style", "font-size: 3em; margin: 0; display: -webkit-flex; display: -moz-flex; display: flex; -webkit-justify-content: center; -moz-justify-content: center; justify-content: center; -webkit-align-items: center; -moz-align-items: center; align-items: center; -webkit-align-self: center; -moz-align-self: center; align-self: center; -webkit-align-content: center; -moz-align-content: center; align-content: center;");
		h1.appendChild(img);
		h1.appendChild(span);
		var h2 = document.createElement("h2");
		h2.setAttribute("style", "font-size: 1.3em; text-align: center; font-style: italic; margin: 0.3em 0 0 0;");
		txt = document.createTextNode("Seu WebApp de favoritos na nuvem");
		h2.appendChild(txt);
		div = document.createElement("div");
		div.setAttribute("class", "limitaLargura");
		div.appendChild(h1);
		div.appendChild(h2);
		// div.appendChild(form1);
		div.appendChild(form2);
		pagina.getMain().appendChild(div);
	}
	
	this.getTitle = function() {
		return "Início";
	}
	
	this.construtor();
}