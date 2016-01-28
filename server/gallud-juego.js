function Juego(){
	this.nombre="juego";
	this.fase="Inicial";
	this.getUid=function(){
		val= (new Date()).valueOf().toString();
		console.log(val);
		return val;
	}
	this.nuevoJugador=function(usr){
		usr.uid=this.getUid();
		console.log("nuevo jugador: "+usr.nombre+" uid: "+usr.uid);
	}
}

function Usuario(nombre){
	this.nombre=nombre;
	this.ficha="green";
	this.uid=undefined;
}

module.exports.Juego=Juego;
module.exports.Usuario=Usuario;