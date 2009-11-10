package net.sourceforge.olympos.diagramimageexporter.shapes;

import java.awt.Graphics2D;
import java.util.ArrayList;

import net.sourceforge.olympos.diagramimageexporter.Figure;
import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoFigureParameter;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;


@SuppressWarnings("serial")
public class ActivityFinal extends Figure{

	InfoCoordinateSize circle1 = new InfoCoordinateSize(10, 10, 37, 37);
	InfoCoordinateSize circle2 = new InfoCoordinateSize(19, 19, 18, 18);
	
	private InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 37, 37);

	public InfoCoordinateSize getCircle1() {
		return circle1;
	}
	public InfoCoordinateSize getCircle2() {
		return circle2;
	}
	public void draw(Graphics2D g2d,InfoFigureParameter fig, ArrayList<InfoFigureParameter> children) {
		
		drawScaleEllipse(g2d, fig, figureInfo, circle1);
		drawCenterLabelUnder(g2d, fig);
	}
}
