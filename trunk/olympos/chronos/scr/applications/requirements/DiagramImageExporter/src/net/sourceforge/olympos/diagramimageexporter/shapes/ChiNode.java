package net.sourceforge.olympos.diagramimageexporter.shapes;

import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;


public class ChiNode {
	InfoCoordinateSize rect1 = new InfoCoordinateSize(0, 0, 150, 100);
	InfoCoordinateSize rect2 = new InfoCoordinateSize(0, 0, 0, 0);
	InfoLine infLine1 = new InfoLine(0, 46, 150, 46);
	InfoLine infLine2 = new InfoLine(0, 56, 150, 56);
	InfoCoordinateSize elli1 = new InfoCoordinateSize(137, 17, 13, 13);
	InfoCoordinateSize elli2 = new InfoCoordinateSize(10, 20, 50, 100);
	
	public InfoCoordinateSize getElli1() {
		return elli1;
	}
	public InfoCoordinateSize getElli2() {
		return elli2;
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
