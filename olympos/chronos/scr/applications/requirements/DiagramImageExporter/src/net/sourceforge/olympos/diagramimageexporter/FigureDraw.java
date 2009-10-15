package net.sourceforge.olympos.diagramimageexporter;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.Shape;
import java.awt.geom.Ellipse2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.ArrayList;

import javax.imageio.ImageIO;

public class FigureDraw {
	protected ArrayList<InfoLine> line = new ArrayList<InfoLine>();
	protected ArrayList<InfoCoordinateSize> rec = new ArrayList<InfoCoordinateSize>();
	protected ArrayList<InfoCoordinateSize> ellipse = new ArrayList<InfoCoordinateSize>();
	protected ArrayList<InfoFont> font = new ArrayList<InfoFont>();

	public void addLine(InfoLine currLine) {
		line.add(currLine);
	}

	public void addRec(InfoCoordinateSize currRec) {
		rec.add(currRec);
	}

	public void addEllipse(InfoCoordinateSize currEllipse) {
		ellipse.add(currEllipse);
	}

	public void addFont(InfoFont currFont) {
		font.add(currFont);
	}

	public ArrayList<InfoLine> getLine() {
		return line;
	}

	public ArrayList<InfoCoordinateSize> getRec() {
		return rec;
	}

	public ArrayList<InfoCoordinateSize> getEllipse() {
		return ellipse;
	}

	public ArrayList<InfoFont> getFont() {
		return font;
	}

	public void draw(InfoFigureParameter figureInfo, Graphics2D g2d) {
		
		ElementDiagram elem = new ElementDiagram();
		elem = ElementDiagram.getCatalogEntry(figureInfo.getType());
		String typ =elem.getName();

		FactoryWorker workerFactory = new FactoryWorker();
		FactoryPartner partnerFactory = new FactoryPartner();
		FactoryUseCase useCaseFactory = new FactoryUseCase();
		FactoryRequ requFactory = new FactoryRequ();
		
		Factory factory = new Factory();
		Figure fig = factory.createFigure(typ);
		fig.draw(g2d, figureInfo);

		FigureDraw workerParameter = workerFactory.getWorker(figureInfo,g2d);
		if (workerParameter != null) {
			workerFactory.getWorker(figureInfo,g2d);
			draw(workerParameter, figureInfo, g2d);
		}
		FigureDraw partnerParameter = partnerFactory.getPartner(figureInfo,g2d);
		if (partnerParameter != null) {
			partnerFactory.getPartner(figureInfo,g2d);
			draw(partnerParameter, figureInfo, g2d);
		}
		FigureDraw requParameter = requFactory.getRequ(figureInfo);
		if (requParameter != null) {
			requFactory.getRequ(figureInfo);
			draw(requParameter, figureInfo, g2d);
		}
		FigureDraw useCaseParameter = useCaseFactory.getUseCase(figureInfo);
		if (useCaseParameter != null) {
			useCaseFactory.getUseCase(figureInfo);
			ArrayList<InfoCoordinateSize> ellipses = useCaseParameter.getEllipse();
			InfoCoordinateSize backkgroundEllipse = ellipses.get(0);
			Shape backgEllipse = new Ellipse2D.Double(backkgroundEllipse.getX(), backkgroundEllipse.getY(), backkgroundEllipse.getHeight(), backkgroundEllipse.getWidth());
			g2d.setPaint(Color.gray);
			// g2d.draw(backgEllipse);
			g2d.fill(backgEllipse);

			InfoCoordinateSize ellipse = ellipses.get(1);
			Shape circleBackground = new Ellipse2D.Double(ellipse.getX(), ellipse.getY(), ellipse.getHeight(), ellipse.getWidth());
			g2d.setPaint(Color.white);
			// g2d.draw(circleBackground);
			g2d.fill(circleBackground);
			g2d.setPaint(Color.black);
			g2d.draw(circleBackground);

			ArrayList<InfoLine> lines = useCaseParameter.getLine();
			for (InfoLine currLine : lines) {
				int x21 = (int) currLine.getX1();
				int y21 = (int) currLine.getY1();
				int x22 = (int) currLine.getX2();
				int y22 = (int) currLine.getY2();
				g2d.setPaint(Color.black);
				g2d.drawLine(x21, y21, x22, y22);
			}

		}
	}
	public void drawChi(InfoFigureParameter figure, Graphics2D g2d){
		String imagePath = null;

		ElementDiagram elem = ElementDiagram.getCatalogEntry(figure.getType());
		imagePath = elem.getImage();
		
		try {
			BufferedImage img1 = ImageIO.read(new File(imagePath));
			if (img1 != null)
				g2d.drawImage(img1, (int) (figure.getWidth()  /2 + figure.getX()), (int) figure.getY() + 5, 20, (int) 20, null);
		} catch (Exception e) {
			System.out.println(e);
		}
	}

