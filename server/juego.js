

FasesPartida: {
	function FaseInicial(){
		this.estado="FaseInicial"
		this.AltaNuevoJugador = function(partida, Jugador){return partida.crearFicha(Jugador)}
		this.empezar = function(partida){partida.IniciarTurno()}
		this.lanzarDados = function(partida){console.log("La partida aún no ha comenzado.")}
	}

	function FaseJugar(){
		this.estado="FaseJugar"
		this.AltaNuevoJugador = function(partida, Jugador){
			console.log("La partida ya está empezada y no se permiten nuevos jugadores.")
		}
		this.empezar = function(partida){console.log("La partida  ya está empezada.")}
		this.lanzarDados = function(partida){return partida.lanzarDados()}
	}

	function FaseFinal(){
		this.estado="FaseFinal"
		this.AltaNuevoJugador = function(partida, Jugador){
			console.log("La partida ha finalizado y no se permiten nuevos jugadores.")
		}
		this.empezar = function(partida){console.log("La partida ha finalizado.")}
		this.lanzarDados = function(partida){"La partida ha finalizado."}
	}
} 



function Partida(){
	this.estado="FaseInicial"
	this.saldobanco=15000
	this.maxPresupuesto=40000 //el max 40000
	this.tablero
	this.dado
	this.fichas = []
	this.coloresFichas
	this.numjugadores = 0;
	this.turnopartida = 0;
	this.pasosalida = 200;
	this.maxcasas = 32;
	this.maxhoteles = 12;
	this.grupocalles = [];
	this.caja = new Tarjetas();
	this.fase = new FaseInicial();
	
	

	this.iniciar = function(){
		this.tablero = new Tablero(40)
		this.dado = new Dado()
	//	this.fichas = []
		this.coloresFichas = ["azul","rojo","verde","amarillo", "marron", "naranja"];
		this.iniciargrupocalle();
		
		this.iniciarcajas();
		this.fase = new FaseInicial();
	//	this.estado = "inicio"
	}	
	
	this.obtenerPosicion=function(nombre){
		var tema="Plaza Lavapies"
		for(i=0;i<this.tablero.numeroCasillas;i++){
			casilla=this.tablero.casillas[i]
			
			console.log(this.tablero.casillas[i].tema.nombre+" ver: +++++++ "+this.tablero.casillas[i][1]+" -- "+this.tablero.casillas[i][2]+" *** "+this.tablero.casillas[i][3])
			if (this.tablero.casillas[i].tema.nombre==tema) {
				return i
			}
		}
		return -1
	}
	
	
	this.propiedad = function(tipo,nombre,color){
		this.tipo=tipo
		this.nombre=nombre
		this.color=color
	}
	
	this.grupocalle = function(color,tamano){
		this.color=color;
		this.tamano=tamano;
	
	}
	this.iniciargrupocalle = function(){
		this.grupocalles[0] = new this.grupocalle("Marron",2);
		this.grupocalles[1] = new this.grupocalle("AzulCielo",3);
		this.grupocalles[2] = new this.grupocalle("Rosa",3);
		this.grupocalles[3] = new this.grupocalle("Naranja",3);
		this.grupocalles[4] = new this.grupocalle("Rojo",3);
		this.grupocalles[5] = new this.grupocalle("Amarillo",3);
		this.grupocalles[6] = new this.grupocalle("Verde",3);
		this.grupocalles[7] = new this.grupocalle("AzulOscuro",2);
		return this.grupocalles 
	
	}
	
	this.iniciarcajas=function(){
		this.caja.agregarTarjetaComunidad(new Tarjeta(1,new Multa(150),"Multa de 150 pelotis"))
		this.caja.agregarTarjetaComunidad(new Tarjeta(2,new Multa(200),"Multa de 200 pelotis"))
		this.caja.agregarTarjetaComunidad(new Tarjeta(3,new Multa(100),"Multa de 100 pelotis"))
		this.caja.agregarTarjetaSuerte(new Tarjeta(4,new Avanzar(10),"Avanzas 10 posiciones"))
		this.caja.agregarTarjetaSuerte(new Tarjeta(5,new Avanzar(5),"Avanzas 5 posiciones"))
		this.caja.agregarTarjetaSuerte(new Tarjeta(6,new Retroceder(10),"Retrocedes 10 posiciones"))
		this.caja.agregarTarjetaSuerte(new Tarjeta(7,new Retroceder(5),"Retrocedes 5 posiones"))
		this.caja.agregarTarjetaSuerte(new Tarjeta(8,new Iracelda(10),"Vas a la celda 10"))
		this.caja.agregarTarjetaSuerte(new Tarjeta(9,new Iracelda(20),"Vas a la celda 20"))
		this.caja.agregarTarjetaSuerte(new Tarjeta(10,new Iracelda(30),"Vas a la Carcel"))
		this.caja.agregarTarjetaSuerte(new Tarjeta(11,new Iracelda(0),"Vas a la Salida")) 
		this.caja.agregarTarjetaSuerte(new Tarjeta(12,new SalirCarcel(),"Vale por SAlir de la CArcel")) 
		this.caja.agregarTarjetaSuerte(new Tarjeta(13,new SalirCarcel(),"Vale por SAlir de la CArcel")) 
		
	} 
	
	
	this.AltaNuevoJugador = function(Jugador){
		return this.fase.AltaNuevoJugador(this,Jugador);
	}
	this.crearFicha = function(Jugador){
		
	
		if (this.numjugadores != this.coloresFichas.length){
		
			
			var ficha = new Ficha(Jugador, this, this.coloresFichas[this.fichas.length])
			//this.fichas.push(ficha)
			this.fichas[this.numjugadores] = ficha
			this.fichas[this.numjugadores].IniciarPosesionGrupo();
			//console.log(this.fichas[this.numjugadores].Posesiongrupo)
			this.numjugadores = this.numjugadores +1
			console.log("Bienvenido "+Jugador.nombre+"numero:"+this.numjugadores)
			return ficha
		}			
		else{
			console.log("No hay fichas libres para jugar")
			return false
		}
	}
	
	this.quitarfondosBanco=function(dinero){
			Partida.saldobanco=Partida.saldobanco-dinero
		}
	
	this.agregarfondosBanco=function(dinero){
			Partida.saldobanco=Partida.saldobanco+dinero
		}
	
	this.buscarTurno=function(){
		var turnoficha=0
		for (i=0;i<this.numjugadores;i++){
		console.log(i)
		if (this.fichas[i].turno==true)
			turnoficha=i
		return turnoficha
	}
	}
	this.buscarjugador=function(Jugador){
		for(i=0;i<this.fichas.length;i++){
			if (this.fichas[i].obtenerjugador().Jugador==Jugador) return this.fichas[i]
		}
		return false
	} 
	
	this.eliminarjugador=function(Jugador){
		for(i=0;i<this.fichas.length;i++){
			if (this.fichas[i].Jugador.nombre==Jugador) this.fichas.splice(i,1)
		}
	}
	
	this.empezar = function(){
		return this.fase.empezar(this);
	}
	
	this.IniciarTurno = function(){
		this.fase = new FaseJugar();
		var turno=0
		var tirada = this.lanzarDados()
		var resultado = tirada[0] + tirada[1]
		var masalto = resultado
		this.fichas[0].turno = true;
		
			if (this.fichas.length>1) {
				for (i=1;i<this.fichas.length;i++) {
					tirada = this.lanzarDados()
					resultado = tirada[0] + tirada[1]
					if (masalto<resultado) {
						this.fichas[i].turno = true
						this.fichas[turno].turno= false
						masalto=resultado
						return true
					} 
				}
			}
			else {
				console.log("No hay jugadores suficientes para comenzar la partida")
				return false
			}
		
	}	
	
	this.pasarturno= function(){
			console.log("el turno lo tiene:"+this.turnopartida)
			this.fichas[this.turnopartida].turno=false;
			this.turnopartida++;
			if (this.turnopartida>=this.fichas.length)
				this.turnopartida=0
			this.fichas[this.turnopartida].turno=true;
			console.log("el turno es ahora de:"+this.turnopartida)
	
		
	}
	this.PedirDados = function(){
		return this.fase.lanzarDados();
	}
	
	this.lanzarDados = function(){
	
			var dado1 = this.dado.calcularNumero()
			var dado2 = this.dado.calcularNumero()
		//	var dado1=3
		//	var dado2=3
			return [dado1, dado2]
	
	}

	this.moverFicha = function(ficha,num){
	//iniJuego();
	
		if ((ficha.getPosicion() + num)>39) {
			var nuevaPosicion = (ficha.getPosicion() + num) -40;
			ficha.pasarsalida();
		}
		else {
			var nuevaPosicion = ficha.getPosicion() + num
		}
		ficha.setPosicion(nuevaPosicion);
		
	/*	switch(nuevaPosicion){
			case(30): //casilla ir a la carcel
				ficha.setPosicion(nuevaPosicion);
				break;
			case(4 || 38): //casilla pargar impuestos
				ficha.pagar(150);
				//Partida.agregarfondosBanco(50);
				//ficha.setPosicion(nuevaPosicion);
				break;
			case (7 || 22 || 36): //caja de la suerte
				//ficha.setPosicion(nuevaPosicion);
				console.log ("coger tarjeta de la suerte")
				tablero.caja.sacarTarjetaSuerte();
				break;
			case (2 ||17 || 32): // caja de comunudad
				//ficha.setPosicion(nuevaPosicion);
				console.log ("Coger una tarjeta de la caja de comunidad")
				tablero.caja.sacarTarjetaComunidad();
				break;
			case (12 || 28)://has caido en una compañia 
				//ficha.setPosicion(nuevaPosicion);
				console.log ("has caido en una compañia")
				break;
				
			default:
				//ficha.setPosicion(nuevaPosicion);
			   //	if (nuevaPosicion instanceof Partida.grupocalles){
				if ((tablero.casillas[nuevaPosicion].tipo== "calle") || (tablero.casillas[nuevaPosicion].tipo== "Estacion")) { 
					if (tablero.casillas[nuevaPosicion].estado=="libre"){
						console.log("comprar")
						tablero.casillas[nuevaPosicion].comprar(ficha);
						
					}
					else 
						if (tablero.casillas[nuevaPosicion].estado=="Nocomprable"){
							console.log("la calle tiene propietario")
							if (tablero.casillas[nuevaPosicion].propietario != ficha.Jugador) //no eres tu el propietario
								tablero.casillas[nuevaPosicion].alquiler(ficha);
						}
					
				} 
				
				
				
						
		} */
		return nuevaPosicion

		
	} 



	this.iralacarcel = function(ficha){
		ficha.posicion=10;
		ficha.carcel=true;
		console.log("vas a la carcel")
		
	}

}

