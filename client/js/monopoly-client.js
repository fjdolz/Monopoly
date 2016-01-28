var url="http://localhost:1337/";

var socket =io();

socket.on('connection', function(socket){
	socket.emit('mensaje', {text: 'Bienvenido.'});
});	
	socket.on('turno', function(data){
		
		var sesion=obtenerCookie();
		if (data.uid==sesion) {
			//document.getElementById(mensajes).innerHTML = "";
			// $('#mensajes').scrollTo($("#mensajes").height());
			$("#mensajes").append('<p style="color:#F00; font-weight: bold;">ES TU TURNO, TE TOCA TIRAR</p>');
			$("#mensajes").animate({ scrollTop: $('#mensajes')[0].scrollHeight}, 1000);
		}
		else {
			
			$("#mensajes").append('<p> ' + data.text + ' ' + data.turno + ' </p>');
			$("#mensajes").animate({ scrollTop: $('#mensajes')[0].scrollHeight}, 1000);
		
		}
	});
	
	socket.on('mensaje', function(data){
		//  $("#mensajes").append('<p> ' + data.text + ':' + data.turno + ' </p>');
	//	$("#mensajes").remove();
		
		$("#mensajes").append('<p> ' + data.text + ' </p>');
		$("#mensajes").animate({ scrollTop: $('#mensajes')[0].scrollHeight}, 1000);
		
	}); 
 
	socket.on('compra', function(data){
		//  $("#mensajes").append('<p> ' + data.text + ':' + data.turno + ' </p>');
		//$("#mencompra").remove();
		
		$("#mensajes").append('<p >La Ficha ' + data.ficha+ ',' + data.text +':'+ data.calle + ' </p>');
		$("#mensajes").animate({ scrollTop: $('#mensajes')[0].scrollHeight}, 1000);
	}); 

	socket.on('alquiler', function(data){
		
		var sesion=obtenerCookie();
		if (data.duenio==sesion) {
			
			$("#mensajes").append('<p style="color:#009;">' + data.text +':'+ data.calle + ' </p>');
			$("#mensajes").animate({ scrollTop: $('#mensajes')[0].scrollHeight}, 1000);
		}
		
			
	}); 
	socket.on('turnobancarota', function(data){
		
		var sesion=obtenerCookie();
		if (data.uid==sesion) {
			//document.getElementById(mensajes).innerHTML = "";
			// $('#mensajes').scrollTo($("#mensajes").height());
			$("#mensajes").append('<p style="color:#F00; font-weight: bold;">Un jugador a abandonado la partidaES TU TURNO, TE TOCA TIRAR</p>');
			$("#mensajes").animate({ scrollTop: $('#mensajes')[0].scrollHeight}, 1000);
		}
		else {
			
			$("#mensajes").append('<p>Un jugador ha abandonado la partida ' + data.text + ' ' + data.turno + ' </p>');
			$("#mensajes").animate({ scrollTop: $('#mensajes')[0].scrollHeight}, 1000);
		
		}
	});
	



function crearCookie(clave,valor){
	$.cookie(clave,valor);
	$.cookie()
}
function obtenerCookie(){
	var sesion=$.cookie('sesion');
return sesion
}

/*function iniciografico(){
	cargarTablero();
}*/


function inicio(){
	mostrarBotonPedirFicha();
	
	cargarTablero()
	cargarCoordenadas()
	

	
}

//Funciones para modificar el index.html


function mostrarBotonPedirFicha(){
	$("#botones").append("<p id='zonaPedir'>Nombre: <input type='text' id='nombre' /><button id='pedirBtn'>Pedir Ficha</button></p>");
	$('#pedirBtn').on("click",function(){	
		obtenerFicha($("#nombre").val());
	})
}

function quitarBotonPedir(){
	$("#zonaPedir").remove();
	$("#pedirBtn").remove();
	
	
}

function mostrarBotonMeToca(){
	$("#botones").append("<p id='zonaPedir'><button id='metoca'>Me toca</button></p>");
	$('#metoca').on("click",function(){	
		ComprobarTurno();
	})
}
function quitarBotonMeToca(){
	$("#metoca").remove();
}

