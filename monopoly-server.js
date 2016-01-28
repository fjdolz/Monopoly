var fs=require("fs");
var express=require("express");
//var path=require("path");


var modelo=require("./server/juego.js");

var http=require("http");

var config=JSON.parse(fs.readFileSync("./config.json"));
var host=config.host;
var port=config.port;

//var application_root=__dirname;


var app=express();
var server=http.createServer(app);
var io = require('socket.io')(server);




var partida=new modelo.Partida();
var tablero =new modelo.Tablero();
modelo.Jugador();
partida.iniciar();
tablero.configurarTablero()
//console.log(partida.fase);


app.use("/",express.static(__dirname));


app.get("/",function(request,response){
	var contenido=fs.readFileSync("./client/index.html");
	response.setHeader("Content-type","text/html");
	response.send(contenido);
});



   
var empezar=0;
	

	
app.get("/unirsealjuego/:nombre",function(request,response){
	var jsonData;
		
	//partida.iniciar();
	var jugador=new modelo.Jugador(request.params.nombre);
	jugador.unirseAPartida(partida);
		
	if (jugador.ficha){	
		empezar=empezar+1;
		jsonData={"Nombre":jugador.nombre,"Ficha":jugador.ficha.color,"Uid":jugador.uid,"empezar":empezar,"estado":partida.estado};	
		console.log("tiene ficha")
	}
	else jsonData={"nombre":"sorry"};
	
	console.log(jsonData)
	response.json(jsonData)
	
	

	
}); 

