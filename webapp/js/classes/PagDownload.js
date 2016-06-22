function PagDownload() {
	var manifest = undefined;
	
	this.contrutur = function() {
		this.montaPagHtml();
		// document.getElementById("download_baixar").addEventListener("click", function() {
			// download.baixar();
		// });
		// document.getElementById("download_instalar").addEventListener("click", function() {
			// download.instalar();
		// });
		setManifest(window.location.href.substring(0, window.location.href.lastIndexOf("/")) + "/manifest.webapp");
	}
	
	this.baixar = function() {
		window.open("http://rapordo.com/ws/download/baixar");
		return true;
	}
	
	this.instalar = function() {
		if('mozApps' in navigator) {
			download.instalarMoz();
		} else {
			alerta.abrirErro("Seu navegador não permite a instalação de aplicativos web em seu dispositivo.");
		}
	}
	
	this.instalarMoz = function() {
		// no Windows ta instalando, mas o icone fica a navezinha do ff (não sei isso é normal, eu achei que era para aparecer o icone)
		// no meu cel não está instalando
		var check = navigator.mozApps.checkInstalled(download.getManifest());
		check.onsuccess = function(event) {
			if(event.target.result) {
				alerta.abrirAviso("Você já possuí o aplicativo instalado nesse dispositivo.");
			} else {
				var install = navigator.mozApps.install(download.getManifest());
				install.onsuccess = function(event) {
					alerta.abrirAviso("Procure pelo Rapordo WebApp no seu dispositivo.<br>No Windows, procure no Menu Iniciar. No Firefox OS, procure na Home Screen.");
				};
				install.onerror = function() {
					alerta.abrirErro("Não foi possível concluir a instalação.");
					console.log("Erro na instalação: " + install.error.name);
				};
			}
		}
		check.onerror = function(event) {
			alerta.abrirErro("Não foi possível verificar se você já possuí o aplicativo.");
		}
	}
	
	this.getManifest = function() {
		return manifest;
	}
	
	var setManifest = function(mf) {
		manifest = mf;
		return true;
	}
	
	this.montaPagHtml = function() {
		pagina.getMain().empty();
		var div = document.createElement("div");
		div.setAttribute("class", "limitaLargura fundo");
		var h1 = document.createElement("h1");
		var txt = document.createTextNode("Download");
		h1.appendChild(txt);
		div.appendChild(h1);
		var p = document.createElement("p");
		txt = document.createTextNode("No momento, o único meio de utilizar o Rapordo é através do WebApp disponível em http://rapordo.com.");
		p.appendChild(txt);
		div.appendChild(p);
		p = document.createElement("p");
		txt = document.createTextNode("Você pode curtir a página do ");
		p.appendChild(txt);
		a = document.createElement("a");
		a.setAttribute("href", "https://fb.com/rapordo.oficial");
		a.setAttribute("title", "Acessar a página do Rapordo no Facebook");
		a.setAttribute("target", "_blank");
		txt = document.createTextNode("Rapordo no Facebook");
		a.appendChild(txt);
		p.appendChild(a);
		txt = document.createTextNode(" e acompanhar dicas e novidades sobre o Rapordo!");
		p.appendChild(txt);
		div.appendChild(p);
		pagina.getMain().appendChild(div);
	}
	
	this.getTitle = function() {
		return "Download";
	}
	
	this.contrutur();
}