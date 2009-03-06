import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;

public class batchgen {

	public static void main(String[] args) throws IOException {
		String indexpath="..\\gui\\index.html";
		String batchpath="mergeall.bat";
		boolean inuwm=false;
		boolean incwm=false;
		File batchfile=new File(batchpath);
		FileWriter writer=new FileWriter(batchfile);
		BufferedWriter bw=new BufferedWriter(writer);
		    FileInputStream indexstream = new FileInputStream(indexpath);
		    DataInputStream indata = new DataInputStream(indexstream);
		 
		        BufferedReader br = new BufferedReader(new InputStreamReader(indata));
		
		while(true){
			String line=br.readLine();
			
			if (line==null){
				bw.close();
				System.exit(0);
			}
			line=line.replaceAll("\t", "");
			
			if(line.trim().equals("<!--End include CWM-->")){
				incwm=false;
			}
			if(line.trim().equals("<!--End include UWM-->")){
				inuwm=false;
			}
			if(inuwm){
				line=line.replaceAll("<script type=\"text/javascript\" src=\"", "for %%f in (c:\\\\temp\\\\cwm\\\\gui\\\\");
				line=line.replaceAll("\">", ") do call mergeuwm.bat \"%%f\"");
				line=line.replaceAll("</script>", "");
				line=line.replaceAll("/", "\\\\");
				bw.write(line);
				bw.newLine();
			}else if(incwm){
				line=line.replaceAll("<script type=\"text/javascript\" src=\"", "for %%f in (c:\\\\temp\\\\cwm\\\\gui\\\\");
				line=line.replaceAll("\">", ") do call mergecwm.bat \"%%f\"");
				line=line.replaceAll("</script>", "");
				line=line.replaceAll("/", "\\\\");
				bw.write(line);
				bw.newLine();
			}
			if(line.trim().equals("<!--Start include UWM-->")){
				inuwm=true;
				incwm=false;
			}
			if(line.trim().equals("<!--Start include CWM-->")){
				inuwm=false;
				incwm=true;
			}
			
		}
		
		
	}

}
