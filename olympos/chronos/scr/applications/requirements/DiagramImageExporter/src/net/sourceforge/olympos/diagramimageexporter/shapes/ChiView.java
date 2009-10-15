package net.sourceforge.olympos.diagramimageexporter.shapes;

import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;


public class ChiView {
	
	InfoCoordinateSize rec1 = new InfoCoordinateSize(0, 0,  116, 66);
	InfoCoordinateSize rec2 = new InfoCoordinateSize(100, 2, 13, 7);
	InfoLine infLine1 = new InfoLine(0, 12, 116, 12);
	InfoLine infLine2 = new InfoLine(0, 0, 0, 0);
	

	public InfoLine getInfLine1() {
		return infLine1;
	}
	public InfoLine getInfLine2() {
		return infLine2;
	}
	public InfoCoordinateSize getRect1() {
		return rec1;
	}
	public InfoCoordinateSize getRect2() {
		return rec2;
	}
}