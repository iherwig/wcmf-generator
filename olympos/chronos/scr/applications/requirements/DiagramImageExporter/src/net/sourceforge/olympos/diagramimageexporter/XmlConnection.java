package net.sourceforge.olympos.diagramimageexporter;

//in this class you will find all importen information of the Children of the Figure or Nodes
//parameter & get set
public class XmlConnection {
	
	String type;
	String targetType;
	int targetOid;
	String targetRole;
	
	XmlConnection( String type, String targetType,int targetOid , String targetRole){
		setAll(targetType, type, targetOid, targetRole);
	}
	
	public String getTargetRole() {
		return targetRole;
	}
	
	public void setTargetRole(String targetRole) {
		this.targetRole = targetRole;
	}
	
	public String getTargetType() {
		return targetType;
	}
	
	public void setTargetType(String targetType) {
		this.targetType = targetType;
	}
	
	public String getType() {
		return type;
	}
	
	public void setType(String type) {
		this.type = type;
	}
	
	public int getTargetOid() {
		return targetOid;
	}
	
	public void setTargetOid(int targetOid) {
		this.targetOid = targetOid;
	}
	
	public void setAll(String targetType, String type,int targetOid , String targetRole){
		this.targetType = targetType;
		this.type = type;
		this.targetOid = targetOid;
		this.targetRole = targetRole;
	}
}