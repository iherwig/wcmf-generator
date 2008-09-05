#
# This file was generated by wCMFGenerator 2.6.1.0019 from model/requirements.xmi on 05.09.08 11:35. 
# Manual modifications should be placed inside the protected regions.
#

#
# Structure of Table `NMFeatureRequirements`
# 
# version 1.0
#
DROP TABLE IF EXISTS `NMFeatureRequirements`;
CREATE TABLE `NMFeatureRequirements` # entityType=NMFeatureRequirements tableId=EAID_03F15877_01B7_4386_A6AA_D42EF3E2579D
(
  `id` INT(11) NOT NULL, # columnId=EAID_03F15877_01B7_4386_A6AA_D42EF3E2579D_id 
  `fk_chifeature_id` INT(11), # columnId=EAID_81FDBF74_10F8_403a_A886_BA51DFFA2263_fk_chifeature_id referencedTable=ChiFeature
  `fk_chirequirement_id` INT(11), # columnId=EAID_1169EE51_B124_402a_8430_12D6680C48DD_fk_chirequirement_id referencedTable=ChiRequirement
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `ChiGoal`
# a Measurable scope that the enterprise wants to achieve. 
# version 1.0
#
DROP TABLE IF EXISTS `ChiGoal`;
CREATE TABLE `ChiGoal` # entityType=ChiGoal tableId=EAID_C78BC7DD_DA11_463c_A937_F5BFA7660EAB
(
  `id` INT(11) NOT NULL, # columnId=EAID_C78BC7DD_DA11_463c_A937_F5BFA7660EAB_id 
  `fk_chibusinessprocess_id` INT(11), # columnId=EAID_CF3A013D_F615_45c5_BE80_2604A693AAD3_fk_chibusinessprocess_id referencedTable=ChiBusinessProcess
  `fk_package_id` INT(11), # columnId=EAID_05C9EAF6_8B0B_44f9_AED7_CBC223C935FB_fk_package_id referencedTable=Package
  `fk_chigoal_id` INT(11), # columnId=EAID_C78BC7DD_DA11_463c_A937_F5BFA7660EAB_fk_chigoal_id referencedTable=ChiGoal
  `priority` VARCHAR(255), # columnId={F6E9EAC8-F4CA-4fe5-B343-23FE55DC6B6A} 
  `value_name` VARCHAR(255), # columnId={5C83F67E-8051-4cde-AB4D-0C9EDE940D7E} 
  `value_ammount` VARCHAR(255), # columnId={D5E47AFF-F63E-4e8a-98F4-D854F99A8607} 
  `value_goal` VARCHAR(255), # columnId={4A005AF8-CC83-4169-9D5D-6A71A85F90A0} 
  `alias` VARCHAR(255), # columnId={62D889AE-2BBF-4d32-AE69-72968C6EB738} 
  `version` VARCHAR(255), # columnId={DD7945CB-802B-468f-BA11-ECC32A722079} 
  `name` VARCHAR(255), # columnId={FC5837B7-DD71-49ab-8015-87DC927CD034} 
  `notes` VARCHAR(255), # columnId={BC0FDE16-552E-4c0b-89A7-DAE24A40F4EC} 
  `created` VARCHAR(255), # columnId={EB5FAE3E-D59B-4615-BB11-35876802B4A0} 
  `creator` VARCHAR(255), # columnId={4008A23B-BA19-4f87-B52E-49746E5464E8} 
  `last_editor` VARCHAR(255), # columnId={5395DABE-40A0-4290-9D1D-709A43DCD183} 
  `modified` VARCHAR(255), # columnId={FE2FEF68-4845-4c43-BF1D-F219979BA7E7} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `ChiRequirement`
# A Business guide line about the Enterprise or the project.
# version 1.0
#
DROP TABLE IF EXISTS `ChiRequirement`;
CREATE TABLE `ChiRequirement` # entityType=ChiRequirement tableId=EAID_1169EE51_B124_402a_8430_12D6680C48DD
(
  `id` INT(11) NOT NULL, # columnId=EAID_1169EE51_B124_402a_8430_12D6680C48DD_id 
  `fk_chibusinessprocess_id` INT(11), # columnId=EAID_CF3A013D_F615_45c5_BE80_2604A693AAD3_fk_chibusinessprocess_id referencedTable=ChiBusinessProcess
  `fk_chigoal_id` INT(11), # columnId=EAID_C78BC7DD_DA11_463c_A937_F5BFA7660EAB_fk_chigoal_id referencedTable=ChiGoal
  `fk_chirequirement_id` INT(11), # columnId=EAID_1169EE51_B124_402a_8430_12D6680C48DD_fk_chirequirement_id referencedTable=ChiRequirement
  `fk_package_id` INT(11), # columnId=EAID_05C9EAF6_8B0B_44f9_AED7_CBC223C935FB_fk_package_id referencedTable=Package
  `reqtype` VARCHAR(255), # columnId={6BE90587-3033-4d4c-9D05-20FCC7B5D2D1} 
  `priority` VARCHAR(255), # columnId={E5696387-DC21-47a7-B0E0-B99AF858D519} 
  `author` VARCHAR(255), # columnId={FD9FE2DB-EC74-4362-83DC-2DDD333A4279} 
  `proofreader` VARCHAR(255), # columnId={BB67DFA4-93B5-4212-AFE0-D59FF31FD90A} 
  `status` VARCHAR(255), # columnId={87D413FB-7BD7-4ce1-A394-5AC92102484B} 
  `alias` VARCHAR(255), # columnId={62D889AE-2BBF-4d32-AE69-72968C6EB738} 
  `version` VARCHAR(255), # columnId={DD7945CB-802B-468f-BA11-ECC32A722079} 
  `name` VARCHAR(255), # columnId={FC5837B7-DD71-49ab-8015-87DC927CD034} 
  `notes` VARCHAR(255), # columnId={BC0FDE16-552E-4c0b-89A7-DAE24A40F4EC} 
  `created` VARCHAR(255), # columnId={EB5FAE3E-D59B-4615-BB11-35876802B4A0} 
  `creator` VARCHAR(255), # columnId={4008A23B-BA19-4f87-B52E-49746E5464E8} 
  `last_editor` VARCHAR(255), # columnId={5395DABE-40A0-4290-9D1D-709A43DCD183} 
  `modified` VARCHAR(255), # columnId={FE2FEF68-4845-4c43-BF1D-F219979BA7E7} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `ChiFeature`
# 
# version 1.0
#
DROP TABLE IF EXISTS `ChiFeature`;
CREATE TABLE `ChiFeature` # entityType=ChiFeature tableId=EAID_81FDBF74_10F8_403a_A886_BA51DFFA2263
(
  `id` INT(11) NOT NULL, # columnId=EAID_81FDBF74_10F8_403a_A886_BA51DFFA2263_id 
  `fk_chibusinessprocess_id` INT(11), # columnId=EAID_CF3A013D_F615_45c5_BE80_2604A693AAD3_fk_chibusinessprocess_id referencedTable=ChiBusinessProcess
  `fk_package_id` INT(11), # columnId=EAID_05C9EAF6_8B0B_44f9_AED7_CBC223C935FB_fk_package_id referencedTable=Package
  `author` VARCHAR(255), # columnId={B8B932B0-4DB5-4b2f-B5DC-77539B897D78} 
  `proofreader` VARCHAR(255), # columnId={DCB9B590-FB72-4745-8ED3-C194543F17E8} 
  `status` VARCHAR(255), # columnId={8DF13718-C83D-4a82-9492-E8E243EE8376} 
  `alias` VARCHAR(255), # columnId={62D889AE-2BBF-4d32-AE69-72968C6EB738} 
  `version` VARCHAR(255), # columnId={DD7945CB-802B-468f-BA11-ECC32A722079} 
  `name` VARCHAR(255), # columnId={FC5837B7-DD71-49ab-8015-87DC927CD034} 
  `notes` VARCHAR(255), # columnId={BC0FDE16-552E-4c0b-89A7-DAE24A40F4EC} 
  `created` VARCHAR(255), # columnId={EB5FAE3E-D59B-4615-BB11-35876802B4A0} 
  `creator` VARCHAR(255), # columnId={4008A23B-BA19-4f87-B52E-49746E5464E8} 
  `last_editor` VARCHAR(255), # columnId={5395DABE-40A0-4290-9D1D-709A43DCD183} 
  `modified` VARCHAR(255), # columnId={FE2FEF68-4845-4c43-BF1D-F219979BA7E7} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `ChiIssue`
# 
# version 1.0
#
DROP TABLE IF EXISTS `ChiIssue`;
CREATE TABLE `ChiIssue` # entityType=ChiIssue tableId=EAID_E7461E91_24F7_4be8_9913_0E53305ED0E9
(
  `id` INT(11) NOT NULL, # columnId=EAID_E7461E91_24F7_4be8_9913_0E53305ED0E9_id 
  `fk_chibusinessprocess_id` INT(11), # columnId=EAID_CF3A013D_F615_45c5_BE80_2604A693AAD3_fk_chibusinessprocess_id referencedTable=ChiBusinessProcess
  `fk_chirequirement_id` INT(11), # columnId=EAID_1169EE51_B124_402a_8430_12D6680C48DD_fk_chirequirement_id referencedTable=ChiRequirement
  `fk_package_id` INT(11), # columnId=EAID_05C9EAF6_8B0B_44f9_AED7_CBC223C935FB_fk_package_id referencedTable=Package
  `author` VARCHAR(255), # columnId={B0485347-2C52-4f90-BD0A-51636A4286F3} 
  `responsible` VARCHAR(255), # columnId={1EFDFCC4-23FA-4d6b-ABDC-FA778BEA128D} 
  `alias` VARCHAR(255), # columnId={62D889AE-2BBF-4d32-AE69-72968C6EB738} 
  `version` VARCHAR(255), # columnId={DD7945CB-802B-468f-BA11-ECC32A722079} 
  `name` VARCHAR(255), # columnId={FC5837B7-DD71-49ab-8015-87DC927CD034} 
  `notes` VARCHAR(255), # columnId={BC0FDE16-552E-4c0b-89A7-DAE24A40F4EC} 
  `created` VARCHAR(255), # columnId={EB5FAE3E-D59B-4615-BB11-35876802B4A0} 
  `creator` VARCHAR(255), # columnId={4008A23B-BA19-4f87-B52E-49746E5464E8} 
  `last_editor` VARCHAR(255), # columnId={5395DABE-40A0-4290-9D1D-709A43DCD183} 
  `modified` VARCHAR(255), # columnId={FE2FEF68-4845-4c43-BF1D-F219979BA7E7} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `ChiFeatureStatus`
# 
# version 1.0
#
DROP TABLE IF EXISTS `ChiFeatureStatus`;
CREATE TABLE `ChiFeatureStatus` # entityType=ChiFeatureStatus tableId=EAID_4EFCA1BF_35BD_4395_A2E2_CE5ECC2DF98C
(
  `id` INT(11) NOT NULL, # columnId=EAID_4EFCA1BF_35BD_4395_A2E2_CE5ECC2DF98C_id 
  `name` VARCHAR(255), # columnId={FC5837B7-DD71-49ab-8015-87DC927CD034} 
  `notes` VARCHAR(255), # columnId={BC0FDE16-552E-4c0b-89A7-DAE24A40F4EC} 
  `created` VARCHAR(255), # columnId={EB5FAE3E-D59B-4615-BB11-35876802B4A0} 
  `creator` VARCHAR(255), # columnId={4008A23B-BA19-4f87-B52E-49746E5464E8} 
  `last_editor` VARCHAR(255), # columnId={5395DABE-40A0-4290-9D1D-709A43DCD183} 
  `modified` VARCHAR(255), # columnId={FE2FEF68-4845-4c43-BF1D-F219979BA7E7} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `ChiRequirementStatus`
# 
# version 1.0
#
DROP TABLE IF EXISTS `ChiRequirementStatus`;
CREATE TABLE `ChiRequirementStatus` # entityType=ChiRequirementStatus tableId=EAID_253B1C26_A49E_4b52_BEDD_2F470DC6FEDE
(
  `id` INT(11) NOT NULL, # columnId=EAID_253B1C26_A49E_4b52_BEDD_2F470DC6FEDE_id 
  `name` VARCHAR(255), # columnId={FC5837B7-DD71-49ab-8015-87DC927CD034} 
  `notes` VARCHAR(255), # columnId={BC0FDE16-552E-4c0b-89A7-DAE24A40F4EC} 
  `created` VARCHAR(255), # columnId={EB5FAE3E-D59B-4615-BB11-35876802B4A0} 
  `creator` VARCHAR(255), # columnId={4008A23B-BA19-4f87-B52E-49746E5464E8} 
  `last_editor` VARCHAR(255), # columnId={5395DABE-40A0-4290-9D1D-709A43DCD183} 
  `modified` VARCHAR(255), # columnId={FE2FEF68-4845-4c43-BF1D-F219979BA7E7} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `ChiRequirementType`
# Type of requirement
# version 1.0
#
DROP TABLE IF EXISTS `ChiRequirementType`;
CREATE TABLE `ChiRequirementType` # entityType=ChiRequirementType tableId=EAID_B4D8CC31_7D39_46cd_A2B6_2D57DF2A04CF
(
  `id` INT(11) NOT NULL, # columnId=EAID_B4D8CC31_7D39_46cd_A2B6_2D57DF2A04CF_id 
  `name` VARCHAR(255), # columnId={FC5837B7-DD71-49ab-8015-87DC927CD034} 
  `notes` VARCHAR(255), # columnId={BC0FDE16-552E-4c0b-89A7-DAE24A40F4EC} 
  `created` VARCHAR(255), # columnId={EB5FAE3E-D59B-4615-BB11-35876802B4A0} 
  `creator` VARCHAR(255), # columnId={4008A23B-BA19-4f87-B52E-49746E5464E8} 
  `last_editor` VARCHAR(255), # columnId={5395DABE-40A0-4290-9D1D-709A43DCD183} 
  `modified` VARCHAR(255), # columnId={FE2FEF68-4845-4c43-BF1D-F219979BA7E7} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `ChiBusinessPartnerPassive`
# A ChiBusinesPartnerPassive is an indirect customer (typically a supplier) of the enterprise.
# version 1.0
#
DROP TABLE IF EXISTS `ChiBusinessPartnerPassive`;
CREATE TABLE `ChiBusinessPartnerPassive` # entityType=ChiBusinessPartnerPassive tableId=EAID_E82AFF41_CB05_4829_AA2A_402A1EAB7292
(
  `id` INT(11) NOT NULL, # columnId=EAID_E82AFF41_CB05_4829_AA2A_402A1EAB7292_id 
  `fk_chibusinessprocess_id` INT(11), # columnId=EAID_CF3A013D_F615_45c5_BE80_2604A693AAD3_fk_chibusinessprocess_id referencedTable=ChiBusinessProcess
  `fk_package_id` INT(11), # columnId=EAID_05C9EAF6_8B0B_44f9_AED7_CBC223C935FB_fk_package_id referencedTable=Package
  `alias` VARCHAR(255), # columnId={62D889AE-2BBF-4d32-AE69-72968C6EB738} 
  `version` VARCHAR(255), # columnId={DD7945CB-802B-468f-BA11-ECC32A722079} 
  `name` VARCHAR(255), # columnId={FC5837B7-DD71-49ab-8015-87DC927CD034} 
  `notes` VARCHAR(255), # columnId={BC0FDE16-552E-4c0b-89A7-DAE24A40F4EC} 
  `created` VARCHAR(255), # columnId={EB5FAE3E-D59B-4615-BB11-35876802B4A0} 
  `creator` VARCHAR(255), # columnId={4008A23B-BA19-4f87-B52E-49746E5464E8} 
  `last_editor` VARCHAR(255), # columnId={5395DABE-40A0-4290-9D1D-709A43DCD183} 
  `modified` VARCHAR(255), # columnId={FE2FEF68-4845-4c43-BF1D-F219979BA7E7} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `ChiWorker`
# A ChiWorker is a special actor that works within the enterprise. 
# version 1.0
#
DROP TABLE IF EXISTS `ChiWorker`;
CREATE TABLE `ChiWorker` # entityType=ChiWorker tableId=EAID_4B1FF5A9_E03E_441c_ADD2_BD9B082D4D20
(
  `id` INT(11) NOT NULL, # columnId=EAID_4B1FF5A9_E03E_441c_ADD2_BD9B082D4D20_id 
  `fk_chibusinessprocess_id` INT(11), # columnId=EAID_CF3A013D_F615_45c5_BE80_2604A693AAD3_fk_chibusinessprocess_id referencedTable=ChiBusinessProcess
  `fk_package_id` INT(11), # columnId=EAID_05C9EAF6_8B0B_44f9_AED7_CBC223C935FB_fk_package_id referencedTable=Package
  `alias` VARCHAR(255), # columnId={62D889AE-2BBF-4d32-AE69-72968C6EB738} 
  `version` VARCHAR(255), # columnId={DD7945CB-802B-468f-BA11-ECC32A722079} 
  `name` VARCHAR(255), # columnId={FC5837B7-DD71-49ab-8015-87DC927CD034} 
  `notes` VARCHAR(255), # columnId={BC0FDE16-552E-4c0b-89A7-DAE24A40F4EC} 
  `created` VARCHAR(255), # columnId={EB5FAE3E-D59B-4615-BB11-35876802B4A0} 
  `creator` VARCHAR(255), # columnId={4008A23B-BA19-4f87-B52E-49746E5464E8} 
  `last_editor` VARCHAR(255), # columnId={5395DABE-40A0-4290-9D1D-709A43DCD183} 
  `modified` VARCHAR(255), # columnId={FE2FEF68-4845-4c43-BF1D-F219979BA7E7} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `ChiWorkerExternal`
# A Chi External Worker is an employee that interacts directly with ChiBusinesPartner outside the enterprise.
# version 1.0
#
DROP TABLE IF EXISTS `ChiWorkerExternal`;
CREATE TABLE `ChiWorkerExternal` # entityType=ChiWorkerExternal tableId=EAID_52B75F68_6CC4_42bc_875F_E778C772B4C6
(
  `id` INT(11) NOT NULL, # columnId=EAID_52B75F68_6CC4_42bc_875F_E778C772B4C6_id 
  `fk_chibusinessprocess_id` INT(11), # columnId=EAID_CF3A013D_F615_45c5_BE80_2604A693AAD3_fk_chibusinessprocess_id referencedTable=ChiBusinessProcess
  `fk_package_id` INT(11), # columnId=EAID_05C9EAF6_8B0B_44f9_AED7_CBC223C935FB_fk_package_id referencedTable=Package
  `is_offlineuser` VARCHAR(255), # columnId={A86A8961-C0FE-49a5-8932-186FB6992842} 
  `alias` VARCHAR(255), # columnId={62D889AE-2BBF-4d32-AE69-72968C6EB738} 
  `version` VARCHAR(255), # columnId={DD7945CB-802B-468f-BA11-ECC32A722079} 
  `name` VARCHAR(255), # columnId={FC5837B7-DD71-49ab-8015-87DC927CD034} 
  `notes` VARCHAR(255), # columnId={BC0FDE16-552E-4c0b-89A7-DAE24A40F4EC} 
  `created` VARCHAR(255), # columnId={EB5FAE3E-D59B-4615-BB11-35876802B4A0} 
  `creator` VARCHAR(255), # columnId={4008A23B-BA19-4f87-B52E-49746E5464E8} 
  `last_editor` VARCHAR(255), # columnId={5395DABE-40A0-4290-9D1D-709A43DCD183} 
  `modified` VARCHAR(255), # columnId={FE2FEF68-4845-4c43-BF1D-F219979BA7E7} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `ChiWorkerInternal`
# A Chi  Worker Internal is an employee of the enterprise that has no contact with Business partners.
# version 1.0
#
DROP TABLE IF EXISTS `ChiWorkerInternal`;
CREATE TABLE `ChiWorkerInternal` # entityType=ChiWorkerInternal tableId=EAID_2A793A11_60C7_4108_9C85_18F6F015505F
(
  `id` INT(11) NOT NULL, # columnId=EAID_2A793A11_60C7_4108_9C85_18F6F015505F_id 
  `fk_chibusinessprocess_id` INT(11), # columnId=EAID_CF3A013D_F615_45c5_BE80_2604A693AAD3_fk_chibusinessprocess_id referencedTable=ChiBusinessProcess
  `fk_package_id` INT(11), # columnId=EAID_05C9EAF6_8B0B_44f9_AED7_CBC223C935FB_fk_package_id referencedTable=Package
  `alias` VARCHAR(255), # columnId={62D889AE-2BBF-4d32-AE69-72968C6EB738} 
  `version` VARCHAR(255), # columnId={DD7945CB-802B-468f-BA11-ECC32A722079} 
  `name` VARCHAR(255), # columnId={FC5837B7-DD71-49ab-8015-87DC927CD034} 
  `notes` VARCHAR(255), # columnId={BC0FDE16-552E-4c0b-89A7-DAE24A40F4EC} 
  `created` VARCHAR(255), # columnId={EB5FAE3E-D59B-4615-BB11-35876802B4A0} 
  `creator` VARCHAR(255), # columnId={4008A23B-BA19-4f87-B52E-49746E5464E8} 
  `last_editor` VARCHAR(255), # columnId={5395DABE-40A0-4290-9D1D-709A43DCD183} 
  `modified` VARCHAR(255), # columnId={FE2FEF68-4845-4c43-BF1D-F219979BA7E7} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `Actor`
# this class reppresent a generic actor.
# version 1.0
#
DROP TABLE IF EXISTS `Actor`;
CREATE TABLE `Actor` # entityType=Actor tableId=EAID_1134220A_E3FE_4daf_BC34_1DBA7BBB7DB2
(
  `id` INT(11) NOT NULL, # columnId=EAID_1134220A_E3FE_4daf_BC34_1DBA7BBB7DB2_id 
  `fk_chibusinessprocess_id` INT(11), # columnId=EAID_CF3A013D_F615_45c5_BE80_2604A693AAD3_fk_chibusinessprocess_id referencedTable=ChiBusinessProcess
  `fk_package_id` INT(11), # columnId=EAID_05C9EAF6_8B0B_44f9_AED7_CBC223C935FB_fk_package_id referencedTable=Package
  `alias` VARCHAR(255), # columnId={62D889AE-2BBF-4d32-AE69-72968C6EB738} 
  `version` VARCHAR(255), # columnId={DD7945CB-802B-468f-BA11-ECC32A722079} 
  `name` VARCHAR(255), # columnId={FC5837B7-DD71-49ab-8015-87DC927CD034} 
  `notes` VARCHAR(255), # columnId={BC0FDE16-552E-4c0b-89A7-DAE24A40F4EC} 
  `created` VARCHAR(255), # columnId={EB5FAE3E-D59B-4615-BB11-35876802B4A0} 
  `creator` VARCHAR(255), # columnId={4008A23B-BA19-4f87-B52E-49746E5464E8} 
  `last_editor` VARCHAR(255), # columnId={5395DABE-40A0-4290-9D1D-709A43DCD183} 
  `modified` VARCHAR(255), # columnId={FE2FEF68-4845-4c43-BF1D-F219979BA7E7} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `ChiBusinessProcess`
# A Business Process is a sum of actions that produces a business advantage to the enterprise. It is composed by one or many ChiBusinessUseCases.
# version 1.0
#
DROP TABLE IF EXISTS `ChiBusinessProcess`;
CREATE TABLE `ChiBusinessProcess` # entityType=ChiBusinessProcess tableId=EAID_CF3A013D_F615_45c5_BE80_2604A693AAD3
(
  `id` INT(11) NOT NULL, # columnId=EAID_CF3A013D_F615_45c5_BE80_2604A693AAD3_id 
  `fk_package_id` INT(11), # columnId=EAID_05C9EAF6_8B0B_44f9_AED7_CBC223C935FB_fk_package_id referencedTable=Package
  `fk_model_id` INT(11), # columnId=EAID_B92F55CA_30CA_468d_9088_A1880481B6C2_fk_model_id referencedTable=Model
  `alias` VARCHAR(255), # columnId={62D889AE-2BBF-4d32-AE69-72968C6EB738} 
  `version` VARCHAR(255), # columnId={DD7945CB-802B-468f-BA11-ECC32A722079} 
  `name` VARCHAR(255), # columnId={FC5837B7-DD71-49ab-8015-87DC927CD034} 
  `notes` VARCHAR(255), # columnId={BC0FDE16-552E-4c0b-89A7-DAE24A40F4EC} 
  `created` VARCHAR(255), # columnId={EB5FAE3E-D59B-4615-BB11-35876802B4A0} 
  `creator` VARCHAR(255), # columnId={4008A23B-BA19-4f87-B52E-49746E5464E8} 
  `last_editor` VARCHAR(255), # columnId={5395DABE-40A0-4290-9D1D-709A43DCD183} 
  `modified` VARCHAR(255), # columnId={FE2FEF68-4845-4c43-BF1D-F219979BA7E7} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `ChiBusinessUseCase`
# A Business Use Case is part of a business process that produces an advantage to the enterprise.
# version 1.0
#
DROP TABLE IF EXISTS `ChiBusinessUseCase`;
CREATE TABLE `ChiBusinessUseCase` # entityType=ChiBusinessUseCase tableId=EAID_A59A19CD_77D2_4018_9BB1_768011088E88
(
  `id` INT(11) NOT NULL, # columnId=EAID_A59A19CD_77D2_4018_9BB1_768011088E88_id 
  `fk_chibusinessprocess_id` INT(11), # columnId=EAID_CF3A013D_F615_45c5_BE80_2604A693AAD3_fk_chibusinessprocess_id referencedTable=ChiBusinessProcess
  `primaryactor` VARCHAR(255), # columnId={4041F610-32BC-4189-B2DC-A39C60D94F05} 
  `otheractors` VARCHAR(255), # columnId={81EC46D8-DF2B-4ab2-B858-561EAFD144C4} 
  `goalincontext` VARCHAR(255), # columnId={D8CF4340-B3F6-4a7d-8B89-1ED7CD5A8A3B} 
  `scope` VARCHAR(255), # columnId={457D6B8F-5C6C-4614-A4AE-B7219A490CB6} 
  `level` VARCHAR(255), # columnId={473B21EA-AE12-483b-8742-31DC9775A8DE} 
  `stakeholders` VARCHAR(255), # columnId={FD8341F1-A37A-4e05-995B-C8DF570F5DE9} 
  `precondition` VARCHAR(255), # columnId={F965589A-94D9-4589-B79A-01000B433301} 
  `trigger` VARCHAR(255), # columnId={544C139A-724F-4d10-8F4E-0C0BB70957BC} 
  `mainsuccessscenario` VARCHAR(255), # columnId={6B11E95D-EB71-4741-A81D-52F8CE4343F1} 
  `extensions` VARCHAR(255), # columnId={A50BA5A6-35A0-46ea-ADE4-A0A65E31FA3A} 
  `alias` VARCHAR(255), # columnId={62D889AE-2BBF-4d32-AE69-72968C6EB738} 
  `version` VARCHAR(255), # columnId={DD7945CB-802B-468f-BA11-ECC32A722079} 
  `name` VARCHAR(255), # columnId={FC5837B7-DD71-49ab-8015-87DC927CD034} 
  `notes` VARCHAR(255), # columnId={BC0FDE16-552E-4c0b-89A7-DAE24A40F4EC} 
  `created` VARCHAR(255), # columnId={EB5FAE3E-D59B-4615-BB11-35876802B4A0} 
  `creator` VARCHAR(255), # columnId={4008A23B-BA19-4f87-B52E-49746E5464E8} 
  `last_editor` VARCHAR(255), # columnId={5395DABE-40A0-4290-9D1D-709A43DCD183} 
  `modified` VARCHAR(255), # columnId={FE2FEF68-4845-4c43-BF1D-F219979BA7E7} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `ChiBusinessUseCaseCore`
# A Core Use Case generates a value for an active business partner and is directly connected to the objectives (ChiGoals) of a company or the process of his existence (typically making money).
# version 1.0
#
DROP TABLE IF EXISTS `ChiBusinessUseCaseCore`;
CREATE TABLE `ChiBusinessUseCaseCore` # entityType=ChiBusinessUseCaseCore tableId=EAID_63789429_77BC_46a1_81D8_1D06696D0669
(
  `id` INT(11) NOT NULL, # columnId=EAID_63789429_77BC_46a1_81D8_1D06696D0669_id 
  `fk_chibusinessprocess_id` INT(11), # columnId=EAID_CF3A013D_F615_45c5_BE80_2604A693AAD3_fk_chibusinessprocess_id referencedTable=ChiBusinessProcess
  `primaryactor` VARCHAR(255), # columnId={4041F610-32BC-4189-B2DC-A39C60D94F05} 
  `otheractors` VARCHAR(255), # columnId={81EC46D8-DF2B-4ab2-B858-561EAFD144C4} 
  `goalincontext` VARCHAR(255), # columnId={D8CF4340-B3F6-4a7d-8B89-1ED7CD5A8A3B} 
  `scope` VARCHAR(255), # columnId={457D6B8F-5C6C-4614-A4AE-B7219A490CB6} 
  `level` VARCHAR(255), # columnId={473B21EA-AE12-483b-8742-31DC9775A8DE} 
  `stakeholders` VARCHAR(255), # columnId={FD8341F1-A37A-4e05-995B-C8DF570F5DE9} 
  `precondition` VARCHAR(255), # columnId={F965589A-94D9-4589-B79A-01000B433301} 
  `trigger` VARCHAR(255), # columnId={544C139A-724F-4d10-8F4E-0C0BB70957BC} 
  `mainsuccessscenario` VARCHAR(255), # columnId={6B11E95D-EB71-4741-A81D-52F8CE4343F1} 
  `extensions` VARCHAR(255), # columnId={A50BA5A6-35A0-46ea-ADE4-A0A65E31FA3A} 
  `alias` VARCHAR(255), # columnId={62D889AE-2BBF-4d32-AE69-72968C6EB738} 
  `version` VARCHAR(255), # columnId={DD7945CB-802B-468f-BA11-ECC32A722079} 
  `name` VARCHAR(255), # columnId={FC5837B7-DD71-49ab-8015-87DC927CD034} 
  `notes` VARCHAR(255), # columnId={BC0FDE16-552E-4c0b-89A7-DAE24A40F4EC} 
  `created` VARCHAR(255), # columnId={EB5FAE3E-D59B-4615-BB11-35876802B4A0} 
  `creator` VARCHAR(255), # columnId={4008A23B-BA19-4f87-B52E-49746E5464E8} 
  `last_editor` VARCHAR(255), # columnId={5395DABE-40A0-4290-9D1D-709A43DCD183} 
  `modified` VARCHAR(255), # columnId={FE2FEF68-4845-4c43-BF1D-F219979BA7E7} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `ChiBusinessPartner`
# A ChiBusinesPartner is an external person that has a Business relation with the enterprise.
# version 1.0
#
DROP TABLE IF EXISTS `ChiBusinessPartner`;
CREATE TABLE `ChiBusinessPartner` # entityType=ChiBusinessPartner tableId=EAID_0518754B_9320_4acd_8B6D_869425C63F2A
(
  `id` INT(11) NOT NULL, # columnId=EAID_0518754B_9320_4acd_8B6D_869425C63F2A_id 
  `fk_chibusinessprocess_id` INT(11), # columnId=EAID_CF3A013D_F615_45c5_BE80_2604A693AAD3_fk_chibusinessprocess_id referencedTable=ChiBusinessProcess
  `fk_package_id` INT(11), # columnId=EAID_05C9EAF6_8B0B_44f9_AED7_CBC223C935FB_fk_package_id referencedTable=Package
  `alias` VARCHAR(255), # columnId={62D889AE-2BBF-4d32-AE69-72968C6EB738} 
  `version` VARCHAR(255), # columnId={DD7945CB-802B-468f-BA11-ECC32A722079} 
  `name` VARCHAR(255), # columnId={FC5837B7-DD71-49ab-8015-87DC927CD034} 
  `notes` VARCHAR(255), # columnId={BC0FDE16-552E-4c0b-89A7-DAE24A40F4EC} 
  `created` VARCHAR(255), # columnId={EB5FAE3E-D59B-4615-BB11-35876802B4A0} 
  `creator` VARCHAR(255), # columnId={4008A23B-BA19-4f87-B52E-49746E5464E8} 
  `last_editor` VARCHAR(255), # columnId={5395DABE-40A0-4290-9D1D-709A43DCD183} 
  `modified` VARCHAR(255), # columnId={FE2FEF68-4845-4c43-BF1D-F219979BA7E7} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `ChiBusinessPartnerActive`
# A ChiBusinesPartnerActive is a direct customer of the enterprise.
# version 1.0
#
DROP TABLE IF EXISTS `ChiBusinessPartnerActive`;
CREATE TABLE `ChiBusinessPartnerActive` # entityType=ChiBusinessPartnerActive tableId=EAID_A7C01B9A_19CF_43e8_AD85_7FD7DB295110
(
  `id` INT(11) NOT NULL, # columnId=EAID_A7C01B9A_19CF_43e8_AD85_7FD7DB295110_id 
  `fk_chibusinessprocess_id` INT(11), # columnId=EAID_CF3A013D_F615_45c5_BE80_2604A693AAD3_fk_chibusinessprocess_id referencedTable=ChiBusinessProcess
  `fk_package_id` INT(11), # columnId=EAID_05C9EAF6_8B0B_44f9_AED7_CBC223C935FB_fk_package_id referencedTable=Package
  `alias` VARCHAR(255), # columnId={62D889AE-2BBF-4d32-AE69-72968C6EB738} 
  `version` VARCHAR(255), # columnId={DD7945CB-802B-468f-BA11-ECC32A722079} 
  `name` VARCHAR(255), # columnId={FC5837B7-DD71-49ab-8015-87DC927CD034} 
  `notes` VARCHAR(255), # columnId={BC0FDE16-552E-4c0b-89A7-DAE24A40F4EC} 
  `created` VARCHAR(255), # columnId={EB5FAE3E-D59B-4615-BB11-35876802B4A0} 
  `creator` VARCHAR(255), # columnId={4008A23B-BA19-4f87-B52E-49746E5464E8} 
  `last_editor` VARCHAR(255), # columnId={5395DABE-40A0-4290-9D1D-709A43DCD183} 
  `modified` VARCHAR(255), # columnId={FE2FEF68-4845-4c43-BF1D-F219979BA7E7} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `adodbseq`
# 
# version 1.0
#
DROP TABLE IF EXISTS `adodbseq`;
CREATE TABLE `adodbseq` # entityType=Adodbseq tableId=EAID_3C3FC8F0_DD8A_4ad9_BB10_403825A48C9C
(
  `id` INT(11) NOT NULL, # columnId=EAID_3C3FC8F0_DD8A_4ad9_BB10_403825A48C9C_id 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `Locktable`
# 
# version 1.0
#
DROP TABLE IF EXISTS `Locktable`;
CREATE TABLE `Locktable` # entityType=Locktable tableId=EAID_ADC6F227_2E89_41a1_8EA3_9B73820EC9D8
(
  `id` INT(11) NOT NULL, # columnId=EAID_ADC6F227_2E89_41a1_8EA3_9B73820EC9D8_id 
  `fk_user_id` INT(11), # columnId=EAID_B8AEA9E2_2228_42b9_9121_FDA1DF50E05D_fk_user_id referencedTable=UserRDB
  `oid` VARCHAR(255), # columnId={C18AF095-575E-4c60-9240-37EE7976CEB5} 
  `sid` VARCHAR(255), # columnId={C690480B-E434-4675-807B-7DA3C1FC71E9} 
  `since` VARCHAR(255), # columnId={436EB7C1-122C-42c2-81F2-D519B950E934} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `nm_user_role`
# 
# version 1.0
#
DROP TABLE IF EXISTS `nm_user_role`;
CREATE TABLE `nm_user_role` # entityType=NMUserRole tableId=EAID_4AB7C88E_CE09_4fba_A8C9_1DBEEC9B5EFC
(
  `id` INT(11) NOT NULL, # columnId=EAID_4AB7C88E_CE09_4fba_A8C9_1DBEEC9B5EFC_id 
  `fk_role_id` INT(11), # columnId=EAID_74CB3FF5_27C7_435e_BECA_F3511F6A181D_fk_role_id referencedTable=RoleRDB
  `fk_user_id` INT(11), # columnId=EAID_B8AEA9E2_2228_42b9_9121_FDA1DF50E05D_fk_user_id referencedTable=UserRDB
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `RoleRDB`
# 
# version 1.0
#
DROP TABLE IF EXISTS `RoleRDB`;
CREATE TABLE `RoleRDB` # entityType=RoleRDB tableId=EAID_74CB3FF5_27C7_435e_BECA_F3511F6A181D
(
  `id` INT(11) NOT NULL, # columnId=EAID_74CB3FF5_27C7_435e_BECA_F3511F6A181D_id 
  `name` VARCHAR(50), # columnId={451E3B0C-4DF2-4f43-9F9E-88306EFE8D68} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `user`
# 
# version 1.0
#
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` # entityType=UserRDB tableId=EAID_B8AEA9E2_2228_42b9_9121_FDA1DF50E05D
(
  `id` INT(11) NOT NULL, # columnId=EAID_B8AEA9E2_2228_42b9_9121_FDA1DF50E05D_id 
  `login` VARCHAR(255), # columnId={6FFE27BD-3B95-4828-B26A-A41AEC65B651} 
  `password` VARCHAR(255), # columnId={0F69EA9D-4963-4608-99DB-F35CE1159BDB} 
  `name` VARCHAR(255), # columnId={23BEDAEE-0278-4fb6-ABD1-E12AEE461A12} 
  `firstname` VARCHAR(50), # columnId={7AA15204-4902-45a5-AF96-599B511B4812} 
  `config` VARCHAR(255), # columnId={F0758E3B-E9D4-4dd9-A108-472A2CBE8CDA} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `ChiAuthors`
# all the involved in the project can be considered authors.
# version 1.0
#
DROP TABLE IF EXISTS `ChiAuthors`;
CREATE TABLE `ChiAuthors` # entityType=ChiAuthors tableId=EAID_5FE413E3_1A62_481e_BA5D_E6DB6DDDF19C
(
  `id` INT(11) NOT NULL, # columnId=EAID_5FE413E3_1A62_481e_BA5D_E6DB6DDDF19C_id 
  `role` VARCHAR(255), # columnId={D45593F8-C3B5-402d-B584-D98FE9F5D224} 
  `name` VARCHAR(255), # columnId={FC5837B7-DD71-49ab-8015-87DC927CD034} 
  `notes` VARCHAR(255), # columnId={BC0FDE16-552E-4c0b-89A7-DAE24A40F4EC} 
  `created` VARCHAR(255), # columnId={EB5FAE3E-D59B-4615-BB11-35876802B4A0} 
  `creator` VARCHAR(255), # columnId={4008A23B-BA19-4f87-B52E-49746E5464E8} 
  `last_editor` VARCHAR(255), # columnId={5395DABE-40A0-4290-9D1D-709A43DCD183} 
  `modified` VARCHAR(255), # columnId={FE2FEF68-4845-4c43-BF1D-F219979BA7E7} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `ChiNode`
# 
# version 1.0
#
DROP TABLE IF EXISTS `ChiNode`;
CREATE TABLE `ChiNode` # entityType=ChiNode tableId=EAID_8AFE696D_2AAD_4e0d_A928_30389C846838
(
  `id` INT(11) NOT NULL, # columnId=EAID_8AFE696D_2AAD_4e0d_A928_30389C846838_id 
  `fk_chicontroller_id` INT(11), # columnId=EAID_AF6EF41B_69E6_49d4_ADE9_5BF995414A9E_fk_chicontroller_id referencedTable=ChiController
  `alias` VARCHAR(255), # columnId={62D889AE-2BBF-4d32-AE69-72968C6EB738} 
  `version` VARCHAR(255), # columnId={DD7945CB-802B-468f-BA11-ECC32A722079} 
  `name` VARCHAR(255), # columnId={FC5837B7-DD71-49ab-8015-87DC927CD034} 
  `notes` VARCHAR(255), # columnId={BC0FDE16-552E-4c0b-89A7-DAE24A40F4EC} 
  `created` VARCHAR(255), # columnId={EB5FAE3E-D59B-4615-BB11-35876802B4A0} 
  `creator` VARCHAR(255), # columnId={4008A23B-BA19-4f87-B52E-49746E5464E8} 
  `last_editor` VARCHAR(255), # columnId={5395DABE-40A0-4290-9D1D-709A43DCD183} 
  `modified` VARCHAR(255), # columnId={FE2FEF68-4845-4c43-BF1D-F219979BA7E7} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `ChiController`
# 
# version 1.0
#
DROP TABLE IF EXISTS `ChiController`;
CREATE TABLE `ChiController` # entityType=ChiController tableId=EAID_AF6EF41B_69E6_49d4_ADE9_5BF995414A9E
(
  `id` INT(11) NOT NULL, # columnId=EAID_AF6EF41B_69E6_49d4_ADE9_5BF995414A9E_id 
  `alias` VARCHAR(255), # columnId={62D889AE-2BBF-4d32-AE69-72968C6EB738} 
  `version` VARCHAR(255), # columnId={DD7945CB-802B-468f-BA11-ECC32A722079} 
  `name` VARCHAR(255), # columnId={FC5837B7-DD71-49ab-8015-87DC927CD034} 
  `notes` VARCHAR(255), # columnId={BC0FDE16-552E-4c0b-89A7-DAE24A40F4EC} 
  `created` VARCHAR(255), # columnId={EB5FAE3E-D59B-4615-BB11-35876802B4A0} 
  `creator` VARCHAR(255), # columnId={4008A23B-BA19-4f87-B52E-49746E5464E8} 
  `last_editor` VARCHAR(255), # columnId={5395DABE-40A0-4290-9D1D-709A43DCD183} 
  `modified` VARCHAR(255), # columnId={FE2FEF68-4845-4c43-BF1D-F219979BA7E7} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `ChiView`
# 
# version 1.0
#
DROP TABLE IF EXISTS `ChiView`;
CREATE TABLE `ChiView` # entityType=ChiView tableId=EAID_8DC5A1D2_AA2C_4d96_9B47_B1C7C93F9DA3
(
  `id` INT(11) NOT NULL, # columnId=EAID_8DC5A1D2_AA2C_4d96_9B47_B1C7C93F9DA3_id 
  `alias` VARCHAR(255), # columnId={62D889AE-2BBF-4d32-AE69-72968C6EB738} 
  `version` VARCHAR(255), # columnId={DD7945CB-802B-468f-BA11-ECC32A722079} 
  `name` VARCHAR(255), # columnId={FC5837B7-DD71-49ab-8015-87DC927CD034} 
  `notes` VARCHAR(255), # columnId={BC0FDE16-552E-4c0b-89A7-DAE24A40F4EC} 
  `created` VARCHAR(255), # columnId={EB5FAE3E-D59B-4615-BB11-35876802B4A0} 
  `creator` VARCHAR(255), # columnId={4008A23B-BA19-4f87-B52E-49746E5464E8} 
  `last_editor` VARCHAR(255), # columnId={5395DABE-40A0-4290-9D1D-709A43DCD183} 
  `modified` VARCHAR(255), # columnId={FE2FEF68-4845-4c43-BF1D-F219979BA7E7} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `ChiValue`
# 
# version 1.0
#
DROP TABLE IF EXISTS `ChiValue`;
CREATE TABLE `ChiValue` # entityType=ChiValue tableId=EAID_75A961F2_4EE3_452e_B190_A5838FB6879E
(
  `id` INT(11) NOT NULL, # columnId=EAID_75A961F2_4EE3_452e_B190_A5838FB6879E_id 
  `fk_chinode_id` INT(11), # columnId=EAID_8AFE696D_2AAD_4e0d_A928_30389C846838_fk_chinode_id referencedTable=ChiNode
  `alias` VARCHAR(255), # columnId={62D889AE-2BBF-4d32-AE69-72968C6EB738} 
  `version` VARCHAR(255), # columnId={DD7945CB-802B-468f-BA11-ECC32A722079} 
  `name` VARCHAR(255), # columnId={FC5837B7-DD71-49ab-8015-87DC927CD034} 
  `notes` VARCHAR(255), # columnId={BC0FDE16-552E-4c0b-89A7-DAE24A40F4EC} 
  `created` VARCHAR(255), # columnId={EB5FAE3E-D59B-4615-BB11-35876802B4A0} 
  `creator` VARCHAR(255), # columnId={4008A23B-BA19-4f87-B52E-49746E5464E8} 
  `last_editor` VARCHAR(255), # columnId={5395DABE-40A0-4290-9D1D-709A43DCD183} 
  `modified` VARCHAR(255), # columnId={FE2FEF68-4845-4c43-BF1D-F219979BA7E7} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `ChiBase`
# 
# version 1.0
#
DROP TABLE IF EXISTS `ChiBase`;
CREATE TABLE `ChiBase` # entityType=ChiBase tableId=EAID_0DD1F31D_98F5_4ddb_8F98_A177FCECD6A2
(
  `id` INT(11) NOT NULL, # columnId=EAID_0DD1F31D_98F5_4ddb_8F98_A177FCECD6A2_id 
  `alias` VARCHAR(255), # columnId={62D889AE-2BBF-4d32-AE69-72968C6EB738} 
  `version` VARCHAR(255), # columnId={DD7945CB-802B-468f-BA11-ECC32A722079} 
  `name` VARCHAR(255), # columnId={FC5837B7-DD71-49ab-8015-87DC927CD034} 
  `notes` VARCHAR(255), # columnId={BC0FDE16-552E-4c0b-89A7-DAE24A40F4EC} 
  `created` VARCHAR(255), # columnId={EB5FAE3E-D59B-4615-BB11-35876802B4A0} 
  `creator` VARCHAR(255), # columnId={4008A23B-BA19-4f87-B52E-49746E5464E8} 
  `last_editor` VARCHAR(255), # columnId={5395DABE-40A0-4290-9D1D-709A43DCD183} 
  `modified` VARCHAR(255), # columnId={FE2FEF68-4845-4c43-BF1D-F219979BA7E7} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `EntityBase`
# 
# version 1.0
#
DROP TABLE IF EXISTS `EntityBase`;
CREATE TABLE `EntityBase` # entityType=EntityBase tableId=EAID_8DF7B5BB_D115_4091_9813_2FC5E5BAA738
(
  `id` INT(11) NOT NULL, # columnId=EAID_8DF7B5BB_D115_4091_9813_2FC5E5BAA738_id 
  `created` VARCHAR(255), # columnId={EB5FAE3E-D59B-4615-BB11-35876802B4A0} 
  `creator` VARCHAR(255), # columnId={4008A23B-BA19-4f87-B52E-49746E5464E8} 
  `last_editor` VARCHAR(255), # columnId={5395DABE-40A0-4290-9D1D-709A43DCD183} 
  `modified` VARCHAR(255), # columnId={FE2FEF68-4845-4c43-BF1D-F219979BA7E7} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `EntityBaseExtended`
# 
# version 1.0
#
DROP TABLE IF EXISTS `EntityBaseExtended`;
CREATE TABLE `EntityBaseExtended` # entityType=EntityBaseExtended tableId=EAID_B9B245DB_0CBD_4500_AE96_C0FFE7DEFB50
(
  `id` INT(11) NOT NULL, # columnId=EAID_B9B245DB_0CBD_4500_AE96_C0FFE7DEFB50_id 
  `name` VARCHAR(255), # columnId={FC5837B7-DD71-49ab-8015-87DC927CD034} 
  `notes` VARCHAR(255), # columnId={BC0FDE16-552E-4c0b-89A7-DAE24A40F4EC} 
  `created` VARCHAR(255), # columnId={EB5FAE3E-D59B-4615-BB11-35876802B4A0} 
  `creator` VARCHAR(255), # columnId={4008A23B-BA19-4f87-B52E-49746E5464E8} 
  `last_editor` VARCHAR(255), # columnId={5395DABE-40A0-4290-9D1D-709A43DCD183} 
  `modified` VARCHAR(255), # columnId={FE2FEF68-4845-4c43-BF1D-F219979BA7E7} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `Package`
# 
# version 1.0
#
DROP TABLE IF EXISTS `Package`;
CREATE TABLE `Package` # entityType=Package tableId=EAID_05C9EAF6_8B0B_44f9_AED7_CBC223C935FB
(
  `id` INT(11) NOT NULL, # columnId=EAID_05C9EAF6_8B0B_44f9_AED7_CBC223C935FB_id 
  `fk_chibusinessprocess_id` INT(11), # columnId=EAID_CF3A013D_F615_45c5_BE80_2604A693AAD3_fk_chibusinessprocess_id referencedTable=ChiBusinessProcess
  `fk_package_id` INT(11), # columnId=EAID_05C9EAF6_8B0B_44f9_AED7_CBC223C935FB_fk_package_id referencedTable=Package
  `fk_model_id` INT(11), # columnId=EAID_B92F55CA_30CA_468d_9088_A1880481B6C2_fk_model_id referencedTable=Model
  `alias` VARCHAR(255), # columnId={62D889AE-2BBF-4d32-AE69-72968C6EB738} 
  `version` VARCHAR(255), # columnId={DD7945CB-802B-468f-BA11-ECC32A722079} 
  `name` VARCHAR(255), # columnId={FC5837B7-DD71-49ab-8015-87DC927CD034} 
  `notes` VARCHAR(255), # columnId={BC0FDE16-552E-4c0b-89A7-DAE24A40F4EC} 
  `created` VARCHAR(255), # columnId={EB5FAE3E-D59B-4615-BB11-35876802B4A0} 
  `creator` VARCHAR(255), # columnId={4008A23B-BA19-4f87-B52E-49746E5464E8} 
  `last_editor` VARCHAR(255), # columnId={5395DABE-40A0-4290-9D1D-709A43DCD183} 
  `modified` VARCHAR(255), # columnId={FE2FEF68-4845-4c43-BF1D-F219979BA7E7} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `Diagram`
# 
# version 1.0
#
DROP TABLE IF EXISTS `Diagram`;
CREATE TABLE `Diagram` # entityType=Diagram tableId=EAID_F6E80A6E_A203_4fb4_9DD0_FE227031ADD1
(
  `id` INT(11) NOT NULL, # columnId=EAID_F6E80A6E_A203_4fb4_9DD0_FE227031ADD1_id 
  `fk_chibusinessprocess_id` INT(11), # columnId=EAID_CF3A013D_F615_45c5_BE80_2604A693AAD3_fk_chibusinessprocess_id referencedTable=ChiBusinessProcess
  `fk_package_id` INT(11), # columnId=EAID_05C9EAF6_8B0B_44f9_AED7_CBC223C935FB_fk_package_id referencedTable=Package
  `width` VARCHAR(255), # columnId={C920C9C4-4CD6-451c-BA0C-F79F4065D67D} 
  `height` VARCHAR(255), # columnId={C44650C8-6BA5-4129-A77E-A2D7D2B3983B} 
  `alias` VARCHAR(255), # columnId={62D889AE-2BBF-4d32-AE69-72968C6EB738} 
  `version` VARCHAR(255), # columnId={DD7945CB-802B-468f-BA11-ECC32A722079} 
  `name` VARCHAR(255), # columnId={FC5837B7-DD71-49ab-8015-87DC927CD034} 
  `notes` VARCHAR(255), # columnId={BC0FDE16-552E-4c0b-89A7-DAE24A40F4EC} 
  `created` VARCHAR(255), # columnId={EB5FAE3E-D59B-4615-BB11-35876802B4A0} 
  `creator` VARCHAR(255), # columnId={4008A23B-BA19-4f87-B52E-49746E5464E8} 
  `last_editor` VARCHAR(255), # columnId={5395DABE-40A0-4290-9D1D-709A43DCD183} 
  `modified` VARCHAR(255), # columnId={FE2FEF68-4845-4c43-BF1D-F219979BA7E7} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
#
# Structure of Table `Model`
# 
# version 1.0
#
DROP TABLE IF EXISTS `Model`;
CREATE TABLE `Model` # entityType=Model tableId=EAID_B92F55CA_30CA_468d_9088_A1880481B6C2
(
  `id` INT(11) NOT NULL, # columnId=EAID_B92F55CA_30CA_468d_9088_A1880481B6C2_id 
  `alias` VARCHAR(255), # columnId={62D889AE-2BBF-4d32-AE69-72968C6EB738} 
  `version` VARCHAR(255), # columnId={DD7945CB-802B-468f-BA11-ECC32A722079} 
  `name` VARCHAR(255), # columnId={FC5837B7-DD71-49ab-8015-87DC927CD034} 
  `notes` VARCHAR(255), # columnId={BC0FDE16-552E-4c0b-89A7-DAE24A40F4EC} 
  `created` VARCHAR(255), # columnId={EB5FAE3E-D59B-4615-BB11-35876802B4A0} 
  `creator` VARCHAR(255), # columnId={4008A23B-BA19-4f87-B52E-49746E5464E8} 
  `last_editor` VARCHAR(255), # columnId={5395DABE-40A0-4290-9D1D-709A43DCD183} 
  `modified` VARCHAR(255), # columnId={FE2FEF68-4845-4c43-BF1D-F219979BA7E7} 
  PRIMARY KEY (`id`)
) TYPE=MyISAM;
