package net.sourceforge.olympos.oaw.extend;

import java.util.Comparator;

import org.eclipse.uml2.uml.Property;

/**
 * This class is used to compare property role names by a given order.
 * @author ingo herwig <ingo@wemove.com>
 */
public class PropertyRoleComparator implements Comparator<Property>
{
	String[] order;
	
	/**
	 * Constructor
	 * @param order A string array that gives the order
	 */
	public PropertyRoleComparator(String[] order)
	{
		this.order = order;
	}
	
	public int compare(Property p1, Property p2)
	{	
		int result = 0;
		int i1 = -1;
		int i2 = -1;
		String name1 = UMLHelper.getNonEmptyRoleName(p1);
		String name2 = UMLHelper.getNonEmptyRoleName(p2);
		for (int i=0; i< this.order.length; i++)
		{
			if (this.order[i].equals(name1)) i1 = i;
			if (this.order[i].equals(name2)) i2 = i;
		}

		if (i1 >= 0 && i2 >= 0)
		{
			// both objects are included in list
			if (i1 > i2) result = 1;
			else if (i2 > i1) result = -1;
		}
		else
		{
			// sort not included objects to the end
			if (i1 < 0 && i2 >= 0) result = 1;
			else if (i1 >= 0 && i2 < 0) result = -1;
		}
		return result;
	}
}
