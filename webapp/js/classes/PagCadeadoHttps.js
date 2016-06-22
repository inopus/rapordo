function PagCadeadoHttps() {
	this.construir = function() {
		this.montaPagHtml();
	}
	
	this.montaPagHtml = function() {
		pagina.getMain().empty();
		var div = document.createElement("div");
		div.setAttribute("class", "limitaLargura fundo");
		var h1 = document.createElement("h1");
		var txt = document.createTextNode("Conexão HTTPS");
		h1.appendChild(txt);
		div.appendChild(h1);
		var p = document.createElement("p");
		txt = document.createTextNode("Todas as conexões do Rapordo WebApp são realizadas através do protocolo HTTPS (Hyper Text Transfer Protocol Secure - protocolo de transferência de hipertexto seguro).");
		p.appendChild(txt);
		div.appendChild(p);
		p = document.createElement("p");
		txt = document.createTextNode("Isso significa que todas as requições que o Rapordo WebApp faz com o servidor são feitas utilizando uma conexão criptografada para proteger os dados que estão sendo enviados e recebidos pela Internet.");
		p.appendChild(txt);
		div.appendChild(p);
		p = document.createElement("p");
		var strong = document.createElement("strong");
		txt = document.createTextNode("Mas o cadeado não está aparecendo na barra do meu navegador, isso significa que a conexão não está protegida, não é mesmo?");
		strong.appendChild(txt);
		p.appendChild(strong);
		var br = document.createElement("br");
		p.appendChild(br);
		txt = document.createTextNode("Não é verdade. O navegador não exibe o cadeado ao lado da barra de endereço, pois no momento em que você entrou no Rapordo WebApp, os arquivo básicos do site, como formulários, estrutura e scripts, foram requisitados via HTTP, mas após o WebApp transferido para o seu dispositivo, todas as conexões realizadas do Rapordo WebApp ao servidor são realizadas por HTTPS.");
		p.appendChild(txt);
		div.appendChild(p);
		p = document.createElement("p");
		strong = document.createElement("strong");
		txt = document.createTextNode("Mas então porque quando eu acesso ele já não mostra o cadeado e eu não vejo o cadeado depois de tudo carregado?");
		strong.appendChild(txt);
		p.appendChild(strong);
		br = document.createElement("br");
		p.appendChild(br);
		txt = document.createTextNode("Isso acontece porque as requisições feitas pelo Rapordo WebApp são requisições assíncronas, utilizando uma tecnologia chamada Ajax, que permite efetuar requisições paralelas à execução principal do app (assíncronas) e agilizar a navegação. Com isso a URL principal do site não é alterada. Fizemos dessa forma, pois a URL HTTPS do Rapordo atualmente não é uma URL amigavél, pois utiliza um outro domínio.");
		p.appendChild(txt);
		div.appendChild(p);
		p = document.createElement("p");
		txt = document.createTextNode('Caso você queria verificar qual é o servidor que o WebApp está utilizando para enviar e buscar informações, digite no console dessa janela "pagina.getWs()" (sem as aspas).');
		p.appendChild(txt);
		div.appendChild(p);
		p = document.createElement("p");
		txt = document.createTextNode("Para maiores dúvidas ou dificuldades, estamos a disposição através do e-mail ");
		p.appendChild(txt);
		var a = document.createElement("a");
		a.setAttribute("href", "mailto:contato@rapordo.com");
		a.setAttribute("target", "_blank");
		txt = document.createTextNode("contato@rapordo.com");
		a.appendChild(txt);
		p.appendChild(a);
		txt = document.createTextNode(".");
		p.appendChild(txt);
		div.appendChild(p);
		pagina.getMain().appendChild(div);
		return true;
	}
	
	this.getTitle = function() {
		return "Conexão HTTPS";
	}
	
	this.construir();
}