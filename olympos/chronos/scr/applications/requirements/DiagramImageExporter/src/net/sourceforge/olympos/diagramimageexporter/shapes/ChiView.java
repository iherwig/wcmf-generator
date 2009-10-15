package net.sourceforge.olympos.diagramimageexporter.shapes;

import java.awt.Graphics2D;

import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoFigureParameter;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;
import net.sourceforge.olympos.diagramimageexporter.RequirementFigure;


public class ChiView extends RequirementFigure{
	
	InfoCoordinateSize rect1 = new InfoCoordinateSize(0, 0,  116, 66);
	InfoCoordinateSize rect2 = new InfoCoordinateSize(100, 2, 13, 7);
	InfoLine infLine1 = new InfoLine(0, 12, 116, 12);
	InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0,  116, 66);

	public InfoLine getInfLine1() {
		return infLine1;
	}
	public InfoCoordinateSize getRect1() {
		return rect1;
	}
	public InfoCoordinateSize getRect2() {
		return rect2;
	}
	@Override
	public void draw(Graphics2D g2d, InfoFigureParameter fig) {
		
		drawScaleRec(g2d, fig, figureInfo, rect1);
		drawScaleRec(g2d, fig, figureInfo, rect2);

		drawScaleLine(g2d, fig, figureInfo, infLine1);		
	}
}