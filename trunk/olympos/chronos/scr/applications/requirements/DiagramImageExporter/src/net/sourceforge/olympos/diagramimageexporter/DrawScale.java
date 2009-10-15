package net.sourceforge.olympos.diagramimageexporter;

import java.awt.Graphics2D;

public class DrawScale {
	
	public void drawScaleLine(Graphics2D g2d, InfoFigureParameter fig, InfoCoordinateSize info, float x1, float y1, float x2, float y2){
		float scaleY = (fig.getHeight()/info.getHeight());
		float scaleX = (fig.getWidth()/info.getWidth());
		
		int lineX1 = (int) (fig.getX() + x1 * scaleX);
		int lineY1 = (int) (fig.getY() + y1 * scaleY);
		int lineX2 = (int) (fig.getX() + x2 * scaleX);
		int lineY2 = (int) (fig.getY() + x2 * scaleY);
			
		g2d.drawLine( lineX1, lineY1,lineX2, lineY2);
	}
	
	public void drawScaleRec(Graphics2D g2d, InfoFigureParameter fig, InfoCoordinateSize info, float x1, float y1, float width, float height){
		
	}
	
	public void drawScaleEllipse(Graphics2D g2d, InfoFigureParameter fig, InfoCoordinateSize info, float x1, float y1, float width, float height){
		float scaleY = (fig.getHeight()/info.getHeight());
		float scaleX = (fig.getWidth()/info.getWidth());
		
		int x = (int) (((x1 - width +1)/2)* scaleX + fig.getX());
		int y = (int) (((x1 - height +1)/2)* scaleX + fig.getY());
	}
}