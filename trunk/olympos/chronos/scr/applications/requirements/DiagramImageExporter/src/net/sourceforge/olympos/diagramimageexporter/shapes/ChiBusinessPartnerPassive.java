package net.sourceforge.olympos.diagramimageexporter.shapes;

import net.sourceforge.olympos.diagramimageexporter.FigureDraw;
import net.sourceforge.olympos.diagramimageexporter.InfoFigureParameter;
import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;


public class ChiBusinessPartnerPassive extends FigureDraw{
	InfoLine body = new InfoLine(12, 15, 12, 33);
	InfoLine leftleg = new InfoLine(12, 33, 2, 47);
	InfoLine rightleg = new InfoLine(12, 33, 21, 47);
	InfoLine armleft = new InfoLine(0, 28 ,12, 20);
	InfoLine armright = new InfoLine(12, 20, 22, 28);
	InfoCoordinateSize head = new InfoCoordinateSize(4, 0, 15, 15);
	
	InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 45, 20);
	
	public ChiBusinessPartnerPassive(InfoFigureParameter figure){
	
		float scaleY = (figure.getHeight()/figureInfo.getHeight());
		float scaleX = (figure.getWidth()/figureInfo.getWidth());
		
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
		
		armleft.setAll(figure.getX() + armleft.getX1() * scaleX, figure.getY() + armleft.getY1() * scaleY,figure.getX() +  armleft.getX2() * scaleX, figure.getY() + armleft.getY2() * scaleY);
		line.add(armleft);
		
		armright.setAll(figure.getX() + armright.getX1() * scaleX, figure.getY() + armright.getY1() * scaleY,figure.getX() +  armright.getX2() * scaleX, figure.getY() + armright.getY2() * scaleY);
		line.add(armright);
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
	public InfoLine getArmLeft() {
		return armleft;
	}
	public InfoLine getArmRight() {
		return armright;
	}
}
