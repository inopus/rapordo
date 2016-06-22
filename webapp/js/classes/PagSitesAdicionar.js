function PagSitesAdicionar() {
	var formulario = undefined;
	var sitesAdicionar_pendencias_tbody = undefined;
	var sitesAdicionar_novo_btnAddPendencia = undefined;
	var imgPreview = undefined;
	var categoriaSelect = undefined;
	
	this.construtor = function() {
		this.montaPagHtml();
		
		document.getElementById("sitesAdicionar_novo_imagem_link").addEventListener("change", function() {
			document.getElementById("sitesAdicionar_novo_imagem_imgEnviar").style.display = "none";
			document.getElementById("sitesAdicionar_novo_imagem_imgLink").style.display = "block";
			pag.getImgPreview().empty();
			document.getElementById("sitesAdicionar_novo_imagem_imgLink").value = "http://";
			document.getElementById("sitesAdicionar_novo_imagem_imgEnviar").value = "";
		});
		
		document.getElementById("sitesAdicionar_novo_imagem_enviar").addEventListener("change", function() {
			document.getElementById("sitesAdicionar_novo_imagem_imgEnviar").style.display = "block";
			document.getElementById("sitesAdicionar_novo_imagem_imgLink").style.display = "none";
			pag.getImgPreview().empty();
			document.getElementById("sitesAdicionar_novo_imagem_imgLink").value = "http://";
			document.getElementById("sitesAdicionar_novo_imagem_imgEnviar").value = "";
		});
		
		document.getElementById("sitesAdicionar_novo_imagem_rapordo").addEventListener("change", function() {
			document.getElementById("sitesAdicionar_novo_imagem_imgEnviar").style.display = "none";
			document.getElementById("sitesAdicionar_novo_imagem_imgLink").style.display = "none";
			pag.getImgPreview().empty();
			document.getElementById("sitesAdicionar_novo_imagem_imgLink").value = "http://";
			document.getElementById("sitesAdicionar_novo_imagem_imgEnviar").value = "";
		});
		
		document.getElementById("sitesAdicionar_novo_imagem_imgEnviar").addEventListener("change", function() {
			pag.getImgPreview().empty();
			var imgUsr = document.getElementById("sitesAdicionar_novo_imagem_imgEnviar");
			if(regex(9, 1).test(imgUsr.files[0].type)) {
				carregando.abrir();
				var img = document.createElement("img");
				img.file = imgUsr.files[0];
				pag.getImgPreview().appendChild(img);
				var reader = new FileReader();
				reader.onload = function(event) {
					var img = pag.getImgPreview().getElementsByTagName("img")[0];
					img.src = event.target.result;
					img.onload = function() {
						var canvas = document.createElement("canvas");
						var width = ((this.width > 256) ? (256) : (this.width));
						var height = ((this.height > 256) ? (256) : (this.height));
						canvas.width = width;
						canvas.height = height;
						canvas.style.display = "none";
						var canvasCtx = canvas.getContext("2d");
						canvasCtx.drawImage(this, 0, 0, width, height);
						this.src = canvas.toDataURL("image/jpeg", 0.75);
						this.onload = function() {
							this.style.width = "5.3em";
							this.style.height = "5.3em";
							carregando.fechar();
						}
						this.onerror = function() {
							alerta.abrirErro("Não foi possível carregar a imagem.");
							carregando.fechar();
						}
						pag.getImgPreview().appendChild(canvas);
					}
					img.onerror = function() {
						alerta.abrirErro("Não foi possível carregar a imagem.");
						carregando.fechar();
					}
				}
				reader.onerror = function() {
					alerta.abrirErro("Não foi possível carregar a imagem.");
					carregando.fechar();
				}
				reader.readAsDataURL(img.file);
			} else {
				alerta.abrirErro("O arquivo selecionado não é uma imagem válida.");
			}
		});
		
		document.getElementById("sitesAdicionar_novo_imagem_imgLink").addEventListener("blur", function() {
			pag.getImgPreview().empty();
			var imgUsr = document.getElementById("sitesAdicionar_novo_imagem_imgLink");
			if(imgUsr.value != "" && imgUsr.value != undefined && imgUsr.value != "http://" && imgUsr.value != "https://") {
				var s = new Site();
				if(s.setImagem(imgUsr.value)) {
					carregando.abrir(30000, "Não foi possível completar a solicitação. Provavelmente a URL informada não é uma imagem válida");
					s = undefined;
					var img = document.createElement("img");
					img.src = imgUsr.value;
					pag.getImgPreview().appendChild(img);
					img.onload = function() {
						this.style.width = "5.3em";
						this.style.height = "5.3em";
						carregando.fechar();
					}
					this.onerror = function() {
						alerta.abrirErro("Não foi possível carregar a imagem.");
						carregando.fechar();
					}
				} else {
					alerta.abrirErro("O link inserido não é uma imagem válida.");
				}
			}
		});
		
		this.getSitesAdicionar_novo_btnAddPendencia().addEventListener("click", function() {
			pag.formAddListaPendencia();
		});
		
		this.abrir();
	}
	
	this.abrir = function() {
		this.categoriaBuscar();
		this.buscarTodasPendencias();
	}
	
	this.addSitePendencia = function(site) {
		var banco_SitePendencia = new Banco_SitePendencia();
		banco_SitePendencia.add(site, function(site) {
			if(pag.getSitesAdicionar_pendencias_tbody().firstChild.firstChild.getAttribute("class") == "nenhumSitePendenciaHtml") {
				pag.limparPendencias();
			}
			pag.addListaSitePendencia(site);
			pag.resetForm();
			alerta.abrirSucesso("Site adicionado a Lista de pendências com sucesso.");
			pagina.scrollTo(document.getElementsByTagName("body")[0]);
		});
		return true;
	}
	
	this.addListaSitePendencia = function(site) {
		this.getSitesAdicionar_pendencias_tbody().appendChild(this.sitePendenciaHtml(site));
	}
	
	this.buscarTodasPendencias = function() {
		var banco_SitePendencia = new Banco_SitePendencia();
		this.limparPendencias();
		if(!banco_SitePendencia.getAll(usuario.getId(), function(listaSite) {
			if(listaSite.length == 0) {
				if(!pag.nenhumSitePendencia()) {
					alerta.error("Você não possuí nenhum site pendente, mas não foi possível exibir essa informação.");
				}
			} else {
				if(!pag.listarTodasPendencias(listaSite)) {
					alerta.error("Você possuí sites pendentes para envio, mas não foi possível exibi-los. Por favor, tente novamente mais tarde.");
				}
			}
		})) {
			// o getAll() volta false quando não é passado um id de usuario valido e nao tem nenhum usuario logado, ou seja, na pratica nao eh para cair aqui, mas teoricamente da.
			alerta.abrirErro("É necessário definir um usuário para buscar os sites");
			return false;
		}
	}
	
	this.categoriaBuscar = function() {
		var banco_Categoria = new Banco_Categoria();
		this.getCategoriaSelect().empty();
		var categoria = new Categoria();
		categoria.setId(0);
		categoria.setNome("Nenhuma");
		this.getCategoriaSelect().appendChild(this.categoriaHtml(categoria));
		banco_Categoria.getAll(undefined, function(lista) {
			var listaTmn = lista.length;
			if(listaTmn > 0) {
				lista.sort(function(a, b) {
					return a.getNome().toLowerCase().localeCompare(b.getNome().toLowerCase());
				});
				for(var i = 0; i < listaTmn; i++) {
					pag.getCategoriaSelect().appendChild(pag.categoriaHtml(lista[i]));
				}
			}
		});
	}
	
	this.categoriaHtml = function(categoria) {
		var option = document.createElement("option");
		option.setAttribute("value", categoria.getId());
		var txt = document.createTextNode(categoria.getNome());
		option.appendChild(txt);
		return option;
	}
	
	this.delListaPendencia = function(site) {
		var banco_SitePendencia = new Banco_SitePendencia();
		banco_SitePendencia.del(site, function(site) {
			if(site) {
				alerta.abrirSucesso("Site excluído com sucesso.");
				window.setTimeout(function() {
					pag.buscarTodasPendencias();
				}, 400);
			} else {
				alerta.abrirErro("Não foi possível excluir o item solicitado. Tente novamente mais tarde.");
			}
		});
	}
	
	this.enviarListaPendencia = function(site) {
		var hr = new HttpReq("post", pagina.getWs() + "site/adicionar", function(res) {
			if(res == "0") {
				alerta.abrirErro("Não foi possível armazenar esse site. Verifique as informações inseridas e tente novamente.");
			} else {
				var siteRes = new Site();
				siteRes.json(res);
				var banco_Site = new Banco_Site();
				var banco_SitePendencia = new Banco_SitePendencia();
				if(banco_Site.put(siteRes) && banco_SitePendencia.del(site, function(s) {
					window.setTimeout(function() {
						pag.buscarTodasPendencias();
					}, 400);
				})) {
					alerta.abrirSucesso("Site enviado com sucesso.");
				} else {
					alerta.abrirErro("Erro desconhecido tentar realizar as transações no banco de dados local.")
				}
			}
		});
		hr.enviar("site=" + site.jsonString(), true, true);
		return true;
	}
	
	this.formAddListaPendencia = function() {
		var site = new Site();
		var tudoCerto = true;
		
		if(!site.setUsuario_id(usuario.getId())) {
			tudoCerto = false;
			console.log("Erro: 1");
		}
		if(!site.setUrl(document.getElementById("sitesAdicionar_novo_url").value)) {
			tudoCerto = false;
			console.log("Erro: 2");
			document.getElementById("sitesAdicionar_novo_url").classList.add("inputTxtInvalido");
		}
		if(!site.setNome(document.getElementById("sitesAdicionar_novo_nome").value)) {
			document.getElementById("sitesAdicionar_novo_nome_msgErro").innerHTML = "(não deve conter caracteres especiais)";
			document.getElementById("sitesAdicionar_novo_nome").classList.add("inputTxtInvalido");
			tudoCerto = false;
			console.log("Erro: 3");
		}
		if(!site.setDescricao(document.getElementById("sitesAdicionar_novo_descricao").value)) {
			tudoCerto = false;
			console.log("Erro: 4");
		}
		if(document.getElementById("sitesAdicionar_novo_imagem_link").checked) {
			if(!site.setImagem(document.getElementById("sitesAdicionar_novo_imagem_imgLink").value)) {
				tudoCerto = false;
				console.log("Erro: 5");
			}
		} else if(document.getElementById("sitesAdicionar_novo_imagem_enviar").checked) {
			if(!site.setImagem(undefined)) {
				tudoCerto = false;
				console.log("Erro: 6");
			} else {
				var canvas = pag.getImgPreview().getElementsByTagName("canvas")[0];
				if(canvas) {
					if(!site.setImagemEnviar(canvas.toDataURL("image/jpeg", 0.75))) {
						alerta.abrirErro("Imagem inválida.");
						tudoCerto = false;
						console.log("Erro: 7");
					}
				} else {
					document.getElementById("sitesAdicionar_novo_imagem_imgEnviar").classList.add("inputTxtInvalido");
					tudoCerto = false;
					console.log("Erro: 8");
				}
			}
		} else if(document.getElementById("sitesAdicionar_novo_imagem_rapordo").checked) {
			if(!site.setImagem("http://rapordo.com/im/logo/logo128.png")) {
				tudoCerto = false;
				console.log("Erro: 9");
			}
		} else {
			tudoCerto = false;
			console.log("Erro: 10");
		}
		if(!site.setPosicao(document.getElementById("sitesAdicionar_novo_posicao").value)) {
			tudoCerto = false;
			console.log("Erro: 11");
		}
		if(!site.setPrivado(document.getElementById("sitesAdicionar_novo_privado").value)) {
			tudoCerto = false;
			console.log("Erro: 12");
		}
		if(!site.setCategoria_id(document.getElementById("sitesAdicionar_novo_categoria").value)) {
			tudoCerto = false;
			console.log("Erro: 13");
		}
		
		if(!tudoCerto) {
			alerta.abrirErro("Preencha os campos corretamente.");
			return false;
		} else {
			return pag.addSitePendencia(site);
		}
	}
	
	this.formReset = function() {
		document.getElementById("sitesAdicionar_novo_imagem_imgEnviar").style.display = "none";
		document.getElementById("sitesAdicionar_novo_imagem_imgLink").style.display = "none";
		pag.getImgPreview().empty();
		document.getElementById("sitesAdicionar_novo_nome_msgErro").innerHTML = "";
		this.getForm().reset();
		return true;
	}
	
	this.limparPendencias = function() {
		this.getSitesAdicionar_pendencias_tbody().empty();
		return true;
	}
	
	this.listarTodasPendencias = function(listaSite) {
		if(this.limparPendencias()) {
			if(listaSite) {
				var listaSiteTmn = listaSite.length;
				if(listaSiteTmn > 0) {
					for(var i = 0; i < listaSiteTmn; i++) {
						this.addListaSitePendencia(listaSite[i]);
					}
					return true;
				} else {
					this.nenhumSitePendencia();
				}
			} else {
				this.nenhumSitePendencia();
			}
		} else {
			return false;
		}
	}
	
	this.nenhumSitePendencia = function() {
		this.limparPendencias();
		this.getSitesAdicionar_pendencias_tbody().appendChild(this.nenhumSitePendenciaHtml());
		return true;
	}
	
	this.nenhumSitePendenciaHtml = function() {
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		var txt = document.createTextNode("Não há itens pendentes.");
		td.setAttribute("colspan", 3);
		td.setAttribute("title", "Você não possuí nenhum site aguardando para envio.");
		td.setAttribute("class", "nenhumSitePendenciaHtml");
		td.appendChild(txt);
		tr.appendChild(td);
		return tr;
	}
	
	this.sitePendenciaHtml = function(site) {
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		var a = document.createElement("a");
		a.setAttribute("href", site.getUrl());
		a.setAttribute("title", "Acessar " + site.getUrl());
		a.setAttribute("target", "_blank");
		var txt = document.createTextNode(site.getNome());
		a.appendChild(txt);
		td.appendChild(a);
		tr.appendChild(td);
		td = document.createElement("td");
		var img = document.createElement("img");
		img.setAttribute("src", "im/cloudUpload.png");
		img.setAttribute("alt", "Enviar");
		img.setAttribute("title", "Enviar para o servidor");
		img.addEventListener("click", function() {
			pag.enviarListaPendencia(site);
		});
		td.appendChild(img);
		tr.appendChild(td);
		td = document.createElement("td");
		img = document.createElement("img");
		img.setAttribute("src", "im/excluir.png");
		img.setAttribute("alt", "Excluir");
		img.setAttribute("title", "Excluir item");
		img.addEventListener("click", function() {
			pag.delListaPendencia(site);
		});
		td.appendChild(img);
		tr.appendChild(td);
		return tr;
	}
	
	this.resetForm = function() {
		return this.formReset();
	}
	
	this.getForm = function() {
		return formulario;
	}
	
	this.getSitesAdicionar_pendencias_tbody = function() {
		return sitesAdicionar_pendencias_tbody;
	}
	
	this.getSitesAdicionar_novo_btnAddPendencia = function() {
		return sitesAdicionar_novo_btnAddPendencia;
	}
	
	this.getImgPreview = function() {
		return imgPreview;
	}
	
	this.getCategoriaSelect = function() {
		return categoriaSelect;
	}
	
	this.montaPagHtml = function() {
		pagina.getMain().empty();
		var div = document.createElement("div");
		div.setAttribute("class", "limitaLargura fundo");
		var section = document.createElement("section");
		section.setAttribute("id", "sitesAdicionar_pendencias");
		var table = document.createElement("table");
		var caption = document.createElement("caption");
		var txt = document.createTextNode("Lista de pendências");
		caption.appendChild(txt);
		table.appendChild(caption);
		var thead = document.createElement("thead");
		var tr = document.createElement("tr");
		var th = document.createElement("th");
		txt = document.createTextNode("Nome");
		th.appendChild(txt);
		tr.appendChild(th);
		th = document.createElement("th");
		txt = document.createTextNode("Enviar");
		th.appendChild(txt);
		tr.appendChild(th);
		th = document.createElement("th");
		txt = document.createTextNode("Excluir");
		th.appendChild(txt);
		tr.appendChild(th);
		thead.appendChild(tr);
		table.appendChild(thead);
		var tbody = document.createElement("tbody");
		tbody.setAttribute("id", "sitesAdicionar_pendencias_tbody");
		table.appendChild(tbody);
		section.appendChild(table);
		div.appendChild(section);
		var form = document.createElement("form");
		form.addEventListener("submit", function() {
			return false;
		});
		form.setAttribute("onsubmit", "return false;");
		form.setAttribute("id", "sitesAdicionar_novo");
		form.setAttribute("class", "formulario fundo");
		form.setAttribute("spellcheck", false);
		form.setAttribute("novalidate", true);
		// form.setAttribute("style", "margin-top: 1.4em; display: -webkit-flex; display: -moz-flex; display: flex; -webkit-justify-content: space-between; -moz-justify-content: space-between; justify-content: space-between; align-items: center; -webkit-align-items: center; -moz-align-items: center; -webkit-flex-wrap: wrap; -moz-flex-wrap: wrap; flex-wrap: wrap;");
		form.setAttribute("style", "margin-top: 1.4em;");
		var h1 = document.createElement("h1");
		h1.setAttribute("style", "font-size: 1.2em;");
		txt = document.createTextNode("Adicionar um novo site");
		h1.appendChild(txt);
		form.appendChild(h1);
		var div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		var label = document.createElement("label");
		label.setAttribute("for", "sitesAdicionar_novo_url");
		txt = document.createTextNode("URL / Endereço / Link *");
		label.appendChild(txt);
		div1.appendChild(label);
		var input = document.createElement("input");
		input.setAttribute("type", "url");
		input.setAttribute("id", "sitesAdicionar_novo_url");
		input.setAttribute("class", "inputTxt");
		input.setAttribute("title", "URL / Endereço / Link");
		input.setAttribute("placeholder", "Exemplo: http://rapordo.com");
		input.setAttribute("maxlength", 1000);
		input.addEventListener("change", function() {
			var s = new Site();
			if(s.setUrl(this.value)) {
				this.classList.remove("inputTxtInvalido");
				
				var nome = this.value;
				var arr = new Array(".adv.br", ".adv", ".eng.br", ".eng", ".gov.br", ".gov", ".eti.br", ".eti", ".com.br", ".com", ".net.br", ".net", ".org.br", ".org", ".br", ".tv", ".cc"); // ordem desse cara eh muito importante
				var arrTmn = arr.length;
				var entro = false;
				for(var i = 0; i < arrTmn; i++) {
					if(nome.indexOf(arr[i]) >= 0 && !entro) {
						nome = nome.split("/")[2].split(arr[i])[0];
						entro = true;
					}
				}
				if(!entro) {
					if(nome.indexOf("//") >= 0) {
						nome = nome.split("/")[2];
					}
				}
				if(nome.indexOf("www.") >= 0) {
					nome = nome.split(".")[1];
				}
				if(nome.indexOf(".") >= 0) {
					nome = nome.replace(/\./g, " ");
				}
				
				document.getElementById("sitesAdicionar_novo_nome").value = nome;
			} else {
				this.classList.add("inputTxtInvalido");
				alerta.abrirErro('URL inválida. Não esqueça de colocar o protocolo "http://" ou "https://".');
			}
		});
		div1.appendChild(input);
		form.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		label = document.createElement("label");
		label.setAttribute("for", "sitesAdicionar_novo_nome");
		txt = document.createTextNode("Nome ");
		label.appendChild(txt);
		var span = document.createElement("span");
		span.setAttribute("class", "msgInvalido");
		span.setAttribute("id", "sitesAdicionar_novo_nome_msgErro");
		label.appendChild(span);
		txt = document.createTextNode(" *");
		label.appendChild(txt);
		div1.appendChild(label);
		input = document.createElement("input");
		input.setAttribute("type", "text");
		input.setAttribute("id", "sitesAdicionar_novo_nome");
		input.setAttribute("class", "inputTxt");
		input.setAttribute("title", "Nome");
		input.setAttribute("placeholder", "Exemplo: Rapordo");
		input.setAttribute("maxlength", 30);
		div1.appendChild(input);
		form.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		label = document.createElement("label");
		label.setAttribute("for", "sitesAdicionar_novo_descricao");
		txt = document.createTextNode("Descrição");
		label.appendChild(txt);
		div1.appendChild(label);
		input = document.createElement("input");
		input.setAttribute("type", "text");
		input.setAttribute("id", "sitesAdicionar_novo_descricao");
		input.setAttribute("class", "inputTxt");
		input.setAttribute("title", "Descrição");
		input.setAttribute("placeholder", "Exemplo: WebApp para armazenar links favoritos na nuvem");
		input.setAttribute("maxlength", 255);
		div1.appendChild(input);
		form.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		label = document.createElement("label");
		txt = document.createTextNode("Imagem *");
		label.appendChild(txt);
		div1.appendChild(label);
		var div2 = document.createElement("div");
		div2.setAttribute("class", "espacoForm");
		label = document.createElement("label");
		input = document.createElement("input");
		input.setAttribute("type", "radio");
		input.setAttribute("class", "rad");
		input.setAttribute("name", "imagem");
		input.setAttribute("id", "sitesAdicionar_novo_imagem_link");
		input.setAttribute("value", "link");
		label.appendChild(input);
		txt = document.createTextNode(" Utilizar uma imagem externa de uso livre");
		label.appendChild(txt);
		div2.appendChild(label);
		div1.appendChild(div2);
		div2 = document.createElement("div");
		div2.setAttribute("class", "espacoForm");
		label = document.createElement("label");
		input = document.createElement("input");
		input.setAttribute("type", "radio");
		input.setAttribute("class", "rad");
		input.setAttribute("name", "imagem");
		input.setAttribute("id", "sitesAdicionar_novo_imagem_enviar");
		input.setAttribute("value", "enviar");
		label.appendChild(input);
		txt = document.createTextNode(" Enviar uma imagem de uso livre ou própria");
		label.appendChild(txt);
		div2.appendChild(label);
		div1.appendChild(div2);
		div2 = document.createElement("div");
		div2.setAttribute("class", "espacoForm");
		label = document.createElement("label");
		input = document.createElement("input");
		input.setAttribute("type", "radio");
		input.setAttribute("class", "rad");
		input.setAttribute("name", "imagem");
		input.setAttribute("id", "sitesAdicionar_novo_imagem_rapordo");
		input.setAttribute("value", "rapordo");
		input.setAttribute("checked", true);
		label.appendChild(input);
		txt = document.createTextNode(" Utilizar o logo do Rapordo");
		label.appendChild(txt);
		div2.appendChild(label);
		div1.appendChild(div2);
		div2 = document.createElement("div");
		div2.setAttribute("class", "espacoForm");
		input = document.createElement("input");
		input.setAttribute("style", "display: none;");
		input.setAttribute("type", "url");
		input.setAttribute("id", "sitesAdicionar_novo_imagem_imgLink");
		input.setAttribute("class", "inputTxt");
		input.setAttribute("title", "URL (Endereço) de uma imagem");
		input.setAttribute("placeholder", "URL (Endereço) de uma imagem");
		input.setAttribute("value", "http://");
		div2.appendChild(input);
		input = document.createElement("input");
		input.setAttribute("style", "display: none;");
		input.setAttribute("type", "file");
		input.setAttribute("id", "sitesAdicionar_novo_imagem_imgEnviar");
		input.setAttribute("class", "inputTxt");
		input.setAttribute("title", "Imagem para envio");
		input.setAttribute("placeholder", "Imagem para envio");
		div2.appendChild(input);
		div1.appendChild(div2);
		div2 = document.createElement("div");
		div2.setAttribute("class", "espacoForm");
		div2.setAttribute("id", "sitesAdicionar_novo_imagem_preview");
		div1.appendChild(div2);
		form.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		label = document.createElement("label");
		label.setAttribute("for", "sitesAdicionar_novo_posicao");
		txt = document.createTextNode("Posição");
		label.appendChild(txt);
		div1.appendChild(label);
		var select = document.createElement("select");
		select.setAttribute("class", "select");
		select.setAttribute("id", "sitesAdicionar_novo_posicao");
		var option = document.createElement("option");
		option.setAttribute("value", "999999999");
		txt = document.createTextNode("No fim");
		option.appendChild(txt);
		select.appendChild(option);
		option = document.createElement("option");
		option.setAttribute("value", "0");
		txt = document.createTextNode("No início");
		option.appendChild(txt);
		select.appendChild(option);
		div1.appendChild(select);
		form.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		label = document.createElement("label");
		label.setAttribute("for", "sitesAdicionar_novo_privado");
		txt = document.createTextNode("Visibilidade");
		label.appendChild(txt);
		div1.appendChild(label);
		select = document.createElement("select");
		select.setAttribute("class", "select");
		select.setAttribute("id", "sitesAdicionar_novo_privado");
		option = document.createElement("option");
		option.setAttribute("value", "0");
		txt = document.createTextNode("Pública");
		option.appendChild(txt);
		select.appendChild(option);
		option = document.createElement("option");
		option.setAttribute("value", "1");
		txt = document.createTextNode("Privada");
		option.appendChild(txt);
		select.appendChild(option);
		div1.appendChild(select);
		form.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		label = document.createElement("label");
		label.setAttribute("for", "sitesAdicionar_novo_categoria");
		txt = document.createTextNode("Categoria");
		label.appendChild(txt);
		div1.appendChild(label);
		select = document.createElement("select");
		select.setAttribute("class", "select");
		select.setAttribute("id", "sitesAdicionar_novo_categoria");
		div1.appendChild(select);
		form.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		div1.setAttribute("style", "margin-top: 1em; text-align: right;");
		input = document.createElement("input");
		input.setAttribute("type", "button");
		input.setAttribute("class", "btn");
		input.setAttribute("id", "sitesAdicionar_novo_btnAddPendencia");
		input.setAttribute("value", "Adicionar à lista de pendência");
		div1.appendChild(input);
		form.appendChild(div1);
		div.appendChild(form);
		pagina.getMain().appendChild(div);
		
		formulario = document.getElementById("sitesAdicionar_novo");
		sitesAdicionar_pendencias_tbody = document.getElementById("sitesAdicionar_pendencias_tbody");
		sitesAdicionar_novo_btnAddPendencia = document.getElementById("sitesAdicionar_novo_btnAddPendencia");
		imgPreview = document.getElementById("sitesAdicionar_novo_imagem_preview");
		categoriaSelect = document.getElementById("sitesAdicionar_novo_categoria");
	}
	
	this.getTitle = function() {
		return "Adicionar sites";
	}
	
	this.construtor();
}