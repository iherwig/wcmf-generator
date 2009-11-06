package net.sourceforge.olympos.diagramimageexporter.shapes;

import java.awt.Graphics2D;

import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoFigureParameter;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;
import net.sourceforge.olympos.diagramimageexporter.RequirementFigure;


public class ChiSystem extends RequirementFigure{
	
	private InfoCoordinateSize rect = new InfoCoordinateSize(0, 0, 138, 60);
	private InfoCoordinateSize circle = new InfoCoordinateSize(105, 5, 12, 12);
	private InfoLine infLine1 = new InfoLine(0, 40, 138, 40);
	private InfoLine infLine2 = new InfoLine(0, 48, 138, 48);
	private InfoLine circleLine = new InfoLine(0, 17, 11, 17);
	private InfoCoordinateSize imageInfo = new InfoCoordinateSize(0, 0, 12, 12);
	private InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 138, 60);
//	InfoCoordinateSize rect1 = new InfoCoordinateSize(0, 0, 90, 90);
//	InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 90, 90);
	
	public InfoCoordinateSize getRect() {
		return rect;
	}
	@Override
	public void draw(Graphics2D g2d, InfoFigureParameter fig) {
		drawScaleChiNode(g2d, fig, figureInfo, infLine1, infLine2, rect);
		drawScaleXLine(g2d, fig, figureInfo, infLine1);
		drawContLabel(g2d, fig, figureInfo, rect, infLine1);
		drawImageRecReight(g2d, fig, figureInfo, rect, imageInfo);
	}
}