function Tablero(numeroCasillas){
	//this.caja = new Tarjetas();
	//this.caja
	
	this.casillas=[]
	this.numeroCasillas=numeroCasillas
	this.agregarCasilla=function(posicion, casilla) {
		this.casillas[posicion]=casilla
	}
	this.iniciarTablero=function(){
		for (i=0;i<numeroCasillas;i++){
			this.casillas[i]=new Casilla(new inicio())
		}
	}
	this.configurarTablero=function(){
		
		//esquinas
		
		this.agregarCasilla(0,new Casilla(new Salida()))
		this.agregarCasilla(10,new Casilla(new Carcel()))
		this.agregarCasilla(20,new Casilla(new Parking()))
		this.agregarCasilla(30,new Casilla(new Ircarcel()))
		
		//comunidad y suerte
		
		this.agregarCasilla(2,new Casilla(new Caja()))
		this.agregarCasilla(17,new Casilla(new Caja()))
		this.agregarCasilla(33,new Casilla(new Caja()))
		this.agregarCasilla(7,new Casilla(new Suerte()))
		this.agregarCasilla(22,new Casilla(new Suerte()))
		this.agregarCasilla(36,new Casilla(new Suerte()))
		
		//impuestos
		
		this.agregarCasilla(4,new Casilla(new Impuesto(200)))
		this.agregarCasilla(38,new Casilla(new Impuesto(100)))		
		
		//estaciones y compañias
		
		this.agregarCasilla(12,new Casilla(new Compania("Compañia de Electricidad",150)))
		this.agregarCasilla(28,new Casilla(new Compania("Compañia del Agua",150)))
		this.agregarCasilla(5,new Casilla(new Estacion("Estacion de Goya",200)))
		this.agregarCasilla(15,new Casilla(new Estacion("Estacion de las Delicias",200)))
		this.agregarCasilla(25,new Casilla(new Estacion("Estacion del medio dia",200)))
		this.agregarCasilla(35,new Casilla(new Estacion("Estacion del Norte",200)))
		
		//calles
			
		
		this.agregarCasilla(1,new Casilla(new Calle("Ronda de Valencia",60, "Marron")))
		this.agregarCasilla(3,new Casilla(new Calle("Plaza Lavapies",60, "Marron")))
		this.agregarCasilla(6,new Casilla(new Calle("Glorieta Cuatro Caminos",100, "AzulCielo")))
		this.agregarCasilla(8,new Casilla(new Calle("Avenida Reina Victoria",100, "AzulCielo")))
		this.agregarCasilla(9,new Casilla(new Calle("Calle Bravo Murillo",120, "AzulCielo")))
		this.agregarCasilla(11,new Casilla(new Calle("Glorieta de Bilbao",140, "Rosa")))
		this.agregarCasilla(13,new Casilla(new Calle("Calle Alberto Aguilera",140, "Rosa")))
		this.agregarCasilla(14,new Casilla(new Calle("Calle Fuencarral",160, "Rosa")))
		this.agregarCasilla(16,new Casilla(new Calle("Avenida Felipe II",180, "Naranja")))
		this.agregarCasilla(18,new Casilla(new Calle("Calle Velazquez",180, "Naranja")))
		this.agregarCasilla(19,new Casilla(new Calle("Calle Serrano",200, "Naranja")))
		this.agregarCasilla(21,new Casilla(new Calle("Avenida de America",220, "Rojo")))
		this.agregarCasilla(23,new Casilla(new Calle("Calle Maria de Molina",220, "Rojo")))
		this.agregarCasilla(24,new Casilla(new Calle("Calle Cea Bermudez",240, "Rojo")))
		this.agregarCasilla(26,new Casilla(new Calle("Avenida de los Reyes Catolicos",260, "Amarillo")))
		this.agregarCasilla(27,new Casilla(new Calle("Calle Bailen",260, "Amarillo")))
		this.agregarCasilla(29,new Casilla(new Calle("Plaza de Espana",280, "Amarillo")))
		this.agregarCasilla(31,new Casilla(new Calle("Puerta del sol",300, "Verde")))
		this.agregarCasilla(32,new Casilla(new Calle("Puerta Alcala",300, "Verde")))
		this.agregarCasilla(34,new Casilla(new Calle("Gran Via",320, "Verde")))
		this.agregarCasilla(37,new Casilla(new Calle("Paseo de la Castellana",350, "AzulOscuro")))
		this.agregarCasilla(39,new Casilla(new Calle("Paseo del Prado",400, "AzulOscuro")))
		
	}
	this.obtenerCasilla=function(posicion){
		return this.casillas[posicion]
	}
	this.obtenerPosicion=function(tema){
		console.log(this)
		for(i=0;i<this.numeroCasillas;i++){
			casilla=this.casillas[i]
			
		//console.log(this.casillas[i].tema.nombre+" ver: +++++++ "+tema)
			if (this.casillas[i].tema.nombre==tema) {
				return i
			}
		}
		return -1
	}
	

	
	this.iniciarTablero()
}
function Casilla(tema){
	this.tema=tema
	this.obtenerTema=function(){
		return this.tema
	}
}

