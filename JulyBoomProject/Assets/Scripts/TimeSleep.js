function EyS(){ // Esta funcion espera 1.5 segundo y carga el script del juego
		yield WaitForSeconds (6);
		Application.LoadLevel ("MainMenu");
}

function Update () {
EyS();
}