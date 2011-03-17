cd ../../../../../generator/dist/ 
java -Djava.library.path=./lib/ -jar ChronosGenerator.jar cartridge/Wsdl/workflow/wsdl.oaw -basePath=. -propertyFile=../testmodels/models/sourcemodels/MappingModels/wsdl.local.properties