function Dado(){
     this.calcularNumero=function(){
        return Math.round(Math.random()*5)+1;
     }
}



function Jugador(nombre){
		this.nombre = nombre
		this.uid
		this.fichas = []
		
	
		this.unirseAPartida = function(partida){
				
				//var ficha = partida.AltaNuevoJugador(this)
				this.uid = this.getUid()
				var ficha = partida.crearFicha(this)
				if (ficha){
					//this.fichas.push(ficha)
					this.ficha = ficha
				//	this.ficha.IniciarPosesionGrupo()
				//	this.uid = this.getUid()
					return true
				}
				else
					return false
		
		}
		this.getUid=function(){
			val=(new Date()).valueOf().toString();
			console.log(val)
			return val;
		}
		
		this.EmpezarJugar = function(partida){
			partida.empezar();
		}
}

function Tarjetas(){
	this.numsuerte = 0;
	this.numcaja = 0;
	this.tarjetaSuerte = [];
	this.tarjetaCaja = [];
	
	this.agregarTarjetaComunidad=function(tarjeta){
		this.tarjetaCaja[this.numcaja]=tarjeta;
		this.numcaja++;
	}
	
	this.agregarTarjetaSuerte=function(tarjeta){
		this.tarjetaSuerte[this.numsuerte]=tarjeta;
		this.numsuerte++;
	}
	
	this.sacarTarjetaComunidad=function(){
		var indice = Math.round(Math.random()*this.numcaja)
		console.log("estoy en tarjeta caja")
		return [this.tarjetaCaja[indice].comando,this.tarjetaCaja[indice].accion];
	}
	
	this.sacarTarjetaSuerte=function(){
		var indice = Math.round(Math.random()*this.numsuerte)
		console.log("estoy en tarjeta suerte")
		return [this.tarjetaSuerte[indice].comando,this.tarjetaSuerte[indice].accion];
	}
	
}


