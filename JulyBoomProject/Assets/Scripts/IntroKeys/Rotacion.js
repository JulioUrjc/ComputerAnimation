var Velocidad:int=1;
function Update () {
transform.Rotate(0,Time.deltaTime*Velocidad,0);
}