// Este script anima el color de fondo haciendo un efecto ping-pong
var color1 : Color = Color.red; //Color de ejemplo
var color2 : Color = Color.blue;

var duration = 3.0; // tiempo de realizacion

// Limpiamos los flags de color.
camera.clearFlags = CameraClearFlags.SolidColor;

function Update () {
var t : float = Mathf.PingPong (Time.time, duration) / duration; // Calcula la "posicion" en la transicion de color
camera.backgroundColor = Color.Lerp (color1, color2, t); // Establece el color teniendo en cuenta que estamos en una transición.
}