function Ficha(Jugador, partida, color){
		this.Bancarota= false
		this.Ganador= false
		this.Jugador = Jugador
		this.partida = partida
		this.turno = false
		this.carcel = false
		this.turnocarcel = 0
		this.tirada = 0
		this.tarjetasalircarcel = false
		this.color = color
		this.saldo = 1500
		this.posicion = 0
		this.volveratirar = 0
		this.propiedades = []
		this.numpropiedades = 0
		this.Posesiongrupo = []
		this.getSaldo = function(){return this.saldo}
		this.getPosicion = function(){return this.posicion}
		this.setPosicion = function(numCasilla){this.posicion = numCasilla}
		

		
		this.agregarpropiedad=function(tipo, nombre, color){
			var propiedad = [tipo,nombre,color]
			
			this.propiedades.push(propiedad);
			//this.propiedades= new partida.propiedad(tipo,nombre,color)
			this.numpropiedades++;
		//	this.propiedades[this.numpropiedades]= new partida.propiedad(tipo,nombre,color)
					
			if (tipo=="Calle") 
				this.agregaralgrupo(color)
		}
		
		this.eliminarpropiedad=function(tipo,calle,color) {
			var nombre=calle
		
			for (i=0;i<this.propiedades.length;i++) {
				if (nombre==this.propiedades[i].nombre)
					var indice=i
			}	
					
			this.propiedades.splice(indice,1)
			this.numpropiedades--;
			console.log(indice+"eliminar +++++++++++++"+tipo)
			if (tipo=="Calle")
				this.quitardelgrupo(color);
					
			
		}
		
		
		this.buscarestaciones=function(){
			var estaciones = 0;
		
			for (i=0; i<this.numpropiedades;i++){
				if (this.propiedades[i].tipo="Estacion"){
				estaciones++
			}
		}
		//this.numestaciones=estaciones
		return estaciones
	} 
		
		this.IniciarPosesionGrupo=function(){
			
			this.Posesiongrupo[0]= new partida.grupocalle("Marron",0)
			this.Posesiongrupo[1]= new partida.grupocalle("AzulCielo",0)
			this.Posesiongrupo[2]= new partida.grupocalle("Rosa",0)
			this.Posesiongrupo[3]= new partida.grupocalle("Naranja",0)
			this.Posesiongrupo[4]= new partida.grupocalle("Rojo",0)
			this.Posesiongrupo[5]= new partida.grupocalle("Amarillo",0)
			this.Posesiongrupo[6]= new partida.grupocalle("Verde",0)
			this.Posesiongrupo[7]= new partida.grupocalle("AzulOscuro",0)
		} 
		 
		
		this.agregaralgrupo=function(color){
			//var i = this.Posesiongrupo.indexOf(color)
			//console.log("--------------------------------")
			//console.log(this.Posesiongrupo)
			for (i=0;i<this.Posesiongrupo.length;i++) {
					
					if (color==this.Posesiongrupo[i].color)
						this.Posesiongrupo[i].tamano++;
			}
			console.log(this.Posesiongrupo)
			//console.log("--------------------------------")
		}
		
		this.quitardelgrupo=function(color){
			for (i=0;i<this.Posesiongrupo.length;i++) {
				if (color==this.Posesiongrupo[i].color)
					this.Posesiongrupo[i].tamano--;
			}
			console.log(this.Posesiongrupo)
		}
		
		this.obtenerjugador=function(){
			return this.Jugador
		}
		this.obtenerposicion=function(grupo,color){
			for (var i = 0; i < grupo.length; i++) {
				if (grupo[i].color == color) {
					return i;
				}
			}
			return -1;
		}
		
		this.pasarsalida=function(){
			this.saldo=this.cobrar(200)
			this.partida.quitarfondosBanco(200)
			console.log("cobre 200 pelotis por pasar por salida")
		}
		
		this.lanzarDados = function(){
			var pagarcarcel = false //quiere pagar para salir de la carcel
		
		
		
 			var tirada = this.partida.lanzarDados()
			var resultado = tirada[0] + tirada[1]
			
			
			console.log(tirada[0])
			console.log(tirada[1])
			
			
				
					console.log ("++++++++++++carcel +++++++++++++++")
					if (!this.carcel) { //no esta en la carcel
				
						if (tirada[0] == tirada[1]) {
							if (this.volveratirar < 2) {
								this.volveratirar++
								console.log("son iguales")
								console.log(this.volveratirar)
								//tirada = this.partida.lanzarDados()
								this.partida.moverFicha(this,resultado)
							}
							else { //vas a la carcel por tirar 3 dobles
								//vas a la carcel
								this.volveratirar = 0
								console.log("3 dobles")
								//console.log(this)
								this.partida.iralacarcel(this);
								//this.partida.pasarturno();
							}
						}	
						else {//no es doble
							this.volveratirar = 0;
							console.log("tirada normal, muevo y paso turno")
							this.partida.moverFicha(this,resultado);
							//this.partida.pasarturno();
						}
					}	
					else { //estas en la carcel
						console.log("estas en la carcel")
						console.log(this.color)
						console.log(this.turnocarcel)
						if (tirada[0] == tirada[1]){ //estas en la carcel, sacas dobles , sales
							this.carcel=false;
							this.turnocarcel = 0;
							this.partida.moverFicha(this,resultado);
							//this.partida.pasarturno();
							console.log("estas en la carcel y sacas doble")
						}
						else
							if (this.tarjetasalircarcel) { //estas en la carcel y sales por tener tarjeta de salir de la carcel
								console.log("tienes tarjeta y estas enla carcel")
								console.log(this.tarjetasalircarcel)
								console.log(this.turnocarcel)
								this.tarjetasalircarcel = false;
								this.carcel = false;
								this.turnocarcel = 0;	
								this.partida.moverFicha(this,resultado);
								//this.partida.pasarturno();
												
							}
							else
								if ((this.turnocarcel == 3) || pagarcarcel){ //llevas 3 turnos en la carcel o decides pagar
									this.pagar(50);
									//this.partida.agregarfondosBanco(50);
									console.log("sales pagando o con tres turnos")
									console.log(this.turnocarcel)
									this.partida.moverFicha(this, resultado);
									//this.partida.pasarturno();
									this.turnocarcel=0
									pagarcarcel=false
									this.carcel=false
								}
								else { //sigues esperando en la carcel
									this.turnocarcel++;
									//this.partida.pasarturno();
									console.log("esperas en la carcel")
									console.log(this.turnocarcel)
								}
					}
				console.log ("++++++++++++carcel +++++++++++++++")
			console.log("comprobar saldo"+this.saldo)	
			if (this.saldo<= 0) {
		//	if (this.saldo<=1300){
				this.Bancarota=true
				
				console.log("te has quedado sin dinero")
			}
			else {
				if (this.saldo>= this.partida.maxPresupuesto){
					console.log("La partida ha terminado, has superado el presupesto maximo, HAS GANADO")
					this.Ganador=true
					this.partida.fase = new FaseFinal();
					
				}
				
			}	
			return tirada
				
		
		}
			
		this.pagar = function(cantidad){
			this.saldo = this.saldo - cantidad
			return this.saldo
		}

		this.cobrar = function(cantidad){
			this.saldo = this.saldo + cantidad
			return this.saldo
		}
		
}

