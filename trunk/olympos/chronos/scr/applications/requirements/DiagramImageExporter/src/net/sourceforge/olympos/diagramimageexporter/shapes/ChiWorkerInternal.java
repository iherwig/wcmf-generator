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
public class ChiWorkerInternal extends Figure{
	private InfoCoordinateSize elli1 = new InfoCoordinateSize(0, 3, 47, 46);
	private InfoCoordinateSize head = new InfoCoordinateSize(17, 9, 11, 11);
	private InfoLine body = new InfoLine(23, 20, 23, 33);
	private InfoLine leftleg = new InfoLine(23, 33, 17, 42);
	private InfoLine rightleg = new InfoLine(23, 33, 29, 42);
	private InfoLine arm = new InfoLine(14, 23, 31, 23);
	private InfoLine arrow1 = new InfoLine(23, 3, 26, 0);
	private InfoLine arrow2 = new InfoLine(23, 3, 26, 6);
	
	private InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 49, 47);


	@Override
	public void draw(Graphics2D g2d, InfoFigureParameter createFig, ArrayList<InfoFigureParameter> children, SVGGenerator svg, ArrayList<String> existLine) {
		
		drawScaleEllipse(g2d, createFig, figureInfo, elli1);
		drawScaleEllipse(g2d, createFig, figureInfo, head);

		drawCenterLabelUnder(g2d, createFig);
		
		drawScaleLine(g2d, createFig, figureInfo, body);
		drawScaleLine(g2d, createFig, figureInfo, leftleg);
		drawScaleLine(g2d, createFig, figureInfo, rightleg);
		drawScaleLine(g2d, createFig, figureInfo, arm);
		
		drawScaleLine(g2d, createFig, figureInfo, arrow1);
		drawScaleLine(g2d, createFig, figureInfo, arrow2);
		
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
