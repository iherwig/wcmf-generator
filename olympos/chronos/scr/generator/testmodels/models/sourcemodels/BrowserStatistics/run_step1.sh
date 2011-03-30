cd ../../../../../generator/dist/ 
java -Djava.library.path=./lib/ -jar ChronosGenerator.jar cartridge/BrowserStatistics/workflow/step1_statisticsPhp.oaw -basePath=. -propertyFile=../testmodels/models/sourcemodels/BrowserStatistics/statistics.properties
