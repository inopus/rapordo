function CompatibilidadeAntigo() {
	this.verificaVersao = function() {
		var httpReq = new HttpReq("post", pagina.getWs() + "compatibilidadeAntigo/verificaVersao", function(res) {
			if(usuario.getCompatibilidadeAntigo() != res) {
				
			}
		});
		httpReq.enviar("", true, false);
		return true;
	}
}