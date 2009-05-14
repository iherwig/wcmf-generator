/*
 * Copyright (c) 2008 wemove digital solutions. All rights reserved.
 */
package com.wemove.wcmf.generator.workflow;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipException;
import java.util.zip.ZipFile;
import java.util.zip.ZipOutputStream;

/**
 * @author ingo herwig <ingo@wemove.com>
 */
public class FileUtil
{
    public static void copyDir(File src, File dst) throws IOException
    {
        if (!src.isDirectory())
            return;
        if (!dst.exists())
            dst.mkdir();

        File[] srcFiles = src.listFiles();
        for (int i = 0; i < srcFiles.length; i++)
        {
            File srcFile = srcFiles[i];
            File dstFile = new File(dst + File.separator + srcFile.getName());

            if (srcFile.isFile())
                copyFile(srcFile, dstFile);
            else if (srcFile.isDirectory())
                copyDir(srcFile, dstFile);
        }
    }

    public static void copyFile(File src, File dst) throws IOException
    {
        if (!src.isFile())
            return;

        InputStream in = new FileInputStream(src);
        OutputStream out = new FileOutputStream(dst);

        //  Transfer bytes from in to out
        byte[] buf = new byte[1024];
        int len;
        while ((len = in.read(buf)) > 0)
        {
            out.write(buf, 0, len);
        }
        in.close();
        out.close();
    }

    @SuppressWarnings("unchecked")
	public static void unzipDir(File target, File archive) throws IOException
    {
         ZipFile zip = new ZipFile(archive);
         Enumeration entries = zip.entries();
         while(entries.hasMoreElements())
         {
            ZipEntry e = (ZipEntry)entries.nextElement();
            File f = new File(target + File.separator + e.getName());
            if(e.isDirectory())
            {
               if(!f.exists() && !f.mkdirs())
                  throw new IOException("Couldn't create directory " + f);
            }
            else 
            {
               BufferedInputStream is = null;
               BufferedOutputStream os = null;
               try 
               {
                  is = new BufferedInputStream(zip.getInputStream(e));
                  File destDir = f.getParentFile();
                  if(!destDir.exists() && !destDir.mkdirs())
                     throw new IOException("Couldn't create directory " + destDir);
                  os = new BufferedOutputStream(new FileOutputStream(f));
                  int b = -1;
                  while((b = is.read()) != -1)
                     os.write(b);
               }
               finally 
               {
                  if(is != null)
                     is.close();
                  if(os != null)
                     os.close();
               }
            }
         }

    }

    public static void zipDir(File src, File archive) throws IOException
    {
        try
        {
	        // create a ZipOutputStream to zip the data to 
	        ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(archive)); 
	        // assuming that there is a directory named inFolder (If there 
	        // isn't create one) in the same directory as the one the code runs from, 
	        // call the zipDir method 
	        zipDir(src, zos, src); 
	        // close the stream 
	        zos.close();
        }
        catch (ZipException e)
        {
            throw new IOException("ZIP Problem " + e.getMessage());
        }
    }

    protected static void zipDir(File zipDir, ZipOutputStream zos, File root) throws IOException
    {
        // get a listing of the directory content
        String[] dirList = zipDir.list();
        if (dirList != null)
        {
	        byte[] readBuffer = new byte[2156];
	        int bytesIn = 0;
	        // loop through dirList, and zip the files
	        for (int i = 0; i < dirList.length; i++)
	        {
	            File f = new File(zipDir, dirList[i]);
	            if (f.isDirectory())
	            {
	                // if the File object is a directory, call this
	                // function again to add its content recursively
	                zipDir(f, zos, root);
	                // loop again
	                continue;
	            }
	            // if we reached here, the File object f was not a directory
	            // create a FileInputStream on top of f
	            FileInputStream fis = new FileInputStream(f);
	            // create a new zip entry with relative path
	            String relPath = f.getPath().substring(root.getPath().length()+1);
	            ZipEntry anEntry = new ZipEntry(relPath);
	            // place the zip entry in the ZipOutputStream object
	            zos.putNextEntry(anEntry);
	            // now write the content of the file to the ZipOutputStream
	            while ((bytesIn = fis.read(readBuffer)) != -1)
	                zos.write(readBuffer, 0, bytesIn);
	            // close the Stream
	            fis.close();
	        }
        }
    }
}