	private void draw(FigureDraw figureParameter, InfoFigureParameter figure, Graphics2D g2d) {
		ArrayList<InfoLine> lines = figureParameter.getLine();
		ArrayList<InfoCoordinateSize> recs = figureParameter.getRec();
		ArrayList<InfoCoordinateSize> ellipses = figureParameter.getEllipse();
//		ArrayList<InfoFont> fonts = figureParameter.getFont();

		g2d.setStroke(new BasicStroke(1, BasicStroke.CAP_ROUND, BasicStroke.JOIN_MITER));
		g2d.setPaint(Color.black);

		for (InfoCoordinateSize currEllipse : ellipses) {
			Shape ellipse = new Ellipse2D.Double(currEllipse.getX(), currEllipse.getY(), currEllipse.getHeight(), currEllipse.getWidth());
			g2d.setPaint(Color.black);
			g2d.draw(ellipse);
		}

		for (InfoLine currLine : lines) {
			int x11 = (int) currLine.getX1();
			int y11 = (int) currLine.getY1();
			int x12 = (int) currLine.getX2();
			int y12 = (int) currLine.getY2();
			g2d.setPaint(Color.black);
			g2d.drawLine(x11, y11, x12, y12);
		}

		for (InfoCoordinateSize currRec : recs) {
			int recX2 = (int) currRec.getX();
			int recY2 = (int) currRec.getY();
			g2d.setPaint(Color.black);
			g2d.draw(new Rectangle(recX2, recY2, (int) currRec.getWidth(), (int) currRec.getHeight()));
		}

		/*
		for (InfoFont currFont : fonts) {
			g2d.setFont(currFont.getMyFont());
			System.out.println(currFont.getMyFont().getFontName());
			//g2d.drawString("cabcddefgh", currFont.getX1(), currFont.getY1());
			g2d.drawChars(new char[] {(char) 0x63}, 0, 1, (int) currFont.getX1(), (int) currFont.getY1());
		}
		*/
//        Font font;
//		try {
//			font = Font.createFont(Font.TRUETYPE_FONT, new FileInputStream("C:/WINDOWS/Fonts/symbol.ttf"));
//	        font = font.deriveFont(Font.PLAIN, 8);
//
//			System.out.println(font.getFontName());
//			g2d.setFont(font);
//			g2d.drawString(new String(new byte[] {99}, "ascii"), 100, 10);
//		} catch (FileNotFoundException e1) {
//			// TODO Auto-generated catch block
//			e1.printStackTrace();
//		} catch (FontFormatException e1) {
//			// TODO Auto-generated catch block
//			e1.printStackTrace();
//		} catch (IOException e1) {
//			// TODO Auto-generated catch block
//			e1.printStackTrace();
//		}

		if (figure.getType().equals(EnumFigureType.CHI_FEATURE) || figure.getType().equals(EnumFigureType.CHI_GOAL) || figure.getType().equals(EnumFigureType.CHI_ISSUE)
				|| figure.getType().equals(EnumFigureType.CHI_REQUIREMENT)) {
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
}