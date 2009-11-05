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
import javax.swing.JPanel;
import javax.swing.JTextArea;

import org.apache.batik.svggen.SVGGraphics2D;

public abstract class Figure extends JPanel {
	
	abstract public void draw(Graphics2D g2d, InfoFigureParameter fig);
	
	//Label
	//////////////////////////////////////////////////////////
	protected void drawRecLabelLeft(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize figureInfo, InfoCoordinateSize rect) {
		float scaleY = (createFig.getHeight() / figureInfo.getHeight());
		float scaleX = (createFig.getWidth() / figureInfo.getWidth());

		int x = (int) (createFig.getX() + 5);
		int y = (int) (createFig.getY() + 7);
		int width = (int) ((rect.getWidth() * scaleX) - 6);// -25);
		int height = (int) (rect.getHeight() * scaleY - 6);

		String label = createFig.getLabel();
		Font font = new Font("tahoma", Font.PLAIN, 12);

		SVGGraphics2D textbox = (SVGGraphics2D) g2d.create(x, y, width, height);
		JTextArea n = new JTextArea(label);
		n.setFont(font);
		n.setWrapStyleWord(true);
		n.setLineWrap(true);
		n.setBounds(x, y, width, height);
		n.setOpaque(false);
		n.paint(textbox);
	}
	
	protected void drawContLabel(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize figureInfo, InfoCoordinateSize rect, InfoLine line) {
		float scaleY = (createFig.getHeight() / figureInfo.getHeight());
		float scaleX = (createFig.getWidth() / figureInfo.getWidth());

		int x = (int) (createFig.getX() + 5);
		int y = (int) (createFig.getY() + 7);
		int width = (int) ((rect.getWidth() * scaleX) - 6);// -25);
		int height = (int) (rect.getHeight() * scaleY - 6);

		String label = createFig.getLabel();
		Font font = new Font("tahoma", Font.PLAIN, 12);

		SVGGraphics2D textbox = (SVGGraphics2D) g2d.create(x, y, width, height);
		JTextArea n = new JTextArea(label);
		n.setFont(font);
		n.setWrapStyleWord(true);
		n.setLineWrap(true);
		n.setBounds(x, y, width, height);
		n.setOpaque(false);
		n.paint(textbox);
	}

	protected void drawRecLineLabel(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize figureInfo, InfoCoordinateSize rect, InfoLine line) {
		float scaleY = (createFig.getHeight() / figureInfo.getHeight());
		float scaleX = (createFig.getWidth() / figureInfo.getWidth());

		int x = (int) (createFig.getX() + line.getX1() + 5);
		int y = (int) (createFig.getY() + 7);
		int width = (int) ((rect.getWidth() * scaleX) - 6);// -25);
		int height = (int) (rect.getHeight() * scaleY - 6);

		String label = createFig.getLabel();
		Font font = new Font("tahoma", Font.PLAIN, 12);

		SVGGraphics2D textbox = (SVGGraphics2D) g2d.create(x, y, width, height);
		JTextArea n = new JTextArea(label);
		n.setFont(font);
		n.setWrapStyleWord(true);
		n.setLineWrap(true);
		n.setBounds(x, y, width, height);
		n.setOpaque(false);
		n.paint(textbox);
	}

	protected void drawCenterLabelUnder(Graphics2D g2d, InfoFigureParameter figure) {

		Font calledElement = new Font("tahoma", Font.PLAIN, 12);
		g2d.setFont(calledElement);

		int mX = (int) (figure.getX() + figure.getWidth() / 2);
		int mY = (int) (figure.getY() + figure.getHeight());

		FontMetrics fm = g2d.getFontMetrics();

		int i = 0;
		int lineHeight = fm.getHeight() + 3;
		String comment = figure.getLabel();
		String[] words = comment.split(" ");
		int curX = mX;
		int curY = mY;

		for (String word : words) {
			int wordWidth = fm.stringWidth(word + " ");

			curY += lineHeight;
			curX = (int) mX;
			i++;
			g2d.setPaint(Color.black);
			int boxWidth = fm.stringWidth(word + " ") + 10;
			g2d.drawString(word, curX - (boxWidth / 2), curY);
			curX += wordWidth;
		}
	}

