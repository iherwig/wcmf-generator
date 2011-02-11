cd ../../../../generator/dist/ 
java -Djava.library.path=./lib/ -jar ChronosGenerator.jar cartridge/UmlConnector/workflow/cwm2uml.oaw -basePath=. -propertyFile=../testmodels/scripts/UmlConnector/cwm2uml.local.properties
