var modulo=require("./juego.js");

describe("Tablero",function(){


	beforeEach(function(){
		//new iniJuego();
		
		tablero = new modulo.Tablero(40)
		tablero.configurarTablero()
	});

	describe("Al iniciar",function(){
		it("El tablero deberia tener 40 casillas",function(){
			expect(tablero.numeroCasillas).toBeDefined(); //debe existir la variable
			expect(tablero.numeroCasillas).toEqual(40);	 //debe tener valor inicial 40
		});
	});

	describe("Comprobar casilla de SALIDA",function(){
		it("Casilla de Salida",function(){	
			expect(tablero.casillas[0].tema.nombre).toEqual("Salida");
		});
	});
	describe("Comprobar casillas de CAJA DE COMUNIDAD",function(){
		it("Caja de Comunidad en la posicion 2",function(){	
			expect(tablero.casillas[2].tema.nombre).toEqual("Caja de Comunidad");
		});
		it("Caja de Comunidad en la posicion 17",function(){	
			expect(tablero.casillas[17].tema.nombre).toEqual("Caja de Comunidad");
		});
		it("Caja de Comunidad en la posicion 33",function(){	
			expect(tablero.casillas[33].tema.nombre).toEqual("Caja de Comunidad");
		});
	});
	describe("Comprobar casillas de SUERTE",function(){		
		it("Suerte en la posicion 7",function(){	
			expect(tablero.casillas[7].tema.nombre).toEqual("Suerte");
		});
		it("SUERTE en la posicion 22",function(){	
			expect(tablero.casillas[22].tema.nombre).toEqual("Suerte");
		});
		it("SUERTE en la posicion 36",function(){	
			expect(tablero.casillas[36].tema.nombre).toEqual("Suerte");
		});
		
	});
	
	describe("Comprobar casillas de IMPUESTO",function(){	
		it("Impuesto en la posicion 4",function(){	
			expect(tablero.casillas[4].tema.nombre).toEqual("Impuesto");
			expect(tablero.casillas[4].tema.precio).toEqual(200);
		});
		it("Impuesto en la posicion 38",function(){	
			expect(tablero.casillas[38].tema.nombre).toEqual("Impuesto");
			expect(tablero.casillas[38].tema.precio).toEqual(100);
		});
	});
	
	describe("Comprobar casillas de COMPAÑIAS",function(){	
		it("Compañia de Electricidad",function(){	
			expect(tablero.casillas[12].tema.nombre).toEqual("Compañia de Electricidad");
			expect(tablero.casillas[12].tema.precio).toEqual(150);
		});
		it("Compañia del Agua",function(){	
			expect(tablero.casillas[28].tema.nombre).toEqual("Compañia del Agua");
			expect(tablero.casillas[28].tema.precio).toEqual(150);
		});
	});
	describe("Comprobar casillas de ESTACION",function(){
		it("Estacion de Goya",function(){	
			expect(tablero.casillas[5].tema.nombre).toEqual("Estacion de Goya");
		});
		it("Estacion de las Delicias",function(){	
			expect(tablero.casillas[15].tema.nombre).toEqual("Estacion de las Delicias");
		});
		it("Estacion del medio dia",function(){	
			expect(tablero.casillas[25].tema.nombre).toEqual("Estacion del medio dia");
		});
		it("Estacion del Norte",function(){	
			expect(tablero.casillas[35].tema.nombre).toEqual("Estacion del Norte");
		});
	});
	
	describe("Comprobar casillas de CARCEL",function(){		
		it("Carcel en la posicion 10",function(){	
			expect(tablero.casillas[10].tema.nombre).toEqual("Carcel");
		});
	});
	describe("Comprobar casillas de PARKING",function(){		
		it("Parking en la posicion 20",function(){	
			expect(tablero.casillas[20].tema.nombre).toEqual("Parking");
		});
	});
	describe("Comprobar casillas de IR A LA CARCEL",function(){		
		it("Ir a la carcel en la posicion 30",function(){	
			expect(tablero.casillas[30].tema.nombre).toEqual("Ir a la carcel");
		});
	});
})

