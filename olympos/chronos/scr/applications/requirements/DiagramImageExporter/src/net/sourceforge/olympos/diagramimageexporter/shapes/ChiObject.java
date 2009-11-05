package net.sourceforge.olympos.diagramimageexporter.shapes;

import java.awt.Graphics2D;
import java.awt.Rectangle;

import net.sourceforge.olympos.diagramimageexporter.Figure;
import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoFigureParameter;

public class ChiObject extends Figure {
//	g2d.draw(new Rectangle(0, 0, 100, 50));
	private InfoCoordinateSize rect = new InfoCoordinateSize(0, 0, 138, 60);
	private InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 138, 60);
	
	@Override
	public void draw(Graphics2D g2d, InfoFigureParameter fig) {
		drawScaleRec(g2d, fig, figureInfo, rect);
		drawRecLabelLeft(g2d, fig, figureInfo, rect);
		drawObjectStatus(g2d, fig, figureInfo, rect);
	}
}
