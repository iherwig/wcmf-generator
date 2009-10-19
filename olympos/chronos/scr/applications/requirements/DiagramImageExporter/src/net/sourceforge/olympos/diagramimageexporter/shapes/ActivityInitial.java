package net.sourceforge.olympos.diagramimageexporter.shapes;

import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;


public class ActivityInitial {
	InfoCoordinateSize rect1 = new InfoCoordinateSize(0, 0, 0, 0);
	InfoCoordinateSize rect2 = new InfoCoordinateSize(0, 0, 0, 0);
	InfoCoordinateSize circle1 = new InfoCoordinateSize(0, 0, 0, 0);
	InfoCoordinateSize circle2 = new InfoCoordinateSize(10, 10, 38, 38);
	InfoLine infLine1 = new InfoLine( 0, 0, 0, 0); //oben links
	InfoLine infLine2 = new InfoLine( 0, 0, 0,  0);//unten links
	InfoLine infLine3 = new InfoLine( 0, 0, 0, 0);//unten rechts
	InfoLine infLine4 = new InfoLine( 0, 0, 0,  0); //oben rechts

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
	public InfoLine getInfLine3() {
		return infLine3;
	}
	public InfoLine getInfLine4() {
		return infLine4;
	}
	public InfoCoordinateSize getCircle1() {
		return circle1;
	}
	public InfoCoordinateSize getCircle2() {
		return circle2;
	}
}