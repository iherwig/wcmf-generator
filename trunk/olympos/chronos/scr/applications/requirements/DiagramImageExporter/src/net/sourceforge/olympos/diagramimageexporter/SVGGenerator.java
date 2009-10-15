package net.sourceforge.olympos.diagramimageexporter;

import java.net.URL;
import java.util.ArrayList;
import org.jdom.JDOMException;
/**
 * This class includes the main Methode
 */
public class SVGGenerator {


	//Arraylist for the diagram and Figures
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
	public void addXmlFigure (InfoXmlFigure fChild) {
		xmlFigure.add(fChild);
	}
	

	public static void main(String[] args) throws JDOMException, Exception {
		diagram = new ArrayList<InfoXmlDiagram>();
		xmlFigure = new ArrayList<InfoXmlFigure>();
		connectionExist = new ArrayList<InfoConnectionExist>();
		
		SVGGenerator svg = new SVGGenerator();

		ElementDiagram.initCatalog();
		
		String imagePath = "D:/SVG Bilder/";
//		String imagePath = args[1];
//		String xmlFile = args[0];
		
		XmlReader xml = new XmlReader();
		xml.XML();
		
		Draw df = new Draw();
		ArrayList<InfoXmlDiagram> xmlDia = svg.getDiagram();
		// String[] result = df.draw(xmlFilePath);
		for (InfoXmlDiagram dia1 : xmlDia) {
			ArrayList<InfoFigureParameter> figureArray = dia1.getFigure();
			imagePath = df.drawAll(imagePath, figureArray, dia1.getId());
		}
		System.out.print("Return Path: ");
		System.out.println(imagePath);
		System.out.println("FINISH");
	}
}