package net.sourceforge.olympos.diagramimageexporter;

import java.util.ArrayList;

public class FigureDiagram {
	SVGGenerator svg = new SVGGenerator();

	public InfoCoordinate PutFigElementsTogehter(ArrayList<InfoFigureParameter> figureArray) {
		ArrayList<InfoXmlDiagram> xmlDia = svg.getDiagram();
		ArrayList<InfoXmlFigure> xmlFig = svg.getxmlFigure();

		for (InfoXmlDiagram dia1 : xmlDia) {
			ArrayList<InfoFigureParameter> figure = dia1.getFigure();
			for (InfoFigureParameter currFig : figure) {
				String figAlias = currFig.getAlias();
				for (InfoXmlFigure xmlFig1 : xmlFig) {
					String xmlAlias = xmlFig1.getAlias();
					if (figAlias.equals(xmlAlias)) {
						currFig.setType(xmlFig1.getTyp());
						currFig.setLabel(xmlFig1.getName());
					}
				}
				if (currFig.getType().equals(EnumFigureType.CHI_CONTROLLER)) {
					for (InfoXmlFigure currXmlFig : xmlFig) {
						String xmlAlias = currXmlFig.getAlias();
						if (figAlias.endsWith(xmlAlias)) {
							ArrayList<InfoXMLOptionValue> values = currXmlFig.getChildVal();
							for (InfoXMLOptionValue currValue : values) {
								currFig.addValue(currValue);
							}

						}
					}
				}
				if (currFig.getType().equals(EnumFigureType.CHI_NODE)) {
					for (InfoXmlFigure currXmlFig : xmlFig) {
						String xmlAlias = currXmlFig.getAlias();
						if (figAlias.endsWith(xmlAlias)) {
							ArrayList<InfoXMLOptionValue> value = currXmlFig.getChildValNo();
							for (InfoXMLOptionValue currXMLValue : value) {
								if(currXMLValue.getTyp().equals("ChiValue"))
								currFig.addValue(currXMLValue);
							}
							ArrayList<InfoXMLOptionValue> op = currXmlFig.getChildOptNo();
							for (InfoXMLOptionValue currXmlOp : op) {
								if(currXmlOp.getTyp().equals("Operation"))
								currFig.addOperation(currXmlOp);
							}
						}
					}
				}
			}
		}
		addChild(xmlFig);
		InfoCoordinate maxCor = setSize(figureArray);
		addOptionValue(xmlDia, xmlFig);
		return maxCor;
	}

	private void addChild(ArrayList<InfoXmlFigure> xmlFig) {
		String typ = null;
		

		for (InfoXmlFigure currXmlFig1 : xmlFig) {
			int id1 = currXmlFig1.getId();
			String alias1 = currXmlFig1.getAlias();		
			for (InfoXmlFigure currXmlFig2 : xmlFig) {
				String alias2 = currXmlFig2.getAlias();
				ArrayList<InfoXmlConnection> xmlFigCon = currXmlFig2.getChildren();
				for (InfoXmlConnection currXmlFigCon : xmlFigCon) {
					if (currXmlFigCon.getTargetOid() == id1) {
						typ = currXmlFigCon.getType();
						addChildren(alias1, alias2, typ);
					}
				}
			}
		}
	}

	private void addChildren(String alias1, String alias2, String typ) {
		ArrayList<InfoXmlDiagram> dia = svg.getDiagram();
		for (InfoXmlDiagram currDia : dia) {
			ArrayList<InfoFigureParameter> figure = currDia.getFigure();
			for (InfoFigureParameter currFig1 : figure) {
				if (currFig1.getAlias().equals(alias1)) {
					for (InfoFigureParameter currFig2 : figure) {
						if (currFig2.getAlias().equals(alias2)) {
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
	private InfoCoordinate setSize(ArrayList<InfoFigureParameter>figureArray) {
//		// put the Elements of Diagram into an arraylist
//		ArrayList<InfoXmlDiagram> xmlDia = svg.getDiagram();
//
//		// do for all diagram
//		for (InfoXmlDiagram dia1 : xmlDia) {
//			// put all elements of Figure of Diagram into figArray
//			ArrayList<InfoFigureParameter> figureArray = dia1.getFigure();
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
				if(fig.getX()+fig.getWidth() > maxCor.getX()){
					maxCor.setX(fig.getX()+fig.getWidth());
				}
				if(fig.getY()+fig.getHeight() > maxCor.getY()){
					maxCor.setY(fig.getY()+fig.getHeight());
				}
			}

			// subtract minCor to all of the figure
			for (InfoFigureParameter fig : figureArray) {
				fig.setX(fig.getX() - minCor.getX());
				fig.setY(fig.getY() - minCor.getY());
			}
			maxCor.setAll(maxCor.getX()-minCor.getX()+10 , maxCor.getY()-minCor.getY()+10);
			return maxCor;
//		}
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
