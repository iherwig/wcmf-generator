//package net.sourceforge.olympos.diagramimageexporter;
//
//import java.awt.BasicStroke;
//import java.awt.Color;
//import java.awt.FontMetrics;
//import java.awt.Rectangle;
//import java.awt.Shape;
//import java.awt.geom.Ellipse2D;
//import java.awt.image.BufferedImage;
//import java.io.File;
//import java.io.FileNotFoundException;
//import java.io.FileOutputStream;
//import java.io.OutputStreamWriter;
//import java.io.PrintStream;
//import java.io.UnsupportedEncodingException;
//import java.io.Writer;
//import java.security.spec.EllipticCurve;
//
//import javax.imageio.ImageIO;
//
//import org.apache.batik.dom.GenericDOMImplementation;
//import org.apache.batik.svggen.SVGGeneratorContext;
//import org.apache.batik.svggen.SVGGraphics2D;
//import org.apache.batik.svggen.SVGGraphics2DIOException;
//import org.apache.batik.svggen.font.Font;
//import org.apache.fop.fonts.FontSetup;
//import org.w3c.dom.DOMImplementation;
//import org.w3c.dom.Document;
//import org.w3c.dom.Element;
//import org.w3c.dom.Text;
//
//public class SvgBilder {
//
//	public static void main(String[] args) {
//		SvgBilder svg = new SvgBilder();
//		svg.drawAll();
//	}
//
//	public void drawAll() {
//		// Create the document on which the different elements will be put
//		DOMImplementation impl = GenericDOMImplementation.getDOMImplementation();
//		String svgNS = "http://www.w3.org/2000/svg";
//		Document myFactory = impl.createDocument(svgNS, "svg", null);
//		PrintStream os;
//		SVGGeneratorContext ctx = SVGGeneratorContext.createDefault(myFactory);
//		SVGGraphics2D g2d = new SVGGraphics2D(ctx, false);
//		
//		FigureParameter figure = new FigureParameter(0, 0, 0, 0, EnumFigureType.ACTIVITY, svgNS, 2222, "hans");
//
//		g2d.setStroke(new BasicStroke(1, BasicStroke.CAP_ROUND, BasicStroke.JOIN_MITER));
//		g2d.setPaint(Color.black);
//
//		String Element = "Chi";
//		
//		if (Element.equals("Chi")) {
//			Chi chi = new Chi();
//			String txt = "Hallo";
//			Document document = null;
//			
//			Element root = document.getDocumentElement ();
//			Element textElement = document.createElementNS (svgNS,"text");
//
//			Text text = document.createTextNode (txt);
//			textElement.appendChild (text);
//	         textElement.setAttributeNS (null, "x", "30");
//	         textElement.setAttributeNS (null, "y", "70");
//	         textElement.setAttributeNS (null, "font-family","Verdana, Arial, sans-serif");
//	         textElement.setAttributeNS (null, "font-size","40");
//	         // Notice that we set the font color here
//	         textElement.setAttributeNS (null, "fill",
//	             "slateblue");
//	         // And finally, the new element is appended to the
//	         // root
//	         root.appendChild (textElement);
//
//			
//		}
//		
//		if (Element.equals("aktiv")) {
//			ActivitySend test = new ActivitySend();
//			InfoCoordinateSize ellip1 = test.getCircle1();
//			InfoCoordinateSize ellip2 = test.getCircle2();
//			InfoLine line1 = test.getInfLine1();
//			InfoLine line2 = test.getInfLine2();
//			InfoLine line3 = test.getInfLine3();
//			InfoLine line4 = test.getInfLine4();
//			InfoLine line5 = test.getInfLine5();
//			
//			g2d.setPaint(Color.black);
//			Shape circle1 = new Ellipse2D.Double(ellip1.getX(), ellip1.getY(), ellip1.getHight(), ellip1.getWidth());
//			g2d.draw(circle1);
//			
//			Shape circle2 = new Ellipse2D.Double(ellip2.getX(), ellip2.getY(), ellip2.getHight(), ellip2.getWidth());
//			g2d.fill(circle2);
//
//			
//			int x11 = (int) figure.getX() + (int) line1.getX1();
//			int y11 = (int) figure.getY() + (int) line1.getY1();
//			int x12 = (int) figure.getX() + (int) line1.getX2();
//			int y12 = (int) figure.getY() + (int) line1.getY2();
//			g2d.drawLine(x11, y11, x12, y12);
//
//			int x21 = (int) figure.getX() + (int) line2.getX1();
//			int y21 = (int) figure.getY() + (int) line2.getY1();
//			int x22 = (int) figure.getX() + (int) line2.getX2();
//			int y22 = (int) figure.getY() + (int) line2.getY2();
//			g2d.drawLine(x21, y21, x22, y22);
//			
//			int x31 = (int) figure.getX() + (int) line3.getX1();
//			int y31 = (int) figure.getY() + (int) line3.getY1();
//			int x32 = (int) figure.getX() + (int) line3.getX2();
//			int y32 = (int) figure.getY() + (int) line3.getY2();
//			g2d.drawLine(x31, y31, x32, y32);
//
//			int x41 = (int) figure.getX() + (int) line4.getX1();
//			int y41 = (int) figure.getY() + (int) line4.getY1();
//			int x42 = (int) figure.getX() + (int) line4.getX2();
//			int y42 = (int) figure.getY() + (int) line4.getY2();
//			g2d.drawLine(x41, y41, x42, y42);
//			
//			int x51 = (int) figure.getX() + (int) line5.getX1();
//			int y51 = (int) figure.getY() + (int) line5.getY1();
//			int x52 = (int) figure.getX() + (int) line5.getX2();
//			int y52 = (int) figure.getY() + (int) line5.getY2();
//			g2d.drawLine(x51, y51, x52, y52);
//		}
//		
//		if (Element.equals("UseCase")) {
//			ChiController test = new ChiController();
//			InfoCoordinateSize rec1 = test.getRect1();
//			InfoCoordinateSize rec2 = test.getRect2();
//			InfoCoordinateSize circle1 = test.getCircle1();
//			InfoLine line1 = test.getInfLine1();
//			InfoLine line2 = test.getInfLine2();
//			InfoLine inUp = test.getInUp();
//			InfoLine inDown = test.getInDown();
//			InfoLine inLeft = test.getInLeft();
//			InfoLine inRightUp = test.getInrightup();
//			InfoLine inLRightDown = test.getInrightdown();
//
//
//			g2d.draw(new Rectangle((int) figure.getX(), (int) figure.getY(), (int) rec1.getWidth(), (int) rec1.getHight()));
//
//			int recX2 = (int) figure.getX() + (int) rec2.getX();
//			int recY2 = (int) figure.getY() + (int) rec2.getY();
//			g2d.draw(new Rectangle(recX2, recY2, (int) rec2.getWidth(), (int) rec2.getHight()));
//			
//			Shape circle2 = new Ellipse2D.Double(circle1.getX(), circle1.getY(), circle1.getHight(), circle1.getWidth());
//			g2d.draw(circle2);
//			
//			int x11 = (int) figure.getX() + (int) line1.getX1();
//			int y11 = (int) figure.getY() + (int) line1.getY1();
//			int x12 = (int) figure.getX() + (int) line1.getX2();
//			int y12 = (int) figure.getY() + (int) line1.getY2();
//			g2d.drawLine(x11, y11, x12, y12);
//
//			int x21 = (int) figure.getX() + (int) line2.getX1();
//			int y21 = (int) figure.getY() + (int) line2.getY1();
//			int x22 = (int) figure.getX() + (int) line2.getX2();
//			int y22 = (int) figure.getY() + (int) line2.getY2();
//			g2d.drawLine(x21, y21, x22, y22);
//			
//			g2d.setPaint(Color.black);
//			int x31 = (int) figure.getX() + (int) inUp.getX1();
//			int y31 = (int) figure.getY() + (int) inUp.getY1();
//			int x32 = (int) figure.getX() + (int) inUp.getX2();
//			int y32 = (int) figure.getY() + (int) inUp.getY2();
//			g2d.drawLine(x31, y31, x32, y32);
//			
//			int x41 = (int) figure.getX() + (int) inDown.getX1();
//			int y41 = (int) figure.getY() + (int) inDown.getY1();
//			int x42 = (int) figure.getX() + (int) inDown.getX2();
//			int y42 = (int) figure.getY() + (int) inDown.getY2();
//			g2d.drawLine(x41, y41, x42, y42);
//			
//			int x51 = (int) figure.getX() + (int) inLeft.getX1();
//			int y51 = (int) figure.getY() + (int) inLeft.getY1();
//			int x52 = (int) figure.getX() + (int) inLeft.getX2();
//			int y52 = (int) figure.getY() + (int) inLeft.getY2();
//			g2d.drawLine(x51, y51, x52, y52);
//			
//			int x61 = (int) figure.getX() + (int) inLRightDown.getX1();
//			int y61 = (int) figure.getY() + (int) inLRightDown.getY1();
//			int x62 = (int) figure.getX() + (int) inLRightDown.getX2();
//			int y62 = (int) figure.getY() + (int) inLRightDown.getY2();
//			g2d.drawLine(x61, y61, x62, y62);
//			
//			int x71 = (int) figure.getX() + (int) inRightUp.getX1();
//			int y71 = (int) figure.getY() + (int) inRightUp.getY1();
//			int x72 = (int) figure.getX() + (int) inRightUp.getX2();
//			int y72 = (int) figure.getY() + (int) inRightUp.getY2();
//			g2d.drawLine(x71, y71, x72, y72);
//		}
//
//		else if (Element.equals("Use")) {
//			ChiBusinessPartnerActive test = new ChiBusinessPartnerActive();
////			InfoCoordinateSize rec1 = test.getRect1();
////			InfoCoordinateSize rec2 = test.getRect2();
//			InfoLine line1 = test.getBody();
//			InfoLine line2 = test.getLeftLeg();
//			InfoLine line3 = test.getRightLeg();
//			InfoLine line4 = test.getArmLeft();
//			InfoLine line45 = test.getArmRight();
////			InfoLine line5 = test.getArrow1();
////			InfoLine line6 = test.getArrow2();
////			
////			InfoCoordinateSize ellip1 = test.getRound();
////			InfoCoordinateSize ellip2 = test.getHead();
//
//			g2d.setPaint(Color.black);
//
//			g2d.draw(new Rectangle((int) figure.getX(), (int) figure.getY(), (int) rec1.getWidth(), (int) rec1.getHight()));
//
//			int recX2 = (int) figure.getX() + (int) rec2.getX();
//			int recY2 = (int) figure.getY() + (int) rec2.getY();
//			g2d.draw(new Rectangle(recX2, recY2, (int) rec2.getWidth(), (int) rec2.getHight()));
//
//			Shape circle1 = new Ellipse2D.Double(ellip1.getX(), ellip1.getY(), ellip1.getHight(), ellip1.getWidth());
//			g2d.draw(circle1);
//			
//			Shape circle2 = new Ellipse2D.Double(ellip2.getX(), ellip2.getY(), ellip2.getHight(), ellip2.getWidth());
//			g2d.draw(circle2);
//			
//			int x11 = (int) figure.getX() + (int) line1.getX1();
//			int y11 = (int) figure.getY() + (int) line1.getY1();
//			int x12 = (int) figure.getX() + (int) line1.getX2();
//			int y12 = (int) figure.getY() + (int) line1.getY2();
//			g2d.drawLine(x11, y11, x12, y12);
//
//			int x21 = (int) figure.getX() + (int) line2.getX1();
//			int y21 = (int) figure.getY() + (int) line2.getY1();
//			int x22 = (int) figure.getX() + (int) line2.getX2();
//			int y22 = (int) figure.getY() + (int) line2.getY2();
//			g2d.drawLine(x21, y21, x22, y22);
//			
//			int x31 = (int) figure.getX() + (int) line3.getX1();
//			int y31 = (int) figure.getY() + (int) line3.getY1();
//			int x32 = (int) figure.getX() + (int) line3.getX2();
//			int y32 = (int) figure.getY() + (int) line3.getY2();
//			g2d.drawLine(x31, y31, x32, y32);
//						
//			int x41 = (int) figure.getX() + (int) line4.getX1();
//			int y41 = (int) figure.getY() + (int) line4.getY1();
//			int x42 = (int) figure.getX() + (int) line4.getX2();
//			int y42 = (int) figure.getY() + (int) line4.getY2();
//			g2d.drawLine(x41, y41, x42, y42);
//			
//			int x451 = (int) figure.getX() + (int) line45.getX1();
//			int y451 = (int) figure.getY() + (int) line45.getY1();
//			int x452 = (int) figure.getX() + (int) line45.getX2();
//			int y452 = (int) figure.getY() + (int) line45.getY2();
//			g2d.drawLine(x451, y451, x452, y452);
//						
//			int x51 = (int) figure.getX() + (int) line5.getX1();
//			int y51 = (int) figure.getY() + (int) line5.getY1();
//			int x52 = (int) figure.getX() + (int) line5.getX2();
//			int y52 = (int) figure.getY() + (int) line5.getY2();
//			g2d.drawLine(x51, y51, x52, y52);
//			
//			int x61 = (int) figure.getX() + (int) line6.getX1();
//			int y61 = (int) figure.getY() + (int) line6.getY1();
//			int x62 = (int) figure.getX() + (int) line6.getX2();
//			int y62 = (int) figure.getY() + (int) line6.getY2();
//			g2d.drawLine(x61, y61, x62, y62);
//		} 
//		
//		else if (Element.equals("UseCase")) {
//			ChiBusinessUseCaseCore test = new ChiBusinessUseCaseCore();
//			InfoCoordinateSize circleD = test.getCircle();
//			InfoCoordinateSize circleBackgroundD = test.getCircleBackground();
//			InfoLine line1 = test.getLine1();
//			InfoLine line2 = test.getLine2();
//			
//			
//			Shape circleBackground = new Ellipse2D.Double(circleBackgroundD.getX(), circleBackgroundD.getY(), circleBackgroundD.getHight(), circleBackgroundD.getWidth());
//			g2d.setPaint(Color.gray);
//			g2d.fill(circleBackground);
//			
//			Shape circle = new Ellipse2D.Double(circleD.getX(), circleD.getY(), circleD.getHight(), circleD.getWidth());
//			g2d.setPaint(Color.white);
//			g2d.fill(circle);
//			g2d.setPaint(Color.black);
//			g2d.draw(circle);
//			
//			int x11 = (int) figure.getX() + (int) line1.getX1();
//			int y11 = (int) figure.getY() + (int) line1.getY1();
//			int x12 = (int) figure.getX() + (int) line1.getX2();
//			int y12 = (int) figure.getY() + (int) line1.getY2();
//			g2d.drawLine(x11, y11, x12, y12);
//
//			int x21 = (int) figure.getX() + (int) line2.getX1();
//			int y21 = (int) figure.getY() + (int) line2.getY1();
//			int x22 = (int) figure.getX() + (int) line2.getX2();
//			int y22 = (int) figure.getY() + (int) line2.getY2();
//			g2d.drawLine(x21, y21, x22, y22);
//		}
//		
//		else if (Element.equals("Ract")) {
//			g2d.setStroke (new BasicStroke ( 150f));
//			g2d.setStroke(new BasicStroke(8, BasicStroke.JOIN_MITER, BasicStroke.JOIN_MITER));
//			g2d.drawLine(10, 10, 100, 10);
//			
//			g2d.setStroke(new BasicStroke(2, BasicStroke.CAP_BUTT, BasicStroke.JOIN_MITER));
//
//		}
//
//		// write the data into a image out
//		boolean useCSS = true;
//		try {
//			os = new PrintStream(new FileOutputStream("d:/SVG Bilder/test-Bild.svg"));
//			Writer out = new OutputStreamWriter(os, "UTF-8");
//			g2d.stream(out, useCSS);
//		} catch (SVGGraphics2DIOException e1) {
//			// TODO Auto-generated catch block
//			e1.printStackTrace();
//		} catch (UnsupportedEncodingException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} catch (FileNotFoundException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		System.out.println("FINISH");
//	}
//}
