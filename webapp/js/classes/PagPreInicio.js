function PagPreInicio() {
	var usuarioEmailForm = undefined;
	var senhaFormEntrar = undefined;
	
	this.construtor = function() {
		this.montaPagHtml();
		
		usuarioEmailForm = document.getElementById("formEntrarTxtUsuarioEmail");
		senhaFormEntrar = document.getElementById("formEntrarTxtSenha");
		
		document.getElementById("btnUsuarioEntrar").addEventListener("click", function() {
			pag.entrar();
		});
		
		document.getElementById("btnEsqueceuSenha").addEventListener("click", function() {
			pagina.abrirPaginas("recuperarDados");
		});
		
		document.getElementById("btn_cadastro").addEventListener("click", function() {
			pagina.abrirPaginas("inicio");
		});
		
		this.getSenhaEntrar().addEventListener("keyup", function(event) {
			// event.keyCode é obsoleto. event.key é o certo, mas quase ninguém aceita ainda
			if(event.key == "Enter" || event.keyCode == 13) {
				document.getElementById("btnUsuarioEntrar").focus();
				pag.entrar();
			} else {
				this.classList.remove("inputTxtInvalido");
			}
		});
		usuarioEmailForm.addEventListener("keyup", function(event) {
			// event.keyCode é obsoleto. event.key é o certo, mas quase ninguém aceita ainda
			if(event.key == "Enter" || event.keyCode == 13) {
				document.getElementById("btnUsuarioEntrar").focus();
				pag.entrar();
			} else {
				this.classList.remove("inputTxtInvalido");
			}
		});
	}
	
	this.entrar = function() {
		var controle = 0;
		if(!usuario.setEmail(usuarioEmailForm.value.toLowerCase()) && !usuario.setUsuario(usuarioEmailForm.value.toLowerCase())) {
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
	
	this.getSenhaEntrar = function() {
		return senhaFormEntrar;
	}
	
	this.montaPagHtml = function() {
		// document
		// createElement
		// createTextNode
		// appendChild
		// setAttribute
		// pagina
		// getMain
		
		pagina.getMain().empty();
		var div = document.createElement("div");
		div.setAttribute("id", "preInicio_conteudo_home");
		var section = document.createElement("section");
		section.setAttribute("id", "imagem_principal");
		section.setAttribute("class", "pequenoDirectionColumnReverse");
		var div1 = document.createElement("div");
		div1.setAttribute("style", "background-color: transparent;");
		var form = document.createElement("form");
		form.setAttribute("id", "formUsuarioEntrar");
		form.setAttribute("class", "formulario");
		form.setAttribute("spellcheck", false);
		form.setAttribute("novalidate", true);
		form.setAttribute("style", "width: 80%; max-width: 438px; margin-left: auto; margin-right: auto;");
		var div2 = document.createElement("div");
		div2.setAttribute("class", "espacoForm");
		var input = document.createElement("input");
		input.setAttribute("type", "text");
		input.setAttribute("name", "txtUsuarioEmail");
		input.setAttribute("placeholder", "Usuário ou Email");
		input.setAttribute("class", "inputTxt");
		input.setAttribute("id", "formEntrarTxtUsuarioEmail");
		input.setAttribute("title", "Usuário ou Email");
		div2.appendChild(input);
		form.appendChild(div2);
		div2 = document.createElement("div");
		div2.setAttribute("class", "espacoForm");
		input = document.createElement("input");
		input.setAttribute("type", "password");
		input.setAttribute("name", "txtSenha");
		input.setAttribute("placeholder", "Senha");
		input.setAttribute("class", "inputTxt");
		input.setAttribute("id", "formEntrarTxtSenha");
		input.setAttribute("title", "Senha válida");
		div2.appendChild(input);
		form.appendChild(div2);
		div2 = document.createElement("div");
		div2.setAttribute("class", "espacoForm");	
		div3 = document.createElement("div");
		div3.setAttribute("class", "espacoForm");
		input = document.createElement("input");
		input.setAttribute("type", "button");
		input.setAttribute("class", "btn btnVerdeEscuro");
		input.setAttribute("style", "width: 100%; padding: 0.6em;");
		input.setAttribute("id", "btnUsuarioEntrar");
		input.setAttribute("value", "Entrar");
		div3.appendChild(input);
		div2.appendChild(div3);	
		div3 = document.createElement("div");
		div3.setAttribute("class", "espacoForm");
		input = document.createElement("input");
		input.setAttribute("type", "button");
		input.setAttribute("class", "btn btnCinza");
		input.setAttribute("style", "width: 100%; font-size: 0.8em;");
		input.setAttribute("id", "btnEsqueceuSenha");
		input.setAttribute("value", "Esqueceu sua senha?");
		div3.appendChild(input);
		div2.appendChild(div3);
		form.appendChild(div2);
		div1.appendChild(form);
		section.appendChild(div1);
		div1 = document.createElement("div");
		var img = document.createElement("img");
		img.setAttribute("id", "logo_rapordo");
		img.setAttribute("src", "im/preInicio/imgRapordo.png");
		img.setAttribute("alt", "Rapordo");
		div1.appendChild(img);
		var p = document.createElement("p");
		p.setAttribute("style", "width: 93%; margin-left: auto; margin-right: auto;");
		txt = document.createTextNode("Seu WebApp de favoritos na nuvem");
		p.appendChild(txt);
		div1.appendChild(p);
		section.appendChild(div1);
		div.appendChild(section);
		section = document.createElement("section");
		section.setAttribute("id", "apresentacao_principal");
		p = document.createElement("p");
		txt = document.createTextNode('"Para que complicar ');
		p.appendChild(txt);
		var br = document.createElement("br");
		p.appendChild(br);
		txt = document.createTextNode(" se podemos ");
		p.appendChild(txt);
		var span = document.createElement("span");
		span.setAttribute("style", "font-weight: bold;");
		txt = document.createTextNode("simplificar");
		span.appendChild(txt);
		p.appendChild(span);
		txt = document.createTextNode('"');
		p.appendChild(txt);
		section.appendChild(p);
		div.appendChild(section);
		section = document.createElement("section");
		section.setAttribute("class", "transicao_conteudo");
		img = document.createElement("img");
		img.setAttribute("src", "im/preInicio/imgEstrelaSeparacao.png");
		section.appendChild(img);
		div.appendChild(section);
		section = document.createElement("section");
		section.setAttribute("id", "fluxo_introdutorio");
		var figure = document.createElement("figure");
		figure.setAttribute("class", "fluxo_introdutorio_item");
		img = document.createElement("img");
		img.setAttribute("src", "im/preInicio/imgSalve.png");
		img.setAttribute("alt", "SALVE");
		figure.appendChild(img);
		var figcaption = document.createElement("figcaption");
		txt = document.createTextNode("SALVE");
		figcaption.appendChild(txt);
		figure.appendChild(figcaption);
		section.appendChild(figure);
		figure = document.createElement("figure");
		figure.setAttribute("class", "fluxo_introdutorio_item");
		img = document.createElement("img");
		img.setAttribute("src", "im/preInicio/imgCompartilhe.png");
		img.setAttribute("alt", "COMPARTILHE");		
		figure.appendChild(img);
		figcaption = document.createElement("figcaption");
		txt = document.createTextNode("COMPARTILHE");
		figcaption.appendChild(txt);
		figure.appendChild(figcaption);
		section.appendChild(figure);
		figure = document.createElement("figure");
		figure.setAttribute("class", "fluxo_introdutorio_item");
		img = document.createElement("img");
		img.setAttribute("src", "im/preInicio/imgAproveite.png");
		img.setAttribute("alt", "APROVEITE");
		figure.appendChild(img);
		figcaption = document.createElement("figcaption");
		txt = document.createTextNode("APROVEITE");
		figcaption.appendChild(txt);
		figure.appendChild(figcaption);
		section.appendChild(figure);
		div.appendChild(section);
		section = document.createElement("section");
		section.setAttribute("style", "text-align: center;");
		var button = document.createElement("button");
		button.setAttribute("id", "btn_cadastro");
		txt = document.createTextNode("CADASTRE-SE NO RAPORDO");
		button.appendChild(txt);
		section.appendChild(button);
		div.appendChild(section);
		section = document.createElement("section");
		section.setAttribute("class", "apresentacao_funcionalidade_esquerda");
		section.setAttribute("style", "background-image: url(im/preInicio/imgExplicativa1.jpg); background-size: 100% 100%;");
		p = document.createElement("p");
		txt = document.createTextNode("Mantenha seus sites favoritos guardados em um único local!");
		p.appendChild(txt);
		section.appendChild(p);
		div.appendChild(section);
		section = document.createElement("section");
		section.setAttribute("class", "explicacao_funcionalidade");
		div1 = document.createElement("div");
		div1.setAttribute("class", "imagem_funcionalidade");
		img = document.createElement("img");
		img.setAttribute("src", "im/preInicio/imgMobilidade1.png");
		img.setAttribute("style", "width: 12em;");
		img.setAttribute("alt", "Tevesisão");
		div1.appendChild(img);
		img = document.createElement("img");
		img.setAttribute("src", "im/preInicio/imgMobilidade2.png");
		img.setAttribute("style", "width: 6em;");
		img.setAttribute("alt", "Tablet");
		div1.appendChild(img);		
		img = document.createElement("img");
		img.setAttribute("src", "im/preInicio/imgMobilidade3.png");
		img.setAttribute("style", "width: 3em;");
		img.setAttribute("alt", "Celular");
		div1.appendChild(img);	
		section.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("class", "texto_funcionalidade");
		p = document.createElement("p");
		p.setAttribute("style", "margin-bottom: 0;");
		p.setAttribute("class", "titulo_funcionalidade");
		txt = document.createTextNode("Acesse o ");
		p.appendChild(txt);
	    span = document.createElement("span");
		span.setAttribute("style", "font-weight: bold;");
		txt = document.createTextNode("Rapordo WebApp");
		span.appendChild(txt);
		p.appendChild(span);	
		txt = document.createTextNode(" de onde e quando quiser!");
		p.appendChild(txt);
		div1.appendChild(p);
		p = document.createElement("p");
		p.setAttribute("style", "font-size: 1.5em;");
		txt = document.createTextNode("O layout adaptativo oferecido pelo WebApp, garante que você tenha sempre em mãos os seus sites favoritos, seja no celular, no computador ou até mesmo na televisão!");
		p.appendChild(txt);
		div1.appendChild(p);
		section.appendChild(div1);
		div.appendChild(section);
		section = document.createElement("section");
		section.setAttribute("class", "apresentacao_funcionalidade_direita");
		section.setAttribute("style", "background-image: url(im/preInicio/imgExplicativa2.jpg); background-size: 100% 100%;");
		p = document.createElement("p");
		txt = document.createTextNode("Utilizando o Rapordo, a sua navegação na Internet será muito mais ágil!");
		p.appendChild(txt);
		section.appendChild(p);
		div.appendChild(section);
		section = document.createElement("section");
		section.setAttribute("class", "explicacao_funcionalidade explicacaoDirectionReverse");
		div1 = document.createElement("div");
		div1.setAttribute("style","width: 24.06em; text-align: center;");
		img = document.createElement("img");
		img.setAttribute("src", "im/preInicio/imgAproveiteMaior.png");
		img.setAttribute("class", "imagem_representativa_funcionalidade");
		img.setAttribute("alt", "APROVEITE");
		div1.appendChild(img);
		section.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("class", "texto_funcionalidade");
		p = document.createElement("p");
		p.setAttribute("style", "margin-bottom: 0;");
		p.setAttribute("class", "titulo_funcionalidade");
		txt = document.createTextNode("Seu tempo é ");
		p.appendChild(txt);
	    span = document.createElement("span");
		span.setAttribute("style", "font-weight: bold;");
		txt = document.createTextNode("precioso");
		span.appendChild(txt);
		p.appendChild(span);	
		txt = document.createTextNode(" e nós sabemos disso!");
		p.appendChild(txt);
		div1.appendChild(p);
		p = document.createElement("p");
		p.setAttribute("style", "font-size: 1.5em;");
		txt = document.createTextNode("O Rapordo WebApp permite que você não tenha que se preocupar em lembrar e digitar seus sites mais importantes. Com um clique você poderá acessar o site que mais precisa!");
		p.appendChild(txt);
		div1.appendChild(p);
		section.appendChild(div1);
		div.appendChild(section);
		section = document.createElement("section");
		section.setAttribute("class", "apresentacao_funcionalidade_esquerda");
		section.setAttribute("style", "background-image: url(im/preInicio/imgExplicativa3.jpg); background-size: 100% 100%;");
		p = document.createElement("p");
		txt = document.createTextNode("Veja seus links mesmo sem conexão com a Internet!");
		p.appendChild(txt);
		section.appendChild(p);
		div.appendChild(section);
		section = document.createElement("section");
		section.setAttribute("class", "explicacao_funcionalidade");
		div1 = document.createElement("div");
		div1.setAttribute("style","width: 24.06em; text-align: center;");
		img = document.createElement("img");
		img.setAttribute("src", "im/preInicio/imgSemConexao.png");
		img.setAttribute("class", "imagem_representativa_funcionalidade");
		img.setAttribute("alt", "Sem conexão");
		div1.appendChild(img);
		section.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("class", "texto_funcionalidade");
		p = document.createElement("p");
		p.setAttribute("style", "margin-bottom: 0;");
		p.setAttribute("class", "titulo_funcionalidade");
		txt = document.createTextNode("O ");
		p.appendChild(txt);
	    span = document.createElement("span");
		span.setAttribute("style", "font-weight: bold;");
		txt = document.createTextNode("Rapordo WebApp");
		span.appendChild(txt);
		p.appendChild(span);	
		txt = document.createTextNode(" está sempre com você!");
		p.appendChild(txt);
		div1.appendChild(p);
		p = document.createElement("p");
		p.setAttribute("style", "font-size: 1.5em;");
		txt = document.createTextNode("Todos os seus links favoritos armazenados no Rapordo podem ser visualizados mesmo quando seu dispositivo não encontra-se conectado na Internet!");
		p.appendChild(txt);
		div1.appendChild(p);
		section.appendChild(div1);
		div.appendChild(section);
		pagina.getMain().appendChild(div);
	}
	
	this.getTitle = function() {
		return "Pré-início";
	}
	
	this.construtor();
}