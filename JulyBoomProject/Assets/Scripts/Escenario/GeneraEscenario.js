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
var suelo: Transform;
var tilesx: int;
var tilesy: int;

function PonLuz(x:int, z:int){
	// Make a game object
	var lightGameObject : GameObject = new GameObject("Luz"+z+x);

	// Add the light component
	lightGameObject.AddComponent(Light);

	// Set color and position
	lightGameObject.light.color = Color.white;
	lightGameObject.light.intensity=0.25;
	// Set the position (or any transform property) after
	// adding the light component.
	lightGameObject.transform.position = Vector3(x, 5, z);
}

function getLongX(){
	return this.tilesy*100;
}

function getLongZ(){
	return this.tilesx*100;
}

function Awake () {	
	if ((tilesx>3) && (tilesy>3)) {
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
							if(((x+z)%4)==0) PonLuz(x,z);
						}
					}
				//var cube = GameObject.CreatePrimitive(PrimitiveType.Cube);
				//cube.AddComponent(Rigidbody);
				}
			}
		}
	}else{
		print("No se puede crear tablero");
	}
}