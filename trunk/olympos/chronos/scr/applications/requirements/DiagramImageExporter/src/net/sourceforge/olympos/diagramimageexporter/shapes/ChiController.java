package net.sourceforge.olympos.diagramimageexporter.shapes;

import java.awt.Graphics2D;

import net.sourceforge.olympos.diagramimageexporter.Figure;
import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoFigureParameter;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;


public class ChiController extends Figure{
	private InfoCoordinateSize rect = new InfoCoordinateSize(0, 0, 125, 55);
	protected InfoCoordinateSize circle = new InfoCoordinateSize(105, 5, 12, 12);
	private InfoLine infLine1 = new InfoLine(0, 40, 125, 40);
	private InfoLine infLine2 = new InfoLine(0, 48, 125, 48);
	
	private InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 125, 55);
	
	public InfoCoordinateSize getRect() {
		return rect;
	}
	public InfoLine getInfLine1() {
		return infLine1;
	}
	public InfoLine getInfLine2() {
		return infLine2;
	}
	public InfoCoordinateSize getCircle() {
		return circle;
	}
	@Override
	public void draw(Graphics2D g2d, InfoFigureParameter fig) {

		drawNotImplementesJet(g2d, fig);
//		drawScaleXLine(g2d, fig, figureInfo, infLine1);
//		drawScaleXLine(g2d, fig, figureInfo, infLine2);
//		drawContLabel(g2d, fig, figureInfo, rect, infLine1);
//		drawEllipse(g2d, fig, figureInfo, circle);
//		drawChi(g2d, fig, figureInfo, circle);
//		
//		drawScaleChiController(g2d, fig, figureInfo, infLine1, infLine2, rect);
	}
}
