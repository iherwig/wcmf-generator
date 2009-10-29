package net.sourceforge.olympos.diagramimageexporter;

import java.io.File;
import java.util.ArrayList;

import org.apache.log4j.Level;
import org.apache.log4j.Logger ;
import org.apache.log4j.BasicConfigurator ;

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

		// create the target directory if not existing
		File target = new File(targetDir);
		if (!target.isDirectory()) {
			target.mkdir();
		}
		
		// make files and directories absolute
		sourceFile = new File(sourceFile).getCanonicalPath();
		targetDir = new File(targetDir).getCanonicalPath()+File.separator;
		iconDir = new File(iconDir).getCanonicalPath()+File.separator;

		// initialize and run the generator
		diagram = new ArrayList<InfoXmlDiagram>();
		xmlFigure = new ArrayList<InfoXmlFigure>();
		connectionExist = new ArrayList<InfoConnectionExist>();

		SVGGenerator svg = new SVGGenerator();

		ElementDiagram.initCatalog(iconDir);

		XmlReader xml = new XmlReader();
		xml.XML(sourceFile);

		Draw df = new Draw();
		ArrayList<InfoXmlDiagram> xmlDia = svg.getDiagram();
		for (InfoXmlDiagram currDia : xmlDia) {
			ArrayList<InfoFigureParameter> figureArray = currDia.getFigure();
			df.drawAll(targetDir, figureArray, currDia.getId());
		}
		
		System.out.println("FINISH");
	}
	
//	public static Logger logger;// = Logger.getRootLogger();

	public static void main(String[] args) throws Exception {

//		logger = Logger.getLogger(SVGGenerator.class.getName());
//		logger.setLevel(Level.ALL);
//
////		BasicConfigurator.configure();	
//		if( logger.isDebugEnabled()) {
//		    logger.fatal("Fatal");
//		}
//		if( logger.isDebugEnabled()) {
//		    logger.error("Error");
//		}
//		if( logger.isDebugEnabled()) {
//		    logger.warn("Warning");
//		}
//		if( logger.isDebugEnabled()) {
//		    logger.info("Info");
//		}
//		if( logger.isDebugEnabled()) {
//		    logger.debug("Debug");
//		}
		    
		String xmlFile = args[0];
		String imagePath = args[1];
		String picturePath = args[2];

		generateImages(xmlFile, imagePath, picturePath);
	}
}