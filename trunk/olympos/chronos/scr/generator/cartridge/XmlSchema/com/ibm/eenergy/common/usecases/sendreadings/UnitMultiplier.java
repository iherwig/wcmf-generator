//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vJAXB 2.1.10 in JDK 6 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2010.08.09 at 03:08:38 PM MESZ 
//


package com.ibm.eenergy.common.usecases.sendreadings;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlEnumValue;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for UnitMultiplier.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;simpleType name="UnitMultiplier">
 *   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *     &lt;enumeration value="none"/>
 *     &lt;enumeration value="T"/>
 *     &lt;enumeration value="G"/>
 *     &lt;enumeration value="M"/>
 *     &lt;enumeration value="k"/>
 *     &lt;enumeration value="d"/>
 *     &lt;enumeration value="c"/>
 *     &lt;enumeration value="m"/>
 *     &lt;enumeration value="micro"/>
 *     &lt;enumeration value="n"/>
 *     &lt;enumeration value="p"/>
 *   &lt;/restriction>
 * &lt;/simpleType>
 * </pre>
 * 
 */
@XmlType(name = "UnitMultiplier")
@XmlEnum
public enum UnitMultiplier {

    @XmlEnumValue("none")
    NONE("none"),
    T("T"),
    G("G"),
    @XmlEnumValue("M")
    M_3("M"),
    @XmlEnumValue("k")
    K("k"),
    @XmlEnumValue("d")
    D("d"),
    @XmlEnumValue("c")
    C("c"),
    @XmlEnumValue("m")
    M_7("m"),
    @XmlEnumValue("micro")
    MICRO("micro"),
    @XmlEnumValue("n")
    N("n"),
    @XmlEnumValue("p")
    P("p");
    private final String value;

    UnitMultiplier(String v) {
        value = v;
    }

    public String value() {
        return value;
    }

    public static UnitMultiplier fromValue(String v) {
        for (UnitMultiplier c: UnitMultiplier.values()) {
            if (c.value.equals(v)) {
                return c;
            }
        }
        throw new IllegalArgumentException(v);
    }

}
