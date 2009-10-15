package net.sourceforge.olympos.diagramimageexporter;

public class ConnectionExist {
	FigureParameter figSource;
	FigureParameter figTarget;
	
	ConnectionExist(FigureParameter figSource, FigureParameter figTarget){
		setAll(figSource, figTarget);
	}
	
	public FigureParameter getFigSource() {
		return figSource;
	}
	public void setFigSource(FigureParameter figSource) {
		this.figSource = figSource;
	}
	public FigureParameter getFigTarget() {
		return figTarget;
	}
	public void setFigTarget(FigureParameter figTarget) {
		this.figTarget = figTarget;
	}
	public void setAll(FigureParameter figSource, FigureParameter figTarget){
		this.figSource = figSource;
		this.figTarget = figTarget;
	}
}
