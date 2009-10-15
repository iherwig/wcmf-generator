package net.sourceforge.olympos.diagramimageexporter.shapes;

import net.sourceforge.olympos.diagramimageexporter.FigureDraw;
import net.sourceforge.olympos.diagramimageexporter.InfoFigureParameter;
import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;

public class ChiWorkerExtern extends FigureDraw{
	
	InfoLine body = new InfoLine(26, 18, 26, 30);
	InfoLine leftleg = new InfoLine(26, 30, 18, 41);
	InfoLine rightleg = new InfoLine(26, 30, 34, 41);
	InfoLine arm = new InfoLine(19, 21, 34, 21);
	InfoLine lineLeft = new InfoLine(0, 0, 0, 45);
	InfoCoordinateSize elli1 = new InfoCoordinateSize(2, 0, 48, 48);
	InfoCoordinateSize head = new InfoCoordinateSize(20, 6, 12, 12);
	InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 48, 48);
	
	public ChiWorkerExtern(InfoFigureParameter figure){
		float scaleY = (figure.getHeight()/figureInfo.getHeight());
		float scaleX = (figure.getWidth()/figureInfo.getWidth());
		elli1.setAll(figure.getX(), figure.getY(), elli1.getHeight() * scaleY , elli1.getWidth() * scaleX);
		ellipse.add(elli1);
		
		float headX = (body.getX1() - (head.getWidth()+1 ) / 2) * scaleX + figure.getX();
		float headY = body.getY1() - ((head.getHeight()))+ figure.getY();
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
		
		lineLeft.setAll(figure.getX(), figure.getY() + lineLeft.getY1() * scaleY,figure.getX(), figure.getY() + lineLeft.getY2() * scaleY);
		line.add(lineLeft);
	}
	
	public InfoLine getBody() {
		return body;
	}
	public InfoLine getArmLeft() {
		return arm;
	}
	public InfoLine getLineLeft() {
		return lineLeft;
	}
	public InfoCoordinateSize getRound() {
		return elli1;
	}
	public InfoCoordinateSize getHead() {
		return head;
	}
	public InfoLine getLeftleg() {
		return leftleg;
	}
	public InfoLine getRightleg() {
		return rightleg;
	}
	public InfoLine getArm() {
		return arm;
	}
	public InfoCoordinateSize getElli1() {
		return elli1;
	}
}
