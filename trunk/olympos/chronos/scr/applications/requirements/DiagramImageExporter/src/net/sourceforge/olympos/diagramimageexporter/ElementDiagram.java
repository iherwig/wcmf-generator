package net.sourceforge.olympos.diagramimageexporter;

import java.util.HashMap;

public class ElementDiagram {
	private EnumFigureType type;
	private EnumFontPosition fontPosition;
	private String name;
	private String imagePath;
	private String typ;
	
	private final static String CONTAINS = "contains";
	private final static String NEGATED = "is negated by";
	private final static String SPECIFIED = "is specified by";
	private final static String REALIZED = "is realized by";
	private final static String REFINES = "is refined by";
	private final static String PARTICIPATES = "is participates by";
	private final static String GENERALISATION = "is generalisation by";
	private final static String INSTANTIATES = "instantiantes";
	private final static String ASSOCIATION = "association";
	
	private static String path; // "D:/Images/";
	
	private final static String chiRequirementFeature = "ChiRequirementFeature.PNG";
	private final static String chiRequirementIssu = "ChiRequirementIssue.PNG";
	private final static String chiRequirementGoal = "ChiRequirementGoal.PNG";
	private final static String chiRequirementChiRequirement = "ChiRequirement.PNG";
	private final static String chi = "Chi.PNG";
	private final static String operation = "ChiOperation.png";
	private final static String attribute = "ChiAttribute.png";
	
	private HashMap<EnumFigureType, InfoAllowedConnection> allowedConnection;
	private HashMap<String, InfoAllowedConnection> allowedConnectionByName;

	private static HashMap<EnumFigureType, ElementDiagram> catalog = new HashMap<EnumFigureType, ElementDiagram>();
	private static HashMap<String, ElementDiagram> catalogByName = new HashMap<String, ElementDiagram>();

	ElementDiagram(EnumFigureType type, String name, EnumFontPosition fontPosition, String imagePath,  HashMap<EnumFigureType, InfoAllowedConnection> connections) {
		this.type = type;
		this.name = name;
		this.fontPosition = fontPosition;
		this.imagePath = imagePath;
		this.allowedConnection = connections;
	}
	
	ElementDiagram(String typ, String name){
		this.typ = typ;
		this.name = name;
	}

	public ElementDiagram() {
	}


	public void path(String picturePath){
		path = picturePath;
	}
	
	public static void initCatalog( String picturePath ) {
		path = picturePath;

		addToCatalog(initChiGoal());
		addToCatalog(initRequirement());
		addToCatalog(initFeature());
		addToCatalog(initIssue());
		addToCatalog(initActivity());
		addToCatalog(initActivityDecision());
		addToCatalog(initActivityInitial());
		addToCatalog(initActiviReceive());
		addToCatalog(initActivity());
		addToCatalog(initActivityFinal());
		addToCatalog(initChiObject());
		addToCatalog(initChiBusiPartner());
		addToCatalog(initChiBusiPartnerActive());
		addToCatalog(initChiBusiPartnerPassive());
		addToCatalog(initChiBusiProcess());
		addToCatalog(initChiBusiUseCase());
		addToCatalog(initChiBusiUseCaseCore());
		addToCatalog(initChiController());
		addToCatalog(initChiNode());	
//		addToCatalog(initChiSys());
		addToCatalog(initChiView());
		addToCatalog(initChiWorker());
		addToCatalog(initChiWorkerExternal());
		addToCatalog(initChiWorkerInternal());
		
		addToCatalog(initOperation());
		addToCatalog(initAttribute());
	}

	private static void addToCatalog(ElementDiagram elem) {
		catalog.put(elem.getType(), elem);
		catalogByName.put(elem.getName(), elem);
	}
	