function mostrarBotonJugar(){
	$("#botones").append("<p id='zonaPedir'><button id='Jugar'>Empezar a Jugar</button></p>");
	$('#Jugar').on("click",function(){	
		empezarJugar();
	})
}
function quitarBotonJugar(){
	$("#Jugar").remove();
}
function mostrarBotonComprar(){
	$("#botones").append("<p id='zonaPedir'><button id='Comprar'>Comprar</button></p>");
	$('#Comprar').on("click",function(){	
		ComprarPropiedad();
	})
}
function quitarBotonComprar(){
	$("#Comprar").remove();
} 

function mostrarBotonVender(){
	$("#botones").append("<p id='zonaPedir'><button id='Vender'>Vender</button></p>");
	$('#Vender').on("click",function(){	
		VenderPropiedad();
	})
}
function quitarBotonVender(){
	$("#Vender").remove();
} 
function mostrarBotonVenderCasa(){
	$("#botones").append("<p id='zonaPedir'><button id='VenderCasa'>Vender Casa</button></p>");
	$('#VenderCasa').on("click",function(){	
		VenderCasa();
	})
}
function quitarBotonVenderCasa(){
	$("#VenderCasa").remove();
}

function mostrarBotonEdificar(){
	$("#botones").append("<p id='zonaPedir'><button id='Edificar'>Edificar Casa</button></p>");
	$('#Edificar').on("click",function(){	
		ComprarCasa();
	})
}
function quitarBotonEdificar(){
	$("#Edificar").remove();
}
function mostrarBotonHotel(){
	$("#botones").append("<p id='zonaPedir'><button id='EdificarH'>Edificar Hotel</button></p>");
	$('#EdificarH').on("click",function(){	
		ComprarHotel();
	})
}
function quitarBotonHotel(){
	$("#EdificarH").remove();
} 
function mostrarBotonLanzar(){
	//$("#botones").append("<p id='zonaPedir'><button id='Lanzar'>Lanzar Dados</button></p>"
	$("#botones").append("<p id='zonaPedir'><button id='Lanzar'>Lanzar Dados</button></p>"+"<p id='zonaposicion'>posicion: <input type='text' id='posicion' /><button id='iracelda'>Ir A</button></p>");
	$('#Lanzar').on("click",function(){	
		tirarDados();	
	}) 
	$('#iracelda').on("click",function(){	
		IrAcelda($("#posicion").val());
	})

}

function mostrarBotonIrAcelda(){
	$("#botones").append("<p id='zonaposicion'>posicion: <input type='text' id='posicion' /><button id='iracelda'>Ir A</button></p>");
	$('#iracelda').on("click",function(){	
		IrAcelda($("#posicion").val());
	})
}

function quitarBotonLanzar(){
	$("#zonaposicion").remove();
	$("#Lanzar").remove();
	$("#iracelda").remove();
//	$("#zonaPedir").remove();
} 


function mostrarBotonPasarTurno(){
	$("#botones").append("<p id='zonaPedir'><button id='Pasar'>Pasar turno</button></p>");
	$('#Pasar').on("click",function(){	
		PasarTurno();		
	}) 
}

function quitarBotonPasar(){
	$("#Pasar").remove();
} 
function mostrarDatosJugador(nombre,color,uid){
	
	mostrarNombre(nombre);
	mostrarFicha(color);
	mostrarUid(uid);
}
function eliminarDatosJugadores(){
	$("#nombre").remove();
	$("#Ficha").remove();
	$("#uid").remove(); 
	$("#mensaje").remove();
	
}
function mostrarNombre(nombre){
//	$("#nombre").remove();
	$("#resultados").append("<p id='nombre'>Nombre: "+nombre+"</p>");
	$("#resultados").animate({ scrollTop: $('#resultados')[0].scrollHeight}, 1000);
}

