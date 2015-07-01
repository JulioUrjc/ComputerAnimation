private var Escenario;

function Awake(){
Escenario=GameObject.Find("Escenario").GetComponent("Escenario");
Escenario.FicharExplosion(Mathf.RoundToInt(transform.position.x),Mathf.RoundToInt(transform.position.z));
}

function esperar(){
yield WaitForSeconds (1);
}

function Update(){
esperar();
Escenario.EliminarExplosion(Mathf.RoundToInt(transform.position.x),Mathf.RoundToInt(transform.position.z));
Destroy(this);
}

