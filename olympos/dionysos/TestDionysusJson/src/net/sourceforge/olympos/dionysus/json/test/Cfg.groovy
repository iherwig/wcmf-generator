package net.sourceforge.olympos.dionysus.json.test;
public class Cfg {
	/**
	 * If true, the parsed JSON will be written to the console.
	 */
	static debug = false
	
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
}
