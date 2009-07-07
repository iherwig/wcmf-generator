
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
    name: "request meter read activity",
    type: "Activity",
    treeIconClass: "FigureActivity",
    parentId: "id0000"
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
    name: "ClassB",
    type: "ChiNode",
    treeIconClass: "FigureChiNode",
    semanticGroup: "Domain Object",
    parentId: "id010"
  }
];