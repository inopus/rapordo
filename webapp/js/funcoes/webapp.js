function webapp() {
	carregando = new Carregando();
	usuario = new Usuario();
	pagina = new Pagina("preInicio", "menu_principal");
	hrefToClick();
	alerta = new Alerta();
	fundoImagem = new FundoImagem();
	banco = new Banco();
	
	// window.applicationCache.addEventListener("error", function(e) {
	  // alert("Error fetching manifest: a good chance we are offline");
	// });
	
	window.addEventListener("popstate", function(event) {
		if(pagina.historico.length == pagina.historicoTmnCache) {
			// window.location.href = "WebApp.html?" + pagina.historicoGet(pagina.historico.length - 2);
			// window.location.href = "WebApp.html";
		}
		pagina.historicoTmnCache = pagina.historico.length;
	});
	
	pagina.setCabecalhoY(document.getElementById("cabecalho").offsetHeight);
	document.getElementById("tela").style.paddingTop = pagina.getCabecalhoY() + "px";
	document.getElementById("cabecalho").style.top = "0px";
	window.addEventListener("scroll", function(event) {
		if(pagina.getScrollYCache() > pagina.getScrollY() || pagina.getScrollY() <= 4 || pagina.getScrollY() >= (pagina.getScrollYMax() - 4)) {
			pagina.cabecalhoAbrir();
		} else {
			pagina.cabecalhoFechar();
		}
		pagina.setScrollYCache(pagina.getScrollY());
	});
	
	document.getElementById("tela").addEventListener("mousedown", function(event) {
		var pageX = parseInt(event.pageX);
		if(pageX > 1) { // precisei fazer esse IF porque o Chrome eh bugado e quando fecha um <select> ele retorna o pageX 0 ai mudava a pagina
			pagina.setCoordenadaDrogX(pageX);
		}
	});
	document.getElementById("tela").addEventListener("mouseup", function(event) {
		var pageX = parseInt(event.pageX);
		if(pageX > 1) { // precisei fazer esse IF porque o Chrome eh bugado e quando fecha um <select> ele retorna o pageX 0 ai mudava a pagina
			if((pageX - 400) > pagina.getCoordenadaDrogX()) {
				// pagina.abrirPaginasAtras();
			} else if((pageX + 400) < pagina.getCoordenadaDrogX()) {
				// pagina.abrirPaginasFrente();
			}
		}
	});
	document.getElementById("tela").addEventListener("touchstart", function(event) {
		// var pageX = 0;
		// if(event.targetTouches != undefined) {
			// pageX = event.targetTouches[0].pageX;
		// } else if(event.originalEvent != undefined) {
			// pageX = event.originalEvent[0].pageX;
		// } else {
			// pageX = event.changedTouches[0].pageX;
		// }
		
		pagina.setCoordenadaDrogX(parseInt(event.changedTouches[0].pageX));
	});
	document.getElementById("tela").addEventListener("touchend", function(event) {
		// var pageX = 0;
		// if(event.targetTouches != undefined) {
			// pageX = event.targetTouches[0].pageX;
		// } else if(event.originalEvent != undefined) {
			// pageX = event.originalEvent[0].pageX;
		// } else {
			// pageX = event.changedTouches[0].pageX;
		// }
		
		if((parseInt(event.changedTouches[0].pageX) - 180) > pagina.getCoordenadaDrogX()) {
			pagina.abrirPaginasAtras();
		} else if((parseInt(event.changedTouches[0].pageX) + 180) < pagina.getCoordenadaDrogX()) {
			pagina.abrirPaginasFrente();
		}
	});
	
	document.getElementById("cabecalho_logo_escrito").addEventListener("click", function() {
		if(typeof new Object() == typeof usuario) {
			if(usuario.getId() == "" || usuario.getId() == undefined) {
				pagina.abrirPaginas("preInicio");
			} else {
				pagina.abrirPaginas("sites");
			}
		} else {
			pagina.usuarioSair();
		}
	});
	
	if(window.localStorage.getItem("tela_zoom") == undefined) {
		pagina.setZoom(100);
	} else {
		pagina.setZoom(window.localStorage.getItem("tela_zoom"));
	}
	
	if(window.Notification) {
		window.Notification.requestPermission();
	}
	
	// document
	// createElement
	// createTextNode
	// appendChild
	// setAttribute
	// pagina
	// getMain
	// addEventListener
	// undefined
	// length
}