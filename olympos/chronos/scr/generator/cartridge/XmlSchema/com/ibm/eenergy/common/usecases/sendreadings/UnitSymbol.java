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
 * <p>Java class for UnitSymbol.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;simpleType name="UnitSymbol">
 *   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}string">
 *     &lt;enumeration value="Hz-1"/>
 *     &lt;enumeration value="W/s"/>
 *     &lt;enumeration value="kg/J"/>
 *     &lt;enumeration value="s-1"/>
 *     &lt;enumeration value="J/s"/>
 *     &lt;enumeration value="W/Hz"/>
 *     &lt;enumeration value="V/VAr"/>
 *     &lt;enumeration value="m3"/>
 *     &lt;enumeration value="m2"/>
 *     &lt;enumeration value="m"/>
 *     &lt;enumeration value="Pa"/>
 *     &lt;enumeration value="g"/>
 *     &lt;enumeration value="Hz"/>
 *     &lt;enumeration value="none"/>
 *     &lt;enumeration value="S"/>
 *     &lt;enumeration value="N"/>
 *     &lt;enumeration value="J"/>
 *     &lt;enumeration value="rad"/>
 *     &lt;enumeration value="deg"/>
 *     &lt;enumeration value="h"/>
 *     &lt;enumeration value="min"/>
 *     &lt;enumeration value="s"/>
 *     &lt;enumeration value="ºC"/>
 *     &lt;enumeration value="H"/>
 *     &lt;enumeration value="F"/>
 *     &lt;enumeration value="A"/>
 *     &lt;enumeration value="ohm"/>
 *     &lt;enumeration value="V"/>
 *     &lt;enumeration value="VArh"/>
 *     &lt;enumeration value="Wh"/>
 *     &lt;enumeration value="VAh"/>
 *     &lt;enumeration value="VAr"/>
 *     &lt;enumeration value="W"/>
 *     &lt;enumeration value="VA"/>
 *   &lt;/restriction>
 * &lt;/simpleType>
 * </pre>
 * 
 */
@XmlType(name = "UnitSymbol")
@XmlEnum
public enum UnitSymbol {

    @XmlEnumValue("Hz-1")
    HZ_1("Hz-1"),
    @XmlEnumValue("W/s")
    W_S("W/s"),
    @XmlEnumValue("kg/J")
    KG_J("kg/J"),
    @XmlEnumValue("s-1")
    S_1("s-1"),
    @XmlEnumValue("J/s")
    J_S("J/s"),
    @XmlEnumValue("W/Hz")
    W_HZ("W/Hz"),
    @XmlEnumValue("V/VAr")
    V_V_AR("V/VAr"),
    @XmlEnumValue("m3")
    M_3("m3"),
    @XmlEnumValue("m2")
    M_2("m2"),
    @XmlEnumValue("m")
    M("m"),
    @XmlEnumValue("Pa")
    PA("Pa"),
    @XmlEnumValue("g")
    G("g"),
    @XmlEnumValue("Hz")
    HZ("Hz"),
    @XmlEnumValue("none")
    NONE("none"),
    @XmlEnumValue("S")
    S_14("S"),
    N("N"),
    J("J"),
    @XmlEnumValue("rad")
    RAD("rad"),
    @XmlEnumValue("deg")
    DEG("deg"),
    @XmlEnumValue("h")
    H_19("h"),
    @XmlEnumValue("min")
    MIN("min"),
    @XmlEnumValue("s")
    S_21("s"),
    @XmlEnumValue("\u00baC")
    º_C("\u00baC"),
    @XmlEnumValue("H")
    H_23("H"),
    F("F"),
    A("A"),
    @XmlEnumValue("ohm")
    OHM("ohm"),
    V("V"),
    @XmlEnumValue("VArh")
    V_ARH("VArh"),
    @XmlEnumValue("Wh")
    WH("Wh"),
    @XmlEnumValue("VAh")
    V_AH("VAh"),
    @XmlEnumValue("VAr")
    V_AR("VAr"),
    W("W"),
    VA("VA");
    private final String value;

    UnitSymbol(String v) {
        value = v;
    }

    public String value() {
        return value;
    }

    public static UnitSymbol fromValue(String v) {
        for (UnitSymbol c: UnitSymbol.values()) {
            if (c.value.equals(v)) {
                return c;
            }
        }
        throw new IllegalArgumentException(v);
    }

}