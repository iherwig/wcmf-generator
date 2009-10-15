package net.sourceforge.olympos.diagramimageexporter;

 class Factory {

	Figure FactoryCreateFigure (String name){
		Class clazz;
		try {
			clazz = Class.forName("net.sourceforge.olympos.diagramimageexporter.shapes" + name);
			Object s = clazz.newInstance();

		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
		
	}

}
