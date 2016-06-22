function PagSitesMoverMove(s_i) {
	var site = undefined;
	var ele_sitesLista = undefined;
	var sitesLimVw = 60;
	
	this.construtor = function(s_i) {
		this.montaPagHtml();
		this.setEle_sitesLista(document.getElementsByClassName("sitesLista")[0]);
		var banco_Site = new Banco_Site();
		if(!banco_Site.get(s_i, function(s) {
			if(s) {
				pag.setSite(s);
				pag.abrir();
			} else {
				pagina.abrirPaginas("sitesMover");
				alerta.abrirErro("O Site escolhido não existe.");
			}
		})) {
			alerta.abrirErro("Identificação do Site inválida.");
			pagina.abrirPaginas("sitesMover");
		}
		this.sitesLimVwBtnMenosHide();
	}
	
	this.abrir = function() {
		var banco_Site = new Banco_Site();
		banco_Site.getAll(undefined, function(l_s) {
			l_s.sort(function(a, b) {
				return (a.getPosicao() - b.getPosicao());
			});
			var l_sTmn = l_s.length;
			document.getElementById("sitesMoverMove_siteNome").innerHTML = pag.getSite().getNome();
			if(l_sTmn >= 1) {
				if(l_sTmn > pag.getSitesLimVw()) {
					pag.sitesLimVwBtnMaisShow();
				} else {
					pag.sitesLimVwBtnMaisHide();
					pag.setSitesLimVw(l_sTmn);
				}
				pag.getEle_sitesLista().empty();
				for(var i = 0; i < pag.getSitesLimVw(); i++) {
					pag.getEle_sitesLista().appendChild(pag.montaItemHtml(l_s[i], i));
				}
			} else {
				pagina.abrirPaginas("sites");
				alerta.abrirAtencao("Você não possuí nenhum site para mover.");
			}
		});
	}
	
	this.montaItemHtml = function(item, p) {
		var a = document.createElement("a");
		a.addEventListener("click", function() {
			pag.mover(p);
		});
		var fig = document.createElement("figure");
		var img = document.createElement("img");
		img.setAttribute("src", item.getImagem());
		img.setAttribute("alt", item.getNome());
		fig.appendChild(img);
		var figcap = document.createElement("figcaption");
		var div = document.createElement("div");
		var nome = document.createTextNode(item.getNome());
		div.appendChild(nome);
		figcap.appendChild(div);
		fig.appendChild(figcap);
		a.appendChild(fig);
		return a;
	}
	
	this.mover = function(p) {
		p = parseInt(p) + 1;
		console.log("tem que ir para posição " + p);
		var hr = new HttpReq("post", pagina.getWs() + "site/mover", function(res) {
			if(res == "1") {
				var banco_Site = new Banco_Site();
				banco_Site.sinc(undefined, function(lista) {
					pagina.abrirPaginas("sites");
					alerta.abrirSucesso("Site movido com sucesso.");
				});
			} else {
				alerta.abrirErro("Erro ao mover o site selecionado.");
				pagina.abrirPaginas("sites");
			}
		});
		hr.enviar("site_id=" + this.getSite().getId() + "&posicao=" + p, true, true, 30000);
	}
	
	this.getSite = function() {
		return site;
	}
	
	this.setSite = function(s) {
		site = s;
		return true;
	}
	
	this.getEle_sitesLista = function() {
		return ele_sitesLista;
	}
	
	this.setEle_sitesLista = function(e) {
		ele_sitesLista = e;
		return true;
	}
	
	this.getSitesLimVw = function() {
		return sitesLimVw;
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
	
	this.sitesLimVwBtnMaisHide = function() {
		document.getElementById("sitesMoverMove_lista_LimVwBtnMais").style.visibility = "hidden";
		if(document.getElementById("sitesMoverMove_lista_LimVwBtnMenos").style.visibility == "hidden") {
			document.getElementById("sitesMoverMove_lista_LimVw").style.display = "none";
		}
	}
	
	this.sitesLimVwBtnMaisShow = function() {
		document.getElementById("sitesMoverMove_lista_LimVw").style.display = "flex";
		if(document.getElementById("sitesMoverMove_lista_LimVw").style.display != "flex") {
			document.getElementById("sitesMoverMove_lista_LimVw").style.display = "-webkit-flex";
			if(document.getElementById("sitesMoverMove_lista_LimVw").style.display != "-webkit-flex") {
				document.getElementById("sitesMoverMove_lista_LimVw").style.display = "-moz-flex";
				if(document.getElementById("sitesMoverMove_lista_LimVw").style.display != "-moz-flex") {
					document.getElementById("sitesMoverMove_lista_LimVw").style.display = "block";
				}
			}
		}
		document.getElementById("sitesMoverMove_lista_LimVwBtnMais").style.visibility = "visible";
	}
	
	this.sitesLimVwBtnMenosHide = function() {
		document.getElementById("sitesMoverMove_lista_LimVwBtnMenos").style.visibility = "hidden";
		if(document.getElementById("sitesMoverMove_lista_LimVwBtnMais").style.visibility == "hidden") {
			document.getElementById("sitesMoverMove_lista_LimVw").style.display = "none";
		}
	}
	
	this.sitesLimVwBtnMenosShow = function() {
		document.getElementById("sitesMoverMove_lista_LimVw").style.display = "flex";
		if(document.getElementById("sitesMoverMove_lista_LimVw").style.display != "flex") {
			document.getElementById("sitesMoverMove_lista_LimVw").style.display = "-webkit-flex";
			if(document.getElementById("sitesMoverMove_lista_LimVw").style.display != "-webkit-flex") {
				document.getElementById("sitesMoverMove_lista_LimVw").style.display = "-moz-flex";
				if(document.getElementById("sitesMoverMove_lista_LimVw").style.display != "-moz-flex") {
					document.getElementById("sitesMoverMove_lista_LimVw").style.display = "block";
				}
			}
		}
		document.getElementById("sitesMoverMove_lista_LimVwBtnMenos").style.visibility = "visible";
	}
	
	this.montaPagHtml = function() {
		pagina.getMain().empty();
		var div = document.createElement("div");
		div.setAttribute("class", "limitaLargura fundo");
		var h1 = document.createElement("h1");
		var txt = document.createTextNode('Selecione uma posição para ');
		h1.appendChild(txt);
		var span = document.createElement("span");
		span.setAttribute("id", "sitesMoverMove_siteNome");
		span.setAttribute("style", "font-style: italic;");
		h1.appendChild(span);
		div.appendChild(h1);
		var div1 = document.createElement("div");
		div1.setAttribute("class", "sitesLista sitesListaMover");
		div1.setAttribute("style", "margin-top: 0.7em;");
		div.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("id", "sitesMoverMove_lista_LimVw");
		div1.setAttribute("style", "display: -webkit-flex; display: -moz-flex; display: flex; -webkit-justify-content: space-between; -moz-justify-content: space-between; justify-content: space-between; -webkit-align-items: center; -moz-align-items: center; align-items: center; margin-top: 0.4em;");
		var button = document.createElement("button");
		button.setAttribute("id", "sitesMoverMove_lista_LimVwBtnMenos");
		button.setAttribute("class", "btn");
		button.addEventListener("click", function() {
			pag.setSitesLimVw(pag.getSitesLimVw() - 60);
			pag.abrir();
		});
		var txt = document.createTextNode("Exibir Menos");
		button.appendChild(txt);
		div1.appendChild(button);
		button = document.createElement("button");
		button.setAttribute("id", "sitesMoverMove_lista_LimVwBtnMais");
		button.setAttribute("class", "btn");
		button.addEventListener("click", function() {
			pag.setSitesLimVw(pag.getSitesLimVw() + 60);
			pag.abrir();
		});
		txt = document.createTextNode("Exibir Mais");
		button.appendChild(txt);
		div1.appendChild(button);
		div.appendChild(div1);
		pagina.getMain().appendChild(div);
		return true;
	}
	
	this.getTitle = function() {
		return "Mover Sites";
	}
	
	this.construtor(s_i);
}