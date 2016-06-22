function PagNotasLancamento() {
	this.construir = function() {
		this.montaPagHtml();
	}
	
	this.montaPagHtml = function() {
		pagina.getMain().empty();
		var div = document.createElement("div");
		div.setAttribute("class", "limitaLargura fundo");
		var h1 = document.createElement("h1");
		h1.setAttribute("style", "font-size: 1.6em;");
		var txt = document.createTextNode("Notas de lançamento");
		h1.appendChild(txt);
		div.appendChild(h1);
		var p = document.createElement("p");
		txt = document.createTextNode("Aqui você pode acompanhar todas a atualizações do Rapordo WebApp desde o lançamento da sua primeira versão.");
		p.appendChild(txt);
		div.appendChild(p);
		p = document.createElement("p");
		txt = document.createTextNode('As atualizações do Rapordo WebApp são classificadas em 3 níveis, "x", "y", "z" (x.y.z). Quando há uma alteração que não causa impacto nenhum no funcionamento do WebApp, a versão do WebApp é alterada apenas no nível "z". Quando há uma correção em alguma funcionalidade do WebApp, então a versão do WebApp é alterada no nível "y". Já quando criamos uma nova funcionalidade ou alteramos o funcionamento de alguma funcionalidade já existente, a versão do WebApp é alterada no nível "x".');
		p.appendChild(txt);
		div.appendChild(p);
		p = document.createElement("p");
		txt = document.createTextNode('Todas as atualizações do Rapordo WebApp no nível "x" são anunciadas na página do ');
		p.appendChild(txt);
		var a = document.createElement("a");
		a.setAttribute("href", "https://fb.com/rapordo.oficial");
		a.setAttribute("target", "_blank");
		a.setAttribute("title", "Acessar a página do Rapordo no Facebook");
		txt = document.createTextNode("Rapordo no Facebook");
		a.appendChild(txt);
		p.appendChild(a);
		txt = document.createTextNode(".");
		p.appendChild(txt);
		div.appendChild(p);
		var ul = document.createElement("ul");
		ul.setAttribute("class", "listaComum");
		var li = document.createElement("li");
		txt = document.createTextNode("1.0.0 - 16/08/2015 - Lançamento do novo Rapordo (WebApp)");
		li.appendChild(txt);
		ul.appendChild(li);
		div.appendChild(ul);
		pagina.getMain().appendChild(div);
		return true;
	}
	
	this.getTitle = function() {
		return "Notas de lançamento";
	}
	
	this.construir();
}