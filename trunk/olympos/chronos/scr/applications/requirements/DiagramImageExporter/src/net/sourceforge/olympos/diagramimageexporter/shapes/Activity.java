package net.sourceforge.olympos.diagramimageexporter.shapes;

import java.awt.Graphics2D;
import java.util.ArrayList;
import java.util.HashMap;

import net.sourceforge.olympos.diagramimageexporter.*;


@SuppressWarnings("serial")
public class Activity extends Figure{

	private InfoLine infLine1 = new InfoLine( 15, 0, 78, 0); //oben
	private InfoLine infLine2 = new InfoLine( 0, 15, 0, 43); //links
	private InfoLine infLine4 = new InfoLine( 93, 15, 93,43); //rechts 
	private InfoLine infLine5 = new InfoLine( 15, 58, 78, 58); // unten
	private InfoArc arc1 = new InfoArc(0, 0, 30, 30, 90, 90);
	private InfoArc arc2 = new InfoArc(0, 28, 30, 30, -90, -90);
	private InfoArc arc3 = new InfoArc(63, 0, 30, 30,  90, -90);
	private InfoArc arc4 = new InfoArc(63, 28, 30, 30, -90, 90);
	
	private InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 93, 58);


	@Override
	public void draw(Graphics2D g2d, InfoFigureParameter createFig, ArrayList<InfoFigureParameter> children, SVGGenerator svg, ArrayList<String> existLine) {
		drawScaleLine(g2d, createFig, figureInfo, infLine1);
		drawScaleLine(g2d, createFig, figureInfo, infLine2);
		drawScaleLine(g2d, createFig, figureInfo, infLine4);
		drawScaleLine(g2d, createFig, figureInfo, infLine5);
		drawArc(g2d, createFig, figureInfo, arc1);
		drawArc(g2d, createFig, figureInfo, arc2);
		drawArc(g2d, createFig, figureInfo, arc3);
		drawArc(g2d, createFig, figureInfo, arc4);
		
		drawCenterLabelUnder(g2d, createFig);
		
		for(InfoFigureParameter currChild : children){
			ElementDiagram elem = ElementDiagram.getCatalogEntry(createFig.getType());
			HashMap<EnumFigureType, InfoAllowedConnection> figAllowedCatal1 = elem.getAllowedConnection();
			InfoAllowedConnection allowedConnection = figAllowedCatal1.get(currChild.getType());

			String key = createFig.getFigureId() + createFig.getAlias() + currChild.getTypeId() + currChild.getAlias();
			if (allowedConnection != null && !existLine.contains(key)) {

				String comment = allowedConnection.getLineLabel();
				drawCon.drawConnection(g2d, createFig, currChild, comment, allowedConnection.getSourceConnectionArrow(), allowedConnection.getTargetConnectionArrow(), svg);
				existLine.add(key);

			}
		}
	}
}
