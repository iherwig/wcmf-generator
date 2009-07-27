SQL scripts in this directory will be executed after
execution of install.php. Each line of a script is supposed to
be one SQL command.

The script name must comply with the following naming convention:

initSectionName + '.sql'

where 'initSectionName' is the name of a configuration
section that defines the database connection to be used with this
script, e.g. 'database.sql'.