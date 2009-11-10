package net.sourceforge.olympos.diagramimageexporter.shapes;

import java.awt.Graphics2D;
import java.util.ArrayList;

import net.sourceforge.olympos.diagramimageexporter.Figure;
import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoFigureParameter;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;


@SuppressWarnings("serial")
public class ActivityReceive extends Figure{
	InfoLine infLine1 = new InfoLine( 0, 0, 62, 0); //oben
	InfoLine infLine2 = new InfoLine( 62, 0, 62, 39); //Rechts
	InfoLine infLine3 = new InfoLine( 0, 0, 21, 19);
	InfoLine infLine4 = new InfoLine( 0, 39, 21,19); 
	InfoLine infLine5 = new InfoLine( 0, 39, 62, 39); // unten
	private InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 62, 39);

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

	public void draw(Graphics2D g2d, InfoFigureParameter fig, ArrayList<InfoFigureParameter> children) {
		
		drawScaleLine(g2d, fig, figureInfo, infLine1);
	}
}
