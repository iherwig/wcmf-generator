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

@SuppressWarnings("serial")
public class ChiBusinessProcess extends RequirementFigure{
	InfoCoordinateSize rect1 = new InfoCoordinateSize(0, 0, 150, 50);
	InfoLine infLine1 = new InfoLine(10, 0, 10, 50);
	InfoLine infLine2 = new InfoLine(15, 0, 15, 50);
	InfoLine inLeft = new InfoLine(122, 5, 122,13);
	InfoLine inUp = new InfoLine(122, 5, 140, 5);
	InfoLine inDown = new InfoLine(122, 13, 140, 13);
	InfoLine inrightup = new InfoLine(140, 5, 145, 9);
	InfoLine inrightdown = new InfoLine(140, 13, 145, 9);
	
	InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 150, 50);
	
	
	public ChiBusinessProcess(){

	}
	
	public InfoCoordinateSize getRect1() {
		return rect1;
	}
	public InfoLine getInfLine1() {
		return infLine1;
	}
	public InfoLine getInfLine2() {
		return infLine2;
	}

	@Override
	public void draw(Graphics2D g2d, InfoFigureParameter createFig, ArrayList<InfoFigureParameter> children) {
		drawScaleRec(g2d, createFig, figureInfo, rect1);
		drawScaleLine(g2d, createFig, figureInfo, infLine1);
		drawScaleLine(g2d, createFig, figureInfo, inLeft);
		drawScaleLine(g2d, createFig, figureInfo, inUp);
		drawScaleLine(g2d, createFig, figureInfo, inDown);
		drawScaleLine(g2d, createFig, figureInfo, inrightup);
		drawScaleLine(g2d, createFig, figureInfo, inrightdown);
		drawRecLineLabel(g2d, createFig, figureInfo, rect1, infLine1);
		
		for(InfoFigureParameter currChild : children){
			ElementDiagram elem = ElementDiagram.getCatalogEntry(createFig.getType());
			HashMap<EnumFigureType, InfoAllowedConnection> hashTabOfAllowedFigures1 = elem.getAllowedConnection();
			InfoAllowedConnection allowedConnection = hashTabOfAllowedFigures1.get(currChild.getType());

			if (allowedConnection != null) {
				String comment = allowedConnection.getLineLabel();

				drawCon.drawConnection(g2d, createFig, currChild, comment, allowedConnection.getSourceConnectionArrow(), allowedConnection.getTargetConnectionArrow());
			}
		}
	}
}
