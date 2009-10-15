package net.sourceforge.olympos.diagramimageexporter.shapes;

import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;


public class ActivityFinal {

	InfoCoordinateSize circle1 = new InfoCoordinateSize(10, 10, 37, 37);
	InfoCoordinateSize circle2 = new InfoCoordinateSize(19, 19, 18, 18);
	InfoLine infLine1 = new InfoLine( 0, 0, 0, 0);
	InfoLine infLine2 = new InfoLine( 0, 0, 0, 0);
	InfoLine infLine3 = new InfoLine( 0, 0, 0, 0);
	InfoLine infLine4 = new InfoLine( 0, 0, 0, 0); 
	InfoLine infLine5 = new InfoLine( 0, 0, 0, 0); 

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
	public InfoLine getInfLine5() {
		return infLine5;
	}
	public InfoCoordinateSize getCircle1() {
		return circle1;
	}
	public InfoCoordinateSize getCircle2() {
		return circle2;
	}
}
