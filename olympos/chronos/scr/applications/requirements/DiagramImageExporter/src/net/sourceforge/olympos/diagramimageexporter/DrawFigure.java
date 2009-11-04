package net.sourceforge.olympos.diagramimageexporter;

import java.awt.Graphics2D;

public class DrawFigure {
	public void drawLabeledSimpleFigure(Graphics2D g2d, InfoFigureParameter figureInfo) {		
		Factory factory = new Factory();
		Figure fig = factory.createFigure( figureInfo);
		if(fig != null)
		fig.draw(g2d, figureInfo);
//		this.drawLabel(g2d, figureInfo);
	}

//	private void drawLabel(Graphics2D g2d, InfoFigureParameter figure) {
//
//		ElementDiagram elm = new ElementDiagram();
//		elm = ElementDiagram.getCatalogEntry(figure.getType());
//		EnumFontPosition pos = elm.getFontPosition();
//
//		if (pos.equals(EnumFontPosition.UNDER)) {
//			
//			Font calledElement=new Font("tahoma", Font.PLAIN, 12);		
//			g2d.setFont(calledElement);
//
//			int mX = (int) figure.getX() + (int) (figure.getWidth() / 2);
//			int mY = ((int) figure.getY() + (int) figure.getHeight());
//
//			FontMetrics fm = g2d.getFontMetrics();
//
//			int i = 0;
//			int lineHeight = fm.getHeight() + 3;
//			String comment = figure.getLabel();
//			String[] words = comment.split(" ");
//			int curX = mX;
//			int curY = mY;
//
//			for (String word : words) {
//				int wordWidth = fm.stringWidth(word + " ");
//
//				curY += lineHeight;
//				curX = (int) mX;
//				i++;
//				g2d.setPaint(Color.black);
//				int boxWidth = fm.stringWidth(word + " ") + 10;
//				g2d.drawString(word, curX - (boxWidth / 2), curY);
//				curX += wordWidth;
//			}
//		}
//	}
}