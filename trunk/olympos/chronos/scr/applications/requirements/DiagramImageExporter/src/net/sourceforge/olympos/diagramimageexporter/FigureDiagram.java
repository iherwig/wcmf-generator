package net.sourceforge.olympos.diagramimageexporter;

import java.util.ArrayList;

public class FigureDiagram {
	SVGGenerator svg = new SVGGenerator();

	public InfoCoordinate PutFigElementsTogehter(ArrayList<InfoFigureParameter> figureArray) {
		ArrayList<InfoXmlDiagram> xmlDia = svg.getDiagram();
		ArrayList<InfoXmlFigure> xmlFig = svg.getxmlFigure();
		
		ArrayList<InfoXmlConnection> figChild = null;

		for (InfoXmlDiagram dia1 : xmlDia) {
			ArrayList<InfoFigureParameter> figure =figureArray;
			ArrayList<InfoFigureParameter> noElement = new ArrayList<InfoFigureParameter>();
			for (InfoFigureParameter currFig : figure) {
				figChild = currFig.getChildrenX();
				String figId = null;

				for (InfoXmlConnection currFigChild : figChild) {
					if (!currFigChild.getTargetType().equals("Diagram")) {
						figId = currFigChild.getTargetOid();
					}
				}
				if (figId == null) {
					noElement.add(currFig);
					continue;
				}
				
				for (InfoXmlFigure currXmlFig1 : xmlFig) {
					String xmlId = currXmlFig1.getId();

					if (figId.equals(xmlId)) {
						currFig.setType(currXmlFig1.getTyp());
						currFig.setLabel(currXmlFig1.getName());
						currFig.setObjectStatus(currXmlFig1.getObject_status());
						
						ArrayList<InfoXmlConnection> con = currXmlFig1.getChild();
						
						for(InfoXmlConnection currCon : con){
							if(currCon.getType().equals("ManyToMany"))
								currFig.setRelationType(currCon.getRelationType());
						}
						
					}
				}
				if (currFig.getLabel() == null) {
					currFig.setType(EnumFigureType.DUMMY);
					currFig.setLabel("Dummy");
				}
				if (currFig.getType().equals(EnumFigureType.CHI_CONTROLLER)){
					for (InfoXmlFigure currXmlFig : xmlFig) {
						if(currXmlFig.getId().equals(figId)){
							ArrayList<InfoXMLOptionValue> values = currXmlFig.getOperation();
							for (InfoXMLOptionValue currValue : values) {
								currFig.addOperation(currValue);
							}
						}
					}
				}
				if (currFig.getType().equals(EnumFigureType.CHI_SYSTEM)){
					for (InfoXmlFigure currXmlFig : xmlFig) {
						if(currXmlFig.getId().equals(figId)){
							ArrayList<InfoXMLOptionValue> attrib = currXmlFig.getAttribute();
							for (InfoXMLOptionValue currAttrib : attrib) {
								currFig.addAttribut(currAttrib);
							}
						}
					}
				}
				if (currFig.getType().equals(EnumFigureType.CHI_NODE)){
					for (InfoXmlFigure currXmlFig : xmlFig) {
						if(currXmlFig.getId().equals(figId)){
							ArrayList<InfoXMLOptionValue> opt = currXmlFig.getOperation();
							for (InfoXMLOptionValue currOpt : opt) {
								currFig.addOperation(currOpt);
							}
							ArrayList<InfoXMLOptionValue> attrib = currXmlFig.getAttribute();
							for (InfoXMLOptionValue currAttrib : attrib) {
								currFig.addAttribut(currAttrib);
							}
						}
					}
				}
				if (currFig.getType().equals(EnumFigureType.CHI_NODE_MANY_TO_MANY)){
					for (InfoXmlFigure currXmlFig : xmlFig) {
						if(currXmlFig.getId().equals(figId)){
							ArrayList<InfoXMLOptionValue> opt = currXmlFig.getOperation();
							for (InfoXMLOptionValue currOpt : opt) {
								currFig.addOperation(currOpt);
							}
							ArrayList<InfoXMLOptionValue> attrib = currXmlFig.getAttribute();
							for (InfoXMLOptionValue currAttrib : attrib) {
								currFig.addAttribut(currAttrib);
							}
						}
					}
				}
			}
			for (InfoFigureParameter currNoElement : noElement) {
				dia1.removeFigure(currNoElement); // remove all File has only
				// the Child Element Diagram
			}
		}

		addChild(xmlFig, xmlDia);
		InfoCoordinate maxCor = setSize(figureArray);
		return maxCor;
	}

