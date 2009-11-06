package net.sourceforge.olympos.diagramimageexporter;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import org.apache.log4j.Logger;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;

public class SVGGenerator {

	// Array list for the diagram and Figures
	public static ArrayList<InfoXmlDiagram> diagram;
	private static ArrayList<InfoXmlFigure> xmlFigure;
	private static ArrayList<InfoConnectionExist> connectionExist;
	public static Logger logger = Logger.getLogger(SVGGenerator.class.getName());

	public ArrayList<InfoConnectionExist> getConnectionExist() {
		return connectionExist;
	}

	public void addConnectionExist(InfoConnectionExist conExist) {
		connectionExist.add(conExist);
	}

	public ArrayList<InfoXmlDiagram> getDiagram() {
		return diagram;
	}

	public void addDiagram(InfoXmlDiagram dia) {
		diagram.add(dia);
	}

	public ArrayList<InfoXmlFigure> getxmlFigure() {
		return xmlFigure;
	}

	public void addXmlFigure(InfoXmlFigure fChild) {
		xmlFigure.add(fChild);
	}

	public void xmlFigNull(){
		xmlFigure = null;
	}
	public static void generateImages(String sourceFile, String targetDir, String iconDir, String usedImageFormat) throws Exception {

		// create the target directory if not existing
		File target = new File(targetDir);
		if (!target.isDirectory()) {
			target.mkdir();
		}

		// make files and directories absolute
		sourceFile = new File(sourceFile).getCanonicalPath();
		targetDir = new File(targetDir).getCanonicalPath() + File.separator;
		iconDir = new File(iconDir).getCanonicalPath() + File.separator;

		// initialize and run the generator
		diagram = new ArrayList<InfoXmlDiagram>();
		xmlFigure = new ArrayList<InfoXmlFigure>();
		connectionExist = new ArrayList<InfoConnectionExist>();

		SVGGenerator svg = new SVGGenerator();

		ElementDiagram.initCatalog(iconDir);

		XmlReader xml = new XmlReader();
		xml.XML(sourceFile);

		Document doc = new Document();
		Element root = new Element("diagramExport");
		doc.setRootElement(root);

		Draw df = new Draw();
		ArrayList<InfoXmlDiagram> xmlDia = svg.getDiagram();
		for (InfoXmlDiagram currDia : xmlDia) {
			ArrayList<InfoFigureParameter> figureArray = currDia.getFigure();
			InfoCoordinate maxCor = df.drawAll(targetDir, figureArray, currDia.getId(), usedImageFormat);

			if (maxCor != null) {
				int widthInt = (int) maxCor.getX();
				int heightInt = (int) maxCor.getY();
				Element image = new Element("image");
				String filename = currDia.getId() + "." + usedImageFormat;
				image.setAttribute("filename", filename);
				String width = Integer.toString(widthInt);
				image.setAttribute("width", width);
				String height = Integer.toString(heightInt);
				image.setAttribute("height", height);
				String type = usedImageFormat;
				image.setAttribute("type", type);
				String alias = currDia.getAlias();
				if(alias != null)
				image.setAttribute("alias", alias);
				root.addContent(image);
			}
		}
		try {
			Format f = Format.getPrettyFormat();
			XMLOutputter xml_out = new XMLOutputter(f);
			xml_out.output(doc, new java.io.FileOutputStream(targetDir + "Diagram.xml"));
		} catch (IOException e) {
		}

	}

	public static void main(String[] args) throws Exception {

		String xmlFile = args[0];
		String imagePath = args[1];
		String picturePath = args[2];
		String usedImageFormat = args[3];

		generateImages(xmlFile, imagePath, picturePath, usedImageFormat);

		System.out.println("Finish");
	}
}