package net.sourceforge.olympos.diagramimageexporter.shapes;

import java.awt.Graphics2D;
import java.util.ArrayList;
import java.util.HashMap;

import net.sourceforge.olympos.diagramimageexporter.ElementDiagram;
import net.sourceforge.olympos.diagramimageexporter.EnumFigureType;
import net.sourceforge.olympos.diagramimageexporter.InfoAllowedConnection;
import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoFigureParameter;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;
import net.sourceforge.olympos.diagramimageexporter.RequirementFigure;
import net.sourceforge.olympos.diagramimageexporter.SVGGenerator;


@SuppressWarnings("serial")
public class ChiView extends RequirementFigure{
	
	private InfoCoordinateSize rect1 = new InfoCoordinateSize(0, 0,  116, 66);
	private InfoCoordinateSize rect2 = new InfoCoordinateSize(100, 2, 13, 7);
	private InfoLine infLine1 = new InfoLine(0, 12, 116, 12);
	
	private InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0,  116, 66);


	@Override
	public void draw(Graphics2D g2d, InfoFigureParameter createFig, ArrayList<InfoFigureParameter> children, SVGGenerator svg, ArrayList<String> existLine) {
		
		drawScaleRec(g2d, createFig, figureInfo, rect1);
		drawScaleRec(g2d, createFig, figureInfo, rect2);
		drawChiRec(g2d, createFig, figureInfo, rect2);
		drawScaleLine(g2d, createFig, figureInfo, infLine1);
		drawCenterLabel(g2d, createFig, figureInfo, rect1, infLine1);
		
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