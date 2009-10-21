package net.sourceforge.olympos.diagramimageexporter.shapes;

import java.awt.Graphics2D;
import java.util.ArrayList;

import net.sourceforge.olympos.diagramimageexporter.Figure;
import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoFigureParameter;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;
import net.sourceforge.olympos.diagramimageexporter.InfoXMLOptionValue;


public class ChiNode extends Figure{
	private InfoCoordinateSize rect = new InfoCoordinateSize(0, 0, 125, 55);
	protected InfoCoordinateSize circle = new InfoCoordinateSize(105, 5, 12, 12);
	private InfoLine infLine1 = new InfoLine(0, 40, 125, 40);
	private InfoLine infLine2 = new InfoLine(0, 48, 125, 48);
	private InfoLine circleLine = new InfoLine(105, 17, 116, 17);
	private InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 138, 60);

	
	public InfoCoordinateSize getRect() {
		return rect;
	}
	public InfoCoordinateSize getCircle() {
		return circle;
	}
	public InfoLine getInfLine1() {
		return infLine1;
	}
	public InfoLine getInfLine2() {
		return infLine2;
	}
	public InfoLine getCircleLine() {
		return circleLine;
	}
	@Override
	public void draw(Graphics2D g2d, InfoFigureParameter fig) {

		drawScaleRec(g2d, fig, figureInfo, rect);
		drawScaleXLine(g2d, fig, figureInfo, infLine1);
//		drawScaleXLine(g2d, fig, figureInfo, infLine2);
		drawScaleXLine(g2d, fig, figureInfo, circleLine);
		drawEllipse(g2d, fig, figureInfo, circle);
		drawChi(g2d, fig, figureInfo, circle);
		
		drawScaleChiNode(g2d, fig, figureInfo, infLine1, infLine2, rect);

		drawContLabel(g2d, fig, figureInfo, rect, infLine1);
	}
}