function titulocalle(precio,color){
	

	this.hipoteca = 0;
	this.casa = precio*0.50;
	this.hotel=0
	this.numcasas=0
	var incremento=this.casa*this.numcasas
	
	this.alquiler=precio*0.50+(precio*0.50*this.numcasas)
	
	this.iniIitulo=function(){
		this.alquiler=(precio*0.5)+(precio*0.5*this.numcasas)
			this.hipoteca=precio*0.5
			this.casa=precio*0.5
			this.hipoteca=precio*2.5
			
	}	
	
	this.ComprarCasa=function(ficha){
		
			this.numcasas++
			ficha.pagar(this.casa);
			ficha.partida.maxcasas--
			console.log(this.numcasas)
			
	
	}
	this.Edificarhotel=function(ficha){
		
			console.log ("puedes edificar hotel"+ficha.partida.maxhoteles)
			if (ficha.partida.maxhoteles>0) {
				console.log("hay hoteles para construir")
				this.hotel++;
				this.numcasas = 0;
				ficha.partida.maxhoteles--;
				console.log(this.numcasas+" casas "+this.hotel)
			}
			else
				console.log("no quedan hoteles para construir")
		
	}
	this.Buscarcalle=function(calle){
		var indicecasilla=0
			for (indice=0;indice<40;indice++) {
				if (tablero.casillas[indice].tema.tipo=="Calle")
					if (tablero.casillas[indice].tema.nombre==calle) 
						indicecasilla=indice
					
			} 
			return indicecasilla
	}
	this.Edificarcasa=function(ficha){
		
		var indiceposesion = ficha.obtenerposicion(ficha.Posesiongrupo,color)
		var indicegrupo = ficha.obtenerposicion(ficha.partida.grupocalles,color)
		var edificable = 2
		var indicecasilla = 0
		var casitas = false
		
		if (ficha.Posesiongrupo[indiceposesion].tamano == ficha.partida.grupocalles[indicegrupo].tamano){
		
			console.log("todas las propiedades del grupo: ")
			
			for (i=0;i<ficha.numpropiedades;i++){
					console.log(" estoy en el bucle")
				if (color == ficha.propiedades[i][2]){
					console.log ("una propiedad del mismo grupo")
					indicecasilla = this.Buscarcalle(ficha.propiedades[i][1]);
					if (tablero.casillas[indicecasilla].tema.titulo.numcasas == this.numcasas){ //comparo el numero de casas que tiene ese titulo
						casitas=true
						
					}
					
				}
			}
			if (casitas && this.hotel==0){
	
				console.log("todas la calles del grupo tienen el mismo numero de casas")
				if (this.numcasas==4 ){
					console.log("no puedes edificar mas casas")
					edificable=3 // 0 contruir, 1, no quedan casas , 2 te faltan calles, 3 no puedes construir mas
				}
				else{
					if (ficha.partida.maxcasas>0){
						console.log("quedan casas por edificar"+ficha.partida.maxcasas)
						console.log("puedes edificar una casa mas")
						edificable=0  // 0 contruir, 1, no quedan casas , 2 te faltan calles, 3 no puedes construir mas
						
					}
					else{
						console.log("no quedan casas para construir")
						edificable=1 // 0 contruir, 1, no quedan casas , 2 te faltan calles,3 no puedes construir mas
					}
	
				}
			}
			else {
				console.log("Todas las calles tienen que tener la mismas casas")
				edificable=4
			}	
		}
		else {
			console.log("no tienes todas las calles del barrio,sorry")
			edificable=2 // 0 contruir, 1, no quedan casas , 2 te faltan calles, 3 no puedes construir mas
		}
		console.log("edificable "+edificable)
		return edificable
	}
	
	this.vendercasa=function(ficha){
		
		if (this.numcasas>0) {
			this.numcasas--
			ficha.cobrar(this.casa);
			ficha.partida.maxcasas++
			console.log("casa vendida, te quedan: "+this.numcasas+ " casas")
			return true
		}
		else {
			console.log("No tienes mas casas para vender")
			return false
		}
			
	}
	
	this.venderhotel=function(ficha){
		if (this.hotel=1){
			this.hotel--
			ficha.cobrar(this.casa)
			ficha.partida.maxhoteles++
			console.log("hotel vendido")
			return true
		}
		else {
			console.log("no tienes hoteles para vender")
			return false
		}
	}
	
	

}


