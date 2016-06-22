function PagLanguage() {
	this.construir = function() {
		this.montaPagHtml();
	}
	
	this.montaPagHtml = function() {
		pagina.getMain().empty();
		var div = document.createElement("div");
		div.setAttribute("class", "limitaLargura fundo");
		var h1 = document.createElement("h1");
		var txt = document.createTextNode("Other languages");
		h1.appendChild(txt);
		div.appendChild(h1);
		var p = document.createElement("p");
		txt = document.createTextNode("[EN]");
		p.appendChild(txt);
		var br = document.createElement("br");
		p.appendChild(br);
		txt = document.createTextNode("Sorry. For now, the Rapordo WebApp is available only in Portuguese Brazil language (PT-BR).");
		p.appendChild(txt);
		div.appendChild(p);
		p = document.createElement("p");
		txt = document.createTextNode("[PT-BR]");
		p.appendChild(txt);
		br = document.createElement("br");
		p.appendChild(br);
		txt = document.createTextNode("Desculpe. Por enquanto, o Rapordo WebApp está disponível apenas no idioma Portugues Brasil (PT-BR).");
		p.appendChild(txt);
		div.appendChild(p);
		pagina.getMain().appendChild(div);
		return true;
	}
	
	this.getTitle = function() {
		return "Other languages";
	}
	
	this.construir();
}