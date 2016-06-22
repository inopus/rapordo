function PagPrivacidade() {
	this.construtor = function() {
		this.montaPagHtml();
	}
	
	this.montaPagHtml = function() {
		pagina.getMain().empty();
		var div = document.createElement("div");
		div.setAttribute("class", "limitaLargura fundo");
		var h1 = document.createElement("h1");
		var txt = document.createTextNode("Política de Privacidade");
		h1.appendChild(txt);
		div.appendChild(h1);
		var p = document.createElement("p");
		txt = document.createTextNode("Toda pessoa que cria uma conta no Rapordo é um USUÁRIO Rapordo.");
		p.appendChild(txt);
		div.appendChild(p);
		p = document.createElement("p");
		txt = document.createTextNode("Os COLABORADORES são formados por pessoas ou empresas que contribuem com o desenvolvimento do Rapordo.");
		p.appendChild(txt);
		div.appendChild(p);
		p = document.createElement("p");
		txt = document.createTextNode("Os AFILIADOS são formados por pessoas ou empresas que divulgam serviços ou produtos dentro do Rapordo.");
		p.appendChild(txt);
		div.appendChild(p);
		p = document.createElement("p");
		txt = document.createTextNode("Os PARCEIROS são formados por pessoas ou empresas que possuem algum tipo de relação com o Rapordo. Essas relações não são validas se forem feitas através do USUÁRIO, sem que haja uma documentação explicitando o tipo de relação que ha entre o Rapordo e o PARCEIRO. O Rapordo e as pessoas/empresas devem estar cientes dessa relação para que a pessoa/empresa seja incluída no grupo de PARCEIROS do Rapordo.");
		p.appendChild(txt);
		div.appendChild(p);
		p = document.createElement("p");
		txt = document.createTextNode("Todos os dados pessoais do USUÁRIO só podem ser alterados pelo próprio USUÁRIO.");
		p.appendChild(txt);
		div.appendChild(p);
		p = document.createElement("p");
		txt = document.createTextNode("Todos os registros do USUÁRIO podem ser compartilhados com outro USUÁRIO apenas dentro do Rapordo.");
		p.appendChild(txt);
		div.appendChild(p);
		p = document.createElement("p");
		txt = document.createTextNode("O Rapordo não pode divulgar informações pessoais sobre o USUÁRIO para os COLABORADORES, AFILIADOS e PARCEIROS.");
		p.appendChild(txt);
		div.appendChild(p);
		p = document.createElement("p");
		txt = document.createTextNode("Esse documento pode ser alterado sem aviso prévio. É de responsabilidade do usuário acessar esse documento para estar sempre atualizado quanto a Política de Privacidade do Rapordo.");
		p.appendChild(txt);
		div.appendChild(p);
		p = document.createElement("p");
		txt = document.createTextNode("Essa política tem efeito a partir de 02 de Março de 2012 e são válidos para qualquer USUÁRIO do Rapordo, independente da data de criação da conta do USUÁRIO no Rapordo.");
		p.appendChild(txt);
		div.appendChild(p);
		pagina.getMain().appendChild(div);
		return true;
	}
	
	this.getTitle = function() {
		return "Política de Privacidade";
	}
	
	this.construtor();
}