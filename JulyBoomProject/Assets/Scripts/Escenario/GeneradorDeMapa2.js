// NOTA: PARA QUE FUNCIONE ESTE SCRIPT TIENES QUE ADJUNTARLO A 
//            UN ELEMENTO DE LA ESCENA ACTUAL (EN HIERARCHY) Y PASARLE 
//			A TRAVES DEL INSPECTOR EL TAMAÑO EN BLOQUES (X E Y) 
//			Y EL PREFAB PARA EL SUELO Y PARA LAS COLUMNAS.
//
// GENERARA LAS DIFERENTES INSTANCIAS CON EL NOMBRE: NomPrefab+X+Z
//	SIENDO X Y Z LAS POSICIONES MEDIDAS EN BLOQUES.
// TAMBIEN GENERARA LA ILUMINACION.

// UTILIDAD GENERAR RAPIDAMENTE LA PLANTILLA

var bloque : Transform;
var item1 : Transform;
var item2 : Transform;
var item3 : Transform;
var destruible : Transform;
var suelo: Transform;
var player1: Transform;
var player2: Transform;
var tilesx: int;
var tilesy: int;
var nitems: int;
var ndestruibles: int;
private var Ocupado;
		
function PonLuz(x:int, z:int){
	// Make a game object
	var lightGameObject : GameObject = new GameObject("Luz"+z+x);

	// Add the light component
	lightGameObject.AddComponent(Light);

	// Set color and position
	lightGameObject.light.color = Color.white;
	lightGameObject.light.type = LightType.Directional;
	lightGameObject.light.intensity=0.50;
	// Set the position (or any transform property) after
	// adding the light component.
	lightGameObject.transform.Rotate(Vector3(70, 0, 0), Space.Self);
	lightGameObject.transform.position = Vector3(x, 5, z);
}

function PonItems(x: int, z:int){
	ar = new Array(3);
	ar[0] = item1;
	ar[1] = item2;
	ar[2] = item3;
	i = Random.Range(0, 3);

	var it = Instantiate (ar[i], Vector3(x, 0, z), Quaternion.identity); 
	it.transform.eulerAngles.y+=180;
	it.name="Item"+z+x;
}

function PonDestruibles(x: int, z:int){
//	ocupado[(x-1)][(z-1)]=1;
	des = Instantiate (destruible, Vector3(x, 0, z), Quaternion.identity); 
	des.name="DestruibleX"+x+"_Z"+z;
}

function CanPut(x: int, z:int):boolean{
	// Si hay un bloque fijo
	if( (x%2==0)&&(z%2==0) )
		return false;
	
	// Si es una posición de las esquinas
	if( (x==1 && z==1)||(x==1 && z==2)||(x==2 && z==1)||(x==1 && z==tilesx)||(x==2 && z==tilesx)||(x==1 && z==tilesx-2)||(x==1 && z==tilesx-3)||(x==2 && z==tilesx-2)||(x==tilesy-2 && z==1)||(x==tilesy-2 && z==2)||(x==tilesy-3 && z==1)||(x==tilesy-2 && z==tilesx-2)||(x==tilesy-3 && z==tilesx-2)||(x==tilesy-2 && z==tilesx-3) ){
		return false;
	}
	
	// Si ya colocamos ahí un destruible es falso
	if( Ocupado[x][z] ){
		Debug.Log("Valor X: "+x+" Z: "+z);
		return false;
	}
	
	return true;
}

function getLongX(){
	return this.tilesy*100;
}

function getLongZ(){
	return this.tilesx*100;
}

function Awake () {	
	if ((tilesx>3) && (tilesy>3)) {
	
		Ocupado=new Array[tilesx];
		for (var l:int=0;l<=tilesx-1;l++){
			Ocupado[l]=new Array();
			for (var m:int=0;m<=tilesy-1;m++){
				Ocupado[l][m]=false;
			}
		}
		
		
		var a:Object;
		var Escenario:GameObject = GameObject("Escenario");
		Escenario.AddComponent("Escenario");
		Escenario.GetComponent("Escenario").Tamano=Mathf.Max(tilesx,tilesy);
		for (var x = 0; x < tilesy; x++) {
			for (var z = 0; z < tilesx; z++) {
				
				if ((x==0) || (x==tilesy-1)) {
					a = Instantiate (bloque, Vector3(x, 0, z), Quaternion.identity); 
					a.name="Bloque"+z+x;
				} else {
					if ((z==0) ||  (z==tilesx-1)) {
						a=Instantiate (bloque, Vector3(x, 0, z), Quaternion.identity);
						a.name="Bloque"+z+x;
					} else {
						if ((x%2==0)&&(z%2==0)) {
							a=Instantiate (bloque, Vector3(x, 0, z), Quaternion.identity);
							a.name="Bloque"+z+x;
						} else {
							a=Instantiate (suelo, Vector3(x, 0, z), Quaternion.identity);
							a.name="Suelo"+z+x;
							//if(((x+z)%8)==0) PonLuz(x,z);
						}
					}
				//var cube = GameObject.CreatePrimitive(PrimitiveType.Cube);
				//cube.AddComponent(Rigidbody);
				}
			}
		}
		
		PonLuz(tilesy/2,tilesx/2);
		
		
		// Añadir bloques destruibles e ítems en posiciones random
		var i:int=0;
		var itaux:int=0;
		var limite:int=tilesy*tilesx; // 4 randoms de todo el tablero más que suficiente para buscar huecos libres
		var vueltas:int=0;
		
		while(i<=ndestruibles && vueltas<=limite){
			vueltas++;
			
			var ejex:int = Random.Range(1, tilesy-1);
			var ejez:int = Random.Range(1, tilesx-1);
			// Si la posición aleatoria tiene hueco colocar Destruible
			if(CanPut(ejex, ejez)){
				//Debug.Log("x: "+ejex+" y: "+ejez);
				i++;
				PonDestruibles(ejex, ejez);
				Ocupado[ejex][ejez]=true;
				
				// Colocar en ese destruible un ítem si no pusimos el tope
				if(itaux <= nitems){
					PonItems(ejex, ejez);
					itaux++;
				}
			}
		}
		
		// Crear jugadores
		p1 = Instantiate (player1, Vector3(1, 0, 1), Quaternion.identity); 
		p1.name="Player1";
		
		p2 = Instantiate (player2, Vector3(tilesy-2, 0, tilesy-2), Quaternion.identity);
		p2.name="Player2";		
		p2.transform.Rotate(Vector3(0, 180, 0), Space.Self);
	
				
	}else{
		print("No se puede crear tablero");
	}
}