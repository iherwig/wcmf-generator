req.connection.constraints = {
	ChiGoal: {
		ChiGoal: {
			label: "depends on",
			inverse: false,
			sourceMaxConns: -1,
			targetMaxConns: -1
		},
		ChiRequirement: {
			label: "defines",
			inverse: true,
			sourceMaxConns: -1,
			targetMaxConns: 1
		
		}
	},
	
	ChiRequirement: {
		ChiGoal: {
			label: "defines",
			inverse: false,
			sourceMaxConns: 1,
			targetMaxConns: -1
		
		},
		ChiRequirement: {
			label: "defines",
			inverse: false,
			sourceMaxConns: -1,
			targetMaxConns: -1
		
		},
		ChiIssue: {
			label: "contradicts",
			inverse: true,
			sourceMaxConns: -1,
			targetMaxConns: 1
		
		},
		ChiFeature: {
			label: "implements",
			inverse: true,
			sourceMaxConns: -1,
			targetMaxConns: -1
		
		}
	},
	
	ChiIssue: {
		ChiRequirement: {
			label: "contradicts",
			inverse: false,
			sourceMaxConns: 1,
			targetMaxConns: -1
		
		}
	},
	
	ChiFeature: {
		ChiRequirement: {
			label: "implements",
			inverse: false,
			sourceMaxConns: -1,
			targetMaxConns: -1
		
		}
	},
	
	ChiBusinessProcess: {
		ChiBusinessUseCase: {
			label: "contains",
			inverse: false,
			sourceMaxConns: -1,
			targetMaxConns: 1
		
		},
		ChiBusinessUseCaseCore: {
			label: "contains",
			inverse: false,
			sourceMaxConns: -1,
			targetMaxConns: 1
		
		}
	},
	
	ChiBusinessUseCase: {
		ChiBusinessProcess: {
			label: "contains",
			inverse: true,
			sourceMaxConns: 1,
			targetMaxConns: -1
		
		}
	},
	
	ChiBusinessUseCaseCore: {
		ChiBusinessProcess: {
			label: "contains",
			inverse: true,
			sourceMaxConns: 1,
			targetMaxConns: -1
		
		}
	
	},
	
	ChiBusinessPartnerActive: {},
	
	ChiBusinessPartnerPassive: {},
	
	ChiWorkerExternal: {},
	
	ChiWorkerInternal: {}

};
