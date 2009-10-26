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

	// ////////////////////////////////////////////////////////////////////////////
//	public ArrayList<InfoFigureParameter> XML() {
//		String filename = xmlFilePath;
//		Document doc = null;
//		try {
//			doc = new SAXBuilder().build(filename);
//		} catch (JDOMException e) {
//			e.printStackTrace();
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//
//		// get Root Element
//		Element CwmExport = doc.getRootElement();
//		Element Model = CwmExport.getChild("Model");
//
//		// ReaderXmlDataDiagram(Model, 0);
//		findNode(Model, 0);
//
//		return null;
//	}

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

		// ReaderXmlDataDiagram(Model, 0);
		findNode(Model, 0);

		return null;
	}

	@SuppressWarnings("unchecked")
	void findNode(Element element, int level) {
		Element child = null;
		List<Element> children = element.getChildren();

		if (element.getName().equals("Diagram")) {
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
		int id = Integer.parseInt(element.getAttributeValue("id"));
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
			int id = Integer.parseInt(element.getAttributeValue("id"));
			String alias = element.getAttributeValue("Alias");
			String name = element.getAttributeValue("Name");
			EnumFigureType typ = elem.getType();
			InfoXmlFigure xmlFig = new InfoXmlFigure(id, name, typ, alias);
			svg.addXmlFigure(xmlFig);

			if (point.equals("ChiBusinessUseCase")) {
				List<Element> activitySet = element.getChildren();
				for (Element currActSet : activitySet) {
					if (currActSet.getName().equals("ActivitySet")) {
						elem = ElementDiagram.getCatalogEntryByName(point);
						// collect and add the important parameters
						int idActSet = Integer.parseInt(currActSet.getAttributeValue("id"));
						String aliasActSet = element.getAttributeValue("Alias");
						String nameActSet = currActSet.getName();
						EnumFigureType typActSet = elem.getType();
						InfoXmlFigure xmlFigActSet = new InfoXmlFigure(idActSet, nameActSet, typActSet, aliasActSet);
						xmlFig.addChildFig(xmlFigActSet);

						List<Element> activity = currActSet.getChildren();
						for (Element currAct : activity) {
							point = element.getName();

							elem = ElementDiagram.getCatalogEntryByName(point);
							if (elem != null) {
								int idAct = Integer.parseInt(currActSet.getAttributeValue("id"));
								String aliasAct = element.getAttributeValue("Alias");
								String nameAct = currActSet.getName();
								EnumFigureType typAct = elem.getType();
								InfoXmlFigure xmlFigAct = new InfoXmlFigure(idAct, nameAct, typAct, aliasAct);
								xmlFigActSet.addChildFig(xmlFigAct);

								List<Element> child = currAct.getChildren();
								for (Element currChild : child) {
									String type = currChild.getName();
									String targetType = currActSet.getAttributeValue("targetType");
									String targetOidString = currActSet.getAttributeValue("targetOid");
									int targetOid = 0;
									if (targetOidString != null) {
										targetOid = Integer.parseInt(targetOidString);
									}
									String targetRole = currActSet.getAttributeValue("targetRole");
									InfoXmlConnection xmlCon = new InfoXmlConnection(type, targetType, targetOid, targetRole);
									xmlFigAct.addChild(xmlCon);
								}
							}
						}
					}
				}
			}
			if (point.equals("ChiController")) {
				List<Element> chiController = element.getChildren();
				for (Element currChiController : chiController) {
					if (currChiController.getName().equals("Operation")) {
						
						int idOptVal = Integer.parseInt(element.getAttributeValue("id"));
						String aliasOptVal = currChiController.getAttributeValue("Alias");
						String nameOptVal = currChiController.getAttributeValue("Name");
						String typOptVal = currChiController.getName();
						InfoXMLOptionValue xmlFigOpt = new InfoXMLOptionValue(idOptVal, nameOptVal, typOptVal, aliasOptVal);
						xmlFig.addChildOpt(xmlFigOpt);
												
						List<Element> chiControllerParent = currChiController.getChildren();
						for (Element currChiControllerParent : chiControllerParent) {
							String type = currChiControllerParent.getName();
							String targetType = currChiControllerParent.getAttributeValue("targetType");
							String a = currChiControllerParent.getAttributeValue("targetOid");
							int targetOid = 0;
							if (a != null) {
								targetOid = Integer.parseInt(a);
							}
							String targetRole = currChiControllerParent.getAttributeValue("targetRole");
							InfoXmlConnection xmlCon = new InfoXmlConnection(type, targetType, targetOid, targetRole);
							xmlFigOpt.addChild(xmlCon);
						}
					} else {
						String type = currChiController.getName();
						String targetType = currChiController.getAttributeValue("targetType");
						String targetOidString = currChiController.getAttributeValue("targetOid");
						int targetOid = 0;
						if (targetOidString != null) {
							targetOid = Integer.parseInt(targetOidString);
						}
						String targetRole = currChiController.getAttributeValue("targetRole");
						InfoXmlConnection xmlCon = new InfoXmlConnection(type, targetType, targetOid, targetRole);
						xmlFig.addChild(xmlCon);
					}
				}
			}
			if (point.equals("ChiNode")) {
				List<Element> chiNode = element.getChildren();
				for (Element currChiNode : chiNode) {
					if (currChiNode.getName().equals("ChiValue")) {
						int idOptVal = Integer.parseInt(element.getAttributeValue("id"));
						String aliasOptVal = currChiNode.getAttributeValue("Alias");
						String nameOptVal = currChiNode.getAttributeValue("Name");
						String typOptVal = currChiNode.getName();
						InfoXMLOptionValue xmlFigOptVal = new InfoXMLOptionValue(idOptVal, nameOptVal, typOptVal, aliasOptVal);
						xmlFig.addChildValNo(xmlFigOptVal);
						List<Element> chiControllerParent = currChiNode.getChildren();
						for (Element currChiControllerParent : chiControllerParent) {
							String type = currChiControllerParent.getName();
							String targetType = currChiControllerParent.getAttributeValue("targetType");
							String a = currChiControllerParent.getAttributeValue("targetOid");
							int targetOid = 0;
							if (a != null) {
								targetOid = Integer.parseInt(a);
							}
							String targetRole = currChiControllerParent.getAttributeValue("targetRole");
							InfoXmlConnection xmlCon = new InfoXmlConnection(type, targetType, targetOid, targetRole);
							xmlFigOptVal.addChild(xmlCon);
						}
					}else if (currChiNode.getName().equals("Operation")) {
						int idOptVal = Integer.parseInt(element.getAttributeValue("id"));
						String aliasOptVal = currChiNode.getAttributeValue("Alias");
						String nameOptVal = currChiNode.getAttributeValue("Name");
						String typOptVal = currChiNode.getName();
						InfoXMLOptionValue xmlFigOptVal = new InfoXMLOptionValue(idOptVal, nameOptVal, typOptVal, aliasOptVal);
						xmlFig.addChildOptNo(xmlFigOptVal);
						List<Element> chiControllerParent = currChiNode.getChildren();
						for (Element currChiControllerParent : chiControllerParent) {
							String type = currChiControllerParent.getName();
							String targetType = currChiControllerParent.getAttributeValue("targetType");
							String a = currChiControllerParent.getAttributeValue("targetOid");
							int targetOid = 0;
							if (a != null) {
								targetOid = Integer.parseInt(a);
							}
							String targetRole = currChiControllerParent.getAttributeValue("targetRole");
							InfoXmlConnection xmlCon = new InfoXmlConnection(type, targetType, targetOid, targetRole);
							xmlFigOptVal.addChild(xmlCon);
						}
					}
					
					else {
						String type = currChiNode.getName();
						String targetType = currChiNode.getAttributeValue("targetType");
						String targetOidString = currChiNode.getAttributeValue("targetOid");
						int targetOid = 0;
						if (targetOidString != null) {
							targetOid = Integer.parseInt(targetOidString);
						}
						String targetRole = currChiNode.getAttributeValue("targetRole");
						InfoXmlConnection xmlCon = new InfoXmlConnection(type, targetType, targetOid, targetRole);
						xmlFig.addChild(xmlCon);
					}
				}
			}
			List<Element> childr = element.getChildren();
			for (Element currChild : childr) {
				String type = currChild.getName();
				String targetType = currChild.getAttributeValue("targetType");
				String a = currChild.getAttributeValue("targetOid");
				int targetOid = 0;
				if (a != null) {
					targetOid = Integer.parseInt(a);
				}
				String targetRole = currChild.getAttributeValue("targetRole");
				InfoXmlConnection xmlCon = new InfoXmlConnection(type, targetType, targetOid, targetRole);
				xmlFig.addChild(xmlCon);
			}
		}
	}

	@SuppressWarnings("unchecked")
	private InfoFigureParameter figure(Element currFigure) {
		InfoFigureParameter result = null;
		int diagramid = Integer.parseInt(((Element) currFigure).getAttributeValue("id"));
		float x = Float.parseFloat(((Element) currFigure).getAttributeValue("PositionX"));
		float y = Float.parseFloat(((Element) currFigure).getAttributeValue("PositionY"));
		float width = Float.parseFloat(((Element) currFigure).getAttributeValue("Width"));
		float height = Float.parseFloat(((Element) currFigure).getAttributeValue("Height"));
		String alias = currFigure.getAttributeValue("Alias");
		EnumFigureType figtype = null;
		String label = null;
		InfoFigureParameter fig = new InfoFigureParameter(x, y, width, height, figtype, label, diagramid, alias);

		List<Element> child = currFigure.getChildren();
		for (Element currChild : child) {
			String type = currChild.getAttributeValue("name");
			String targetType = currChild.getAttributeValue("targetType");
			int targetOid = Integer.parseInt(currChild.getAttributeValue("targetOid"));
			String targetRole = currChild.getAttributeValue("targetRole");
			InfoXmlConnection con = new InfoXmlConnection(type, targetType, targetOid, targetRole);
			fig.addChildX(con);
		}
		if (fig != null) {
			result = fig;
		}

		return result;
	}
}