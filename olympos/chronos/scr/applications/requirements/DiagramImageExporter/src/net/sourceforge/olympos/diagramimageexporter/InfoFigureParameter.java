package net.sourceforge.olympos.diagramimageexporter;

import java.util.ArrayList;
//Every Figure has the same Parameter which will be fount in that class
//paramter & get set & arrayList with children

public class InfoFigureParameter {

	private float x;
	private float y;
	private float width;
	private float height;
	private EnumFigureType type;
	private String label;
	private ArrayList<InfoFigureParameter> children = new ArrayList<InfoFigureParameter>();
	private ArrayList<InfoXmlConnection> child = new ArrayList<InfoXmlConnection>();
	private ArrayList<InfoXMLOptionValue> value = new ArrayList<InfoXMLOptionValue>();
	private ArrayList<InfoXMLOptionValue> operation  = new ArrayList<InfoXMLOptionValue>();
	
	private String diagramid;
	private String typeId;
	String alias;

	public InfoFigureParameter(float xi, float yi, float w, float h, EnumFigureType i, String label, String diagramid, String alias){
		setAll(xi, yi, w, h, i, label, diagramid, alias);
	}

	public String getDiagramid() {
		return diagramid;
	}

	public void setDiagramid(String diagramid) {
		this.diagramid = diagramid;
	}

	public String getTypeId() {
		return typeId;
	}

	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public float getX() {
		return x;
	}

	public void setX(float x) {
		this.x = x;
	}

	public float getY() {
		return y;
	}

	public void setY(float y) {
		this.y = y;
	}

	public float getWidth() {
		return width;
	}

	public void setWidth(float width) {
		this.width = width;
	}

	public float getHeight() {
		return height;
	}

	public void setHeight(float height) {
		this.height = height;
	}
	
	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public EnumFigureType getType() {
		return type;
	}

	public void setType(EnumFigureType type) {
		this.type = type;
	}
	

	public void setXYWeightHeight(float xi, float yi, float w, float h) {
		this.x = xi;
		this.y = yi;
		this.width = w;
		this.height = h;
	}

	public void setAllType(float xi, float yi, float w, float h, EnumFigureType i) {
		setXYWeightHeight(xi, yi, w, h);
		this.type = i;
	}
	
	public void setAll(float xi, float yi, float w, float h, EnumFigureType i, String label, String diagramid, String alias) {
		setAllType(xi, yi, w, h, i);
		this.label = label;
		this.diagramid = diagramid;
		this.alias = alias;
	}
	
	public void addChildX(InfoXmlConnection childe) {
		child.add(childe);
	}

	public void addChild(InfoFigureParameter child) {
		children.add(child);
	}
	
	public void addAttribut(InfoXMLOptionValue values) {
		value.add(values);
	}
	public void addOperation (InfoXMLOptionValue values) {
		operation.add(values);
	}

	public ArrayList<InfoXmlConnection> getChildrenX() {
		return child;
	}
	
	public ArrayList<InfoFigureParameter> getChildren() {
		return children;
	}
	
	public ArrayList<InfoXMLOptionValue> getAttribute() {
		return value;
	}
	public ArrayList<InfoXMLOptionValue> getOperation() {
		return operation;
	}
}
