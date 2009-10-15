package net.sourceforge.olympos.diagramimageexporter.shapes;

import net.sourceforge.olympos.diagramimageexporter.FigureDraw;
import net.sourceforge.olympos.diagramimageexporter.InfoFigureParameter;
import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;

public class ChiWorkerInternal extends FigureDraw{
	InfoCoordinateSize elli1 = new InfoCoordinateSize(0, 3, 47, 46);
	InfoCoordinateSize head = new InfoCoordinateSize(17, 9, 11, 11);
	InfoLine body = new InfoLine(23, 20, 23, 33);
	InfoLine leftleg = new InfoLine(23, 33, 17, 42);
	InfoLine rightleg = new InfoLine(23, 33, 29, 42);
	InfoLine arm = new InfoLine(14, 23, 31, 23);
	InfoLine arrow1 = new InfoLine(23, 3, 26, 0);
	InfoLine arrow2 = new InfoLine(23, 3, 26, 6);
	InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 49, 47);

	
	public ChiWorkerInternal(InfoFigureParameter figure){
		float scaleY = (figure.getHeight()/figureInfo.getHeight());
		float scaleX = (figure.getWidth()/figureInfo.getWidth());
		
		elli1.setAll(figure.getX(), figure.getY() + (elli1.getY() * scaleY), elli1.getHeight() * scaleY , elli1.getWidth() * scaleX);
		ellipse.add(elli1);
		
		float headX = (body.getX1() - (head.getWidth()+1 ) / 2) * scaleX + figure.getX();
		float headY = (body.getY1() - (head.getHeight()))* scaleY+ figure.getY();
		head.setAll(headX,headY, head.getHeight() * scaleY, head.getWidth() * scaleX);
		ellipse.add(head);
		
		body.setAll(figure.getX() + body.getX1() * scaleX,figure.getY() +  body.getY1() * scaleY,figure.getX() +  body.getX2() * scaleX, figure.getY() + body.getY2() * scaleY);
		line.add(body);

		leftleg.setAll(figure.getX() + leftleg.getX1() * scaleX, figure.getY() + leftleg.getY1() * scaleY,figure.getX() +  leftleg.getX2() * scaleX, figure.getY() + leftleg.getY2() * scaleY);
		line.add(leftleg);
		
		rightleg.setAll(figure.getX() + rightleg.getX1() * scaleX, figure.getY() + rightleg.getY1() * scaleY,figure.getX() +  rightleg.getX2() * scaleX, figure.getY() + rightleg.getY2() * scaleY);
		line.add(rightleg);
		
		arm.setAll(figure.getX() + arm.getX1() * scaleX, figure.getY() + arm.getY1() * scaleY,figure.getX() +  arm.getX2() * scaleX, figure.getY() + arm.getY2() * scaleY);
		line.add(arm);
		
		arrow1.setAll(figure.getX() + arrow1.getX1() * scaleX, figure.getY() + arrow1.getY1() * scaleY,figure.getX() +  arrow1.getX2() * scaleX, figure.getY() + arrow1.getY2() * scaleY);
		line.add(arrow1);
		
		arrow2.setAll(figure.getX() + arrow2.getX1() * scaleX, figure.getY() + arrow2.getY1() * scaleY,figure.getX() +  arrow2.getX2() * scaleX, figure.getY() + arrow2.getY2() * scaleY);
		line.add(arrow2);
	}
	
	public InfoLine getLeftleg() {
		return leftleg;
	}
	public InfoLine getRightleg() {
		return rightleg;
	}
	public InfoCoordinateSize getElli1() {
		return elli1;
	}
	public InfoLine getBody() {
		return body;
	}
	public InfoLine getLeftLeg() {
		return leftleg;
	}
	public InfoLine getRightLeg() {
		return rightleg;
	}
	public InfoLine getArrow1() {
		return arrow1;
	}
	public InfoLine getArrow2() {
		return arrow2;
	}
	public InfoCoordinateSize getRound() {
		return elli1;
	}
	public InfoCoordinateSize getHead() {
		return head;
	}
}
