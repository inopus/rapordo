function Carregando() {
	this.elemento = undefined;
	this.btnFechar = undefined;
	this.msg = undefined;
	this.msgTxt = undefined;
	this.msgTxtTempoEsgotado = undefined;
	this.idInterval = undefined;
	this.tempoEsgotado = undefined;
	this.contadorMsg = undefined;
	this.btnFecharTxt = undefined;
	
	this.construtor = function() {
		this.elemento = document.createElement("div");
		this.elemento.setAttribute("id", "telaCarregando");
		document.getElementsByTagName("body")[0].appendChild(this.elemento);
		this.msg = document.createElement("p");
		this.msg.setAttribute("id", "telaCarregandoMsg");
		this.msgTxt = document.createTextNode("Carregando...");
		this.msg.style.fontSize = "1.6em";
		this.msg.appendChild(this.msgTxt);
		this.elemento.appendChild(this.msg);
		this.contadorMsg = document.createElement("p");
		this.contadorMsg.setAttribute("id", "telaCarregandoContadorMsg");
		this.elemento.appendChild(this.contadorMsg);
		this.btnFechar = document.createElement("button");
		this.btnFechar.setAttribute("id", "telaCarregandoBtnFechar");
		this.btnFechar.classList.add("btn");
		this.btnFechar.classList.add("btnVermelho");
		this.btnFecharTxt = document.createTextNode("Fechar");
		this.btnFechar.appendChild(this.btnFecharTxt);
		this.elemento.appendChild(this.btnFechar);
		
		if(this.elemento) {
			this.btnFecharDesativar();
		} else {
			console.log("Elemento 'carregando' não encontrado.");
			alert("Elemento 'carregando' não encontrado.");
		}
		this.btnFechar.addEventListener("click", function() {
			carregando.fechar();
		});
	}
	
	this.abrir = function(tempoEsgotadoM, tempoEsgotadoMsg) { // M de milisecundos
		if(this.idInterval != undefined) {
			this.fechar();
		}
		this.msgAlterar("Carregando...");
		if(tempoEsgotadoM != undefined) {
			this.tempoEsgotado = tempoEsgotadoM / 1000;
		}
		this.btnFecharDesativar();
		this.elemento.style.display = "block";
		if(this.tempoEsgotado > 0) {
			if(tempoEsgotadoMsg != undefined) {
				this.msgTxtTempoEsgotado = tempoEsgotadoMsg;
			} else {
				this.msgTxtTempoEsgotado = undefined;
			}
			this.contador();
		} else {
			this.tempoEsgotado = undefined;
			this.contadorMsg.innerHTML = "";
		}
		return true;
	}
	
	this.btnFecharAtivar = function() {
		this.btnFechar.style.display = "inline-block";
		return true;
	}
	
	this.btnFecharDesativar = function() {
		this.btnFechar.style.display = "none";
		return true;
	}
	
	this.contador = function() {
		if(this.tempoEsgotado != undefined) {
			this.idInterval = window.setInterval(function() {
				carregando.tempoEsgotado--;
				carregando.contadorMsg.innerHTML = "(" + carregando.tempoEsgotado + ")";
				if(carregando.tempoEsgotado <= 0) {
					carregando.terminar();
				}
			}, 1000);
			this.contadorMsg.innerHTML = "(" + this.tempoEsgotado + ")";
		} else {
			this.contadorMsg.innerHTML = "";
		}
		return true;
	}
	
	this.fechar = function() {
		this.elemento.style.display = "none";
		this.terminar();
		return true;
	}
	
	this.msgAlterar = function(m) {
		// this.msgTxt.remove();
		this.msg.empty();
		this.msgTxt = document.createTextNode(m);
		this.msg.appendChild(this.msgTxt);
		return true;
	}
	
	this.terminar = function(fcb) {
		if(this.idInterval != undefined) {
			window.clearInterval(carregando.idInterval);
			this.idInterval = undefined;
		}
		carregando.contadorMsg.innerHTML = "";
		carregando.btnFecharAtivar();
		if(carregando.msgTxtTempoEsgotado != undefined) {
			carregando.msgAlterar(carregando.msgTxtTempoEsgotado);
		} else {
			carregando.msgAlterar("");
		}
		carregando.tempoEsgotado = undefined;
		if(typeof fcbe == typeof Function){
			fcb();
		}
	}
	
	this.construtor();
}