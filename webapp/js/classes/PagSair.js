function PagSair() {
	this.construir = function() {
		this.montaPagHtml();
		document.getElementById("btnFormSair").addEventListener("click", function() {
			var opcao = undefined;
			if(document.getElementById("formSairOpcaoApagaTudo").checked) {
				opcao = "ApagaTudo";
				pag.apagaSites();
				pag.apagaCategoria();
				pag.apagaSitePendencia();
			} else if(document.getElementById("formSairOpcaoMantemTudo").checked) {
				opcao = "MantemTudo";
			}
			if(opcao == undefined) {
				alert("É necessário escolher o que deseja fazer com seus dados armazenados nesse dispositivo para sair");
			} else {
				pagina.usuarioSair();
			}
		});
	}
	
	this.apagaCategoria = function() {
		var banco_Categoria = new Banco_Categoria();
		banco_Categoria.delAll(usuario.getId());
	}
	
	this.apagaSites = function() {
		var banco_Site = new Banco_Site();
		banco_Site.delAll(usuario.getId());
	}
	
	this.apagaSitePendencia = function() {
		var banco_SitePendencia = new Banco_SitePendencia();
		banco_SitePendencia.delAll(usuario.getId());
	}
	
	this.montaPagHtml = function() {
		pagina.getMain().empty();
		var div = document.createElement("div");
		div.setAttribute("class", "limitaLargura fundo");
		var form = document.createElement("form");
		form.setAttribute("id", "formSair");
		form.setAttribute("class", "formulario");
		form.setAttribute("target", "_top");
		form.setAttribute("method", "post");
		form.setAttribute("spellcheck", false);
		form.setAttribute("novalidate", true);
		var h1 = document.createElement("h1");
		h1.setAttribute("style", "font-size: 1.6em; margin-top: 0;");
		var txt = document.createTextNode("O que deseja fazer com os seus dados armazenados nesse dispositivo?");
		h1.appendChild(txt);
		form.appendChild(h1);
		var p = document.createElement("p");
		p.setAttribute("class", "espacoForm");
		txt = document.createTextNode("O Rapordo WebApp armazena alguns dados no seu dispositivo como usuário, senha, configurações, sites e informações de seus amigos.\
					Isso é feito para que a sua navegação no nosso WebApp seja mais rápida e você possa\
					navegar mesmo quando não tiver conectado à Internet.");
		p.appendChild(txt);
		form.appendChild(p);
		p = document.createElement("p");
		p.setAttribute("class", "espacoForm");
		txt = document.createTextNode("Ao apagar os dados do seu dispositivo significa que na próxima vez que você entrar com \
					o seu usuário nesse dispositivo,\
					o Rapordo WebApp precisará de conexão com à Internet para buscar todos os seus dados novamente.");
		p.appendChild(txt);
		form.appendChild(p);
		p = document.createElement("p");
		p.setAttribute("class", "espacoForm");
		txt = document.createTextNode("Escolha, entre as opções disponíveis abaixo, o que deseja fazer com os seus dados armazenados nesse dispositivo.");
		p.appendChild(txt);
		form.appendChild(p);
		var div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		var label = document.createElement("label");
		var input = document.createElement("input");
		input.setAttribute("type", "radio");
		input.setAttribute("class", "rad");
		input.setAttribute("name", "formSairOpcao");
		input.setAttribute("id", "formSairOpcaoApagaTudo");
		input.setAttribute("value", "ApagaTudo");
		label.appendChild(input);
		txt = document.createTextNode(" Apagar todas as informações relacionadas com meu usuário nesse dispositivo.");
		label.appendChild(txt);
		div1.appendChild(label);
		form.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		label = document.createElement("label");
		input = document.createElement("input");
		input.setAttribute("type", "radio");
		input.setAttribute("class", "rad");
		input.setAttribute("name", "formSairOpcao");
		input.setAttribute("id", "formSairOpcaoMantemTudo");
		input.setAttribute("value", "MantemTudo");
		input.setAttribute("checked", true);
		label.appendChild(input);
		txt = document.createTextNode(" Manter todos os dados (Recomendado).");
		label.appendChild(txt);
		div1.appendChild(label);
		form.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		input = document.createElement("input");
		input.setAttribute("type", "button");
		input.setAttribute("class", "btn");
		input.setAttribute("id", "btnFormSair");
		input.setAttribute("value", "Sair desse usuário");
		div1.appendChild(input);
		form.appendChild(div1);
		div.appendChild(form);
		pagina.getMain().appendChild(div);
		return true;
	}
	
	this.getTitle = function() {
		return "Sair";
	}
	
	this.construir();
}