	protected void drawCenterLabel(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize figureInfo, InfoCoordinateSize rect, InfoLine line) {
		float scaleY = (createFig.getHeight() / figureInfo.getHeight());
		float scaleX = (createFig.getWidth() / figureInfo.getWidth());

		String label = createFig.getLabel();
		Font font = new Font("tahoma", Font.PLAIN, 12);
		FontMetrics fm = g2d.getFontMetrics();
		int lineHeight = fm.getHeight();

		int width = (int) (rect.getWidth() * scaleX);
		int recHeight = (int) (rect.getHeight() * scaleY);
		int lineX1 = (int) (line.getX1() * scaleX);
		int height = recHeight - lineX1;
		int x = (int) (lineX1 + createFig.getX() + 5);
		int y = (int) (((line.getY1() + (recHeight - lineX1) / 2) - lineHeight) + createFig.getY());

		SVGGraphics2D textbox = (SVGGraphics2D) g2d.create(x, y, width, height);
		JTextArea n1 = new JTextArea(label);
		n1.setFont(font);
		n1.setWrapStyleWord(true);
		n1.setLineWrap(true);
		n1.setBounds(x, y, width, height);
		n1.setOpaque(false);

		n1.paint(textbox);
	}
	
	protected void drawObjectStatus(Graphics2D g2d,  InfoFigureParameter createFig, InfoCoordinateSize figureInfo,InfoCoordinateSize rect){
		float scaleY = (createFig.getHeight() / figureInfo.getHeight());
		float scaleX = (createFig.getWidth() / figureInfo.getWidth());

		int x = (int) (createFig.getX() + 2);
		int y = (int) (createFig.getY() + (rect.getHeight() * scaleY)/2);
		int width = (int) ((rect.getWidth() * scaleX) -2);// -25);
		int height = (int) ((rect.getHeight() * scaleY)/2);

		String label = "["+createFig.getObjectStatus()+"]";
		Font font = new Font("tahoma", Font.PLAIN, 12);

		SVGGraphics2D textbox = (SVGGraphics2D) g2d.create(x, y, width, height);
		JTextArea n = new JTextArea(label);
		n.setBackground(Color.white);
		n.setFont(font);
		n.setWrapStyleWord(true);
		n.setLineWrap(true);
		n.setBounds(x, y, width, height);
//		n.setOpaque(false);
		n.paint(textbox);
	}
	
	//Chi
	/////////////////////////////////////////////////////////
	protected void drawScaleEllipseChi(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize figureInfo, InfoCoordinateSize ellipse) {
		float scaleY = (createFig.getHeight() / figureInfo.getHeight());
		float scaleX = (createFig.getWidth() / figureInfo.getWidth());

		int x = (int) (createFig.getX() + ellipse.getX() * scaleX);
		int y = (int) (createFig.getY() + ellipse.getY() * scaleY);

		Shape ellip = new Ellipse2D.Double(x, y, ellipse.getHeight(), ellipse.getWidth());
		g2d.draw(ellip);
	}
	
	
	//Line
	////////////////////////////////////////////////////////
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

	// Ellipse
	/////////////////////////////////////////////////////////
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
	
