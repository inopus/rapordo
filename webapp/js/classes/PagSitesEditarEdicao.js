function PagSitesEditarEdicao(site_id) {
	this.construtor = function(site_id) {
		this.montaPagHtml();
		this.abrir(site_id);
	}
	
	this.abrir = function(site_id) {
		var banco_Site = new Banco_Site();
		banco_Site.get(site_id, function(site) {
			if(site == undefined) {
				alerta.abrirErro("Site não contrado");
				pagina.abrirPaginas("sitesEditar");
			} else {
				document.getElementById("pagSitesEditarEdicao_url").value = site.getUrl();
				document.getElementById("pagSitesEditarEdicao_nome").value = site.getNome();
				document.getElementById("pagSitesEditarEdicao_descricao").value = site.getDescricao();
				pag.categoriaBuscar(site);
				document.getElementById("pagSitesEditarEdicao_privado").value = site.getPrivado();
				document.getElementById("pagSitesEditarEdicao_site_acessos").value = site.getAcessos();
				document.getElementById("pagSitesEditarEdicao_site_posicao").value = site.getPosicao();
				document.getElementById("pagSitesEditarEdicao_imagem_mesma_imgLink").value = site.getImagem();
				document.getElementById("pagSitesEditarEdicao_site_id").value = site.getId();
			}
		});
	}
	
	this.atualizar = function() {
		var site = new Site();
		var tudoCerto = true;
		
		if(!site.setUsuario_id(usuario.getId())) {
			tudoCerto = false;
			console.log("Erro: 1");
		}
		if(!site.setUrl(document.getElementById("pagSitesEditarEdicao_url").value)) {
			tudoCerto = false;
			console.log("Erro: 2");
			document.getElementById("pagSitesEditarEdicao_url").classList.add("inputTxtInvalido");
		}
		if(!site.setNome(document.getElementById("pagSitesEditarEdicao_nome").value)) {
			document.getElementById("pagSitesEditarEdicao_nome_msgErro").innerHTML = "(não deve conter caracteres especiais)";
			document.getElementById("pagSitesEditarEdicao_nome").classList.add("inputTxtInvalido");
			tudoCerto = false;
			console.log("Erro: 3");
		}
		if(!site.setDescricao(document.getElementById("pagSitesEditarEdicao_descricao").value)) {
			tudoCerto = false;
			console.log("Erro: 4");
		}
		if(document.getElementById("pagSitesEditarEdicao_imagem_mesma").checked) {
			if(!site.setImagem(document.getElementById("pagSitesEditarEdicao_imagem_mesma_imgLink").value)) {
				tudoCerto = false;
				console.log("Erro: 5");
			}
		} else if(document.getElementById("pagSitesEditarEdicao_imagem_link").checked) {
			if(!site.setImagem(document.getElementById("pagSitesEditarEdicao_imagem_imgLink").value)) {
				tudoCerto = false;
				console.log("Erro: 5");
			}
		} else if(document.getElementById("pagSitesEditarEdicao_imagem_enviar").checked) {
			if(!site.setImagem(undefined)) {
				tudoCerto = false;
				console.log("Erro: 6");
			} else {
				var canvas = document.getElementById("pagSitesEditarEdicao_imagem_preview").getElementsByTagName("canvas")[0];
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
		} else if(document.getElementById("pagSitesEditarEdicao_imagem_rapordo").checked) {
			if(!site.setImagem("http://rapordo.com/im/logo/logo128.png")) {
				tudoCerto = false;
				console.log("Erro: 9");
			}
		} else {
			tudoCerto = false;
			console.log("Erro: 10");
		}
		if(document.getElementById("pagSitesEditarEdicao_posicao").value == "-1") {
			if(!site.setPosicao(document.getElementById("pagSitesEditarEdicao_site_posicao").value)) {
				tudoCerto = false;
				console.log("Erro: 11");
			}
		} else {
			if(!site.setPosicao(document.getElementById("pagSitesEditarEdicao_posicao").value)) {
				tudoCerto = false;
				console.log("Erro: 11");
			}
		}
		if(!site.setPrivado(document.getElementById("pagSitesEditarEdicao_privado").value)) {
			tudoCerto = false;
			console.log("Erro: 12");
		}
		if(!site.setCategoria_id(document.getElementById("pagSitesEditarEdicao_categoria").value)) {
			tudoCerto = false;
			console.log("Erro: 13");
		}
		
		if(!tudoCerto) {
			alerta.abrirErro("Preencha os campos corretamente.");
			return false;
		} else {
			site.setAcessos(document.getElementById("pagSitesEditarEdicao_site_acessos").value);
			site.setId(document.getElementById("pagSitesEditarEdicao_site_id").value);
			var hr = new HttpReq("post", pagina.getWs() + "site/editar", function(res) {
				if(res == "0") {
					alerta.abrirErro("Não foi possível atualizar esse site. Verifique as informações inseridas e tente novamente.");
				} else {
					var siteRes = new Site();
					siteRes.json(res);
					var banco_Site = new Banco_Site();
					var banco_SitePendencia = new Banco_SitePendencia();
					banco_Site.put(siteRes, function(s) {
						alerta.abrirSucesso("Site altualizado com sucesso.");
						pagina.abrirPaginas("sites");
					});
				}
			});
			return hr.enviar("site=" + site.jsonString(), true, true);
		}
	}
	
	this.categoriaBuscar = function(site) {
		var banco_Categoria = new Banco_Categoria();
		document.getElementById("pagSitesEditarEdicao_categoria").empty();
		var categoria = new Categoria();
		categoria.setId(0);
		categoria.setNome("Nenhuma");
		document.getElementById("pagSitesEditarEdicao_categoria").appendChild(this.categoriaHtml(categoria));
		banco_Categoria.getAll(undefined, function(lista) {
			var listaTmn = lista.length;
			if(listaTmn > 0) {
				lista.sort(function(a, b) {
					return a.getNome().toLowerCase().localeCompare(b.getNome().toLowerCase());
				});
				for(var i = 0; i < listaTmn; i++) {
					document.getElementById("pagSitesEditarEdicao_categoria").appendChild(pag.categoriaHtml(lista[i]));
				}
			}
			document.getElementById("pagSitesEditarEdicao_categoria").value = site.getCategoria_id();
		});
	}
	
	this.categoriaHtml = function(categoria) {
		var option = document.createElement("option");
		option.setAttribute("value", categoria.getId());
		var txt = document.createTextNode(categoria.getNome());
		option.appendChild(txt);
		return option;
	}
	
	this.excluir = function() {
		var banco_Site = new Banco_Site();
		banco_Site.get(document.getElementById("pagSitesEditarEdicao_site_id").value, function(site) {
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
	}
	
	this.montaPagHtml = function() {
		pagina.getMain().empty();
		var form = document.createElement("form");
		form.addEventListener("submit", function() {
			return false;
		});
		form.setAttribute("onsubmit", "return false;");
		form.setAttribute("class", "formulario limitaLargura fundo");
		form.setAttribute("spellcheck", false);
		form.setAttribute("novalidate", true);
		var h1 = document.createElement("h1");
		txt = document.createTextNode("Editar sites");
		h1.appendChild(txt);
		form.appendChild(h1);
		var div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		var label = document.createElement("label");
		label.setAttribute("for", "pagSitesEditarEdicao_url");
		txt = document.createTextNode("URL / Endereço / Link *");
		label.appendChild(txt);
		div1.appendChild(label);
		var input = document.createElement("input");
		input.setAttribute("type", "url");
		input.setAttribute("id", "pagSitesEditarEdicao_url");
		input.setAttribute("class", "inputTxt");
		input.setAttribute("title", "URL / Endereço / Link");
		input.setAttribute("placeholder", "Exemplo: http://rapordo.com");
		input.setAttribute("maxlength", 1000);
		input.addEventListener("change", function() {
			var s = new Site();
			if(s.setUrl(this.value)) {
				this.classList.remove("inputTxtInvalido");
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
		label.setAttribute("for", "pagSitesEditarEdicao_nome");
		txt = document.createTextNode("Nome ");
		label.appendChild(txt);
		var span = document.createElement("span");
		span.setAttribute("class", "msgInvalido");
		span.setAttribute("id", "pagSitesEditarEdicao_nome_msgErro");
		label.appendChild(span);
		txt = document.createTextNode(" *");
		label.appendChild(txt);
		div1.appendChild(label);
		input = document.createElement("input");
		input.setAttribute("type", "text");
		input.setAttribute("id", "pagSitesEditarEdicao_nome");
		input.setAttribute("class", "inputTxt");
		input.setAttribute("title", "Nome");
		input.setAttribute("placeholder", "Exemplo: Rapordo");
		input.setAttribute("maxlength", 30);
		div1.appendChild(input);
		form.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		label = document.createElement("label");
		label.setAttribute("for", "pagSitesEditarEdicao_descricao");
		txt = document.createTextNode("Descrição");
		label.appendChild(txt);
		div1.appendChild(label);
		input = document.createElement("input");
		input.setAttribute("type", "text");
		input.setAttribute("id", "pagSitesEditarEdicao_descricao");
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
		input.setAttribute("id", "pagSitesEditarEdicao_imagem_mesma");
		input.setAttribute("value", "link");
		input.setAttribute("checked", true);
		input.addEventListener("change", function() {
			document.getElementById("pagSitesEditarEdicao_imagem_imgLink").style.display = "none";
			document.getElementById("pagSitesEditarEdicao_imagem_imgEnviar").style.display = "none";
			document.getElementById("pagSitesEditarEdicao_imagem_preview").empty();
			document.getElementById("pagSitesEditarEdicao_imagem_imgLink").value = "http://";
			document.getElementById("pagSitesEditarEdicao_imagem_imgEnviar").value = "";
		});
		label.appendChild(input);
		txt = document.createTextNode(" Não alterar a imagem");
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
		input.setAttribute("id", "pagSitesEditarEdicao_imagem_link");
		input.setAttribute("value", "link");
		input.addEventListener("change", function() {
			document.getElementById("pagSitesEditarEdicao_imagem_imgLink").style.display = "block";
			document.getElementById("pagSitesEditarEdicao_imagem_imgEnviar").style.display = "none";
			document.getElementById("pagSitesEditarEdicao_imagem_preview").empty();
			document.getElementById("pagSitesEditarEdicao_imagem_imgLink").value = "http://";
			document.getElementById("pagSitesEditarEdicao_imagem_imgEnviar").value = "";
		});
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
		input.setAttribute("id", "pagSitesEditarEdicao_imagem_enviar");
		input.setAttribute("value", "enviar");
		input.addEventListener("change", function() {
			document.getElementById("pagSitesEditarEdicao_imagem_imgLink").style.display = "none";
			document.getElementById("pagSitesEditarEdicao_imagem_imgEnviar").style.display = "block";
			document.getElementById("pagSitesEditarEdicao_imagem_preview").empty();
			document.getElementById("pagSitesEditarEdicao_imagem_imgLink").value = "http://";
			document.getElementById("pagSitesEditarEdicao_imagem_imgEnviar").value = "";
		});
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
		input.setAttribute("id", "pagSitesEditarEdicao_imagem_rapordo");
		input.setAttribute("value", "rapordo");
		input.addEventListener("change", function() {
			document.getElementById("pagSitesEditarEdicao_imagem_imgLink").style.display = "none";
			document.getElementById("pagSitesEditarEdicao_imagem_imgEnviar").style.display = "none";
			document.getElementById("pagSitesEditarEdicao_imagem_preview").empty();
			document.getElementById("pagSitesEditarEdicao_imagem_imgLink").value = "http://";
			document.getElementById("pagSitesEditarEdicao_imagem_imgEnviar").value = "";
		});
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
		input.setAttribute("id", "pagSitesEditarEdicao_imagem_imgLink");
		input.setAttribute("class", "inputTxt");
		input.setAttribute("title", "URL (Endereço) de uma imagem");
		input.setAttribute("placeholder", "URL (Endereço) de uma imagem");
		input.setAttribute("value", "http://");
		input.addEventListener("change", function() {
			document.getElementById("pagSitesEditarEdicao_imagem_preview").empty();
			var imgUsr = document.getElementById("pagSitesEditarEdicao_imagem_imgLink");
			if(imgUsr.value != "" && imgUsr.value != undefined && imgUsr.value != "http://" && imgUsr.value != "https://") {
				var s = new Site();
				if(s.setImagem(imgUsr.value)) {
					carregando.abrir(30000, "Não foi possível completar a solicitação. Provavelmente a URL informada não é uma imagem válida");
					s = undefined;
					var img = document.createElement("img");
					img.src = imgUsr.value;
					document.getElementById("pagSitesEditarEdicao_imagem_preview").appendChild(img);
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
		div2.appendChild(input);
		input = document.createElement("input");
		input.setAttribute("style", "display: none;");
		input.setAttribute("type", "file");
		input.setAttribute("id", "pagSitesEditarEdicao_imagem_imgEnviar");
		input.setAttribute("class", "inputTxt");
		input.setAttribute("title", "Imagem para envio");
		input.setAttribute("placeholder", "Imagem para envio");
		input.addEventListener("change", function() {
			document.getElementById("pagSitesEditarEdicao_imagem_preview").empty();
			var imgUsr = document.getElementById("pagSitesEditarEdicao_imagem_imgEnviar");
			if(regex(9, 1).test(imgUsr.files[0].type)) {
				carregando.abrir();
				var img = document.createElement("img");
				img.file = imgUsr.files[0];
				document.getElementById("pagSitesEditarEdicao_imagem_preview").appendChild(img);
				var reader = new FileReader();
				reader.onload = function(event) {
					var img = document.getElementById("pagSitesEditarEdicao_imagem_preview").getElementsByTagName("img")[0];
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
						document.getElementById("pagSitesEditarEdicao_imagem_preview").appendChild(canvas);
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
		div2.appendChild(input);
		div1.appendChild(div2);
		div2 = document.createElement("div");
		div2.setAttribute("class", "espacoForm");
		div2.setAttribute("id", "pagSitesEditarEdicao_imagem_preview");
		div1.appendChild(div2);
		form.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		label = document.createElement("label");
		label.setAttribute("for", "pagSitesEditarEdicao_posicao");
		txt = document.createTextNode("Posição");
		label.appendChild(txt);
		div1.appendChild(label);
		var select = document.createElement("select");
		select.setAttribute("class", "select");
		select.setAttribute("id", "pagSitesEditarEdicao_posicao");
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
		option = document.createElement("option");
		option.setAttribute("value", "-1");
		txt = document.createTextNode("Manter a atual");
		option.appendChild(txt);
		select.appendChild(option);
		select.value = "-1";
		div1.appendChild(select);
		form.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		label = document.createElement("label");
		label.setAttribute("for", "pagSitesEditarEdicao_privado");
		txt = document.createTextNode("Visibilidade");
		label.appendChild(txt);
		div1.appendChild(label);
		select = document.createElement("select");
		select.setAttribute("class", "select");
		select.setAttribute("id", "pagSitesEditarEdicao_privado");
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
		label.setAttribute("for", "pagSitesEditarEdicao_categoria");
		txt = document.createTextNode("Categoria");
		label.appendChild(txt);
		div1.appendChild(label);
		select = document.createElement("select");
		select.setAttribute("class", "select");
		select.setAttribute("id", "pagSitesEditarEdicao_categoria");
		div1.appendChild(select);
		form.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		div1.setAttribute("style", "margin-top: 1em; display: -webkit-flex; display: -moz-flex; display: flex; -webkit-justify-content: space-between; -moz-justify-content: space-between; justify-content: space-between;");
		input = document.createElement("input");
		input.setAttribute("type", "button");
		input.setAttribute("class", "btn btnVermelho");
		input.setAttribute("value", "Excluir site");
		input.addEventListener("click", function() {
			pagina.confirm("Tem certeza que deseja excluir permanentemente esse site?", function() {
				pag.excluir();
			});
		});
		div1.appendChild(input);
		form.appendChild(div1);
		input = document.createElement("input");
		input.setAttribute("type", "button");
		input.setAttribute("class", "btn");
		input.setAttribute("value", "Atualizar informações");
		input.addEventListener("click", function() {
			pag.atualizar();
		});
		div1.appendChild(input);
		form.appendChild(div1);
		input = document.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("id", "pagSitesEditarEdicao_imagem_mesma_imgLink");
		form.appendChild(input);
		input = document.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("id", "pagSitesEditarEdicao_site_id");
		form.appendChild(input);
		input = document.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("id", "pagSitesEditarEdicao_site_posicao");
		form.appendChild(input);
		input = document.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("id", "pagSitesEditarEdicao_site_acessos");
		form.appendChild(input);
		pagina.getMain().appendChild(form);
	}
	
	this.getTitle = function() {
		return "Editar site";
	}
	
	this.construtor(site_id);
}