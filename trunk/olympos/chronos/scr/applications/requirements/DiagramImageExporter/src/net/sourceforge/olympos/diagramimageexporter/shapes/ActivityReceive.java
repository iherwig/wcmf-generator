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
import net.sourceforge.olympos.diagramimageexporter.InfoLine;
import net.sourceforge.olympos.diagramimageexporter.SVGGenerator;


@SuppressWarnings("serial")
public class ActivityReceive extends Figure{
	private InfoLine infLine1 = new InfoLine( 0, 0, 62, 0); //oben
	private InfoLine infLine2 = new InfoLine( 62, 0, 62, 39); //Rechts
	private InfoLine infLine3 = new InfoLine( 0, 0, 21, 19);
	private InfoLine infLine4 = new InfoLine( 0, 39, 21,19); 
	private InfoLine infLine5 = new InfoLine( 0, 39, 62, 39); // unten
	
	private InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 62, 39);

	public void draw(Graphics2D g2d, InfoFigureParameter createFig, ArrayList<InfoFigureParameter> children, SVGGenerator svg, ArrayList<String> existLine) {
		
		drawScaleLine(g2d, createFig, figureInfo, infLine1);
		drawScaleLine(g2d, createFig, figureInfo, infLine2);
		drawScaleLine(g2d, createFig, figureInfo, infLine3);
		drawScaleLine(g2d, createFig, figureInfo, infLine4);
		drawScaleLine(g2d, createFig, figureInfo, infLine5);
		
		for(InfoFigureParameter currChild : children){
			ElementDiagram elem = ElementDiagram.getCatalogEntry(createFig.getType());
			HashMap<EnumFigureType, InfoAllowedConnection> figAllowedCatal1 = elem.getAllowedConnection();
			InfoAllowedConnection allowedConnection = figAllowedCatal1.get(currChild.getType());

			String key = createFig.getTypeId() + createFig.getAlias() + currChild.getTypeId() + currChild.getAlias();
			if (!existLine.contains(key)) {
				String comment = allowedConnection.getLineLabel();
				drawCon.drawConnection(g2d, createFig, currChild, comment, allowedConnection.getSourceConnectionArrow(), allowedConnection.getTargetConnectionArrow(), svg);
				existLine.add(key);
				String key2 = currChild.getTypeId() + currChild.getAlias() + createFig.getTypeId() + createFig.getAlias();
				existLine.add(key2);
			}
		}
	}
}
