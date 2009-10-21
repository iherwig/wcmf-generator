package net.sourceforge.olympos.diagramimageexporter;

import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.Shape;
import java.awt.geom.Ellipse2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.ArrayList;

import javax.imageio.ImageIO;
import javax.swing.JTextArea;

import org.apache.batik.svggen.SVGGraphics2D;

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
	
	protected void drawScaleXLine(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize figureInfo, InfoLine line) {
		float scaleX = (createFig.getWidth() / figureInfo.getWidth());

		int lineX1 = (int) (createFig.getX() + line.getX1() * scaleX);
		int lineY1 = (int) (createFig.getY() + line.getY1());
		int lineX2 = (int) (createFig.getX() + line.getX2() * scaleX);
		int lineY2 = (int) (createFig.getY() + line.getY2());

		g2d.drawLine(lineX1, lineY1, lineX2, lineY2);
	}
	
	protected void drawLine(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize figureInfo, InfoLine line) {

		int lineX1 = (int) (createFig.getX() + line.getX1());
		int lineY1 = (int) (createFig.getY() + line.getY1());
		int lineX2 = (int) (createFig.getX() + line.getX2());
		int lineY2 = (int) (createFig.getY() + line.getY2());

		g2d.drawLine(lineX1, lineY1, lineX2, lineY2);
	}

	protected void drawScaleEllipse(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize figureInfo, InfoCoordinateSize ellipse) {
		float scaleY = (createFig.getHeight() / figureInfo.getHeight());
		float scaleX = (createFig.getWidth() / figureInfo.getWidth());

		int x = (int) (createFig.getX() + ellipse.getX() * scaleX);
		int y = (int) (createFig.getY() + ellipse.getY() * scaleY);

		Shape ellip = new Ellipse2D.Double(x, y, ellipse.getHeight() * scaleX, ellipse.getWidth() * scaleY);
		g2d.draw(ellip);
	}
	
	protected void drawEllipse(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize figureInfo, InfoCoordinateSize ellipse) {
		float scaleX = (createFig.getWidth() / figureInfo.getWidth());

		int x = (int) (createFig.getX() + ellipse.getX() * scaleX);
		int y = (int) (createFig.getY() + ellipse.getY());

		Shape ellip = new Ellipse2D.Double(x, y, ellipse.getHeight(), ellipse.getWidth());
		g2d.draw(ellip);
	}

	protected void drawScaleEllipseChi(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize figureInfo, InfoCoordinateSize ellipse) {
		float scaleY = (createFig.getHeight() / figureInfo.getHeight());
		float scaleX = (createFig.getWidth() / figureInfo.getWidth());

		int x = (int) (createFig.getX() + ellipse.getX() * scaleX);
		int y = (int) (createFig.getY() + ellipse.getY() * scaleY);

		Shape ellip = new Ellipse2D.Double(x, y, ellipse.getHeight(), ellipse.getWidth());
		g2d.draw(ellip);
	}

	protected void drawScaleRec(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize figureInfo, InfoCoordinateSize rec) {
		float scaleY = (createFig.getHeight() / figureInfo.getHeight());
		float scaleX = (createFig.getWidth() / figureInfo.getWidth());

		int x = (int) (rec.getX() * scaleX + createFig.getX());
		int y = (int) (rec.getY() * scaleY + createFig.getY());
		int width = (int) (rec.getWidth() * scaleX);
		int height = (int) (rec.getHeight() * scaleY);

		g2d.draw(new Rectangle(x, y, width, height));
	}
	
	protected void drawContLabel(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize figureInfo, InfoCoordinateSize rect, InfoLine line) {
		float scaleY = (createFig.getHeight()/figureInfo.getHeight());
		float scaleX = (createFig.getWidth()/figureInfo.getWidth());
		
		int x = (int) (createFig.getX() + 5);
		int y = (int) (createFig.getY() + 7);
		int width = (int) ((rect.getWidth() * scaleX)-6);//-25);
		int height = (int) (rect.getHeight() * scaleY - 6);
		
		String label = createFig.getLabel();	
//		System.out.println(label);
		Font font = new Font("tahoma", Font.PLAIN, 12);
        
		SVGGraphics2D textbox = (SVGGraphics2D) g2d.create(x, y, width, height);
		JTextArea n = new JTextArea( label );
		n.setFont(font);
		n.setWrapStyleWord( true );
		n.setLineWrap( true );
		n.setBounds(x, y, width, height);
		n.setOpaque(false);
		n.setBackground(Color.white);
		n.paint( textbox );	
	}

	protected void drawScaleChiController(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize figureInfo, InfoLine line1,InfoLine line2, InfoCoordinateSize rect) {
		
		ArrayList<InfoXMLOptionValue> values = createFig.getValue();

		Font b = new Font("Tahoma", Font.PLAIN, 10);
		g2d.setFont(b);
		FontMetrics fm = g2d.getFontMetrics();

		int i = 0;
		int lineHeight = fm.getHeight();
		
		int curX 		= (int)(createFig.getX());
		int curXImage 	= (int)(createFig.getX() + lineHeight);
		int curY 		= (int)(createFig.getY() + line2.getY1());
		int curYImage 	= (int)(createFig.getY() + line2.getY1() + 3);
		
		for (InfoXMLOptionValue currValue : values) {

				
			try {
				BufferedImage img1 = ImageIO.read(new File("D:/Images/ChiOperation.png"));
				int xImage = curXImage;
				int yImage = curYImage;
				int widthImage = lineHeight;
				int hightImage = lineHeight;

				if (img1 != null)
					g2d.drawImage(img1, xImage, yImage, widthImage, hightImage, null);
			} catch (Exception e) {
				System.out.println(e);
			}
			curYImage += lineHeight ;
			curY += lineHeight ;
			curX = (int) (createFig.getX() + lineHeight + 15 );
			i++;
			g2d.setPaint(Color.black);
			g2d.setFont(b);
			g2d.drawString(currValue.getName(), curX , curY);
		}

	}
	
	protected void drawScaleChiNode(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize figureInfo, InfoLine line1, InfoLine line2, InfoCoordinateSize rect2) {
		
		ArrayList<InfoXMLOptionValue> values = createFig.getValue();

		Font b = new Font("Tahoma", Font.PLAIN, 10);
		g2d.setFont(b);
		FontMetrics fm = g2d.getFontMetrics();

		int i = 0;
		int lineHeight = fm.getHeight();
		
		int curX 		= (int)(createFig.getX());
		int curXImage 	= (int)(createFig.getX() + lineHeight);
		int curY 		= (int)(createFig.getY() + line1.getY1());
		int curYImage 	= (int)(createFig.getY() + line1.getY1() + 3);
		
		for (InfoXMLOptionValue currValue : values) {
				
			try {
				BufferedImage img1 = ImageIO.read(new File("D:/Images/ChiAttribute.png"));
				int xImage = curXImage;
				int yImage = curYImage;
				int widthImage = lineHeight;
				int hightImage = lineHeight;

				if (img1 != null)
					g2d.drawImage(img1, xImage, yImage, widthImage, hightImage, null);
			} catch (Exception e) {
				System.out.println(e);
			}
			curYImage += lineHeight ;
			curY += lineHeight ;
			curX = (int) (createFig.getX() + lineHeight + 20 );
			i++;
			g2d.setPaint(Color.black);
			g2d.setFont(b);
			g2d.drawString(currValue.getName(), curX , curY);
		}
		ArrayList<InfoXMLOptionValue> operation = createFig.getOperation();
		
		if(operation.size() > 0){
			
		}
		else{
			drawScaleXLine(g2d, createFig, figureInfo, line2);
		}
	}	

	protected void drawScaleChi(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize ellipse, InfoCoordinateSize figureInfo) {
		float scaleY = (createFig.getHeight() / figureInfo.getHeight());
		float scaleX = (createFig.getWidth() / figureInfo.getWidth());

		int headX = (int) (createFig.getX() + ellipse.getX() * scaleX);
		int headY = (int) (createFig.getY() + ellipse.getY() * scaleY);
		int headWidth = (int) (ellipse.getWidth() * scaleY);
		int headHight = (int) (ellipse.getHeight() * scaleX);

		float h = ellipse.getWidth() / 2 * scaleX;
		float f = (float) (h / Math.sin(45));
		float i = ellipse.getHeight() / 2 * scaleY;
		float j = (float) (i / Math.sin(45));
		// System.out.println( f + "    " + j);

		String imagePath = null;

		ElementDiagram elem = ElementDiagram.getCatalogEntry(createFig.getType());
		imagePath = elem.getImage();

		try {
			BufferedImage img1 = ImageIO.read(new File(imagePath));
			int x = (int) (headX + (scaleX * 3));
			int y = (int) (headY + (scaleY * 3));
			int width = (int) (headWidth - (scaleY * 6));
			int hight = (int) (headHight - (scaleX * 6));

			if (img1 != null)
				g2d.drawImage(img1, x, y, width, hight, null);
		} catch (Exception e) {
			System.out.println(e);
		}
	}
	protected void drawChi(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize figureInfo, InfoCoordinateSize ellipse) {
		float scaleX = (createFig.getWidth() / figureInfo.getWidth());

		int headX = (int) (createFig.getX() + ellipse.getX() * scaleX);
		int headY = (int) (createFig.getY() + ellipse.getY());
		int headWidth = (int) (ellipse.getWidth());
		int headHight = (int) (ellipse.getHeight());

		String imagePath = null;

		ElementDiagram elem = ElementDiagram.getCatalogEntry(createFig.getType());
		imagePath = elem.getImage();

		try {
			BufferedImage img1 = ImageIO.read(new File(imagePath));
			int x = (int) (headX + 2);
			int y = (int) (headY + 2);
			int width = (int) (headWidth - 4);
			int hight = (int) (headHight - 4);

			if (img1 != null)
				g2d.drawImage(img1, x, y, width, hight, null);
		} catch (Exception e) {
			System.out.println(e);
		}
	}
}