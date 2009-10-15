package net.sourceforge.olympos.diagramimageexporter.shapes;

import java.awt.Graphics2D;

import net.sourceforge.olympos.diagramimageexporter.InfoFigureParameter;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;

public class ChiBusinessUseCaseCore extends ChiBusinessUseCase {
	protected InfoLine line2 = new InfoLine(55, 76, 107, 54);

	@Override
	public void draw(Graphics2D g2d, InfoFigureParameter fig) {
		super.draw(g2d, fig);
		
		drawScaleLine(g2d, fig, figureInfo, line2);
	}
}
