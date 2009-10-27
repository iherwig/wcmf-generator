package net.sourceforge.olympos.diagramimageexporter;

import java.util.ArrayList;

//in this class are all important information which has to the read out of the XML-File
// parameter + get & set
public class InfoXmlDiagram {
	ArrayList<InfoFigureParameter> figure = new ArrayList<InfoFigureParameter>();
	int id;
	String alias;
	
	InfoXmlDiagram(int id,String alias){
		setAlias(alias);
		setId(id);
	}
	
	public String getAlias() {
		return alias;
	}
	public void setAlias(String alias) {
		this.alias = alias;
	}
	public ArrayList<InfoFigureParameter> getFigure() {
		return figure;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void addFigure (InfoFigureParameter figureParameter){
		figure.add(figureParameter);
	}

	public int getId() {
		return id;
	}
}
