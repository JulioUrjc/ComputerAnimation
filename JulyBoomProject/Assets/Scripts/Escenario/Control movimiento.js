// ESTE SCRIPT PERMITE MOVER Y ROTAR UN ELEMENTO, ESTA PENSADO PARA ASOCIAR
// CON LA CAMARA Y PODERNOS MOVER POR EL ESCENARIO

var speed = 5.0;
private var x:float;
private var z:float;
private var gx:float;
private var gy:float;
private var move:boolean =false;
function Update () {
	x = Input.GetAxis("Horizontal") * Time.deltaTime * speed;
	z = Input.GetAxis("Vertical") * Time.deltaTime * speed;
	if (Input.GetKeyDown (KeyCode.Keypad1)){
		gx= (gx+1) * speed;
		move=true;
		}
	if (Input.GetKeyDown (KeyCode.Q)){
		gx= (gx-1)* speed;
		move=true;
		}
	if (Input.GetKeyDown (KeyCode.Keypad3)){
		gy= (gy+1) * speed;
		move=true;
		}
	if (Input.GetKeyDown (KeyCode.E)){
		gy= (gy-1) * speed;
		move=true;
		}
	if (move==true) {
		transform.Rotate (gx, gy, 0, Space.Self);
		gx=0;
		gy=0;
		move=false;
	}
	transform.Translate(x, 0, z);
}