package net.sourceforge.olympos.diagramimageexporter;

import java.util.ArrayList;

public class FigureDiagram {
	SVGGenerator svg = new SVGGenerator();
	
	public void PutFigElementsTogehter(){
		ArrayList<InfoXmlDiagram> xmlDia = svg.getDiagram();
		ArrayList<InfoXmlFigure> xmlFig = svg.getxmlFigure();
		
		for (InfoXmlDiagram dia1 : xmlDia) {
			ArrayList<InfoFigureParameter> figure = dia1.getFigure();
				for (InfoFigureParameter currFig : figure) {
					String figAlias = currFig.getAlias();
					for(InfoXmlFigure xmlFig1 : xmlFig){
						String xmlAlias = xmlFig1.getAlias();
						if(figAlias.endsWith(xmlAlias)){
							currFig.setType(xmlFig1.getTyp());
							currFig.setLabel(xmlFig1.getName());
						}
					}
				}
		}
		addChild(xmlFig);
		setSize();
	}
	
	private void addChild(ArrayList<InfoXmlFigure> xmlFig) {
		String typ = null;
		
		for(InfoXmlFigure currXmlFig1 : xmlFig){
			int id1 = currXmlFig1.getId();
			String alias1 = currXmlFig1.getAlias();
			for(InfoXmlFigure currXmlFig2 : xmlFig){
				String alias2 = currXmlFig2.getAlias();
				ArrayList<InfoXmlConnection> xmlFigCon = currXmlFig2.getChildren();
				for (InfoXmlConnection currXmlFigCon : xmlFigCon){
					if(currXmlFigCon.getTargetOid() == id1){
						typ = currXmlFigCon.getType();
//						ParentChlid ParChi = new ParentChlid(alias1, alias2, typ);
						addChildren(alias1, alias2, typ);
					}
				}
			}
		}
		
	}

	private void addChildren(String alias1, String alias2, String typ) {
		ArrayList<InfoXmlDiagram> dia = svg.getDiagram();
		for (InfoXmlDiagram currDia : dia){
			ArrayList<InfoFigureParameter> figure = currDia.getFigure();
			for(InfoFigureParameter currFig1 : figure){
				if(currFig1.getAlias().equals(alias1)){
					for(InfoFigureParameter currFig2 : figure){
						if(currFig2.getAlias().equals(alias2)){
							if(typ.equals("Child")){
								currFig2.addChild(currFig1);
							}
							else if(typ.equals("Parent")){
								currFig1.addChild(currFig2);
							}						
							else if(typ.equals("ManyToMany")){
								currFig2.addChild(currFig1);
							}
							else{
								
							}
						}
					}
				}
			}
		}

	}

//	private void elseif(boolean equals) {
//		// TODO Auto-generated method stub
//		
//	}

	//set the size of the image
	private void setSize() {
		//put the Elements of Diagram into an arraylist
		ArrayList<InfoXmlDiagram> xmlDia = svg.getDiagram();
		
		//do for all diagram
		for (InfoXmlDiagram dia1 : xmlDia) {
			//put all elements of Figure of Diagram into figArray
			ArrayList<InfoFigureParameter> figureArray = dia1.getFigure();
			InfoCoordinate minCor = new InfoCoordinate(0, 0);
			
			//take the parameter of the first element
			InfoFigureParameter fig0 = figureArray.get(0);
			minCor.setAll(fig0.getX(), fig0.getX());		
			
			//look for parameter which are smaller than minCor
			for (InfoFigureParameter fig : figureArray) {
				if (fig.getX() < minCor.getX()) {
					minCor.setX(fig.getX());
				}
				if (fig.getY() < minCor.getY()) {
					minCor.setY(fig.getY());
				}
			}
			
			//subtract minCor to all of the figure
			for (InfoFigureParameter fig : figureArray) {
				fig.setX(fig.getX() - minCor.getX());
				fig.setY(fig.getY() - minCor.getY());
			}
		}
	}

}
