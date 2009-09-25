package net.sourceforge.olympos.dionysos.json.test;
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
	static baseUrl = 'http://localhost:8080/JsonTest/json/index'
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
	* The name of a class to test
	*/
	static baseClassName = 'Movie'
	/**
	 * The name of a class to test the list command. Must exist in exactly 5 instances.
	 */
	static listClassName = 'Movie'
	/**
	 * The name of a class to test the create command.  
	 */
	static createClassName = 'Movie'

	/**
	 * The name of a class to test the delete command.  
	 */
	static deleteOid = 'Person:1'

	static deleteInvalidOid = 'Person:MyOid'

	static deleteInvalidClass = 'MyPerson:1'
	/**
	 * A valid field name of the listClass 
	 */
	static listClassFieldName = 'title'

	/**
	 * The oid of the base object to test read with.
	 */
	static readBaseOid = 'Movie:1'
	/**
	 * Attribute name of the attribute of the base object which contains the first level object
	 */
	static readBaseAttributeName = 'director'
	/**
	 * Oid of the object contained directly in the base object
	 */
	static readFirstLevelOid = 'Person:1'
	/**
	 * Attribute name of the attribute of the first level object which contains the second level object
	 */
	static readFirstLevelAttributeName = 'shirt'
	/**
	 * Attribute name of the attribute of the first level object containing the base object
	 */
	static readFirstLevelParentAttributeName = 'mainMovie'
	/**
	 * Oid of the object contained by the first level object
	 */
	static readSecondLevelOid = 'Clothes:345'

	/**
	 * The oid of the object for update test
	 */
	static updateOid = 'Movie:1'
	/**
	* The name of a class to test the update command with invalid id
	*/
	static updateClassName = 'Movie'
	/**
	 * The value for lastChange to succeed in all cases
	 */
	static updateLastChange = 0
	/**
	 * Name of a string attribute
	 */
	static updateStringAttributeName = 'title'
	/**
	 * Name of an integer attribute
	 */
	static updateIntAttributeName = 'yearOfPublishing'
	/**
	 * Name of a boolean attribute
	 */
	static updateBooleanAttributeName = 'groundbreaking'

	/**
	 * last change value for update operation
	 */
	static lastChange = '1234567890'
	/**
	 * attributes for Update operation
	 */
	static attributes = '{"title": "Matrix The Original","groundbreaking": true}'

	static wrongAttributeValue = '{"title": "Matrix The Original","groundbreaking": "foo"}'
	static wrongAttributeValueErrorData = '{"groundbreaking":"foo"}'
		
	static wrongAttributeName = '{"title1": "Matrix The Original","groundbreaking": true}'

	/**
	 * attributes for executeActionSet operation
	 */

	static executeActionSetcreateClassName = 'Movie'	
	static executeActionSetUpdateOid = '{Movie:?}'
	static executeActionSetAttributes = '{"title": "Matrix The Original","groundbreaking": true}'

	/**
	 * attributes for associate and diassociate operation
	 */

	static associateSourceOid='Movie:1'
	static associateTargetOid='Person:1'
	static associateRelation='director'
	static associateWrongSourceOid='Movie:mine'
	static associateWrongTargetOid='Director:mine'
	static associateWrongSourceClass='Myclass:123'
	static associateWrongTargetClass='Myclass:123'
	static associateWrongRelation='MyRelation'

}
