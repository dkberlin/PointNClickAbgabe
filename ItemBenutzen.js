#pragma strict

var otherScript : inventoryUpdateS16;
var myMessage : String;
var showMessage : float;

function OnMouseDown() { 
//für das Item 
var item : String; 
//das Item beschaffen 
if (otherScript != null) { 
item = otherScript.ReturnItem(); 
myMessage = "Das Item " + item + " wurde eingesetzt."; 
} 
else 
Debug.Log("Das andere Skript muss angegeben werden"); 
} 
 
function OnGUI() { 
if (myMessage != "") { 
//für die Meldung 
var textSize : Vector2 = GUI.skin.button.CalcSize(GUIContent(myMessage)); 
var left : int = (Screen.width - textSize.x) / 2; 
GUI.Label(Rect(left, Screen.height / 2, textSize.x, 20), myMessage); 
showMessage = showMessage + Time.deltaTime; 
if (showMessage > 3) { 
showMessage = 0; 
myMessage = ""; 
} 
} 
} 