describe("Comprobar casillas de CALLE",function(){
	beforeEach(function(){
		new modulo.iniJuego();
	});
		it("Calle Ronda de Valencia",function(){	
			expect(tablero.casillas[1].tema.nombre).toEqual("Ronda de Valencia");
			expect(tablero.casillas[1].tema.precio).toEqual(60);
			expect(tablero.casillas[1].tema.color).toEqual("Marron");
		});
		it("Calle Plaza Lavapies",function(){	
			expect(tablero.casillas[3].tema.nombre).toEqual("Plaza Lavapies");
			expect(tablero.casillas[3].tema.precio).toEqual(60);
			expect(tablero.casillas[3].tema.color).toEqual("Marron");
		});
		it("Calle Glorieta Cuatro Caminos",function(){	
			expect(tablero.casillas[6].tema.nombre).toEqual("Glorieta Cuatro Caminos");
			expect(tablero.casillas[6].tema.precio).toEqual(100);
			expect(tablero.casillas[6].tema.color).toEqual("AzulCielo");
		});
		it("Calle Avenida Reina Victoria",function(){	
			expect(tablero.casillas[8].tema.nombre).toEqual("Avenida Reina Victoria");
			expect(tablero.casillas[8].tema.precio).toEqual(100);
			expect(tablero.casillas[8].tema.color).toEqual("AzulCielo");
		});
		it("Calle Calle Bravo Murillo",function(){	
			expect(tablero.casillas[9].tema.nombre).toEqual("Calle Bravo Murillo");
			expect(tablero.casillas[9].tema.precio).toEqual(120);
			expect(tablero.casillas[9].tema.color).toEqual("AzulCielo");
		});
		it("Calle Glorieta de Bilbao",function(){	
			expect(tablero.casillas[11].tema.nombre).toEqual("Glorieta de Bilbao");
			expect(tablero.casillas[11].tema.precio).toEqual(140);
			expect(tablero.casillas[11].tema.color).toEqual("Rosa");
		});
		it("Calle Calle Alberto Aguilera",function(){	
			expect(tablero.casillas[13].tema.nombre).toEqual("Calle Alberto Aguilera");
			expect(tablero.casillas[13].tema.precio).toEqual(140);
			expect(tablero.casillas[13].tema.color).toEqual("Rosa");
		});
		it("Calle Calle Fuencarral",function(){	
			expect(tablero.casillas[14].tema.nombre).toEqual("Calle Fuencarral");
			expect(tablero.casillas[14].tema.precio).toEqual(160);
			expect(tablero.casillas[14].tema.color).toEqual("Rosa");
		});
		it("Calle Avenida Felipe II",function(){	
			expect(tablero.casillas[16].tema.nombre).toEqual("Avenida Felipe II");
			expect(tablero.casillas[16].tema.precio).toEqual(180);
			expect(tablero.casillas[16].tema.color).toEqual("Naranja");
		});
		it("Calle Calle Velazquez",function(){	
			expect(tablero.casillas[18].tema.nombre).toEqual("Calle Velazquez");
			expect(tablero.casillas[18].tema.precio).toEqual(180);
			expect(tablero.casillas[18].tema.color).toEqual("Naranja");
		});
		it("Calle Calle Serrano",function(){	
			expect(tablero.casillas[19].tema.nombre).toEqual("Calle Serrano");
			expect(tablero.casillas[19].tema.precio).toEqual(200);
			expect(tablero.casillas[19].tema.color).toEqual("Naranja");
		});
		it("Calle Avenida de America",function(){	
			expect(tablero.casillas[21].tema.nombre).toEqual("Avenida de America");
			expect(tablero.casillas[21].tema.precio).toEqual(220);
			expect(tablero.casillas[21].tema.color).toEqual("Rojo");
		});
		it("Calle Calle Maria de Molina",function(){	
			expect(tablero.casillas[23].tema.nombre).toEqual("Calle Maria de Molina");
			expect(tablero.casillas[23].tema.precio).toEqual(220);
			expect(tablero.casillas[23].tema.color).toEqual("Rojo");
		});
		it("Calle Calle Cea Bermudez",function(){	
			expect(tablero.casillas[24].tema.nombre).toEqual("Calle Cea Bermudez");
			expect(tablero.casillas[24].tema.precio).toEqual(240);
			expect(tablero.casillas[24].tema.color).toEqual("Rojo");
		});
		it("Calle Avenida de los Reyes Catolicos",function(){	
			expect(tablero.casillas[26].tema.nombre).toEqual("Avenida de los Reyes Catolicos");
			expect(tablero.casillas[26].tema.precio).toEqual(260);
			expect(tablero.casillas[26].tema.color).toEqual("Amarillo");
		});
		it("Calle Calle Bailen",function(){	
			expect(tablero.casillas[27].tema.nombre).toEqual("Calle Bailen");
			expect(tablero.casillas[27].tema.precio).toEqual(260);
			expect(tablero.casillas[27].tema.color).toEqual("Amarillo");
		});
		it("Calle Plaza de España",function(){	
			expect(tablero.casillas[29].tema.nombre).toEqual("Plaza de Espana");
			expect(tablero.casillas[29].tema.precio).toEqual(280);
			expect(tablero.casillas[29].tema.color).toEqual("Amarillo");
		});
		it("Calle Puerta del sol",function(){	
			expect(tablero.casillas[31].tema.nombre).toEqual("Puerta del sol");
			expect(tablero.casillas[31].tema.precio).toEqual(300);
			expect(tablero.casillas[31].tema.color).toEqual("Verde");
		});
		it("Calle Puerta Alcala",function(){	
			expect(tablero.casillas[32].tema.nombre).toEqual("Puerta Alcala");
			expect(tablero.casillas[32].tema.precio).toEqual(300);
			expect(tablero.casillas[32].tema.color).toEqual("Verde");
		});
		it("Calle Gran Via",function(){	
			expect(tablero.casillas[34].tema.nombre).toEqual("Gran Via");
			expect(tablero.casillas[34].tema.precio).toEqual(320);
			expect(tablero.casillas[34].tema.color).toEqual("Verde");
		});
		it("Calle Paseo de la Castellana",function(){	
			expect(tablero.casillas[37].tema.nombre).toEqual("Paseo de la Castellana");
			expect(tablero.casillas[37].tema.precio).toEqual(350);
			expect(tablero.casillas[37].tema.color).toEqual("AzulOscuro");
		});
		it("Calle Paseo del Prado",function(){	
			expect(tablero.casillas[39].tema.nombre).toEqual("Paseo del Prado");
			expect(tablero.casillas[39].tema.precio).toEqual(400);
			expect(tablero.casillas[39].tema.color).toEqual("AzulOscuro");
		});
});	


	
describe("Comprobar Dados",function(){		
		it("Al tirar dos dados, el resultado está entre 2 y 12", function(){
		var dado = new modulo.Dado()

		for(i=0;i<100;i++){
			var tirada = dado.calcularNumero() + dado.calcularNumero()
			expect(tirada).toBeGreaterThan(1);
			expect(tirada).toBeLessThan(13);
		}
		});
		it("Al tirar un dado, el resultado está entre 1 y 6", function(){
		var dado = new modulo.Dado()

		for(i=0;i<100;i++){
			var tirada = dado.calcularNumero()
			expect(tirada).toBeGreaterThan(0);
			expect(tirada).toBeLessThan(7);
		}
		});
});

