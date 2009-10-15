package net.sourceforge.olympos.diagramimageexporter.shapes;

import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;


public class BusinessProcess {
	InfoCoordinateSize rect1 = new InfoCoordinateSize(0, 0, 150, 50);
	InfoCoordinateSize rect2 = new InfoCoordinateSize(0, 0, 0, 0);
	InfoLine infLine1 = new InfoLine(10, 0, 10, 50);
	InfoLine infLine2 = new InfoLine(15, 0, 15, 50);
	InfoLine inLeft = new InfoLine(122, 5, 122,13);
	InfoLine inUp = new InfoLine(122, 5, 140, 5);
	InfoLine inDown = new InfoLine(122, 13, 140, 13);
	InfoLine inrightup = new InfoLine(140, 5, 145, 9);
	InfoLine inrightdown = new InfoLine(140, 13, 145, 9);
	
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
}
