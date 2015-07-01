var Tamano:int=60;

private var capas:int=3; //capa 0 para mapa, capa 1 para destructibles, bombas, 2 para items, 3 para explosiones
private var Bloques; //Representa a los bloques y los elementos

function Awake (){
	Bloques=new Array[Tamano];
	for (var i:int=0;i<=Tamano-1;i++){
		Bloques[i]=new Array();
		for (var j:int=0;j<=Tamano-1;j++){
			Bloques[i][j]=new Array();
			for (var k:int=0;k<=capas-1;k++){
				Bloques[i][j][k]=null; //null Significa que no existe ningun elemento.
			}
			Bloques[i][j][3]=0;
		}
	}
}

function isOkXY(posx:int,posy:int){
	if  ( (0<=posx)&&(posx<Tamano) &&(0<=posy)&&(posy<Tamano) ){
		return true;
	} else {
		return false;
	}
}

//Esta función devuelve el tipo de objeto recolectado y elimina de nuestra matriz de objetos y de la escena a nuestro item.
function itemTipo(posx:int, posy:int){
		if(Bloques[posx][posy][2]!=null){
			var tipo = Bloques[posx][posy][2].GetComponent("CaracteristicasItem").getTipo();
			Destroy(Bloques[posx][posy][2].gameObject);
			Bloques[posx][posy][2]=null;
			return tipo;
		}
}


function CanMove(posx:int,posy:int){ //Si el elemento es pisable lo devolvemos.
	var resp:boolean=false;
	var resp2:boolean=false;
	if  ((0<posx)&&(posx<Tamano) && (0<posy)&&(posy<Tamano)) {
		if (Bloques[posx][posy][0]!=null){ // En caso de que en esa posicion haya un bloque
			resp=Bloques[posx][posy][0].GetComponent("Caracteristicas").Pisable(); // Le pregunto al bloque del nivel 1 si es pisable.
		} else { // Si no hay bloque por defecto le dejamos que se mueva
			resp=true;
		}
		if (Bloques[posx][posy][1]!=null){ // Si en el nivel 2 hay bloque entonces compruebo si el bloque es pisable
			resp2=Bloques[posx][posy][1].GetComponent("Caracteristicas").Pisable();
		} else { // Si no hay bloque entonces me puedo mover.
			resp2=true;
		}
		//Comprobar si hay bomba
		return resp&&resp2; // Si las dos condiciones son ciertas entonces puedo moverme.
	} else {
		return false;
	}
	
}

function Fichar(posx:int,posy:int,bloque:Transform){
	Bloques[posx][posy][0]=bloque;
}

function DameBloque(posx:int,posy:int):Transform{
	if (isOkXY(posx,posy)){
		return Bloques[posx][posy][0];
	} else {
		return null;
	}
}

function BorraBloque(posx:int,posy:int){
	if (isOkXY(posx,posy)){
		if (Bloques[posx][posy][0]!=null){
			Destroy(Bloques[posx][posy][0].gameObject); // Destruyo el bloque
			Bloques[posx][posy][0]=null; // Le digo al array ahora no hay bloque en esa posición
		} else {
			Debug.Log("No se ha podido borrar bloque, no hay bloque en x="+posx+", y="+posy);
		}
	}
}

//Esta función ficha nuestro item en la matriz de bloques en el nivel 2.
function FicharItem(posx:int,posy:int,item:Transform){
	Bloques[posx][posy][2]=item;
}

function DameItem(posx:int,posy:int):Transform{
	if (isOkXY(posx,posy)){
		return Bloques[posx][posy][2];
	} else {
		return null;
	}
}

function BorraItem(posx:int,posy:int){
	if (isOkXY(posx,posy)){
		if (Bloques[posx][posy][2]!=null){
			Destroy(Bloques[posx][posy][2].gameObject); // Destruyo elitem
			Bloques[posx][posy][2]=null; // Le digo al array ahora no hay item en esa posición
		} else {
			Debug.Log("No se ha podido borrar el item, no hay bloque en x="+posx+", y="+posy);
		}
	}
}

function FicharElem(posx:int,posy:int,bloque:Transform){
	Bloques[posx][posy][1]=bloque;
}

function DameElem(posx:int,posy:int):Transform{
	if (isOkXY(posx,posy)){
		return Bloques[posx][posy][1];
	} else {
		return null;
	}
}

function BorraElem(posx:int,posy:int){
	if (isOkXY(posx,posy)){
		if (Bloques[posx][posy][1]!=null){
			Destroy(Bloques[posx][posy][1].gameObject); // Destruyo el bloque
			Bloques[posx][posy][1]=null; // Le digo al array ahora no hay bloque en esa posición
		} else {
			Debug.Log("No se ha podido borrar elemento, no hay elemento en x="+posx+", y="+posy);
		}
	}
}

function FicharExplosion(x,z){ //Cuenta el numero de explosiones actuales en la casilla
	if (isOkXY(x,z)){
		Bloques[x][z][3]=1;
	} // Si se salen fuera del tablero me da igual lo que pasen con ellos
}

function EliminarExplosion(x,z){ //Elimina una explosion de la casilla
	if (isOkXY(x,z)){
		Bloques[x][z][3]-=1;
	} // Si se salen fuera del tablero me da igual lo que pasen con ellos
}

function HayExplosion(x:int,z:int){
	if (isOkXY(x,z)){
		if (Bloques[x][z][3]>0)	return true;
		else return false;
	}else{
		return false;
	}
	
}