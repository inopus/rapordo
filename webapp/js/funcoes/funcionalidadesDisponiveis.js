function funcionalidadesDisponiveis() {
	var funcionalidadesDisponiveis = true;
	if(!window.Notification) {
		window.Notification = window.mozNotification || window.webkitNotification || window.msNotification;
		if(!window.Notification) {
			console.log("Não será possível utilizar a API de notificações (Notification).");
			window.Notification = undefined;
			funcionalidadesDisponiveis = false;
		} else {
			console.log("Será utilizado a tecnologia experimental da API de notificações (mozNotification / webkitNotification / msNotification).");
		}
	}
	if(!window.navigator.vibrate) {
		window.navigator.vibrate = window.navigator.mozVibrate || window.navigator.webkitVibrate || window.navigator.msVibrate;
		if(!window.navigator.vibrate) {
			console.log("Não será possível utilizar a API de vibração (vibrate).");
			window.navigator.vibrate = undefined;
			funcionalidadesDisponiveis = false;
		} else {
			console.log("Será utilizado a tecnologia experimental da API de vibração (mozVibrate / webkitVibrate / msVibrate).");
		}
	}
	if(window.navigator.cookieEnabled) {
		try {
			if(!window.localStorage) {
				window.localStorage = window.mozLocalStorage || window.webkitLocalStorage || window.msLocalStorage;
				if(!window.localStorage) {
					console.log("Não será possível utilizar a API de armazenamento local (localStorage).");
					window.localStorage = undefined;
					funcionalidadesDisponiveis = false;
				} else {
					console.log("Será utilizado a tecnologia experimental da API de armazenamento local (mozLocalStorage / webkitLocalStorage / msLocalStorage).");
				}
			}
		} catch(e) {
			funcionalidadesDisponiveis = false;
			console.log("Não será possível utilizar a API de armazenamento local (localStorage).");
		}
	} else {
		funcionalidadesDisponiveis = false;
		console.log("Não será possível utilizar funções e APIs de cookie para armazenamento local. Isso pode afetar funções como por exemplo localStorage e indexedDB.");
	}
	if(!window.indexedDB) {
		window.indexedDB = window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
		if(!window.indexedDB) {
			console.log("Não será possível utilizar a API de armazenamento local (indexedDB).");
			window.indexedDB = undefined;
			funcionalidadesDisponiveis = false;
		} else {
			console.log("Será utilizado a tecnologia experimental da API de armazenamento local (mozIndexedDB / webkitIndexedDB / msIndexedDB).");
		}
	}
	if(!window.IDBTransaction) {
		window.IDBTransaction = window.mozIDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
		if(!window.IDBTransaction) {
			console.log("Não será possível utilizar a API para manipulação do banco de dados local (IDBTransaction).");
			window.IDBTransaction = undefined;
			funcionalidadesDisponiveis = false;
		} else {
			console.log("Será utilizado a tecnologia experimental da API para manipulação do banco de dados local (mozIDBTransaction / webkitIDBTransaction / msIDBTransaction).");
		}
	}
	if(!window.IDBKeyRange) {
		window.IDBKeyRange = window.mozIDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
		if(!window.IDBKeyRange) {
			console.log("Não será possível utilizar a API para manipulação do banco de dados local (IDBKeyRange).");
			window.IDBKeyRange = undefined;
			funcionalidadesDisponiveis = false;
		} else {
			console.log("Será utilizado a tecnologia experimental da API para manipulação do banco de dados local (mozIDBKeyRange / webkitIDBKeyRange / msIDBKeyRange).");
		}
	}
	if(!window.IDBObjectStore) {
		window.IDBObjectStore = window.mozIDBObjectStore || window.webkitIDBObjectStore || window.msIDBObjectStore;
		if(!window.IDBObjectStore) {
			console.log("Não será possível utilizar a API para manipulação do banco de dados local (IDBObjectStore).");
			window.IDBObjectStore = undefined;
			funcionalidadesDisponiveis = false;
		} else {
			console.log("Será utilizado a tecnologia experimental da API para manipulação do banco de dados local (mozIDBObjectStore / webkitIDBObjectStore / msIDBObjectStore).");
		}
	}
	if(!window.IDBDatabase) {
		window.IDBDatabase = window.mozIDBDatabase || window.webkitIDBDatabase || window.msIDBDatabase;
		if(!window.IDBDatabase) {
			console.log("Não será possível utilizar a API para manipulação do banco de dados local (IDBDatabase).");
			window.IDBDatabase = undefined;
			funcionalidadesDisponiveis = false;
		} else {
			console.log("Será utilizado a tecnologia experimental da API para manipulação do banco de dados local (mozIDBDatabase / webkitIDBDatabase / msIDBDatabase).");
		}
	}
	if(IDBTransaction) {
		if(IDBTransaction.READ_WRITE) {
			console.log("A constante IDBTransaction.READ_WRITE está definida. Isso significa que talvez não seja possível escrever no IndexedDB, pois o Rapordo WebApp utiliza 'readwrite' ao invés de IDBTransaction.READ_WRITE (pois IDBTransaction.READ_WRITE que é depreciada)");
			funcionalidadesDisponiveis = false;
		}
	}
	if(!window.setTimeout) {
		window.setTimeout = setTimeout || window.mozSetTimeout || window.webkitSetTimeout || window.msSetTimeout;
		if(!window.setTimeout) {
			console.log("Não será possível utilizar a função setTimeout.");
			window.setTimeout = undefined;
			funcionalidadesDisponiveis = false;
		} else {
			console.log("Será utilizado a tecnologia experimental da função setTimeout (mozSetTimeout / webkitSetTimeout / msSetTimeout).");
		}
	}
	if(!window.setInterval) {
		window.setInterval = setInterval || window.mozSetInterval || window.webkitSetInterval || window.msSetInterval;
		if(!window.setInterval) {
			console.log("Não será possível utilizar a função setInterval.");
			window.setInterval = undefined;
			funcionalidadesDisponiveis = false;
		} else {
			console.log("Será utilizado a tecnologia experimental da função setInterval (mozSetInterval / webkitSetInterval / msSetInterval).");
		}
	}
	if(typeof document.getElementById("tela").firstChild == "undefined" || typeof document.getElementById("tela").removeChild == "undefined") {
		window.top.location = "indisponivel.html";
		funcionalidadesDisponiveis = false;
	}
	if(typeof document.getElementById("tela").remove != typeof Function) {
		Element.prototype.remove = function() {
			alert("Função remove() utilizada e não revisada.");
			this.parentElement.removeChild(this);
		}
		NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
			alert("Função remove() utilizada e não revisada.");
			for(var i = 0, len = this.length; i < len; i++) {
				if(this[i] && this[i].parentElement) {
					this[i].parentElement.removeChild(this[i]);
				}
			}
		}
		console.log("Element.remove(), NodeList.remove(), e HTMLCollection.remove() criados manualmente, mas não revisado.");
	}
	if(typeof document.getElementById("tela").empty != typeof Function) {
		Element.prototype.empty = function() {
			while(this.firstChild) this.removeChild(this.firstChild);
		}
		console.log("Element.empty() criado manualmente.");
	}
	if(typeof document.getElementsByTagName("body")[0].classList == "undefined") {
		// FIXME
		// criar o .add(), .remove() e (acho) toggle() dentro do classList na mão porque esta dando pau em navegadores que nao tem e isso eh basico
		// acho que se eu fizer isso eu consigo fazer rodar no IE 9 !!!!!!!
		window.top.location = "indisponivel.html";
		funcionalidadesDisponiveis = false;
	}
	
	document.getElementById("tela").style.display = "flex";
	if(document.getElementById("tela").style.display != "flex") {
		document.getElementById("tela").style.display = "-webkit-flex";
		if(document.getElementById("tela").style.display != "-webkit-flex") {
			document.getElementById("tela").style.display = "-moz-flex";
			if(document.getElementById("tela").style.display != "-moz-flex") {
				console.log("Valor 'flex', '-webkit-flex' ou '-moz-flex' (flex-box) para a propriedade 'display' não estão disponíveis.");
				funcionalidadesDisponiveis = false;
			}
		}
	}
	document.getElementById("tela").style.display = "none";
	
	if(window.history) {
		if(typeof window.history.replaceState != typeof Function) {
			console.log("Não será possível utilizar a API de manipulação do histórico de navegação.");
			funcionalidadesDisponiveis = false;
		}
	} else {
		console.log("Não será possível utilizar o histórico.");
		funcionalidadesDisponiveis = false;
	}
	
	if(!funcionalidadesDisponiveis) {
		window.alert("" + 
			"Aviso: O Rapordo WebApp não é compatível 100% com seu dispositivo. Por isso, algumas funcionalidades ou estilos do app podem não funcionar corretamente.\n\n" + 
			"Isso acontece devido a versão do seu dispositivo / navegador não estar de acordo com os padrões Web mais recentes.\n\n" + 
			"Para mais informações consulte a página Ajuda do Rapordo WebApp");
	} else {
		console.log("Seu navegador possui todas as funcionalidades utilizadas pelo Rapordo WebApp.");
	}
}