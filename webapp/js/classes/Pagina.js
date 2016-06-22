function Pagina(paginaInicio, paginaMenuPrincipal) {
	var inicio = undefined;
	var menuPrincipal = undefined;
	var paginasDisponiveis = new Array(); // Usado para fazer o esquema de trocar de página quando desliza para o lado
	var paginaAnterior = undefined;
	var paginaAtual = undefined;
	var LSUsuario = "usuario";
	var ws = undefined;
	var zoom = undefined;
	var coordenadaDrogX = undefined; // Usado para fazer o esquema de trocar de página quando desliza para o lado
	var dblclick = undefined; // usado para guardar o id do setTimeout para simular o dblclick em dispositivos sem dblclick (como touch ou muito antigo)
	var scrollYCache = 0;
	var telaY = 0;
	var cabecalhoY = 0;
	var idTimeoutScroll = 0;
	this.historico = new Array();
	this.historicoTmnCache = 0;
	
	this.construtor = function(pI, pM) {
		if(this.getLSUsuario() == undefined) {
			this.setLSUsuario(new Usuario());
		} else {
			usuario.json(this.getLSUsuario());
		}
		this.setInicio(pI);
		this.setPaginaAnterior(this.getInicio());
		this.setPaginaAtual(this.getInicio());
		this.setZoom(window.localStorage.getItem("tela_zoom"));
	}
	
	this.historicoAdd = function(u) {
		this.historico.push(u);
	}
	
	this.historicoGet = function(i) {
		return this.historico[i];
	}
	
	this.confirm = function(txt, fOk) {
		if(typeof fOk == typeof Function) {
			if(confirm(txt)) {
				fOk();
			}
		}
	}
	
	this.zoomMenos = function() {
		if(this.setZoom((this.getZoom() - 5))) {
			return true;
		} else {
			return false;
		}
	}
	
	this.zoomMais = function() {
		if(this.setZoom((this.getZoom() + 5))) {
			return true;
		} else {
			return false;
		}
	}
	
	this.getInicio = function() {
		return inicio;
	}
	
	this.setInicio = function(i) {
		inicio = i;
		return true;
	}
	
	this.getPaginaAtual = function() {
		return paginaAtual;
	}
	
	this.getPaginaAnterior = function() {
		return paginaAnterior;
	}
	
	this.setPaginaAtual = function(pAtual) {
		paginaAtual = pAtual;
		return true;
	}
	
	this.setPaginaAnterior = function(pAnterior) {
		paginaAnterior = pAnterior;
		return true;
	}
	
	this.abrirPaginas = function(novaPagina, v1) {
		if(this.getPaginaAtual() == novaPagina && novaPagina == "menu_principal") {
			novaPagina = this.getPaginaAnterior();
		}
		
		if(usuario.getId() == "" || usuario.getId() == undefined) {
			if(novaPagina == "preInicio") {
				pag = new PagPreInicio();
			} else if(novaPagina == "inicio") {
				pag = new PagInicio();
			} else if(novaPagina == "menu_principal") {
				pag = new PagMenuPrincipal();
			} else if(novaPagina == "recuperarDados") {
				pag = new PagRecuperarDados();
			} else if(novaPagina == "termos") {
				pag = new PagTermos();
			} else if(novaPagina == "privacidade") {
				pag = new PagPrivacidade();
			} else if(novaPagina == "sobre") {
				pag = new PagSobre();
			} else if(novaPagina == "ajuda") {
				pag = new PagAjuda();
			} else if(novaPagina == "language") {
				pag = new PagLanguage();
			} else if(novaPagina == "download") {
				pag = new PagDownload();
			} else if(novaPagina == "notas_de_lancamento") {
				pag = new PagNotasLancamento();
			} else if(novaPagina == "cadeadoHttps") {
				pag = new PagCadeadoHttps();
			} else {
				console.log("!!! PAGINA NAO ESPERADA !!!");
				return false;
			}
		} else {
			if(novaPagina == "menu_principal") {
				pag = new PagMenuPrincipal();
			} else if(novaPagina == "sites") {
				pag = new PagSites();
			} else if(novaPagina == "sitesAdicionar") {
				pag = new PagSitesAdicionar();
			} else if(novaPagina == "sair") {
				pag = new PagSair();
			} else if(novaPagina == "termos") {
				pag = new PagTermos();
			} else if(novaPagina == "privacidade") {
				pag = new PagPrivacidade();
			} else if(novaPagina == "sobre") {
				pag = new PagSobre();
			} else if(novaPagina == "ajuda") {
				pag = new PagAjuda();
			} else if(novaPagina == "language") {
				pag = new PagLanguage();
			} else if(novaPagina == "download") {
				pag = new PagDownload();
			} else if(novaPagina == "notas_de_lancamento") {
				pag = new PagNotasLancamento();
			} else if(novaPagina == "cadeadoHttps") {
				pag = new PagCadeadoHttps();
			} else if(novaPagina == "configuracao") {
				pag = new PagConfiguracao();
			} else if(novaPagina == "sitesCategoria") {
				pag = new PagSitesCategoria();
			} else if(novaPagina == "sitesEditar") {
				pag = new PagSitesEditar();
			} else if(novaPagina == "sitesCategoriaEditar") {
				pag = new PagSitesCategoriaEditar(v1);
			} else if(novaPagina == "sitesEditarEdicao") {
				pag = new PagSitesEditarEdicao(v1);
			} else if(novaPagina == "sitesMover") {
				pag = new PagSitesMover();
			} else if(novaPagina == "sitesMoverMove") {
				pag = new PagSitesMoverMove(v1);
			} else {
				console.log("PAGINA NAO ESPERADA: " + novaPagina);
				return false;
			}
		}
		
		this.setPaginaAnterior(this.getPaginaAtual());
		this.setPaginaAtual(novaPagina);
		
		pagina.historicoAdd(novaPagina);
		
		window.setTimeout(function() {
			if(typeof window.history.replaceState == typeof Function) {
				window.history.replaceState({pag: novaPagina}, pag.getTitle(), "WebApp.html?pg=" + novaPagina);
			}
			pagina.scrollTo(document.getElementsByTagName("body")[0]);
		}, 200);
		return true;
	}
	
	this.abrirPaginasFrente = function() {
		var pTmn = this.getPaginasDisponiveisAll().length;
		var i = 0;
		for(; i < pTmn; i++) {
			if(this.getPaginasDisponiveis(i) == this.getPaginaAtual()) {
				break;
			}
		}
		i++;
		if(i < pTmn) {
			this.abrirPaginas(pagina.getPaginasDisponiveis(i));
		} else {
			this.abrirPaginas(pagina.getPaginasDisponiveis(0));
		}
	}
	
	this.abrirPaginasAtras = function() {
		var pTmn = this.getPaginasDisponiveisAll().length;
		var i = 0;
		for(; i < pTmn; i++) {
			if(this.getPaginasDisponiveis(i) == this.getPaginaAtual()) {
				break;
			}
		}
		i--;
		if(i < 0) {
			this.abrirPaginas(pagina.getPaginasDisponiveis(pTmn - 1));
		} else {
			this.abrirPaginas(pagina.getPaginasDisponiveis(i));
		}
	}
	
	this.alteraConfig = function(tipo) {
		if(tipo == "autenticado") {
			paginasDisponiveis = new Array("sites", "sitesAdicionar", "sitesCategoria");
			this.abrirPaginas("sites");
		} else if(tipo == "naoAutenticado") {
			paginasDisponiveis = new Array("preInicio", "inicio");
			this.abrirPaginas("preInicio");
		}
	}
	
	this.cabecalhoAbrir = function() {
		document.getElementById("cabecalho").style.display = "block";
		if(pagina.getIdTimeoutScroll() != 0) {
			clearTimeout(pagina.getIdTimeoutScroll());
		}
		pagina.setIdTimeoutScroll(window.setTimeout(function() {
			document.getElementById("cabecalho").style.top = "0px";
			clearTimeout(pagina.getIdTimeoutScroll());
			pagina.setIdTimeoutScroll(0);
		}, 100));
	}
	
	this.cabecalhoFechar = function() {
		document.getElementById("cabecalho").style.top = ((pagina.getCabecalhoY() + 4) * -1) + "px";
		if(pagina.getIdTimeoutScroll() != 0) {
			clearTimeout(pagina.getIdTimeoutScroll());
		}
		pagina.setIdTimeoutScroll(window.setTimeout(function() {
			document.getElementById("cabecalho").style.display = "none";
			clearTimeout(pagina.getIdTimeoutScroll());
			pagina.setIdTimeoutScroll(0);
		}, 750));
	}
	
	this.erroPadraoConexao = function() {
		console.log("Não foi possível completar a solicitação.\n\n" +
				"Verifique a sua conexão com a internet e tente novamente mais tarde.\n\n" +
				"Caso o erro persista, por favor avise o administrador do sistema por email (contato@rapordo.com)\n\n" +
				"Obrigado!");
	}
	
	this.getScrollYMax = function() {
		return (window.scrollMaxY || (document.documentElement.scrollHeight - document.documentElement.clientHeight));
	}
	
	this.getScrollY = function() {
		// var scrollY = 0;
		
		// scrollY = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);
		
		// if(scrollY == 0) {
			// if(document.getElementsByTagName("html")[0].scrollTop != 0 && document.getElementsByTagName("html")[0].scrollTop != undefined) {
				// scrollY = document.getElementsByTagName("html")[0].scrollTop;
			// } else if(document.getElementsByTagName("body")[0].scrollTop != 0 && document.getElementsByTagName("body")[0].scrollTop != undefined) {
				// scrollY = document.getElementsByTagName("body")[0].scrollTop;
			// } else if(document.getElementsByTagName("html")[0].scrollY != 0 && document.getElementsByTagName("html")[0].scrollY != undefined) {
				// scrollY = document.getElementsByTagName("html")[0].scrollY;
			// } else if(document.getElementsByTagName("body")[0].scrollY != 0 && document.getElementsByTagName("body")[0].scrollY != undefined) {
				// scrollY = document.getElementsByTagName("body")[0].scrollY;
			// }
		// }
		
		// scrollY = document.getElementById("tela").scrollTop;
		
		// return parseInt(scrollY);
		return parseInt((window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0));
	}
	
	this.scrollTo = function(ele) {
		ele.scrollIntoView(true);
	}
	
	this.usuarioSair = function() {
		usuario = new Usuario();
		pagina.setLSUsuario(usuario);
		pagina.alteraConfig("naoAutenticado");
	}
	
	this.getWs = function() {
		return ws;
	}
	
	this.setWs = function(w) {
		// FIXME
		// verificar se é uma URL valida
		console.log("Servidor escolhido: " + w);
		ws = w;
		return true;
	}
	
	this.wsAlterar = function() {
		if(window.location.href.indexOf("nightly.rapordo.com") >= 0 || window.location.href.indexOf("/webapp_nightly/") >= 0) {
			this.setWs("http://nightly.rapordo.com/ws/");
		} else {
			// this.setWs("https://test-rprd4.rhcloud.com/ws/");
			// this.setWs("https://web13.sslblindado.com/bgl678/ws/");
			this.setWs("http://rapordo.com/ws/");
			
			// var httpReq = new HttpReq("post", pagina.getWs() + "health/all", function(res) {
				// res = JSON.parse(res);
				// var resSws = new Array();
				// var resWs = new Array();
				// for(var i = 0; i < res.length; i++) {
					// if(res[i][0] == "sws" && res[i][2] == "1") {
						// resSws[resSws.length] = res[i][1];
					// } else if(res[i][0] == "ws" && res[i][2] == "1") {
						// resWs[resWs.length] = res[i][1];
					// }
				// }
				// if(resSws.length > 0) {
					// pagina.setWs("https://" + resSws[pagina.getRandomInt(0, resSws.length)] + "/ws/");
				// } else if(resWs.length > 0) {
					// pagina.setWs("http://" + resWs[pagina.getRandomInt(0, resWs.length)] + "/ws/");
				// } else {
					// pagina.setWs("http://rapordo.com/ws/");
				// }
			// }, function(res) {
				// pagina.erroPadraoConexao();
			// });
			// httpReq.enviar("", false, false);
		}
	}
	
	this.getRandomInt = function(min, max) {
		// Inclui o min e exclui o max
		return Math.floor(Math.random() * ((max) - min)) + min;
	}
	
	this.setLSUsuario = function(usuario) {
		window.localStorage.setItem(LSUsuario, usuario.jsonString());
		return true;
	}
	
	this.getLSUsuario = function() {
		return window.localStorage.getItem(LSUsuario);
	}
	
	this.getZoom = function() {
		return zoom;
	}
	
	this.setZoom = function(z) {
		if(z != undefined && z != "") {
			if(regex(8, 1).test(z.toString())) {
				zoom = parseInt(z, 10);
				if(zoom < 40) {
					zoom = 40;
				} else if(zoom > 260) {
					zoom = 260;
				}
				document.getElementById("tela").style.fontSize = (this.getZoom() / 100) + "em";
				window.localStorage.setItem("tela_zoom", this.getZoom());
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	
	this.setCoordenadaDrogX = function(cdx) {
		coordenadaDrogX = cdx;
		return true;
	}
	
	this.getCoordenadaDrogX = function() {
		return coordenadaDrogX;
	}
	
	this.getPaginasDisponiveis = function(i) {
		return paginasDisponiveis[i];
	}
	
	this.getPaginasDisponiveisAll = function() {
		return paginasDisponiveis;
	}
	
	this.getDblclick = function() {
		return dblclick;
	}
	
	this.setDblclick = function(dblc) {
		dblclick = dblc;
		return true;
	}
	
	this.getMain = function() {
		return document.getElementById("pagina");
	}
	
	this.getScrollYCache = function() {
		return scrollYCache;
	}
	
	this.setScrollYCache = function(s) {
		scrollYCache = parseInt(s);
		return true;
	}
	
	this.getCabecalhoY = function() {
		return cabecalhoY;
	}
	
	this.setCabecalhoY = function(c) {
		cabecalhoY = parseInt(c);
		return true;
	}
	
	this.getTelaY = function() {
		return telaY;
	}
	
	this.setTelaY = function(t) {
		telaY = parseInt(t);
		return true;
	}
	
	this.getIdTimeoutScroll = function() {
		return idTimeoutScroll;
	}
	
	this.setIdTimeoutScroll = function(i) {
		idTimeoutScroll = parseInt(i);
		return true;
	}
	
	this.construtor(paginaInicio, paginaMenuPrincipal);
}