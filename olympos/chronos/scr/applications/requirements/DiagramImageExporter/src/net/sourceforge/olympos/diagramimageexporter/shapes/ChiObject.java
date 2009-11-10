package net.sourceforge.olympos.diagramimageexporter.shapes;

import java.awt.Graphics2D;
import java.util.ArrayList;
import java.util.HashMap;

import net.sourceforge.olympos.diagramimageexporter.ElementDiagram;
import net.sourceforge.olympos.diagramimageexporter.EnumFigureType;
import net.sourceforge.olympos.diagramimageexporter.Figure;
import net.sourceforge.olympos.diagramimageexporter.InfoAllowedConnection;
import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoFigureParameter;

@SuppressWarnings("serial")
public class ChiObject extends Figure {
//	g2d.draw(new Rectangle(0, 0, 100, 50));
	private InfoCoordinateSize rect = new InfoCoordinateSize(0, 0, 138, 60);
	private InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 138, 60);
	
	@Override
	public void draw(Graphics2D g2d, InfoFigureParameter createFig, ArrayList<InfoFigureParameter> children) {
		
		drawScaleRec(g2d, createFig, figureInfo, rect);
		drawRecLabelLeft(g2d, createFig, figureInfo, rect);
		drawObjectStatus(g2d, createFig, figureInfo, rect);
		
		for(InfoFigureParameter currChild : children){
			ElementDiagram elem = ElementDiagram.getCatalogEntry(createFig.getType());
			HashMap<EnumFigureType, InfoAllowedConnection> figAllowedCatal1 = elem.getAllowedConnection();
			InfoAllowedConnection allowedConnection = figAllowedCatal1.get(currChild.getType());

			if (allowedConnection != null) {
				String comment = allowedConnection.getLineLabel();
				
				drawCon.drawConnection(g2d, createFig, currChild, comment, allowedConnection.getSourceConnectionArrow(), allowedConnection.getTargetConnectionArrow());
			}
		}
	}
}