function tituloestacion(precio){
	this.hipoteca = 0
	this.numestaciones	= 0
	
	this.alquiler = (precio*0.5)*this.numestaciones
	this.iniIitulo=function(){
		this.alquiler=(precio*0.5)+(precio*0.5*this.numestaciones)
		this.hipoteca=precio*0.5
	}

/*	this.buscarestaciones=function(ficha){
		var estaciones = 0;
		
		for (i=0; i<ficha.numpropiedades;i++){
			if (ficha.propiedades[i].tipo="Estacion"){
				estaciones++
			}
		}
		this.numestaciones=estaciones
		return estaciones
	} */
}
	
function inicio(){
	this.nombre="Normal"
}
function Salida(){
	this.nombre="Salida"
}
function Suerte(){
	this.nombre="Suerte"
}
function Estacion(nombre,precio){
	this.tipo="Estacion"
	this.nombre=nombre
	this.precio=precio
	this.estado="libre"
	this.propietario= new Jugador("nadie")
	this.titulo=new tituloestacion(this.precio)
	
	this.comprar=function(ficha){
		if (ficha.pagar(this.precio)<0) {
			console.log("No tienes saldo para comprar")
			return false
		}
		else { 
			ficha.pagar(this.precio);
			ficha.agregarpropiedad(this.tipo,this.nombre);
			this.propietario=ficha.Jugador;
			this.estado="Nocomprable"
			this.titulo.numestaciones++
			console.log("Acabas de comprar esta estación")
			return true
			
		}
	}
	
	this.vender=function(ficha){
		
		this.propietario.ficha.saldo=this.propietario.ficha.saldo+this.precio;
		ficha.eliminarpropiedad(this.nombre,this.color)
		this.estado="libre"
	}
	
	
	this.alquiler=function(ficha){
		
		var pago=this.titulo().alquiler
		
		ficha.saldo=ficha.pagar(pago)
		console.log("el jugador paga el alquiler")
		Partida.buscarjugador(this.propietario).cobrar(pago)
		console.log("el propietario cobra el alquiler")
	}
}