describe(" Jugadores",function(){
		var partida
		var numjugadores

		beforeEach(function(){
			partida = new modulo.Partida()
			partida.iniciar();
			numjugadores = 6;
		});
	
		it("En la partida pueden jugar hasta 6 jugadores ", function(){
			for (i=0; i<numjugadores; i++){
				
				new modulo.Jugador("Javi").unirseAPartida(partida)
			}
			expect(partida.fichas.length).toEqual(6)

			usr = new modulo.Jugador("Nuevo")
			expect(usr.unirseAPartida(partida)).toEqual(false)
		});
		it("Un jugador tiene 1500 pelotis y una ficha de diferente color", function(){
			var colorIgual = false
			var colores = []

			for (i=0; i<numjugadores; i++){
				var usr = new modulo.Jugador("Javi")
				usr.unirseAPartida(partida)
				expect(usr.fichas.length).toEqual(1)
				expect(usr.fichas[0].saldo).toEqual(1500)

				var color = usr.fichas[0].color
				for (j=0; j<colores.length; j++){
			        if (colores[j] === color) {
			            colorIgual = true;
			        }
			    }
			    expect(colorIgual).toEqual(false)
				colores.push(usr.fichas[0].color)				
			}
		});
});

describe("Ficha",function(){	
		var partida

		beforeEach(function(){
			new modulo.iniJuego();
			partida = new modulo.Partida()
			partida.iniciar();
		});

		it("La posición de la ficha se modifica al tirar los dados", function(){
			var usr = new modulo.Jugador("Javier")
			usr.unirseAPartida(partida)
		
			var dado = new modulo.Dado()

			var posInicial = usr.fichas[0].getPosicion()
	
			var tirada = usr.fichas[0].lanzarDados()
			resultado = tirada[0]+tirada[1];
		
			expect(usr.fichas[0].getPosicion()).not.toEqual(posInicial)
			
		});

		it("La ficha se encuentra dentro de los limites del tablero al tirar los dados", function(){
			var usr = new modulo.Jugador("Javier")
			usr.unirseAPartida(partida)

			do {
				partida.moverFicha(usr.fichas[0], 5)
				expect(usr.fichas[0].getPosicion()).toBeLessThan(40)
				expect(usr.fichas[0].getPosicion()).toBeGreaterThan(-1)
			} while (usr.fichas[0].getPosicion() != 0)
		});
		it("Si la ficha lanza 3 dobles seguidos va a la carcel",function(){
			var usr = new modulo.Jugador("Javier")
			usr.unirseAPartida(partida)
			var dado = new modulo.Dado()
			var numtir = 0
			
			for (var i=0; i<4; i++)
			{
			
				tirada = partida.lanzarDados()
				tirada[0]=6
				tirada[1]=6
				if(tirada[0] == tirada[1])
				{
					numtir++
					if(numtir==3)
					{
					
					partida.iralacarcel(usr.fichas[0])
					expect(usr.fichas[0].posicion).toEqual(10);
						
						numtir=0;
					}
				}
				else
				{
					numtir=0
				}
			}	
		});
	});

