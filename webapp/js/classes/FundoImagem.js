function FundoImagem() {
	this.imgs = new Array("inicio.jpg");
	this.elemento = document.getElementById("tela");
	this.contador = 0;
	this.idInterval = undefined;
	
	this.construtor = function() {
		if(this.imgs.length == 1) {
			this.trocaFundo();
		} else if(this.imgs.length > 1) {
			this.trocaFundoAutomatico();
		}
	}
	
	this.trocaFundo = function() {
		// this.elemento.style.background = 'url("im/fundoImagem/' + this.imgs[this.contador] + '")';
		// this.elemento.style.backgroundSize = "100% 100%";
		// this.elemento.style.backgroundAttachment = "fixed";
		this.elemento.style.backgroundColor = "#1b6d8f";
		this.elemento.style.backgroundImage = "linear-gradient(#014a6a, #3084a7)";
		this.contador++;
		if(this.contador >= this.imgs.length) {
			this.contador = 0;
		}
	}
	
	this.trocaFundoAutomatico = function() {
		this.trocaFundo();
		this.idInterval = window.setInterval(function() {
			fundoImagem.trocaFundo(fundoImagem.contador);
		}, 12000);
	}
	
	this.trocaFundoParar = function() {
		if(this.idInterval) {
			window.clearInterval(fundoImagem.idInterval)
		}
	}
	
	this.setImgs = function(i) {
		// FIXME
		// veriricar se "i" é um Array()
		this.imgs = i;
		return true;
	}
	
	this.construtor();
}