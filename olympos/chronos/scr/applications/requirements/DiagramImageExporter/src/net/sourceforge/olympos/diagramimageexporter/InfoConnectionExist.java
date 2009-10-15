package net.sourceforge.olympos.diagramimageexporter;

public class InfoConnectionExist {
	InfoFigureParameter figSource;
	InfoFigureParameter figTarget;
	
	InfoConnectionExist(InfoFigureParameter figSource, InfoFigureParameter figTarget){
		setAll(figSource, figTarget);
	}
	
	public InfoFigureParameter getFigSource() {
		return figSource;
	}
	public void setFigSource(InfoFigureParameter figSource) {
		this.figSource = figSource;
	}
	public InfoFigureParameter getFigTarget() {
		return figTarget;
	}
	public void setFigTarget(InfoFigureParameter figTarget) {
		this.figTarget = figTarget;
	}
	public void setAll(InfoFigureParameter figSource, InfoFigureParameter figTarget){
		this.figSource = figSource;
		this.figTarget = figTarget;
	}
}
