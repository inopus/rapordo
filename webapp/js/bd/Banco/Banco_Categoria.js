function Banco_Categoria() {
	this.put = function(categoria, fcb) {
		if(!regex(8, 1).test(categoria.getUsuario_id())) {
			categoria.setUsuario_id(usuario.getId());
		}
		if(!regex(8, 1).test(categoria.getUsuario_id())) {
			return false;
		} else {
			banco.aguardandoAdd();
			var tst = banco.getCon(0).transaction("Categoria", "readwrite");
			tst.onerror = function(event) {
				alerta.abrirErro("Erro ao realizar a transação do IndexedDB (banco de dados)");
				banco.aguardandoRm();
			}
			tst.onabort = function(event) {
				alerta.abrirErro("Erro ao realizar a transação do IndexedDB (banco de dados)");
				banco.aguardandoRm();
			}
			var os = tst.objectStore("Categoria");
			var request = os.put(JSON.parse(categoria.jsonString()));
			request.onerror = function(event) {
				alerta.abrirErro("Erro ao inserir a categoria no IndexedDB (banco de dados)");
				banco.aguardandoRm();
			}
			request.onsuccess = function(event) {
				if(typeof fcb == typeof Function) {
					if(categoria.setId(event.target.result)) {
						fcb(categoria);
					} else {
						alerta.abrirErro("Erro desconhecido");
					}
				}
				banco.aguardandoRm();
			}
			return true;
		}
	}
	
	this.del = function(categoria, fcb) {
		if(regex(8, 1).test(categoria.getId())) {
			banco.aguardandoAdd();
			var tst = banco.getCon(0).transaction("Categoria", "readwrite");
			tst.onerror = function(event) {
				alerta.abrirErro("Erro ao realizar a transação no IndexedDB (banco de dados)");
				banco.aguardandoRm();
			}
			tst.onabort = function(event) {
				alerta.abrirErro("Erro ao realizar a transação no IndexedDB (banco de dados)");
				banco.aguardandoRm();
			}
			var request = tst.objectStore("Categoria").delete(categoria.getId());
			request.onsuccess = function(event) {
				if(typeof fcb == typeof Function){
					fcb(categoria);
				}
				banco.aguardandoRm();
			}
			request.onerror = function(event) {
				alerta.abrirErro("Erro ao deletar um item do banco de dados.");
				if(typeof fcb == typeof Function){
					fcb(categoria);
				}
				banco.aguardandoRm();
			}
			return true;
		} else {
			return false;
		}
	}
	
	this.delAll = function(usuario_id, fcb) {
		if(regex(8, 1).test(usuario_id)) {
			banco.aguardandoAdd();
			this.getAll(usuario_id, function(lista) {
				var listaTmn = lista.length;
				var controle = 0;
				for(var i = 0; i < listaTmn; i++) {
					banco.aguardandoAdd();
					var banco_Categoria = new Banco_Categoria();
					banco_Categoria.del(lista[i], function(categoria) {
						if(categoria == undefined) {
							// vai mostrar a imagem abaixo o numero de vezes que falhar o del, mas como a mensagem ira aparecer uma vez, eu coloquei "alguns";
							alerta.abrirErro("Não foi possível apagar alguns sites. Tente novamente mais tarde. Se o erro persistir, comunique o administrador");
						}
						controle++;
						if(controle == listaTmn) {
							if(typeof fcb == typeof Function){
								fcb();
							}
						}
						banco.aguardandoRm();
					});
				}
				if(listaTmn == 0) {
					if(typeof fcb == typeof Function){
						fcb();
					}
				}
				banco.aguardandoRm();
			});
			return true;
		} else {
			return false;
		}
	}
	
	this.get = function(id, fcb) {
		if(!regex(8, 1).test(id)) {
			return false;
		} else {
			banco.aguardandoAdd();
			id = parseInt(id);
			var tst = banco.getCon(0).transaction("Categoria");
			tst.onerror = function(event) {
				alerta.abrirErro("Erro ao realizar a transação do IndexedDB (banco de dados)");
				banco.aguardandoRm();
			}
			tst.onabort = function(event) {
				alerta.abrirErro("Erro ao realizar a transação do IndexedDB (banco de dados)");
				banco.aguardandoRm();
			}
			var os = tst.objectStore("Categoria");
			var categoria = new Categoria();
			var request = os.get(id);
			request.onsuccess = function(event) {
				var cursor = event.target.result;
				if(cursor) {
					categoria.json(cursor);
				} else {
					categoria = undefined;
				}
				if(typeof fcb == typeof Function) {
					fcb(categoria);
				}
				banco.aguardandoRm();
			}
			request.onerror = function() {
				alerta.abrirErro("Erro ao realizar a transação do IndexedDB (banco de dados)");
				banco.aguardandoRm();
			}
			
			return true;
		}
	}
	
	this.getAll = function(usuario_id, fcb) {
		if(!regex(8, 1).test(usuario_id)) {
			if(regex(8, 1).test(usuario.getId())) {
				usuario_id = usuario.getId();
			} else {
				return false;
			}
		}
		banco.aguardandoAdd();
		usuario_id = parseInt(usuario_id);
		var tst = banco.getCon(0).transaction("Categoria");
		tst.onerror = function(event) {
			alerta.abrirErro("Erro ao realizar a transação do IndexedDB (banco de dados)");
			banco.aguardandoRm();
		}
		tst.onabort = function(event) {
			alerta.abrirErro("Erro ao realizar a transação do IndexedDB (banco de dados)");
			banco.aguardandoRm();
		}
		var os = tst.objectStore("Categoria");
		var keyRange = IDBKeyRange.only(usuario_id);
		var categoriaLista = new Array();
		var index = os.index("usuario_id");
		var categoria = new Categoria();
		index.openCursor(keyRange).onsuccess = function(event) {
			var cursor = event.target.result;
			if(cursor) {
				categoria = new Categoria();
				categoria.json(cursor.value);
				categoriaLista.push(categoria);
				cursor.continue();
			} else {
				if(typeof fcb == typeof Function) {
					fcb(categoriaLista);
				}
				banco.aguardandoRm();
			}
		}
		index.openCursor(keyRange).onerror = function() {
			alerta.abrirErro("Erro ao realizar a transação do IndexedDB (banco de dados)");
			banco.aguardandoRm();
		}
		
		return true;
	}
	
	this.sinc = function(usuario_id, fcb, fcbe) {
		if(usuario_id) {
			if(!regex(8, 1).test(usuario_id)) {
				return false;
			} else {
				usuario_id = parseInt(usuario_id, 10);
				// TODO
				// buscar os sites publicos do usuario_id aqui (getAllNaoLogado() talvez)
				
				return true;
			}
		} else {
			if(!regex(8, 1).test(usuario.getId())) {
				return false;
			} else {
				banco.aguardandoAdd();
				usuario_id = usuario.getId();
				fcbe = function(x) {
					// não testei para ver se isso da certo
					banco.aguardandoRm();
					return fcbe(x);
				}
				var hr = new HttpReq("post", pagina.getWs() + "categoria/getAllLogado", function(res) {
					res = JSON.parse(res);
					var resTmn = res.length;
					var categoriaLista = new Array();
					var categoria = new Categoria();
					var banco_Categoria = new Banco_Categoria();
					banco_Categoria.delAll(usuario_id, function() {
						for(var i = 0; i < resTmn; i++) {
							banco.aguardandoAdd();
							categoria = new Categoria();
							categoria.json(res[i]);
							categoriaLista.push(categoria);
							banco_Categoria.put(categoria, function() {
								banco.aguardandoRm();
							});
						}
						if(typeof fcb == typeof Function){
							fcb(categoriaLista);
						}
						banco.aguardandoRm();
					});
				}, fcbe);
				return hr.enviar("", true, false);
			}
		}
	}
}