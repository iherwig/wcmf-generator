package net.sourceforge.olympos.diagramimageexporter;

import java.awt.Graphics2D;
import java.util.ArrayList;

import net.sourceforge.olympos.diagramimageexporter.shapes.ChiWorker;
import net.sourceforge.olympos.diagramimageexporter.shapes.ChiWorkerExternal;
import net.sourceforge.olympos.diagramimageexporter.shapes.ChiWorkerInternal;


public class FactoryWorker{
	public FigureDraw getWorker(InfoFigureParameter fig, Graphics2D g2d) {
		FigureDraw figure = null;
		FigureDraw figDraw = new FigureDraw();
		
//		if (fig.getType().equals(EnumFigureType.CHI_WORKER)){
//			figure = new ChiWorker(fig);
//			figDraw.drawChi(fig, g2d);
//		}
//		else if ( fig.getType().equals(EnumFigureType.CHI_WORKER_INTERN)){
//			figure = new ChiWorkerInternal(fig);
//			figDraw.drawChi(fig, g2d);
//		}
//		else if( fig.getType().equals(EnumFigureType.CHI_WORKER_EXTERN)){
//			figure = new ChiWorkerExtern(fig);
//			figDraw.drawChi(fig, g2d);
//		}
		return figure;		
	}
}
