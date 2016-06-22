function PagAjuda() {
	this.construtir = function() {
		this.montaPagHtml();
	}
	
	this.montaPagHtml = function() {
		pagina.getMain().empty();
		var div = document.createElement("div");
		div.setAttribute("class", "limitaLargura fundo");
		var h1 = document.createElement("h1");
		var txt = document.createTextNode("Ajuda");
		h1.appendChild(txt);
		div.appendChild(h1);
		var p = document.createElement("p");
		txt = document.createTextNode("Você pode curtir a página do ");
		p.appendChild(txt);
		var a = document.createElement("a");
		a.setAttribute("href", "https://fb.com/rapordo.oficial");
		a.setAttribute("title", "Acessar a página do Rapordo no Facebook");
		a.setAttribute("target", "_blank");
		txt = document.createTextNode("Rapordo no Facebook");
		a.appendChild(txt);
		p.appendChild(a);
		txt = document.createTextNode(" e acompanhar dicas e novidades sobre o Rapordo!");
		p.appendChild(txt);
		div.appendChild(p);
		p = document.createElement("p");
		txt = document.createTextNode("Caso tenha alguma dificuldade, dúvida ou segestão, estamos à disposição através do e-mail ");
		p.appendChild(txt);
		a = document.createElement("a");
		a.setAttribute("href", "mailto:contato@rapordo.com");
		a.setAttribute("title", "Enviar um e-mail para contato@rapordo.com");
		a.setAttribute("target", "_blank");
		txt = document.createTextNode("contato@rapordo.com");
		a.appendChild(txt);
		p.appendChild(a);
		txt = document.createTextNode(".");
		p.appendChild(txt);
		div.appendChild(p);
		p = document.createElement("p");
		txt = document.createTextNode("Você pode acompanhar cada atualização do Rapordo WebApp na página ");
		p.appendChild(txt);
		a = document.createElement("a");
		a.setAttribute("href", "#Sobre");
		a.setAttribute("title", "Sobre o Rapordo");
		txt = document.createTextNode("Sobre");
		a.appendChild(txt);
		p.appendChild(a);
		txt = document.createTextNode(".");
		p.appendChild(txt);
		div.appendChild(p);
		var h2 = document.createElement("h2");
		txt = document.createTextNode("FAQ (Perguntas frequentes)");
		h2.appendChild(txt);
		div.appendChild(h2);
		var ul = document.createElement("ul");
		ul.setAttribute("id", "pagAjuda_listaFAQ");
		// inicio da lista FAQ
		var li = document.createElement("li");
		var strong = document.createElement("strong");
		txt = document.createTextNode("Eu adicionei (ou editei) um site (ou uma categoria) em um dispositivo e esse item não está aparecendo (ou atualizando) em um outro dispositivo.");
		strong.appendChild(txt);
		li.appendChild(strong);
		var br = document.createElement("br");
		li.appendChild(br);
		txt = document.createTextNode('Para economizar recursos, como por exemplo processamento e tráfego de dados, do seu dispositivo, o Rapordo WebApp não detecta automaticamente os itens adicionados ou editados em outros dispositivos, mesmo que eles já tenham sido enviados para o servidor. Para atualizar manualmente basta clicar no ícone "Baixar do servidor".');
		li.appendChild(txt);
		ul.appendChild(li);
		
		li = document.createElement("li");
		strong = document.createElement("strong");
		txt = document.createTextNode("Por quê, quando eu adiciono um novo site, ele já não aparece na minha lista de sites e vai para a lista de pendências?");
		strong.appendChild(txt);
		li.appendChild(strong);
		br = document.createElement("br");
		li.appendChild(br);
		txt = document.createTextNode('A lista de pendências foi criada por dois motivos básicos. O primeiro deles é para que você possa armazenar um item no seu dispositivo sem precisar de conexão com a Internet. O segundo motivo é para que você possa consumir a sua conexão com a Internet para enviar os dados quando achar melhor.');
		li.appendChild(txt);
		ul.appendChild(li);
		
		li = document.createElement("li");
		strong = document.createElement("strong");
		txt = document.createTextNode("Por quê eu não posso adicionar um novo site à minha página de Sites sem possuir conexão com a Internet?");
		strong.appendChild(txt);
		li.appendChild(strong);
		br = document.createElement("br");
		li.appendChild(br);
		txt = document.createTextNode('Visando a integridade dos seus dados de sua conta nos diferentes dispositivos, o Rapordo WebApp não permite alterações em seus objetos (Sites, Categorias, Usuário...) sem que você esteja conectado à internet.');
		li.appendChild(txt);
		ul.appendChild(li);
		
		li = document.createElement("li");
		strong = document.createElement("strong");
		txt = document.createTextNode("No novo Rapordo não existe mais os acessórios? E o bate-papo? E a lista de amigos?");
		strong.appendChild(txt);
		li.appendChild(strong);
		br = document.createElement("br");
		li.appendChild(br);
		txt = document.createTextNode('O novo Rapordo mudou. Está muito mais focado no seu principal objeto, armazenar os seus sites favoritos. Por isso, algumas funcionalidades do Rapordo não estão disponíveis no novo WebApp, mas é possível continuar acessando os seus dados antigos através do endereço ');
		li.appendChild(txt);
		a = document.createElement("a");
		a.setAttribute("href", "http://antigo.rapordo.com");
		a.setAttribute("title", "Acessar a versão antiga do Rapordo");
		a.setAttribute("target", "_blank");
		txt = document.createTextNode("http://antigo.rapordo.com");
		a.appendChild(txt);
		li.appendChild(a);
		txt = document.createTextNode(". Com relação à sua lista de amigos, essa funcionalidade será implementada nas próximas versões do WebApp.");
		li.appendChild(txt);
		ul.appendChild(li);
		
		li = document.createElement("li");
		strong = document.createElement("strong");
		txt = document.createTextNode("Quando eu grifo um texto (ou arrasto para o lado) a tela do WebApp muda. Por que isso acontece?");
		strong.appendChild(txt);
		li.appendChild(strong);
		br = document.createElement("br");
		li.appendChild(br);
		txt = document.createTextNode('Isso acontece para que você possa navegar rápidamente entre as páginas mais importantes do WebApp, sem precisar clicar nos itens dos menus.');
		li.appendChild(txt);
		ul.appendChild(li);
		// fim da lista FAQ
		div.appendChild(ul);
		pagina.getMain().appendChild(div);
		return true;
	}
	
	this.getTitle = function() {
		return "Ajuda";
	}
	
	this.construtir();
}