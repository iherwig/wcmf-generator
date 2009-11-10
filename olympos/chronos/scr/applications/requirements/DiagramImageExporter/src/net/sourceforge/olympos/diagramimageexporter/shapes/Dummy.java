package net.sourceforge.olympos.diagramimageexporter.shapes;

import java.awt.Graphics2D;
import java.util.ArrayList;

import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoFigureParameter;
import net.sourceforge.olympos.diagramimageexporter.RequirementFigure;

@SuppressWarnings("serial")
public class Dummy extends RequirementFigure{
	InfoCoordinateSize rect1 = new InfoCoordinateSize(0, 0, 150, 50);
	
	InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 150, 50);
	
	public Dummy(){

	}
	
	public InfoCoordinateSize getRect1() {
		return rect1;
	}

	@Override
	public void draw(Graphics2D g2d,  InfoFigureParameter fig, ArrayList<InfoFigureParameter> children) {
		drawScaleRec(g2d, fig, figureInfo, rect1);
		drawRecLabelLeft(g2d, fig, figureInfo, rect1);
	}
}
