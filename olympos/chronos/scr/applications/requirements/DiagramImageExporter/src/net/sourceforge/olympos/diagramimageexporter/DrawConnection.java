package net.sourceforge.olympos.diagramimageexporter;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.Stroke;
import java.util.ArrayList;

public class DrawConnection {

	double TOL = 0.1;
	double TOLxTOL = 0.01;
	int MINDIST = 20;

	public void drawConnection(Graphics2D g2d, InfoFigureParameter source, InfoFigureParameter target, String comment, EnumConnectionEnd sourceEnd, EnumConnectionEnd targetEnd, SVGGenerator svg) {

		EnumDirection fromDirection, toDirection;

		InfoFigureParameter sourceBox = new InfoFigureParameter(source.getX(), source.getY(), source.getWidth(), source.getHeight(), source.getType(), source.getLabel(), source.getFigureId(), source
				.getAlias(), source.getObjectStatus());
		sourceBox = source;
		InfoCoordinate sourceCenter;
		sourceCenter = getCenter(sourceBox);

		InfoFigureParameter targetBox = new InfoFigureParameter(target.getX(), target.getY(), target.getWidth(), target.getHeight(), target.getType(), target.getLabel(), target.getFigureId(), target
				.getAlias(), target.getObjectStatus());
		InfoCoordinate targetCenter;
		targetCenter = getCenter(targetBox);

		InfoCoordinate fromPoint = new InfoCoordinate(0, 0);
		fromPoint = chopboxConnectionAnchor(sourceBox, targetCenter);

		InfoCoordinate toPoint = new InfoCoordinate(0, 0);
		toPoint = chopboxConnectionAnchor(targetBox, sourceCenter);

		fromDirection = getDirection(sourceBox, fromPoint);
		toDirection = getDirection(targetBox, toPoint);

		ArrayList<InfoCoordinate> points = new ArrayList<InfoCoordinate>();

		points = drawManhattonConnection(points, toPoint, toDirection, fromPoint, fromDirection);

		InfoCoordinate lastPoint = null;

		ArrayList<InfoConnectionExist> ConExist = new ArrayList<InfoConnectionExist>();

		boolean exist = false;
		InfoConnectionExist conEx = new InfoConnectionExist(source, target);
		ConExist = svg.getConnectionExist();
		
		for (InfoConnectionExist currCon : ConExist) {
			InfoFigureParameter sourceFig = currCon.getFigSource();
			String sourceLabel = sourceFig.getLabel();
			String sourcealias = sourceFig.getAlias();
			InfoFigureParameter targetFig = currCon.getFigTarget();
			String targetalias = targetFig.getAlias();
			String targetLabel = targetFig.getLabel();
			if (targetalias == source.alias && sourcealias == target.alias
					&& targetLabel == source.getLabel() && sourceLabel == target.getLabel()
					) {
				exist = true;
			}
		}
		if (exist == false) {

			for (InfoCoordinate curPoint : points) {
				if (lastPoint != null) {
					g2d.setColor(Color.black);
					Stroke stroke = new BasicStroke(2, BasicStroke.CAP_BUTT, BasicStroke.JOIN_BEVEL, 1, new float[] { 2 }, 0);
					g2d.setStroke(stroke);

					g2d.drawLine((int) lastPoint.getX(), (int) lastPoint.getY(), (int) curPoint.getX(), (int) curPoint.getY());
				}
				lastPoint = curPoint;
			}
			svg.addConnectionExist(conEx);
		}
		drawLabel(g2d, source, target, toPoint, toDirection, fromPoint, fromDirection, points, comment);
		DrawConnectionType connec = new DrawConnectionType();
		connec.connection(g2d, source, target, toPoint, toDirection, fromPoint, fromDirection, sourceEnd, targetEnd);

	}

	private InfoCoordinate getCenter(InfoFigureParameter figure) {
		InfoCoordinate pos = new InfoCoordinate(0, 0);
		pos.setAll(figure.getX() + (Math.abs(figure.getWidth() / 2)), figure.getY() + Math.abs(figure.getHeight() / 2));
		return pos;
	}

	private EnumDirection getDirection(InfoFigureParameter r, InfoCoordinate p) {
		float distance = 0;
		float i = 0;
		EnumDirection d;
		distance = Math.abs(r.getX() - p.getX());
		d = EnumDirection.LEFT;

		i = Math.abs(r.getY() - p.getY());
		if (i <= distance) {
			distance = i;
			d = EnumDirection.UP;
		}

		i = Math.abs(r.getY() + r.getHeight() - p.getY());
		if (i <= distance) {
			distance = i;

			d = EnumDirection.DOWN;
		}

		i = Math.abs(r.getX() + r.getWidth() - p.getX());
		if (i < distance) {
			distance = i;
			d = EnumDirection.RIGHT;
		}
		return d;
	}

