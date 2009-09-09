package net.sourceforge.olympos.dionysos.json.test.base;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
//test
@RunWith(Suite.class)
@Suite.SuiteClasses( {
	LoginTest.class,
	LogoutTest.class,
	ListTest.class,
	ReadTest.class,
	CreateTest.class,
	UpdateTest.class,
	AssociateTest.class,
	DisassociateTest.class,
	ExecuteActionSetTest.class
})
public class BasePackageSuite {

}
