package net.sourceforge.olympos.diagramimageexporter;


public class InfoArc {
	int x;
	int y;
	int w;
	int h;
	double start;
	double extend;
	
	public InfoArc (int x, int y, int w, int h,double start, double extend){
		setAll(x, y, w, h, start, extend);
	}
	
	public int getX() {
		return x;
	}
	public void setX(int x) {
		this.x = x;
	}
	public int getY() {
		return y;
	}
	public void setY(int y) {
		this.y = y;
	}
	public int getW() {
		return w;
	}
	public void setW(int w) {
		this.w = w;
	}
	public int getH() {
		return h;
	}
	public void setH(int h) {
		this.h = h;
	}
	public double getStart() {
		return start;
	}
	public void setStart(double start) {
		this.start = start;
	}
	public double getExtend() {
		return extend;
	}
	public void setExtend(double extend) {
		this.extend = extend;
	}	
	public void setAll (int x, int y, int w, int h,double start, double extend){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.start = start;
		this.extend = extend;
	}
}