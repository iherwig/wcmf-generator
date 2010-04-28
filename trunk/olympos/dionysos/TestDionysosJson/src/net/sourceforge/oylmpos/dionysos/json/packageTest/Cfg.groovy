package net.sourceforge.oylmpos.dionysos.json.packageTest;

public class Cfg {
	/**
	 * If true, the parsed JSON will be written to the console.
	 */
	static debug = true
	/**
	 * If true, the result will not be parsed as JSON but will be output as String.
	 * 
	 * This option prevents the testcases from succeeding, but it still sends the 
	 * correct request. Set this option if the returned result is no valid JSON.
	 */
	static debugJson = false
	/**
	 * If true, the login before each test request will be omitted.
	 */
	static debugLogin = false
	
	/**
	 * The base URL according to spec.
	 */
	static baseUrl = 'http://localhost:8080/packageTest/json/index'
	//static baseUrl = 'http://localhost/httptest/index.php'

	/**
	 * A username which can successfully log in. Will be used for all requests. 
	 */
	static user = 'admin'
	/**
	 * The corresponding password.
	 */
	static password = 'admin'

	/**
	 * attributes for executeActionSet operation
	 */
	static executeActionSetcreateClassName = 'com.eenergy.meregio.domain.AbsoluteDateTime'	
	static executeActionSetUpdateOid = '{com.eenergy.meregio.domain.AbsoluteDateTime:?}'
	static executeActionSetAttributes = '{"title": "Matrix The Original","groundbreaking": true}'

	static EAScreateParentClassName = 'CompositeParent'
	static EAScreateChildClassName = 'CompositeChild'
	static EASupdateParentClassNameOid = 'CompositeParent:1'
	static EASupdateChildClassNameOid = 'CompositeChild:1'
	static EASParentAttributes = '{"name": "Parent1"}'
	static EASChildAttributes = '{"name": "Child1"}'
	static EASassociateRelation = 'childrenComp'
	

}
