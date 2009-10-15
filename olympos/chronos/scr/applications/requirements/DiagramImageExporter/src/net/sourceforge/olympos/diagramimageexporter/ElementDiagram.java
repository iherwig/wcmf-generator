package net.sourceforge.olympos.diagramimageexporter;

import java.net.URL;
import java.util.HashMap;

import javax.swing.ImageIcon;

public class ElementDiagram {
	private EnumFigureType type;
	private EnumFontPosition fontPosition;
	private String name;
	private String imagePath;
	private ImageIcon imagepath;
	private String typ;
	
	private final static String CONTAINS = "contains";
	private final static String NEGATED = "is negated by";
	private final static String SPECIFIED = "is specified by";
	private final static String REALIZED = "is realized by";
	private final static String REFINES = "is refined by";
	private final static String PARTICIPATES = "is participates by";
	private final static String GENERALISATION = "is generalisation by";
	
//	URL image = this.getClass().getClassLoader().getResource("/Images/");
//	ImageIcon image = (new ImageIcon(getClass().getResource("yourpackage/mypackage/image.gif")));
//  InputStream is =  this.getClass().getClassLoader().getResourceAsStream("org/myproject/foo/bar/MyProp.properties");

//	URL chiRequirementIssu = this.getClass().getClassLoader().getResource("net/sourceforge/olympos/diagramimageexporter/");
//	new URL(imagePath2).toString()
	private static String path = "D:/Images/";
	
	
//	static ImageIcon chiRequirementIssuImage = (new ImageIcon(ElementDiagram.class.getResource("Images/ChiRequirementIssue.svg")));
//	static ImageIcon chiRequirementFeatureImage = (new ImageIcon(ElementDiagram.class.getResource("Images/ChiRequirementFeature.svg")));
//	static ImageIcon chiRequirementGoalImage = (new ImageIcon(ElementDiagram.class.getResource("Images/ChiRequirementGoal.svg")));
//	static ImageIcon chiRequirementChiRequirementImage = (new ImageIcon(ElementDiagram.class.getResource("Images/ChiRequirement.svg")));
//	static ImageIcon chiWorkerInternalImage = (new ImageIcon(ElementDiagram.class.getResource("Images/chiWorkerInternal.svg")));
//	static ImageIcon chiWorkerExternalImage = (new ImageIcon(ElementDiagram.class.getResource("Images/ChiWorkerExternal.svg")));
//	static ImageIcon chiWorkerImage = (new ImageIcon(ElementDiagram.class.getResource("Images/ChiWorker.svg")));
//	static ImageIcon chiViewImage = (new ImageIcon(ElementDiagram.class.getResource("Images/ChiView.svg")));
//	static ImageIcon chiSystemImage = (new ImageIcon(ElementDiagram.class.getResource("Images/ChiSystem.svg")));
//	static ImageIcon chiBusinessUseCaseCoreImage = (new ImageIcon(ElementDiagram.class.getResource("Images/ChiBusinessUseCaseCore.svg")));
//	static ImageIcon chiBusinessUseCaseImage = (new ImageIcon(ElementDiagram.class.getResource("Images/ChiBusinessUseCase.svg")));
//	static ImageIcon chiBusinessPartnerPassiveImage = (new ImageIcon(ElementDiagram.class.getResource("Images/ChiBusinessPartnerPassive.svg")));
//	static ImageIcon chiBusinessPartnerActiveImage = (new ImageIcon(ElementDiagram.class.getResource("Images/ChiBusinessPartnerActive.svg")));
//	static ImageIcon chiBusinessPartnerImage = (new ImageIcon(ElementDiagram.class.getResource("Images/ChiBusinessPartner.svg")));
//	static ImageIcon activitySendImage = (new ImageIcon(ElementDiagram.class.getResource("Images/ActivitySend.svg")));
//	static ImageIcon activityReseiveImage = (new ImageIcon(ElementDiagram.class.getResource("Images/ActivityReceive.svg")));
//	static ImageIcon activityInitialImage = (new ImageIcon(ElementDiagram.class.getResource("Images/ActivityInitial.svg")));
//	static ImageIcon activityDecisionImage = (new ImageIcon(ElementDiagram.class.getResource("Images/ActivityDecision.svg")));
//	static ImageIcon activityFinalImage = (new ImageIcon(ElementDiagram.class.getResource("Images/ActivityFinal.svg")));
//	static ImageIcon activityImage = (new ImageIcon(ElementDiagram.class.getResource("Images/Activity.svg")));
//	static ImageIcon chiNodeImage = (new ImageIcon(ElementDiagram.class.getResource("Images/ChiNode.svg")));
//	static ImageIcon chiControllerImage = (new ImageIcon(ElementDiagram.class.getResource("Images/ChiController.svg")));
//	static ImageIcon chiBusinessProcessImage = (new ImageIcon(ElementDiagram.class.getResource("Images/BusinessProcess.svg")));
	
