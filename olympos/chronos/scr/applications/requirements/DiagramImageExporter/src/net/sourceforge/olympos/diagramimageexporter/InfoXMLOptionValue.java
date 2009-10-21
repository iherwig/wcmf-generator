package net.sourceforge.olympos.diagramimageexporter;

import java.util.ArrayList;

public class InfoXMLOptionValue {
	String typ;
	int id;
	String name;
	String alias;

	
	
	private ArrayList<InfoXmlConnection> children = new ArrayList<InfoXmlConnection>();
	
	public void addChild(InfoXmlConnection childe) {
		this.children.add(childe);
	}

	public ArrayList<InfoXmlConnection> getChildren() {
		return children;
	}
	
	InfoXMLOptionValue(int id, String name, String type, String alias) {
		setAll(id, name, type, alias);
	}

	public String getTyp() {
		return typ;
	}

	public void setTyp(String typ) {
		this.typ = typ;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAlias() {
		return alias;
	}

	public void setId(String alias) {
		this.alias = alias;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setAll(int id, String name, String type, String alias) {
		this.id = id;
		this.name = name;
		this.typ = type;
		this.alias = alias;
	}

	public void add(InfoXMLOptionValue value) {
		// TODO Auto-generated method stub
		
	}
}
