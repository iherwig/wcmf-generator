//package net.sourceforge.olympos.diagramimageexporter;
//
//import java.util.ArrayList;
//
//public class FigureChildren {
//
//	public void addChildren(){
//		SVGGenerator gen = new SVGGenerator();
//		
//		ArrayList<InfoXmlDiagram> dia = new ArrayList<InfoXmlDiagram>();
//		ArrayList<InfoFigureParameter> fig = new ArrayList<InfoFigureParameter>();
//		ArrayList<InfoXmlConnection> xmlChildren1 = new ArrayList<InfoXmlConnection>();
//		ArrayList<InfoXmlFigure> xmlFig = new ArrayList<InfoXmlFigure>();
//		
//		dia = gen.getDiagram();
//		
//		//got through all diagrams
//		for( InfoXmlDiagram currDia : dia){
//			fig = currDia.getFigure();
//			//go by diagram trough all figures
//			for(InfoFigureParameter currFig : fig){
//				xmlChildren1 = currFig.getChildrenX();
//				//look there for all XmlChildren
//				for(InfoXmlConnection child1 : xmlChildren1){
//					//if children is not Diagram save this XmlFigure in xmlFig
//					if (!child1.targetType.equals("Diagram")){
//						xmlFig = gen.getxmlFigure();
//						// test all xmlFig and fig in their Arraylist for same ID's
//						for(InfoXmlFigure currXmlFig : xmlFig){
//							for(InfoFigureParameter currFig2 : fig){
//								if(currXmlFig.getId() == currFig2.getDiagramid()){
//									currFig.addChild(currFig2);
//								}
//							}
//
//						}
//					}
//				}
//			}
//		}	
//	}
//}