	private final static String chiRequirementFeature = "ChiRequirementFeature.PNG";
	private final static String chiRequirementIssu = "ChiRequirementIssue.PNG";
	private final static String chiRequirementGoal = "ChiRequirementGoal.PNG";
	private final static String chiRequirementChiRequirement = "ChiRequirement.PNG";
	private final static String chi = "Chi.PNG";
	
//	private final static String chiWorkerInternal = "chiWorkerInternal.svg";
//	private final static String chiWorkerExternal = "ChiWorkerExternal.svg";
//	private final static String chiWorker = "ChiWorker.svg";
//	private final static String chiView = "ChiView.svg";
//	private final static String chiSystem = "ChiSystem.svg";
//	private final static String chiBusinessUseCaseCore = "ChiBusinessUseCaseCore.svg";
//	private final static String chiBusinessUseCase = "ChiBusinessUseCase.svg";
//	private final static String chiBusinessPartnerPassive = "ChiBusinessPartnerPassive.svg";
//	private final static String chiBusinessPartnerActive = "ChiBusinessPartnerActive.svg";
//	private final static String chiBusinessPartner = "ChiBusinessPartner.svg";
//	private final static String activitySend = "ActivitySend.svg";
//	private final static String activityReseive = "ActivityReseive.svg";
//	private final static String activityInitial = "ActivityInitial.svg";
//	private final static String activityDecision = "ActivityDecision.svg";
//	private final static String activityFinal = "ActivityFinal.svg";
//	private final static String activity = "Activity.svg";
//	private final static String chiNode = "ChiNode.svg";
//	private final static String chiController = "ChiController.svg";
//	private final static String chiBusinessProcess = "BusinessProcess.svg";

	private HashMap<EnumFigureType, InfoAllowedConnection> allowedConnection;
	private HashMap<String, InfoAllowedConnection> allowedConnectionByName;

	private static HashMap<EnumFigureType, ElementDiagram> catalog = new HashMap<EnumFigureType, ElementDiagram>();
	private static HashMap<String, ElementDiagram> catalogByName = new HashMap<String, ElementDiagram>();

	ElementDiagram(EnumFigureType type, String name,String typ, EnumFontPosition fontPosition, String imagePath,  HashMap<EnumFigureType, InfoAllowedConnection> connections) {
		this.type = type;
		this.name = name;
		this.typ = typ;
		this.fontPosition = fontPosition;
		this.imagePath = imagePath;
		this.allowedConnection = connections;
	}

	ElementDiagram(String type, String name,String typ, EnumFontPosition fontPos, String imagePath, HashMap<String, InfoAllowedConnection> connections) {
		this.typ = type;
		this.name = name;
		this.typ = typ;
		this.fontPosition = fontPos;
		this.imagePath = imagePath;
		this.allowedConnectionByName = connections;
	}

