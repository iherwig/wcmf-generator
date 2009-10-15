package net.sourceforge.olympos.diagramimageexporter.shapes;

import java.awt.Graphics2D;

import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoFigureParameter;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;
import net.sourceforge.olympos.diagramimageexporter.RequirementFigure;


public class ChiController extends RequirementFigure{
	private InfoCoordinateSize rect1 = new InfoCoordinateSize(0, 0, 150, 100);
	private InfoCoordinateSize circle1 = new InfoCoordinateSize(132, 5, 12, 12);
	private InfoLine infLine1 = new InfoLine(0, 50, 150, 50);
	private InfoLine infLine2 = new InfoLine(0, 60, 150, 60);
	private InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 150, 100);
	
	public InfoCoordinateSize getRect1() {
		return rect1;
	}
	public InfoLine getInfLine1() {
		return infLine1;
	}
	public InfoLine getInfLine2() {
		return infLine2;
	}
	public InfoCoordinateSize getCircle1() {
		return circle1;
	}
	@Override
	public void draw(Graphics2D g2d, InfoFigureParameter fig) {
		
		drawScaleRec(g2d, fig, figureInfo, rect1);
		drawScaleRec(g2d, fig, figureInfo, circle1);

		drawScaleLine(g2d, fig, figureInfo, infLine1);
		drawScaleLine(g2d, fig, figureInfo, infLine2);
	}
}
