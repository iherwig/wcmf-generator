package net.sourceforge.olympos.diagramimageexporter.shapes;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.Shape;
import java.awt.geom.Ellipse2D;

import javax.swing.JTextArea;

import net.sourceforge.olympos.diagramimageexporter.Figure;
import net.sourceforge.olympos.diagramimageexporter.InfoCoordinateSize;
import net.sourceforge.olympos.diagramimageexporter.InfoFigureParameter;
import net.sourceforge.olympos.diagramimageexporter.InfoLine;

import org.apache.batik.svggen.SVGGraphics2D;

public class ChiBusinessUseCase extends Figure {

	protected InfoCoordinateSize circle = new InfoCoordinateSize(0, 0, 114, 76);
	protected InfoCoordinateSize circleBackground = new InfoCoordinateSize(2, 2, 115, 76);
	protected InfoLine line1 = new InfoLine(60, 76, 105, 58);

	protected InfoCoordinateSize figureInfo = new InfoCoordinateSize(0, 0, 117, 78);

	public ChiBusinessUseCase() {
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

	@Override
	public void draw(Graphics2D g2d, InfoFigureParameter createFig) {
		drawUseCase(g2d, createFig, figureInfo, circleBackground, circle);
		drawScaleLine(g2d, createFig, figureInfo, line1);
		drawScaleLabelUseCase(g2d, createFig, figureInfo);
	}

	protected void drawUseCase(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize figureInfo, InfoCoordinateSize ellipseBg, InfoCoordinateSize ellipse) {
		float scaleY = (createFig.getHeight() / (figureInfo.getHeight()));
		float scaleX = (createFig.getWidth() / (figureInfo.getWidth()));
		
		Shape ellipse1 = new Ellipse2D.Float(createFig.getX() + ellipseBg.getX() * scaleX, createFig.getY() + ellipseBg.getY() * scaleY, ellipseBg.getWidth() * scaleX, ellipseBg.getHeight() * scaleY);
		g2d.setPaint(Color.gray);
		g2d.fill(ellipse1);

		Shape ellipse2 = new Ellipse2D.Float(createFig.getX() + ellipse.getX()   * scaleX, createFig.getY() + ellipse.getY() * scaleY,   ellipse.getWidth() * scaleX, ellipse.getHeight() * scaleY);
		g2d.setPaint(Color.WHITE);
		g2d.fill(ellipse2);
		g2d.setPaint(Color.BLACK);
		g2d.draw(ellipse2);
	}
	protected void drawScaleLabelUseCase(Graphics2D g2d, InfoFigureParameter createFig, InfoCoordinateSize figureInfo) {
		float scaleY = (createFig.getHeight()/figureInfo.getHeight());
		float scaleX = (createFig.getWidth()/figureInfo.getWidth());
		
		int x = (int) (createFig.getX());
		int y = (int) (createFig.getY() + (createFig.getHeight() / 2.7) );
		int width = (int) (createFig.getWidth() * scaleY);
		int height = (int) (createFig.getHeight() * scaleX);
		
		String label = createFig.getLabel();
		Font font = new Font("tahoma", Font.PLAIN , 12);
        
		SVGGraphics2D textbox = (SVGGraphics2D) g2d.create(x, y, width, height);
//		JLabel jl = new JLabel(label);
//		jl.setHorizontalAlignment(JLabel.CENTER);
//		jl.setFont(font);
//		jl.setWrapStyleWord( true );
//		jl.setLineWrap( true );
//		jl.setBounds(x, y, width, height);
//		jl.setOpaque(false);	
		
		JTextArea n = new JTextArea( label);	
		n.setFont(font);
		n.setWrapStyleWord( true );
		n.setLineWrap( true );
		n.setBounds(x, y, width, height);
		n.setOpaque(false);
//		SimpleAttributeSet set = new SimpleAttributeSet();
		n.paint( textbox );
		
	}
}
