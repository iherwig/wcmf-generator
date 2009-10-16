package net.sourceforge.olympos.diagramimageexporter;

 class Factory {

	Figure createFigure (InfoFigureParameter figureInfo){
		ElementDiagram elem = new ElementDiagram();
		elem = ElementDiagram.getCatalogEntry(figureInfo.getType());
		String name =elem.getName();
		
		Class clazz;
		Object result = null;
		try {
			clazz = Class.forName("net.sourceforge.olympos.diagramimageexporter.shapes." + name);
			result = clazz.newInstance();

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
		return (Figure) result;
		
	}

}