app.get("/moveracelda/:posicion",function(request,response){
	
	
	var vendercasa=false
	var vender =false
	var comprar =false
	var construir = 0
	var casa=false
	var jsonData;
	var turnoficha;
	var mensaje;
	var estado="normal"
	turnoficha=partida.turnopartida;
	partida.fichas[turnoficha].posicion=parseInt(request.params.posicion);
	
	partida.fichas[turnoficha].tirada=parseInt(request.params.posicion)
		var tirada= [parseInt(request.params.posicion),0]
		var tir1=parseInt(request.params.posicion)
		var tir2=0
		
		posicion=partida.fichas[turnoficha].posicion
		turno=partida.fichas[turnoficha].color;
		dinero=partida.fichas[turnoficha].saldo
		nombre=partida.fichas[turnoficha].nombre
		ficha=partida.fichas[turnoficha]
	
	if (partida.fichas[turnoficha].Ganador) {
		console.log("se acabo la partida")
		mensaje="Has alcanzo el saldo máximo y eres el GANADOR"
		estado="ganador"
		io.emit('mensaje', {text: 'LA PARTIDA HA TERMINADO EL GANADOR ES LA FICHA: '+turno});
		
	}
	else
		if (partida.fichas[turnoficha].Bancarota) {
			console.log("Queda eliminado"+nombre)
			estado="bancarota"
		
			partida.numjugadores--;
			console.log(partida.numjugadores+" ----y esto...: "+partida.fichas[turnoficha].Jugador.nombre)
			partida.eliminarjugador(partida.fichas[turnoficha].Jugador.nombre)
			mensaje="estás eliminado por quedarte sin dinero"
		
			io.emit('turnobancarota', {text: 'ha cambiado el turno a la ficha',turno: partida.fichas[partida.turnopartida].color, uid:partida.fichas[partida.turnopartida].Jugador.uid})
			
		}
		else
	
if (partida.fichas[turnoficha].carcel)	{
	mensaje="Estas en la carcel, y no puedes salir"
	}
else {	
	switch(posicion){
			case(0):
			case(10):
			case(20):
				mensaje="Puedes descansar aquí no pasa nada"
				break;
			case(30): //casilla ir a la carcel
				partida.fichas[turnoficha].posicion=10;
				partida.fichas[turnoficha].carcel=true
				
				mensaje="Has caido en la casilla VAS A LA CARCEL"
				break;
			case (4):          //casilla pargar impuestos
			case (38): 
				partida.fichas[turnoficha].pagar(150);
				mensaje="Has caido en IMPUESTOS y pagas 150 pelotis"
				break;
			case(7):                 //caja de la suerte
			case(22):
			case (36): 
				console.log ("coger tarjeta de la suerte+++++++++")
				var targetb=partida.caja.sacarTarjetaSuerte();
				targetb[0].ejecutar(partida.fichas[turnoficha]);
				mensaje=targetb[1]
				console.log(mensaje)
				break;
			case (2):        // caja de comunudad
			case (17):
			case (33): 
				console.log ("coger tarjeta de la comunidad+++++++++")
				var targetb=partida.caja.sacarTarjetaComunidad();
				targetb[0].ejecutar(partida.fichas[turnoficha]);
				mensaje=targetb[1]
				break;
						
			default:
			
		if (tablero.casillas[posicion].tema.tipo== "Compania"){
			if (tablero.casillas[posicion].tema.estado=="libre"){
				mensaje="Has caido en una Compañia que se puede comprar"
				console.log("comprar compañia")
				console.log(tablero.casillas[posicion].tema)
				comprar=true
			}
			else {
			//	if (tablero.casillas[posicion].estado=="Nocomprable"){
						console.log("la compañia tiene propietario")
								
						if (tablero.casillas[posicion].tema.propietario.uid != partida.fichas[turnoficha].Jugador.uid){ //no eres tu el propietario
							
							console.log(partida.fichas[turnoficha].tirada[0]+partida.fichas[turnoficha].tirada[1])
							console.log(tablero.casillas[posicion].tema.tasa)
							var pago=(partida.fichas[turnoficha].tirada[0]+partida.fichas[turnoficha].tirada[1])*tablero.casillas[posicion].tema.tasa
							tablero.casillas[posicion].tema.propietario.ficha.cobrar(pago) //cobra el alquiler
							partida.fichas[turnoficha].Jugador.ficha.pagar(pago) //paga el alquiler
							comprar =false
							mensaje="Esta compañia tiene propietario y debes pagar el alquiler"
						}
						else
							mensaje="Es una propiedad tuya"
				//	}	
			}
				
		}
		else	//si no es una compañia sera una calle o estacion	
		
			if ((tablero.casillas[posicion].tema.tipo== "Calle") || (tablero.casillas[posicion].tema.tipo== "Estacion")) { 
				//	mensaje="Has caido en una Propiedad que se puede comprar"
					
				if (tablero.casillas[posicion].tema.estado=="libre"){
					mensaje="Has caido en una Propiedad que se puede comprar"
					console.log("comprar")
				
					
					
					comprar=true
				}
				else 
					{
					//if (tablero.casillas[posicion].estado=="Nocomprable"){
						console.log("la calle tiene propietario")
						
							
					
						if (tablero.casillas[posicion].tema.propietario.uid != partida.fichas[turnoficha].Jugador.uid){ //no eres tu el propietario
							console.log("antes de pagar mov"+posicion)
							
							console.log(partida.fichas[turnoficha].Jugador.ficha.saldo)
							
							//var pago=tablero.casillas[posicion].tema.titulo.alquiler
							if (tablero.casillas[posicion].tema.tipo== "Calle") 
								if (tablero.casillas[posicion].tema.titulo.hotel==1)
									var pago=(tablero.casillas[posicion].tema.titulo.casa)+(tablero.casillas[posicion].tema.titulo.casa*5)
								else
									var pago=(tablero.casillas[posicion].tema.titulo.numcasas*tablero.casillas[posicion].tema.titulo.casa)+(tablero.casillas[posicion].tema.titulo.casa)
							else {
								numero=tablero.casillas[posicion].tema.propietario.ficha.buscarestaciones()
								var pago=(numero*(tablero.casillas[posicion].tema.precio*0.5))+(tablero.casillas[posicion].tema.precio*0.5)
							}
							
							tablero.casillas[posicion].tema.propietario.ficha.cobrar(pago) //cobra el alquiler
							partida.fichas[turnoficha].Jugador.ficha.pagar(pago) //paga el alquiler
							
							comprar =false
							mensaje="Esta propiedad tiene propietario y debes pagar el alquiler"
							
							var duenio=tablero.casillas[posicion].tema.propietario.uid
							var color=partida.fichas[turnoficha].color
							io.emit('alquiler', {text: 'HAS COBRADO el alquiler de la calle ',calle:tablero.casillas[posicion].tema.nombre,duenio:duenio});
						}
						else {
							mensaje="Es una propiedad tuya"
							vender=true
							
							if (tablero.casillas[posicion].tema.titulo.numcasas>0)
									vendercasa=true
							console.log(vendercasa+" tengo casas+++++++++++"+tablero.casillas[posicion].tema.titulo.numcasas)
							if (tablero.casillas[posicion].tema.tipo== "Calle"){
									console.log("vemos si se puede edificar") 
									// 0 contruir, 1 no quedan casas , 2 te faltan calles, 3 no puedes construir mas
									
									console.log("+++++estoy aqui "+tablero.casillas[posicion].tema.titulo.Edificarcasa(partida.fichas[turnoficha]))
								
									if (tablero.casillas[posicion].tema.titulo.Edificarcasa(partida.fichas[turnoficha])==0) {
										mensaje="Puedes construir"
										casa=true
									}
									else if (tablero.casillas[posicion].tema.titulo.Edificarcasa(partida.fichas[turnoficha])==4) {
										mensaje="Todo el barrio no tiene las mismas casas"
										
									}									
							}
						}
					}	
			} 
	}
}
		turno=partida.fichas[turnoficha].color;
		posicion=partida.fichas[turnoficha].posicion
		dinero=partida.fichas[turnoficha].saldo
		nombre=partida.fichas[turnoficha].nombre
		ficha=partida.fichas[turnoficha]
		
	jsonData={"Turno":turno,"Tirada":tirada,"Posicion":posicion,"Saldo":dinero,"Comprar":comprar,"Vender":vender,"Vendercasa":vendercasa,"Edificar":casa,"Dado1":tir1,"Dado2":tir2, "Mensaje":mensaje,"Estado":estado}
	console.log(jsonData)
	response.json(jsonData) 
});
	
	