describe("Estaciones",function(){
	var partida

		beforeEach(function(){
			new modulo.iniJuego();
			partida = new modulo.Partida()
			partida.iniciar();
			nuevaPosicion=25
			var usr = new modulo.Jugador("Javier")
			usr.unirseAPartida(partida)
		});
	it("La Estacion se puede comprar",function(){
		
	
		if (tablero.casillas[nuevaPosicion].tipo == "Estacion") { 
					if (tablero.casillas[nuevaPosicion].estado=="libre"){
						console.log("comprar")
						tablero.casillas[nuevaPosicion].comprar(ficha);
					//	expect(tablero.casillas[nuevaPosicion].estado).toEqual("libre");
						expect(tablero.casillas[nuevaPosicion].comprar(usr.fichas[0])).toEqual("true");
					}
					
		}
		
	});
	
	it("Con 2 Estaciones sube el alquiler",function(){

		var alquiler1 = 0
		var alquiler2 = 0
		
		tablero.casillas[nuevaPosicion].numestaciones=1;
		alquiler1 = (tablero.casillas[nuevaPosicion].precio*0,05)+(tablero.casillas[nuevaPosicion].precio*0,05*tablero.casillas[nuevaPosicion].numestaciones)
	
		tablero.casillas[nuevaPosicion].numestaciones=2;
		alquiler2 = (tablero.casillas[nuevaPosicion].precio*0,05)+(tablero.casillas[nuevaPosicion].precio*0,05*tablero.casillas[nuevaPosicion].numestaciones)
		expect(alquiler2).toBeGreaterThan(alquiler1)
	});
	
	it("Con 3 Estaciones sube el alquiler",function(){
		var alquiler1 = 0
		var alquiler2 = 0
		
		tablero.casillas[nuevaPosicion].numestaciones=2;
		alquiler1 = (tablero.casillas[nuevaPosicion].precio*0,05)+(tablero.casillas[nuevaPosicion].precio*0,05*tablero.casillas[nuevaPosicion].numestaciones)
	
		tablero.casillas[nuevaPosicion].numestaciones=3;
		alquiler2 = (tablero.casillas[nuevaPosicion].precio*0,05)+(tablero.casillas[nuevaPosicion].precio*0,05*tablero.casillas[nuevaPosicion].numestaciones)
		expect(alquiler2).toBeGreaterThan(alquiler1)
	});
	
	it("Con 4 estaciones sube el alquiler",function(){
		var alquiler1 = 0
		var alquiler2 = 0
		
		tablero.casillas[nuevaPosicion].numestaciones=3;
		alquiler1 = (tablero.casillas[nuevaPosicion].precio*0,05)+(tablero.casillas[nuevaPosicion].precio*0,05*tablero.casillas[nuevaPosicion].numestaciones)
	
		tablero.casillas[nuevaPosicion].numestaciones=4;
		alquiler2 = (tablero.casillas[nuevaPosicion].precio*0,05)+(tablero.casillas[nuevaPosicion].precio*0,05*tablero.casillas[nuevaPosicion].numestaciones)
		expect(alquiler2).toBeGreaterThan(alquiler1)
	});
});

