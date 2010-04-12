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
public class ChiBusinessPartnerActive extends Figure{
	
	private InfoLine body = new InfoLine(12, 15, 12, 32);
	private InfoLine leftleg = new InfoLine(12, 32, 2, 47);
	private InfoLine rightleg = new InfoLine(12, 32, 21, 47);
	private InfoLine armleft = new InfoLine(0, 15 ,12, 22);
	private InfoLine armright = new InfoLine(12, 22, 23, 15);
	private InfoCoordinateSize head = new InfoCoordinateSize(4, 0, 15, 15);
	
	private InfoCoordinateSize figureInfo = new InfoCoordinateSize(0,0,26,47);
	

	public void draw(Graphics2D g2d, InfoFigureParameter createFig, ArrayList<InfoFigureParameter> children, SVGGenerator svg, ArrayList<String> existLine) {

		drawScaleEllipse(g2d, createFig, figureInfo, head);

		drawScaleLine(g2d, createFig, figureInfo, body);
		drawScaleLine(g2d, createFig, figureInfo, leftleg);
		drawScaleLine(g2d, createFig, figureInfo, rightleg);
		drawScaleLine(g2d, createFig, figureInfo, armleft);
		drawScaleLine(g2d, createFig, figureInfo, armright);

		drawCenterLabelUnder(g2d, createFig);
		
		
		drawScaleChi(g2d, createFig, figureInfo, head);
		
		for(InfoFigureParameter currChild : children){
			ElementDiagram elem = ElementDiagram.getCatalogEntry(createFig.getType());
			HashMap<EnumFigureType, InfoAllowedConnection> figAllowedCatal1 = elem.getAllowedConnection();
			InfoAllowedConnection allowedConnection = figAllowedCatal1.get(currChild.getType());

			String key = createFig.getTypeId() + createFig.getAlias() + currChild.getTypeId() + currChild.getAlias();
			if (!existLine.contains(key) && allowedConnection != null) {
				String comment = allowedConnection.getLineLabel();
				drawCon.drawConnection(g2d, createFig, currChild, comment, allowedConnection.getSourceConnectionArrow(), allowedConnection.getTargetConnectionArrow(), svg);
				existLine.add(key);
				String key2 = currChild.getTypeId() + currChild.getAlias() + createFig.getTypeId() + createFig.getAlias();
				existLine.add(key2);
			}
		}
	}
}
