package net.sourceforge.olympos.diagramimageexporter;

import java.util.ArrayList;

public class InfoUsedCon {
	String sourceFigId;
	String tagretFigId;

	public static ArrayList<InfoUsedCon> connect;
	
	InfoUsedCon(String sourceFigId, String tagretFigId){
		setAll(sourceFigId, tagretFigId);
	}
	
	public String getSourceFigId() {
		return sourceFigId;
	}

	public void setSourceFigId(String sourceFigId) {
		this.sourceFigId = sourceFigId;
	}

	public String getTagretFigId() {
		return tagretFigId;
	}

	public void setTagretFigId(String tagretFigId) {
		this.tagretFigId = tagretFigId;
	}
	public void setAll(String sourceFigId,String tagretFigId){
		this.sourceFigId = sourceFigId;
		this.tagretFigId = tagretFigId;
	}
}
