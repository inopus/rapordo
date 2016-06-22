function PagSites() {
	// O esquema dessa classe é que se o usuario_id_vw ou os valores passados por parametro do usuario_id forem undefined, o banco_Site vai utilizar o id do usuário que está logado.
	var categoria = undefined;
	var categoria_value = undefined; // eu preciso ter isso separado, pois dependendo do valor selecionado eu não tenho que mudar isso e preciso fazer o valor selecionado voltar para esse valor (como o que acontece quando selecionam "Configurar categorias..."). Esse funciona como se fosse um cache.
	var sites_lista = undefined;
	var sites_btnSincronizar = undefined;
	var usuario_id_vw = undefined; // será utilizada para eu guardar o o usuario_id do dono da página quando não for o cara que estiver logado
	var sites_btnPesquisar = undefined;
	var sites_pesquisa = undefined;
	var idInterval_busca = undefined;
	var sitesLimVw = undefined;
	var contextMenuSite_id = 0;
	
	this.construir = function() {
		this.montaPagHtml();
		
		this.setCategoria_value(this.getCategoria().value);
		
		this.getCategoria().addEventListener("change", function(event) {
			if(event.target.value == "-1") {
				event.target.value = pag.getCategoria_value();
				pagina.abrirPaginas("sitesCategoria");
			} else if(event.target.value == "-2") {
				pag.setCategoria_value(event.target.value);
				pag.listar(pag.getCategoria_value(), pag.getUsuario_id_vw(), undefined, 1);
				
				event.target.value = pag.getCategoria_value(); // tem que ter isso se não o select nao muda
			} else {
				pag.setCategoria_value(event.target.value);
				pag.listar(pag.getCategoria_value(), pag.getUsuario_id_vw());
				
				event.target.value = pag.getCategoria_value(); // tem que ter isso se não o select nao muda
			}
			this.blur();
		});
		
		this.getSites_btnSincronizar().addEventListener("click", function() {
			var banco_Site = new Banco_Site();
			banco_Site.sinc(pag.getUsuario_id_vw(), function(siteLista) {
				if(siteLista.length > 0) {
					pag.listarSites(siteLista);
					pag.getCategoria().value = 0;
					pag.setCategoria_value(0);
				} else {
					pag.nenhumSite();
					pag.sitesLimVwBtnMaisHide();
				}
			}, function() {
				alerta.abrirAtencao("Não foi possível buscar os seus sites. Tente novamente mais tarde.");
				console.log("Não foi possível buscar os seus sites. Tente novamente mais tarde.");
			});
			var banco_Categoria = new Banco_Categoria();
			banco_Categoria.sinc(pag.getUsuario_id_vw(), function(categoriaLista) {
				pag.listarCategorias(categoriaLista);
			}, function() {
				alerta.abrirAtencao("Não foi possível buscar as suas categorias. Tente novamente mais tarde.");
				console.log("Erro ao buscar categoria");
			});
		});
		
		this.getSites_btnPesquisar().addEventListener("click", function() {
			pag.getCategoria().value = 0;
			pag.setCategoria_value(0);
			if(this.getAttribute("alt") == "Pesquisar") {
				pag.pesquisaAbrir();
				pag.listar(pag.getCategoria_value(), pag.getUsuario_id_vw());
			} else {
				pag.pesquisaFechar();
				pag.listar(pag.getCategoria_value(), pag.getUsuario_id_vw());
			}
		});
		
		this.getSites_pesquisa().addEventListener("keyup", function(event) {
			if(event.key == "Enter" || event.keyCode == 13) {
				this.blur();
			}
			if(pag.getIdInterval_busca()) {
				window.clearTimeout(pag.getIdInterval_busca());
			}
			pag.setIdInterval_busca(window.setTimeout(function() {
				pag.listar(pag.getCategoria_value(), pag.getUsuario_id_vw(), pag.buscaRegex(event.target.value));
				pag.setIdInterval_busca(undefined);
			}, 400));
		});
		
		this.sitesLimVwBtnMenosHide();
		this.sitesLimVwBtnMaisHide();
		
		document.getElementById("sites_lista_LimVwBtnMais").addEventListener("click", function() {
			pag.setSitesLimVw(pag.getSitesLimVw() + 60);
			pag.listar(pag.getCategoria_value(), pag.getUsuario_id_vw(), pag.buscaRegex(pag.getSites_pesquisa().value));
		});
		
		document.getElementById("sites_lista_LimVwBtnMenos").addEventListener("click", function() {
			pag.setSitesLimVw(pag.getSitesLimVw() - 60);
			pag.listar(pag.getCategoria_value(), pag.getUsuario_id_vw(), pag.buscaRegex(pag.getSites_pesquisa().value));
			
		});
		
		this.abrir();
	}
	
	this.abrir = function(usuario_id) {
		this.nenhumSite();
		// TODO
		// para ficar mais fácil, eu decidi criar o botão que o usuário escolhe quando
		// quer atualizar os sites dele, mas seria bom se o rapordo conseguisse fazer 
		// isso automatico ou pelo menos nao pegasse tudo e sim só os que o usuário não tem (mas ai
		// tem aqueles que foram atualizados, ai sei la...). Ai tem que fazer aqui.
		
		// TODO
		// Essa função pode ser útil para quando eu estiver abrindo uma página que
		// não seja a minha. Porque ai eu posso passar o usuario_id do cara que eu to abrindo a página.
		// se for undefined é o usuário que está logado.
		
		if(regex(8, 1).test(usuario_id)) {
			this.setUsuario_id_vw(usuario_id);
		} else {
			this.setUsuario_id_vw(undefined);
		}
		this.setSitesLimVw(60);
		this.pesquisaFechar();
		
		this.listar(this.getCategoria_value(), this.getUsuario_id_vw());
		
		return true;
	}
	
	this.addItem = function(site) {
		this.getSites_lista().appendChild(this.montaHtmlSite(site));
	}
	
	this.buscaRegex = function(txt) {
		if(!txt || txt == "") {
			return "";
		} else {
			// busca = new RegExp('.*' + txt + '.*', 'i');
			// return busca;
			return new RegExp('.*' + txt + '.*', 'i');
		}
	}
	
	this.contextMenuEditar = function() {
		pagina.abrirPaginas("sitesEditarEdicao", this.getContextMenuSite_id());
	}
	
	this.contextMenuExcluir = function() {
		pagina.confirm("Tem certeza que deseja excluir esse site?", function() {
			var banco_Site = new Banco_Site();
			banco_Site.get(pag.getContextMenuSite_id(), function(site) {
				var hr = new HttpReq("post", pagina.getWs() + "site/excluir", function(res) {
					if(res == "1") {
						banco_Site.del(site, function(site) {
							if(site) {
								alerta.abrirSucesso("Site excluído com sucesso.");
								pagina.abrirPaginas("sites");
							} else {
								alerta.abrirErro("Erro ao tentar excluir esse site no banco de dados local.");
							}
						});
					} else {
						alerta.abrirErro("Erro ao tentar excluir esse site no servidor.");
					}
				});
				hr.enviar("site_id=" + site.getId(), true, true);
			});
		});
	}
	
	this.contextMenuMover = function() {
		pagina.abrirPaginas("sitesMoverMove", this.getContextMenuSite_id());
	}
	
	this.listar = function(categoria_id, usuario_id, busca, ordem) {
		if(!categoria_id || regex(8, 1).test(categoria_id) || categoria_id == -2) {
			if((categoria_id != -2 || !categoria_id) && !regex(8, 1).test(categoria_id)) {
				this.getCategoria().value = 0;
				this.setCategoria_value(0);
				categoria_id = 0;
			}
			var banco_Site = new Banco_Site();
			banco_Site.getAll(usuario_id, function(lista) {
				var listaTmn = lista.length;
				if(listaTmn > 0) {
					if(busca && busca != "") {
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
						listaTmn = lista.length;
					}
					if(categoria_id != 0 && categoria_id != -2) {
						var novaLista = new Array();
						for(var i = 0; i < listaTmn; i++) {
							if(lista[i].getCategoria_id() == categoria_id) {
								novaLista.push(lista[i]);
							}
						}
						lista = novaLista;
						listaTmn = lista.length;
					}
					pag.listarSites(lista, ordem);
				}
			});
		}
		var banco_Categoria = new Banco_Categoria();
		banco_Categoria.getAll(usuario_id, function(lista) {
			pag.listarCategorias(lista);
		});
	}
	
	this.listarCategorias = function(lista) {
		this.getCategoria().empty();
		var item = new Categoria();
		item.setId(0);
		item.setNome("Todos os meus sites");
		var html = this.montaHtmlCategoriaOption(item);
		html.setAttribute("style", "font-style: italic;");
		this.getCategoria().appendChild(html);
		item = new Categoria();
		item.setId(-2);
		item.setNome("Meus sites mais acessados");
		html = this.montaHtmlCategoriaOption(item);
		html.setAttribute("style", "font-style: italic;");
		this.getCategoria().appendChild(html);
		var listaTmn = lista.length;
		if(listaTmn > 0) {
			lista.sort(function(a, b) {
				return a.getNome().toLowerCase().localeCompare(b.getNome().toLowerCase());
			});
			item = new Categoria();
			for(var i = 0; i < listaTmn; i++) {
				this.getCategoria().appendChild(this.montaHtmlCategoriaOption(lista[i]));
			}
		}
		item = new Categoria();
		item.setId(-1);
		item.setNome("Configurar categorias...");
		html = this.montaHtmlCategoriaOption(item);
		html.setAttribute("style", "font-weight: bold; padding-left: 1em; font-style: italic;");
		this.getCategoria().appendChild(html);
		this.getCategoria().value = this.getCategoria_value();
		return true;
	}
	
	this.listarSites = function(lista, ordem) {
		var listaTmn = lista.length;
		if(listaTmn > 0) {
			ordem = parseInt(ordem);
			if(ordem == 1) {
				lista.sort(function(a, b) {
					return (b.getAcessos() - a.getAcessos());
				});
			} else {
				lista.sort(function(a, b) {
					return (a.getPosicao() - b.getPosicao());
				});
			}
			if(listaTmn > pag.getSitesLimVw()) {
				pag.sitesLimVwBtnMaisShow();
			} else {
				pag.sitesLimVwBtnMaisHide();
				pag.setSitesLimVw(listaTmn);
			}
			pag.limparLista();
			if(ordem == 1) {
				pag.sitesLimVwBtnMaisHide();
				pag.sitesLimVwBtnMenosHide();
				for(var i = 0; i < listaTmn && i < pag.getSitesLimVw(); i++) {
					if(lista[i].getAcessos() >= 1) {
						pag.addItem(lista[i]);
					}
				}
			} else {
				for(var i = 0; i < listaTmn && i < pag.getSitesLimVw(); i++) {
					pag.addItem(lista[i]);
				}
			}
		} else {
			var novoP = document.createElement("p");
			novoP.setAttribute("style", "text-align: center; font-weight: bold; display: block; width: 100%;");
			var novoTxt = document.createTextNode("(Nenhum site encontrado)");
			novoP.appendChild(novoTxt);
			this.limparLista();
			this.getSites_lista().appendChild(novoP);
		}
	}
	
	this.montaHtmlCategoriaOption = function(item) {
		var option = document.createElement("option");
		option.setAttribute("value", item.getId());
		var txt = document.createTextNode(item.getNome());
		option.appendChild(txt);
		return option;
	}
	
	this.montaHtmlSite = function(item) {
		var a = document.createElement("a");
		a.setAttribute("href", item.getUrl());
		if(item.getDescricao() == null || item.getDescricao() == undefined) {
			item.setDescricao("");
		}
		a.setAttribute("title", item.getNome() + ((item.getDescricao() != "") ? (" - " + item.getDescricao()) : ""));
		a.setAttribute("target", "_blank");
		a.addEventListener("mousedown", function(event) {
			if(event.which == 2 && !window.chrome) {
				pag.registraAcesso(item.getId(), usuario.getId(), item.getUrl(), item.getPosicao());
			}
		});
		a.addEventListener("click", function() {
			pag.registraAcesso(item.getId(), usuario.getId(), item.getUrl(), item.getPosicao());
		});
		a.setAttribute("contextmenu", "sites_contextMenu");
		a.addEventListener("contextmenu", function() {
			pag.setContextMenuSite_id(item.getId());
		});
		a.addEventListener("dragstart", function() {
			pagina.abrirPaginas("sitesMoverMove", item.getId());
		});
		var fig = document.createElement("figure");
		var img = document.createElement("img");
		img.setAttribute("src", item.getImagem());
		img.setAttribute("alt", item.getNome());
		var figcap = document.createElement("figcaption");
		var div = document.createElement("div");
		var nome = document.createTextNode(item.getNome());
		div.appendChild(nome);
		figcap.appendChild(div);
		fig.appendChild(img);
		fig.appendChild(figcap);
		a.appendChild(fig);
		return a;
	}
	
	this.nenhumSite = function() {
		this.limparLista();
		this.getSites_lista().appendChild(this.nenhumSiteMsg());
	}
	
	this.nenhumSiteMsg = function() {
		var novoP = document.createElement("p");
		var novoTxt = document.createTextNode("Clique no botão ");
		novoP.appendChild(novoTxt);
		var novoImg = document.createElement("img");
		novoImg.setAttribute("src", "im/add.png");
		novoImg.setAttribute("alt", "Adicionar um novo site");
		novoImg.setAttribute("title", "Adicionar um novo site");
		novoImg.setAttribute("style", "width: 1.8em; border: 0; vertical-align: middle;");
		novoP.appendChild(novoImg);
		novoTxt = document.createTextNode(" (Adicionar um novo site) para adicionar o seu primeiro site ou clique em ");
		novoP.appendChild(novoTxt);
		novoImg = document.createElement("img");
		novoImg.setAttribute("src", "im/cloudDownload.png");
		novoImg.setAttribute("alt", "Baixar do servidor");
		novoImg.setAttribute("title", "Baixar do servidor");
		novoImg.setAttribute("style", "width: 1.8em; border: 0; vertical-align: middle;");
		novoP.appendChild(novoImg);
		novoTxt = document.createTextNode(" (Baixar do servidor) para baixar suas categorias e seus sites armazenados no Rapordo.");
		novoP.appendChild(novoTxt);
		return novoP;
	}
	
	this.registraAcesso = function(site_id, usuario_id_logado, url, posicao) {
		var hr = new HttpReq("post", pagina.getWs() + "site/registraAcesso", function(res) { }, function() { });
		hr.enviar("site_id=" + site_id + "&usuario_id_logado=" + usuario_id_logado + "&url=" + url + "&posicao=" + posicao, true, false, 20000);
		var banco_Site = new Banco_Site();
		banco_Site.registraAcesso(site_id);
	}
	
	this.pesquisaAbrir = function() {
		this.getSites_btnPesquisar().setAttribute("src", "im/searchX.png");
		this.getSites_btnPesquisar().setAttribute("alt", "Fechar pesquisa");
		this.getSites_btnPesquisar().setAttribute("title", "Fechar pesquisa");
		this.getCategoria().style.display = "none";
		this.getSites_pesquisa().style.display = "block";
		this.getSites_pesquisa().focus();
	}
	
	this.pesquisaFechar = function() {
		this.getSites_btnPesquisar().setAttribute("src", "im/search.png");
		this.getSites_btnPesquisar().setAttribute("alt", "Pesquisar");
		this.getSites_btnPesquisar().setAttribute("title", "Pesquisar");
		this.getCategoria().style.display = "block";
		this.getSites_pesquisa().style.display = "none";
		this.getSites_pesquisa().blur();
		this.getSites_pesquisa().value = "";
	}
	
	this.sitesLimVwBtnMaisHide = function() {
		document.getElementById("sites_lista_LimVwBtnMais").style.visibility = "hidden";
		if(document.getElementById("sites_lista_LimVwBtnMenos").style.visibility == "hidden") {
			document.getElementById("sites_lista_LimVw").style.display = "none";
		}
	}
	
	this.sitesLimVwBtnMaisShow = function() {
		document.getElementById("sites_lista_LimVw").style.display = "flex";
		if(document.getElementById("sites_lista_LimVw").style.display != "flex") {
			document.getElementById("sites_lista_LimVw").style.display = "-webkit-flex";
			if(document.getElementById("sites_lista_LimVw").style.display != "-webkit-flex") {
				document.getElementById("sites_lista_LimVw").style.display = "-moz-flex";
				if(document.getElementById("sites_lista_LimVw").style.display != "-moz-flex") {
					document.getElementById("sites_lista_LimVw").style.display = "block";
				}
			}
		}
		document.getElementById("sites_lista_LimVwBtnMais").style.visibility = "visible";
	}
	
	this.sitesLimVwBtnMenosHide = function() {
		document.getElementById("sites_lista_LimVwBtnMenos").style.visibility = "hidden";
		if(document.getElementById("sites_lista_LimVwBtnMais").style.visibility == "hidden") {
			document.getElementById("sites_lista_LimVw").style.display = "none";
		}
	}
	
	this.sitesLimVwBtnMenosShow = function() {
		document.getElementById("sites_lista_LimVw").style.display = "flex";
		if(document.getElementById("sites_lista_LimVw").style.display != "flex") {
			document.getElementById("sites_lista_LimVw").style.display = "-webkit-flex";
			if(document.getElementById("sites_lista_LimVw").style.display != "-webkit-flex") {
				document.getElementById("sites_lista_LimVw").style.display = "-moz-flex";
				if(document.getElementById("sites_lista_LimVw").style.display != "-moz-flex") {
					document.getElementById("sites_lista_LimVw").style.display = "block";
				}
			}
		}
		document.getElementById("sites_lista_LimVwBtnMenos").style.visibility = "visible";
	}
	
	this.limparLista = function() {
		this.getSites_lista().empty();
	}
	
	this.setCategoria_value = function(cv) {
		if(cv == undefined || cv == "") {
			cv = 0;
		}
		categoria_value = parseInt(cv);
		return true;
	}
	
	this.getCategoria_value = function() {
		return categoria_value;
	}
	
	this.getSites_lista = function() {
		return sites_lista;
	}
	
	this.getCategoria = function() {
		return categoria;
	}
	
	this.getSites_btnSincronizar = function() {
		return sites_btnSincronizar;
	}
	
	this.setUsuario_id_vw = function(uiv) {
		usuario_id_vw = uiv;
		return true;
	}
	
	this.getUsuario_id_vw = function() {
		return usuario_id_vw;
	}
	
	this.getSites_btnPesquisar = function() {
		return sites_btnPesquisar;
	}
	
	this.getSites_pesquisa = function() {
		return sites_pesquisa;
	}
	
	this.getIdInterval_busca = function() {
		return idInterval_busca;
	}
	
	this.setIdInterval_busca = function(id) {
		idInterval_busca = id;
		return true;
	}
	
	this.getSitesLimVw = function() {
		return sitesLimVw;
	}
	
	this.getContextMenuSite_id = function() {
		return contextMenuSite_id;
	}
	
	this.setContextMenuSite_id = function(i) {
		contextMenuSite_id = parseInt(i);
		return true;
	}
	
	this.setSitesLimVw = function(slv) {
		if(slv <= 60) {
			slv = 60;
			this.sitesLimVwBtnMenosHide();
		} else {
			this.sitesLimVwBtnMenosShow();
		}
		sitesLimVw = parseInt(slv);
		return true;
	}
	
	this.montaPagHtml = function() {
		pagina.getMain().empty();
		var div = document.createElement("div");
		div.setAttribute("class", "limitaLargura fundo");
		var form = document.createElement("form");
		form.setAttribute("onsubmit", "return false");
		form.setAttribute("class", "formulario fundo");
		form.setAttribute("method", "post");
		form.setAttribute("spellcheck", false);
		form.setAttribute("novalidate", true);
		form.setAttribute("id", "sites_opcoes");
		var div1 = document.createElement("div");
		div1.setAttribute("id", "sites_opcoesSite");
		var img = document.createElement("img");
		img.setAttribute("src", "im/cloudDownload.png");
		img.setAttribute("alt", "Baixar do servidor");
		img.setAttribute("id", "sites_btnSincronizar");
		img.setAttribute("class", "sites_opcoesIcone");
		img.setAttribute("title", "Baixar do servidor");
		sites_btnSincronizar = img;
		div1.appendChild(img);
		img = document.createElement("img");
		img.setAttribute("src", "im/add.png");
		img.setAttribute("alt", "Adicionar um novo site");
		img.setAttribute("id", "sites_btnAdicionar");
		img.setAttribute("class", "sites_opcoesIcone");
		img.setAttribute("title", "Adicionar um novo site");
		img.addEventListener("click", function() {
			pagina.abrirPaginas("sitesAdicionar");
		});
		div1.appendChild(img);
		img = document.createElement("img");
		img.setAttribute("src", "im/edit.png");
		img.setAttribute("alt", "Editar um site");
		img.setAttribute("id", "sites_btnEditar");
		img.setAttribute("class", "sites_opcoesIcone");
		img.setAttribute("title", "Editar um site");
		img.addEventListener("click", function() {
			pagina.abrirPaginas("sitesEditar");
		});
		div1.appendChild(img);
		img = document.createElement("img");
		img.setAttribute("src", "im/move.png");
		img.setAttribute("alt", "Mover os sites");
		img.setAttribute("id", "sites_btnMove");
		img.setAttribute("class", "sites_opcoesIcone");
		img.setAttribute("title", "Mover os sites");
		img.addEventListener("click", function() {
			pagina.abrirPaginas("sitesMover");
		});
		div1.appendChild(img);
		form.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("id", "sites_opcoesPesquisa");
		img = document.createElement("img");
		img.setAttribute("style", "margin-right: 0.8em; -webkit-flex-shrink: 0; -moz-flex-shrink: 0; flex-shrink: 0; -webkit-flex-grow: 0; -moz-flex-grow: 0; flex-grow: 0;");
		img.setAttribute("src", "im/search.png");
		img.setAttribute("alt", "Pesquisar");
		img.setAttribute("id", "sites_btnPesquisar");
		img.setAttribute("class", "sites_opcoesIcone");
		img.setAttribute("title", "Pesquisar");
		sites_btnPesquisar = img;
		div1.appendChild(img);
		var select = document.createElement("select");
		select.setAttribute("id", "sites_categoria");
		select.setAttribute("class", "select");
		select.setAttribute("title", "Categoria");
		select.setAttribute("style", "margin-bottom: 0.8em; font-size: 0.82em;");
		categoria = select;
		div1.appendChild(select);
		var input = document.createElement("input");
		input.setAttribute("style", "margin-bottom: 0.8em; font-size: 0.85em;");
		input.setAttribute("type", "text");
		input.setAttribute("id", "sites_pesquisa");
		input.setAttribute("class", "inputTxt");
		input.setAttribute("title", "Pesquisar");
		input.setAttribute("placeholder", "Pesquisar...");
		sites_pesquisa = input;
		div1.appendChild(input);
		form.appendChild(div1);
		div.appendChild(form);
		var section = document.createElement("section");
		section.setAttribute("id", "sites_lista");
		section.setAttribute("class", "sitesLista");
		sites_lista = section;
		div.appendChild(section);
		section = document.createElement("section");
		section.setAttribute("id", "sites_lista_LimVw");
		section.setAttribute("style", "display: -webkit-flex; display: -moz-flex; display: flex; -webkit-justify-content: space-between; -moz-justify-content: space-between; justify-content: space-between; -webkit-align-items: center; -moz-align-items: center; align-items: center; margin-top: 0.4em;");
		var button = document.createElement("button");
		button.setAttribute("id", "sites_lista_LimVwBtnMenos");
		button.setAttribute("class", "btn");
		var txt = document.createTextNode("Exibir Menos");
		button.appendChild(txt);
		section.appendChild(button);
		button = document.createElement("button");
		button.setAttribute("id", "sites_lista_LimVwBtnMais");
		button.setAttribute("class", "btn");
		txt = document.createTextNode("Exibir Mais");
		button.appendChild(txt);
		section.appendChild(button);
		div.appendChild(section);
		var menu = document.createElement("menu");
		menu.setAttribute("type", "context"); // Só está especificado na whatwg (como padrao). No rascunho inicial da w3c não tem essa propriedade.
		menu.setAttribute("id", "sites_contextMenu");
		var menuItem = document.createElement("menuitem");
		menuItem.setAttribute("label", " Editar esse Site");
		menuItem.setAttribute("icon", "im/edit.png");
		menuItem.addEventListener("click", function() {
			pag.contextMenuEditar();
		});
		menu.appendChild(menuItem);
		menuItem = document.createElement("menuitem");
		menuItem.setAttribute("label", " Mover esse Site");
		menuItem.setAttribute("icon", "im/move.png");
		menuItem.addEventListener("click", function() {
			pag.contextMenuMover();
		});
		menu.appendChild(menuItem);
		menuItem = document.createElement("menuitem");
		menuItem.setAttribute("label", " Excluir esse Site");
		menuItem.setAttribute("icon", "im/excluir.png");
		menuItem.addEventListener("click", function() {
			pag.contextMenuExcluir();
		});
		menu.appendChild(menuItem);
		div.appendChild(menu);
		pagina.getMain().appendChild(div);
	}
	
	this.getTitle = function() {
		return "Sites";
	}
	
	this.construir();
}