	////////////////////////////////////////////////////////////
	//Requirement
	private static ElementDiagram initIssue() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();
			
		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_ISSUE, "ChiIssue",EnumFontPosition.IN_UP , path + chiRequirementIssu, connections);
		return result;
	}

	private static ElementDiagram initFeature() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();
		
		connections.put(EnumFigureType.CHI_BUSINESS_USE_CASE, new InfoAllowedConnection(REFINES, EnumConnectionEnd.ARROW_TRIANGLE, EnumConnectionEnd.NONE));
		connections.put(EnumFigureType.CHI_BUSINESS_USE_CASE_CORE, new InfoAllowedConnection(REFINES, EnumConnectionEnd.ARROW_TRIANGLE, EnumConnectionEnd.NONE));
		connections.put(EnumFigureType.CHI_BUSINESS_PROCESS, new InfoAllowedConnection("???", EnumConnectionEnd.NONE, EnumConnectionEnd.NONE));
		connections.put(EnumFigureType.CHI_REQUIREMENT, new InfoAllowedConnection(REALIZED, EnumConnectionEnd.ARROW_TRIANGLE, EnumConnectionEnd.NONE));
		
		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_FEATURE, "ChiFeature", EnumFontPosition.IN_UP , path + chiRequirementFeature, connections);
		return result;
	}

	private static ElementDiagram initChiGoal() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();

		connections.put(EnumFigureType.CHI_GOAL, new InfoAllowedConnection(CONTAINS, EnumConnectionEnd.CLOSED_DIAMOND, EnumConnectionEnd.ARROW));
		connections.put(EnumFigureType.CHI_REQUIREMENT, new InfoAllowedConnection(SPECIFIED, EnumConnectionEnd.ARROW, EnumConnectionEnd.CLOSED_DIAMOND));
		
		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_GOAL, "ChiGoal", EnumFontPosition.IN_UP , path + chiRequirementGoal, connections);
		return result;
	}

	private static ElementDiagram initRequirement() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();

		connections.put(EnumFigureType.CHI_REQUIREMENT, new InfoAllowedConnection(CONTAINS, EnumConnectionEnd.CLOSED_DIAMOND, EnumConnectionEnd.ARROW));
		connections.put(EnumFigureType.CHI_FEATURE, new InfoAllowedConnection(REALIZED, EnumConnectionEnd.NONE, EnumConnectionEnd.ARROW_TRIANGLE));
		connections.put(EnumFigureType.CHI_ISSUE, new InfoAllowedConnection(NEGATED, EnumConnectionEnd.ARROW, EnumConnectionEnd.NONE));
		
		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_REQUIREMENT, "ChiRequirement", EnumFontPosition.IN_UP , path + chiRequirementChiRequirement, connections);// ???
		return result;
	}
	
	////////////////////////////////////////////////////////////
	//Use Case
	private static ElementDiagram initChiBusiUseCase() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();
		
		connections.put(EnumFigureType.CHI_BUSINESS_PROCESS, new InfoAllowedConnection(CONTAINS, EnumConnectionEnd.ARROW, EnumConnectionEnd.CLOSED_DIAMOND));
		connections.put(EnumFigureType.CHI_BUSINESS_PARTNER, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.NONE, EnumConnectionEnd.ARROW));
		connections.put(EnumFigureType.CHI_BUSINESS_PARTNER_ACTIVE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.NONE, EnumConnectionEnd.ARROW));
		connections.put(EnumFigureType.CHI_BUSINESS_PARTNER_PASSIVE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.NONE, EnumConnectionEnd.ARROW));
		connections.put(EnumFigureType.CHI_WORKER, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.NONE, EnumConnectionEnd.ARROW));
		connections.put(EnumFigureType.CHI_WORKER_INTERN, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.NONE, EnumConnectionEnd.ARROW));
		connections.put(EnumFigureType.CHI_WORKER_EXTERN, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.NONE, EnumConnectionEnd.ARROW));
		
		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_BUSINESS_USE_CASE, "ChiBusinessUseCase", EnumFontPosition.IN_CENTER , null , connections);
		return result;
	}

	private static ElementDiagram initChiBusiUseCaseCore() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();
		
		connections.put(EnumFigureType.CHI_BUSINESS_PROCESS, new InfoAllowedConnection(CONTAINS, EnumConnectionEnd.ARROW, EnumConnectionEnd.CLOSED_DIAMOND));
		connections.put(EnumFigureType.CHI_BUSINESS_PARTNER, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.NONE, EnumConnectionEnd.ARROW));
		connections.put(EnumFigureType.CHI_BUSINESS_PARTNER_ACTIVE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.NONE, EnumConnectionEnd.ARROW));
		connections.put(EnumFigureType.CHI_BUSINESS_PARTNER_PASSIVE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.NONE, EnumConnectionEnd.ARROW));
		connections.put(EnumFigureType.CHI_WORKER, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.NONE, EnumConnectionEnd.ARROW));
		connections.put(EnumFigureType.CHI_WORKER_INTERN, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.NONE, EnumConnectionEnd.ARROW));
		connections.put(EnumFigureType.CHI_WORKER_EXTERN, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.NONE, EnumConnectionEnd.ARROW));
		
		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_BUSINESS_USE_CASE_CORE, "ChiBusinessUseCaseCore", EnumFontPosition.IN_CENTER, null , connections);
		return result;
	}
	
	private static ElementDiagram initChiBusiPartnerPassive() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();

		connections.put(EnumFigureType.CHI_BUSINESS_PARTNER_PASSIVE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.ARROW, EnumConnectionEnd.NONE));
		connections.put(EnumFigureType.CHI_BUSINESS_USE_CASE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.ARROW, EnumConnectionEnd.NONE));
		connections.put(EnumFigureType.CHI_BUSINESS_USE_CASE_CORE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.ARROW, EnumConnectionEnd.NONE));
		
		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_BUSINESS_PARTNER_PASSIVE, "ChiBusinessPartnerPassive", EnumFontPosition.UNDER, path + chi , connections);
		return result;
	}

	private static ElementDiagram initChiBusiPartnerActive() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();
		
		connections.put(EnumFigureType.CHI_BUSINESS_PARTNER_ACTIVE, new InfoAllowedConnection(GENERALISATION, EnumConnectionEnd.ARROW_TRIANGLE, EnumConnectionEnd.NONE));
		connections.put(EnumFigureType.CHI_BUSINESS_USE_CASE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.ARROW, EnumConnectionEnd.NONE));
		connections.put(EnumFigureType.CHI_BUSINESS_USE_CASE_CORE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.ARROW, EnumConnectionEnd.NONE));
		
		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_BUSINESS_PARTNER_ACTIVE, "ChiBusinessPartnerActive",EnumFontPosition.UNDER, path + chi , connections);
		return result;
	}

	private static ElementDiagram initChiBusiPartner() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();
		
		connections.put(EnumFigureType.CHI_BUSINESS_USE_CASE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.ARROW, EnumConnectionEnd.NONE));
		connections.put(EnumFigureType.CHI_BUSINESS_USE_CASE_CORE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.ARROW, EnumConnectionEnd.NONE));

		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_BUSINESS_PARTNER, "ChiBusinessPartner",EnumFontPosition.UNDER, path + chi , connections);
		return result;
	}
	
	private static ElementDiagram initChiBusiProcess() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();

		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_BUSINESS_PROCESS, "ChiBusinessProcess", EnumFontPosition.IN_UP, null , connections);
		return result;
	}
	
	private static ElementDiagram initChiWorker() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();
		
		connections.put(EnumFigureType.CHI_BUSINESS_USE_CASE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.ARROW, EnumConnectionEnd.NONE));
		connections.put(EnumFigureType.CHI_BUSINESS_USE_CASE_CORE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.ARROW, EnumConnectionEnd.NONE));

		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_WORKER, "ChiWorker", EnumFontPosition.UNDER, path + chi , connections);
		return result;
	}
	
	private static ElementDiagram initChiWorkerInternal() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();
		
		connections.put(EnumFigureType.CHI_WORKER_INTERN, new InfoAllowedConnection(GENERALISATION, EnumConnectionEnd.ARROW_TRIANGLE, EnumConnectionEnd.NONE));
		connections.put(EnumFigureType.CHI_BUSINESS_USE_CASE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.ARROW, EnumConnectionEnd.NONE));
		connections.put(EnumFigureType.CHI_BUSINESS_USE_CASE_CORE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.ARROW, EnumConnectionEnd.NONE));
		
		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_WORKER_INTERN, "ChiWorkerInternal", EnumFontPosition.UNDER, path + chi , connections);
		return result;// ??
	}

	private static ElementDiagram initChiWorkerExternal() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();
		
		connections.put(EnumFigureType.CHI_WORKER_EXTERN, new InfoAllowedConnection(GENERALISATION, EnumConnectionEnd.ARROW_TRIANGLE, EnumConnectionEnd.NONE));
		connections.put(EnumFigureType.CHI_BUSINESS_USE_CASE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.ARROW, EnumConnectionEnd.NONE));
		connections.put(EnumFigureType.CHI_BUSINESS_USE_CASE_CORE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.ARROW, EnumConnectionEnd.NONE));
		
		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_WORKER_EXTERN, "ChiWorkerExternal", EnumFontPosition.UNDER, path + chi , connections);
		return result;
	}
	
	private static ElementDiagram initOperation(){
		
		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_OPERATION, "ChiOperation", null, path + operation , null);
		return result;
	}
	
	private static ElementDiagram initAttribute(){
		
		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_ATTRIBUTE, "ChiAttribute", null, path + attribute , null);
		return result;
	}


	
	////////////////////////////////////////////////////////////
	//New Domain
	private static ElementDiagram initChiView() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();

		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_VIEW, "ChiView", EnumFontPosition.IN_CENTER, path + chi , connections);
		return result;
	}
	
	private static ElementDiagram initChiController() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();
		
		connections.put(EnumFigureType.CHI_NODE, new InfoAllowedConnection(INSTANTIATES, EnumConnectionEnd.ARROW, EnumConnectionEnd.NONE));
		connections.put(EnumFigureType.CHI_CONTROLLER, new InfoAllowedConnection(ASSOCIATION, EnumConnectionEnd.NONE, EnumConnectionEnd.ARROW));
		
		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_CONTROLLER, "ChiController", EnumFontPosition.IN_UP,  path + chi , connections);
		return result;
	}
	
	private static ElementDiagram initChiNode() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();

		connections.put(EnumFigureType.CHI_NODE, new InfoAllowedConnection(GENERALISATION, EnumConnectionEnd.ARROW_TRIANGLE, EnumConnectionEnd.NONE));

		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_NODE, "ChiNode", EnumFontPosition.IN_UP,  path + chi , connections);
		return result;
	}
	
	////////////////////////////////////////////////////////////
	//New Configuration
