/*
 * Copyright (c) 2008 The Olympos Development Team.
 * 
 * http://sourceforge.net/projects/olympos/
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html. If redistributing this code,
 * this entire header must remain intact.
 */

package net.sourceforge.olympos.oaw.extend;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

import org.junit.Test;

public class TestNameNormalizer {
	@Test
	public void testNormalizeClassName() throws Exception {
		assertEquals("ClassName", NameNormalizer.normalizeClassName("ClassName"));
		assertEquals("ClassName", NameNormalizer.normalizeClassName("className"));
		assertEquals("ClassName", NameNormalizer.normalizeClassName("Class Name"));
		assertEquals("ClassName", NameNormalizer.normalizeClassName("Class name"));
		assertEquals("ClassName", NameNormalizer.normalizeClassName("Class-Name"));
		assertEquals("ClassName", NameNormalizer.normalizeClassName("Class-name"));
		assertEquals("ClassName", NameNormalizer.normalizeClassName("Class_Name"));
		assertEquals("ClassName", NameNormalizer.normalizeClassName("Class_name"));
		assertEquals("ClassName", NameNormalizer.normalizeClassName("className"));
		assertEquals("ClassName", NameNormalizer.normalizeClassName("Class  Name"));
		assertEquals("ClassName", NameNormalizer.normalizeClassName("Class--name"));
		assertEquals("ClassName", NameNormalizer.normalizeClassName("Class - name"));
		assertEquals("ClaessName", NameNormalizer.normalizeClassName("ClässName"));
		assertEquals("ClassNme", NameNormalizer.normalizeClassName("ClassNáme"));
		assertEquals("ClassName", NameNormalizer.normalizeClassName(" ClassName"));
		assertEquals("ClassName", NameNormalizer.normalizeClassName(" className"));
		assertEquals("ClassName", NameNormalizer.normalizeClassName("ClassName "));
		assertEquals("", NameNormalizer.normalizeClassName(""));
		assertNull(NameNormalizer.normalizeClassName(null));
	}
	
	@Test
	public void testNormalizeMemberName() throws Exception {
		assertEquals("memberName", NameNormalizer.normalizeMemberName("memberName"));
		assertEquals("memberName", NameNormalizer.normalizeMemberName("MemberName"));
		assertEquals("memberName", NameNormalizer.normalizeMemberName("member Name"));
		assertEquals("memberName", NameNormalizer.normalizeMemberName("member name"));
		assertEquals("memberName", NameNormalizer.normalizeMemberName("member-Name"));
		assertEquals("memberName", NameNormalizer.normalizeMemberName("member-name"));
		assertEquals("memberName", NameNormalizer.normalizeMemberName("member_Name"));
		assertEquals("memberName", NameNormalizer.normalizeMemberName("member_name"));
		assertEquals("memberName", NameNormalizer.normalizeMemberName("memberName"));
		assertEquals("memberName", NameNormalizer.normalizeMemberName("member  Name"));
		assertEquals("memberName", NameNormalizer.normalizeMemberName("member--name"));
		assertEquals("memberName", NameNormalizer.normalizeMemberName("member - name"));
		assertEquals("memberNaeme", NameNormalizer.normalizeMemberName("memberNäme"));
		assertEquals("memberNme", NameNormalizer.normalizeMemberName("memberNáme"));
		assertEquals("memberName", NameNormalizer.normalizeMemberName(" memberName"));
		assertEquals("memberName", NameNormalizer.normalizeMemberName(" MemberName"));
		assertEquals("memberName", NameNormalizer.normalizeMemberName("memberName "));
		assertEquals("", NameNormalizer.normalizeMemberName(""));
		assertNull(NameNormalizer.normalizeMemberName(null));
	}

	@Test
	public void testNormalizePackageName() throws Exception {
		assertEquals("packagename", NameNormalizer.normalizePackageName("packageName"));
		assertEquals("packagename", NameNormalizer.normalizePackageName("PackageName"));
		assertEquals("packagename", NameNormalizer.normalizePackageName("package Name"));
		assertEquals("packagename", NameNormalizer.normalizePackageName("package name"));
		assertEquals("packagename", NameNormalizer.normalizePackageName("package-Name"));
		assertEquals("packagename", NameNormalizer.normalizePackageName("package-name"));
		assertEquals("packagename", NameNormalizer.normalizePackageName("package_Name"));
		assertEquals("packagename", NameNormalizer.normalizePackageName("package_name"));
		assertEquals("packagename", NameNormalizer.normalizePackageName("packageName"));
		assertEquals("packagename", NameNormalizer.normalizePackageName("package  Name"));
		assertEquals("packagename", NameNormalizer.normalizePackageName("package--name"));
		assertEquals("packagename", NameNormalizer.normalizePackageName("package - name"));
		assertEquals("packagenaeme", NameNormalizer.normalizePackageName("packageNäme"));
		assertEquals("packagenme", NameNormalizer.normalizePackageName("packageNáme"));
		assertEquals("packagename", NameNormalizer.normalizePackageName(" packageName"));
		assertEquals("packagename", NameNormalizer.normalizePackageName(" PackageName"));
		assertEquals("packagename", NameNormalizer.normalizePackageName("packageName "));
		assertEquals("", NameNormalizer.normalizePackageName(""));
		assertNull(NameNormalizer.normalizePackageName(null));
	}

	@Test
	public void testNormalizeConstantName() throws Exception {
		assertEquals("CONSTANT_NAME", NameNormalizer.normalizeConstantName("constantName"));
		assertEquals("CONSTANT_NAME", NameNormalizer.normalizeConstantName("ConstantName"));
		assertEquals("CONSTANT_NAME", NameNormalizer.normalizeConstantName("constant Name"));
		assertEquals("CONSTANT_NAME", NameNormalizer.normalizeConstantName("constant name"));
		assertEquals("CONSTANT_NAME", NameNormalizer.normalizeConstantName("constant-Name"));
		assertEquals("CONSTANT_NAME", NameNormalizer.normalizeConstantName("constant-name"));
		assertEquals("CONSTANT_NAME", NameNormalizer.normalizeConstantName("constant_Name"));
		assertEquals("CONSTANT_NAME", NameNormalizer.normalizeConstantName("constant_name"));
		assertEquals("CONSTANT_NAME", NameNormalizer.normalizeConstantName("constantName"));
		assertEquals("CONSTANT_NAME", NameNormalizer.normalizeConstantName("constant  Name"));
		assertEquals("CONSTANT_NAME", NameNormalizer.normalizeConstantName("constant--name"));
		assertEquals("CONSTANT_NAME", NameNormalizer.normalizeConstantName("constant - name"));
		assertEquals("CONSTANT_NAEME", NameNormalizer.normalizeConstantName("constantNäme"));
		assertEquals("CONSTANT_NME", NameNormalizer.normalizeConstantName("constantNáme"));
		assertEquals("CONSTANT_NAME", NameNormalizer.normalizeConstantName(" constantName"));
		assertEquals("CONSTANT_NAME", NameNormalizer.normalizeConstantName(" ConstantName"));
		assertEquals("CONSTANT_NAME", NameNormalizer.normalizeConstantName("constantName "));
		assertEquals("", NameNormalizer.normalizeConstantName(""));
		assertNull(NameNormalizer.normalizeConstantName(null));
	}
}
