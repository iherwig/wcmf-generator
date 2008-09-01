uwm.config.namespace = "cwm";
uwm.config.jsonUrl = "../application/main.php";
uwm.config.appTitle = "Chi Web Modeller";

//Change 2008-09-01 start
uwm.config.defaultLogin = "admin";
uwm.config.defaultPassword = "admin";
//Change 2008-09-01 end


uwm.config.tabList = ["ChiGoal", "ChiRequirement", "ChiFeature", "ChiIssue"];

uwm.config.figureList = ["ChiGoal", "ChiRequirement", "ChiFeature", "ChiIssue", "ChiBusinessPartnerActive", "ChiBusinessPartnerPassive", "ChiBusinessProcess", "ChiBusinessUseCase", "ChiBusinessUseCaseCore", "ChiWorkerExternal", "ChiWorkerInternal"];


uwm.processConfig();