//	private static ElementDiagram initChiSys() {
//		HashMap<EnumFigureType, AllowedConnection> connections = new HashMap<EnumFigureType, AllowedConnection>();
//
//		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_SYSTEM, "ChiSys",fontPosition, chiSystemImage , connections);
//		return result;// ??
//	}
	
	////////////////////////////////////////////////////////////
	//Activity
	private static ElementDiagram initActivity() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();

		connections.put(EnumFigureType.CHI_WORKER_INTERN, new InfoAllowedConnection(GENERALISATION, EnumConnectionEnd.ARROW_TRIANGLE, EnumConnectionEnd.NONE));
		
		ElementDiagram result = new ElementDiagram(EnumFigureType.ACTIVITY_SET, "ActivitySet", EnumFontPosition.UNDER, null , connections);
		return result;
	}
	private static ElementDiagram initActiviReceive() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();

		ElementDiagram result = new ElementDiagram(EnumFigureType.ACTIVITY_RECEIVE, "ActiviRec", EnumFontPosition.UNDER, null , connections);
		return result;
	}
	
	private static ElementDiagram initActivityInitial() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();

		ElementDiagram result = new ElementDiagram(EnumFigureType.ACTIVITY_INITIAL, "ActivityInitial", EnumFontPosition.UNDER, null , connections);
		return result;
	}
	
	private static ElementDiagram initActivityDecision() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();

		ElementDiagram result = new ElementDiagram(EnumFigureType.ACTIVITY_DECISION, "ActiviDec", EnumFontPosition.UNDER, null , connections);
		return result;
	}
	
	private static ElementDiagram initActivityFinal() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();

		ElementDiagram result = new ElementDiagram(EnumFigureType.ACTIVITY_FINAL, "ActivityFinal", EnumFontPosition.UNDER, null , connections);
		return result;
	}
	
	private static ElementDiagram initChiObject() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();

		ElementDiagram result = new ElementDiagram(EnumFigureType.Chi_OBJECT, "ChiObject", EnumFontPosition.IN_CENTER, null , connections);
		return result;
	}
	
	public EnumFigureType getType() {
		return type;
	}

	public EnumFontPosition getFontPosition() {
		return fontPosition;
	}

	public String getTyp() {
		return typ;
	}

	public String getName() {
		return name;
	}

	public String getImage() {
		return imagePath;
	}

	public HashMap<EnumFigureType, InfoAllowedConnection> getAllowedConnection() {
		return allowedConnection;
	}

	public HashMap<String, InfoAllowedConnection> getAllowedConnectionByName() {
		return allowedConnectionByName;
	}

	public static ElementDiagram getCatalogEntry(EnumFigureType element) {
		return catalog.get(element);
	}

	public static ElementDiagram getCatalogEntryByName(String name) {
		return catalogByName.get(name);
	}
}