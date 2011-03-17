cd ../../../../../generator/dist/ 
java -Djava.library.path=./lib/ -jar ChronosGenerator.jar cartridge/Grails/workflow/grails.oaw -basePath=. -propertyFile=../testmodels/models/sourcemodels/MappingModels/grails.local.properties
