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
public class ActivityDecision extends Figure{

	private InfoLine infLine1 = new InfoLine( 0, 40, 80, 0); //oben links
	private InfoLine infLine2 = new InfoLine( 80, 0, 160,  40);//unten links
	private InfoLine infLine3 = new InfoLine(160, 40, 80, 80);//unten rechts
	private InfoLine infLine4 = new InfoLine(80, 80, 0,  40); //oben rechts
	
	private InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 160, 80);


	public void draw(Graphics2D g2d,InfoFigureParameter createFig, ArrayList<InfoFigureParameter> children, SVGGenerator svg, ArrayList<String> existLine) {
		
		drawScaleLine(g2d, createFig, figureInfo, infLine1);
		drawScaleLine(g2d, createFig, figureInfo, infLine2);
		drawScaleLine(g2d, createFig, figureInfo, infLine3);
		drawScaleLine(g2d, createFig, figureInfo, infLine4);
		
		drawCenterLabelUnder(g2d, createFig);
		
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
