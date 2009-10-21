package net.sourceforge.olympos.diagramimageexporter;

import java.util.ArrayList;


public class InfoXmlFigure {
	EnumFigureType typ;
	int id;
	String name;
	String alias;
	
	private ArrayList<InfoXmlConnection> child = new ArrayList<InfoXmlConnection>();
	private ArrayList<InfoXmlFigure> childFig = new ArrayList<InfoXmlFigure>();
	private ArrayList<InfoXMLOptionValue> childOpt = new ArrayList<InfoXMLOptionValue>();

	private ArrayList<InfoXMLOptionValue> childVal = new ArrayList<InfoXMLOptionValue>();
	private ArrayList<InfoXMLOptionValue> childValNo = new ArrayList<InfoXMLOptionValue>();
	private ArrayList<InfoXMLOptionValue> childOptNo = new ArrayList<InfoXMLOptionValue>();
//	private ArrayList<InfoFigureParameter> childFigure = new ArrayList<InfoFigureParameter>();
	
	InfoXmlFigure(int id, String name, EnumFigureType type, String alias){
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
	
	public void addChild(InfoXmlConnection childe) {
		this.child.add(childe);
	}

	public ArrayList<InfoXmlConnection> getChildren() {
		return child;
	}
	
	public void addChildFig(InfoXmlFigure childFig) {
		this.childFig.add(childFig);
	}

	public ArrayList<InfoXmlFigure> getChildrenFig() {
		return childFig;
	}
	
	public void addChildOpt(InfoXMLOptionValue childOpt) {
		this.childOpt.add(childOpt);
	}

	public ArrayList<InfoXMLOptionValue> getChildOpt() {
		return childOpt;
	}
	public void addChildVal(InfoXMLOptionValue childVal) {
		this.childVal.add(childVal);
	}

	public ArrayList<InfoXMLOptionValue> getChildVal() {
		return childVal;
	}
	
	public void addChildOptNo(InfoXMLOptionValue childOpt) {
		this.childOptNo.add(childOpt);
	}
	public ArrayList<InfoXMLOptionValue> getChildOptNo() {
		return childOptNo;
	}
	public void addChildValNo(InfoXMLOptionValue childOpt) {
		this.childValNo.add(childOpt);
	}
	public ArrayList<InfoXMLOptionValue> getChildValNo() {
		return childValNo;
	}
}