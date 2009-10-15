package net.sourceforge.olympos.diagramimageexporter;

import java.awt.Graphics2D;
import java.awt.Shape;
import java.awt.geom.Ellipse2D;

public abstract class Figure {
	abstract public void draw(Graphics2D g2d, InfoFigureParameter fig);

	protected void drawScaleLine(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize figureInfo, InfoLine line) {
		float scaleY = (createFig.getHeight() / figureInfo.getHeight());
		float scaleX = (createFig.getWidth() / figureInfo.getWidth());

		int lineX1 = (int) (createFig.getX() + line.getX1() * scaleX);
		int lineY1 = (int) (createFig.getY() + line.getY1() * scaleY);
		int lineX2 = (int) (createFig.getX() + line.getX2() * scaleX);
		int lineY2 = (int) (createFig.getY() + line.getY2() * scaleY);

		g2d.drawLine(lineX1, lineY1, lineX2, lineY2);
	}

//	protected void drawScaleRec(Graphics2D g2d, InfoFigureParameter fig, InfoCoordinateSize figureInfo, InfoCoordinateSize rec) {
//
//	}
	/*
		elli1.setAll(figure.getX(), figure.getY(), elli1.getHeight() * scaleY , elli1.getWidth() * scaleX);
		ellipse.add(elli1);
		
		float headX = (body.getX1() - (head.getWidth()+1 ) / 2) * scaleX + figure.getX();
		float headY = body.getY1() - ((head.getHeight()))+ figure.getY();
		head.setAll(headX,headY, head.getHeight() * scaleY, head.getWidth() * scaleX);
		ellipse.add(head);
		*/

	protected void drawScaleEllipse(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize figureInfo, InfoCoordinateSize ellipse) {
		float scaleY = (createFig.getHeight() / figureInfo.getHeight());
		float scaleX = (createFig.getWidth() / figureInfo.getWidth());

		int x = (int) (createFig.getX() + ellipse.getX() * scaleX);
		int y = (int) (createFig.getY() + ellipse.getY() * scaleY);
		
		Shape ellip = new Ellipse2D.Double( x, y, ellipse.getHeight()*scaleX, ellipse.getWidth()*scaleY);
		g2d.draw(ellip);
	}

}