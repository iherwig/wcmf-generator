package net.sourceforge.olympos.diagramimageexporter;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintStream;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.util.ArrayList;

import org.apache.batik.dom.GenericDOMImplementation;
import org.apache.batik.svggen.SVGGeneratorContext;
import org.apache.batik.svggen.SVGGraphics2D;
import org.apache.batik.svggen.SVGGraphics2DIOException;
import org.apache.batik.transcoder.TranscoderInput;
import org.apache.batik.transcoder.TranscoderOutput;
import org.apache.batik.transcoder.image.PNGTranscoder;
import org.jdom.JDOMException;
import org.w3c.dom.DOMImplementation;
import org.w3c.dom.Document;

public class Draw {
	// FigureChildren ch = new FigureChildren();
	
	private static ArrayList <String> existLine;
	
	public ArrayList<String> getExistLine (){
		return existLine;
	}
	
	public void addExistLine(String Line) {
		existLine.add(Line);
	}

	@SuppressWarnings("static-access")
	public InfoCoordinate drawAll(String imagePath, ArrayList<InfoFigureParameter> figureArray, String id, String usedImageFormat, SVGGenerator svg)
			throws JDOMException, Exception {

		existLine = new ArrayList<String>();
		// create following Objects
		DrawFigure drawF = new DrawFigure();
		// DrawConnection drawC = new DrawConnection();
		FigureDiagram editDia = new FigureDiagram();
		String imagePathSvg = imagePath + id + ".svg";
		InfoCoordinate maxCor = new InfoCoordinate(300, 60);

		// Create the document on which the different elements will be put
		DOMImplementation impl = GenericDOMImplementation.getDOMImplementation();
		String svgNS = "http://www.w3.org/2000/svg";
		Document myFactory = impl.createDocument(svgNS, "svg", null);

		PrintStream os;
		SVGGeneratorContext ctx = SVGGeneratorContext.createDefault(myFactory);
		SVGGraphics2D g2d = new SVGGraphics2D(ctx, false);
		ArrayList<InfoXmlFigure> objekte = svg.getxmlFigure();

		if (objekte == null || objekte.size() == 0) {
			g2d.drawString("This diagram contains no image.", 100, 30);
		}

		else if (figureArray == null || figureArray.size() == 0) {
			g2d.drawString("This diagram contains no image.", 100, 30);

		} else {

			// edit Diagram
			maxCor = editDia.PutFigElementsTogehter(figureArray, svg);

			// ArrayList<String> existLine = new ArrayList<String>();
			ArrayList<InfoFigureParameter> Parent = figureArray;
			for (InfoFigureParameter currParent : Parent) {
				if (currParent.getChildren() != null) {
					ArrayList<InfoFigureParameter> children = currParent.getChildren();
					drawF.drawLabeledSimpleFigure(g2d, currParent, children, svg, existLine);
				}
			}
		}

		// if (usedImageFormat.toLowerCase().equals("svg")) {

		// write the data into a image out
		boolean useCSS = true;
		try {
			os = new PrintStream(new FileOutputStream(imagePathSvg));
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

		if (usedImageFormat.toLowerCase().equals("png") && maxCor != null ) {

			PNGTranscoder t = new PNGTranscoder();
			String fileImagePath = "file:///" + imagePathSvg;
			TranscoderInput input = new TranscoderInput(fileImagePath);
			try {
				OutputStream ostream = new FileOutputStream(imagePath + id + ".png");
				t.addTranscodingHint(t.KEY_WIDTH, new Float(maxCor.getX()));
				t.addTranscodingHint(t.KEY_HEIGHT, new Float(maxCor.getY()));

				TranscoderOutput output = new TranscoderOutput(ostream);
				t.transcode(input, output);
				ostream.flush();
				ostream.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return maxCor;
	}
}
