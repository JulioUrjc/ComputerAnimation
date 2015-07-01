private var Moviendo:boolean=false;
private var Escenario;
var Bomba : GameObject;
var bombasPuestas:int = 0;

var muerto: boolean = false;
var Vel:int=1;					//Velocidad del jugador
var MaxBombas:int=1;		//Bombas que puede tirar antes de que exploten
var MaxRadio:int=1;		//Radio de la explosión de las bombas del jugador
private var MoveX:int=0;
private var MoveZ:int=0;
private var PosXDestino=0;
private var PosZDestino=0;
private var LazyTime:float=0;
private var PonerBomba:boolean=false;

//Función que incrementa la velocidad del jugador
function MoreVel(){
	if (Vel<10)	Vel++;
}

//Función que incrementa las bombas que puede tirar el jugador.
function MoreBombas(){
	if(MaxBombas<10)
		MaxBombas++;
}

//Función que incrementa el radio de la explosión de las bombas
function MoreRadio(){
	if(MaxRadio<10)
		MaxRadio++;
}

// Tipos de item
// 1 - Bota
// 2 - Bomba
// 3 - Explosion
function getItem(){
	var x:int=Mathf.RoundToInt(transform.position.x);
	var z:int=Mathf.RoundToInt(transform.position.z);
	
		switch (Escenario.itemTipo(x, z)){
			case 1:
				MoreVel();
				break;
			case 2:
				MoreBombas();
				break;
			case 3:
				MoreRadio();
				break;
		}
}

function PutBomba(){
	if (bombasPuestas < MaxBombas){
		bombasPuestas++;
		animation.Play("bomba",PlayMode.StopAll);
		var pos = transform.position +  Vector3 (0, 0, 0);
		var bomb = Instantiate(Bomba, pos, transform.rotation);
		var script=bomb.GetComponent("Bomba");
		script.SetRadius(MaxRadio);
		bomb.name = "Bomba1";//+bombasPuestas;
	}
}

function Mover(){
	transform.Translate(MoveX*Time.deltaTime*Vel, 0, MoveZ*Time.deltaTime*Vel); //RESPECTO AL EJE DE COORDENADAS DEL OBJETO
	if ( (Mathf.Abs(transform.position.x-PosXDestino)<0.1) &&Mathf.Abs(transform.position.z-PosZDestino)<0.1 ) {
		Moviendo=false;
	} else {
		if ((transform.eulerAngles.y-0)<5 && (transform.eulerAngles.y-0)>-5){ //Si esta mirando hacia arriba.
			//Me muevo hacia arriba:
			if (transform.position.z>PosZDestino) {
				Moviendo=false;
				transform.position.x=PosXDestino;
				transform.position.z=PosZDestino;
			}
		} else if ((transform.eulerAngles.y-180)<5 && (transform.eulerAngles.y-180)>-5){	//Abajo (180º)
			//Me muevo hacia abajo
			if (transform.position.z<PosZDestino) {
				Moviendo=false;
				transform.position.x=PosXDestino;
				transform.position.z=PosZDestino;				
			}
		} else if ((transform.eulerAngles.y-90)<5 && (transform.eulerAngles.y-90)>-5){ // Izquierda (-90º)
			//Me muevo hacia derecha
			if (transform.position.x>PosXDestino) {
				Moviendo=false;
				transform.position.x=PosXDestino;
				transform.position.z=PosZDestino;
			}
		} else if ((transform.eulerAngles.y-270)<5 && (transform.eulerAngles.y-270)>-5){ // Derecha (90º)
			//Me muevo hacia izq
			if (transform.position.x<PosXDestino) {
				Moviendo=false;
				transform.position.x=PosXDestino;
				transform.position.z=PosZDestino;				
			}	
		}
	}
}


