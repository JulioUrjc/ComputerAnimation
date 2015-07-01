using UnityEngine;
using System.Collections;

public class Volver : MonoBehaviour {
	
	void Update(){
		if (Input.GetKeyDown (KeyCode.Escape)){
			Application.LoadLevel ("MainMenu");
		}
	}
}