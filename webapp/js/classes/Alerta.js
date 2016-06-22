function Alerta() {
	var ele = undefined;
	var eleMsg = document.getElementById("alertaMensagem");
	var idTimeout = 0;
	
	this.construtor = function() {
		ele = document.createElement("div");
		ele.setAttribute("id", "alerta");
		document.getElementsByTagName("body")[0].appendChild(ele);
		eleMsg = document.createElement("p");
		eleMsg.setAttribute("id", "alertaMensagem");
		ele.appendChild(eleMsg);
		
		ele.addEventListener("click", function() {
			alerta.fechar();
		});
		
		ele.addEventListener("mouseover", function() {
			window.clearTimeout(alerta.publicGetIdTimeout());
		});
	}
	
	this.abrirSucesso = function(msg, timeout) {
		eleMsg.classList.remove("erro");
		eleMsg.classList.remove("aviso");
		eleMsg.classList.remove("atencao");
		eleMsg.classList.add("sucesso");
		abrir(msg, timeout);
	}
	
	this.abrirAviso = function(msg, timeout) {
		eleMsg.classList.remove("erro");
		eleMsg.classList.remove("atencao");
		eleMsg.classList.remove("sucesso");
		eleMsg.classList.add("aviso");
		abrir(msg, timeout);
	}
	
	this.abrirAtencao = function(msg, timeout) {
		eleMsg.classList.remove("erro");
		eleMsg.classList.remove("aviso");
		eleMsg.classList.remove("sucesso");
		eleMsg.classList.add("atencao");
		abrir(msg, timeout);
	}
	
	this.abrirErro = function(msg, timeout) {
		eleMsg.classList.remove("erro");
		eleMsg.classList.remove("aviso");
		eleMsg.classList.remove("atencao");
		eleMsg.classList.add("erro");
		abrir(msg, timeout);
		if(window.navigator.vibrate) {
			window.navigator.vibrate([800]);
		}
	}
	
	var abrir = function(msg, timeout) {
		if(getIdTimeout() != 0) {
			window.clearTimeout(getIdTimeout());
			setIdTimeout(0);
		}
		if(timeout == undefined || timeout <= 0) {
			timeout = 8000;
		}
		eleMsg.innerHTML = msg;
		ele.style.top = "0";
		alerta.getEle().style.display = "block";
		setIdTimeout(window.setTimeout(function() {
			alerta.fechar();
		}, timeout));
	}
	
	var setIdTimeout = function(sit) {
		idTimeout = parseInt(sit);
		return true;
	}
	
	this.publicSetIdTimeout = function(sit) {
		// gambi
		return setIdTimeout(sit);
	}
	
	var getIdTimeout = function() {
		return idTimeout;
	}
	
	this.publicGetIdTimeout = function() {
		// gambi
		return getIdTimeout();
	}
	
	this.fechar = function() {
		ele.style.top = "-100%";
		window.setTimeout(function() {
			alerta.publicSetIdTimeout(0);
			if(alerta.getEle().style == "-100%") {
				alerta.getEle().style.display = "none"; // tem que fazer isso porque quando vira o celular o ele fica aparecendo.
			}
		}, 750);
	}
	
	this.getEle = function() {
		return ele;
	}
	
	this.construtor();
}