	ElementDiagram() {
	}

//	ElementDiagram(EnumFigureType type, String name, String drawType,EnumFontPosition fontPosition, ImageIcon imagePath,  HashMap<EnumFigureType, AllowedConnection> connections) {
//		this.type = type;
//		this.name = name;
//		this.fontPosition = fontPosition;
//		this.imagepath = imagePath;
//		this.allowedConnection = connections;
//	}
//
//	ElementDiagram(String type, String name, String drawType, EnumFontPosition fontPos, ImageIcon imagePath, HashMap<String, AllowedConnection> connections) {
//		this.typ = type;
//		this.name = name;
//		this.fontPosition = fontPos;
//		this.imagepath = imagePath;
//		this.allowedConnectionByName = connections;
//	}


	public static void initCatalog() {
		addToCatalog(initChiGoal());
		addToCatalog(initRequirement());
		addToCatalog(initFeature());
		addToCatalog(initIssue());
//		addToCatalog(initActivity());
//		addToCatalog(initActiviDec());
//		addToCatalog(initActiviIni());
//		addToCatalog(initActiviRec());
//		addToCatalog(initActiviSet());
//		addToCatalog(initActiviFinal());
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
	}

	private static void addToCatalog(ElementDiagram elem) {
		catalog.put(elem.getType(), elem);
		catalogByName.put(elem.getName(), elem);
	}
	
	////////////////////////////////////////////////////////////
	//Requirement
	private static ElementDiagram initIssue() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();
		
