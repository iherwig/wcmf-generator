
package net.sourceforge.olympos.diagramimageexporter;


//The Object for the Hashtable in ElementDiagram

public class InfoAllowedConnection{
	String lineLabel;
	EnumConnectionEnd sourceConnectionArrow;
	EnumConnectionEnd targetConnectionArrow;	
	
	InfoAllowedConnection (String lineLabel, EnumConnectionEnd connectionSource,EnumConnectionEnd connectionEnd){
		this.lineLabel = lineLabel;
		this.sourceConnectionArrow = connectionSource;
		this.targetConnectionArrow = connectionEnd;
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
	public InfoAllowedConnection() {
		// TODO Auto-generated constructor stub
	}
}