function mostrarFicha(color){
	$("#resultados").append("<p id='Ficha'>Ficha: "+color+" </p>");
	$("#resultados").animate({ scrollTop: $('#resultados')[0].scrollHeight}, 1000);
}

function mostrarTurno(Turno){
	//var sesion=obtenerCookie()
	$("#resultados").append("<p id='presentacion'>Bienvenidos a esta Partida </p>");
	$("#resultados").append("<p id='presentacion'>EL turno es para la ficha: "+Turno+"</p>");
	$("#resultados").animate({ scrollTop: $('#resultados')[0].scrollHeight}, 1000);
	
	
	
}
function mostrarTirada(Turno,Tirada,Posicion,Saldo){
	$("#presentacion").remove();
	$("#presentacion").remove();
	$("#turno").remove();
	$("#mensaje").remove();
	$("#resultados").append("<p id='turno'>Turno: "+Turno+" Tirada:"+Tirada+" Posicion:"+Posicion+" Saldo:"+Saldo+"</p>");
	$("#resultados").animate({ scrollTop: $('#resultados')[0].scrollHeight}, 1000);
	
}
function mostrarCompra(ficha,calle){
	$("#turno").remove();
	$("#compra").remove();
	$("#mensaje").remove();
	$("#resultados").append("<p id='compra'>Acabas de comprar la calle: "+calle+"</p>");
	$("#resultados").animate({ scrollTop: $('#resultados')[0].scrollHeight}, 1000);
}
function mostrarVenta(ficha,calle){
	$("#turno").remove();
	$("#compra").remove();
	$("#mensaje").remove();
	$("#resultados").append("<p id='compra'>Acabas de vender la calle: "+calle+"</p>");
	$("#resultados").animate({ scrollTop: $('#resultados')[0].scrollHeight}, 1000);
}
function mostrarVentaCasa(ficha,calle){
	$("#turno").remove();
	$("#compra").remove();
	$("#mensaje").remove();
	$("#resultados").append("<p id='compra'>Has vendido una casa de la calle: "+calle+"</p>");
	$("#resultados").animate({ scrollTop: $('#resultados')[0].scrollHeight}, 1000);
}
function mostrarUid(uid){
	//$("#uid").remove();
	$("#resultados").append("<p id='uid'>uid: "+uid+"</p>");	
}

function mostrarmensaje(mensaje){
	$("#resultados").append("<p id='mensaje'>"+mensaje+"</p>");
	$("#resultados").animate({ scrollTop: $('#resultados')[0].scrollHeight}, 1000);
}

//Funciones para comunicar con el servidor



function PasarTurno(){
	$.getJSON(url+"pasarturno/",function(data){
		mostrarBotonMeToca();
	//	mostrarBotonLanzar();
		quitarBotonPasar();
		quitarBotonComprar();
		quitarBotonVender();
		quitarBotonEdificar();
		$("#compra").remove();
		eliminarDatosJugadores();
		
	//	socket.emit('mensaje', {text: 'pasando turno'});
	})
	
	
}

function ComprarPropiedad(){
	$.getJSON(url+"comprartitulo/",function(data){
		mostrarCompra(data.Ficha,data.Calle);
		quitarBotonComprar();
		quitarBotonVender();
		quitarBotonEdificar();
		//cargardatos(data.Calle,data.Colorcalle,data.Tipo)
		cargardatos(data.Propiedades)
		

		
	})
}

function VenderPropiedad(){
	$.getJSON(url+"vendertitulo/",function(data){
		
		mostrarVenta(data.Ficha,data.Calle);
		quitarBotonVender();
		quitarBotonEdificar();
		if (!data.Vendercasas)
			mostrarbotonVenderCasa();
		//cargardatos(data.Calle,data.Colorcalle,data.Tipo)
		cargardatos(data.Propiedades)
		

		
	})
}
function VenderCasa(){
	$.getJSON(url+"vendercasa/",function(data){
		mostrarVentaCasa(data.Ficha,data.Calle);
		quitarBotonVender();
		quitarBotonVenderCasa();
		quitarBotonEdificar();
		
		
		

		
	})
}

