window.addEventListener("load", function() {
	// consoleToAlert();
	
	funcionalidadesDisponiveis();
	
	webapp();
	
	pagina.wsAlterar();
	
	window.setTimeout(function() {
		document.getElementById("tela").style.display = "block";
	}, 750);
	
	// para ficar menos chato em dev
	// window.setTimeout(function() {
		// pagina.abrirPaginas("sitesEditarEdicao", 10025);
	// }, 1200);
});