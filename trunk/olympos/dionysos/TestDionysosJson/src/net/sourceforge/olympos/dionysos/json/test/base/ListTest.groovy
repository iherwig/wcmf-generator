package net.sourceforge.olympos.dionysos.json.test.base;

import static org.junit.Assert.*

import org.junit.Test;

import net.sourceforge.olympos.dionysos.json.test.DionysosTest;

	public ListTest(String method) {
		super(method)
	}
	
	@Test
	public void simple() {
		//ensureLogin()
		//clearSid()
		
		request(
			[
			 	action: 'list',
			 	className: Cfg.listClassName
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('list', json.action)
				assertEquals(Cfg.listClassName, json.className)
				assertEquals(5, json.list.size())
				assertEquals(5, json.totalCount)

				assertElementClasses(json)
			},
			this.method
		)
	}

	@Test
	public void limit() {
		//ensureLogin()

		request(
			[
			 	action: 'list',
			 	className: Cfg.listClassName,
			 	limit: 3
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('list', json.action)
				assertEquals(Cfg.listClassName, json.className)
				assertEquals(3, json.limit)
				assertEquals(3, json.list.size())
				assertEquals(5, json.totalCount)

				assertElementClasses(json)
			},
			this.method
		)
	}

	@Test
	public void offset() {
		//ensureLogin()

		request(
			[
			 	action: 'list',
			 	className: Cfg.listClassName,
			 	offset: 3
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('list', json.action)
				assertEquals(Cfg.listClassName, json.className)
				assertEquals(3, json.offset)
				assertEquals(2, json.list.size())
				assertEquals(5, json.totalCount)

				assertElementClasses(json)
			},
			this.method
		)
	}

	@Test
	public void limitOffset() {
		ensureLogin()

		request(
			[
			 	action: 'list',
			 	className: Cfg.listClassName,
			 	limit: 2,
			 	offset: 2 
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('list', json.action)
				assertEquals(Cfg.listClassName, json.className)
				assertEquals(2, json.limit)
				assertEquals(2, json.offset)
				assertEquals(2, json.list.size())
				assertEquals(5, json.totalCount)

				assertElementClasses(json)
			},
			this.method
		)
	}

	@Test
	public void sort() {
		ensureLogin()

		request(
			[
			 	action: 'list',
			 	className: Cfg.listClassName,
			 	sortFieldName: Cfg.listClassFieldName
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('list', json.action)
				assertEquals(Cfg.listClassName, json.className)
				assertEquals(Cfg.listClassFieldName, json.sortFieldName)
				assertEquals(5, json.list.size())
				assertEquals(5, json.totalCount)

				assertElementClasses(json)

				assertSorting(json)
			},
			this.method
		)
	}

	@Test
	public void sortAsc() {
		ensureLogin()

		request(
			[
			 	action: 'list',
			 	className: Cfg.listClassName,
			 	sortFieldName: Cfg.listClassFieldName,
			 	sortDirection: 'asc'
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('list', json.action)
				assertEquals(Cfg.listClassName, json.className)
				assertEquals(Cfg.listClassFieldName, json.sortFieldName)
				assertEquals('asc', json.sortDirection)
				assertEquals(5, json.list.size())
				assertEquals(5, json.totalCount)

				assertElementClasses(json)

				//assertSorting(json)
			},
			this.method
		)
	}

	@Test
	public void sortDesc() {
		//ensureLogin()

		request(
			[
			 	action: 'list',
			 	className: Cfg.listClassName,
			 	sortFieldName: Cfg.listClassFieldName,
			 	sortDirection: 'desc'
			],
			{req, json ->
				assertTrue(json.success)
				assertEquals('list', json.action)
				assertEquals(Cfg.listClassName, json.className)
				assertEquals(Cfg.listClassFieldName, json.sortFieldName)
				assertEquals('desc', json.sortDirection)
				assertEquals(5, json.list.size())
				assertEquals(5, json.totalCount)

				assertElementClasses(json)

				//assertSorting(json, true)
			},
			this.method
		)
	}

	@Test
	public void limitNegative() {
		ensureLogin()

		request(
			[
			 	action: 'list',
			 	className: Cfg.listClassName,
			 	limit: -2
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('list', json.action)
				assertEquals('LIMIT_NEGATIVE', json.errorCode)
				assertElementClasses(json)
			},
			this.method
		)
	}

	@Test
	public void offsetNegative() {
		ensureLogin()

		request(
			[
			 	action: 'list',
			 	className: Cfg.listClassName,
			 	offset: -1
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('list', json.action)
				assertEquals('OFFSET_OUT_OF_BOUNDS', json.errorCode)
				assertElementClasses(json)
			},
			this.method
		)
	}

	@Test
	public void offsetEqual() {
		ensureLogin()

		request(
			[
			 	action: 'list',
			 	className: Cfg.listClassName,
			 	offset: 5
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('list', json.action)
				assertEquals('OFFSET_OUT_OF_BOUNDS', json.errorCode)

				assertElementClasses(json)
			},
			this.method
		)
	}

	@Test
	public void offsetAbove() {
		ensureLogin()

		request(
			[
			 	action: 'list',
			 	className: Cfg.listClassName,
			 	offset: 6
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('list', json.action)
				assertEquals('OFFSET_OUT_OF_BOUNDS', json.errorCode)

				assertElementClasses(json)
			},
			this.method
		)
	}

	@Test
	public void sortFieldUnknown() {
		//ensureLogin()

		request(
			[
			 	action: 'list',
			 	className: Cfg.listClassName,
			 	sortFieldName: Cfg.listClassFieldName + 'UnknownField'
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('list', json.action)
				assertEquals('SORT_FIELD_UNKNOWN', json.errorCode)
			},
			this.method
		)
	}

	@Test
	public void sortDirectionUnkown() {
		ensureLogin()

		request(
			[
			 	action: 'list',
			 	className: Cfg.listClassName,
			 	sortFieldName: Cfg.listClassFieldName,
			 	sortDirection: 'unknown'
			],
			{req, json ->
				assertFalse(json.success)
				assertEquals('list', json.action)
				assertEquals('SORT_DIRECTION_UNKNOWN', json.errorCode)
			},
			this.method
		)
	}

	private void assertElementClasses(json) {
		json.list.each {
			assertEquals(Cfg.listClassName, it.className.substring(0, Cfg.listClassName.length()))
		}
	}

	//This doesn't work because the sort field is buried in the attributes
	private void assertSorting(json, boolean reverse = false) {
		//clonenotsupported exception
		//def sortedList = json.list.clone()
		def sortedList = []
        json.list.each{
			sortedList.add(it)
		}

		sortedList.sort{it.attributes[Cfg.listClassFieldName]}

		if (reverse) {
			sortedList = sortedList.reverse()
		}
		println Cfg.listClassFieldName
		println json.list
		sortedList.eachWithIndex { obj, i ->
			assertEquals(obj, json.list[i])
		}
	}
}