app.get("/tirardados/",function(request,response){

	var vender=false
	var comprar =false
	var construir = 0
	var casa=false
	var jsonData;
	var turnoficha;
	var mensaje;
	var estado="normal"
	turnoficha=partida.turnopartida;
	

		var tirada=partida.fichas[turnoficha].lanzarDados();
		partida.fichas[turnoficha].tirada=tirada
		console.log(partida.fichas[turnoficha].posicion)
		var tir1=tirada[0];
		var tir2=tirada[1];
		
		
		
		posicion=partida.fichas[turnoficha].posicion
		turno=partida.fichas[turnoficha].color;
		dinero=partida.fichas[turnoficha].saldo
		nombre=partida.fichas[turnoficha].Jugador.nombre
		ficha=partida.fichas[turnoficha]
		
	if (partida.fichas[turnoficha].Ganador) {
		console.log("se acabo la partida")
		mensaje="Has alcanzo el saldo máximo y eres el GANADOR"
		estado="ganador"
		io.emit('mensaje', {text: 'LA PARTIDA HA TERMINADO EL GANADOR ES LA FICHA: '+turno});
		
	}
	else
		if (partida.fichas[turnoficha].Bancarota) {
			console.log("Queda eliminado"+nombre)
			estado="bancarota"
		
			partida.numjugadores--;
			console.log(partida.numjugadores+" ----y esto...: "+partida.fichas[turnoficha].Jugador.nombre)
			partida.eliminarjugador(partida.fichas[turnoficha].Jugador.nombre)
			mensaje="estás eliminado por quedarte sin dinero"
		
			io.emit('turnobancarota', {text: 'ha cambiado el turno a la ficha',turno:partida.fichas[partida.turnopartida].color, uid:partida.fichas[partida.turnopartida].Jugador.uid})
			
			
		}
		else
	
if (partida.fichas[turnoficha].carcel)	{
	mensaje="Estas en la carcel, y no puedes salir"
	}
else {	
	switch(posicion){
			case(0):
			case(10):
			case(20):
				mensaje="Puedes descansar aquí no pasa nada"
				break;
			case(30): //casilla ir a la carcel
				partida.fichas[turnoficha].posicion=10;
				partida.fichas[turnoficha].carcel=true
				mensaje="Has caido en la casilla VAS A LA CARCEL"
				break;
			case (4):          //casilla pargar impuestos
			case (38): 
				partida.fichas[turnoficha].pagar(150);
				mensaje="Has caido en IMPUESTOS y pagas 150 pelotis"
				break;
			case(7):                 //caja de la suerte
			case(22):
			case (36): 
				console.log ("coger tarjeta de la suerte+++++++++")
				var targetb=partida.caja.sacarTarjetaSuerte();
				targetb[0].ejecutar(partida.fichas[turnoficha]);
				mensaje=targetb[1]
				
				break;
			case (2):        // caja de comunudad
			case (17):
			case (33): 
				console.log ("coger tarjeta de la comunidad+++++++++")
				var targetb=partida.caja.sacarTarjetaComunidad();
				targetb[0].ejecutar(partida.fichas[turnoficha]);
				mensaje=targetb[1]
				break;
						
			default:
			
		if (tablero.casillas[posicion].tema.tipo== "Compania"){
			if (tablero.casillas[posicion].tema.estado=="libre"){
				mensaje="Has caido en una Compañia que se puede comprar"
				console.log("comprar compañia")
				console.log(tablero.casillas[posicion].tema)
				comprar=true
			}
			else {
			//	if (tablero.casillas[posicion].estado=="Nocomprable"){
						console.log("la compañia tiene propietario")
								
						if (tablero.casillas[posicion].tema.propietario.uid != partida.fichas[turnoficha].Jugador.uid){ //no eres tu el propietario
							
							
							var pago=(partida.fichas[turnoficha].tirada[0]+partida.fichas[turnoficha].tirada[1])*tablero.casillas[posicion].tema.tasa
							tablero.casillas[posicion].tema.propietario.ficha.cobrar(pago) //cobra el alquiler
							partida.fichas[turnoficha].Jugador.ficha.pagar(pago) //paga el alquiler
							comprar =false
							mensaje="Esta compañia tiene propietario y debes pagar el alquiler"
						}
						else
							mensaje="Es una propiedad tuya"
				//	}	
			}
				
		}
		else	//si no es una compañia sera una calle o estacion	
		
			if ((tablero.casillas[posicion].tema.tipo== "Calle") || (tablero.casillas[posicion].tema.tipo== "Estacion")) { 
				//	mensaje="Has caido en una Propiedad que se puede comprar"
					
				if (tablero.casillas[posicion].tema.estado=="libre"){
					mensaje="Has caido en una Propiedad que se puede comprar"
					console.log("comprar")
					comprar=true
				}
				else 
					{
					//if (tablero.casillas[posicion].estado=="Nocomprable"){
						console.log("la calle tiene un propietario")
					
						if (tablero.casillas[posicion].tema.propietario.uid != partida.fichas[turnoficha].Jugador.uid){ //no eres tu el propietario
							console.log("antes de pagar+++++")
							console.log(partida.fichas[turnoficha].Jugador.ficha.saldo)
							
							//var pago=tablero.casillas[posicion].tema.titulo.alquiler
							if (tablero.casillas[posicion].tema.tipo== "Calle") 
								if (tablero.casillas[posicion].tema.titulo.hotel==1)
									var pago=(tablero.casillas[posicion].tema.titulo.casa)+(tablero.casillas[posicion].tema.titulo.casa*5)
								else
									var pago=(tablero.casillas[posicion].tema.titulo.numcasas*tablero.casillas[posicion].tema.titulo.casa)+(tablero.casillas[posicion].tema.titulo.casa)
							else {
								numero=tablero.casillas[posicion].tema.propietario.ficha.buscarestaciones()
								var pago=(numero*(tablero.casillas[posicion].tema.precio*0.5))+(tablero.casillas[posicion].tema.precio*0.5)
							}
							
							tablero.casillas[posicion].tema.propietario.ficha.cobrar(pago) //cobra el alquiler
							partida.fichas[turnoficha].Jugador.ficha.pagar(pago) //paga el alquiler
							
							comprar =false
							mensaje="Esta propiedad tiene propietario y debes pagar el alquiler"
							
							var duenio=tablero.casillas[posicion].tema.propietario.uid
							var color=partida.fichas[turnoficha].color
							io.emit('alquiler', {text: 'HAS COBRADO el alquiler de la calle ',calle:tablero.casillas[posicion].tema.nombre,duenio:duenio});
						}
						else {
							mensaje="Es una propiedad tuya"
							vender=true
							
							if (tablero.casillas[posicion].tema.titulo.numcasas>0)
									vendercasa=true
							console.log(vendercasa+" tengo casas+++++++++++"+tablero.casillas[posicion].tema.titulo.numcasas)
							if (tablero.casillas[posicion].tema.tipo== "Calle"){
									console.log("vemos si se puede edificar") 
									// 0 contruir, 1 no quedan casas , 2 te faltan calles, 3 no puedes construir mas
									
									console.log("+++++estoy aqui "+tablero.casillas[posicion].tema.titulo.Edificarcasa(partida.fichas[turnoficha]))
								
									if (tablero.casillas[posicion].tema.titulo.Edificarcasa(partida.fichas[turnoficha])==0) {
										mensaje="Puedes construir"
										casa=true
									}
									else if (tablero.casillas[posicion].tema.titulo.Edificarcasa(partida.fichas[turnoficha])==4) {
										mensaje="Todo el barrio no tiene las mismas casas"
										
									}									
							}	
							
						}
					}	
			} 
	}
}
		turno=partida.fichas[turnoficha].color;
		posicion=partida.fichas[turnoficha].posicion
		dinero=partida.fichas[turnoficha].saldo
		nombre=partida.fichas[turnoficha].Jugador
		ficha=partida.fichas[turnoficha]
		
		
	jsonData={"Turno":turno,"Tirada":tirada,"Posicion":posicion,"Saldo":dinero,"Comprar":comprar,"Vender":vender,"Edificar":casa,"Dado1":tir1,"Dado2":tir2, "Mensaje":mensaje,"Estado":estado,"Carcel":partida.fichas[turnoficha].carcel}
	console.log(jsonData)
	response.json(jsonData) 
});


