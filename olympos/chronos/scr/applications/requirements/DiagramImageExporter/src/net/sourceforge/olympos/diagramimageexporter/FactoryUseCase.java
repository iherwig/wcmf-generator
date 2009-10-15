package net.sourceforge.olympos.diagramimageexporter;

import net.sourceforge.olympos.diagramimageexporter.shapes.ChiBusinessUseCase;
import net.sourceforge.olympos.diagramimageexporter.shapes.ChiBusinessUseCaseCore;

public class FactoryUseCase {
	public FigureDraw getUseCase(InfoFigureParameter fig) {
		FigureDraw figure = null;
//		if (fig.getType().equals(EnumFigureType.CHI_BUSINESS_USE_CASE)){
//			figure = new ChiBusinessUseCase(fig);;
//		}
//		else if ( fig.getType().equals(EnumFigureType.CHI_BUSINESS_USE_CASE_CORE)){
//			figure = new ChiBusinessUseCaseCore(fig);
//		}
		return figure;		
	}
}
