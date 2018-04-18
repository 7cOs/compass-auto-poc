set projectLocation=C:\projects_sdk\cb\compass-auto-poc\auto 
cd %projectLocation% 
set classpath=%projectLocation%\bin;%projectLocation%\libs\*
java org.testng.TestNG %projectLocation%\testng.xml

pause