	private void addChild(ArrayList<InfoXmlFigure> xmlFig, ArrayList<InfoXmlDiagram> xmlDia) {

		for (InfoXmlDiagram currDia : xmlDia) {
			String idFigure = null;

			ArrayList<InfoFigureParameter> figure = currDia.getFigure();
			for (InfoFigureParameter currFig : figure) {
				idFigure = currFig.getDiagramid();

				String typFigure = null;
				String targetOidObject = null;

//				String typeXmlFigure = null;
				String targetOidXmlFigure = null;

				ArrayList<InfoXmlConnection> figChild = currFig.getChildrenX();
				for (InfoXmlConnection currFigChild : figChild) {
					if (!currFigChild.getTargetType().equals("Diagram")) {
						typFigure = currFigChild.getType();
						targetOidObject = currFigChild.getTargetOid();
						for (InfoXmlFigure currXmlFig : xmlFig) {
							ArrayList<InfoXmlConnection> xmlFigChild = currXmlFig.getChild();
							if (currXmlFig.getId().equals(targetOidObject)) {
								for (InfoXmlConnection currXmlFigChild2 : xmlFigChild) {
									if (currXmlFigChild2.getTargetType() != null) { //testing if targettyp is there
										if (!currXmlFigChild2.getTargetType().equals("Figure") && !currXmlFigChild2.getTargetType().equals("Package")) {
											String targetOid = currXmlFigChild2.getTargetOid();
											if (targetOid != null) {
												for (InfoXmlFigure currxmlFig2 : xmlFig) {
													if (currxmlFig2.getId().equals(targetOid)) {
														ArrayList<InfoXmlConnection> xmlFigChild2 = currxmlFig2.getChild();
														for (InfoXmlConnection currxmlFig3 : xmlFigChild2) {
															if (currxmlFig3.getTargetType() != null) {
															if (currxmlFig3.getTargetType().equals("Figure")) {
																targetOidXmlFigure = currxmlFig3.getTargetOid();
																	addChildren(idFigure, targetOidXmlFigure, typFigure);
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		svg.xmlFigNull();
	}

	private void addChildren(String figId, String figId2, String typ) {
		ArrayList<InfoXmlDiagram> dia = svg.getDiagram();
		for (InfoXmlDiagram currDia : dia) {
			ArrayList<InfoFigureParameter> figure = currDia.getFigure();
			for (InfoFigureParameter currFig1 : figure) {
				if (currFig1.getDiagramid().equals(figId)) {
					for (InfoFigureParameter currFig2 : figure) {
						if (currFig2.getDiagramid().equals(figId2)) {
							if (typ.equals("Parent")) {
								currFig1.addChild(currFig2);
							}
//							else if (typ.equals("Child")) {
//								currFig2.addChild(currFig1);
//							} 
							else if (typ.equals("ManyToMany")) {
								currFig2.addChild(currFig1);
							} 
							else {

							}
						}
					}
				}
			}
		}
	}

	// set the size of the image
	private InfoCoordinate setSize(ArrayList<InfoFigureParameter> figureArray) {
		// put the Elements of Diagram into an arraylist
		// ArrayList<InfoXmlDiagram> xmlDia = svg.getDiagram();
		//
		InfoCoordinate minCor = new InfoCoordinate(0, 0);
		InfoCoordinate maxCor = new InfoCoordinate(0, 0);

		// take the parameter of the first element
		InfoFigureParameter fig0 = figureArray.get(0);
		minCor.setAll(fig0.getX(), fig0.getX());
		maxCor.setAll(fig0.getX(), fig0.getY());

		// look for parameter which are smaller than minCor
		for (InfoFigureParameter fig : figureArray) {
			if (fig.getX() < minCor.getX()) {
				minCor.setX(fig.getX());
			}
			if (fig.getY() < minCor.getY()) {
				minCor.setY(fig.getY());
			}
			if (fig.getX() + fig.getWidth() > maxCor.getX()) {
				maxCor.setX(fig.getX() + fig.getWidth());
			}
			if (fig.getY() + fig.getHeight() > maxCor.getY()) {
				maxCor.setY(fig.getY() + fig.getHeight());
			}
		}

		// subtract minCor to all of the figure
		for (InfoFigureParameter fig : figureArray) {
			fig.setX(fig.getX() - minCor.getX() + 40);
			fig.setY(fig.getY() - minCor.getY() + 40);
		}
		maxCor.setAll(maxCor.getX() - minCor.getX() + 130, maxCor.getY() - minCor.getY() + 60);
		return maxCor;
	}
}
