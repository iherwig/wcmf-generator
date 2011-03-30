# Update legacy mappings without reference_type set
UPDATE ChiValueRef SET ChiValueRef.reference_type=CONCAT('ChiNode:', (SELECT ChiValue.fk_chinode_id FROM ChiValue WHERE ChiValue.id = SUBSTR(ChiValueRef.reference_value, 10))) WHERE ChiValueRef.reference_type IS NULL;
