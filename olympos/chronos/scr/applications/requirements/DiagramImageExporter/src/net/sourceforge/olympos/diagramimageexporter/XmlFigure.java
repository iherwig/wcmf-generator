package net.sourceforge.olympos.diagramimageexporter;

import java.util.ArrayList;


public class XmlFigure {
	EnumFigureType typ;
	int id;
	String name;
	String alias;
	
	private ArrayList<XmlConnection> child = new ArrayList<XmlConnection>();
	private ArrayList<XmlFigure> childFig = new ArrayList<XmlFigure>();
//	private ArrayList<FigureParameter> childFigure = new ArrayList<FigureParameter>();
	
	XmlFigure(int id, String name, EnumFigureType type, String alias){
		setAll(id, name, type, alias);
	}
	
	public EnumFigureType getTyp() {
		return typ;
	}
	
	public void setTyp(EnumFigureType typ) {
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
	
	public void setAll(int id, String name, EnumFigureType type, String alias){
		this.id = id;
		this.name = name;
		this.typ = type;
		this.alias = alias;
	}
	
	public void addChild(XmlConnection childe) {
		this.child.add(childe);
	}

	public ArrayList<XmlConnection> getChildren() {
		return child;
	}
	
	public void addChildFig(XmlFigure childFig) {
		this.childFig.add(childFig);
	}

	public ArrayList<XmlFigure> getChildrenFig() {
		return childFig;
	}
}