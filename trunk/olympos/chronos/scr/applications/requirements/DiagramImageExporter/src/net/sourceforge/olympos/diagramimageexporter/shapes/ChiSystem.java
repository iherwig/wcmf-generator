package net.sourceforge.olympos.diagramimageexporter.shapes;

import java.awt.Graphics2D;

import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoFigureParameter;
import net.sourceforge.olympos.diagramimageexporter.RequirementFigure;


public class ChiSystem extends RequirementFigure{
	InfoCoordinateSize rect1 = new InfoCoordinateSize(0, 0, 90, 90);
	InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 90, 90);
	
	public InfoCoordinateSize getRect1() {
		return rect1;
	}
	@Override
	public void draw(Graphics2D g2d, InfoFigureParameter fig) {
		
		drawScaleRec(g2d, fig, figureInfo, rect1);	
	}
}
