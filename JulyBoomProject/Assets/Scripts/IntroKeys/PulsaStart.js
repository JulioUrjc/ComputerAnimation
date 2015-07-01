private var p1:GameObject; // Contendra el modelo del Player1
private var p2:GameObject; // Contendra el modelo del Player2
var sonido : AudioClip; // El sonido que se usará para cuando se pulse espacio

function Start() {
	p1=GameObject.Find("Bomberman player1"); // Obtenemos la referencia al modelo del Player1
	p2=GameObject.Find("Bomberman player2"); // Obtenemos la referencia al modelo del Player2
	p1.animation.Play("caminar", PlayMode.StopAll);
	p2.animation.Play("caminar", PlayMode.StopAll);
}

function EyS(){ // Esta funcion espera 1.5 segundo y carga el script del juego
		yield WaitForSeconds (1.5);
		Application.LoadLevel ("GeneradorDeMapa2");
}

function EyS2(){ // Esta funcion espera 1.5 segundo y carga el script del juego
		yield WaitForSeconds (1.5);
		Application.LoadLevel ("MainMenu");
}

function Update () {	// Controla que se pulse la tecla espacio. En caso afirmativo cambia la animacion del Player1 y del Player2. Suena el sonido. Luego llama a EyS()
	if (Input.GetKeyDown ("space")){
		p1.animation.Play("broma", PlayMode.StopAll);
		p2.animation.Play("ganar",PlayMode.StopAll);
		audio.PlayOneShot(sonido);
		EyS();
	}
	if (Input.GetKeyDown (KeyCode.Escape)){
		p1.animation.Play("broma", PlayMode.StopAll);
		p2.animation.Play("ganar",PlayMode.StopAll);
		audio.PlayOneShot(sonido);
		EyS2();
	}
}