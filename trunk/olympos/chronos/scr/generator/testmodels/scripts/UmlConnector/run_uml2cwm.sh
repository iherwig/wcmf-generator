cd ../../../../generator/dist/ 
java -Djava.library.path=./lib/ -jar ChronosGenerator.jar cartridge/UmlConnector/workflow/uml2cwm.oaw -basePath=. -propertyFile=../testmodels/scripts/UmlConnector/uml2cwm.local.properties
