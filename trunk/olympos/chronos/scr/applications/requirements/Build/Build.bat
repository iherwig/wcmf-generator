del Package.zip
call folders.bat

REM Generate Batch for merging uwm and cwm files
call batchgen.jar

REM Update Revision number
%TORTOISE%\bin\subWCRev ..\gui\ ..\gui\js\uwm\Constants.tpl ..\gui\js\uwm\Constants.js

REM Create directory if neccessary
if not exist c:\temp\cwm md c:\temp\cwm

REM Export Workspace files
%SUBVERSION%\svn.exe export ..\gui c:\temp\cwm\gui
%SUBVERSION%\svn.exe export ..\application c:\temp\cwm\application
%SUBVERSION%\svn.exe export ..\wcmf c:\temp\cwm\wcmf
%SUBVERSION%\svn.exe export ..\generator c:\temp\cwm\generator

REM delete listed files
call delete.jar

REM Set debug to false
call setDebug.jar
if exist c:\temp\cwm\gui\js\uwm\ConfigNew.js (
del c:\temp\cwm\gui\js\uwm\Config.js
ren c:\temp\cwm\gui\js\uwm\ConfigNew.js Config.js
)

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
7z a cwm.zip c:\temp\cwm\gui
7z a cwm.zip c:\temp\cwm\application
7z a cwm.zip c:\temp\cwm\wcmf
7z a cwm.zip c:\temp\cwm\generator

REM Delete temporary files
del mergeall.bat
rd /s /q c:\temp\cwm\gui
rd /s /q c:\temp\cwm\application
rd /s /q c:\temp\cwm\wcmf
rd /s /q c:\temp\cwm\generator