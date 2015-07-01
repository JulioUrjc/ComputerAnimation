//var Bomba : Transform;
private var Escenario;
var Mecha: GameObject;
//var tiempo;
var player;
var posX:int;
var posZ:int;
var explosion : GameObject;
private var RadioBomba:int = 1;
	

function Start(){
	Escenario=GameObject.Find("Escenario").GetComponent("Escenario");
	Mecha = Instantiate(Mecha, transform.position + Vector3(0,0.9,0), transform.rotation);
	posX = Mathf.RoundToInt(transform.position.x);
	posZ = Mathf.RoundToInt(transform.position.z);
	yield WaitForSeconds(3);
	KillSelf();
}

function PosExplotable(x:int,z:int){  //Nos dice si en el escenario esa posicion podria explotar
	var Bloque=Escenario.DameBloque(x,z);
	var Elemento=Escenario.DameElem(x,z);
	
	if (Bloque!=null){
		var ScriptBloque=Bloque.GetComponent("Caracteristicas");	
		if (ScriptBloque.Pisable()==true){
			return true;
		} else {
			return false;
		}
	} else {
		return true;
	}
}


function KillSelf(){	
	Instantiate(explosion,transform.position, transform.rotation);	// Esta explosion ocurre siempre
	RealizaExplosiones(RadioBomba,true,true); // Derecha
	RealizaExplosiones(RadioBomba,true,false); //Izquierda
	RealizaExplosiones(RadioBomba,false,true); //Arriba
	RealizaExplosiones(RadioBomba,false,false); // Abajo
	
	//Escenario.BorraElem(posX, posZ);
	Destroy(Mecha);
	Destroy(gameObject);	
}

function RealizaExplosiones(Radio:int,XoZ:boolean,Signo:boolean){//XoZ es true si x, Signo es true si positivo
	var Parar=false;
	var Positivo:int;
	var isX:int;
	var isZ:int;
	var vectorX:int=0;
	var vectorZ:int=0;
	var Elem;
	var ScriptElem;
	var ScriptItem;
	//var posx:int=Mathf.RoundToInt(transform.position.x);
	//var posz:int=Mathf.RoundToInt(transform.position.x);
	
	if (XoZ==true) {
		isX=1;
		isZ=0;
	} else {
		isX=0;
		isZ=1;
	}
	
	if(Signo==true){
		Positivo=1;
	} else {
		Positivo=-1;
	}	
	
	for (var i:int=1; (i<=Radio);i++){ //
		if (Parar==false) {
			if (PosExplotable(posX+i*isX*Positivo , posZ+i*isZ*Positivo)) {
				//Comprobamos si hay bloque o item en la posicion
				Elem=Escenario.DameElem(posX+i*isX*Positivo,posZ+i*isZ*Positivo);
				if (Elem!=null){ // Si hay un elemento que para la explosion entonces la paramos
					ScriptElem=Elem.GetComponent("Caracteristicas");
					if (ScriptElem.ParaExplosion()){ // Esto implica que es un bloque pisable
						Parar=true;
					}
				}
				vectorX=i*isX*Positivo;
				vectorZ=i*isZ*Positivo;
				Instantiate(explosion,transform.position +Vector3 (vectorX, 0, vectorZ), transform.rotation);
				
				if (Elem!=null){//Borrar elementos destruibles, si hay item NO lo destruyo
					if (ScriptElem.ParaExplosion()){ //Es un bloque destruible
						Escenario.BorraElem(posX+i*isX*Positivo, posZ+i*isZ*Positivo);
					} else { // Es una bomba y la dejo estar ahi
						Debug.Log("Es una bomba");
					}
				} else { // Si no hay un elemento podria haber un item
					Item=Escenario.DameItem(posX+i*isX*Positivo, posZ+i*isZ*Positivo);
					if (Item!=null){// Si hay item lo destruyo
						Escenario.BorraItem(posX+i*isX*Positivo, posZ+i*isZ*Positivo);
					}
				}
				
				//Borramos items
				

					
			} else { // Si encontroamos un bloque en el que no se puede poner bomba, en los siguientes tampoco se podrá.
				Parar=true; 
			}
		}
	}
	
}


function SetRadius(R:int) {
	RadioBomba=R;
}
