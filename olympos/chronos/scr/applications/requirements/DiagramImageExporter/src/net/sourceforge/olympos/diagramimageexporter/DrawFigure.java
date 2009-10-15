package net.sourceforge.olympos.diagramimageexporter;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.awt.geom.Rectangle2D;

public class DrawFigure {
	public void drawLabeledSimpleFigure(Graphics2D g2d, InfoFigureParameter figure) {
		FigureDraw drawFig = new FigureDraw();
		drawFig.draw(figure, g2d);
		//this.drawSimpleFigure(g2d, figure);
		this.drawLabel(g2d, figure);

	}

	public void drawSimpleFigure(Graphics2D g2d, InfoFigureParameter figure) {
		
		ElementDiagram elem = new ElementDiagram();
		elem = ElementDiagram.getCatalogEntry(figure.getType());
		String imagePath = elem.getImage();
		String typ =elem.getName();
		
		
		g2d.setStroke(new BasicStroke(1, BasicStroke.CAP_ROUND, BasicStroke.JOIN_MITER));
		g2d.setPaint(Color.black);
		
	}

	private void drawLabel(Graphics2D g2d, InfoFigureParameter figure) {

		ElementDiagram elm = new ElementDiagram();
		elm = ElementDiagram.getCatalogEntry(figure.getType());
		EnumFontPosition pos = elm.getFontPosition();

		if (pos.equals(EnumFontPosition.UNDER)) {
			
			Font calledElement = new Font("tahoma", Font.PLAIN, 12);
			g2d.setFont(calledElement);

			int mX = (int) figure.getX() + (int) (figure.getWidth() / 2);
			int mY = ((int) figure.getY() + (int) figure.getHeight());

			FontMetrics fm = g2d.getFontMetrics();

			int i = 0;
			int lineHeight = fm.getHeight() + 3;
			String comment = figure.getLabel();
			String[] words = comment.split(" ");
			int curX = mX;
			int curY = mY; // -((fm.getHeight()*words.length)/2)-(fm.getHeight()/2);
			int boxHeight = fm.getHeight() * words.length + 7;
			int y = mY;

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

		if (pos.equals(EnumFontPosition.IN_UP)) {
			
			
//			Rectangle2D getStringBounds 

//			g2d.drawString(figure.getLabel(), figure.getX(), figure.getY());
//			FontMetrics fm = g2d.getFontMetrics();
//			g2d.fillRect(figure.getX(), figure.getY(),fm.stringWidth(figure.getLabel()), figure.getWidth() -20, figure.getHeight());
			
			
//			public void drawUnderlinedString( Graphics g, int x, int y, String s ) 
//			{ 
//			  g.drawString( s, x, y ); 			 
//			  FontMetrics fm = g.getFontMetrics(); 
//			  LineMetrics lm = fm.getLineMetrics( s, g ); 			 
//			  g.fillRect( x, y + (int) lm.getUnderlineOffset(), 
//			              fm.stringWidth(s), (int) lm.getUnderlineThickness() ); 
//			}
		}

		else if (pos.equals(EnumFontPosition.IN_UP)) {
			
			g2d.drawString(figure.getLabel(), (int) figure.getX() + 20, (int) figure.getY() + 20);
		}

	}
}