function Calle(nombre, precio, color){
	this.tipo="Calle"
	this.nombre=nombre
	this.precio=precio
	this.color=color
	this.titulo=new titulocalle(this.precio,this.color)
	this.estado="libre"
	this.propietario= new Jugador("nadie")
	
	this.comprar=function(ficha){
			
			if (ficha.pagar(this.precio)<0) {
				console.log("No tienes saldo para comprar")
				return false
			}
			else { 
				//ficha.pagar(this.precio);
				ficha.agregarpropiedad(this.tipo,this.nombre,this.color);
				this.propietario=ficha.Jugador;
				this.estado="Nocomprable"
				console.log("Acabas de comprar esta calle")
				//console.log(this)
				
				return true
			
			}
		
		
		
			
	}
	
	this.vender=function(ficha){
		
		if (this.titulo.numcasas==0 || this.titulo.hotel==0) {
			this.propietario.ficha.saldo=this.propietario.ficha.saldo+this.precio;
			ficha.eliminarpropiedad(this.tipo,this.nombre,this.color)
			this.estado="libre"
			console.log("calle vendida")
			return true
		}
		else {
			console.log("todavía tienes casas u hoteles por vender")
			return false
		}
	}
	
	this.alquiler=function(ficha){
		
		var pago=this.titulo.alquiler
		
		ficha.saldo=ficha.pagar(pago)
		console.log("el jugador paga el alquiler")
		var acreedor = ficha.partida.buscarjugador(this.propietario)
		acreedor.saldo+=pago;
		
		console.log("el propietario cobra el alquiler")
	}
	

}
function Compania(nombre,precio){
	this.tipo="Compania"
	this.nombre=nombre
	this.precio=precio
	this.tasa=4
	this.estado="libre"
	this.propietario = new Jugador("nadie")
	this.comprar=function(ficha){
			
			if (ficha.pagar(this.precio)<0) {
				console.log("No tienes saldo para comprar")
				return false
			}
			else { 
				//ficha.pagar(this.precio);
				ficha.agregarpropiedad(this.tipo,this.nombre);
				this.propietario=ficha.Jugador;
				this.estado="Nocomprable"
				console.log("Acabas de comprar esta compañia")
				return true
			
			}
		
	}
	
	this.alquiler=function(ficha){
		
		var pago=ficha.tirada*this.tasa
		
		ficha.saldo=ficha.pagar(pago)
		console.log("el jugador paga el alquiler")
		var acreedor = ficha.partida.buscarjugador(this.propietario)
		acreedor.saldo+=pago;
		
		console.log("el propietario cobra el alquiler")
	}
}

