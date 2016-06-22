function Banco_Site() {
	this.put = function(site, fcb) {
		// FIXME
		// verificar se é um site válido
		
		if(!regex(8, 1).test(site.getUsuario_id())) {
			site.setUsuario_id(usuario.getId());
		}
		
		if(!regex(8, 1).test(site.getUsuario_id())) {
			return false;
		} else {
			banco.aguardandoAdd();
			var tst = banco.getCon(0).transaction("Site", "readwrite");
			tst.onerror = function(event) {
				alerta.abrirErro("Erro ao realizar a transação do IndexedDB (banco de dados)");
				banco.aguardandoRm();
			}
			tst.onabort = function(event) {
				alerta.abrirErro("Erro ao realizar a transação do IndexedDB (banco de dados)");
				banco.aguardandoRm();
			}
			var os = tst.objectStore("Site");
			var request = os.put(JSON.parse(site.jsonString()));
			request.onerror = function(event) {
				// FIXME
				// Não está caindo aqui quando da errado o put(), fiz vários testes do chrome o no ff 
				// e não consegui fazer entrar aqui da a mensagem
				// "Failed to execute 'put' on 'IDBObjectStore': Evaluating the object store's key path did not yield a value."
				// no console mas, mas não chama essa função e segundo o que eu li deveria chamar.
				alerta.abrirErro("Erro ao inserir o site no IndexedDB (banco de dados)");
				banco.aguardandoRm();
			}
			request.onsuccess = function(event) {
				if(typeof fcb == typeof Function){
					if(site.setId(event.target.result)) {
						fcb(site);
					} else {
						alerta.abrirErro("Erro desconhecido");
					}
				}
				banco.aguardandoRm();
			}
			return true;
		}
	}
	
	this.del = function(site, fcb) {
		if(regex(8, 1).test(site.getId())) {
			banco.aguardandoAdd();
			var tst = banco.getCon(0).transaction("Site", "readwrite");
			tst.onerror = function(event) {
				alerta.abrirErro("Erro ao realizar a transação no IndexedDB (banco de dados local)");
				banco.aguardandoRm();
			}
			tst.onabort = function(event) {
				alerta.abrirErro("Erro ao realizar a transação no IndexedDB (banco de dados local)");
				banco.aguardandoRm();
			}
			var request = tst.objectStore("Site").delete(site.getId());
			request.onsuccess = function(event) {
				if(typeof fcb == typeof Function){
					fcb(site);
				}
				banco.aguardandoRm();
			}
			request.onerror = function(event) {
				console.log("Erro ao deletar um item do banco de dados local.");
				if(typeof fcb == typeof Function){
					fcb(undefined);
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
					var banco_Site = new Banco_Site();
					banco_Site.del(lista[i], function(site) {
						if(site == undefined) {
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
			// FIXME
			// Nao posso deixar buscar um site que nao seja o do usuario logado
			// mas tb nao sei o que isso impacta no que eu ja fiz
			
			banco.aguardandoAdd();
			id = parseInt(id);
			var tst = banco.getCon(0).transaction("Site");
			tst.onerror = function(event) {
				alerta.abrirErro("Erro ao realizar a transação do IndexedDB (banco de dados)");
				banco.aguardandoRm();
			}
			tst.onabort = function(event) {
				alerta.abrirErro("Erro ao realizar a transação do IndexedDB (banco de dados)");
				banco.aguardandoRm();
			}
			var os = tst.objectStore("Site");
			var site = new Site();
			var request = os.get(id);
			request.onsuccess = function(event) {
				var cursor = event.target.result;
				if(cursor) {
					site.json(cursor);
				} else {
					site = undefined;
				}
				if(typeof fcb == typeof Function) {
					fcb(site);
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
		var tst = banco.getCon(0).transaction("Site");
		tst.onerror = function(event) {
			alerta.abrirErro("Erro ao realizar a transação do IndexedDB (banco de dados)");
			banco.aguardandoRm();
		}
		tst.onabort = function(event) {
			alerta.abrirErro("Erro ao realizar a transação do IndexedDB (banco de dados)");
			banco.aguardandoRm();
		}
		var os = tst.objectStore("Site");
		var keyRange = IDBKeyRange.only(usuario_id);
		var siteLista = new Array();
		var index = os.index("usuario_id");
		var site = new Site();
		index.openCursor(keyRange).onsuccess = function(event) {
			var cursor = event.target.result;
			if(cursor) {
				site = new Site();
				site.json(cursor.value);
				siteLista.push(site);
				cursor.continue();
			} else {
				if(typeof fcb == typeof Function) {
					fcb(siteLista);
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
	
	this.registraAcesso = function(site_id, fcb) {
		// TODO
		// Eu tenho que executar esse fcb, mas por enquanto eu não uso ele então nao pensei ainda.
		var site = new Site();
		if(site.setId(site_id)) {
			return this.get(site.getId(), function(site) {
				if(site) {
					if(site.setAcessos(site.getAcessos() + 1)) {
						var banco_Site = new Banco_Site(); // nao testei se funciona com um this, mas eu acho que nao
						banco_Site.put(site);
					}
				}
			});
		} else {
			return false;
		}
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
				var hr = new HttpReq("post", pagina.getWs() + "site/getAllLogado", function(res) {
					res = JSON.parse(res);
					var resTmn = res.length;
					var siteLista = new Array();
					var site = new Site();
					var banco_Site = new Banco_Site();
					banco_Site.delAll(usuario_id, function() {
						for(var i = 0; i < resTmn; i++) {
							banco.aguardandoAdd();
							site = new Site();
							site.json(res[i]);
							siteLista.push(site);
							banco_Site.put(site, function() {
								banco.aguardandoRm();
							});
						}
						if(typeof fcb == typeof Function){
							fcb(siteLista);
						}
						banco.aguardandoRm();
					});
				}, fcbe);
				return hr.enviar("", true, false);
			}
		}
	}
}