	//rec
	///////////////////////////////////////////////////////////
	protected void drawEllipseLeft(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize figureInfo, InfoCoordinateSize ellipse, InfoCoordinateSize rect) {
		float scaleX = (createFig.getWidth() / figureInfo.getWidth());

		int x = (int) (createFig.getX() + rect.getWidth() * scaleX - 20);
		int y = (int) (createFig.getY() + ellipse.getY());

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
	

	protected void drawNotImplementesJet(Graphics2D g2d, InfoFigureParameter createFig) {

		int x = (int) (createFig.getX() + 5);
		int y = (int) (createFig.getY() + 7);
		int width = (int) (60);// -25);
		int height = (int) (60);

		g2d.draw(new Rectangle(x, y, width, height));

		String label = "Not implemented jet";
		Font font = new Font("tahoma", Font.PLAIN, 12);

		SVGGraphics2D textbox = (SVGGraphics2D) g2d.create(x, y, width, height);
		JTextArea n = new JTextArea(label);
		n.setFont(font);
		n.setWrapStyleWord(true);
		n.setLineWrap(true);
		n.setBounds(x, y, width, height);
		n.setOpaque(false);
		n.paint(textbox);
	}


	//Elements
	///////////////////////////////////////////////////////////////
	protected void drawScaleChiController(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize figureInfo, InfoLine line1, InfoLine line2, InfoCoordinateSize rect) {

		float scaleY = (createFig.getHeight() / figureInfo.getHeight());
		float scaleX = (createFig.getWidth() / figureInfo.getWidth());

		int x = (int) (rect.getX() * scaleX + createFig.getX());
		int y = (int) (rect.getY() * scaleY + createFig.getY());
		int width = (int) (rect.getWidth() * scaleX);
		int height = (int) (rect.getHeight() * scaleY);
		g2d.draw(new Rectangle(x, y, width, height));

		int curYImage = (int) (createFig.getY() + line2.getY1() + 3);
		int start = curYImage;

		String typ = "ChiOperation";
		ArrayList<InfoXMLOptionValue> operation = createFig.getOperation();
		if (operation.size() != 0) {
			String imagePath = null;
			ElementDiagram elemOp = ElementDiagram.getCatalogEntryByName(typ);
			imagePath = elemOp.getImage();

			Font b = new Font("Tahoma", Font.PLAIN, 12);
			g2d.setFont(b);
			FontMetrics fm = g2d.getFontMetrics();
			int lineHeight = fm.getHeight();

			int currX = (int) (createFig.getX() + 16);
			int currY = (int) (createFig.getY() + line2.getY1() + 1);
			int currXimage = (int) (createFig.getX() + 1 );
			int currYimage = (int) (createFig.getY() + line2.getY1() + 4);
			int imageWidth = lineHeight;
			int imageHeight = lineHeight;

			for (InfoXMLOptionValue currValue : operation) {

				try {
					BufferedImage img1 = ImageIO.read(new File(imagePath));
					if (img1 != null)
						g2d.drawImage(img1, currXimage, currYimage, imageWidth, imageHeight, null);
				} catch (Exception e) {
					System.out.println(e);
				}
				
				currYimage += lineHeight;

				currX = currX;
				currY += lineHeight;
				g2d.setPaint(Color.black);
				g2d.setFont(b);
				g2d.drawString(currValue.getName(), currX, currY);

			}
		}

	}
	
	protected void drawScaleChiNode(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize figureInfo, InfoLine line1, InfoLine line2, InfoCoordinateSize rect) {

		float scaleY = (createFig.getHeight() / figureInfo.getHeight());
		float scaleX = (createFig.getWidth() / figureInfo.getWidth());
		
//		private InfoLine circleLine = new InfoLine(0, 17, 11, 17)
		
		int x = (int) (rect.getX() * scaleX + createFig.getX());
		int y = (int) (rect.getY() * scaleY + createFig.getY());
		int width = (int) (rect.getWidth() * scaleX);
		int height = (int) (rect.getHeight() * scaleY);
		g2d.draw(new Rectangle(x, y, width, height));
		
		g2d.drawLine(x + width - 19, y + 18, x + width - 8, y + 18);
//		drawScaleXLine(g2d, createFig, figureInfo, lineunder);
		
		int currX = (int) (createFig.getX() + 16);
		int currY = (int) (createFig.getY() + line1.getY1() + 1);
		int currXimage = (int) (createFig.getX() + 1 );
		int currYimage = (int) (createFig.getY() + line1.getY1() + 4);
		int imageWidth = 0;
		int imageHeight = 0;
		int lineHeight = 0;

		int curYImage = (int) (createFig.getY() + line2.getY1() + 3);
		int start = curYImage;

		String typ = "ChiAttribute";
		ArrayList<InfoXMLOptionValue> attribute = createFig.getAttribute();
		if (attribute.size() != 0) {
			String imagePath = null;
			ElementDiagram elemOp = ElementDiagram.getCatalogEntryByName(typ);
			imagePath = elemOp.getImage();

			Font b = new Font("Tahoma", Font.PLAIN, 12);
			g2d.setFont(b);
			FontMetrics fm = g2d.getFontMetrics();
			lineHeight = fm.getHeight();
			
			imageWidth = lineHeight;
			imageHeight = lineHeight;

			for (InfoXMLOptionValue currAttribute : attribute) {

				try {
					BufferedImage img1 = ImageIO.read(new File(imagePath));
					if (img1 != null)
						g2d.drawImage(img1, currXimage, currYimage, imageWidth, imageHeight, null);
				} catch (Exception e) {
					System.out.println(e);
				}
				
				currYimage += lineHeight;

				currY += lineHeight;
				g2d.setPaint(Color.black);
				g2d.setFont(b);
				g2d.drawString(currAttribute.getName(), currX, currY);

			}
			line2.setY1(line2.getY1() + (attribute.size() * lineHeight) - 1);
			line2.setY2(line2.getY2() + (attribute.size() * lineHeight) - 1);
			drawScaleXLine(g2d, createFig, figureInfo, line2);
			
		} else {
			drawScaleXLine(g2d, createFig, figureInfo, line2);
		}
		
		typ = "ChiOperation";
		ArrayList<InfoXMLOptionValue> operation = createFig.getOperation();
		if (operation.size() != 0) {
			String imagePath = null;
			ElementDiagram elemOp = ElementDiagram.getCatalogEntryByName(typ);
			imagePath = elemOp.getImage();

			Font b = new Font("Tahoma", Font.PLAIN, 12);
			g2d.setFont(b);
			FontMetrics fm = g2d.getFontMetrics();
			lineHeight = fm.getHeight();


			currY +=3;
			currYimage += 5;
			imageWidth = lineHeight;
			imageHeight = lineHeight;

			for (InfoXMLOptionValue currOperation : operation) {

				try {
					BufferedImage img1 = ImageIO.read(new File(imagePath));
					if (img1 != null)
						g2d.drawImage(img1, currXimage, currYimage, imageWidth, imageHeight, null);
				} catch (Exception e) {
					System.out.println(e);
				}
				
				currYimage += lineHeight;

				currY += lineHeight;
				g2d.setPaint(Color.black);
				g2d.setFont(b);
				g2d.drawString(currOperation.getName(), currX, currY);
			}
		}
	}


	protected void drawScaleChi(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize figureInfo, InfoCoordinateSize head) {
		float scaleY = (createFig.getHeight() / figureInfo.getHeight());
		float scaleX = (createFig.getWidth() / figureInfo.getWidth());

		int headX = (int) (createFig.getX() + head.getX() * scaleX);
		int headY = (int) (createFig.getY() + head.getY() * scaleY);
		int headWidth = (int) (head.getWidth() * scaleY);
		int headHight = (int) (head.getHeight() * scaleX);

		String imagePath = null;

		ElementDiagram elem = ElementDiagram.getCatalogEntry(createFig.getType());
		imagePath = elem.getImage();

		try {
			BufferedImage img1 = ImageIO.read(new File(imagePath));
			int x = (int) (headX + headHight / 4);
			int y = (int) (headY + headWidth / 4);
			int width = (int) headWidth / 2;
			int hight = (int) headHight / 2;

			if (img1 != null)
				g2d.drawImage(img1, x, y, hight, width, null);
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
				g2d.drawImage(img1, x, y, hight, width, null);
		} catch (Exception e) {
			System.out.println(e);
		}
	}

	protected void drawChiLeft(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize figureInfo, InfoCoordinateSize ellipse, InfoCoordinateSize rect) {
		float scaleX = (createFig.getWidth() / figureInfo.getWidth());

		int headX = (int) (createFig.getX() + rect.getWidth() * scaleX - 20);
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
				g2d.drawImage(img1, x, y, hight, width, null);
		} catch (Exception e) {
			System.out.println(e);
		}
	}

	protected void drawChiRec(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize figureInfo, InfoCoordinateSize rect) {
		float scaleX = (createFig.getWidth() / figureInfo.getWidth());

		int rectX = (int) (createFig.getX() + rect.getX() * scaleX);
		int rectY = (int) (createFig.getY() + rect.getY());
		int rectWidth = (int) (rect.getWidth());
		int rectHight = (int) (rect.getHeight());

		String imagePath = null;

		ElementDiagram elem = ElementDiagram.getCatalogEntry(createFig.getType());
		imagePath = elem.getImage();

		try {
			BufferedImage img1 = ImageIO.read(new File(imagePath));
			int x = (int) (rectX + ((rectWidth - (rectHight / 2)) / 2));
			int y = (int) (rectY);
			int width = (int) (rectHight);
			int hight = (int) (rectHight);

			if (img1 != null)
				g2d.drawImage(img1, x, y, width, hight, null);
		} catch (Exception e) {
			System.out.println(e);
		}
	}
}