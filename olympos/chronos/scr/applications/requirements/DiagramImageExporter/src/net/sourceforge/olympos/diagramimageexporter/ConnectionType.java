package net.sourceforge.olympos.diagramimageexporter;

import java.awt.*;
import java.util.ArrayList;
import java.util.HashMap;

//The end and the start of the Connection will be drawn here
public class ConnectionType {

	public ConnectionType() {
	}

	//getter Setter
	private class ArrowCoordinates {
		int endx1;
		int endy1;
		int endx2;
		int endy2;

		ArrowCoordinates(int x1i, int y1i, int x2i, int y2i) {
			endx1 = x1i;
			endy1 = y1i;
			endx2 = x2i;
			endy2 = y2i;
		}

		public int getEndx1() {
			return endx1;
		}

		public int getEndy1() {
			return endy1;
		}

		public int getEndx2() {
			return endx2;
		}

		public int getEndy2() {
			return endy2;
		}
	}


	//class for the Diamond
	private class DiamandCoordinates {
		
		String sourceFigId;
		String tagretFigId; 
	

		int rightx, righty, middle1x, middle1y, leftx, lefty;// middle2x, middle2y;
		

		//parameter for the diamond
		DiamandCoordinates( int x4, int y4, int x1, int y1, int x2, int y2, int x3, int y3) {
//			middle2x = x4;
//			middle2y = y4;
			rightx = x1;
			righty = y1;
			middle1x = x2;
			middle1y = y2;
			leftx = x3;
			lefty = y3;

		}
	}

	//connection method
	public void connection(Graphics2D g2d, FigureParameter source, FigureParameter target, InfoCoordinate toPoint, EnumDirection toDirection,
			InfoCoordinate fromPoint, EnumDirection fromDirection) {

		//define how the line will looks like
		Stroke stroke = new BasicStroke(1, BasicStroke.CAP_BUTT, BasicStroke.JOIN_BEVEL, 0);
		g2d.setStroke(stroke);

		//get the Type of the source, llok if this is in the  hashtable and save it in elem
		ElementDiagram elem = ElementDiagram.getCatalogEntry(source.getType());
		HashMap<EnumFigureType, InfoAllowedConnection> alllowedConnection = elem.getAllowedConnection();
		InfoAllowedConnection connection = alllowedConnection.get(target.getType());

		//if the connection type exist draw the connections
		if (connection != null) {
			drawConnectionEnd(g2d, fromDirection, toPoint, connection.sourceConnectionArrow);
			drawConnectionEnd(g2d, toDirection, fromPoint, connection.targetConnectionArrow);
		}
	}

	//draw the connection
	private void drawConnectionEnd(Graphics2D g2d, EnumDirection toDirection, InfoCoordinate fromPoint, EnumConnectionEnd end) {
		//look for the end and open the Method to which it belongs
		switch (end) {
		case ARROW_TRIANGLE:
			drawArrowTriangle(g2d, toDirection, fromPoint);
			break;

		case ARROW:
			drawArrow(g2d, toDirection, fromPoint);
			break;

		case CLOSED_DIAMOND:
			drawClosedDiamond(g2d, toDirection, fromPoint);
			break;
			
		case OPEN_DIAMAND:
			drawOpenDiamond(g2d, toDirection, fromPoint);
			break;

		}
	}

