#pragma strict 

var otherScript : inventoryUpdateS16;
var itemName : String;
var myMessage: String;
var itemMax : int; 
//für die Eigenschaft 
var itemDescription : String;


//für den neuen Cursor 
var newCursor : Texture2D; 
function OnMouseEnter () { 
//den neuen Cursor zeigen 
Cursor.SetCursor(newCursor, Vector2.zero, CursorMode.Auto); 
} 
function OnMouseExit () { 
//und wieder den Standardcursor zeigen 
Cursor.SetCursor(null, Vector2.zero, CursorMode.Auto); 
}

function OnMouseDown() { 
if (otherScript != null) { 

//UPDATE S 25: 
if (otherScript.FindSlot(itemName, itemDescription, itemMax)) { 
//ENDE UPDATE
//den Cursor wiederherstellen 
Cursor.SetCursor(null, Vector2.zero, CursorMode.Auto); 
//das Objekt zerstören 
Destroy(gameObject); 
} 
else 
myMessage = "Das Objekt kann nicht noch einmal aufgenommen werden."; 
} 
else 
Debug.Log("Das andere Skript muss angegeben werden"); 
} 

/* Update Seite 18*/

var showMessage : float;

function OnGUI() { 
if (myMessage != "") { 
//für die Meldung 
var textSize : Vector2 = GUI.skin.button.CalcSize(GUIContent(myMessage)); 
var left : int = (Screen.width - textSize.x) / 2; 
//die Meldung zeigen 
GUI.Label(Rect(left, Screen.height / 2, textSize.x, 20), myMessage); 
//und einen Moment stehen lassen 
showMessage = showMessage + Time.deltaTime; 
if (showMessage > 3) { 
showMessage = 0; 
myMessage = ""; 
} 
} 

//Ende Update
} 