function ComprarCasa(){
	$.getJSON(url+"comprarcasa/",function(data){
		//mostrarCompra(data.Ficha,data.Calle);
		quitarBotonEdificar();
		quitarBotonPasar();
		mostrarBotonLanzar();
		quitarBotonVender();
		
		if(data.Edificacion==3)
			mostrarBotonHotel();
		console.log("edificas una casa")
		mostrarmensaje(data.Mensaje)
		
	})
}

function ComprarHotel(){
	$.getJSON(url+"comprarhotel/",function(data){
		//mostrarCompra(data.Ficha,data.Calle);
		quitarBotonEdificar();
		quitarBotonPasar();
		quitarBotonHotel();
		//mostrarBotonLanzar();
		
		console.log("edificas un hotel")
		mostrarmensaje(data.Mensaje)
		
	})
}
function IrAcelda(posicion) {
	$.getJSON(url+"moveracelda/"+posicion,function(data){
	if (data.Estado=="normal"){
		var repetir=0
		mostrarTirada(data.Turno,data.Tirada,data.Posicion,data.Saldo);
		quitarBotonComprar();
		quitarBotonHotel()
		quitarBotonLanzar();
		quitarBotonVender();
		quitarBotonEdificar();
		mostrarmensaje(data.Mensaje);
		
		if (data.Comprar){

		//	quitarBotonLanzar();
			if (data.Dado1==data.Dado2){
				if (repetir==0){
					mostrarBotonComprar();
					mostrarBotonLanzar();
					
					repetir++
				}
				else {
					mostrarBotonLanzar();
					quitarBotonComprar();
				}
			}
			else {
				mostrarBotonPasarTurno();
				mostrarBotonComprar();
			}
		}
		
		else {
			if (data.Edificar){
				if (data.Dado1==data.Dado2){
					mostrarBotonLanzar();
					mostrarBotonEdificar();
					if (data.Vender==true)
						if (data.Vendercasa==true)
							mostrarBotonVenderCasa();
					else	
						mostrarBotonVender();
				}
				else{
					mostrarBotonPasarTurno();
					mostrarBotonEdificar();
					if (data.Vender==true)
						if (data.Vendercasa==true)
							mostrarBotonVenderCasa();
					else	
						mostrarBotonVender();
				}
			}//de data.casa
			else{
				mostrarBotonPasarTurno();
				if (data.Vender==true){
					if (data.Vendercasa==true)
						mostrarBotonVenderCasa();
				}	
				else 	
					mostrarBotonVender();
					
			}	
		}
		
		
		ponerFicha(data.Turno,data.Posicion,data.Tirada)
		
	}
	else
		if (data.Estado=="ganador") {
			mostrarmensaje("LA PARTIDA HA TERMINADO HAS GANADO");
			quitarBotonLanzar();
		}	
		else {
			mostrarmensaje("ESTAS EN BANCAROTA ABANDONAS LA PARTIDA");
			quitarBotonLanzar();
			
		}	
	})	
}
		
	
function tirarDados(){
	$.getJSON(url+"tirardados/",function(data){
		
	if (data.Estado=="normal"){
		var repetir=0
		mostrarTirada(data.Turno,data.Tirada,data.Posicion,data.Saldo);
		quitarBotonComprar();
		quitarBotonLanzar();
		quitarBotonHotel()
		quitarBotonVender();
		quitarBotonEdificar();
		mostrarmensaje(data.Mensaje);
		console.log("+++++++++++ tirada")
		console.log(data.Comprar)
		console.log(data.Dado1==data.Dado2)
		console.log("+++++++++++ tirada")
		if (data.Comprar){

		//	quitarBotonLanzar();
			if (data.Dado1==data.Dado2){
				if (repetir==0){
					mostrarBotonComprar();
					mostrarBotonLanzar();
					repetir++
				}
				else {
					mostrarBotonLanzar();
					quitarBotonComprar();
				}
			}
			else {
				mostrarBotonPasarTurno();
				mostrarBotonComprar();
			}
		}
		
		else {
			if (data.Edificar){
				if (data.Dado1==data.Dado2){
					mostrarBotonLanzar();
					mostrarBotonEdificar();
					if (data.Vender==true)
						mostrarBotonVender();
				}
				else{
					mostrarBotonPasarTurno();
					mostrarBotonEdificar();
					if (data.Vender==true)
						mostrarBotonVender();
				}
			}//de data.casa
			else{
				mostrarBotonPasarTurno();	
				if (data.Vender==true)
					mostrarBotonVender();
				
			}	
		}
		//if(!data.Carcel)
			ponerFicha(data.Turno,data.Posicion,data.Tirada)
	}
	else
		if (data.Estado=="ganador") {
			mostrarmensaje("LA PARTIDA HA TERMINADO HAS GANADO");
			quitarBotonLanzar();
		}
		else {
			mostrarmensaje("ESTAS EN BANCAROTA ABANDONAS LA PARTIDA");
			quitarBotonLanzar();
		}	
	})	
}
function empezarJugar(){

	$.getJSON(url+"comenzarjuego/",function(data){
		$("#nombre").remove();
		quitarBotonPedir();
	
	//	mostrarBotonLanzar();
		eliminarDatosJugadores();
		mostrarBotonMeToca();
		mostrarTurno(data.Turno); 
	//	cargarTablero()
	//	cargarCoordenadas()
		
	})
	
}

