package net.sourceforge.olympos.diagramimageexporter;

import java.util.ArrayList;
import org.jdom.JDOMException;

public class SVGGenerator {

	// Arraylist for the diagram and Figures
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

	public static void main(String[] args) throws JDOMException, Exception {
		diagram = new ArrayList<InfoXmlDiagram>();
		xmlFigure = new ArrayList<InfoXmlFigure>();
		connectionExist = new ArrayList<InfoConnectionExist>();

		SVGGenerator svg = new SVGGenerator();

		String xmlFile = args[0];
		String imagePath = args[1];
		String picturePath = args[2];
		
		ElementDiagram.initCatalog(picturePath);

		XmlReader xml = new XmlReader();
		xml.XML(xmlFile);

		Draw df = new Draw();
		ArrayList<InfoXmlDiagram> xmlDia = svg.getDiagram();
		for (InfoXmlDiagram dia1 : xmlDia) {
			ArrayList<InfoFigureParameter> figureArray = dia1.getFigure();
			df.drawAll(imagePath, figureArray, dia1.getId());
		}

		System.out.println("FINISH");
	}
}