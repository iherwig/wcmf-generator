
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
	public String getLineLabel() {
		return lineLabel;
	}
	public EnumConnectionEnd getSourceConnectionArrow() {
		return sourceConnectionArrow;
	}
	public EnumConnectionEnd getTargetConnectionArrow() {
		return targetConnectionArrow;
	}
	public AllowedConnection() {
		// TODO Auto-generated constructor stub
	}
}