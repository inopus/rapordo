function PagTermos() {
	this.construtor = function() {
		this.montaPagHtml();
	}
	
	this.montaPagHtml = function() {
		pagina.getMain().empty();
		var div = document.createElement("div");
		div.setAttribute("class", "limitaLargura fundo");
		var h1 = document.createElement("h1");
		var txt = document.createTextNode("Termos de Serviço");
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
		txt = document.createTextNode("O USUÁRIO se compromete a não colocar dados falsos ou pertencentes a outra pessoa como sendo seu.");
		p.appendChild(txt);
		div.appendChild(p);
		p = document.createElement("p");
		txt = document.createTextNode("O USUARIO pode manter seus registros no Rapordo por tempo indeterminado desde que todos os registros sejam pertencentes, parcialmente ou completamente, ao USUÁRIO.");
		p.appendChild(txt);
		div.appendChild(p);
		p = document.createElement("p");
		txt = document.createTextNode("Caso o USUÁRIO mantenha registros que não são de sua autoria, parcialmente ou completamente, esses registros podem ser apagados sem aviso prévio do USUÁRIO.");
		p.appendChild(txt);
		div.appendChild(p);
		p = document.createElement("p");
		txt = document.createTextNode("Qualquer pessoa pode denunciar uso de dados não autorizado no Rapordo pelo USUÁRIO. Caso seja confirmado o uso não autorizado de dados não pertencentes ao USUÁRIO, esses dados podem ser apagados sem aviso prévio. A denuncia só é válida se for realizada formalmente através do e-mail denuncia@rapordo.com.");
		p.appendChild(txt);
		div.appendChild(p);
		p = document.createElement("p");
		txt = document.createTextNode("O Rapordo pode ser alterado a qualquer momento, sem aviso prévio, assim como ser retirado integralmente do sistema. As suas informações podem ser manipuladas de qualquer forma e a qualquer hora sem aviso prévio, desde que essas manipulações não infrinjam a Política de Privacidade do Rapordo.");
		p.appendChild(txt);
		div.appendChild(p);
		p = document.createElement("p");
		txt = document.createTextNode("Esses termos tem efeito a partir de 02 de Março de 2012 e são válidos para qualquer USUÁRIO do Rapordo, independente da data de criação da conta do USUÁRIO no Rapordo.");
		p.appendChild(txt);
		div.appendChild(p);
		pagina.getMain().appendChild(div);
		return true;
	}
	
	this.getTitle = function() {
		return "Termos de Serviço";
	}
	
	this.construtor();
}