app.get("/comenzarjuego/",function(request,response){
	var jsonData;
	var turnoficha
	inicio =new modelo.iniJuego();
	partida.iniciar();
	partida.IniciarTurno();
	partida.estado="Jugando"
	turnoficha=partida.turnopartida;

	jsonData={"Turno":partida.fichas[turnoficha].color,"Jugadores":partida.numjugadores} 
	
	console.log(jsonData)
	response.json(jsonData) 
	
	io.emit('mensaje', {text: 'Comienza la partida'});
	io.emit('turno', {text: 'La partida comienza con ',turno: partida.fichas[turnoficha].color, uid:partida.fichas[turnoficha].Jugador.uid})

});

app.get("/probarturno/",function(request,response){
	var jsonData;
	var turnoficha
	var turnouid
	
	turnoficha=partida.turnopartida;
	turnouid=partida.fichas[turnoficha].Jugador.uid
	
	jsonData={"Uidturno":turnouid} 
	

	console.log(jsonData)
	response.json(jsonData) 

});

app.get("/comprartitulo/",function(request,response){
	var jsonData;
	var turnoficha;
	
	
	turnoficha=partida.turnopartida;
	
	posicion=partida.fichas[turnoficha].posicion
	ficha=partida.fichas[turnoficha]
	color=partida.fichas[turnoficha].color
	
	tablero.casillas[posicion].tema.comprar(ficha);
	calle=tablero.casillas[posicion].tema.nombre
	colorcalle=tablero.casillas[posicion].tema.color
	tipo=tablero.casillas[posicion].tema.tipo
	propiedades=partida.fichas[turnoficha].propiedades
	numeropro=partida.fichas[turnoficha].numpropiedades
	console.log(tablero.casillas[posicion].tema.estado)
	
	jsonData={"Ficha":color,"Calle":calle,"Colorcalle":colorcalle,"Tipo":tipo,"Propiedades":propiedades,"numero propiedades":numeropro}
	console.log(jsonData)
	response.json(jsonData) 
	io.emit('compra', {text: 'acaba de comprar la calle ',ficha:color,calle:calle});
});

