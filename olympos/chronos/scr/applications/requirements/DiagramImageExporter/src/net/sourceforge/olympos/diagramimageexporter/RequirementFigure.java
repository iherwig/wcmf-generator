package net.sourceforge.olympos.diagramimageexporter;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.image.BufferedImage;
import java.io.File;

import javax.imageio.ImageIO;

public abstract class RequirementFigure extends Figure{
	protected void drawScaleRec(Graphics2D g2d, InfoFigureParameter createFig , InfoCoordinateSize figureInfo, InfoCoordinateSize rec) {
		float scaleY = (createFig.getHeight()/figureInfo.getHeight());
		float scaleX = (createFig.getWidth()/figureInfo.getWidth());
	
		int x = (int) (rec.getX() * scaleX + createFig.getX());
		int y = (int) (rec.getY() * scaleY + createFig.getY());
		int width = (int) (rec.getWidth() * scaleX);
		int height = (int) (rec.getHeight() * scaleY);
		
		g2d.draw(new Rectangle(x , y, width, height));
	}
	
	protected void drawScaleLine(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize figureInfo, InfoLine line) {
		float scaleY = (createFig.getHeight()/figureInfo.getHeight());
		float scaleX = (createFig.getWidth()/figureInfo.getWidth());
		
		int lineX1 = (int) (createFig.getX() + line.getX1() * scaleX);
		int lineY1 = (int) (createFig.getY() + line.getY1() * scaleY);
		int lineX2 = (int) (createFig.getX() + line.getX2() * scaleX);
		int lineY2 = (int) (createFig.getY() + line.getY2() * scaleY);
		
//		figure.getX() + infLine1.getX1()*scaleX, figure.getY() + infLine1.getY1()*scaleY, figure.getX() + infLine1.getX2()*scaleX, figure.getY() + infLine1.getY2()*scaleY);
		g2d.setPaint(Color.black);
		g2d.drawLine(lineX1, lineY1, lineX2, lineY2);
	}
	public void drawImg(Graphics2D g2d, InfoFigureParameter figure) {
		String imagePath = null;

		ElementDiagram elem = ElementDiagram.getCatalogEntry(figure.getType());
		imagePath = elem.getImage();
		
		try {
			BufferedImage img1 = ImageIO.read(new File(imagePath));
			if (img1 != null)
				g2d.drawImage(img1, (int) (figure.getWidth() + figure.getX() - 25), (int) figure.getY() + 5, 20, (int) 20, null);
		} catch (Exception e) {
			System.out.println(e);
		}
	}
}
