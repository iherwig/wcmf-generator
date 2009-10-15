package net.sourceforge.olympos.diagramimageexporter;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintStream;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.util.ArrayList;

import org.apache.batik.dom.GenericDOMImplementation;
import org.apache.batik.svggen.SVGGeneratorContext;
import org.apache.batik.svggen.SVGGraphics2D;
import org.apache.batik.svggen.SVGGraphics2DIOException;
import org.jdom.JDOMException;
import org.w3c.dom.DOMImplementation;
import org.w3c.dom.Document;

public class Draw {

	// private ArrayList<Figure> diagramFigures = new ArrayList<Figure>();
	//
	// public ArrayList<Figure> getFigures() {
	// return diagramFigures;
	// }
	// public void addFigure(Figure fChild) {
	// diagramFigures.add(fChild);
	// }

	SVGGenerator svg = new SVGGenerator();
	FigureChildren ch = new FigureChildren();

	public String drawAll(String imagePath, ArrayList<InfoFigureParameter> figureArray, int id) throws JDOMException, Exception {
		
		// create following Objects
		// Draw dr1 = new Draw();
		DrawFigure drawF = new DrawFigure();
		DrawConnection drawC = new DrawConnection();
		FigureDiagram editDia = new FigureDiagram();
		imagePath = imagePath + id + ".svg";

		// Create the document on which the different elements will be put
		DOMImplementation impl = GenericDOMImplementation.getDOMImplementation();
		String svgNS = "http://www.w3.org/2000/svg";
		Document myFactory = impl.createDocument(svgNS, "svg", null);
		PrintStream os;
		SVGGeneratorContext ctx = SVGGeneratorContext.createDefault(myFactory);
		SVGGraphics2D g2d = new SVGGraphics2D(ctx, false);

		// edit Diagram
		editDia.PutFigElementsTogehter();

		// put the Diagram and her Children in an arraylist

		// draw all Figures / Images
		for (InfoFigureParameter fig : figureArray) {
			drawF.drawLabeledSimpleFigure(g2d, fig);
		}

		// ch.addChildren();

		// draw all connections between the Figures and Images
		ArrayList<InfoXmlDiagram> dia = svg.getDiagram();
		boolean exist = false;
		for (InfoXmlDiagram currDia : dia) {
			ArrayList<InfoFigureParameter> figure = currDia.getFigure();
			for (InfoFigureParameter figure1 : figure) {
				if (figure1.getChildren() != null) {
					ArrayList<InfoFigureParameter> children = new ArrayList<InfoFigureParameter>();
					children = figure1.getChildren();
					for (InfoFigureParameter figure2 : children) {
						drawC.drawConnection(g2d, figure1, figure2);
					}
				}
			}
		}

		// write the data into a image out
		boolean useCSS = true;
		try {
			os = new PrintStream(new FileOutputStream(imagePath));
			Writer out = new OutputStreamWriter(os, "UTF-8");
			g2d.stream(out, useCSS);
		} catch (SVGGraphics2DIOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		// return the path of the image
		return imagePath;
	}
}