describe("Calles",function(){
	var partida
	
		beforeEach(function(){
			new modulo.iniJuego();
			partida = new modulo.Partida()
			partida.iniciar();
			var usr = new modulo.Jugador("Javier")
			usr.unirseAPartida(partida)
			
		});
	it("Al comprar calle se decrementa el saldo por el precio de la misma",function(){
		
		var usr = new modulo.Jugador("Javier")
		usr.unirseAPartida(partida)
		
		i= 27 //un ejemplo para una sola calle
		tablero.casillas[i].tema.estado="libre"
		var saldoinicial = usr.fichas[0].saldo;
		tablero.casillas[i].tema.comprar(usr.fichas[0]);
		expect(usr.fichas[0].saldo).toEqual(saldoinicial-tablero.casillas[i].tema.precio);
		
	});
	
	it("Todas las calles se pueden comprar y tienen un valor",function(){
		
		var usr = new modulo.Jugador("Javier")
		usr.unirseAPartida(partida)
		usr.fichas[0].saldo=150000
		var numcalles = 0
		for (i=0; i<40 ;i++){
		
		 if(tablero.casillas[i].tema.tipo == "Calle"){
			expect(tablero.casillas[i].tema.comprar(usr.fichas[0])).toEqual(true);
			expect(tablero.casillas[i].tema.precio).toBeGreaterThan(0);
			numcalles++
		 }
		}
		expect(numcalles).toEqual(22)
		
		
	});
	
	it("Una calle comprada no puede volver a comprarse",function(){
		var usr = new modulo.Jugador("Javier")
		usr.unirseAPartida(partida)
		usr.fichas[0].saldo=1500
		nuevaposicion=27
	
		tablero.casillas[nuevaposicion].tema.comprar(usr.fichas[0]);
		
		if (tablero.casillas[nuevaposicion].tema.estado="Nocomprable")
			var comprar= false
		else
			var comprar = true
		expect(comprar).toEqual(false)
		
		
	});
	
	it("Si compra todas las calles, debe terner 22 propiedades",function(){
		
		var usr = new modulo.Jugador("Javier")
		usr.unirseAPartida(partida)
		usr.fichas[0].saldo=150000
		var numcalles = 0
		for (i=0; i<40 ;i++){
		
		 if(tablero.casillas[i].tema.tipo == "Calle"){
			tablero.casillas[i].tema.comprar(usr.fichas[0]);
			numcalles++
		 }
		}
		expect(usr.fichas[0].numpropiedades).toEqual(22)
		//expect(numcalles).toEqual(22)
		
		
	});
	
	it("Al caer en una calle comprada, paga alquiler correspondiente",function(){
		
		
		partida = new modulo.Partida()
		partida.iniciar();
		
	
		new modulo.iniJuego();
		usr = new modulo.Jugador("javier")
		usr.unirseAPartida(partida)
		var nuevaposicion = 3;
		
		var precio = tablero.casillas[nuevaposicion].tema.precio;
		var saldoinicial =usr.fichas[0].saldo;
		var pagoalquiler = tablero.casillas[nuevaposicion].tema.titulo.alquiler;
		
		tablero.casillas[nuevaposicion].tema.estado = "Nocomprable";
		if (tablero.casillas[nuevaposicion].tema.estado == "Nocomprable") {
			tablero.casillas[nuevaposicion].tema.alquiler(usr.fichas[0]);
		}
		
		expect(saldoinicial-pagoalquiler).toEqual(usr.fichas[0].saldo)
	});
	
	it("Un jugador que cae en todas las calles paga al otro",function(){
		
		partida = new modulo.Partida()
		partida.iniciar();
		
	
		new modulo.iniJuego();
		usr = new modulo.Jugador("javier")
		usr.unirseAPartida(partida)
		var nuevaposicion = 3;
		
		var pagoalquiler = 0;
		var saldoinicial =0;
		
		for (i=0;(i<40) && (tablero.casillas[i].tema.tipo == "Calle");i++){
			tablero.casillas[i].tema.comprar(usr.fichas[0]);
		 }
		
		
		for(i=0;(i<40) && (tablero.casillas[i].tema.tipo == "Calle");i++) {
			pagoalquiler += tablero.casillas[i].tema.titulo.alquiler;
			saldoinicial =usr.fichas[0].saldo;
			//tablero.casillas[i].tema.estado = "Nocomprable";
			if (tablero.casillas[i].tema.estado == "Nocomprable") {
				tablero.casillas[i].tema.alquiler(usr.fichas[0]);
				expect(saldoinicial-pagoalquiler).toEqual(usr.fichas[0].saldo)
			}
		}
	
		
		//expect(saldoinicial-pagoalquiler).toEqual(usr.fichas[0].saldo)
	});
});

