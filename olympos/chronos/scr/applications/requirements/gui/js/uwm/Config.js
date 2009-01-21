Ext.namespace("uwm.Config");

uwm.Config.jsonUrl = "../application/main.php";
uwm.Config.appTitle = "Chronos Web Modeler";

uwm.Config.defaultLogin = "admin";
uwm.Config.defaultPassword = "admin";
/*
uwm.Config.tabList = ["ChiGoal", "ChiRequirement", "ChiFeature", "ChiIssue"];
uwm.Config.figureList = ["ChiGoal", "ChiRequirement", "ChiFeature", "ChiIssue", "ChiBusinessPartnerActive", "ChiBusinessPartnerPassive", "ChiBusinessProcess", "ChiBusinessUseCase", "ChiBusinessUseCaseCore", "ChiWorkerExternal", "ChiWorkerInternal"];
*/
uwm.Uwm.getInstance().processConfig();