	//draw closed diamond
	private void drawClosedDiamond(Graphics2D g2d, EnumDirection toDirection, InfoCoordinate toPoint) {
		//create a new hashtable for the four directions and give them the right parameter
		HashMap<EnumDirection, DiamandCoordinates> pointsDiamand = new HashMap<EnumDirection, DiamandCoordinates>();
		pointsDiamand.put(EnumDirection.RIGHT, new DiamandCoordinates(0,0,-12, -8, -24, 0, -12, 8));
		pointsDiamand.put(EnumDirection.LEFT, new DiamandCoordinates(0,0,12, 8, 24, 0, 12, -8));
		pointsDiamand.put(EnumDirection.DOWN, new DiamandCoordinates(0,0,8, -12, 0, -24, -8, -12));
		pointsDiamand.put(EnumDirection.UP, new DiamandCoordinates(0,0,8, 12, 0, 24, -8, 12));

		//select the parameter of the used direction
		DiamandCoordinates selectedPointDiamand = pointsDiamand.get(toDirection);
//		InfoCoordinate xy6 = new InfoCoordinate(selectedPointDiamand.middle2x, selectedPointDiamand.middle2y);
		InfoCoordinate xy3 = new InfoCoordinate(selectedPointDiamand.leftx, selectedPointDiamand.lefty);
		InfoCoordinate xy4 = new InfoCoordinate(selectedPointDiamand.middle1x, selectedPointDiamand.middle1y);
		InfoCoordinate xy5 = new InfoCoordinate(selectedPointDiamand.rightx, selectedPointDiamand.righty);

		g2d.setColor(Color.black);
		//create the polygon in color black
		Polygon polygon = new Polygon();
		polygon.addPoint((int) toPoint.getX(), (int) toPoint.getY());
		polygon.addPoint((int) toPoint.getX() + (int) xy3.getX(), (int) toPoint.getY() + (int) xy3.getY());
		polygon.addPoint((int) toPoint.getX() + (int) xy4.getX(), (int) toPoint.getY() + (int) xy4.getY());
		polygon.addPoint((int) toPoint.getX() + (int) xy5.getX(), (int) toPoint.getY() + (int) xy5.getY());
		g2d.fillPolygon(polygon);
	}

	//draw the Arrow
	private void drawArrow(Graphics2D g2d, EnumDirection toDirection, InfoCoordinate fromPoint) {
		//create a new hashtable for the four directions and give them the right parameter
		HashMap<EnumDirection, ArrowCoordinates> points = new HashMap<EnumDirection, ArrowCoordinates>();
		points.put(EnumDirection.RIGHT, new ArrowCoordinates(-12, 8, -12, -8));
		points.put(EnumDirection.LEFT, new ArrowCoordinates(12, -8, 12, 8));
		points.put(EnumDirection.DOWN, new ArrowCoordinates(-8, -12, 8, -12));
		points.put(EnumDirection.UP, new ArrowCoordinates(-8, 12, 8, 12));

		//select the parameter of the used direction
		ArrowCoordinates selectedPoint = points.get(toDirection);
		InfoCoordinate xy1 = new InfoCoordinate(selectedPoint.endx1, selectedPoint.endy1);
		InfoCoordinate xy2 = new InfoCoordinate(selectedPoint.endx2, selectedPoint.endy2);
		InfoCoordinate yx0 = new InfoCoordinate((int) fromPoint.getX(), (int) fromPoint.getY());
		InfoCoordinate yx1 = new InfoCoordinate((int) fromPoint.getX() + xy1.getX(), (int) fromPoint.getY() + xy1.getY());
		InfoCoordinate yx2 = new InfoCoordinate((int) fromPoint.getX() + xy2.getX(), (int) fromPoint.getY() + xy2.getY());
		g2d.setColor(Color.black);
		
		//create the arrow
		g2d.drawLine((int) yx1.getX(), (int) yx1.getY(), (int) yx0.getX(), (int) yx0.getY());
		g2d.drawLine((int) yx2.getX(), (int) yx2.getY(), (int) yx0.getX(), (int) yx0.getY());
	}