function ComprobarTurno(){
	
	$.getJSON(url+"probarturno/",function(data){
		
		var sesion=obtenerCookie()
		
		$("#mensaje").remove();
		$("#presentacion").remove();
		quitarBotonPasar();
		eliminarDatosJugadores()
		if (data.Uidturno==sesion){
			quitarBotonMeToca();
			mostrarBotonLanzar();
		//	mostrarBotonIrAcelda()
			mostrarmensaje("Es tu TURNO")
		}
		else
			mostrarmensaje("Todavia no es tu turno") 
	
			
	})
}
function obtenerFicha(nombre){
	
		$.getJSON(url+"unirsealjuego/"+nombre,function(data){
		//guardarCookies(data);
		//var nombre='sesion'+data.Ficha
		var nombre='sesion'	
		
		
		crearCookie(nombre,data.Uid);
		salidaficha(data.Ficha)
		quitarBotonPedir();
		
		if (data.estado=="Jugando")
			mostrarmensaje("La partida ha comenzado ya no puedes jugar,  sorry")
		else {
			if (data.empezar>=4)
				mostrarBotonJugar();
			else
				mostrarBotonMeToca();
		mostrarDatosJugador(data.Nombre,data.Ficha,data.Uid);
		mostrarmensaje(data.estado)
		}
		
	//	socket.emit('mensaje', {text: 'has entrado ya'});
	})

}

//funciones auxiliares

//function cargardatos(calle,colorcalle,tipo){
function cargardatos(propiedades){	
	

	$("#Marron").empty();
	$("#AzulCielo").empty();
	$("#Rosa").empty();
	$("#Naranja").empty();
	$("#Rojo").empty();
	$("#Amarillo").empty();
	$("#Verde").empty();
	$("#AzulOscuro").empty();
	$("#Compania").empty();
	$("#Estacion").empty(); 
	
for (i=0;i<propiedades.length;i++) {
	colorcalle=propiedades[i][2]
	calle=propiedades[i][1]
	tipo=propiedades[i][0] 
	switch (colorcalle){
		case ("Marron"):
			$("#Marron").append(calle+';');
			//document.getElementById("Marron").innerHTML =calle+';'
			break;
		case ("AzulCielo"):
			$("#AzulCielo").append(calle+';');
			//document.getElementById("AzulCielo").innerHTML =calle+';'
			break;
		case ("Rosa"):
			$("#Rosa").append(calle+';');
			//document.getElementById("Rosa").innerHTML =calle+';'
			break;
		case ("Naranja"):
			$("#Naranja").append(calle+';');
			//document.getElementById("Naranja").innerHTML =calle+';'
			break;
		case ("Rojo"):
			$("#Rojo").append(calle+';');
			//document.getElementById("Rojo").innerHTML =calle+';'
			break;
		case ("Amarillo"):
			$("#Amarillo").append(calle+';');
			//document.getElementById("Amarillo").innerHTML =calle+';'
			break;
		case ("Verde"):
			$("#Verde").append(calle+';');
			//document.getElementById("Verde").innerHTML =calle+';'
			break;
		case ("AzulOscuro"):
			$("#AzulOscuro").append(calle+';');
			//document.getElementById("AzulOscuro").innerHTML =calle+';'
			break;
		default:
			if (tipo=="Compania")
				$("#Compania").append(calle+';');
				//document.getElementById("Compania").innerHTML =calle+';'
			else
				$("#Estacion").append(calle+';');
				//document.getElementById("Estacion").innerHTML =calle+';'
			
	} 
	

}
}

