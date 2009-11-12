package net.sourceforge.olympos.diagramimageexporter;

import java.awt.Graphics2D;
import java.util.ArrayList;

public class DrawFigure {
	public void drawLabeledSimpleFigure(Graphics2D g2d, InfoFigureParameter figureInfo, ArrayList<InfoFigureParameter> Children) {		
		Factory factory = new Factory();
		Figure fig = factory.createFigure( figureInfo);
		if(fig != null)
		fig.draw(g2d, figureInfo, Children);
	}
}