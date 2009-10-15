package net.sourceforge.olympos.diagramimageexporter;

import java.awt.Graphics2D;

public abstract class Figure {
	abstract public void draw( Graphics2D g2d, float x, float y, float w ,float h, InfoFigureParameter xmlObject);
}