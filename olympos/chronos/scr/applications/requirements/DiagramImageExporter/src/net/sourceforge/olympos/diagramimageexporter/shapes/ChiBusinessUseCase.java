package net.sourceforge.olympos.diagramimageexporter.shapes;

import net.sourceforge.olympos.diagramimageexporter.FigureDraw;
import net.sourceforge.olympos.diagramimageexporter.InfoFigureParameter;
import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;



public class ChiBusinessUseCase extends FigureDraw{

	InfoCoordinateSize circle = new InfoCoordinateSize(0, 0, 76, 114);
	InfoCoordinateSize circleBackground = new InfoCoordinateSize(2, 2, 76, 115);
	InfoLine line1 = new InfoLine(60, 76, 105, 58);
	
	InfoCoordinateSize figureSize = new InfoCoordinateSize(0, 0, 78, 117);

	public ChiBusinessUseCase(InfoFigureParameter figure){
		float scaleY = (figure.getHeight()/(figureSize.getHeight()));
		float scaleX = (figure.getWidth()/(figureSize.getWidth()));
		circleBackground.setAll(figure.getX() + circleBackground.getX(), figure.getY() + circleBackground.getY() , circleBackground.getHeight()* scaleX, circleBackground.getWidth() * scaleY);
		ellipse.add(circleBackground);
		circle.setAll(figure.getX() + circle.getX(), figure.getY() + circle.getY(), circle.getHeight()* scaleX, circle.getWidth()* scaleY);
		ellipse.add(circle);
		
		line1.setAll(figure.getX() + line1.getX1() * scaleX , figure.getY() + line1.getY1()* scaleY, figure.getX() + line1.getX2()* scaleX, figure.getY() + line1.getY2()* scaleY);
		line.add(line1);
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
}
