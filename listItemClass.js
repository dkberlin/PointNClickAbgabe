#pragma strict
//die eigene klasse
public class ListItem{
	
	//eigenschaften
	private var count: int;
	private var name: String;
	private var description: String;
	
	//konstruktor
	public function ListItem (countArg: int, nameArg: String, descriptionArg: String) {
		count = countArg;
		name = nameArg;
		description = descriptionArg;
	}
	
	//zum beschaffen der werte
	public function GetName() : String{
		return name;
	}
	public function GetCount() : int {
		return count;
	}
	public function GetDescription() : String {
		return description;
	}
	
	//aendern der anzahl
	public function ChangeCount (amount : int) {
		count = count + amount;
	}
}
