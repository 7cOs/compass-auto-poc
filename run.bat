set projectLocation=C:\projects_sdk\cb\compass-auto-poc\auto\poc
cd %projectLocation% 
set classpath=%projectLocation%\target\*;%projectLocation%\libs\*
java org.testng.TestNG %projectLocation%\testng.xml

pause