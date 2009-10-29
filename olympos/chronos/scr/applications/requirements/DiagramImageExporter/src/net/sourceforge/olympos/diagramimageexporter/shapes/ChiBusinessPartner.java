package net.sourceforge.olympos.diagramimageexporter.shapes;

import java.awt.Graphics2D;

import net.sourceforge.olympos.diagramimageexporter.Figure;
import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoFigureParameter;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;

public class ChiBusinessPartner extends Figure{
	InfoLine body = new InfoLine(12, 15, 12, 33);
	InfoLine leftleg = new InfoLine(12, 33, 3, 47);
	InfoLine rightleg = new InfoLine(12, 33, 21, 47);
	InfoLine arm = new InfoLine(0, 20, 22, 20);
	InfoCoordinateSize head = new InfoCoordinateSize(4, 0, 15, 15);
	InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 20, 48);
	
	public ChiBusinessPartner(){	
	}
	
	public InfoLine getbody() {
		return body;
	}
	public InfoLine getLeftLeg() {
		return leftleg;
	}
	public InfoLine getRightLeg() {
		return rightleg;
	}
	public InfoCoordinateSize getHead() {
		return head;
	}

	public void draw(Graphics2D g2d, InfoFigureParameter createFig) {
		
		drawScaleEllipse(g2d, createFig, figureInfo, head);

		drawScaleLine(g2d, createFig, figureInfo, body);
		drawScaleLine(g2d, createFig, figureInfo, leftleg);
		drawScaleLine(g2d, createFig, figureInfo, rightleg);
		drawScaleLine(g2d, createFig, figureInfo, arm);

		drawCenterLabelUnder(g2d, createFig);
		
		drawScaleChi(g2d, createFig, figureInfo, head);
	}
}
