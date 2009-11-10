package net.sourceforge.olympos.diagramimageexporter.shapes;

import java.awt.Graphics2D;
import java.util.ArrayList;

import net.sourceforge.olympos.diagramimageexporter.*;


@SuppressWarnings("serial")
public class Activity extends Figure{

	InfoLine infLine1 = new InfoLine( 15, 0, 78, 0); //oben
	InfoLine infLine2 = new InfoLine( 0, 15, 0, 43); //links
	InfoLine infLine4 = new InfoLine( 93, 15, 93,43); //rechts 
	InfoLine infLine5 = new InfoLine( 15, 58, 78, 58); // unten
	InfoArc arc1 = new InfoArc(0, 0, 30, 30, 90, 90);
	InfoArc arc2 = new InfoArc(0, 28, 30, 30, -90, -90);
	InfoArc arc3 = new InfoArc(63, 0, 30, 30,  90, -90);
	InfoArc arc4 = new InfoArc(63, 28, 30, 30, -90, 90);
	
	private InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 93, 58);

	public InfoArc getArc1() {
		return arc1;
	}
	public InfoArc getArc2() {
		return arc2;
	}
	public InfoArc getArc3() {
		return arc3;
	}
	public InfoArc getArc4() {
		return arc4;
	}
	public InfoLine getInfLine1() {
		return infLine1;
	}
	public InfoLine getInfLine2() {
		return infLine2;
	}
//	public InfoLine getInfLine3() {
//		return infLine3;
//	}
	public InfoLine getInfLine4() {
		return infLine4;
	}
	public InfoLine getInfLine5() {
		return infLine5;
	}

	@Override
	public void draw(Graphics2D g2d, InfoFigureParameter fig, ArrayList<InfoFigureParameter> children) {
		drawScaleLine(g2d, fig, figureInfo, infLine1);
		drawScaleLine(g2d, fig, figureInfo, infLine2);
		drawScaleLine(g2d, fig, figureInfo, infLine4);
		drawScaleLine(g2d, fig, figureInfo, infLine5);
		
		drawCenterLabelUnder(g2d, fig);
		
	}
}
