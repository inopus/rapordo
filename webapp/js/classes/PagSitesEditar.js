function PagSitesEditar() {
	var idInterval = 0;
	
	this.construtor = function() {
		this.montaPagHtml();
		this.abrir();
	}
	
	this.abrir = function() {
		document.getElementById("pagSitesEditar_pesquisa").focus();
	}
	
	this.buscaRegex = function(txt) {
		if(!txt || txt == "") {
			return "";
		} else {
			return new RegExp('.*' + txt + '.*', 'i');
		}
	}
	
	this.pesquisar = function() {
		var pesquisaLista = document.getElementById("pagSitesEditar_pesquisaLista");
		var busca = this.buscaRegex(document.getElementById("pagSitesEditar_pesquisa").value);
		if(busca == "") {
			pesquisaLista.empty();
			var pesquisaLista = document.getElementById("pagSitesEditar_pesquisaLista");
			var li = document.createElement("li");
			li.setAttribute("style", "text-align: center; font-weight: bold;");
			txt = document.createTextNode("(Realize uma pesquisa para selecionar um site)");
			li.appendChild(txt);
			pesquisaLista.appendChild(li);
		} else {
			var banco_Site = new Banco_Site();
			banco_Site.getAll(undefined, function(lista) {
				var listaTmn = lista.length;
				pesquisaLista.empty();
				if(listaTmn > 0) {
					var novaLista = new Array();
					for(var i = 0; i < listaTmn; i++) {
						if(
							busca.test(lista[i].getNome()) ||
							busca.test(lista[i].getDescricao()) ||
							busca.test(lista[i].getUrl())
						) {
							novaLista.push(lista[i]);
						}
					}
					lista = novaLista;
				}
				pag.pesquisaListar(lista);
			});
		}
	}
	
	this.pesquisaItemHtml = function(site) {
		var li = document.createElement("li");
		li.setAttribute("title", site.getNome() + ((site.getDescricao() != "") ? (" - " + site.getDescricao()) : ""));
		li.addEventListener("click", function() {
			pagina.abrirPaginas("sitesEditarEdicao", site.getId());
		});
		txt = document.createTextNode(site.getNome());
		li.appendChild(txt);
		return li;
	}
	
	this.pesquisaListar = function(lista) {
		var listaTmn = lista.length;
		var pesquisaLista = document.getElementById("pagSitesEditar_pesquisaLista");
		pesquisaLista.empty();
		if(listaTmn > 0) {
			lista.sort(function(a, b) {
				if(a.getNome().toLowerCase() > b.getNome().toLowerCase()) {
					return 1;
				} else {
					return -1;
				}
			});
			for(var i = 0; i < listaTmn; i++) {
				pesquisaLista.appendChild(this.pesquisaItemHtml(lista[i]));
			}
		} else {
			var li = document.createElement("li");
			li.setAttribute("style", "text-align: center; font-weight: bold;");
			txt = document.createTextNode("(Nenhum site encontrado)");
			li.appendChild(txt);
			pesquisaLista.appendChild(li);
		}
	}
	
	this.montaPagHtml = function() {
		pagina.getMain().empty();
		var div = document.createElement("div");
		div.setAttribute("class", "limitaLargura fundo");
		var h1 = document.createElement("h1");
		txt = document.createTextNode("Editar site");
		h1.appendChild(txt);
		div.appendChild(h1);
		var form = document.createElement("form");
		form.setAttribute("onsubmit", "return false;");
		form.setAttribute("class", "formulario fundo");
		form.setAttribute("method", "post");
		form.setAttribute("spellcheck", false);
		form.setAttribute("novalidate", true);
		form.setAttribute("style", "margin-top: 1em;");
		var label = document.createElement("label");
		label.setAttribute("for", "pagSitesEditar_pesquisa");
		var txt = document.createTextNode("Pesquisar site");
		label.appendChild(txt);
		form.appendChild(label);
		var input = document.createElement("input");
		input.setAttribute("type", "text");
		input.setAttribute("placeholder", "Exemplo: Rapordo.com");
		input.setAttribute("class", "inputTxt");
		input.setAttribute("id", "pagSitesEditar_pesquisa");
		input.addEventListener("keyup", function(event) {
			if(event.key == "Enter" || event.keyCode == 13) {
				this.blur();
			}
			if(pag.getIdInterval() != 0) {
				window.clearTimeout(pag.getIdInterval());
			}
			pag.setIdInterval(window.setTimeout(function() {
				pag.pesquisar();
				pag.setIdInterval(0);
			}, 400));
		});
		form.appendChild(input);
		div.appendChild(form);
		var ul = document.createElement("ul");
		ul.setAttribute("id", "pagSitesEditar_pesquisaLista");
		var li = document.createElement("li");
		li.setAttribute("style", "text-align: center; font-weight: bold;");
		txt = document.createTextNode("(Realize uma pesquisa para selecionar um site)");
		li.appendChild(txt);
		ul.appendChild(li);
		div.appendChild(ul);
		pagina.getMain().appendChild(div);
		return true;
	}
	
	this.getTitle = function() {
		return "Editar site";
	}
	
	this.getIdInterval = function() {
		return idInterval;
	}
	
	this.setIdInterval = function(id) {
		idInterval = parseInt(id);
	}
	
	this.construtor();
}