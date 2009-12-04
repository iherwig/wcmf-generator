package net.sourceforge.olympos.diagramimageexporter;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;

import javax.imageio.ImageIO;
import javax.swing.JTextArea;

import org.apache.batik.svggen.SVGGraphics2D;

@SuppressWarnings("serial")
public abstract class RequirementFigure extends Figure {
	private InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 150, 50);
	private InfoCoordinateSize rect1 = new InfoCoordinateSize(0, 0, 150, 50);
	private InfoLine infLine1 = new InfoLine(10, 0, 10, 50);
	private InfoLine infLine2 = new InfoLine(15, 0, 15, 50);

	protected void drawScaleRec(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize figureInfo, InfoCoordinateSize rec) {
		float scaleY = (createFig.getHeight() / figureInfo.getHeight());
		float scaleX = (createFig.getWidth() / figureInfo.getWidth());

		int x = (int) (rec.getX() * scaleX + createFig.getX());
		int y = (int) (rec.getY() * scaleY + createFig.getY());
		int width = (int) (rec.getWidth() * scaleX);
		int height = (int) (rec.getHeight() * scaleY);
		g2d.setPaint(Color.black);
		g2d.draw(new Rectangle(x, y, width, height));
		g2d.setPaint(Color.white);
		g2d.fill(new Rectangle(x + 1, y + 1, width - 1, height - 1));
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

	protected void drawRequLabel(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize figureInfo2, InfoCoordinateSize rect, InfoLine line) {
		float scaleY = (createFig.getHeight() / figureInfo.getHeight());
		float scaleX = (createFig.getWidth() / figureInfo.getWidth());

		int x = (int) (createFig.getX() + line.getX2() * scaleX + 5);
		int y = (int) (createFig.getY() + 5);
		int width = (int) ((rect.getWidth() * scaleX) - (line.getX2() * scaleX) - 6);// -25);
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

	@Override
	public void draw(Graphics2D g2d, InfoFigureParameter createFig, ArrayList<InfoFigureParameter> Children, SVGGenerator svg, ArrayList<String> existLine) {

		drawScaleRec(g2d, createFig, figureInfo, rect1);

		drawScaleLine(g2d, createFig, figureInfo, infLine1);
		drawScaleLine(g2d, createFig, figureInfo, infLine2);

		drawRequLabel(g2d, createFig, figureInfo, rect1, infLine2);

		drawImg(g2d, createFig);

		for (InfoFigureParameter currChild : Children) {
			ElementDiagram elem = ElementDiagram.getCatalogEntry(createFig.getType());
			HashMap<EnumFigureType, InfoAllowedConnection> figAllowedCatal1 = elem.getAllowedConnection();
			InfoAllowedConnection allowedConnection = null;
			allowedConnection = figAllowedCatal1.get(currChild.getType());

			String key = currChild.getFigureId() + createFig.getFigureId();
			if (allowedConnection != null && !existLine.contains(key) ) {

				String comment = allowedConnection.getLineLabel();
				drawCon.drawConnection(g2d, createFig, currChild, comment, allowedConnection.getSourceConnectionArrow(), allowedConnection.getTargetConnectionArrow(), svg);
				existLine.add(key);
			}
		}
	}
}