app.get("/vendertitulo/",function(request,response){
	var jsonData;
	var turnoficha;
	var quedancasas=true
	
	turnoficha=partida.turnopartida;
	
	posicion=partida.fichas[turnoficha].posicion
	ficha=partida.fichas[turnoficha]
	color=partida.fichas[turnoficha].color
	
	//tablero.casillas[posicion].tema.vender(ficha);
	calle=tablero.casillas[posicion].tema.nombre
	colorcalle=tablero.casillas[posicion].tema.color
	tipo=tablero.casillas[posicion].tema.tipo
//	propiedades=partida.fichas[turnoficha].propiedades
//	numeropro=partida.fichas[turnoficha].numpropiedades
//	tablero.casillas[posicion].tema.vender(ficha);
	if (!tablero.casillas[posicion].tema.vender(ficha))
		quedancasas=false
	console.log("quedan casas ......."+quedancasas)
	propiedades=partida.fichas[turnoficha].propiedades
	numeropro=partida.fichas[turnoficha].numpropiedades
	jsonData={"Ficha":color,"Calle":calle,"Vendercasas":quedancasas,"Tipo":tipo,"Propiedades":propiedades,"numero propiedades":numeropro}
	console.log(jsonData)
	response.json(jsonData) 
	io.emit('compra', {text: 'acaba de vender la calle ',ficha:color,calle:calle});
});
app.get("/vendercasa/",function(request,response){
	var jsonData;
	var turnoficha;
	var quedancasas=true
	
	turnoficha=partida.turnopartida;
	
	posicion=partida.fichas[turnoficha].posicion
	ficha=partida.fichas[turnoficha]
	color=partida.fichas[turnoficha].color
	calle=tablero.casillas[posicion].tema.nombre
//	colorcalle=tablero.casillas[posicion].tema.color
//	tipo=tablero.casillas[posicion].tema.tipo
//	propiedades=partida.fichas[turnoficha].propiedades
//	tablero.casillas[posicion].tema.vender(ficha);
	
	
	tablero.casillas[posicion].tema.titulo.vendercasa(ficha)
	if(!tablero.casillas[posicion].tema.titulo.vendercasa(ficha))
		quedancasas=false
	
	console.log("quedan casas ......."+quedancasas)
	jsonData={"Ficha":color,"Calle":calle,"Vendercasas":quedancasas,"Tipo":tipo,"Propiedades":propiedades}
	console.log(jsonData)
	response.json(jsonData) 
	io.emit('compra', {text: 'acaba de vender una casa de la calle ',ficha:color,calle:calle});
});

