function Banco() {
	this.aguardando = 0;
	this.updateCount = 0;
	var db = new Array();
	this.idIntervalAguardando = 0;
	
	if(window.indexedDB) {
		// C:\Users\305623\AppData\Roaming\Mozilla\Firefox\Profiles\90fa1sf2.default-1410617387304\storage\persistent\file++++E++rapordo+servidor+webapp+index.html\idb
		this.construtor = function() {
			var request = window.indexedDB.open("rapordo", 297);
			request.onsuccess = function(event) {
				banco.setCon(0, event.target.result);
				if(!(banco.getCon(0).version > 3)) {
					window.top.location = "indisponivel.html";
				}
				
				// isso aqui ta aqui porque se eu troco para o autenticado e o banco nao terminou de iniciar da pau
				if(usuario.getId() != "") {
					pagina.alteraConfig("autenticado");
				} else {
					pagina.alteraConfig("naoAutenticado");
				}
				carregando.fechar();
			}
			request.onupgradeneeded = function(event) {
				banco.setCon(0, event.target.result);
				var jaExiste_Site = false;
				var jaExiste_SitePendencia = false;
				var jaExiste_Categoria = false;
				var osn = banco.getCon(0).objectStoreNames;
				var osnTmn = banco.getCon(0).objectStoreNames.length;
				for(var i = 0; i < osnTmn; i++) {
					if(osn[i] == "Site") {
						jaExiste_Site = true;
					} else if(osn[i] == "SitePendencia") {
						jaExiste_SitePendencia = true;
					} else if(osn[i] == "Categoria") {
						jaExiste_Categoria = true;
					}
				}
				if(jaExiste_Site) {
					banco.getCon(0).deleteObjectStore("Site");
					jaExiste_Site = false;
				}
				if(!jaExiste_Site) {
					var os = banco.getCon(0).createObjectStore("Site", { keyPath: "id" });
					os.createIndex("usuario_id", "usuario_id", { unique: false });
				}
				if(jaExiste_SitePendencia) {
					banco.getCon(0).deleteObjectStore("SitePendencia");
					jaExiste_SitePendencia = false;
				}
				if(!jaExiste_SitePendencia) {
					var os = banco.getCon(0).createObjectStore("SitePendencia", { keyPath: "id", autoIncrement: true });
					os.createIndex("usuario_id", "usuario_id", { unique: false });
				}
				if(jaExiste_Categoria) {
					banco.getCon(0).deleteObjectStore("Categoria");
					jaExiste_Categoria = false;
				}
				if(!jaExiste_Categoria) {
					var os = banco.getCon(0).createObjectStore("Categoria", { keyPath: "id" });
					os.createIndex("usuario_id", "usuario_id", { unique: false });
				}
			}
			request.onerror = function(event) {
				if(banco.getCon(0)) {
					alert('Erro 001: Por favor, forneça o "User-Agent" que aparecerá na tela para o administrador do sistema. Dessa forma podemos sempre aprimorar o WebApp para todos. Obrigado!"');
					window.top.location = "indisponivel.html";
				} else {
					window.top.location = "modoAnonimo.html";
				}
			}
			request.onblocked = function(event) {
				if(banco.getCon(0)) {
					alert("Uma nova versão do banco de dados do WebApp está disponível. Por favor, feche todas as abas/janelas do Rapordo WebApp e recarregue esta página para atualizar o seu WebApp.");
				} else {
					window.top.location = "indisponivel.html";
				}
			}
		}
		
		this.getCon = function(tipo) {
			if(tipo == 0) {
				return db[tipo];
			} else {
				return false;
			}
		}
		
		this.setCon = function(tipo, nDb) {
			if(tipo == 0) {
				db[tipo] = nDb;
				return true;
			} else {
				return false;
			}
		}
	} else {
		// TODO
		// Alternativa para quem não tem IndexedDB
		window.top.location = "indisponivel.html"; // isso é porque ainda não implementei nada para quem nao tem IndexedDB
	}
	this.aguardandoAdd = function() {
		this.aguardandoCarregando();
		this.aguardando++;
		return true;
	}
	
	this.aguardandoRm = function() {
		this.aguardando--;
		if(this.aguardando < 1) {
			this.aguardando = 0;
		}
		return true;
	}
	
	this.getAguardando = function() {
		return this.aguardando;
	}
	
	this.aguardandoCarregando = function() {
		if(this.getAguardando() == 0) {
			window.setTimeout(function() {
				if(banco.getAguardando() != 0 && banco.getIdIntervalAguardando() == 0) {
					carregando.abrir();
					banco.setIdIntervalAguardando(window.setInterval(function() {
						if(banco.getAguardando() == 0) {
							carregando.fechar();
							clearInterval(banco.getIdIntervalAguardando());
							// alerta.abrirAviso("Transação finalizada.");
							banco.setIdIntervalAguardando(0);
						}
						console.log("idIntervalAguardando: " + banco.getIdIntervalAguardando());
					}, 1400));
					// alerta.abrirAtencao("Dependendo da quantitade de dados e do seu dispositivo, essa transação pode demorar alguns minutos. Para evitar perda de dados, não feche esse App (Janela / Aba) até que a transação finalize.", 90000);
				}
			}, 700);
		}
	}
	
	this.getIdIntervalAguardando = function() {
		return this.idIntervalAguardando;
	}
	
	this.setIdIntervalAguardando = function(id) {
		this.idIntervalAguardando = id;
		return true;
	}
	
	this.construtor();
}