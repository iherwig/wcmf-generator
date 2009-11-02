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

	SVGGenerator svg = new SVGGenerator();
	FigureChildren ch = new FigureChildren();

	public InfoCoordinate drawAll(String imagePath, ArrayList<InfoFigureParameter> figureArray, String id, String usedImageFormat) throws JDOMException, Exception {

		// create following Objects
		DrawFigure drawF = new DrawFigure();
		DrawConnection drawC = new DrawConnection();
		FigureDiagram editDia = new FigureDiagram();
		String imagePathSvg = imagePath + id + ".svg";
		InfoCoordinate maxCor = null;

		if (figureArray.size() > 0) {

			// Create the document on which the different elements will be put
			DOMImplementation impl = GenericDOMImplementation.getDOMImplementation();
			String svgNS = "http://www.w3.org/2000/svg";
			Document myFactory = impl.createDocument(svgNS, "svg", null);

			PrintStream os;
			SVGGeneratorContext ctx = SVGGeneratorContext.createDefault(myFactory);
			SVGGraphics2D g2d = new SVGGraphics2D(ctx, false);

			// edit Diagram
			maxCor = editDia.PutFigElementsTogehter(figureArray);

			// draw all Figures / Images
			for (InfoFigureParameter fig : figureArray) {
				drawF.drawLabeledSimpleFigure(g2d, fig);
			}

			// draw all connections between the Figures
			ArrayList<String> existLine = new ArrayList<String>();
			ArrayList<InfoFigureParameter> Parent = figureArray;
			for (InfoFigureParameter currParent : Parent) {
				if (currParent.getChildren() != null) {
					ArrayList<InfoFigureParameter> children = currParent.getChildren();
					for (InfoFigureParameter currChildren : children) {
						String key = currParent.getAlias() + currParent.getAlias() + currParent.getType() + currChildren.getType() + currParent.getTypeId() + currChildren.getTypeId();

						if (!existLine.contains(key)) {
							drawC.drawConnection(g2d, currParent, currChildren);
							existLine.add(key);
						}
					}
				}
			}

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

			if (usedImageFormat.toLowerCase().equals("png")) {
				PNGTranscoder t = new PNGTranscoder();
				String fileImagePath = "file:/" + imagePathSvg;
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
		}
		return maxCor;
	}
}
