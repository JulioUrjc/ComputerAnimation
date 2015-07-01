//Una vez inicializado el array en Escenario entonces puedo mandarle mis datos.
function Start (){
var Esc=GameObject.Find("Escenario").GetComponent("Escenario");
Esc.Fichar(Mathf.RoundToInt(transform.position.x),Mathf.RoundToInt(transform.position.z),GetComponent("Transform")); //El elemento transform lo tienen todos los elementos
}

function Update () {
}