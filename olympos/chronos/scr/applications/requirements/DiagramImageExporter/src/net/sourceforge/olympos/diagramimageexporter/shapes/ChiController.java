package net.sourceforge.olympos.diagramimageexporter.shapes;

import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;


public class ChiController {
	private InfoCoordinateSize rect1 = new InfoCoordinateSize(0, 0, 150, 100);
	private InfoCoordinateSize rect2 = new InfoCoordinateSize(0, 0, 0, 0);
	private InfoCoordinateSize circle1 = new InfoCoordinateSize(132, 5, 12, 12);
	private InfoLine infLine1 = new InfoLine(0, 50, 150, 50);
	private InfoLine infLine2 = new InfoLine(0, 60, 150, 60);
	private InfoLine inLeft = new InfoLine(0, 0, 0,0);
	private InfoLine inUp = new InfoLine(0, 0, 0,0);
	private InfoLine inDown = new InfoLine(0, 0, 0,0);
	private InfoLine inrightup = new InfoLine(0, 0, 0,0);
	private InfoLine inrightdown = new InfoLine(0, 0, 0,0);
	
	public InfoLine getInLeft() {
		return inLeft;
	}
	public InfoLine getInUp() {
		return inUp;
	}
	public InfoLine getInDown() {
		return inDown;
	}
	public InfoLine getInrightup() {
		return inrightup;
	}
	public InfoLine getInrightdown() {
		return inrightdown;
	}
	public InfoCoordinateSize getRect1() {
		return rect1;
	}
	public InfoCoordinateSize getRect2() {
		return rect2;
	}
	public InfoLine getInfLine1() {
		return infLine1;
	}
	public InfoLine getInfLine2() {
		return infLine2;
	}
	public InfoCoordinateSize getCircle1() {
		return circle1;
	}
}
