package net.sourceforge.olympos.dionysus.json.test;
public class Cfg {
	/**
	 * If true, the parsed JSON will be written to the console.
	 */
	static debug = false
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
	static baseUrl = 'http://localhost/cwm/testHttp/index.php'

	/**
	 * A username which can successfully log in. Will be used for all requests. 
	 */
	static user = 'admin'
	/**
	 * The corresponding password.
	 */
	static password = 'password'

	/**
	 * The name of a class to test the list command. Must exist in exactly 5 instances.
	 */
	static listClassName = 'Movie'
	/**
	 * A valid field name of the listClass 
	 */
	static listClassFieldName = 'title'

	/**
	 * The oid of the base object to test read with.
	 */
	static readBaseOid = 'Movie:123'
	/**
	 * Attribute name of the attribute of the base object which contains the first level object
	 */
	static readBaseAttributeName = 'director'
	/**
	 * Oid of the object contained directly in the base object
	 */
	static readFirstLevelOid = 'Person:234'
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
	static updateOid = 'Movie:123'
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
}
