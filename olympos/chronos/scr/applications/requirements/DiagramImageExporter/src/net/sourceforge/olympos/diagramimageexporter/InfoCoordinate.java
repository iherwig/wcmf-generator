package net.sourceforge.olympos.diagramimageexporter;

//for working with coordinates it will be created this object for work better together with both elements
public class InfoCoordinate {
	private float x;
	private float y;
	
	InfoCoordinate(float x, float y){
		setAll(x, y);
	}
	
	public float getX() {
		return this.x;
	}
	
	public float getY() {
		return this.y;
	}
	
    public void setX( float xi){
    	this.x = xi;
    }    
    
    public void setY(float yi){
        this.y = yi;
    }
	
    public void setAll( float xi, float yi){
    	this.x = xi;
        this.y = yi;
    }
    
    @Override
    public String toString() {
    	return "x: " + this.x + " y: " + y;
    }
}