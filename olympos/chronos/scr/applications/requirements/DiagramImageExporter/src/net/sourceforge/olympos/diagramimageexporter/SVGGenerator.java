package net.sourceforge.olympos.diagramimageexporter;

import java.util.ArrayList;

public class SVGGenerator {

	// Array list for the diagram and Figures
	public static ArrayList<InfoXmlDiagram> diagram;
	private static ArrayList<InfoXmlFigure> xmlFigure;
	private static ArrayList<InfoConnectionExist> connectionExist;

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

	public static void generateImages(String sourceFile, String targetDir, String iconDir) throws Exception {

		diagram = new ArrayList<InfoXmlDiagram>();
		xmlFigure = new ArrayList<InfoXmlFigure>();
		connectionExist = new ArrayList<InfoConnectionExist>();

		SVGGenerator svg = new SVGGenerator();

		ElementDiagram.initCatalog(iconDir);

		XmlReader xml = new XmlReader();
		xml.XML(sourceFile);

		Draw df = new Draw();
		ArrayList<InfoXmlDiagram> xmlDia = svg.getDiagram();
		for (InfoXmlDiagram dia1 : xmlDia) {
			ArrayList<InfoFigureParameter> figureArray = dia1.getFigure();
			df.drawAll(targetDir, figureArray, dia1.getId());
		}

		System.out.println("FINISH");
	}

	public static void main(String[] args) throws Exception {

		String xmlFile = args[0];
		String imagePath = args[1];
		String picturePath = args[2];

		generateImages(xmlFile, imagePath, picturePath);
	}
}