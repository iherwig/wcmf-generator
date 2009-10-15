package net.sourceforge.olympos.diagramimageexporter.shapes;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.Shape;
import java.awt.geom.Ellipse2D;

import net.sourceforge.olympos.diagramimageexporter.Figure;
import net.sourceforge.olympos.diagramimageexporter.InfoFigureParameter;
import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;



public class ChiWorker extends Figure{
	InfoCoordinateSize elli1 = new InfoCoordinateSize(0, 0, 50, 49);
	InfoCoordinateSize head = new InfoCoordinateSize(18, 6, 12, 12);
	InfoLine body = new InfoLine(24, 18, 24, 31);
	InfoLine leftleg = new InfoLine(24, 31, 17, 42);
	InfoLine rightleg = new InfoLine(24, 31, 31, 42);
	InfoLine arm = new InfoLine(15, 22, 32, 22);
	InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 50, 49);

	
	public ChiWorker(InfoFigureParameter figure) {
		float scaleY = (figure.getHeight()/figureInfo.getHeight());
		float scaleX = (figure.getWidth()/figureInfo.getWidth());
		elli1.setAll(figure.getX(), figure.getY(), elli1.getHeight() * scaleY , elli1.getWidth() * scaleX);
		
		float headX = (body.getX1() - (head.getWidth()+1 ) / 2) * scaleX + figure.getX();
		float headY = body.getY1() - ((head.getHeight()))+ figure.getY();
		head.setAll(headX,headY, head.getHeight() * scaleY, head.getWidth() * scaleX);
	
		body.setAll(figure.getX() + body.getX1() * scaleX,figure.getY() +  body.getY1() * scaleY,figure.getX() +  body.getX2() * scaleX, figure.getY() + body.getY2() * scaleY);

		leftleg.setAll(figure.getX() + leftleg.getX1() * scaleX, figure.getY() + leftleg.getY1() * scaleY,figure.getX() +  leftleg.getX2() * scaleX, figure.getY() + leftleg.getY2() * scaleY);

		rightleg.setAll(figure.getX() + rightleg.getX1() * scaleX, figure.getY() + rightleg.getY1() * scaleY,figure.getX() +  rightleg.getX2() * scaleX, figure.getY() + rightleg.getY2() * scaleY);

		arm.setAll(figure.getX() + arm.getX1() * scaleX, figure.getY() + arm.getY1() * scaleY,figure.getX() +  arm.getX2() * scaleX, figure.getY() + arm.getY2() * scaleY);		
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
		return arm;
	}
	public InfoCoordinateSize getRound() {
		return elli1;
	}
	public InfoCoordinateSize getHead() {
		return head;
	}

	public void setAll(InfoCoordinateSize elli1, InfoCoordinateSize head, InfoLine body, InfoLine leftleg, InfoLine rightleg, InfoLine arm){
		this.elli1 = elli1;
		this.head = head;
		this.body = body;
		this.leftleg = leftleg;
		this.rightleg = rightleg;
		this.arm = arm;
	}



	@Override
	public void draw(Graphics2D g2d, float x, float y, float width, float height, InfoFigureParameter xmlObject) {
		
		g2d.setStroke(new BasicStroke(1, BasicStroke.CAP_ROUND, BasicStroke.JOIN_MITER));
		g2d.setPaint(Color.black);
		
//		g2d.drawRect(x, y, width, height);
//		g2d.drawLine(x1, y1, x2, y2);
//		g2d.dr

			Shape ellipse1 = new Ellipse2D.Double(elli1.getX(), elli1.getY(), elli1.getHeight(), elli1.getWidth());
			g2d.setPaint(Color.black);
			g2d.draw(ellipse1);
			
			Shape ellipse2 = new Ellipse2D.Double(head.getX(), head.getY(), head.getHeight(), head.getWidth());
			g2d.setPaint(Color.black);
			g2d.draw(ellipse2);
			
			int xbody1 = (int) body.getX1();
			int ybody1 = (int) body.getY1();
			int xbody2 = (int) body.getX2();
			int ybody2 = (int) body.getY2();
			g2d.setPaint(Color.black);
			g2d.drawLine(xbody1, ybody1, xbody2, ybody2);
			
			int xleftleg1 = (int) body.getX1();
			int yleftleg1 = (int) body.getY1();
			int xleftleg2 = (int) body.getX2();
			int yleftleg2 = (int) body.getY2();
			g2d.setPaint(Color.black);
			g2d.drawLine(xleftleg1, yleftleg1, xleftleg2, yleftleg2);
			
			int xrightleg1 = (int) body.getX1();
			int yrightleg1 = (int) body.getY1();
			int xrightleg2 = (int) body.getX2();
			int yrightleg2 = (int) body.getY2();
			g2d.setPaint(Color.black);
			g2d.drawLine(xrightleg1, yrightleg1, xrightleg2, yrightleg2);
			
			int xarm1 = (int) body.getX1();
			int yarm1 = (int) body.getY1();
			int xarm2 = (int) body.getX2();
			int yarm2 = (int) body.getY2();
			g2d.setPaint(Color.black);
			g2d.drawLine(xarm1, yarm1, xarm2, yarm2);
		
	}
}
