package net.sourceforge.olympos.diagramimageexporter;

import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.image.BufferedImage;
import java.io.File;

import javax.imageio.ImageIO;

public abstract class RequirementFigure extends Figure{
	InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 150 , 50);
	InfoCoordinateSize rect1 = new InfoCoordinateSize(0, 0, 150 , 50);
	InfoLine infLine1 = new InfoLine(10, 0, 10, 50);
	InfoLine infLine2 = new InfoLine(15, 0, 15, 50);
	
	protected void drawScaleRec(Graphics2D g2d, InfoFigureParameter createFig , InfoCoordinateSize figureInfo, InfoCoordinateSize rec) {
		float scaleY = (createFig.getHeight()/figureInfo.getHeight());
		float scaleX = (createFig.getWidth()/figureInfo.getWidth());
	
		int x = (int) (rec.getX() * scaleX + createFig.getX());
		int y = (int) (rec.getY() * scaleY + createFig.getY());
		int width = (int) (rec.getWidth() * scaleX);
		int height = (int) (rec.getHeight() * scaleY);
		
		g2d.draw(new Rectangle(x , y, width, height));
	}
	
	protected void drawImg(Graphics2D g2d, InfoFigureParameter figure) {
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
	@Override
	public void draw(Graphics2D g2d, InfoFigureParameter fig) {

		drawScaleRec(g2d, fig, figureInfo, rect1);

		drawScaleLine(g2d, fig, figureInfo, infLine1);
		drawScaleLine(g2d, fig, figureInfo, infLine2);
		
		drawImg(g2d, fig);
	}
	
}
