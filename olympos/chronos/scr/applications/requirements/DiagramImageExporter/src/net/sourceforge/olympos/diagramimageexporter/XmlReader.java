package net.sourceforge.olympos.diagramimageexporter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;

public class XmlReader {
//	private static final String xmlFilePath = "file:///D:/Diagram.xml";
	Document doc;

	Draw dr = new Draw();
	SVGGenerator svg = new SVGGenerator();

	XmlReader() {
	}

	public ArrayList<InfoFigureParameter> XML(String Path) {
		String filename = "file:///" + Path;
		Document doc = null;
		try {
			doc = new SAXBuilder().build(filename);
		} catch (JDOMException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		// get Root Element
		Element CwmExport = doc.getRootElement();
		Element Model = CwmExport.getChild("Model");

		findNode(Model, 0);

		doc = null;
		System.gc();
		
		return null;
	}

	@SuppressWarnings("unchecked")
	void findNode(Element element, int level) {
		Element child = null;
		List<Element> children = element.getChildren();

		if (element.getName().equals("Diagram") || element.getName().equals("ActivitySet")) {
			diagram(element, level);
		}

		else if (element.getName().equals("Package") || element.getName().equals("Model") || element.getName().equals("Figure")) {
		}

		else if (element.getName().equals("Parent") || element.getName().equals("ManyToMany") || element.getName().equals("Child")) {
		}

		else {
			node(element, level);
		}

		for (int i = 0; i < children.size(); i++) {
			child = (Element) children.get(i);
			findNode(child, level + 1);
		}
	}

	@SuppressWarnings("unchecked")
	private void diagram(Element element, int level) {

		// create an new Diagram
		String id = element.getAttributeValue("id");
		String alias = element.getAttributeValue("Alias");
		InfoXmlDiagram dia = new InfoXmlDiagram(id, alias);
		// Add parameters to the Diagram;
		svg.addDiagram(dia);


		// got to the Element Figure
		try {
			List<Element> figur = element.getChildren();
			for (Element currFigure : figur) {
				if (currFigure instanceof Element) {
					dia.addFigure(figure((Element) currFigure));
				}
			}
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
			ex.printStackTrace();
		}
	}

	@SuppressWarnings("unchecked")
	private void node(Element element, int level) {

		String point = element.getName();
		ElementDiagram elem = ElementDiagram.getCatalogEntryByName(point);
		
		if (elem != null) {
			String id = element.getAttributeValue("id");
			String alias = element.getAttributeValue("Alias");
			String name = element.getAttributeValue("Name");
			String objectStatus = element.getAttributeValue("object_status");
			EnumFigureType typ = elem.getType();
			InfoXmlFigure xmlFig = new InfoXmlFigure(id, name, typ, alias, objectStatus);
			svg.addXmlFigure(xmlFig);
			
			if (point.equals("ChiSystem")) {
				List<Element> chiSystem = element.getChildren();
				
				for (Element currChiSystem : chiSystem) {
					if (currChiSystem.getName().equals("ChiValue")) {
						
						String idOptVal = element.getAttributeValue("id");
						String aliasOptVal = currChiSystem.getAttributeValue("Alias");
						String nameOptVal = currChiSystem.getAttributeValue("Name");
						String typOptVal = currChiSystem.getName();
						InfoXMLOptionValue xmlFigOpt = new InfoXMLOptionValue(idOptVal, nameOptVal, typOptVal, aliasOptVal);
						xmlFig.addAttribute(xmlFigOpt); 
												
//						List<Element> chiControllerParent = currChiController.getChildren();
//						for (Element currChiControllerParent : chiControllerParent) {
//							String type = currChiControllerParent.getName();
//							String targetType = currChiControllerParent.getAttributeValue("targetType");
//							String targetOid = currChiControllerParent.getAttributeValue("targetOid");
//							String targetRole = currChiControllerParent.getAttributeValue("targetRole");
//							InfoXmlConnection xmlCon = new InfoXmlConnection(type, targetType, targetOid, targetRole);
//							xmlFigOpt.addChild(xmlCon);
//						}
						
					} else {
						String type = currChiSystem.getName();
						String targetType = currChiSystem.getAttributeValue("targetType");
						String targetOid = currChiSystem.getAttributeValue("targetOid");
						String targetRole = currChiSystem.getAttributeValue("targetRole");
						String relationType = currChiSystem.getAttributeValue("relationType");
						InfoXmlConnection xmlCon = new InfoXmlConnection(type, targetType, targetOid, targetRole, relationType);
						xmlFig.addChild(xmlCon);
					}
				}
			}

			if (point.equals("ChiBusinessUseCase")) {
				List<Element> usecase = element.getChildren();
				for (Element currusecase : usecase) {
					findNode(currusecase, ++level);
				}
				
			}
			if (point.equals("ChiController")) {
				List<Element> chiController = element.getChildren();
				
				for (Element currChiController : chiController) {
					if (currChiController.getName().equals("Operation")) {
						
						String type = currChiController.getName();
						String targetType = currChiController.getAttributeValue("targetType");
						String targetOid = currChiController.getAttributeValue("targetOid");
						String targetRole = currChiController.getAttributeValue("targetRole");
						String relationType = currChiController.getAttributeValue("relationType");
						InfoXmlConnection xmlCon = new InfoXmlConnection(type, targetType, targetOid, targetRole, relationType);
						xmlFig.addChild(xmlCon);
												
//						List<Element> chiControllerParent = currChiController.getChildren();
//						for (Element currChiControllerParent : chiControllerParent) {
//							String type = currChiControllerParent.getName();
//							String targetType = currChiControllerParent.getAttributeValue("targetType");
//							String targetOid = currChiControllerParent.getAttributeValue("targetOid");
//							String targetRole = currChiControllerParent.getAttributeValue("targetRole");
//							InfoXmlConnection xmlCon = new InfoXmlConnection(type, targetType, targetOid, targetRole);
//							xmlFigOpt.addChild(xmlCon);
//						}
					} else {
						String type = currChiController.getName();
						String targetType = currChiController.getAttributeValue("targetType");
						String targetOid = currChiController.getAttributeValue("targetOid");
						String targetRole = currChiController.getAttributeValue("targetRole");
						String relationType = currChiController.getAttributeValue("relationType");
						InfoXmlConnection xmlCon = new InfoXmlConnection(type, targetType, targetOid, targetRole, relationType);
						xmlFig.addChild(xmlCon);
					}
				}
			}
			if (point.equals("ChiNode") || point.equals("ChiNodeManyToMany")) {
				List<Element> chiNode = element.getChildren();
				
				for (Element currChiNode : chiNode) {
					if (currChiNode.getName().equals("Operation")) {
						
						String idOptVal = element.getAttributeValue("id");
						String aliasOptVal = currChiNode.getAttributeValue("Alias");
						String nameOptVal = currChiNode.getAttributeValue("Name");
						String typOptVal = currChiNode.getName();
						InfoXMLOptionValue xmlFigOpt = new InfoXMLOptionValue(idOptVal, nameOptVal, typOptVal, aliasOptVal);
						xmlFig.addOperation(xmlFigOpt);
												
//						List<Element> chichiNodeParent = currChiNode.getChildren();
//						for (Element currChiNodeParent : chichiNodeParent) {
//							String type = currChiNodeParent.getName();
//							String targetType = currChiNodeParent.getAttributeValue("targetType");
//							String targetOid = currChiNodeParent.getAttributeValue("targetOid");
//							String targetRole = currChiNodeParent.getAttributeValue("targetRole");
//							InfoXmlConnection xmlCon = new InfoXmlConnection(type, targetType, targetOid, targetRole);
//							xmlFigOpt.addChild(xmlCon);
//						}						

					}else if (currChiNode.getName().equals("ChiValue")) {
						String idOptVal = element.getAttributeValue("id");
						String aliasOptVal = currChiNode.getAttributeValue("Alias");
						String nameOptVal = currChiNode.getAttributeValue("Name");
						String typOptVal = currChiNode.getName();
						InfoXMLOptionValue xmlFigOpt = new InfoXMLOptionValue(idOptVal, nameOptVal, typOptVal, aliasOptVal);
						xmlFig.addAttribute(xmlFigOpt);
												
//						List<Element> chichiNodeParent = currChiNode.getChildren();
//						for (Element currChiNodeParent : chichiNodeParent) {
//							String type = currChiNodeParent.getName();
//							String targetType = currChiNodeParent.getAttributeValue("targetType");
//							String targetOid = currChiNodeParent.getAttributeValue("targetOid");
//							String targetRole = currChiNodeParent.getAttributeValue("targetRole");
//							InfoXmlConnection xmlCon = new InfoXmlConnection(type, targetType, targetOid, targetRole);
//							xmlFigOpt.addChild(xmlCon);
//						}
					}			
						String type = currChiNode.getName();
						String targetType = currChiNode.getAttributeValue("targetType");
						String targetOid = currChiNode.getAttributeValue("targetOid");
						String targetRole = currChiNode.getAttributeValue("targetRole");
						String relationType = currChiNode.getAttributeValue("relationType");
						InfoXmlConnection xmlCon = new InfoXmlConnection(type, targetType, targetOid, targetRole, relationType);
						xmlFig.addChild(xmlCon);
				}
			}
			if (point.equals("ChiNode") || point.equals("ChiNodeManyToMany")) {
				List<Element> chiNode = element.getChildren();
				
				for (Element currChiNode : chiNode) {
					if (currChiNode.getName().equals("Operation")) {
						
						String idOptVal = element.getAttributeValue("id");
						String aliasOptVal = currChiNode.getAttributeValue("Alias");
						String nameOptVal = currChiNode.getAttributeValue("Name");
						String typOptVal = currChiNode.getName();
						InfoXMLOptionValue xmlFigOpt = new InfoXMLOptionValue(idOptVal, nameOptVal, typOptVal, aliasOptVal);
						xmlFig.addOperation(xmlFigOpt);
//						System.out.println(xmlFigOpt.getName());
												
//						List<Element> chichiNodeParent = currChiNode.getChildren();
//						for (Element currChiNodeParent : chichiNodeParent) {
//							String type = currChiNodeParent.getName();
//							String targetType = currChiNodeParent.getAttributeValue("targetType");
//							String targetOid = currChiNodeParent.getAttributeValue("targetOid");
//							String targetRole = currChiNodeParent.getAttributeValue("targetRole");
//							InfoXmlConnection xmlCon = new InfoXmlConnection(type, targetType, targetOid, targetRole);
//							xmlFigOpt.addChild(xmlCon);
//						}
						

					}else if (currChiNode.getName().equals("ChiValue")) {
						String idOptVal = element.getAttributeValue("id");
						String aliasOptVal = currChiNode.getAttributeValue("Alias");
						String nameOptVal = currChiNode.getAttributeValue("Name");
						String typOptVal = currChiNode.getName();
						InfoXMLOptionValue xmlFigOpt = new InfoXMLOptionValue(idOptVal, nameOptVal, typOptVal, aliasOptVal);
						xmlFig.addAttribute(xmlFigOpt);	
						
//						List<Element> chichiNodeParent = currChiNode.getChildren();
//						for (Element currChiNodeParent : chichiNodeParent) {
//							String type = currChiNodeParent.getName();
//							String targetType = currChiNodeParent.getAttributeValue("targetType");
//							String targetOid = currChiNodeParent.getAttributeValue("targetOid");
//							String targetRole = currChiNodeParent.getAttributeValue("targetRole");
//							InfoXmlConnection xmlCon = new InfoXmlConnection(type, targetType, targetOid, targetRole);
//							xmlFigOpt.addChild(xmlCon);
//						}
					}
						String type = currChiNode.getName();
						String targetType = currChiNode.getAttributeValue("targetType");
						String targetOid = currChiNode.getAttributeValue("targetOid");
						String targetRole = currChiNode.getAttributeValue("targetRole");
						String relationType = currChiNode.getAttributeValue("relationType");
						InfoXmlConnection xmlCon = new InfoXmlConnection(type, targetType, targetOid, targetRole, relationType);
						xmlFig.addChild(xmlCon);
				}
			}
			List<Element> childr = element.getChildren();
			for (Element currChild : childr) {
				String type = currChild.getName();
				String targetType = currChild.getAttributeValue("targetType");
				String targetOid = currChild.getAttributeValue("targetOid");
				String targetRole = currChild.getAttributeValue("targetRole");
				String relationType = currChild.getAttributeValue("relationType");
				InfoXmlConnection xmlCon = new InfoXmlConnection(type, targetType, targetOid, targetRole, relationType);
				xmlFig.addChild(xmlCon);
			}
		}
	}

	@SuppressWarnings("unchecked")
	private InfoFigureParameter figure(Element currFigure) {
		InfoFigureParameter result = null;
		float x = 0;
		float y = 0;
		float width = 0;
		float height = 0;
		String diagramid = ((Element) currFigure).getAttributeValue("id");
		String xString = ((Element) currFigure).getAttributeValue("PositionX");
		if(xString != null)
			x = Float.parseFloat(xString);
		String yString = ((Element) currFigure).getAttributeValue("PositionY");
		if (yString != null)
			y = Float.parseFloat(yString);
		String widthString = ((Element) currFigure).getAttributeValue("Width");
		if (widthString != null)
			width = Float.parseFloat(widthString);
		String heightString = ((Element) currFigure).getAttributeValue("Height");
		if (heightString != null)
			height = Float.parseFloat(heightString);
		String alias = currFigure.getAttributeValue("Alias");
		EnumFigureType figtype = null;
		String label = null;
		String objectStatus = null;
		InfoFigureParameter fig = new InfoFigureParameter(x, y, width, height, figtype, label, diagramid, alias, objectStatus);

		
		List<Element> child = currFigure.getChildren();
		for (Element currChild : child) {
			String type = currChild.getName();
			String targetType = currChild.getAttributeValue("targetType");
			String targetOid = currChild.getAttributeValue("targetOid");
			String targetRole = currChild.getAttributeValue("targetRole");
			String relationType = currChild.getAttributeValue("relationType");
			InfoXmlConnection con = new InfoXmlConnection(type, targetType, targetOid, targetRole, relationType);
			fig.addChildX(con);
		}
		if (fig != null) {
			result = fig;
		}	
		return result;
	}
}