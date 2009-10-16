package net.sourceforge.olympos.diagramimageexporter.shapes;

import java.awt.Graphics2D;

import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoFigureParameter;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;
import net.sourceforge.olympos.diagramimageexporter.RequirementFigure;

public class ChiIssue extends RequirementFigure{
	InfoCoordinateSize rect1 = new InfoCoordinateSize(0, 0, 150 , 50);
	InfoLine infLine1 = new InfoLine(10, 0, 10, 50);
	InfoLine infLine2 = new InfoLine(15, 0, 15, 50);
	
	InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 150 , 50);
	
	public ChiIssue(){
	}
	
	public InfoCoordinateSize getRect1() {
		return rect1;
	}
	public InfoLine getInfLine1() {
		return infLine1;
	}
	public InfoLine getInfLine2() {
		return infLine2;
	}

	@Override
	public void draw(Graphics2D g2d, InfoFigureParameter fig) {
		
		drawScaleRec(g2d, fig, figureInfo, rect1);

		drawScaleLine(g2d, fig, figureInfo, infLine1);
		drawScaleLine(g2d, fig, figureInfo, infLine2);
		
		drawImg(g2d, fig);
	}
}