app.get("/comprarcasa/",function(request,response){
	var jsonData;
	var turnoficha;
	var mensaje;
	turnoficha=partida.turnopartida;
	calle=tablero.casillas[posicion].tema.nombre
	color=partida.fichas[turnoficha].color
	
	posicion=partida.fichas[turnoficha].posicion
	colorcalle=tablero.casillas[posicion].tema.color
	var edificacion= tablero.casillas[posicion].tema.titulo.Edificarcasa(partida.fichas[turnoficha])
	
	if (edificacion==0){
		mensaje="Acabas de construir una casa"
		console.log("he construido")
		tablero.casillas[posicion].tema.titulo.ComprarCasa(partida.fichas[turnoficha])
	}
	else if (edificacion==1){
			mensaje="No quedan casas para construir, tendrás que esperar"
			console.log("no hay casas")
	}	
		else if (edificacion==2) {
			mensaje="No tienes todas las calles del barrio"
			console.log("Te faltan calles")
		}
			else if (edificacion==3){
				console.log("no puedes construir mas casas")
				mensaje="No puedes constrir mas casas"
			}
				else if(edificacion==4){
					console.log("todas las calles tienen que tener el mismo numero de casas")
					mensaje="hay calles del barrio con menos casas"
				}	
				
				
	

	
	jsonData={"Ficha":color,"Calle":calle,"Colorcalle":colorcalle,"Mensaje":mensaje,"Edificacion":edificacion}
	console.log(jsonData)
	response.json(jsonData) 
	io.emit('compra', {text: mensaje,ficha:color,calle:calle});
});

app.get("/comprarhotel/",function(request,response){
	var jsonData;
	turnoficha=partida.turnopartida;
	calle=tablero.casillas[posicion].tema.nombre
	color=partida.fichas[turnoficha].color
	
	posicion=partida.fichas[turnoficha].posicion
	colorcalle=tablero.casillas[posicion].tema.color
	

	tablero.casillas[posicion].tema.titulo.Edificarhotel(partida.fichas[turnoficha])

	mensaje="Acabas de edificar un Hotel"
	jsonData={"Ficha":color,"Calle":calle,"Colorcalle":colorcalle,"Mensaje":mensaje}
	console.log(jsonData)
	response.json(jsonData)
	
	
	io.emit('compra', {text: mensaje,ficha:color,calle:calle})
	
}); 

app.get("/pasarturno/",function(request,response){
	var jsonData;
	partida.pasarturno();
	var colorficha=partida.fichas[partida.turnopartida].color
	console.log("el turno es para:"+partida.turnopartida)
	jsonData={}
	console.log(jsonData)
	response.json(jsonData)
	
	
	io.emit('turno', {text: 'ha cambiado el turno a la ficha',turno: colorficha, uid:partida.fichas[partida.turnopartida].Jugador.uid})
	
}); 



server.listen(port,host);
console.log("Servidor iniciado en puerto: "+port);