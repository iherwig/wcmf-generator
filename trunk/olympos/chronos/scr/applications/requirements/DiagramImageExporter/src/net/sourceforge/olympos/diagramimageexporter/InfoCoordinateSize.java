package net.sourceforge.olympos.diagramimageexporter;

public class InfoCoordinateSize {
	private float x;
	private float y;
	private float width;
	private float height;
	public float getX() {
		return x;
	}
	
	public InfoCoordinateSize(float x, float y, float width, float hight ){
		setAll(x, y, width, hight);
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
	public void setHight(float hight) {
		this.height = hight;
	}
	
	public void setAll(float x, float y, float width, float hight){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = hight;
	}
}
