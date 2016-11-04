#pragma strict

import System.Collections.Generic;

var selectedIndex : int;

//zum Setzen der Größe
var myX : int = 800;
var myY : int = 600;

//für die Anzeige der Items
//die Konstruktion ist vorläufig
var itemStrings : String[];/* = ["Item 1", "Item 2", "Item 3", "Item 4", "leer", "leer", "leer", "leer", "leer"];*/
//für die Anzahl der Items
var itemCount : int;
//für das aktuelle Item
private var currentItem : String = "nüscht";

//für die Anzeige des Inventories
private var showInventory : boolean = false;

//zum Unterbrechen des Spiels
private var saveTimeScale : float;

//zur einfacheren Handhabung
private var myScreen : Rect;

//UPDATE SEITE 22
private var itemList : List.<ListItem> = new List.<ListItem>();
//ENDE UPDATE


/*
function ChangeItem(selected : int) {
	if (itemStrings[selected] != "leer")
		currentItem = itemStrings[selected];
}
*/

function ChangeItem(selected : int) {
	if (itemList[selected].GetCount() !=0){
			
	selectedIndex = /*itemList[*/selected/*]*/;
	}
}

function ContinueGame(flag : boolean) {
	if (flag == false) {
		showInventory = true;
		saveTimeScale = Time.timeScale;
		Time.timeScale = 0;
	}
	else {
		showInventory = false;
		Time.timeScale = saveTimeScale;
	}
}

/*wird ignoriert fuer das update s 23
//Update von Seite 16

function FindSlot(itemName : String) : boolean { 
//hier prüfen wir zuerst, ob das Item schon in der Liste ist 
//dann suchen wir nach einem freien Platz 
//wenn das Item nicht abgelegt wird, geben wir false zurück 
var found : boolean = false; 
var i : int = 0; 
//gibt es das Element schon? 
while (i < itemCount) { 
if (itemStrings[i] == itemName) 
return false; 
i++; 
} 
 
//i zurücksetzen 
i = 0; 
 
//gibt es noch einen freien Platz 
while (found == false && i < itemCount) { 
if (itemStrings[i] == "leer") { 
itemStrings[i] = itemName; 
found = true; 
} 
i++; 
} 
return found; 
 }
	
	//Ende Update
	*/
	
	//UPDATE S23
	
function FindSlot(itemName : String, itemDescription : String, 
maxCount : int) : boolean { 
//hier prüfen wir zuerst, ob das Item schon in der Liste ist und noch weitere aufgenommen werden dürfen 
//dann suchen wir nach einem freien Platz 
//wenn das Item nicht abgelegt wird, geben wir false zurück 
var found : boolean = false; 
var i : int = 0; 
//gibt es das Element schon? 
while (i < itemCount) { 
if (itemList[i].GetName() == itemName) { 
//ist die maximale Anzahl erreicht? 
if (itemList[i].GetCount() == maxCount) 
return false; 
//wenn nicht, erhöhen wir die Anzahl 
else { 
itemList[i].ChangeCount(1); 
found = true; 
} 
} 
i++; 
} 
 
//i zurücksetzen 
i = 0; 
 
//gibt es noch einen freien Platz 
while (found == false && i < itemCount) { 
if (itemList[i].GetName() == "leer") { 
//dann setzen wir die neue Instanz an diese Stelle 
itemList[i] = new ListItem(1, itemName, itemDescription); 
found = true; 
} 
i++; 
} 
//die Liste aktualisieren 
CopyList(); 
return found; 
} 

//ENDE UPDATE
	
/* UPDATE SEITE 19*/
function ReturnItem() : String { 
return itemList[selectedIndex].GetName(); 
} 

/*Ende Update*/	
	
/*
function Start () {
	//die Anzahl setzen
	itemCount = itemStrings.Length;
}
*/

//UPDATE S 22
function CopyList() { 
//die Informationen aus der Liste kopieren 
for (var count : int = 0; count < itemCount; count++) 
itemStrings[count] = itemList[count].GetName() + "\n" + itemList[count].GetCount().ToString(); 
} 
 
function Start () { 

selectedIndex = 0;

itemCount = itemStrings.Length;


//eine leere Liste erzeugen 
for (var count :int = 0; count < itemCount; count++) 
itemList.Add(new ListItem(0, "leer", "leer")); 
//die Elemente in der Liste für die Anzeige erzeugen 
itemStrings = new String[itemCount]; 
//die Liste umkopieren 
CopyList(); 
} 
//ENDE UPDATE



function Update () {
	//die Position und Dimension des Anzeigebereichs berechnen
	var startSize : Vector2 = new Vector2(myX, myY);
	//die linke obere Ecke
	myScreen.x = (Screen.width / 2) - (startSize.x / 2);
	myScreen.y = (Screen.height / 2) - (startSize.y / 2);
	//Breite und Höhe
	myScreen.width = startSize.x;
	myScreen.height = startSize.y;

	//wenn die Taste i gedrückt wird und das Inventory nicht gezeigt wird, unterbrechen wir das Spiel
	if (Input.GetKeyDown("i") && showInventory == false)
		ContinueGame(false);
}

function OnGUI() {
	//für die Anzeigebereiche
	var boxFrame : Rect;
	var buttonFrame : Rect;
	//für das Menü
	var menuSelection : int = 0;
	//ein wenig Abstand für den inneren Rahmen
	var offset : int = 60;
	
	//für das Zentrieren der Schaltfläche Schließen
	var textSize : Vector2 = GUI.skin.button.CalcSize(GUIContent("Schließen"));
	var left : int = (myX - textSize.x) / 2;
	
	//zum Schließen über die Esc-Taste
	var e : Event = Event.current;

	//wenn die Liste gezeigt werden soll
	if (showInventory == true) {
		//der Beginn der Gruppe
		GUI.BeginGroup(myScreen);
		//das Rechteck für die Box
		boxFrame = Rect(0, 0, myX, myY);
		GUI.Box(boxFrame, "Sie tragen gerade: " + itemList[selectedIndex].GetName());
	
		//das Rechteck für das SelectionGrid
		//es hat ein wenig Abstand zur Box
		buttonFrame = Rect(offset, offset, myX - offset * 	2 , myY - offset * 2);
		//das SelectionGrid erstellen
		menuSelection = GUI.SelectionGrid(buttonFrame, menuSelection, itemStrings, 3);
		//wurde etwas geändert?
		//dann setzen wir das angeklickte Item
		if (GUI.changed)
			ChangeItem(menuSelection);

		//wenn die Schließen-Schaltfläche angeklickt wird, geht es weiter
		if (GUI.Button(Rect(left, myY - 25,  textSize.x, 20), "Schließen"))
			ContinueGame(true);
		//das Ende der Gruppe
		GUI.EndGroup();
	
		//auch mit der Escape-Taste geht es weiter
		if (e.keyCode == KeyCode.Escape )
			ContinueGame(true);
	}
	
	
}
