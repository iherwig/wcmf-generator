package net.sourceforge.olympos.diagramimageexporter.shapes;

import java.awt.Graphics2D;
import java.util.ArrayList;

import net.sourceforge.olympos.diagramimageexporter.Figure;
import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoFigureParameter;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;


@SuppressWarnings("serial")
public class ActivityDecision extends Figure{

	InfoLine infLine1 = new InfoLine( 0, 20, 20, 0); //oben links
	InfoLine infLine2 = new InfoLine( 20, 38, 0,  19);//unten links
	InfoLine infLine3 = new InfoLine( 19, 38, 39, 18);//unten rechts
	InfoLine infLine4 = new InfoLine(19, 0, 39,  19); //oben rechts
	private InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 138, 60);

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
	public void draw(Graphics2D g2d,InfoFigureParameter fig, ArrayList<InfoFigureParameter> children) {
		
		drawScaleLine(g2d, fig, figureInfo, infLine1);
		drawScaleLine(g2d, fig, figureInfo, infLine2);
		drawScaleLine(g2d, fig, figureInfo, infLine3);
		drawScaleLine(g2d, fig, figureInfo, infLine4);
	}
}
