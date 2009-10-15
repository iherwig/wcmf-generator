package net.sourceforge.olympos.diagramimageexporter;

import net.sourceforge.olympos.diagramimageexporter.shapes.ChiRequirement;

public class FactoryRequ {
	public FigureDraw getRequ(InfoFigureParameter fig) {
		FigureDraw figureParameter = null;
//		if (fig.getType().equals(EnumFigureType.CHI_REQUIREMENT)){
//			figureParameter = new ChiRequirement(fig);
//		}
//		else if (fig.getType().equals(EnumFigureType.CHI_ISSUE)){
//			figureParameter = new ChiRequirement(fig);
//		}
//		else if (fig.getType().equals(EnumFigureType.CHI_FEATURE)){
//			figureParameter = new ChiRequirement(fig);
//		}
//		else if (fig.getType().equals(EnumFigureType.CHI_GOAL)){
//			figureParameter = new ChiRequirement(fig);
//		}
		return figureParameter;		
	}
}