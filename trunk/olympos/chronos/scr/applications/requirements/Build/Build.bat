del Package.zip
call folders.bat

REM Generate Batch for merging uwm and cwm files
call batchgen.jar

REM Update Revision number
%TORTOISE%\bin\subWCRev ..\gui\ ..\gui\js\uwm\Constants.tpl ..\gui\js\uwm\Constants.js

REM Create directory if neccessary
if not exist c:\temp md c:\temp

REM Export Workspace files
%SUBVERSION%\svn.exe export ..\gui c:\temp\gui
%SUBVERSION%\svn.exe export ..\application c:\temp\application
%SUBVERSION%\svn.exe export ..\wcmf c:\temp\wcmf
%SUBVERSION%\svn.exe export ..\generator c:\temp\generator

REM delete listed files
call delete.jar

REM Set debug to false
call setDebug.jar
if exist c:\temp\gui\js\uwm\ConfigNew.js (
del c:\temp\gui\js\uwm\Config.js
ren c:\temp\gui\js\uwm\ConfigNew.js Config.js
)

REM Merge uwm and cwm files
copy cwm.js c:\temp\gui\js\cwm.js
copy cwm.js c:\temp\gui\js\uwm.js
call mergeall.bat

REM compile
call jsmin <c:\temp\gui\js\uwm.js >c:\temp\gui\js\uwmcomp.js
call jsmin <c:\temp\gui\js\cwm.js >c:\temp\gui\js\cwmcomp.js
if exist c:\temp\gui\js\uwmcomp.js (
del c:\temp\gui\js\uwm.js
copy cwm.js+c:\temp\gui\js\uwmcomp.js c:\temp\gui\js\uwm.js /b
del c:\temp\gui\js\uwmcomp.js
)
if exist c:\temp\gui\js\cwmcomp.js (
del c:\temp\gui\js\cwm.js
copy cwm.js+c:\temp\gui\js\cwmcomp.js c:\temp\gui\js\cwm.js /b
del c:\temp\gui\js\cwmcomp.js
)

REM Insert index.html with correct <script> tags
del c:\temp\gui\index.html
copy indexbuild.html c:\temp\gui\index.html

REM Delete merged files
rd /s /q c:\temp\gui\js\uwm
rd /s /q c:\temp\gui\js\cwm

REM zip
7z a Package.zip c:\temp\gui
7z a Package.zip c:\temp\application
7z a Package.zip c:\temp\wcmf
7z a Package.zip c:\temp\generator

REM Delete temporary files
del mergeall.bat
rd /s /q c:\temp\gui
rd /s /q c:\temp\application
rd /s /q c:\temp\wcmf
rd /s /q c:\temp\generator