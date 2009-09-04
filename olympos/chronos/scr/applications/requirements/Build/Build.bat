@echo off

if not exist ..\gui (
echo Folder gui does not exist.
exit
)

if not exist ..\application (
echo Folder application does not exist.
exit
)

if not exist ..\wcmf (
echo Folder wcmf does not exist.
exit
)

if exist cwm.zip del cwm.zip
call folders.bat

REM Generate Batch for merging uwm and cwm files
call batchgen.jar

REM Update Revision number
%TORTOISE%\bin\subWCRev ..\gui\ ..\gui\js\uwm\Constants.tpl ..\gui\js\uwm\Constants.js

REM Create directory if neccessary
if exist c:\temp\cwm rd /s /q c:\temp\cwm
md c:\temp\cwm

REM Export Workspace files
%SUBVERSION%\svn.exe export ..\gui c:\temp\cwm\gui
%SUBVERSION%\svn.exe export ..\application c:\temp\cwm\application
%SUBVERSION%\svn.exe export ..\wcmf c:\temp\cwm\wcmf
REM %SUBVERSION%\svn.exe export ..\ChronosLib c:\temp\cwm\ChronosLib
REM %SUBVERSION%\svn.exe export ..\cwe c:\temp\cwm\cwe
REM %SUBVERSION%\svn.exe export ..\browser c:\temp\cwm\browser

REM Build Generator
call "%ANT_HOME%\bin\ant" -f ..\generator\build.xml
md c:\temp\cwm\generator
xcopy /e ..\dist\*.* c:\temp\cwm\generator

REM delete listed files
call delete.jar

REM Set debug to false
call setDebug.jar
if exist c:\temp\cwm\gui\js\uwm\ConfigNew.js (
del c:\temp\cwm\gui\js\uwm\Config.js
ren c:\temp\cwm\gui\js\uwm\ConfigNew.js Config.js
)

REM server.ini must be stored separately
del c:\temp\cwm\application\include\server.ini
copy server.ini c:\temp\cwm\application\include\server.ini

REM Merge uwm and cwm files
copy cwm.js c:\temp\cwm\gui\js\cwm.js
copy cwm.js c:\temp\cwm\gui\js\uwm.js
call mergeall.bat

REM compile
call jsmin <c:\temp\cwm\gui\js\uwm.js >c:\temp\cwm\gui\js\uwmcomp.js
call jsmin <c:\temp\cwm\gui\js\cwm.js >c:\temp\cwm\gui\js\cwmcomp.js
if exist c:\temp\cwm\gui\js\uwmcomp.js (
del c:\temp\cwm\gui\js\uwm.js
copy cwm.js+c:\temp\cwm\gui\js\uwmcomp.js c:\temp\cwm\gui\js\uwm.js /b
del c:\temp\cwm\gui\js\uwmcomp.js
)
if exist c:\temp\cwm\gui\js\cwmcomp.js (
del c:\temp\cwm\gui\js\cwm.js
copy cwm.js+c:\temp\cwm\gui\js\cwmcomp.js c:\temp\cwm\gui\js\cwm.js /b
del c:\temp\cwm\gui\js\cwmcomp.js
)

REM Insert index.html with correct <script> tags
del c:\temp\cwm\gui\index.html
copy indexbuild.html c:\temp\cwm\gui\index.html

REM Delete merged files
rd /s /q c:\temp\cwm\gui\js\uwm
rd /s /q c:\temp\cwm\gui\js\cwm

REM zip
7z a cwm.zip c:\temp\cwm

REM Delete temporary files
del mergeall.bat
rd /s /q c:\temp\cwm