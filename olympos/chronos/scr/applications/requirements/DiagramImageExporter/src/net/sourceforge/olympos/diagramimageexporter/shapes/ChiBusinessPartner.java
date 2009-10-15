package net.sourceforge.olympos.diagramimageexporter.shapes;

import java.awt.Font;

import com.sun.org.apache.bcel.internal.generic.NEW;

import net.sourceforge.olympos.diagramimageexporter.FigureDraw;
import net.sourceforge.olympos.diagramimageexporter.InfoFigureParameter;
import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoFont;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;

public class ChiBusinessPartner extends FigureDraw{
	InfoLine body = new InfoLine(12, 15, 12, 33);
	InfoLine leftleg = new InfoLine(12, 33, 3, 47);
	InfoLine rightleg = new InfoLine(12, 33, 21, 47);
	InfoLine arm = new InfoLine(0, 20, 22, 20);
	InfoCoordinateSize head = new InfoCoordinateSize(4, 0, 15, 15);
	InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 48, 20);
	InfoFont chiFont = new InfoFont(0, 0, new Font("Symbol", Font.PLAIN,8), "c");
	
	public ChiBusinessPartner(InfoFigureParameter figure){
		
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
		
		arm.setAll(figure.getX() + arm.getX1() * scaleX, figure.getY() + arm.getY1() * scaleY,figure.getX() +  arm.getX2() * scaleX, figure.getY() + arm.getY2() * scaleY);
		line.add(arm);
		
		chiFont.setAll(figure.getX(), figure.getY(), new Font("Symbol", Font.PLAIN,8), "c");
		font.add(chiFont);		
	}
	
	public InfoLine getbody() {
		return body;
	}
	public InfoLine getLeftLeg() {
		return leftleg;
	}
	public InfoLine getRightLeg() {
		return rightleg;
	}
	public InfoCoordinateSize getHead() {
		return head;
	}
}
