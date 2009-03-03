set TORTOISE="C:\Program Files\TortoiseSVN"
set SUBVERSION="C:\Program Files\CollabNet Subversion Client"

@echo off
REM Generate Batch for merging uwm and cwm files
call batchgen.jar

REM Update Revision number
%TORTOISE%\bin\subWCRev ..\gui\ ..\gui\js\uwm\Constants.tpl ..\gui\js\uwm\Constants.js

REM Create directory if neccessary
if not exist c:\temp md c:\temp

REM Export Workspace files
%SUBVERSION%\svn.exe export ..\gui c:\temp\gui
%SUBVERSION%\svn.exe export ..\application c:\temp\application
%SUBVERSION%\svn.exe export ..\wcmf c:\temp\wcmf"

REM Merge uwm and cwm files
copy cwm.js c:\temp\gui\js\cwm.js
copy cwm.js c:\temp\gui\js\uwm.js
call mergeall.bat

REM Insert index.html with correct <script> tags
del c:\temp\gui\index.html
copy indexbuild.html c:\temp\gui\index.html

REM Clean up
rd /s /q c:\temp\gui\js\uwm
rd /s /q c:\temp\gui\js\cwm
del mergeall.bat
