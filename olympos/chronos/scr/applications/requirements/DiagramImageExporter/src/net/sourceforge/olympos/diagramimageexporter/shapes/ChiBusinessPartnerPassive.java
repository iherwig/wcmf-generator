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


@SuppressWarnings("serial")
public class ChiBusinessPartnerPassive extends Figure{
	InfoLine body = new InfoLine(12, 15, 12, 33);
	InfoLine leftleg = new InfoLine(12, 33, 2, 47);
	InfoLine rightleg = new InfoLine(12, 33, 21, 47);
	InfoLine armleft = new InfoLine(0, 28 ,12, 20);
	InfoLine armright = new InfoLine(12, 20, 22, 28);
	InfoCoordinateSize head = new InfoCoordinateSize(4, 0, 15, 15);
	
	InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 20, 45);
	
	public ChiBusinessPartnerPassive(){
	}
	
	
	public InfoLine getBody() {
		return body;
	}
	public InfoLine getLeftLeg() {
		return leftleg;
	}
	public InfoLine getRightLeg() {
		return rightleg;
	}
	public InfoLine getArmLeft() {
		return armleft;
	}
	public InfoLine getArmRight() {
		return armright;
	}


	@Override
	public void draw(Graphics2D g2d, InfoFigureParameter createFig, ArrayList<InfoFigureParameter> children) {

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

			if (allowedConnection != null) {
				String comment = allowedConnection.getLineLabel();
				
				drawCon.drawConnection(g2d, createFig, currChild, comment, allowedConnection.getSourceConnectionArrow(), allowedConnection.getTargetConnectionArrow());
			}
		}
	}
}
