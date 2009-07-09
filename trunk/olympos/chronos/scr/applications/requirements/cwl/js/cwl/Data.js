
// new object grid elements
var ruleElements = [{
    name: "Condition",
    type: "RuleComponent",
    treeIconClass: null,
    semanticGroup: "Rule Component"
  },{
    name: "Action",
    type: "RuleComponent",
    treeIconClass: null,
    semanticGroup: "Rule Component"
  },{
    name: "Operator And",
    type: "RuleComponent",
    treeIconClass: null,
    semanticGroup: "Rule Component"
  },{
    name: "Operator Or",
    type: "RuleComponent",
    treeIconClass: null,
    semanticGroup: "Rule Component"
  }
];

var modelTree = [{
    id: "id0",
    name: "AMI Rapid Start",
    type: "Model",
    treeIconClass: "FigureModel",
    parentId: "cwl.model.RootPackageId"
  },{
    id: "id00",
    name: "processes",
    type: "Package",
    treeIconClass: "FigurePackage",
    parentId: "id0"
  },{
    id: "id000",
    name: "AMI use cases",
    type: "Package",
    treeIconClass: "FigurePackage",
    parentId: "id00"
  },{
    id: "id0000",
    name: "request Meter read",
    type: "ChiBusinessUseCase",
    treeIconClass: "FigureChiBusinessUseCase",
    parentId: "id000"
  },{
    id: "id00000",
    name: "request meter read activity",
    type: "ActivitySet",
    treeIconClass: "FigureActivity",
    parentId: "id0000"
  },{
    name: "Cust Web presents customer service data",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id00000"
  },{
    name: "Data Warehouse retrieves customer service data and provides it to Cust Web",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id00000"
  },{
    name: "Cust Web initiates Data Retrieval Request for customer service data from Data Warehouse",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id00000"
  },{
    name: "Customer logs into utility customer service internet siteCustomer logs into utility customer service internet site",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id00000"
  },{
    name: "Customer requests latest meter usage data",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id00000"
  },{
    id: "id01",
    name: "domain",
    type: "Package",
    treeIconClass: "FigurePackage",
    parentId: "id0"
  },{
    id: "id010",
    name: "AMI domain classes",
    type: "Package",
    treeIconClass: "FigurePackage",
    parentId: "id01"
  },{
    name: "ClassA",
    type: "ChiNode",
    treeIconClass: "FigureChiNode",
    semanticGroup: "Domain Object",
    parentId: "id010"
  },{
    name: "ClassB",
    type: "ChiNode",
    treeIconClass: "FigureChiNode",
    semanticGroup: "Domain Object",
    parentId: "id010"
  },{
    name: "ClassC",
    type: "ChiNode",
    treeIconClass: "FigureChiNode",
    semanticGroup: "Domain Object",
    parentId: "id010"
  }
];