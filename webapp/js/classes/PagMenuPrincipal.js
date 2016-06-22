function PagMenuPrincipal() {
	this.construtor = function() {
		this.montaPagHtml();
	}
	
	this.montaPagHtml = function() {
		pagina.getMain().empty();
		var menu_principal = document.createElement("div");
		menu_principal.setAttribute("class", "limitaLargura fundo");
		menu_principal.setAttribute("id", "menu_principal");
		var h1 = document.createElement("h1");
		h1.setAttribute("style", "text-align: center; font-size: 1.4em; margin-bottom: 0.4em;");
		var ul = document.createElement("ul");
		var arr = new Array();
		var txt = "";
		if(usuario.getId() == undefined || usuario.getId() == "") {
			txt = document.createTextNode("(Não autenticado)");
			h1.appendChild(txt);
			menu_principal.appendChild(h1);
			arr = new Array(
				["preInicio", "Entrar"],
				["inicio", "Criar uma nova conta"],
				["recuperarDados", "Esqueceu seus dados?"],
				["ajuda", "Ajuda"],
				["sobre", "Sobre"]
			);
			
		} else {
			txt = document.createTextNode(usuario.getUsuario());
			h1.appendChild(txt);
			menu_principal.appendChild(h1);
			arr = new Array(
				["sites", "Meus sites"],
				["configuracao", "Configurações da conta"],
				["sair", "Sair desse usuário"]
			);
		}
		var arrTmn = arr.length;
		var li = "";
		var a = "";
		for(var i = 0; i < arrTmn; i++) {
			li = document.createElement("li");
			a = document.createElement("a");
			a.setAttribute("href", "#" + arr[i][0]);
			a.setAttribute("title", "#" + arr[i][1]);
			(function(x) {
					a.addEventListener("click", function() {
						pagina.abrirPaginas(x);
					});
			})(arr[i][0]);
			txt = document.createTextNode(arr[i][1]);
			a.appendChild(txt);
			li.appendChild(a);
			ul.appendChild(li);
		}
		menu_principal.appendChild(ul);
		var section = document.createElement("section");
		var button = document.createElement("button");
		button.setAttribute("class", "zoomControle");
		button.setAttribute("style", "border-right-color: #bbbbbb;");
		button.setAttribute("title", "Diminuir zoom");
		txt = document.createTextNode("-");
		button.appendChild(txt);
		button.addEventListener("click", function() {
			pagina.zoomMenos();
			document.getElementById("menu_principal_zoom_label").value = pagina.getZoom() + "%";
		});
		section.appendChild(button);
		var input = document.createElement("input");
		input.setAttribute("type", "text");
		input.setAttribute("readonly", true);
		input.setAttribute("class", "zoomControle");
		input.setAttribute("style", "border-left: none; border-right: none; width: 2.6em; text-align: center;");
		input.setAttribute("title", "Valor atual do zoom");
		input.setAttribute("id", "menu_principal_zoom_label");
		input.setAttribute("value", pagina.getZoom() + "%");
		section.appendChild(input);
		button = document.createElement("button");
		button.setAttribute("class", "zoomControle");
		button.setAttribute("style", "border-left-color: #bbbbbb;");
		button.setAttribute("title", "Aumentar zoom");
		txt = document.createTextNode("+");
		button.appendChild(txt);
		button.addEventListener("click", function() {
			pagina.zoomMais();
			document.getElementById("menu_principal_zoom_label").value = pagina.getZoom() + "%";
		});
		section.appendChild(button);
		section.setAttribute("style", "display: -webkit-flex; display: -moz-flex; display: flex; -webkit-justify-content: center; -moz-justify-content: center; justify-content: center; margin-top: 1em;");
		section.setAttribute("title", "Zoom");
		menu_principal.appendChild(section);
		pagina.getMain().appendChild(menu_principal);
	}
	
	this.getTitle = function() {
		return "Menu principal";
	}
	
	this.construtor();
}