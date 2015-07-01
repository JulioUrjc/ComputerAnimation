using UnityEngine;
using System.Collections;

public class Menu : MonoBehaviour {

	public Texture jugar;
	public Texture creditos;
	public Texture salir;

	void OnGUI () {

		if(GUI.Button(new Rect(Screen.width/2-85,120,170,50), jugar)){
			Application.LoadLevel("Intro");
		}

		if(GUI.Button(new Rect(Screen.width/2-85,210,170,50),creditos)){
			Application.LoadLevel ("Creditos");
		}
		
		if(GUI.Button(new Rect(Screen.width/2-85,280,170,50),salir)){
			Application.Quit();
		}
	
	}
}
