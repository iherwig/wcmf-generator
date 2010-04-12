package net.sourceforge.olympos.diagramimageexporter.shapes;

import java.awt.Graphics2D;
import java.util.ArrayList;
import java.util.HashMap;

import net.sourceforge.olympos.diagramimageexporter.ElementDiagram;
import net.sourceforge.olympos.diagramimageexporter.EnumConnection;
import net.sourceforge.olympos.diagramimageexporter.EnumFigureType;
import net.sourceforge.olympos.diagramimageexporter.Figure;
import net.sourceforge.olympos.diagramimageexporter.InfoAllowedConnection;
import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoFigureParameter;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;
import net.sourceforge.olympos.diagramimageexporter.SVGGenerator;
import net.sourceforge.olympos.diagramimageexporter.catalogManyToMany;

@SuppressWarnings("serial")
public class ChiNode extends Figure {
	
	private InfoCoordinateSize rect = new InfoCoordinateSize(0, 0, 138, 60);
	private  InfoCoordinateSize circle = new InfoCoordinateSize(105, 5, 12, 12);
	private InfoLine infLine1 = new InfoLine(0, 40, 138, 40);
	private InfoLine infLine2 = new InfoLine(0, 48, 138, 48);
	private InfoLine circleLine = new InfoLine(0, 17, 11, 17);
	
	private InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 138, 60);

	@Override
	public void draw(Graphics2D g2d, InfoFigureParameter createFig, ArrayList<InfoFigureParameter> children, SVGGenerator svg, ArrayList<String> existLine) {

		drawScaleChiNode(g2d, createFig, figureInfo, infLine1, infLine2, rect);
		drawScaleXLine(g2d, createFig, figureInfo, infLine1);
		drawContLabel(g2d, createFig, figureInfo, rect, infLine1);
		drawEllipseLeft(g2d, createFig, figureInfo, circle, rect);
		drawChiRight(g2d, createFig, figureInfo, circle, rect);

		for (InfoFigureParameter currChild : children) {
			if (currChild.getType() == EnumFigureType.CHI_NODE_MANY_TO_MANY) {
				HashMap<EnumConnection, InfoAllowedConnection> manyToManyCatalog = catalogManyToMany.getConnections();
				InfoAllowedConnection manyToManyValues = manyToManyCatalog.get(EnumConnection.valueOf(currChild.getRelationType()));

				String key = createFig.getTypeId() + createFig.getAlias() + currChild.getTypeId() + currChild.getAlias();
				if (manyToManyValues != null && !existLine.contains(key)) {
					String comment = manyToManyValues.getLineLabel();

					drawCon.drawConnection(g2d, createFig, currChild, comment, manyToManyValues.getSourceConnectionArrow(), manyToManyValues.getTargetConnectionArrow(), svg);
					existLine.add(key);
					String key2 = currChild.getTypeId() + currChild.getAlias() + createFig.getTypeId() + createFig.getAlias();
					existLine.add(key2);
				}
			}
			else if (currChild.getType() == EnumFigureType.CHI_NODE){
				HashMap<EnumConnection, InfoAllowedConnection> manyToManyCatalog = catalogManyToMany.getConnections();
				InfoAllowedConnection manyToManyConnection = manyToManyCatalog.get(EnumConnection.valueOf(currChild.getRelationType()));

				String key = createFig.getTypeId() + createFig.getAlias() + currChild.getTypeId() + currChild.getAlias();
				if (manyToManyConnection != null) {
					String comment = manyToManyConnection.getLineLabel();

					drawCon.drawConnection(g2d, createFig, currChild, comment, manyToManyConnection.getSourceConnectionArrow(), manyToManyConnection.getTargetConnectionArrow(), svg);
					existLine.add(key);
					String key2 = currChild.getTypeId() + currChild.getAlias() + createFig.getTypeId() + createFig.getAlias();
					existLine.add(key2);
				}
			}
			else {
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
}
