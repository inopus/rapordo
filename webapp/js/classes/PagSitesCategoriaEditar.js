function PagSitesCategoriaEditar(categoria_id) {
	var sitesCategoriaEditar_form = document.getElementById("sitesCategoriaEditar_form");
	
	this.construtor = function(categoria_id) {
		this.montaPagHtml();
		document.getElementById("sitesCategoriaEditar_voltar").addEventListener("click", function() {
			pagina.abrirPaginas("sitesCategoria");
		});
		document.getElementById("sitesCategoriaEditar_form_btnAtualizar").addEventListener("click", function() {
			pag.atualizar();
		});
		this.abrir(categoria_id);
	}
	
	this.abrir = function(categoria_id) {
		var banco_Categoria = new Banco_Categoria();
		banco_Categoria.get(categoria_id, function(categoria) {
			document.getElementById("sitesCategoriaEditar_form_titulo").innerHTML = 'Editar <span style="font-style: italic;">' + categoria.getNome() + '</span>';
			document.getElementById("sitesCategoriaEditar_form_nome").value = categoria.getNome();
			document.getElementById("sitesCategoriaEditar_form_privado").value = categoria.getPrivado();
			document.getElementById("sitesCategoriaEditar_form_id").value = categoria.getId();
		});
	}
	
	this.atualizar = function() {
		var categoria = new Categoria();
		if(
			categoria.setNome(document.getElementById("sitesCategoriaEditar_form_nome").value) &&
			categoria.setPrivado(document.getElementById("sitesCategoriaEditar_form_privado").value) &&
			categoria.setId(document.getElementById("sitesCategoriaEditar_form_id").value) &&
			categoria.setUsuario_id(usuario.getId())
		) {
			var hr = new HttpReq("post", pagina.getWs() + "categoria/editar", function(res) {
				if(res == "1") {
					var banco_Categoria = new Banco_Categoria();
					banco_Categoria.put(categoria, function(categoria) {
						alerta.abrirSucesso("Categoria atualizada com sucesso.");
						pagina.abrirPaginas("sitesCategoria");
					});
				} else {
					alerta.abrirErro("Não foi possível atualizar a categoria. Verifique os campos e a conexão com a Internet.")
				}
			}, function(res) {
				alerta.abrirErro("Não foi possível atualizar a categoria. Verifique os campos e a conexão com a Internet.")
			});
			hr.enviar("categoria=" + categoria.jsonString(), true, true);
		} else {
			alerta.abrirErro("Preencha os campos corretamente.");
		}
	}
	
	this.getForm = function() {
		return sitesCategoriaEditar_form;
	}
	
	this.montaPagHtml = function() {
		pagina.getMain().empty();
		var div = document.createElement("div");
		div.setAttribute("class", "limitaLargura fundo");
		// <!-- <figure id="sitesCategoriaEditar_voltar">
			// <img src="im/back.png" alt="Voltar">
			// <figcaption>Voltar</figcaption>
		// </figure> -->
		var img = document.createElement("img");
		img.setAttribute("src", "im/back.png");
		img.setAttribute("id", "sitesCategoriaEditar_voltar");
		img.setAttribute("alt", "Voltar");
		img.setAttribute("style", "width: 2em; height: auto; border: 0; vertical-align: middle; cursor: pointer;");
		div.appendChild(img);
		form = document.createElement("form");
		form.setAttribute("onsubmit", "return false;");
		form.setAttribute("style", "margin-top: 1.2em;");
		form.setAttribute("id", "sitesCategoriaEditar_form");
		form.setAttribute("class", "formulario fundo");
		form.setAttribute("method", "post");
		form.setAttribute("spellcheck", false);
		form.setAttribute("novalidate", true);
		var h1 = document.createElement("h1");
		h1.setAttribute("style", "font-size: 1.2em; margin-top: 0;");
		h1.setAttribute("id", "sitesCategoriaEditar_form_titulo");
		var txt = document.createTextNode("Criar uma nova categoria");
		h1.appendChild(txt);
		form.appendChild(h1);
		var input = document.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("id", "sitesCategoriaEditar_form_id");
		form.appendChild(input);
		var div1 = document.createElement("div1");
		div1.setAttribute("class", "espacoForm");
		var label = document.createElement("label");
		label.setAttribute("for", "sitesCategoriaEditar_form_nome");
		txt = document.createTextNode("Nome ");
		label.appendChild(txt);
		var span = document.createElement("span");
		span.setAttribute("class", "msgInvalido");
		span.setAttribute("id", "sitesCategoriaEditar_form_nome_msgErro");
		label.appendChild(span);
		txt = document.createTextNode(" *");
		label.appendChild(txt);
		div1.appendChild(label);
		input = document.createElement("input");
		input.setAttribute("type", "text");
		input.setAttribute("id", "sitesCategoriaEditar_form_nome");
		input.setAttribute("class", "inputTxt");
		input.setAttribute("title", "Nome da categoria");
		input.setAttribute("placeholder", "Nome");
		input.setAttribute("maxlength", 30);
		div1.appendChild(input);
		form.appendChild(div1);
		div1 = document.createElement("div");
		div1.setAttribute("class", "espacoForm");
		label = document.createElement("label");
		label.setAttribute("for", "sitesCategoriaEditar_form_privado");
		txt = document.createTextNode("Visibilidade");
		label.appendChild(txt);
		div1.appendChild(label);
		var select = document.createElement("select");
		select.setAttribute("class", "select");
		select.setAttribute("id", "sitesCategoriaEditar_form_privado");
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
		input.setAttribute("id", "sitesCategoriaEditar_form_btnAtualizar");
		input.setAttribute("value", "Atualizar categoria");
		div1.appendChild(input);
		form.appendChild(div1);
		div.appendChild(form);
		pagina.getMain().appendChild(div);
		return true;
	}
	
	this.getTitle = function() {
		return "Editar categorias";
	}
	
	this.construtor(categoria_id);
}