	InfoCoordinate getManhattanMidpoint(ArrayList<InfoCoordinate> points) {
		int index = 0;
		InfoCoordinate p1 = new InfoCoordinate(0, 0);
		InfoCoordinate p2 = new InfoCoordinate(0, 0);

		index = (int) Math.floor((points.size() - 2) / 2);
		p1 = points.get(index);
		p2 = points.get(index + 1);

		InfoCoordinate back = new InfoCoordinate((p2.getX() - p1.getX()) / 2 + p1.getX() + 5, (p2.getY() - p1.getY()) / 2 + p1.getY() + 5);

		return back;
	}

	private InfoCoordinate chopboxConnectionAnchor(InfoFigureParameter RealSource, InfoCoordinate target) {

		InfoCoordinateSize source = new InfoCoordinateSize(RealSource.getX() - 1, RealSource.getY() - 1, RealSource.getWidth() + 1, RealSource.getHeight() + 1);
		double scale = 0;

		InfoCoordinate center = new InfoCoordinate(source.getX() + source.getWidth() / 2, source.getY() + (source.getHeight() / 2));
		InfoCoordinate d = new InfoCoordinate(target.getX() - center.getX(), target.getY() - center.getY());
		scale = (0.5 / Math.max(Math.abs(d.getX() / source.getWidth()), Math.abs(d.getY() / source.getHeight())));

		d.setAll((float) (d.getX() * scale), (float) (d.getY() * scale));
		center.setAll(center.getX() + d.getX(), center.getY() + d.getY());

		InfoCoordinate back = new InfoCoordinate(Math.round(center.getX()), Math.round(center.getY()));

		return back;
	}

	private ArrayList<InfoCoordinate> drawManhattonConnection(ArrayList<InfoCoordinate> points, InfoCoordinate fromPt, EnumDirection fromDir, InfoCoordinate toPt, EnumDirection toDir) {

		float pos = 0;
		InfoCoordinate Diff = new InfoCoordinate(fromPt.getX() - toPt.getX(), fromPt.getY() - toPt.getY());

		InfoCoordinate point = new InfoCoordinate(0, 0);
		EnumDirection dir = null;

		if (((Diff.getX() * Diff.getX()) < this.TOLxTOL) && ((Diff.getY() * Diff.getY()) < this.TOLxTOL)) {
			points.add(toPt);
			return points;
		}

		if (fromDir == EnumDirection.LEFT) {
			if ((Diff.getX() > 0) && ((Diff.getY() * Diff.getY()) < this.TOL) && (toDir == EnumDirection.RIGHT)) {
				point.setAll(toPt.getX(), toPt.getY());
				dir = toDir;
			} else {
				if (Diff.getX() < 0) {
					point.setAll(fromPt.getX() - this.MINDIST, fromPt.getY());
				} else if (((Diff.getY() > 0) && (toDir == EnumDirection.DOWN)) || ((Diff.getY() < 0) && (toDir == EnumDirection.UP))) {
					point.setAll(toPt.getX(), fromPt.getY());
				} else if (fromDir == toDir) {
					pos = Math.min(fromPt.getX(), toPt.getX()) - this.MINDIST;
					point.setAll(pos, fromPt.getY());
				} else {
					point.setAll(fromPt.getX() - (Diff.getX() / 2), fromPt.getY());
				}
				if (Diff.getY() > 0) {
					dir = EnumDirection.UP;
				} else {
					dir = EnumDirection.DOWN;
				}
			}
		} else if (fromDir == EnumDirection.RIGHT) {
			if ((Diff.getX() < 0) && ((Diff.getY() * Diff.getY()) < this.TOL) && (toDir == EnumDirection.LEFT)) {
				point.setAll(toPt.getX(), toPt.getY());
				dir = toDir;
			} else {
				if (Diff.getX() > 0) {
					point.setAll(fromPt.getX() + this.MINDIST, fromPt.getY());
				} else if (((Diff.getY() > 0) && (toDir == EnumDirection.DOWN)) || ((Diff.getY() < 0) && (toDir == EnumDirection.UP))) {
					point.setAll(toPt.getX(), fromPt.getY());
				} else if (fromDir == toDir) {
					pos = Math.max(fromPt.getX(), toPt.getX()) + this.MINDIST;
					point.setAll(pos, fromPt.getY());
				} else {
					point.setAll(fromPt.getX() - (Diff.getX() / 2), fromPt.getY());
				}
				if (Diff.getY() > 0) {
					dir = EnumDirection.UP;
				} else {
					dir = EnumDirection.DOWN;
				}
			}
		} else if (fromDir == EnumDirection.DOWN) {
			if (((Diff.getX() * Diff.getX()) < this.TOL) && (Diff.getY() < 0) && (toDir == EnumDirection.UP)) {
				point.setAll(toPt.getX(), toPt.getY());
				dir = toDir;
			} else {
				if (Diff.getY() > 0) {
					point.setAll(fromPt.getX(), fromPt.getY() + this.MINDIST);
				} else if (((Diff.getX() > 0) && (toDir == EnumDirection.RIGHT)) || ((Diff.getX() < 0) && (toDir == EnumDirection.LEFT))) {
					point.setAll(fromPt.getX(), toPt.getY());
				} else if (fromDir == toDir) {
					pos = Math.max(fromPt.getY(), toPt.getY()) + this.MINDIST;
					point.setAll(fromPt.getX(), pos);
				} else {
					point.setAll(fromPt.getX(), fromPt.getY() - (Diff.getY() / 2));
				}
				if (Diff.getX() > 0) {
					dir = EnumDirection.LEFT;
				} else {
					dir = EnumDirection.RIGHT;
				}
			}
		} else if (fromDir == EnumDirection.UP) {
			if (((Diff.getX() * Diff.getX()) < this.TOL) && (Diff.getY() > 0) && (toDir == EnumDirection.DOWN)) {
				point.setAll(toPt.getX(), toPt.getY());
				dir = toDir;
			} else {
				if (Diff.getY() < 0) {
					point.setAll(fromPt.getX(), fromPt.getY() - this.MINDIST);
				} else if (((Diff.getX() > 0) && (toDir == EnumDirection.RIGHT)) || ((Diff.getX() < 0) && (toDir == EnumDirection.LEFT))) {
					point.setAll(fromPt.getX(), toPt.getY());
				} else if (fromDir == toDir) {
					pos = Math.min(fromPt.getY(), toPt.getY() - this.MINDIST);
					point.setAll(fromPt.getX(), pos);
				} else {
					point.setAll(fromPt.getX(), fromPt.getY() - (Diff.getY() / 2));
				}
				if (Diff.getX() > 0) {
					dir = EnumDirection.LEFT;
				} else {
					dir = EnumDirection.RIGHT;
				}
			}
		}
		points = drawManhattonConnection(points, point, dir, toPt, toDir);
		points.add(fromPt);

		return points;
	}

