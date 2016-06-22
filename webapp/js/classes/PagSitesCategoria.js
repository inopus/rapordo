function PagSitesCategoria() {
	var sitesCategoria_form = undefined;
	var lista_tbody = undefined;
	
	this.construtor = function() {
		this.montaPagHtml();
		document.getElementById("sitesCategoria_lista_btnAdd").addEventListener("click", function() {
			pag.formReset();
			document.getElementById("sitesCategoria_form_nome").focus();
		});
		
		document.getElementById("sitesCategoria_form_btnCriar").addEventListener("click", function() {
			pag.criar();
		});
		sitesCategoria_form = document.getElementById("sitesCategoria_form");
		lista_tbody = document.getElementById("sitesCategoria_lista_tbody");
		this.abrir();
	}
	
	this.abrir = function() {
		this.listar();
	}
	
	this.categoriaHtml = function(categoria) {
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		var a = document.createElement("a");
		a.setAttribute("href", "#sitesCategoria");
		a.setAttribute("title", "Editar essa categoria");
		a.addEventListener("click", function() {
			pag.editar(categoria);
		});
		var txt = document.createTextNode(categoria.getNome());
		a.appendChild(txt);
		td.appendChild(a);
		tr.appendChild(td);
		td = document.createElement("td");
		img = document.createElement("img");
		img.setAttribute("src", "im/edit.png");
		img.setAttribute("alt", "Editar");
		img.setAttribute("title", "Editar item");
		img.addEventListener("click", function() {
			pag.editar(categoria);
		});
		td.appendChild(img);
		tr.appendChild(td);
		td = document.createElement("td");
		img = document.createElement("img");
		img.setAttribute("src", "im/excluir.png");
		img.setAttribute("alt", "Excluir");
		img.setAttribute("title", "Excluir item");
		img.addEventListener("click", function() {
			pagina.confirm("Tem certeza que deseja excluir essa categoria?", function() {
				pag.excluir(categoria);
			});
		});
		td.appendChild(img);
		tr.appendChild(td);
		return tr;
	}
	
	this.criar = function() {
		var categoria = new Categoria();
		if(
			categoria.setNome(document.getElementById("sitesCategoria_form_nome").value) &&
			categoria.setPrivado(document.getElementById("sitesCategoria_form_privado").value)
		) {
			var hr = new HttpReq("post", pagina.getWs() + "categoria/adicionar", function(res) {
				if(res != "0") {
					var categoria = new Categoria();
					var banco_Categoria = new Banco_Categoria();
					categoria.json(res);
					banco_Categoria.put(categoria, function(categoria) {
						pag.listar();
						alerta.abrirSucesso("Categoria criada com sucesso.");
						pag.formReset();
					});
				} else {
					alerta.abrirErro("Não foi possível criar a categoria. Verifique os campos e a conexão com a Internet.");
				}
			}, function(res) {
				alerta.abrirErro("Não foi possível criar a categoria. Verifique os campos e a conexão com a Internet.");
			});
			hr.enviar("categoria=" + categoria.jsonString(), true, true);
		} else {
			alerta.abrirErro("Preencha os campos corretamente.");
		}
	}
	
	this.editar = function(categoria) {
		pagina.abrirPaginas("sitesCategoriaEditar", categoria.getId());
	}
	
	this.excluir = function(categoria) {
		var hr = new HttpReq("post", pagina.getWs() + "categoria/excluir", function(res) {
			if(res == "1") {
				var banco_Categoria = new Banco_Categoria();
				banco_Categoria.del(categoria, function(categoria) {
					alerta.abrirSucesso("Categoria excluída com sucesso.");
					pag.listar();
				});
			} else {
				alerta.abrirErro("Não foi possível excluir a categoria selecionada. Verifique a sua conexão com a Internet e tente novamente.");
			}
		});
		hr.enviar("categoria=" + categoria.jsonString(), true, true);
	}
	
	this.formReset = function() {
		this.getForm().reset();
		// pagina.scrollTo(document.getElementById("sitesCategoria_form_nome"));
		pagina.scrollTo(document.getElementById("tela"));
	}
	
	this.listar = function(usuario_id) {
		var banco_Categoria = new Banco_Categoria();
		banco_Categoria.getAll(usuario_id, function(lista) {
			pag.listarCategoria(lista);
		});
	}
	
	this.listarCategoria = function(lista) {
		var listaTmn = lista.length;
		if(listaTmn > 0) {
			lista.sort(function(a, b) {
				return a.getNome().toLowerCase().localeCompare(b.getNome().toLowerCase());
			});
			this.getLista_tbody().empty();
			for(var i = 0; i < listaTmn; i++) {
				this.getLista_tbody().appendChild(this.categoriaHtml(lista[i]));
			}
		} else {
			this.nenhumaCategoria();
		}
	}
	
	this.nenhumaCategoria = function() {
		this.getLista_tbody().empty();
		this.getLista_tbody().appendChild(this.nenhumaCategoriaHtml());
	}
	
	this.nenhumaCategoriaHtml = function() {
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		var txt = document.createTextNode("Você não possuí nenhuma categoria.");
		td.setAttribute("colspan", 3);
		td.setAttribute("title", "Você não possuí nenhuma categoria.");
		td.setAttribute("class", "nenhumaCategoriaHtml");
		td.appendChild(txt);
		tr.appendChild(td);
		return tr;
	}
	
	this.getForm = function() {
		return sitesCategoria_form;
	}
	
	this.getLista_tbody = function() {
		return lista_tbody;
	}
	
	this.getTitle = function() {
		return "Categorias";
	}
	
	this.montaPagHtml = function() {
		// document
		// createElement
		// createTextNode
		// appendChild
		// setAttribute
		// pagina
		// getMain
		
		pagina.getMain().empty();
		var div = document.createElement("div");
		div.setAttribute("class", "limitaLargura fundo");
		form = document.createElement("form");
		form.setAttribute("onsubmit", "return false;");
		form.setAttribute("id", "sitesCategoria_form");
		form.setAttribute("class", "formulario fundo");
		form.setAttribute("target", "_top");
		form.setAttribute("method", "post");
		form.setAttribute("spellcheck", false);
		form.setAttribute("novalidate", true);
		var h1 = document.createElement("h1");
		h1.setAttribute("style", "font-size: 1.2em; margin-top: 0;");
		h1.setAttribute("id", "sitesCategoria_form_titulo");
		var txt = document.createTextNode("Criar uma nova categoria");
		h1.appendChild(txt);
		var div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		var label = document.createElement("label");
		label.setAttribute("for", "sitesCategoria_form_nome");
		txt = document.createTextNode("Nome ");
		label.appendChild(txt);
		var span = document.createElement("span");
		span.setAttribute("class", "msgInvalido");
		span.setAttribute("id", "sitesCategoria_form_nome_msgErro");
		label.appendChild(span);
		txt = document.createTextNode(" *");
		label.appendChild(txt);
		div1.appendChild(label);
		var input = document.createElement("input");
		input.setAttribute("type", "text");
		input.setAttribute("id", "sitesCategoria_form_nome");
		input.setAttribute("class", "inputTxt");
		input.setAttribute("title", "Nome da categoria");
		input.setAttribute("placeholder", "Nome");
		input.setAttribute("maxlength", 30);
		div1.appendChild(input);
		form.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		label = document.createElement("label");
		label.setAttribute("for", "sitesCategoria_form_privado");
		txt = document.createTextNode("Visibilidade");
		label.appendChild(txt);
		div1.appendChild(label);
		var select = document.createElement("select");
		select.setAttribute("class", "select");
		select.setAttribute("id", "sitesCategoria_form_privado");
		var option = document.createElement("option");
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
		div1.setAttribute("style", "margin-top: 1em; text-align: right; display: -webkit-flex; display: -moz-flex; display: flex; -webkit-justify-content: flex-end; -moz-justify-content: flex-end; justify-content: flex-end;");
		input = document.createElement("input");
		input.setAttribute("type", "button");
		input.setAttribute("class", "btn");
		input.setAttribute("id", "sitesCategoria_form_btnCriar");
		input.setAttribute("value", "Criar categoria");
		div1.appendChild(input);
		form.appendChild(div1);
		div.appendChild(form);
		var section = document.createElement("section");
		section.setAttribute("id", "sitesCategoria_lista");
		var table = document.createElement("table");
		var caption = document.createElement("caption");
		txt = document.createTextNode("Suas categorias");
		caption.appendChild(txt);
		table.appendChild(caption);
		var thead = document.createElement("thead");
		var tr = document.createElement("tr");
		var th = document.createElement("th");
		txt = document.createTextNode("Nome da categoria");
		th.appendChild(txt);
		tr.appendChild(th);
		th = document.createElement("th");
		txt = document.createTextNode("Editar");
		th.appendChild(txt);
		tr.appendChild(th);
		th = document.createElement("th");
		txt = document.createTextNode("Excluir");
		th.appendChild(txt);
		tr.appendChild(th);
		thead.appendChild(tr);
		table.appendChild(thead);
		var tbody = document.createElement("tbody");
		tbody.setAttribute("id", "sitesCategoria_lista_tbody");
		table.appendChild(tbody);
		var tfoot = document.createElement("tfoot");
		tfoot.setAttribute("id", "sitesCategoria_lista_tfoot");
		tr = document.createElement("tr");
		var td = document.createElement("td");
		td.setAttribute("colspan", "3");
		td.setAttribute("style", "text-align: center; padding: 1em;");
		var button = document.createElement("button");
		button.setAttribute("id", "sitesCategoria_lista_btnAdd");
		button.setAttribute("class", "btn");
		txt = document.createTextNode("Nova categoria");
		button.appendChild(txt);
		td.appendChild(button);
		tr.appendChild(td);
		tfoot.appendChild(tr);
		table.appendChild(tfoot);
		section.appendChild(table);
		div.appendChild(section);
		pagina.getMain().appendChild(div);
		return true;
	}
	
	this.construtor();
}