function Banco_SitePendencia() {
	this.add = function(site, fcb) {
		// FIXME
		// verificar se é um site válido
		
		if(!regex(8, 1).test(site.getUsuario_id())) {
			site.setUsuario_id(usuario.getId());
		}
		
		if(!regex(8, 1).test(site.getUsuario_id())) {
			console.log("Não é possível adicionar um site sem ele pertencer à um usuário");
			return false;
		} else {
			banco.aguardandoAdd();
			// site.id = undefined; // porque essa funcao eh soh para adicionar novos e o setId() nao é para aceitar undefined
			site.setId(undefined);
			var tst = banco.getCon(0).transaction("SitePendencia", "readwrite");
			tst.onerror = function(event) {
				alerta.abrirErro("Erro ao realizar a transação do IndexedDB (banco de dados)");
				banco.aguardandoRm();
			}
			tst.onabort = function(event) {
				alerta.abrirErro("Erro ao realizar a transação do IndexedDB (banco de dados)");
				banco.aguardandoRm();
			}
			var os = tst.objectStore("SitePendencia");
			var request = os.add(JSON.parse(site.jsonString()));
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
			var tst = banco.getCon(0).transaction("SitePendencia", "readwrite");
			tst.onerror = function(event) {
				alerta.abrirErro("Erro ao realizar a transação no IndexedDB (banco de dados)");
				banco.aguardandoRm();
			}
			tst.onabort = function(event) {
				alerta.abrirErro("Erro ao realizar a transação no IndexedDB (banco de dados)");
				banco.aguardandoRm();
			}
			var request = tst.objectStore("SitePendencia").delete(site.getId());
			request.onsuccess = function(event) {
				if(typeof fcb == typeof Function) {
					fcb(site);
				}
				banco.aguardandoRm();
			}
			request.onerror = function(event) {
				if(typeof fcb == typeof Function) {
					fcb(site);
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
					var banco_SitePendencia = new Banco_SitePendencia();
					banco_SitePendencia.del(lista[i], function(site) {
						if(site == undefined) {
							// vai mostrar a imagem abaixo o numero de vezes que falhar o del, mas como a mensagem ira aparecer uma vez, eu coloquei "alguns";
							alerta.abrirErro("Não foi possível apagar alguns sites. Tente novamente mais tarde. Se o erro persistir, comunique o administrador");
						}
						controle++;
						if(controle == listaTmn) {
							if(typeof fcb == typeof Function){
								console.log("lanco fcb()");
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
		var tst = banco.getCon(0).transaction("SitePendencia");
		tst.onerror = function(event) {
			// deixei tecnico o erro mesmo porque teoricamente não é para cair aqui.
			alerta.abrirErro("Erro ao realizar a transação do IndexedDB (banco de dados)");
			banco.aguardandoRm();
		}
		tst.onabort = function(event) {
			// deixei tecnico o erro mesmo porque teoricamente não é para cair aqui.
			alerta.abrirErro("Erro ao realizar a transação do IndexedDB (banco de dados)");
			banco.aguardandoRm();
		}
		var os = tst.objectStore("SitePendencia");
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
				fcb(siteLista);
				banco.aguardandoRm();
			}
		}
		index.openCursor(keyRange).onerror = function() {
			alerta.abrirErro("Erro ao realizar a transação do IndexedDB (banco de dados)");
			banco.aguardandoRm();
		}
		
		return true;
	}
}