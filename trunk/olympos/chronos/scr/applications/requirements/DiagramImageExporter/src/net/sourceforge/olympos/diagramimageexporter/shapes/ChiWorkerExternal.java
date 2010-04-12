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
public class ChiWorkerExternal extends Figure{
	
	private InfoLine body = new InfoLine(26, 18, 26, 30);
	private InfoLine leftleg = new InfoLine(26, 30, 18, 41);
	private InfoLine rightleg = new InfoLine(26, 30, 34, 41);
	private InfoLine arm = new InfoLine(19, 21, 34, 21);
	private InfoLine lineLeft = new InfoLine(0, 0, 0, 45);
	private InfoCoordinateSize elli1 = new InfoCoordinateSize(2, 0, 48, 48);
	private InfoCoordinateSize head = new InfoCoordinateSize(20, 6, 12, 12);
	
	private InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 48, 48);

	@Override
	public void draw(Graphics2D g2d, InfoFigureParameter createFig, ArrayList<InfoFigureParameter> children, SVGGenerator svg, ArrayList<String> existLine) {
		
		drawScaleEllipse(g2d, createFig, figureInfo, elli1);
		drawScaleEllipse(g2d, createFig, figureInfo, head);

		drawCenterLabelUnder(g2d, createFig);
		
		drawScaleLine(g2d, createFig, figureInfo, body);
		drawScaleLine(g2d, createFig, figureInfo, leftleg);
		drawScaleLine(g2d, createFig, figureInfo, rightleg);
		drawScaleLine(g2d, createFig, figureInfo, arm);
		drawScaleLine(g2d, createFig, figureInfo, lineLeft);	

		drawCenterLabelUnder(g2d, createFig);
		
		drawScaleChi(g2d, createFig, figureInfo, head);
		
		for(InfoFigureParameter currChild : children){
			ElementDiagram elem = ElementDiagram.getCatalogEntry(createFig.getType());
			HashMap<EnumFigureType, InfoAllowedConnection> figAllowedCatal1 = elem.getAllowedConnection();
			InfoAllowedConnection allowedConnection = figAllowedCatal1.get(currChild.getType());

			String key = createFig.getTypeId() + createFig.getAlias() + currChild.getTypeId() + currChild.getAlias();
			if (!existLine.contains(key)&& allowedConnection != null) {
				String comment = allowedConnection.getLineLabel();
				drawCon.drawConnection(g2d, createFig, currChild, comment, allowedConnection.getSourceConnectionArrow(), allowedConnection.getTargetConnectionArrow(), svg);
				existLine.add(key);
				String key2 = currChild.getTypeId() + currChild.getAlias() + createFig.getTypeId() + createFig.getAlias();
				existLine.add(key2);
			}
		}
	}
}
