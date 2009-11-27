
// new object grid elements
var ruleElements = [{
    name: "Condition",
    type: "RuleCondition",
    treeIconClass: null,
    figureClass: "cwl.graphics.figure.RectangleFigure",
    semanticGroup: "Rule Condition"
  },{
    name: "And Operator",
    type: "RuleOperator",
    treeIconClass: null,
    semanticGroup: "Rule Condition"
  },{
    name: "Or Operator",
    type: "RuleOperator",
    treeIconClass: null,
    semanticGroup: "Rule Condition"
  },{
    name: "Not Operator",
    type: "RuleOperator",
    treeIconClass: null,
    semanticGroup: "Rule Condition"
  },{
    name: "Equals Operator",
    type: "RuleOperator",
    treeIconClass: null,
    semanticGroup: "Rule Condition"
  },{
    name: "Lesser Operator",
    type: "RuleOperator",
    treeIconClass: null,
    semanticGroup: "Rule Condition"
  },{
    name: "Greater Operator",
    type: "RuleOperator",
    treeIconClass: null,
    semanticGroup: "Rule Condition"
  },{
    name: "Read",
    type: "RuleAction",
    treeIconClass: null,
    semanticGroup: "Rule Action"
  },{
    name: "Write",
    type: "RuleAction",
    treeIconClass: null,
    semanticGroup: "Rule Action"
  },{
    name: "Update",
    type: "RuleAction",
    treeIconClass: null,
    semanticGroup: "Rule Action"
  },{
    name: "Delete",
    type: "RuleAction",
    treeIconClass: null,
    semanticGroup: "Rule Action"
  },{
    name: "Invoke",
    type: "RuleAction",
    treeIconClass: null,
    semanticGroup: "Rule Action"
  }/*,{
    name: "Input",
    type: "RuleVariable",
    treeIconClass: null,
    semanticGroup: "Rule Variable"
  },{
    name: "Output",
    type: "RuleVariable",
    treeIconClass: null,
    semanticGroup: "Rule Variable"
  }*/
];

