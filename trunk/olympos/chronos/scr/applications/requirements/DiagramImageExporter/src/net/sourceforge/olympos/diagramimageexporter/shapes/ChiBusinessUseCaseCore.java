package net.sourceforge.olympos.diagramimageexporter.shapes;

import net.sourceforge.olympos.diagramimageexporter.FigureDraw;
import net.sourceforge.olympos.diagramimageexporter.InfoFigureParameter;
import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;

public class ChiBusinessUseCaseCore extends FigureDraw{
	InfoCoordinateSize circle = new InfoCoordinateSize(0, 0, 76, 113);
	InfoCoordinateSize circleBackground = new InfoCoordinateSize(2, 2, 76, 114);
	InfoLine line1 = new InfoLine(60, 76, 104, 58);
	InfoLine line2 = new InfoLine(55, 76, 107, 54);
	
	InfoCoordinateSize figureSize = new InfoCoordinateSize(0, 0, 78, 116);	

	
	public ChiBusinessUseCaseCore(InfoFigureParameter figure){
		float scaleBgY = (circle.getHeight()/(figureSize.getHeight()));
		float scaleBgX = (circle.getWidth()/(figureSize.getWidth()));
		circleBackground.setAll(figure.getX() + circleBackground.getX(), figure.getY() + circleBackground.getY() , circleBackground.getHeight()* scaleBgX, circleBackground.getWidth() * scaleBgY);
		ellipse.add(circleBackground);
		
		float scaleY = (circle.getHeight()/(figureSize.getHeight()));
		float scaleX = (circle.getWidth()/(figureSize.getWidth()));
		circle.setAll(figure.getX() + circle.getX(), figure.getY() + circle.getY(), circle.getHeight()* scaleX, circle.getWidth()* scaleY);
		ellipse.add(circle);
		
		line1.setAll(figure.getX() + line1.getX1() * scaleX , figure.getY() + line1.getY1()* scaleY, figure.getX() + line1.getX2()* scaleX, figure.getY() + line1.getY2()* scaleY);
		line2.setAll(figure.getX() + line2.getX1() * scaleX , figure.getY() + line2.getY1()* scaleY, figure.getX() + line2.getX2()* scaleX, figure.getY() + line2.getY2()* scaleY);
		line.add(line1);
		line.add(line2);
	}
	
	public InfoCoordinateSize getCircle() {
		return circle;
	}
	public InfoCoordinateSize getCircleBackground() {
		return circleBackground;
	}
	public InfoLine getLine1() {
		return line1;
	}
	public InfoLine getLine2() {
		return line2;
	}
}
