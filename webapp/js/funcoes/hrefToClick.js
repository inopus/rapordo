function hrefToClick() {
	var hrefToClick = document.getElementsByClassName("hrefToClick");
	var hrefToClickTam = hrefToClick.length;
	
	for(var i = 0; i < hrefToClickTam; i++) {
		(function(x) {
			hrefToClick[i].addEventListener("click", function() {
				pagina.abrirPaginas(x);
			});
		})(hrefToClick[i].href.split("#")[1]);
	}
}