var modelTree = [{
    id: "id0",
    name: "AMI Rapid Start",
    type: "Model",
    treeIconClass: "FigureModel",
    startExpanded: true,
    parentId: "chi.model.RootPackageId"
  },{
    id: "id00",
    name: "Processes",
    type: "Package",
    treeIconClass: "FigurePackage",
    parentId: "id0"
  },/*{
    id: "id000",
    name: "AMI Use Cases",
    type: "Package",
    treeIconClass: "FigurePackage",
    parentId: "id00"
  },{
    id: "id0000",
    name: "request Meter read",
    type: "ChiBusinessUseCase",
    treeIconClass: "FigureChiBusinessUseCase",
    parentId: "id000"
  },*/
/***********************************************************************************  
 ***********************************************************************************  
 * AMI Process Map
 ***********************************************************************************
 ***********************************************************************************/  
  {
    id: "id001",
    name: "AMI Process Map",
    type: "Package",
    treeIconClass: "FigurePackage",
    parentId: "id00"
  },{
    id: "id0010",
    name: "Customer Care",
    type: "ChiBusinessProcess",
    treeIconClass: "FigureChiBusinessProcess",
    parentId: "id001"
  },{
    id: "id0011",
    name: "Product Management",
    type: "ChiBusinessProcess",
    treeIconClass: "FigureChiBusinessProcess",
    parentId: "id001"
  },
/***********************************************************************************  
 * ChiBusinessUseCase design Product
 ***********************************************************************************/
   {
    id: "id00110",
    name: "design Product",
    type: "ChiBusinessUseCase",
    treeIconClass: "FigureChiBusinessUseCase",
    parentId: "id0011"
  },
/***********************************************************************************  
 * ChiBusinessUseCase perform Registration
 ***********************************************************************************/
  {
    id: "id00111",
    name: "perform Registration",
    type: "ChiBusinessUseCase",
    treeIconClass: "FigureChiBusinessUseCase",
    parentId: "id0011"
  },{
    id: "id001110",
    name: "perform Registration",
    type: "ActivitySet",
    treeIconClass: "FigureActivity",
    parentId: "id00111"
  },{
    id: "id0011100",
    name: "Registration - created",
    type: "ChiObject",
    treeIconClass: "FigureChiObject",
    parentId: "id001110",
    attributes: ["Date"]
  },{
    id: "id0011101",
    name: "Registration - valid",
    type: "ChiObject",
    treeIconClass: "FigureChiObject",
    parentId: "id001110",
    attributes: ["Date"]
  },{
    id: "id0011102",
    name: "Start",
    type: "ActivityInitial",
    treeIconClass: "FigureActivityInitial",
    parentId: "id001110"
  },{
    id: "id0011103",
    name: "create Registration",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id001110"
  },{
    id: "id0011104",
    name: "fill in Information",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id001110"
  },{
    id: "id0011105",
    name: "Information correct?",
    type: "ActivityDecision",
    treeIconClass: "FigureActivityDecision",
    parentId: "id001110"
  },{
    id: "id0011106",
    name: "modify Information",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id001110"
  },{
    id: "id0011107",
    name: "confirm Information",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id001110"
  },{
    id: "id0011108",
    name: "confirm Registration",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id001110"
  },{
    id: "id0011109",
    name: "End",
    type: "ActivityFinal",
    treeIconClass: "FigureActivityFinal",
    parentId: "id001110"
  },
/***********************************************************************************  
 * ChiBusinessUseCase place Product
 ***********************************************************************************/
  {
    id: "id00112",
    name: "place Product",
    type: "ChiBusinessUseCase",
    treeIconClass: "FigureChiBusinessUseCase",
    parentId: "id0011"
  },{
    id: "id001120",
    name: "place Product",
    type: "ActivitySet",
    treeIconClass: "FigureActivity",
    parentId: "id00112"
  },{
    id: "id0011200",
    name: "Product - created",
    type: "ChiObject",
    treeIconClass: "FigureChiObject",
    parentId: "id001120",
    attributes: ["Name", "Price"]
  },{
    id: "id0011201",
    name: "Product - valid",
    type: "ChiObject",
    treeIconClass: "FigureChiObject",
    parentId: "id001120",
    attributes: ["Name", "Price"]
  },{
    id: "id0011202",
    name: "Start",
    type: "ActivityInitial",
    treeIconClass: "FigureActivityInitial",
    parentId: "id001120"
  },{
    id: "id0011203",
    name: "update ProductCatalog",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id001120"
  },{
    id: "id0011204",
    name: "select and mark products as available",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id001120"
  },{
    id: "id0011205",
    name: "start advertising",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id001120"
  },{
    id: "id0011206",
    name: "End",
    type: "ActivityFinal",
    treeIconClass: "FigureActivityFinal",
    parentId: "id001120"
  },
/***********************************************************************************  
 * ChiBusinessUseCase maintain Profile
 ***********************************************************************************/
  {
    id: "id00113",
    name: "maintain Profile",
    type: "ChiBusinessUseCase",
    treeIconClass: "FigureChiBusinessUseCase",
    parentId: "id0011"
  },{
    id: "id001130",
    name: "maintain Profile",
    type: "ActivitySet",
    treeIconClass: "FigureActivity",
    parentId: "id00113"
  },{
    id: "id0011300",
    name: "Profile - created",
    type: "ChiObject",
    treeIconClass: "FigureChiObject",
    parentId: "id001130",
    attributes: ["Name", "Address"]
  },{
    id: "id0011301",
    name: "Profile - under revision",
    type: "ChiObject",
    treeIconClass: "FigureChiObject",
    parentId: "id001130",
    attributes: ["Name", "Address"]
  },{
    id: "id0011302",
    name: "Profile - activated",
    type: "ChiObject",
    treeIconClass: "FigureChiObject",
    parentId: "id001130",
    attributes: ["Name", "Address"]
  },{
    id: "id0011303",
    name: "Start",
    type: "ActivityInitial",
    treeIconClass: "FigureActivityInitial",
    parentId: "id001130"
  },{
    id: "id0011304",
    name: "identify Profile owner",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id001130"
  },{
    id: "id0011305",
    name: "Profile exists?",
    type: "ActivityDecision",
    treeIconClass: "FigureActivityDecision",
    parentId: "id001130"
  },{
    id: "id0011306",
    name: "create Profile",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id001130"
  },{
    id: "id0011307",
    name: "access Profile",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id001130"
  },{
    id: "id0011308",
    name: "review Profile",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id001130"
  },{
    id: "id0011309",
    name: "Profile complete?",
    type: "ActivityDecision",
    treeIconClass: "FigureActivityDecision",
    parentId: "id001130"
  },{
    id: "id00113010",
    name: "find item",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id001130"
  },{
    id: "id00113011",
    name: "add or modify profile item?",
    type: "ActivityDecision",
    treeIconClass: "FigureActivityDecision",
    parentId: "id001130"
  },{
    id: "id00113012",
    name: "add item",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id001130"
  },{
    id: "id00113013",
    name: "modify item",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id001130"
  },{
    id: "id00113014",
    name: "activate Profile",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id001130"
  },{
    id: "id00113015",
    name: "confirm activation",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id001130"
  },{
    id: "id00113016",
    name: "End",
    type: "ActivityFinal",
    treeIconClass: "FigureActivityFinal",
    parentId: "id001130"
  },
/***********************************************************************************  
 * ChiBusinessUseCase buy Product
 ***********************************************************************************/
  {
    id: "id00114",
    name: "buy Product",
    type: "ChiBusinessUseCase",
    treeIconClass: "FigureChiBusinessUseCase",
    parentId: "id0011"
  },{
    id: "id001140",
    name: "buy Product",
    type: "ActivitySet",
    treeIconClass: "FigureActivity",
    parentId: "id00114"
  },{
    id: "id0011400",
    name: "Profile - active",
    type: "ChiObject",
    treeIconClass: "FigureChiObject",
    parentId: "id001140",
    attributes: ["Name", "Address"]
  },{
    id: "id0011401",
    name: "Product - available",
    type: "ChiObject",
    treeIconClass: "FigureChiObject",
    parentId: "id001140",
    attributes: ["Name", "Price"]
  },{
    id: "id0011402",
    name: "Order - created",
    type: "ChiObject",
    treeIconClass: "FigureChiObject",
    parentId: "id001140",
    attributes: ["Date", "TotalPrice"]
  },{
    id: "id0011403",
    name: "Order - open",
    type: "ChiObject",
    treeIconClass: "FigureChiObject",
    parentId: "id001140",
    attributes: ["Date", "TotalPrice"]
  },{
    id: "id0011404",
    name: "Start",
    type: "ActivityInitial",
    treeIconClass: "FigureActivityInitial",
    parentId: "id001140"
  },{
    id: "id0011405",
    name: "browse Products",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id001140"
  },{
    id: "id0011406",
    name: "evaluate Products",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id001140"
  },{
    id: "id0011407",
    name: "select Product",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id001140"
  },{
    id: "id0011408",
    name: "another Product?",
    type: "ActivityDecision",
    treeIconClass: "FigureActivityDecision",
    parentId: "id001140"
  },{
    id: "id0011409",
    name: "create Order",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id001140"
  },{
    id: "id00114010",
    name: "review Order",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id001140"
  },{
    id: "id00114011",
    name: "Order ok?",
    type: "ActivityDecision",
    treeIconClass: "FigureActivityDecision",
    parentId: "id001140"
  },{
    id: "id00114012",
    name: "confirm Order",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id001140"
  },{
    id: "id00114013",
    name: "send Order to Order Fullfilment",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id001140"
  },{
    id: "id00114014",
    name: "End",
    type: "ActivityFinal",
    treeIconClass: "FigureActivityFinal",
    parentId: "id001140"
  },{
    name: "BuyProductController",
    type: "ChiController",
    treeIconClass: "FigureChiController",
    semanticGroup: "Domain Object",
    parentId: "id00114",
    operations: ["browseProducts", "selectProduct", "evaluateProducts", "createOrder", "reviewOrder", 
      "confirmOrder", "sendOrder"]
  },
/***********************************************************************************  
 ***********************************************************************************  
 * AMI Actors
 ***********************************************************************************
 ***********************************************************************************/  
  {
    id: "id002",
    name: "AMI Actors",
    type: "Package",
    treeIconClass: "FigurePackage",
    parentId: "id00"
  },{
    name: "supplier",
    type: "ChiBusinessPartner",
    treeIconClass: "FigureChiBusinessPartner",
    parentId: "id002"
  },{
    name: "customer",
    type: "ChiBusinessPartner",
    treeIconClass: "FigureChiBusinessPartner",
    parentId: "id002"
  },{
    name: "customer",
    type: "ChiWorkerExternal",
    treeIconClass: "FigureChiWorkerExternal",
    parentId: "id002"
  },{
    name: "cust web",
    type: "ChiWorkerExternal",
    treeIconClass: "FigureChiWorkerExternal",
    parentId: "id002"
  },{
    name: "Data Whse",
    type: "ChiWorkerExternal",
    treeIconClass: "FigureChiWorkerExternal",
    parentId: "id002"
  },{
    name: "CIS",
    type: "ChiWorkerExternal",
    treeIconClass: "FigureChiWorkerExternal",
    parentId: "id002"
  },{
    name: "field",
    type: "ChiWorkerExternal",
    treeIconClass: "FigureChiWorkerExternal",
    parentId: "id002"
  },{
    name: "call center",
    type: "ChiWorkerExternal",
    treeIconClass: "FigureChiWorkerExternal",
    parentId: "id002"
  },
/***********************************************************************************  
 ***********************************************************************************  
 * AMI Domain
 ***********************************************************************************
 ***********************************************************************************/  
  {
    id: "id01",
    name: "Domain",
    type: "Package",
    treeIconClass: "FigurePackage",
    parentId: "id0"
  },{
    id: "id010",
    name: "Domain Objects",
    type: "Package",
    treeIconClass: "FigurePackage",
    parentId: "id01"
  },{
    name: "Customer",
    type: "ChiNode",
    treeIconClass: "FigureChiNode",
    semanticGroup: "Domain Object",
    parentId: "id010",
    attributes: ["Id"]
  },{
    name: "Meter",
    type: "ChiNode",
    treeIconClass: "FigureChiNode",
    semanticGroup: "Domain Object",
    parentId: "id010",
    attributes: ["Data"]
  },{
    name: "Profile",
    type: "ChiNode",
    treeIconClass: "FigureChiNode",
    semanticGroup: "Domain Object",
    parentId: "id010",
    attributes: ["hasRemoteControl"]
  },{
    name: "Product",
    type: "ChiNode",
    treeIconClass: "FigureChiNode",
    semanticGroup: "Domain Object",
    parentId: "id010",
    attributes: ["requiresRemoteControl"]
  },{
    id: "id011",
    name: "Services",
    type: "Package",
    treeIconClass: "FigurePackage",
    parentId: "id01"
  },{
    name: "DesignProductController",
    type: "ChiController",
    treeIconClass: "FigureChiController",
    semanticGroup: "Domain Object",
    parentId: "id011",
    operations: ["createProduct", "setProductCharacteristics"]
  },{
    name: "PerformRegistrationController",
    type: "ChiController",
    treeIconClass: "FigureChiController",
    semanticGroup: "Domain Object",
    parentId: "id011",
    operations: ["fillInInformation", "modifyInformation", "confirmInformation", "createRegistration", "confirmRegistration"]
  },{
    name: "PlaceProductController",
    type: "ChiController",
    treeIconClass: "FigureChiController",
    semanticGroup: "Domain Object",
    parentId: "id011",
    operations: ["updateProductCatalogue", "markProducts", "startAdvertising"]
  },{
    name: "MaintainProfileController",
    type: "ChiController",
    treeIconClass: "FigureChiController",
    semanticGroup: "Domain Object",
    parentId: "id011",
    operations: ["identifyProfileOwner", "decideProfileExistance", "createProfile", "accessProfile", "reviewProfile", 
      "findItem", "addItem", "modifyItem", "decideProfileCompletion", "activateProfile", "confirmActivation"]
  },{
    name: "BuyProductController",
    type: "ChiController",
    treeIconClass: "FigureChiController",
    semanticGroup: "Domain Object",
    parentId: "id011",
    operations: ["browseProducts", "selectProduct", "evaluateProducts", "createOrder", "reviewOrder", 
      "confirmOrder", "sendOrder"]
  }
];