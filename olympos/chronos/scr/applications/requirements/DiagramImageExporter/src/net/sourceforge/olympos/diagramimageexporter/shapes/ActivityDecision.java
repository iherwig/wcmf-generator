package net.sourceforge.olympos.diagramimageexporter.shapes;

import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;


public class ActivityDecision {

	InfoCoordinateSize circle1 = new InfoCoordinateSize(0, 0, 0, 0);
	InfoCoordinateSize circle2 = new InfoCoordinateSize(0, 0, 0, 0);
	InfoLine infLine1 = new InfoLine( 0, 20, 20, 0); //oben links
	InfoLine infLine2 = new InfoLine( 20, 38, 0,  19);//unten links
	InfoLine infLine3 = new InfoLine( 19, 38, 39, 18);//unten rechts
	InfoLine infLine4 = new InfoLine(19, 0, 39,  19); //oben rechts

	public InfoCoordinateSize getCircle1() {
		return circle1;
	}
	public InfoCoordinateSize getCircle2() {
		return circle2;
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
}