	//	fontPosition = new FontPos(EnumFontPosition.IN_UP, EnumFontPosition.ALIGN_LEFT);		
		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_ISSUE, "ChiIssue","rectangle",EnumFontPosition.IN_UP , path + chiRequirementIssu, connections);
		return result;
	}

	private static ElementDiagram initFeature() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();
		
		connections.put(EnumFigureType.CHI_BUSINESS_USE_CASE, new InfoAllowedConnection(REFINES, EnumConnectionEnd.ARROW_TRIANGLE, EnumConnectionEnd.NONE));
		connections.put(EnumFigureType.CHI_BUSINESS_USE_CASE_CORE, new InfoAllowedConnection(REFINES, EnumConnectionEnd.ARROW_TRIANGLE, EnumConnectionEnd.NONE));
		connections.put(EnumFigureType.CHI_BUSINESS_PROCESS, new InfoAllowedConnection("???", EnumConnectionEnd.NONE, EnumConnectionEnd.NONE));
		connections.put(EnumFigureType.CHI_REQUIREMENT, new InfoAllowedConnection(REALIZED, EnumConnectionEnd.ARROW_TRIANGLE, EnumConnectionEnd.NONE));
		
		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_FEATURE, "ChiFeature","rectangle", EnumFontPosition.IN_UP , path + chiRequirementFeature, connections);
		return result;
	}

	private static ElementDiagram initChiGoal() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();

		connections.put(EnumFigureType.CHI_GOAL, new InfoAllowedConnection(CONTAINS, EnumConnectionEnd.CLOSED_DIAMOND, EnumConnectionEnd.ARROW));
		connections.put(EnumFigureType.CHI_REQUIREMENT, new InfoAllowedConnection(SPECIFIED, EnumConnectionEnd.ARROW, EnumConnectionEnd.CLOSED_DIAMOND));
		
		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_GOAL, "ChiGoal","rectangle", EnumFontPosition.IN_UP , path + chiRequirementGoal, connections);
		return result;
	}

	private static ElementDiagram initRequirement() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();

		connections.put(EnumFigureType.CHI_REQUIREMENT, new InfoAllowedConnection(CONTAINS, EnumConnectionEnd.CLOSED_DIAMOND, EnumConnectionEnd.ARROW));
		connections.put(EnumFigureType.CHI_FEATURE, new InfoAllowedConnection(REALIZED, EnumConnectionEnd.NONE, EnumConnectionEnd.ARROW_TRIANGLE));
		connections.put(EnumFigureType.CHI_ISSUE, new InfoAllowedConnection(NEGATED, EnumConnectionEnd.ARROW, EnumConnectionEnd.NONE));
		
		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_REQUIREMENT, "ChiRequirement","rectangle", EnumFontPosition.IN_UP , path + chiRequirementChiRequirement, connections);// ???
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
		
		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_BUSINESS_USE_CASE, "ChiBusinessUseCase", "useCase", EnumFontPosition.IN_CENTER , null , connections);
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
		
		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_BUSINESS_USE_CASE_CORE, "ChiBusinessUseCaseCore","useCase", EnumFontPosition.IN_CENTER, null , connections);
		return result;
	}
	
	private static ElementDiagram initChiBusiPartnerPassive() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();

		connections.put(EnumFigureType.CHI_BUSINESS_PARTNER_PASSIVE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.ARROW, EnumConnectionEnd.NONE));
		connections.put(EnumFigureType.CHI_BUSINESS_USE_CASE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.ARROW, EnumConnectionEnd.NONE));
		connections.put(EnumFigureType.CHI_BUSINESS_USE_CASE_CORE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.ARROW, EnumConnectionEnd.NONE));
		
		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_BUSINESS_PARTNER_PASSIVE, "ChiBusinessPartnerPassive", "partner", EnumFontPosition.UNDER, path + chi , connections);
		return result;
	}

	private static ElementDiagram initChiBusiPartnerActive() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();
		
		connections.put(EnumFigureType.CHI_BUSINESS_PARTNER_ACTIVE, new InfoAllowedConnection(GENERALISATION, EnumConnectionEnd.ARROW_TRIANGLE, EnumConnectionEnd.NONE));
		connections.put(EnumFigureType.CHI_BUSINESS_USE_CASE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.ARROW, EnumConnectionEnd.NONE));
		connections.put(EnumFigureType.CHI_BUSINESS_USE_CASE_CORE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.ARROW, EnumConnectionEnd.NONE));
		
		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_BUSINESS_PARTNER_ACTIVE, "ChiBusinessPartnerActive","partner",EnumFontPosition.UNDER, path + chi , connections);
		return result;
	}

	private static ElementDiagram initChiBusiPartner() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();
		
		connections.put(EnumFigureType.CHI_BUSINESS_USE_CASE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.ARROW, EnumConnectionEnd.NONE));
		connections.put(EnumFigureType.CHI_BUSINESS_USE_CASE_CORE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.ARROW, EnumConnectionEnd.NONE));

		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_BUSINESS_PARTNER, "ChiBusinessPartner","partner",EnumFontPosition.UNDER, path + chi , connections);
		return result;
	}
	
	private static ElementDiagram initChiBusiProcess() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();

		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_BUSINESS_PROCESS, "ChiBusinessProcess", "ChiBusiProcess", EnumFontPosition.IN_UP, null , connections);
		return result;
	}
	
	private static ElementDiagram initChiWorker() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();
		
		connections.put(EnumFigureType.CHI_BUSINESS_USE_CASE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.ARROW, EnumConnectionEnd.NONE));
		connections.put(EnumFigureType.CHI_BUSINESS_USE_CASE_CORE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.ARROW, EnumConnectionEnd.NONE));

		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_WORKER, "ChiWorker","worker",EnumFontPosition.UNDER, null , connections);
		return result;
	}
	
	private static ElementDiagram initChiWorkerInternal() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();
		
		connections.put(EnumFigureType.CHI_WORKER_INTERN, new InfoAllowedConnection(GENERALISATION, EnumConnectionEnd.ARROW_TRIANGLE, EnumConnectionEnd.NONE));
		connections.put(EnumFigureType.CHI_BUSINESS_USE_CASE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.ARROW, EnumConnectionEnd.NONE));
		connections.put(EnumFigureType.CHI_BUSINESS_USE_CASE_CORE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.ARROW, EnumConnectionEnd.NONE));
		
		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_WORKER_INTERN, "ChiWorkerInternal","worker",EnumFontPosition.UNDER, path + chi , connections);
		return result;// ??
	}

	private static ElementDiagram initChiWorkerExternal() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();
		
		connections.put(EnumFigureType.CHI_WORKER_EXTERN, new InfoAllowedConnection(GENERALISATION, EnumConnectionEnd.ARROW_TRIANGLE, EnumConnectionEnd.NONE));
		connections.put(EnumFigureType.CHI_BUSINESS_USE_CASE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.ARROW, EnumConnectionEnd.NONE));
		connections.put(EnumFigureType.CHI_BUSINESS_USE_CASE_CORE, new InfoAllowedConnection(PARTICIPATES, EnumConnectionEnd.ARROW, EnumConnectionEnd.NONE));
		
		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_WORKER_EXTERN, "ChiWorkerExternal","worker",EnumFontPosition.UNDER, path + chi , connections);
		return result;
	}


	
	////////////////////////////////////////////////////////////
	//New Domain
	private static ElementDiagram initChiView() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();

		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_VIEW, "ChiView","rectangle", EnumFontPosition.IN_CENTER, null , connections);
		return result;
	}
	
	private static ElementDiagram initChiController() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();

		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_CONTROLLER, "ChiController","rectangle", EnumFontPosition.IN_UP, null , connections);
		return result;
	}
	
	private static ElementDiagram initChiNode() {
		HashMap<EnumFigureType, InfoAllowedConnection> connections = new HashMap<EnumFigureType, InfoAllowedConnection>();


		ElementDiagram result = new ElementDiagram(EnumFigureType.CHI_NODE, "ChiNode", "rectangle", EnumFontPosition.IN_UP, null , connections);
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
//	private static ElementDiagram initActiviSet() {
//		HashMap<EnumFigureType, AllowedConnection> connections = new HashMap<EnumFigureType, AllowedConnection>();
//
//		ElementDiagram result = new ElementDiagram(EnumFigureType.ACTIVITY_SEND, "ActivitySet", activitySendImage , connections);
//		return result;
//	}
//
//	private static ElementDiagram initActiviRec() {
//		HashMap<EnumFigureType, AllowedConnection> connections = new HashMap<EnumFigureType, AllowedConnection>();
//
//		ElementDiagram result = new ElementDiagram(EnumFigureType.ACTIVITY_RECEIVE, "ActiviRec", activityReseiveImage , connections);
//		return result;// ??
//	}
//
//	private static ElementDiagram initActiviIni() {
//		HashMap<EnumFigureType, AllowedConnection> connections = new HashMap<EnumFigureType, AllowedConnection>();
//
//		ElementDiagram result = new ElementDiagram(EnumFigureType.ACTIVITY_INITIAL, "ActivityInitial", activityInitialImage , connections);
//		return result;
//	}
//
//	private static ElementDiagram initActiviDec() {
//		HashMap<EnumFigureType, AllowedConnection> connections = new HashMap<EnumFigureType, AllowedConnection>();
//
//		ElementDiagram result = new ElementDiagram(EnumFigureType.ACTIVITY_DECISION, "ActiviDec", activityDecisionImage , connections);
//		return result;// ??
//	}
//
//	private static ElementDiagram initActiviFinal() {
//		HashMap<EnumFigureType, AllowedConnection> connections = new HashMap<EnumFigureType, AllowedConnection>();
//
//		ElementDiagram result = new ElementDiagram(EnumFigureType.ACTIVITY_FINAL, "ActivityFinal", activityFinalImage , connections);
//		return result;
//	}
//
//	private static ElementDiagram initActivity() {
//		HashMap<EnumFigureType, AllowedConnection> connections = new HashMap<EnumFigureType, AllowedConnection>();
//
//		ElementDiagram result = new ElementDiagram(EnumFigureType.ACTIVITY, "Activity", activityImage , connections);
//		return result;
//	}

	
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