function Carcel(){
	this.nombre="Carcel"
}
function Ircarcel(){
	this.nombre="Ir a la carcel"
}


function Impuesto(precio){
	this.nombre="Impuesto"
	this.precio=precio
}
function Caja(){
	this.nombre="Caja de Comunidad"
}

function Parking(){
	this.nombre="Parking"
}

function Tarjeta(nombre,comando, accion){
	this.nombre=nombre;
	this.comando=comando;
	this.accion=accion;
}

function Avanzar(posicion){
	this.ejecutar=function(ficha){
		console.log(posicion)
		console.log("avanzar++++++++")
		ficha.posicion=ficha.posicion+posicion
		console.log(ficha.posicion)
			
	}
	
}

function Multa(cantidad){
	this.ejecutar=function(ficha){
		console.log(cantidad)
		console.log(ficha.saldo)
		console.log("multa+++++++++")
		ficha.pagar(cantidad);
		console.log(ficha.saldo)
		
	}
	
}

function Retroceder(posicion){
	this.ejecutar=function(ficha){
		console.log("retroceder en funcion+++++++++++++")	
		console.log(ficha.posicion)
		if (ficha.posicion-posicion<0) 
			var nuevaPosicion = (ficha.posicion-posicion)+40;
		else
			var nuevaPosicion = ficha.posicion-posicion
		ficha.posicion=nuevaPosicion;
		console.log(ficha.posicion)
	} 
	
}

function Iracelda(posicion){
	this.ejecutar=function(ficha){
		console.log(posicion)
		console.log(ficha.posicion)
		if (posicion==0){
			ficha.posicion=posicion;
			ficha.saldo=ficha.saldo+200
		}
		else
			ficha.posicion=posicion;
		console.log(ficha.posicion)
	}

}


function SalirCarcel(){
	this.ejecutar=function(ficha){
		ficha.tarjetasalircarcel = true;
		console.log("has obtenido una tarjeta que te libra de la carcel")
		console.log(ficha.tarjetasalircarcel)
 }
} 
function iniJuego(){
		tablero = new Tablero(40)
		tablero.configurarTablero()
		//tablero.iniciarcajas()
}

module.exports.FaseInicial=FaseInicial;
module.exports.FaseJugar=FaseJugar; 
module.exports.FaseFinal=FaseFinal;
module.exports.Partida=Partida;
module.exports.Tablero=Tablero;
module.exports.Casilla=Casilla;
module.exports.Dado=Dado;
module.exports.Jugador=Jugador;
module.exports.Tarjetas=Tarjetas;
module.exports.Ficha=Ficha;
module.exports.titulocalle=titulocalle;
module.exports.tituloestacion=tituloestacion;
module.exports.inicio=inicio;
module.exports.Salida=Salida;
module.exports.Suerte=Suerte;
module.exports.Estacion=Estacion;
module.exports.Calle=Calle;
module.exports.Carcel=Carcel;
module.exports.Ircarcel=Ircarcel;
module.exports.Compania=Compania;
module.exports.Impuesto=Impuesto;
module.exports.Caja=Caja;
module.exports.Parking=Parking;
module.exports.tarjeta=Tarjeta;
module.exports.Avanzar=Avanzar;
module.exports.Multa=Multa;
module.exports.Retroceder=Retroceder;
module.exports.Iracelda=Iracelda;
module.exports.SalirCarcel=SalirCarcel;
module.exports.iniJuego=iniJuego;