	private void drawLabel(Graphics2D g2d, InfoFigureParameter source, InfoFigureParameter target, InfoCoordinate toPoint, EnumDirection toDirection, InfoCoordinate fromPoint,
			EnumDirection fromDirection, ArrayList<InfoCoordinate> points, String comment) {
		g2d.setPaint(Color.white);
		InfoCoordinate midPoint;
		midPoint = getManhattanMidpoint(points);

		Font b = new Font("Tahoma", Font.PLAIN, 10);
		g2d.setFont(b);
		FontMetrics fm = g2d.getFontMetrics();

		int i = 0;
		int lineHeight = fm.getHeight();
		String[] words = comment.split(" ");
		int curX = (int) midPoint.getX();
		int curY = (int) midPoint.getY() - ((fm.getHeight() * words.length) / 2) - (fm.getHeight() / 2);
		int boxHeight = fm.getHeight() * words.length + 7;
		int boxWidthmax = 0;
		for (String word : words) {
			// int wordWidth = fm.stringWidth(word + " ");
			g2d.setPaint(Color.white);
			int boxWidth = fm.stringWidth(word + " ") + 3;
			if (boxWidth >= boxWidthmax) {
				boxWidthmax = boxWidth;
			}
			// curX += wordWidth;
		}

		int boxX = ((int) midPoint.getX() - 5) - (boxWidthmax / 2);
		int boxY = (int) midPoint.getY() - ((fm.getHeight() * words.length) / 2) - (fm.getHeight() / 2);
		g2d.fill(new Rectangle(boxX, boxY, boxWidthmax + 5, boxHeight));

		// fm = g2d.getFontMetrics();

		for (String word : words) {
			int wordWidth = fm.stringWidth(word + " ");

			curY += lineHeight;
			curX = (int) midPoint.getX();
			i++;
			int boxWidth = fm.stringWidth(word + " ") + 3;

			g2d.setFont(b);
			g2d.setPaint(Color.black);
			g2d.drawString(word, curX - (boxWidth / 2), curY);
			g2d.setPaint(Color.white);
			curX += wordWidth + 3;
		}

	}
}
