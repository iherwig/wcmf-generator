package net.sourceforge.olympos.diagramimageexporter;

import java.awt.Graphics2D;

import net.sourceforge.olympos.diagramimageexporter.shapes.ChiBusinessPartner;
import net.sourceforge.olympos.diagramimageexporter.shapes.ChiBusinessPartnerActive;
import net.sourceforge.olympos.diagramimageexporter.shapes.ChiBusinessPartnerPassive;

public class FactoryPartner {
	public FigureDraw getPartner(InfoFigureParameter fig, Graphics2D g2d) {
		FigureDraw figure = null;
		FigureDraw figDraw = new FigureDraw();
		
//		ClassLoader partner = Thread.currentThread().getContextClassLoader();
//		Object newInstance = partner.loadClass("whateverStr", true).newInstance();
//
//		if (fig.getType().equals(EnumFigureType.CHI_BUSINESS_PARTNER)){
//			figure = new ChiBusinessPartner(fig);
//			figDraw.drawChi(fig, g2d);		
//		}
//		else if ( fig.getType().equals(EnumFigureType.CHI_BUSINESS_PARTNER_ACTIVE)){
//			figure = new ChiBusinessPartnerActive(fig);
//			figDraw.drawChi(fig, g2d);
//		}
//		else if( fig.getType().equals(EnumFigureType.CHI_BUSINESS_PARTNER_PASSIVE)){
//			figure = new ChiBusinessPartnerPassive(fig);
//			figDraw.drawChi(fig, g2d);
//		}
		return figure;		
	}
}