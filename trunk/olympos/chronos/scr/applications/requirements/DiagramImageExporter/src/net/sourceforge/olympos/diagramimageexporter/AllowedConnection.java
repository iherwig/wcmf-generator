
package net.sourceforge.olympos.diagramimageexporter;


//The Object for the Hashtable in ElementDiagram

public class AllowedConnection{

	String lineLabel;
	EnumConnectionEnd sourceConnectionArrow;
	EnumConnectionEnd targetConnectionArrow;	
	
	AllowedConnection (String lineLabel, EnumConnectionEnd connectionSource,EnumConnectionEnd connectionEnd){
		this.lineLabel = lineLabel;
		this.sourceConnectionArrow = connectionSource;
		this.targetConnectionArrow = connectionEnd;
	}
	
	public void setLineLabel(String lineLabel) {
		this.lineLabel = lineLabel;
	}
	public void setSourceConnectionArrow(EnumConnectionEnd sourceConnectionArrow) {
		this.sourceConnectionArrow = sourceConnectionArrow;
	}
	public void setTargetConnectionArrow(EnumConnectionEnd targetConnectionArrow) {
		this.targetConnectionArrow = targetConnectionArrow;
	}
	
	public String getLineLabel() {
		return lineLabel;
	}
	public EnumConnectionEnd getSourceConnectionArrow() {
		return sourceConnectionArrow;
	}
	public EnumConnectionEnd getTargetConnectionArrow() {
		return targetConnectionArrow;
	}
}