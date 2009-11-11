package net.sourceforge.olympos.diagramimageexporter.shapes;

import java.awt.Graphics2D;
import java.util.ArrayList;

import net.sourceforge.olympos.diagramimageexporter.Figure;
import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoFigureParameter;


@SuppressWarnings("serial")
public class ActivityInitial extends Figure{

	InfoCoordinateSize circle1 = new InfoCoordinateSize(10, 10, 38, 38);
	private InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 38, 38);

	public InfoCoordinateSize getCircle1() {
		return circle1;
	}

	
	public void draw(Graphics2D g2d, InfoFigureParameter fig, ArrayList<InfoFigureParameter> children) {
		
		drawScaleEllipse(g2d, fig, figureInfo, circle1);
	}
}