describe("Pasar por la casilla de Salida", function(){
	var partida

		beforeEach(function(){
			partida = new modulo.Partida()
			partida.iniciar();
			new modulo.iniJuego();
			
		});
	it("Cobra 200 pelotis al pasar por la casilla de salida",function(){
		var usr = new modulo.Jugador("Javier")
		usr.unirseAPartida(partida)
		usr.fichas[0].setPosicion(39);
		partida = new modulo.Partida()
		partida.iniciar();
		var saldoinicial = usr.fichas[0].saldo;
		var num= 3; //das una vuelta entera
		
		partida.moverFicha(usr.fichas[0], num);
		expect(usr.fichas[0].saldo).toEqual(saldoinicial+200) 
		
	});
	
});

describe("Fases", function(){
	
	it("En fase de Inicio solo se pueden agregar usuarios", function(){
		partida = new modulo.Partida()
		partida.iniciar();
		new modulo.iniJuego();
		
		expect(partida.fase instanceof modulo.FaseInicial).toEqual(true)
		var usr = new modulo.Jugador ("Javier")
		usr.unirseAPartida(partida)
		expect (usr.fichas[0].lanzarDados()).toBeDefined()
	
	});
	
	it("En la fase de Juego solo se deja lanzar dados y transaciones", function(){
		partida = new modulo.Partida()
		partida.iniciar();
		var usr = new modulo.Jugador("Javier")
		usr.unirseAPartida(partida);
		
		
		usr.EmpezarJugar(partida);
		
		expect(partida.fase instanceof modulo.FaseJugar).toEqual(true)
		var numjugadores = partida.fichas.length
		usr1 = new modulo.Jugador("pedro")
		expect(usr1.unirseAPartida(partida)).toEqual(false)
		expect(partida.fichas.length).toEqual(numjugadores)
		
		

		
	});
	
	it("Al lanzar el juego,se encuentra en la Fase inicial", function(){
		partida = new modulo.Partida()
		partida.iniciar();
		
	expect(partida.fase instanceof modulo.FaseInicial).toEqual(true)
		
	});
	
	it("Un jugador invoca empezar, la fase cambia a Jugar", function(){
		partida = new modulo.Partida()
		partida.iniciar();
		var usr = new modulo.Jugador("Javier")
		usr.unirseAPartida(partida)
		
		
		usr.EmpezarJugar(partida);
		expect(partida.fase instanceof modulo.FaseJugar).toEqual(true)
		
	
	});
	
	it("Cuando un jugador alcanza el presupeusto máximo (200000 pelotis) se acaba la partida", function(){
		partida = new modulo.Partida()
		partida.iniciar();
		var usr = new modulo.Jugador("Javier")
		usr.unirseAPartida(partida)
		
		
		usr.EmpezarJugar(partida);
		usr.fichas[0].cobrar(200000);
		usr.fichas[0].lanzarDados();
		
	
		expect(partida.fase instanceof modulo.FaseFinal).toEqual(true)
		
		
	})
});





