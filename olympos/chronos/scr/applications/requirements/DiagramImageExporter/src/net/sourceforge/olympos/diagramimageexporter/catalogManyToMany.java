package net.sourceforge.olympos.diagramimageexporter;

import java.util.HashMap;

public class catalogManyToMany {

	public static HashMap<EnumConnection, InfoAllowedConnection> connections;
		
	 public static HashMap<EnumConnection, InfoAllowedConnection> getConnections() {
	 return connections;
	 }
	
	 public static void initConnection() {
	 connections = new HashMap<EnumConnection, InfoAllowedConnection>();
			
	 connections.put(EnumConnection.aggregation, new InfoAllowedConnection("Aggregation", EnumConnectionEnd.OPEN_DIAMAND, EnumConnectionEnd.ARROW));
	 connections.put(EnumConnection.assoziation, new InfoAllowedConnection("Assoziation", EnumConnectionEnd.NONE, EnumConnectionEnd.ARROW));
	 connections.put(EnumConnection.generalization, new InfoAllowedConnection("Generalization", EnumConnectionEnd.NONE, EnumConnectionEnd.ARROW_TRIANGLE));
	 connections.put(EnumConnection.composition, new InfoAllowedConnection("composition", EnumConnectionEnd.ARROW, EnumConnectionEnd.CLOSED_DIAMOND));
	 }
}
