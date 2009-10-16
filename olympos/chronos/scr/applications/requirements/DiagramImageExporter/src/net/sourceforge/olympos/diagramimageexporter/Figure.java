package net.sourceforge.olympos.diagramimageexporter;

import java.awt.Graphics2D;
import java.awt.Shape;
import java.awt.geom.Ellipse2D;
import java.awt.image.BufferedImage;
import java.io.File;

import javax.imageio.ImageIO;

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

	protected void drawScaleEllipse(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize figureInfo, InfoCoordinateSize ellipse) {
		float scaleY = (createFig.getHeight() / figureInfo.getHeight());
		float scaleX = (createFig.getWidth() / figureInfo.getWidth());

		int x = (int) (createFig.getX() + ellipse.getX() * scaleX);
		int y = (int) (createFig.getY() + ellipse.getY() * scaleY);
		
		Shape ellip = new Ellipse2D.Double( x, y, ellipse.getHeight()*scaleX, ellipse.getWidth()*scaleY);
		g2d.draw(ellip);
	}
	
	protected void drawScaleChi(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize ellipse,InfoCoordinateSize figureInfo){
		float scaleY = (createFig.getHeight() / figureInfo.getHeight());
		float scaleX = (createFig.getWidth() / figureInfo.getWidth());
		String imagePath = null;

		ElementDiagram elem = ElementDiagram.getCatalogEntry(createFig.getType());
		imagePath = elem.getImage();
		System.out.println(imagePath);
		
		try {		
			BufferedImage img1 = ImageIO.read(new File(imagePath));
			int x = (int)((createFig.getX()+(2 / (ellipse.getWidth() - (ellipse.getWidth()- ( 2 * scaleX )* 2)))));
			int y = (int)((createFig.getY()+(ellipse.getY())+ 2 * scaleY));
			int width = (int) (ellipse.getWidth()- ( 2 * scaleX )* 2);
			int height = (int) (ellipse.getHeight()- ( 2 * scaleY )* 2);
			if (img1 != null)
				g2d.drawImage(img1, x, y,width ,height, null);
		} catch (Exception e) {
			System.out.println(e);
		}
	}

}