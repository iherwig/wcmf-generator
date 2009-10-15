package net.sourceforge.olympos.diagramimageexporter.shapes;

import net.sourceforge.olympos.diagramimageexporter.FigureDraw;
import net.sourceforge.olympos.diagramimageexporter.InfoFigureParameter;
import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;


public class ChiRequirement extends FigureDraw{
	InfoCoordinateSize rect1 = new InfoCoordinateSize(0, 0, 50 , 150);
	InfoLine infLine1 = new InfoLine(10, 0, 10, 50);
	InfoLine infLine2 = new InfoLine(15, 0, 15, 50);
	
	public ChiRequirement(InfoFigureParameter figure){
		
		float scaleY = (figure.getHeight()/rect1.getHeight());
		float scaleX = (figure.getWidth()/rect1.getWidth());
		rect1.setAll(figure.getX() , figure.getY(), rect1.getWidth()* scaleX, rect1.getHeight()* scaleY);
		rec.add(rect1);

		infLine1.setAll(figure.getX() + infLine1.getX1()*scaleX, figure.getY() + infLine1.getY1()*scaleY, figure.getX() + infLine1.getX2()*scaleX, figure.getY() + infLine1.getY2()*scaleY);
		line.add(infLine1);
		infLine2.setAll(figure.getX() + infLine2.getX1()*scaleX, figure.getY() + infLine2.getY1()*scaleY, figure.getX() + infLine2.getX2()*scaleX, figure.getY() + infLine2.getY2()*scaleY);
		line.add(infLine2);
	}
	
	public InfoCoordinateSize getRect1() {
		return rect1;
	}
	public InfoLine getInfLine1() {
		return infLine1;
	}
	public InfoLine getInfLine2() {
		return infLine2;
	}
}
