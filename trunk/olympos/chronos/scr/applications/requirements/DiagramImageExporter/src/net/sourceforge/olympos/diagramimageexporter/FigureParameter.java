package net.sourceforge.olympos.diagramimageexporter;

import java.util.ArrayList;
//Every Figure has the same Parameter which will be fount in that class
//paramter & get set & arrayList with children

public class FigureParameter {

	private float x;
	private float y;
	private float width;
	private float height;
	private EnumFigureType type;
	private String label;
	private ArrayList<FigureParameter> children = new ArrayList<FigureParameter>();
	private ArrayList<XmlConnection> child = new ArrayList<XmlConnection>();
	private int diagramid;
	private int typeId;
	private String objectStatus;
	String alias;

	FigureParameter(float xi, float yi, float w, float h, EnumFigureType i, String label, int diagramid, String alias, String objectStatus){
		setAll(xi, yi, w, h, i, label, diagramid, alias, objectStatus);
	}

	public int getDiagramid() {
		return diagramid;
	}

	public void setDiagramid(int diagramid) {
		this.diagramid = diagramid;
	}

	public int getTypeId() {
		return typeId;
	}

	public void setTypeId(int typeId) {
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
	
	public String getObjectStatus() {
		return objectStatus;
	}

	public void setObjectStatus(String objectStatus) {
		this.objectStatus = objectStatus;
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
	
	public void setAll(float xi, float yi, float w, float h, EnumFigureType i, String label, int diagramid, String alias, String objectStatus) {
		setAllType(xi, yi, w, h, i);
		this.label = label;
		this.diagramid = diagramid;
		this.alias = alias;
		this.objectStatus = objectStatus;
	}
	
	public void addChildX(XmlConnection childe) {
		child.add(childe);
	}

	public void addChild(FigureParameter child) {
		children.add(child);
	}

	public ArrayList<XmlConnection> getChildrenX() {
		return child;
	}
	
	public ArrayList<FigureParameter> getChildren() {
		return children;
	}
}