//funciones para dibujar el tablero y las fichas

function cargarTablero(){
	
	cargarficha();
	var canvas=document.getElementById("micanvas");
	var inc=55
	
	ctx=canvas.getContext("2d");
	maxX=canvas.width;
	maxY=canvas.height; 
	
	img=new Image();
	img.src="client/img/tablero.png";
	ctx.drawImage(img,0,0);
	var inc=55
	img.onload=function(){
		ctx.drawImage(img,0,0);
	
	}
}

function cargarficha(){
	listatotal ={}
	img1=new Image();
    coloresFichas = ["azul","rojo","verde","amarillo", "marron", "naranja"]
	
	var numJug=6
	for (var i=0;i<numJug;i++) {
		var color=coloresFichas[i];
		var img1=new Image();
		img1.src="client/img/"+color+".png";
		listatotal[color]=img1;
		
	} 

}

function salidaficha(colorficha){
		x=maxX-70
		y=maxY-70
		ctx.drawImage(listatotal[colorficha],x,y,30,30)
}


function iniciaCanvas(idCanvas){
var elemento = document.getElementById(idCanvas);
if (elemento &&  elemento.getContext){
    var contexto = elemento.getContext('2d');
    if (contexto) {
       return contexto;
       }
    }
    return false;
}

function ponerFicha(turno,posicion,tirada){

	var x,y;
	var posicionanterior=posicion-tirada
	if (posicion>=0 && posicion<40){
		ctx.fillStyle = '#f0f0f0'
		ctx.fillRect(0,0,720,720)
		ctx.drawImage(img,0,0);
		x=coord[posicion][0];
		y=coord[posicion][1];
		ctx.drawImage(listatotal[turno],x,y,30,30)
	}
}
turno
function cargarCoordenadas(){
	
	coord = []
	for(i=0;i<40;i++) coord[i]=new Array(2);
	inc=55;

	coord[0][0]=maxX-inc
	coord[0][1]=maxY-inc
	
	coord[10][0]=inc
	coord[10][1]=maxY-inc
	
	coord[20][0]=inc
	coord[20][1]=inc
	
	coord[30][0]=maxX-inc
	coord[30][1]=inc
	
	
	//calles de la posicion  1 a la 9
	
	for (i=1;i<10;i++){
	
		coord[i][0]=560-(inc*(i-1))
		coord[i][1]=maxY-inc
				
	}
	
	//calles de la posicion 11 a 19
	
	for(i=1;i<10;i++) {
		indice=i+10

		coord[indice][0]=inc
		coord[indice][1]=560-(inc*(i-1))
		
		
	}
		
	//calles de la posicion 21 a 29
	multi=9
	for(i=1;i<10;i++) {
		indice=i+20
		multi--
	
		coord[indice][0]=560-(inc*multi)
		coord[indice][1]=inc
	}
	
	//calles de la posicion 31 a 39
	multi=9
	for(i=1;i<10;i++) {
		indice=i+30
		multi--
	
		coord[indice][0]=maxX-inc
		coord[indice][1]=560-(inc*multi)
		
	}
	mostrarmensaje(coord[5][0])
}



