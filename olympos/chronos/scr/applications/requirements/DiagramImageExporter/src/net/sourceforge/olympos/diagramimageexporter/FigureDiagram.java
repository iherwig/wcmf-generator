package net.sourceforge.olympos.diagramimageexporter;

import java.util.ArrayList;

public class FigureDiagram {
	SVGGenerator svg = new SVGGenerator();

	public InfoCoordinate PutFigElementsTogehter(ArrayList<InfoFigureParameter> figureArray) {
		ArrayList<InfoXmlDiagram> xmlDia = svg.getDiagram();
		ArrayList<InfoXmlFigure> xmlFig = svg.getxmlFigure();
		ArrayList<InfoXmlConnection> figChild = null;

		for (InfoXmlDiagram dia1 : xmlDia) {
			ArrayList<InfoFigureParameter> figure = dia1.getFigure();
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

				for (InfoXmlFigure xmlFig1 : xmlFig) {
					String xmlId = xmlFig1.getId();
					
					if (figId.equals(xmlId)) {
						currFig.setType(xmlFig1.getTyp());
						currFig.setLabel(xmlFig1.getName()); 
//						if
					}					
				}
				
				if (currFig.getType().equals(EnumFigureType.CHI_CONTROLLER)) {
					for (InfoXmlFigure currXmlFig : xmlFig) {
						String xmlId = currXmlFig.getId();
						if (figId.equals(xmlId)) {
							ArrayList<InfoXMLOptionValue> values = currXmlFig.getChildVal();
							for (InfoXMLOptionValue currValue : values) {
								currFig.addValue(currValue);
							}
						}
					}
				}
				if (currFig.getType().equals(EnumFigureType.CHI_NODE)) {
					for (InfoXmlFigure currXmlFig : xmlFig) {
						String xmlId = currXmlFig.getId();
						if (figId.equals(xmlId)) {
							ArrayList<InfoXMLOptionValue> value = currXmlFig.getChildValNo();
							for (InfoXMLOptionValue currXMLValue : value) {
								if (currXMLValue.getTyp().equals("ChiValue"))
									currFig.addValue(currXMLValue);
							}
							ArrayList<InfoXMLOptionValue> op = currXmlFig.getChildOptNo();
							for (InfoXMLOptionValue currXmlOp : op) {
								if (currXmlOp.getTyp().equals("Operation"))
									currFig.addOperation(currXmlOp);
							}
						}
					}
				}
			}
			for (InfoFigureParameter currNoElement : noElement) {
				dia1.removeFigure(currNoElement); // remove all File has only
				// the Child Element
			}
		}

		addChild(xmlFig, xmlDia);
		InfoCoordinate maxCor = setSize(figureArray);
		// addOptionValue(xmlDia, xmlFig);
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

				String typeXmlFigure = null;
				String targetOidXmlFigure = null;

				ArrayList<InfoXmlConnection> figChild = currFig.getChildrenX();
				for (InfoXmlConnection currFigChild : figChild) {
					if (!currFigChild.getTargetType().equals("Diagram")) {
						typFigure = currFigChild.getType();
						targetOidObject = currFigChild.getTargetOid();
						for (InfoXmlFigure currXmlFig : xmlFig) {
							ArrayList<InfoXmlConnection> xmlFigChild = currXmlFig.getChildren();
							if (currXmlFig.getId().equals(targetOidObject)) {
								for (InfoXmlConnection currXmlFigChild2 : xmlFigChild) {
									if(currXmlFigChild2.getType().equals("ActivitySet")){
										
									}
									else{
										if (!currXmlFigChild2.getTargetType().equals("Figure") && !currXmlFigChild2.getTargetType().equals("Package")) {
											String targetOid = currXmlFigChild2.getTargetOid();
											for (InfoXmlFigure currxmlFig2 : xmlFig) {
												if (currxmlFig2.getId().equals(targetOid)) {
													ArrayList<InfoXmlConnection> xmlFigChild2 = currxmlFig2.getChildren();
													for (InfoXmlConnection currxmlFig3 : xmlFigChild2) {
														if (currxmlFig3.getTargetType().equals("Figure")){
															targetOidXmlFigure = currxmlFig3.getTargetOid();
															addChildren(idFigure, targetOidXmlFigure,typFigure);
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

	private void addChildren(String figId, String figId2, String typ) {
		ArrayList<InfoXmlDiagram> dia = svg.getDiagram();
		for (InfoXmlDiagram currDia : dia) {
			ArrayList<InfoFigureParameter> figure = currDia.getFigure();
			for (InfoFigureParameter currFig1 : figure) {
				if (currFig1.getDiagramid().equals(figId)) {
					for (InfoFigureParameter currFig2 : figure) {
						if (currFig2.getDiagramid().equals(figId2)) {
							if (typ.equals("Child")) {
								currFig2.addChild(currFig1);
							} else if (typ.equals("Parent")) {
								currFig1.addChild(currFig2);
							} else if (typ.equals("ManyToMany")) {
								currFig2.addChild(currFig1);
							} else {

							}
						}
					}
				}
			}
		}
	}

	// set the size of the image
	private InfoCoordinate setSize(ArrayList<InfoFigureParameter> figureArray) {
		// // put the Elements of Diagram into an arraylist
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
			fig.setX(fig.getX() - minCor.getX() + 20);
			fig.setY(fig.getY() - minCor.getY() + 20);
		}
		maxCor.setAll(maxCor.getX() - minCor.getX() + 40, maxCor.getY() - minCor.getY() + 40);
		return maxCor;
		// }
	}

	private void addOptionValue(ArrayList<InfoXmlDiagram> xmlDia, ArrayList<InfoXmlFigure> xmlFig) {
		for (InfoXmlDiagram currDia : xmlDia) {
			ArrayList<InfoFigureParameter> figures = currDia.getFigure();
			for (InfoFigureParameter currFig : figures) {
				if (currFig.getType().equals(EnumFigureType.CHI_CONTROLLER)) {
					String aliasFig = currFig.getAlias();
					for (InfoXmlFigure currXmlFig : xmlFig) {
						if (currXmlFig.getTyp().equals(EnumFigureType.CHI_CONTROLLER) && currXmlFig.getAlias().equals(aliasFig)) {
							ArrayList<InfoXMLOptionValue> values = currXmlFig.getChildOpt();
							for (InfoXMLOptionValue currValue : values) {
								currFig.addValue(currValue);
							}
						}
					}
				}
				if (currFig.getType().equals(EnumFigureType.CHI_NODE)) {
					String aliasFig = currFig.getAlias();
					for (InfoXmlFigure currXmlFig : xmlFig) {
						if (currXmlFig.getTyp().equals(EnumFigureType.CHI_NODE) && currXmlFig.getAlias().equals(aliasFig)) {
							ArrayList<InfoXMLOptionValue> valuesOpt = currXmlFig.getChildOptNo();
							if (valuesOpt != null) {
								for (InfoXMLOptionValue currValueOpt : valuesOpt) {
									currFig.addValue(currValueOpt);
								}
							}
							ArrayList<InfoXMLOptionValue> valuesVal = currXmlFig.getChildVal();
							if (valuesVal != null) {
								for (InfoXMLOptionValue currValueVal : valuesVal) {
									currFig.addValue(currValueVal);
								}
							}
						}

					}
				}
			}
		}
	}
}
