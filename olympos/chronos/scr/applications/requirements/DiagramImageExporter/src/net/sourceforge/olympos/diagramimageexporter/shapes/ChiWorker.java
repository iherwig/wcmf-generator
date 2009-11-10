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
public class ChiWorker extends Figure{
	InfoCoordinateSize elli1 = new InfoCoordinateSize(0, 0, 50, 49);
	InfoCoordinateSize head = new InfoCoordinateSize(18, 6, 12, 12);
	InfoLine body = new InfoLine(24, 18, 24, 31);
	InfoLine leftleg = new InfoLine(24, 31, 17, 42);
	InfoLine rightleg = new InfoLine(24, 31, 31, 42);
	InfoLine arm = new InfoLine(15, 22, 32, 22);
	InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 50, 49);

	
	public ChiWorker() {
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
		return arm;
	}
	public InfoCoordinateSize getRound() {
		return elli1;
	}
	public InfoCoordinateSize getHead() {
		return head;
	}

	public void setAll(InfoCoordinateSize elli1, InfoCoordinateSize head, InfoLine body, InfoLine leftleg, InfoLine rightleg, InfoLine arm){
		this.elli1 = elli1;
		this.head = head;
		this.body = body;
		this.leftleg = leftleg;
		this.rightleg = rightleg;
		this.arm = arm;
	}


	public void draw(Graphics2D g2d, InfoFigureParameter createFig, ArrayList<InfoFigureParameter> children) {
		
		drawScaleEllipse(g2d, createFig, figureInfo, elli1);
		drawScaleEllipse(g2d, createFig, figureInfo, head);
		
		drawScaleLine(g2d, createFig, figureInfo, body);
		drawScaleLine(g2d, createFig, figureInfo, leftleg);
		drawScaleLine(g2d, createFig, figureInfo, rightleg);
		drawScaleLine(g2d, createFig, figureInfo, arm);

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
