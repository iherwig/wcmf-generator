package net.sourceforge.olympos.diagramimageexporter.shapes;

import java.awt.Graphics2D;

import net.sourceforge.olympos.diagramimageexporter.Figure;
import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoFigureParameter;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;

public class ChiWorkerInternal extends Figure{
	InfoCoordinateSize elli1 = new InfoCoordinateSize(0, 3, 47, 46);
	InfoCoordinateSize head = new InfoCoordinateSize(17, 9, 11, 11);
	InfoLine body = new InfoLine(23, 20, 23, 33);
	InfoLine leftleg = new InfoLine(23, 33, 17, 42);
	InfoLine rightleg = new InfoLine(23, 33, 29, 42);
	InfoLine arm = new InfoLine(14, 23, 31, 23);
	InfoLine arrow1 = new InfoLine(23, 3, 26, 0);
	InfoLine arrow2 = new InfoLine(23, 3, 26, 6);
	InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 49, 47);

	
	public ChiWorkerInternal(){
	}
	
	public InfoLine getLeftleg() {
		return leftleg;
	}
	public InfoLine getRightleg() {
		return rightleg;
	}
	public InfoCoordinateSize getElli1() {
		return elli1;
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
	public InfoLine getArrow1() {
		return arrow1;
	}
	public InfoLine getArrow2() {
		return arrow2;
	}
	public InfoCoordinateSize getRound() {
		return elli1;
	}
	public InfoCoordinateSize getHead() {
		return head;
	}

	@Override
	public void draw(Graphics2D g2d, InfoFigureParameter createFig) {
		
		drawScaleEllipse(g2d, createFig, figureInfo, elli1);
		drawScaleEllipse(g2d, createFig, figureInfo, head);

		drawCenterLabelUnder(g2d, createFig);
		
		drawScaleLine(g2d, createFig, figureInfo, body);
		drawScaleLine(g2d, createFig, figureInfo, leftleg);
		drawScaleLine(g2d, createFig, figureInfo, rightleg);
		drawScaleLine(g2d, createFig, figureInfo, arm);
		
		drawScaleLine(g2d, createFig, figureInfo, arrow1);
		drawScaleLine(g2d, createFig, figureInfo, arrow2);
		
		drawScaleChi(g2d, createFig, figureInfo, head);
	}
}
