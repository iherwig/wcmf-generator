//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vJAXB 2.1.10 in JDK 6 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2010.08.09 at 03:08:38 PM MESZ 
//


package com.ibm.eenergy.common.usecases.sendreadings;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElementRef;
import javax.xml.bind.annotation.XmlIDREF;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for EndDeviceAsset complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="EndDeviceAsset">
 *   &lt;complexContent>
 *     &lt;extension base="{sendreadings.usecases.common.eenergy.ibm.com/}AssetContainer">
 *       &lt;sequence>
 *         &lt;element name="amrSystem" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="demandResponse" type="{http://www.w3.org/2001/XMLSchema}boolean" minOccurs="0"/>
 *         &lt;element name="disconnect" type="{http://www.w3.org/2001/XMLSchema}boolean" minOccurs="0"/>
 *         &lt;element name="dstEnabled" type="{http://www.w3.org/2001/XMLSchema}boolean" minOccurs="0"/>
 *         &lt;element name="loadControl" type="{http://www.w3.org/2001/XMLSchema}boolean" minOccurs="0"/>
 *         &lt;element name="metrology" type="{http://www.w3.org/2001/XMLSchema}boolean" minOccurs="0"/>
 *         &lt;element name="outageReport" type="{http://www.w3.org/2001/XMLSchema}boolean" minOccurs="0"/>
 *         &lt;element name="readRequest" type="{http://www.w3.org/2001/XMLSchema}boolean" minOccurs="0"/>
 *         &lt;element name="readings" type="{http://www.w3.org/2001/XMLSchema}IDREF" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="relayCapable" type="{http://www.w3.org/2001/XMLSchema}boolean" minOccurs="0"/>
 *         &lt;element name="reverseFlowHandling" type="{http://www.w3.org/2001/XMLSchema}boolean" minOccurs="0"/>
 *         &lt;element name="serviceDeliveryPoint" type="{http://www.w3.org/2001/XMLSchema}IDREF" minOccurs="0"/>
 *         &lt;element name="timeZoneOffset" type="{sendreadings.usecases.common.eenergy.ibm.com/}Minutes" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/extension>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "EndDeviceAsset", propOrder = {
    "amrSystem",
    "demandResponse",
    "disconnect",
    "dstEnabled",
    "loadControl",
    "metrology",
    "outageReport",
    "readRequest",
    "readings",
    "relayCapable",
    "reverseFlowHandling",
    "serviceDeliveryPoint",
    "timeZoneOffset"
})
@XmlSeeAlso({
    MeterAsset.class
})
public class EndDeviceAsset
    extends AssetContainer
{

    protected String amrSystem;
    protected Boolean demandResponse;
    protected Boolean disconnect;
    protected Boolean dstEnabled;
    protected Boolean loadControl;
    protected Boolean metrology;
    protected Boolean outageReport;
    protected Boolean readRequest;
    @XmlElementRef(name = "readings", type = JAXBElement.class)
    protected List<JAXBElement<Object>> readings;
    protected Boolean relayCapable;
    protected Boolean reverseFlowHandling;
    @XmlIDREF
    @XmlSchemaType(name = "IDREF")
    protected Object serviceDeliveryPoint;
    protected Minutes timeZoneOffset;

    /**
     * Gets the value of the amrSystem property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAmrSystem() {
        return amrSystem;
    }

    /**
     * Sets the value of the amrSystem property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAmrSystem(String value) {
        this.amrSystem = value;
    }

    /**
     * Gets the value of the demandResponse property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isDemandResponse() {
        return demandResponse;
    }

    /**
     * Sets the value of the demandResponse property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setDemandResponse(Boolean value) {
        this.demandResponse = value;
    }

    /**
     * Gets the value of the disconnect property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isDisconnect() {
        return disconnect;
    }

    /**
     * Sets the value of the disconnect property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setDisconnect(Boolean value) {
        this.disconnect = value;
    }

    /**
     * Gets the value of the dstEnabled property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isDstEnabled() {
        return dstEnabled;
    }

    /**
     * Sets the value of the dstEnabled property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setDstEnabled(Boolean value) {
        this.dstEnabled = value;
    }

    /**
     * Gets the value of the loadControl property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isLoadControl() {
        return loadControl;
    }

    /**
     * Sets the value of the loadControl property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setLoadControl(Boolean value) {
        this.loadControl = value;
    }

    /**
     * Gets the value of the metrology property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isMetrology() {
        return metrology;
    }

    /**
     * Sets the value of the metrology property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setMetrology(Boolean value) {
        this.metrology = value;
    }

    /**
     * Gets the value of the outageReport property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isOutageReport() {
        return outageReport;
    }

    /**
     * Sets the value of the outageReport property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setOutageReport(Boolean value) {
        this.outageReport = value;
    }

    /**
     * Gets the value of the readRequest property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isReadRequest() {
        return readRequest;
    }

    /**
     * Sets the value of the readRequest property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setReadRequest(Boolean value) {
        this.readRequest = value;
    }

    /**
     * Gets the value of the readings property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the readings property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getReadings().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link JAXBElement }{@code <}{@link Object }{@code >}
     * 
     * 
     */
    public List<JAXBElement<Object>> getReadings() {
        if (readings == null) {
            readings = new ArrayList<JAXBElement<Object>>();
        }
        return this.readings;
    }

    /**
     * Gets the value of the relayCapable property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isRelayCapable() {
        return relayCapable;
    }

    /**
     * Sets the value of the relayCapable property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setRelayCapable(Boolean value) {
        this.relayCapable = value;
    }

    /**
     * Gets the value of the reverseFlowHandling property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public Boolean isReverseFlowHandling() {
        return reverseFlowHandling;
    }

    /**
     * Sets the value of the reverseFlowHandling property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setReverseFlowHandling(Boolean value) {
        this.reverseFlowHandling = value;
    }

    /**
     * Gets the value of the serviceDeliveryPoint property.
     * 
     * @return
     *     possible object is
     *     {@link Object }
     *     
     */
    public Object getServiceDeliveryPoint() {
        return serviceDeliveryPoint;
    }

    /**
     * Sets the value of the serviceDeliveryPoint property.
     * 
     * @param value
     *     allowed object is
     *     {@link Object }
     *     
     */
    public void setServiceDeliveryPoint(Object value) {
        this.serviceDeliveryPoint = value;
    }

    /**
     * Gets the value of the timeZoneOffset property.
     * 
     * @return
     *     possible object is
     *     {@link Minutes }
     *     
     */
    public Minutes getTimeZoneOffset() {
        return timeZoneOffset;
    }

    /**
     * Sets the value of the timeZoneOffset property.
     * 
     * @param value
     *     allowed object is
     *     {@link Minutes }
     *     
     */
    public void setTimeZoneOffset(Minutes value) {
        this.timeZoneOffset = value;
    }

}