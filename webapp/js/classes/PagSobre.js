function PagSobre() {
	this.construir = function() {
		this.montaPagHtml();
		
	}
	
	this.montaPagHtml = function() {
		pagina.getMain().empty();
		var div = document.createElement("div");
		div.setAttribute("class", "limitaLargura fundo");
		var section = document.createElement("section");
		var h1 = document.createElement("h1");
		var txt = document.createTextNode("Sobre");
		h1.appendChild(txt);
		section.appendChild(h1);
		var p = document.createElement("p");
		txt = document.createTextNode("Rapordo é um site onde você pode gravar todos os seus sites favoritos de forma simples e rápida, e o melhor, os links dos sites ficam disponíveis em uma página que você pode acessa-la de qualquer lugar através do endereço rapordo.com/seuusuario.");
		p.appendChild(txt);
		section.appendChild(p);
		p = document.createElement("p");
		txt = document.createTextNode("Imagine que você esta lendo uma matéria interessante em um site muito grande ou então em um site que você nunca tenha entrado antes e, por algum motivo, precisa fechar o navegador. Com o Rapordo você não terá dor de cabeça e nem perda de tempo. Você pode facilmente acessar a sua conta e gravar o site na sua página. Assim você não perderá o site e o link estará acessível de qualquer computador na sua página.");
		p.appendChild(txt);
		section.appendChild(p);
		p = document.createElement("p");
		txt = document.createTextNode("Facilite e agilize a sua navegação na internet e a sua vida. Crie já a sua conta e coloque a sua página Rapordo como página inicial do seu navegador.");
		p.appendChild(txt);
		section.appendChild(p);
		var h2 = document.createElement("h2");
		txt = document.createTextNode("Equipe Rapordo");
		h2.appendChild(txt);
		section.appendChild(h2);
		var ul = document.createElement("ul");
		ul.setAttribute("id", "sobre_listaEquipe");
		var li = document.createElement("li");
		var a = document.createElement("a");
		a.setAttribute("href", "http://otavio.rrossi.eti.br");
		a.setAttribute("target", "_blank");
		txt = document.createTextNode("Otávio R. Rossi");
		a.appendChild(txt);
		li.appendChild(a);
		ul.appendChild(li);
		li = document.createElement("li");
		a = document.createElement("a");
		a.setAttribute("href", "http://vrestivo.com.br/");
		a.setAttribute("target", "_blank");
		txt = document.createTextNode("Victor C. Restivo");
		a.appendChild(txt);
		li.appendChild(a);
		ul.appendChild(li);
		li = document.createElement("li");
		a = document.createElement("a");
		a.setAttribute("href", "http://uezima.com");
		a.setAttribute("target", "_blank");
		txt = document.createTextNode("Guilherme Uezima");
		a.appendChild(txt);
		li.appendChild(a);
		ul.appendChild(li);
		li = document.createElement("li");
		a = document.createElement("a");
		a.setAttribute("href", "https://br.linkedin.com/in/michelzf");
		a.setAttribute("target", "_blank");
		txt = document.createTextNode("Michel Zarzour");
		a.appendChild(txt);
		li.appendChild(a);
		ul.appendChild(li);
		li = document.createElement("li");
		a = document.createElement("a");
		a.setAttribute("href", "https://br.linkedin.com/in/giovannagb");
		a.setAttribute("target", "_blank");
		txt = document.createTextNode("Giovanna G. Boghi");
		a.appendChild(txt);
		li.appendChild(a);
		ul.appendChild(li);
		section.appendChild(ul);
		p = document.createElement("p");
		var strong = document.createElement("strong");
		txt = document.createTextNode("Qualquer dúvida ou dificuldade, estamos à disposição!");
		strong.appendChild(txt);
		p.appendChild(strong);
		section.appendChild(p);
		div.appendChild(section);
		section = document.createElement("section");
		h1 = document.createElement("h1");
		txt = document.createTextNode("Notas de lançamento");
		h1.appendChild(txt);
		section.appendChild(h1);
		p = document.createElement("p");
		txt = document.createTextNode("Aqui você pode acompanhar todas a atualizações do Rapordo WebApp desde o lançamento da sua primeira versão.");
		p.appendChild(txt);
		section.appendChild(p);
		p = document.createElement("p");
		txt = document.createTextNode('As atualizações do Rapordo WebApp são classificadas em 3 níveis, "x", "y", "z" (x.y.z). Quando há uma alteração que não causa impacto nenhum no funcionamento do WebApp, a versão do WebApp é alterada apenas no nível "z". Quando há uma correção, ou complemento, em alguma funcionalidade do WebApp, então a versão do WebApp é alterada no nível "y". Já quando criamos uma nova funcionalidade ou alteramos o funcionamento de alguma funcionalidade já existente, a versão do WebApp é alterada no nível "x".');
		p.appendChild(txt);
		section.appendChild(p);
		p = document.createElement("p");
		txt = document.createTextNode('Todas as atualizações do Rapordo WebApp no nível "x" são anunciadas na página do ');
		p.appendChild(txt);
		a = document.createElement("a");
		a.setAttribute("href", "https://fb.com/rapordo.oficial");
		a.setAttribute("target", "_blank");
		a.setAttribute("title", "Acessar a página do Rapordo no Facebook");
		txt = document.createTextNode("Rapordo no Facebook");
		a.appendChild(txt);
		p.appendChild(a);
		txt = document.createTextNode(".");
		p.appendChild(txt);
		section.appendChild(p);
		ul = document.createElement("ul");
		ul.setAttribute("class", "listaComum");
		// inicio da lista
		li = document.createElement("li");
		txt = document.createTextNode('4.10.0 - 09/01/2016 - Alteração dos servidores WebService hospedados externamente. Melhoria de desempenho da função "Mover sites". Retirada dos cantos arredondados nos campos, botões e sites.');
		li.appendChild(txt);
		ul.appendChild(li);
		li = document.createElement("li");
		txt = document.createTextNode('4.9.1 - 20/09/2015 - Correções e alterações nas funcionalidades para cache de informações.');
		li.appendChild(txt);
		ul.appendChild(li);
		li = document.createElement("li");
		txt = document.createTextNode('4.5.0 - 20/09/2015 - Modificação nas funcionalidades para cache de informações.');
		li.appendChild(txt);
		ul.appendChild(li);
		li = document.createElement("li");
		txt = document.createTextNode('4.4.0 - 05/09/2015 - Alterada a opacidade do fundo preto dos icones dos sites; Modificado "listener" no campo URL no Adicionar e Editar Site');
		li.appendChild(txt);
		ul.appendChild(li);
		li = document.createElement("li");
		txt = document.createTextNode('4.3.4 - 05/09/2015 - Ajuste no CSS da funcionalidade implementada na versão anterior');
		li.appendChild(txt);
		ul.appendChild(li);
		li = document.createElement("li");
		txt = document.createTextNode('4.3.0 - 05/09/2015 - Ajustado os icones e barras (pesquisar e categorias) da página Meus sites em dispositivos pequenos, ficando agora em duas linhas');
		li.appendChild(txt);
		ul.appendChild(li);
		li = document.createElement("li");
		txt = document.createTextNode('4.2.0 - 05/09/2015 - Ajuste no tamanho dos icones em Mover Sites; Opção recomendada já marcada na página Sair; Escrito Rapordo ao lado do logo no cabeçalho; Alterada a imagem "excluir.png" (geralmente colocada para as funcionalidades de exclusão)');
		li.appendChild(txt);
		ul.appendChild(li);
		li = document.createElement("li");
		txt = document.createTextNode('4.1.0 - 05/09/2015 - Adicionado a opção "Excluir site" no contextmenu (botão direito do mouse / tocar e segurar em telas "touch")');
		li.appendChild(txt);
		ul.appendChild(li);
		li = document.createElement("li");
		txt = document.createTextNode('4.0.4 - 01/09/2015 - Correção de incompatibilidade com iOS');
		li.appendChild(txt);
		ul.appendChild(li);
		li = document.createElement("li");
		txt = document.createTextNode('4.0.3 - 01/09/2015 - Ajuste nas URLs criptografadas (https) novamente; Alteração do tempo de espera na função mover');
		li.appendChild(txt);
		ul.appendChild(li);
		li = document.createElement("li");
		txt = document.createTextNode('4.0.2 - 01/09/2015 - Ajuste nas URLs criptografadas (https) novamente');
		li.appendChild(txt);
		ul.appendChild(li);
		li = document.createElement("li");
		txt = document.createTextNode('4.0.1 - 01/09/2015 - Ajuste nas URLs criptografadas (https)');
		li.appendChild(txt);
		ul.appendChild(li);
		li = document.createElement("li");
		txt = document.createTextNode('4.0.0 - 31/08/2015 - Criação da funcionalidade para mover os sites; Adicionado o prefixo "webkit" e "moz" nas propriedades "flex-box" para melhor compatibilidade com iOS; Ajustes pontuais nos textos do WebApp; Ajustes pontuais no posicionamento dos elementos; Ajuste na manipulação do histórico de navegação; Corrigido problema ao adicionar ou editar um site com "&" na URL');
		li.appendChild(txt);
		ul.appendChild(li);
		li = document.createElement("li");
		txt = document.createTextNode('3.1.2 - 22/08/2015 - Agora, após a edição do site, retorna para a página dos "Meus sites"; Posição dos botões "Exibir Mais" e "Exibir Menos" da página "Meus sites" alterada; Posição do rodapé ajustada');
		li.appendChild(txt);
		ul.appendChild(li);
		li = document.createElement("li");
		txt = document.createTextNode('3.1.1 - 22/08/2015 - Melhoria nos estilos das imagens da página inicial');
		li.appendChild(txt);
		ul.appendChild(li);
		li = document.createElement("li");
		txt = document.createTextNode('3.1.0 - 22/08/2015 - Alteração da versão do banco de dados local');
		li.appendChild(txt);
		ul.appendChild(li);
		li = document.createElement("li");
		txt = document.createTextNode('3.0.0 - 22/08/2015 - Criação da opção de editar site no contextmenu (botão direito do mouse / tocar e segurar em telas "touch"); Alteração da versão do banco de dados local; Alteração de alguns textos do WebApp');
		li.appendChild(txt);
		ul.appendChild(li);
		li = document.createElement("li");
		txt = document.createTextNode('2.0.1 - 22/08/2015 - Alterações nos estilos das imagens de fundo da página inicial; Alteração na mensagem de recuperação do Rapordo antigo; Alteração no tempo padrão dos "Alerta" (mensagens de alerta e avisos); Alteração no texto das opções da página Sair; Alteração no texto do menu principal; Alteração na cor dos links de todo o WebApp');
		li.appendChild(txt);
		ul.appendChild(li);
		li = document.createElement("li");
		txt = document.createTextNode('2.0.0 - 22/08/2015 - Criado a funcionalidade de excluir sites');
		li.appendChild(txt);
		ul.appendChild(li);
		li = document.createElement("li");
		txt = document.createTextNode('1.6.0 - 22/08/2015 - Alteração na lista de categorias da páginas Adicionar Sites, Editar Sites e Configurar Categorias para ficarem em ordem alfabética; Texto da FAQ 1 alterado');
		li.appendChild(txt);
		ul.appendChild(li);
		li = document.createElement("li");
		txt = document.createTextNode('1.5.0 - 22/08/2015 - Alteração na manipulação do histório devido ao iPad');
		li.appendChild(txt);
		ul.appendChild(li);
		li = document.createElement("li");
		txt = document.createTextNode('1.4.1 - 21/08/2015 - Correção do texto da tag de descrição do WebApp');
		li.appendChild(txt);
		ul.appendChild(li);
		li = document.createElement("li");
		txt = document.createTextNode('1.4.0 - 20/08/2015 - Correção da funcionalidade de conexão ao servidor em algumas redes');
		li.appendChild(txt);
		ul.appendChild(li);
		li = document.createElement("li");
		txt = document.createTextNode('1.3.0 - 19/08/2015 - Alteração das tags de cabeçalho; Alteração no texto da página inicial; Alteração da manipulação do histório; Minimização da aparição da página inicial (Pré-inicio) quando o usuário está logado; Retirado o aviso da renovação de Token;');
		li.appendChild(txt);
		ul.appendChild(li);
		li = document.createElement("li");
		txt = document.createTextNode('1.2.2 - 19/08/2015 - Alteração do endereço do WebService');
		li.appendChild(txt);
		ul.appendChild(li);
		li = document.createElement("li");
		txt = document.createTextNode('1.2.1 - 19/08/2015 - Alteração na estrutura e texto da página inicial; Descrições e palavras-chave adicionadas; Alteração do texto na página "Sobre"');
		li.appendChild(txt);
		ul.appendChild(li);
		li = document.createElement("li");
		txt = document.createTextNode('1.2.0 - 17/08/2015 - Alteração na conexão com banco de dados local; Alteração no tempo da tela Carregando para transações do banco de dados local; Alteração do endereço do WebService');
		li.appendChild(txt);
		ul.appendChild(li);
		li = document.createElement("li");
		txt = document.createTextNode('1.1.1 - 17/08/2015 - Otimização das imagens do WebApp');
		li.appendChild(txt);
		ul.appendChild(li);
		li = document.createElement("li");
		txt = document.createTextNode('1.1.0 - 17/08/2015 - Correção no módulo "Editar sites"');
		li.appendChild(txt);
		ul.appendChild(li);
		li = document.createElement("li");
		txt = document.createTextNode('1.0.0 - 16/08/2015 - Lançamento do novo Rapordo (WebApp)');
		li.appendChild(txt);
		ul.appendChild(li);
		// fim da lista
		section.appendChild(ul);
		div.appendChild(section);
		pagina.getMain().appendChild(div);
		return true;
	}
	
	this.getTitle = function() {
		return "Sobre";
	}
	
	this.construir();
}