function MovePer(RotFinal:int,DeltaX:int,DeltaZ:int){

	transform.Rotate(0,RotFinal-transform.eulerAngles.y,0,Space.World); //Rota hacia el angulo elegido como RotFinal
	
	var x:int=Mathf.RoundToInt(transform.position.x)+DeltaX; //Calcula la posicion final de muestro personaje segun los ejes universales
	var z:int=Mathf.RoundToInt(transform.position.z)+DeltaZ;
	
	if (Escenario.CanMove(x,z)) { //Pregunta a Escenario si nos podemos mover a esa posicion.
		Moviendo=true;	// Me estoy moviendo => activar animacion, desactivar el control de teclado
		if (!animation.IsPlaying("caminar"))	animation.Play("caminar",PlayMode.StopAll);
		MoveZ=1;		// Por efecto de los ejes del personaje, al rotar siempre se mueve en el eje Z !!!
		PosXDestino =x; // Establece el destino
		PosZDestino=z;
	}
}

function EyS(){ // Esta funcion espera 1 segundo y carga la escena de ganador
		yield WaitForSeconds (1);
		Application.LoadLevel ("PLAYER2Win");
}

function Start(){
	Escenario=GameObject.Find("Escenario").GetComponent("Escenario");
}

function Update () {

		 //buscar si las bombas aun no han explotado
		if(GameObject.Find("Bomba1") == null){  // Find es muy lento
			bombasPuestas = 0;
		}

		if (Escenario.HayExplosion(Mathf.RoundToInt(transform.position.x),Mathf.RoundToInt(transform.position.z))) {
			muerto =true;
		}		
		
		// Comprobar si ha sido alcanzado
		if(muerto){
			animation.Play("perder",PlayMode.StopAll);
			//llamar a escena de ganador perdedor
			EyS();
			
		} else {
			//if(Input.GetKeyDown("UnoAccion")){
			if(Input.GetButtonDown("UnoAccion")){
				PonerBomba=true;
			}
			
			if (Moviendo==false){ //Si he acabado de moverme al bloque entonces puedo elegir a donde moverme 

				//Obtener Items
				getItem();
				
								//Bomba
				if (PonerBomba){
					//Instanciar Bomba
					PutBomba();
					PonerBomba=false;
				}		

				if (Input.GetButton ("UnoArriba")) { 
					MovePer(0,0,1); // Arriba => 0 grados, x=x+0, z=z+1
				}else if (Input.GetButton("UnoAbajo")){
					MovePer(180,0,-1); // Abajo => 180 grados, x=x+0, z=z-1
				} else if (Input.GetButton("UnoIzquierda")){
					MovePer(-90,-1,0); //Izquierda => -90 grados, x=x-1, z=z+0
				} else if (Input.GetButton("UnoDerecha")){
					MovePer(90,1,0); //Derecha => 90 grados, x=x+1, z=z+0
				} else if (animation.IsPlaying("caminar")){
					animation.Play("idle",PlayMode.StopAll); //Activo la animación	
				}
			
				// if (Input.GetKey ("UnoArriba")) { 
				// 	MovePer(0,0,1); // Arriba => 0 grados, x=x+0, z=z+1
				// }else if (Input.GetKey("UnoAbajo")){
				// 	MovePer(180,0,-1); // Abajo => 180 grados, x=x+0, z=z-1
				// } else if (Input.GetKey("UnoIzquierda")){
				// 	MovePer(-90,-1,0); //Izquierda => -90 grados, x=x-1, z=z+0
				// } else if (Input.GetKey("UnoDerecha")){
				// 	MovePer(90,1,0); //Derecha => 90 grados, x=x+1, z=z+0
				// } else if (animation.IsPlaying("caminar")){
				// 	animation.Play("idle",PlayMode.StopAll); //Activo la animación	
				// }

				//Control de tiempo sin moverse:
				LazyTime+=Time.deltaTime; // Le sumo el tiempo del ultimo render.
				if (LazyTime>7){ //Si lleva siete segundos sin moverse => animción para llamar la atención.
					animation.Play("broma",PlayMode.StopAll); //Activo la animación			
					animation.PlayQueued("idle", QueueMode.CompleteOthers); // Establezco la animación de caminar como la siguiente.
					
					LazyTime=0; // Vuelvo a poner el contador a 0
				}

			} else { //Mientras estoy en movimientos sigo en ello.
				Mover();
				LazyTime=0; // Establezco a 0 el contador de LazyTime ya que moverse se considera hacer algo.
			}
	
	}
}