	private void drawArrowTriangle(Graphics2D g2d, EnumDirection toDirection, InfoCoordinate fromPoint) {
		//create a new hashtable for the four directions and give them the right parameter
		HashMap<EnumDirection, ArrowCoordinates> points = new HashMap<EnumDirection, ArrowCoordinates>();
		points.put(EnumDirection.RIGHT, new ArrowCoordinates(-12, -8, -12, 8));
		points.put(EnumDirection.LEFT, new ArrowCoordinates(12, 8, 12, -8));
		points.put(EnumDirection.DOWN, new ArrowCoordinates(-8, -12, 8, -12));
		points.put(EnumDirection.UP, new ArrowCoordinates(-8, 12, 8, 12));
		
		//select the parameter of the used direction
		ArrowCoordinates selectedPoint = points.get(toDirection);
		InfoCoordinate xy1 = new InfoCoordinate(selectedPoint.getEndx1(), selectedPoint.getEndy1());
		InfoCoordinate xy2 = new InfoCoordinate(selectedPoint.getEndx2(), selectedPoint.getEndy2());

		//create the closed ArrowTriangle
		g2d.setColor(Color.black);
		Polygon polygon = new Polygon();
		polygon.addPoint((int) fromPoint.getX(), (int) fromPoint.getY());
		polygon.addPoint((int) fromPoint.getX() + (int) xy1.getX(), (int) fromPoint.getY() + (int) xy1.getY());
		polygon.addPoint((int) fromPoint.getX() + (int) xy2.getX(), (int) fromPoint.getY() + (int) xy2.getY());
		polygon.addPoint((int) fromPoint.getX(), (int) fromPoint.getY());
		g2d.drawPolygon(polygon);	

		//fill the ArrowTriangle with with
		g2d.setColor(Color.white);
		polygon.addPoint((int) fromPoint.getX() - 1, (int) fromPoint.getY() - 1);
		polygon.addPoint((int) fromPoint.getX() + (int) xy2.getX() + 2, (int) fromPoint.getY() + (int) xy2.getY() - 2);
		polygon.addPoint((int) fromPoint.getX() - 1, (int) fromPoint.getY() - 1);
		g2d.fillPolygon(polygon);
	}
	private void drawOpenDiamond(Graphics2D g2d, EnumDirection toDirection, InfoCoordinate toPoint) {
		//create a new hashtable for the four directions and give them the right parameter
		HashMap<EnumDirection, DiamandCoordinates> pointsDiamand = new HashMap<EnumDirection, DiamandCoordinates>();
		pointsDiamand.put(EnumDirection.RIGHT, new DiamandCoordinates(0,0,-12, -8, -24, 0, -12, 8));
		pointsDiamand.put(EnumDirection.LEFT, new DiamandCoordinates(0,0,12, 8, 24, 0, 12, -8));
		pointsDiamand.put(EnumDirection.DOWN, new DiamandCoordinates(0,0,8, -12, 0, -24, -8, -12));
		pointsDiamand.put(EnumDirection.UP, new DiamandCoordinates(0,0,8, 12, 0, 24, -8, 12));

		//select the parameter of the used direction
		DiamandCoordinates selectedPointDiamand = pointsDiamand.get(toDirection);
//		InfoCoordinate xy6 = new InfoCoordinate(selectedPointDiamand.middle2x, selectedPointDiamand.middle2y);
		InfoCoordinate xy3 = new InfoCoordinate(selectedPointDiamand.leftx, selectedPointDiamand.lefty);
		InfoCoordinate xy4 = new InfoCoordinate(selectedPointDiamand.middle1x, selectedPointDiamand.middle1y);
		InfoCoordinate xy5 = new InfoCoordinate(selectedPointDiamand.rightx, selectedPointDiamand.righty);

		//create the closed diamond
		g2d.setColor(Color.black);
		Polygon polygon = new Polygon();
		polygon.addPoint((int) toPoint.getX(), (int) toPoint.getY());
		polygon.addPoint((int) toPoint.getX() + (int) xy3.getX(), (int) toPoint.getY() + (int) xy3.getY());
		polygon.addPoint((int) toPoint.getX() + (int) xy4.getX(), (int) toPoint.getY() + (int) xy4.getY());
		polygon.addPoint((int) toPoint.getX() + (int) xy5.getX(), (int) toPoint.getY() + (int) xy5.getY());	
		g2d.drawPolygon(polygon);

		//fill the Diamond with with
		g2d.setColor(Color.white);
		g2d.fillPolygon(polygon);
	}
}