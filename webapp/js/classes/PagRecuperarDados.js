function PagRecuperarDados() {
	// Essa pagina ficou uma bagunca depois que eu tive que juntar os dois arquivos de formulario em um soh para ficar mais leve
	
	var txtEmail = undefined;
	var msgErro = undefined;
	
	var novaSenha = document.getElementById("formRedefinirSenhaNovaSenha");
	var novaSenhaMsgErro = document.getElementById("formRedefinirSenhaNovaSenhaMsgErro");
	var chave = document.getElementById("formRedefinirSenhaChave");
	var chaveMsgErro = document.getElementById("formRedefinirSenhaChaveMsgErro");
	var email = document.getElementById("formRedefinirSenhaEmail");
	var emailMsgErro = document.getElementById("formRedefinirSenhaEmailMsgErro");
	
	this.enviarEmail = function() {
		if(regex(1, 1).test(this.getTxt().value)) {
			var hr = new HttpReq("post", pagina.getWs() + "usuario/solicitarChaveSeguranca", function(res) {
				if(res == "-1") {
					alerta.abrirErro("Endereço de Email inválido.");
					pag.getMsgErro().innerHTML = "(Endereço inválido)";
					pag.getTxt().classList.add("inputTxtInvalido");
				} else if(res == "-2") {
					alerta.abrirErro("Email não cadastrado.");
					pag.getMsgErro().innerHTML = "(Endereço não cadastrado)";
					pag.getTxt().classList.add("inputTxtInvalido");
				} else if(res == "0") {
					alerta.abrirErro("Não foi possível enviar a chave de segurança. Tente novamente mais tarde.");
				} else if(res == "1") {
					alerta.abrirSucesso("Solicitação enviada com sucesso.", 6000);
					pag.getEmail().value = pag.getTxt().value;
					pagina.scrollTo(document.getElementById("formRedefinirSenha"));
					window.setTimeout(function() {
						alerta.abrirAviso("Em alguns minutos você receberá a chave de segurança em seu E-mail. Verifique também na sua caixa de Spam.", (60000 * 3));
					}, 7000);
				} else if(res == "-3") {
					alerta.abrirAtencao("Você já possuí uma solicitação de chave de segurança válida.")
				}
			});
			hr.enviar("email=" + this.getTxt().value);
		} else {
			alerta.abrirErro("Endereço de Email inválido");
			this.getMsgErro().innerHTML = "(Endereço inválido)";
			this.getTxt().classList.add("inputTxtInvalido");
		}
	}
	
	this.redefinirSenha = function() {
		var controle = 0;
		if(!usuario.setEmail(this.getEmail().value)) {
			this.getEmail().classList.add("inputTxtInvalido");
			this.getEmailMsgErro().innerHTML = "(Endereço inválido)";
			controle++;
		}
		if(!regex(5, 1).test(this.getChave().value)) {
			this.getChave().classList.add("inputTxtInvalido");
			this.getChaveMsgErro().innerHTML = "(Combinação inválida)";
			controle++;
		}
		if(!usuario.setSenha(this.getNovaSenha().value)) {
			this.getNovaSenha().classList.add("inputTxtInvalido");
			this.getNovaSenhaMsgErro().innerHTML = "(Escolha uma senha mais longa)";
			controle++;
		}
		
		if(controle != 0) {
			alerta.abrirErro("Preencha os campos corretamente.");
		} else {
			var hr = new HttpReq("post", pagina.getWs() + "usuario/redefinirSenha", function(res) {
				if(res == "-1") {
					alerta.abrirErro("As informações enviadas não são mais válidas. Verifique os campos, solicite uma nova chave de segurança e tente novamente.");
				} else if(res == "0") {
					alerta.abrirErro("Não foi possível validar a chave de segurança. Tente novamente mais tarde.");
				} else {
					var senha = usuario.getSenha();
					usuario.json(res);
					usuario.setSenhaSemVerificar(senha);
					if(regex(4, 1).test(usuario.getId())) {
						pagina.setLSUsuario(usuario);
						pagina.alteraConfig("autenticado");
						alerta.abrirSucesso("Senha alterada com sucesso.");
					} else {
						alerta.abrirErro("Erro desconhecido. Tente novamente mais tarde.");
						usuario = new Usuario();
					}
				}
			});
			hr.enviar("usuario=" + usuario.jsonString() + 
						"&chave=" + this.getChave().value);
		}
	}
	
	this.limpaErro = function() {
		this.getMsgErro().innerHTML = "";
	}
	
	this.setMsgErro = function(m) {
		msgErro = m;
		return true;
	}
	
	this.getMsgErro = function() {
		return msgErro;
	}
	
	this.getTxt = function() {
		return txtEmail;
	}
	
	this.setTxt = function(t) {
		txtEmail = t;
		return true;
	}
	
	// --------------------------------------------------
	this.getNovaSenha = function() {
		return novaSenha;
	}
	
	this.getNovaSenhaMsgErro = function() {
		return novaSenhaMsgErro;
	}
	
	this.getChave = function() {
		return chave;
	}
	
	this.getChaveMsgErro = function() {
		return chaveMsgErro;
	}
	
	this.getEmail = function() {
		return email;
	}
	
	this.getEmailMsgErro = function() {
		return emailMsgErro;
	}
	
	this.construtor = function() {
		this.montaPagHtml();
		
		this.getTxt().addEventListener("keyup", function(event) {
			// MIXME
			// Não funciona apertar enter no celular nesse aqui não sei porque, tentei de tudo e nao vai
			
			// event.keyCode é obsoleto. event.key é o certo, mas quase ninguém aceita ainda
			if(event.key == "Enter" || event.keyCode == 13) {
				this.blur();
				pag.enviarEmail();
			} else {
				pag.limpaErro();
			}
		});
	}
	
	this.montaPagHtml = function() {
		pagina.getMain().empty();
		
		var div = document.createElement("div");
		div.setAttribute("class", "limitaLargura fundo");
		var form = document.createElement("form");
		form.setAttribute("id", "formSolicitarChaveSeguranca");
		form.setAttribute("class", "formulario fundo");
		form.setAttribute("method", "post");
		form.setAttribute("spellcheck", false);
		form.setAttribute("novalidate", true);
		form.setAttribute("onsubmit", "return false");
		var h1 = document.createElement("h1");
		var txt = document.createTextNode("Solicitar chave de segurança");
		h1.appendChild(txt);
		h1.setAttribute("style", "font-size: 1.6em; margin-top: 0;");
		form.appendChild(h1);
		var p = document.createElement("p");
		txt = document.createTextNode("Para recuperar seus dados do Rapordo, preencha o campo abaixo com seu Email e aguarde uma mensagem com uma chave de segurança para redefinir sua senha");
		form.appendChild(p);
		p = document.createElement("p");
		txt = document.createTextNode("Com a chave de segurança em mãos, desça a página até o formulário ");
		p.appendChild(txt);
		var a = document.createElement("a");
		a.setAttribute("href", "#formRedefinirSenha");
		a.setAttribute("title", "Fomulário Redefinir senha");
		txt = document.createTextNode("Redefinir senha");
		a.appendChild(txt);
		p.appendChild(a);
		txt = document.createTextNode(" e preencha as informações solicitadas.");
		p.appendChild(txt);
		form.appendChild(p);
		p = document.createElement("p");
		txt = document.createTextNode("Caso você não receba a chave de seguraça por Email, por favor, envie um Email para ");
		p.appendChild(txt);
		a = document.createElement("a");
		a.setAttribute("href", "mailto:contato@rapordo.com");
		a.setAttribute("target", "_blank");
		txt = document.createTextNode("contato@rapordo.com");
		a.appendChild(txt);
		p.appendChild(a);
		txt = document.createTextNode(" e solicite uma nova chave");
		p.appendChild(txt);
		form.appendChild(p);
		var div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		var label = document.createElement("label");
		label.setAttribute("for", "formSolicitarChaveSegurancaEmail");
		txt = document.createTextNode("Email ");
		label.appendChild(txt);
		var span = document.createElement("span");
		span.setAttribute("class", "msgInvalido");
		span.setAttribute("id", "formSolicitarChaveSegurancaEmailMsgErro");
		this.setMsgErro(span);
		label.appendChild(span);
		div1.appendChild(label);
		var input = document.createElement("input");
		input.setAttribute("type", "text");
		input.setAttribute("name", "email");
		input.setAttribute("class", "inputTxt");
		input.setAttribute("id", "formSolicitarChaveSegurancaEmail");
		input.setAttribute("title", "E-mail");
		this.setTxt(input);
		div1.appendChild(input);
		form.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		div1.setAttribute("style", "text-align: center;");
		input = document.createElement("input");
		input.setAttribute("type", "button");
		input.setAttribute("class", "btn");
		input.setAttribute("id", "formSolicitarChaveSegurancaBtn");
		input.setAttribute("value", "Enviar Email");
		input.addEventListener("click", function() {
			pag.enviarEmail();
		});
		div1.appendChild(input);
		form.appendChild(div1);
		form.addEventListener("submit", function() {
			return false; 	
		});
		div.appendChild(form);
		form = document.createElement("form");
		form.setAttribute("class", "formulario fundo");
		form.setAttribute("method", "post");
		form.setAttribute("spellcheck", false);
		form.setAttribute("novalidate", true);
		form.setAttribute("style", "margin-top: 1em;");
		form.setAttribute("id", "formRedefinirSenha");
		h1 = document.createElement("h1");
		h1.setAttribute("style", "font-size: 1.6em; margin-top: 0;");
		txt = document.createTextNode("Redefinir senha");
		h1.appendChild(txt);
		form.appendChild(h1);
		p = document.createElement("p");
		txt = document.createTextNode("Preencha o fomulário abaixo corretamente para recurar sua conta no Rapordo");
		p.appendChild(txt);
		form.appendChild(p);
		p = document.createElement("p");
		txt = document.createTextNode("Rola a página até o fomulário ");
		p.appendChild(txt);
		a = document.createElement("a");
		a.setAttribute("href", "#formSolicitarChaveSeguranca");
		a.setAttribute("title", "Solicitar chave de segurança");
		txt = document.createTextNode("Solicitar chave de segurança");
		a.appendChild(txt);
		p.appendChild(a);
		txt = document.createTextNode(" para receber uma nova chave de segurança por email.");
		p.appendChild(txt);
		form.appendChild(p);
		div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		label = document.createElement("label");
		label.setAttribute("for", "formRedefinirSenhaEmail");
		txt = document.createTextNode("E-mail ");
		label.appendChild(txt);
		span = document.createElement("span");
		span.setAttribute("class", "msgInvalido");
		span.setAttribute("id", "formRedefinirSenhaEmailMsgErro");
		emailMsgErro = span;
		label.appendChild(span);
		div1.appendChild(label);
		input = document.createElement("input");
		input.setAttribute("type", "text");
		input.setAttribute("name", "email");
		input.setAttribute("class", "inputTxt");
		input.setAttribute("id", "formRedefinirSenhaEmail");
		email = input;
		input.setAttribute("title", "E-mail");
		div1.appendChild(input);
		form.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		label = document.createElement("label");
		label.setAttribute("for", "formRedefinirSenhaChave");
		txt = document.createTextNode("Chave de segurança ");
		label.appendChild(txt);
		span = document.createElement("span");
		span.setAttribute("class", "msgInvalido");
		span.setAttribute("id", "formRedefinirSenhaChaveMsgErro");
		chaveMsgErro = span;
		label.appendChild(span);
		div1.appendChild(label);
		input = document.createElement("input");
		input.setAttribute("type", "text");
		input.setAttribute("name", "chave");
		input.setAttribute("class", "inputTxt");
		input.setAttribute("maxlength", "7");
		input.setAttribute("id", "formRedefinirSenhaChave");
		chave = input;
		input.setAttribute("title", "Chave de segurança");
		div1.appendChild(input);
		form.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		label = document.createElement("label");
		label.setAttribute("for", "formRedefinirSenhaNovaSenha");
		txt = document.createTextNode("Nova senha ");
		label.appendChild(txt);
		span = document.createElement("span");
		span.setAttribute("class", "msgInvalido");
		span.setAttribute("id", "formRedefinirSenhaNovaSenhaMsgErro");
		novaSenhaMsgErro = span;
		label.appendChild(span);
		div1.appendChild(label);
		input = document.createElement("input");
		input.setAttribute("type", "password");
		input.setAttribute("name", "senha");
		input.setAttribute("class", "inputTxt");
		input.setAttribute("id", "formRedefinirSenhaNovaSenha");
		input.setAttribute("title", "Nova senha");
		novaSenha = input;
		div1.appendChild(input);
		form.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		div1.setAttribute("style", "text-align: center;");
		input = document.createElement("input");
		input.setAttribute("type", "button");
		input.setAttribute("class", "btn");
		input.setAttribute("id", "formRedefinirSenhaBtn");
		input.setAttribute("value", "Alterar senha");
		input.addEventListener("click", function() {
			pag.redefinirSenha();
		});
		div1.appendChild(input);
		form.appendChild(div1);
		form.addEventListener("submit", function() {
			return false; 	
		});
		div.appendChild(form);
		pagina.getMain().appendChild(div);
	}
	
	this.getTitle = function() {
		return "Recuperar dados";
	}
	
	this.construtor();
}