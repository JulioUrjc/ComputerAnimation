using UnityEngine;
using System.Collections;

public class Return : MonoBehaviour {

	public Texture2D returnButton;
	
	void Update(){
		if (Input.GetKeyDown (KeyCode.Escape)){
			Application.LoadLevel ("MainMenu");
		}
	}

	void OnGUI () {

		if(GUI.Button(new Rect(Screen.width-80,40,60,50),returnButton)){
			Application.LoadLevel("MainMenu");
		}

	}
}