package net.sourceforge.olympos.diagramimageexporter;

import java.awt.Font;

public class InfoFont {
	private float x1;
	private float y1;
	private Font myFont;
	private String value;
	
	public InfoFont(float x1, float y1, Font myFont, String value){
		setAll(x1, y1, myFont, value);
	}
	
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	
	public Font getMyFont() {
		return myFont;
	}
	public void setMyFont(Font myFont) {
		this.myFont = myFont;
	}

	public float getX1() {
		return x1;
	}
	public float getY1() {
		return y1;
	}
	
	public void setX1(float x1) {
		this.x1 = x1;
	}
	public void setY1(float y1) {
		this.y1 = y1;
	}
	
	public void setAll(float x1, float y1, Font myFont, String value){
		this.x1 = x1;
		this.y1 = y1;
		this.myFont = myFont;
		this.value = value;
	}
}
