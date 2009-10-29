package net.sourceforge.olympos.diagramimageexporter.shapes;

import java.awt.Graphics2D;

import net.sourceforge.olympos.diagramimageexporter.Figure;
import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoFigureParameter;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;


public class ChiBusinessPartnerActive extends Figure{
	InfoLine body = new InfoLine(12, 15, 12, 32);
	InfoLine leftleg = new InfoLine(12, 32, 2, 47);
	InfoLine rightleg = new InfoLine(12, 32, 21, 47);
	InfoLine armleft = new InfoLine(0, 15 ,12, 22);
	InfoLine armright = new InfoLine(12, 22, 23, 15);
	InfoCoordinateSize head = new InfoCoordinateSize(4, 0, 15, 15);
	
	InfoCoordinateSize figureInfo = new InfoCoordinateSize(0,0,26,47);
	
	public ChiBusinessPartnerActive(){
	}
	
	public InfoLine getBody() {
		return body;
	}
	public InfoLine getLeftLeg() {
		return leftleg;
	}
	public InfoLine getRightLeg() {
		return rightleg;
	}
	public InfoLine getArmLeft() {
		return armleft;
	}
	public InfoLine getArmRight() {
		return armright;
	}

	public void draw(Graphics2D g2d, InfoFigureParameter createFig) {

		drawScaleEllipse(g2d, createFig, figureInfo, head);

		drawScaleLine(g2d, createFig, figureInfo, body);
		drawScaleLine(g2d, createFig, figureInfo, leftleg);
		drawScaleLine(g2d, createFig, figureInfo, rightleg);
		drawScaleLine(g2d, createFig, figureInfo, armleft);
		drawScaleLine(g2d, createFig, figureInfo, armright);

		drawCenterLabelUnder(g2d, createFig);
		
		
		drawScaleChi(g2d, createFig, figureInfo, head);
	}
}
