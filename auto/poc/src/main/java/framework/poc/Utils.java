package framework.poc;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.InetSocketAddress;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLClassLoader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Properties;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.xmlbeans.impl.store.Path;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.oracle.tools.packager.Log;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;


public class Utils {

	public static JsonObject cfg = null;
	public static JsonObject envs = null;
	public static JsonObject dvrProps = null;
	public static String defDvr = null;
	public static String defEnv = null;
	public static String defEnvUrl = null;
	public static JsonArray defDvrOpts = null;
	public static boolean isSilent = false;
	public static String pTusers = null;
	public static JsonObject frms = null;
	public static JsonObject data = null;
	public static JsonArray tusers = null;
	public static JsonObject tuser = null;
	
	public static WebDriver dvr = null;
	public static JavascriptExecutor jse = null;
		
	/**
	 * Intialise AUT process; parses config.json (JsonObject) passed to the method
	 * sets the necessary global vars used throughout the AUT execution process
	 * @param c = JsonObject
	 * @author sdk
	 */
	public static void init( JsonObject c ) {
		
		try {
			
			// - Load AUT config.json - //
			try( BufferedReader cf = new BufferedReader( 
					new FileReader( c.get("acp").getAsString() ) ) ) {
				
				cfg = new JsonParser().parse( cf ).getAsJsonObject();
				
				// - Set web drivers properties - //
				JsonObject jso = cfg.get("dvrProps").getAsJsonObject();
				Iterator<String> it = jso.keySet().iterator();
				while( it.hasNext() ) {
					String k = it.next();
					try {
						JsonObject o = jso.get( k ).getAsJsonObject();
						System.setProperty(
								o.get("prop").getAsString(), 
								o.get("value").getAsString() 
							);
					// - Catch non-jso exception - //
					}catch(Exception x ) {} 
				}
		
		    	// - Get/Set default driver - //
				dvrProps = cfg.get("dvrProps").getAsJsonObject();
				defDvr = dvrProps.get("def").getAsString();
				defDvrOpts = dvrProps.get( defDvr ).getAsJsonObject()
						.get("opts").getAsJsonArray();
				// - Detect execution mode - //
				isSilent = dvrProps.get( defDvr ) .getAsJsonObject().has("silent") ?
						dvrProps.get( defDvr ) .getAsJsonObject().get("silent").getAsBoolean() : false;
				
				// - Get/Set default test environment name & URL - //
				envs = cfg.get("envs").getAsJsonObject();
				defEnv = envs.get("def").getAsString();
				defEnvUrl = envs.get(defEnv).getAsJsonObject().get("url").getAsString();
				
				// - Set path test users file - //
				pTusers = cfg.get("pathTestAccts").getAsString();
				
				// - Get/Set frms object - //
				frms = cfg.get("forms").getAsJsonObject();
						
				// - Load test data - //
				try( BufferedReader df = new BufferedReader( 
						new FileReader( c.get("adp").getAsString() ) ) ) {
					
					data = new JsonParser().parse( df ).getAsJsonObject();
					
					// - Get/set test users - //
					tusers = data.get("testUsers").getAsJsonArray();
				}
			}
			
		} catch( Exception x ) {
				x.printStackTrace();
		}
	}
	
	
	/**
	 * Gets config.properties file; returns JsonObject to caller
	 * @author sdk
	 */
	public static JsonObject getProcCfg() {
		
		JsonObject o = null;
		
		try {
		  try( FileInputStream f = new FileInputStream("config.properties") ) {
			  o = new JsonObject(); // - Set cfg - //
			  Properties ps = new Properties(); ps.load( f );
			  Iterator<Object> it = ps.keySet().iterator();
			  while( it.hasNext() ) {
				 String k = (String)it.next();
				 o.addProperty( k, ps.getProperty( k ) );
			  }
		  }
		}catch( Exception x ) {
			x.printStackTrace();
		}
		
		return o;
	}
	
	
	/**
	 * Sets and return web driver based on driver name (n) passed to the method - //
	 * @param n
	 * @return WebDriver
	 * @author sdk
	 */
	public static WebDriver launchDriver( String n ) {

		switch( n ) {
		
		case "ch":
			ChromeOptions opts = new ChromeOptions();
			defDvrOpts.forEach( e -> {
				opts.addArguments(  e.getAsString() );
			});
			if( isSilent ) { opts.setHeadless( isSilent ); }
			dvr = new ChromeDriver( opts );
			break;
		case "ie":
			dvr = new InternetExplorerDriver();
			break;
		}
		
		return dvr;
	}
	

	/**
	 * Launch web driver; return web driver to caller - //
	 * @return WebDriver
	 * @author sdk
	 */
	public static WebDriver launchDriver() {
		// - Use default driver - //
		return launchDriver( defDvr );
	}
	
	
	/**
	 * Launch driver (uses default driver name & environment URL defined in config.json);
	 * returns true if AUT Window title equals text qualifier in config.json file
	 * @return boolean 
	 * @author sdk
	 */
	public static boolean launchAUT() {
		launchDriver().get(defEnvUrl);
		String t = envs.get(defEnv).getAsJsonObject()
				.get("qualifier").getAsString();
		return dvr.getTitle().equals( t );
	}
	
	
	/**
	 * Log in AUT user (n) passed to the method - //
	 * @param n
	 * @return boolean
	 * @author sdk
	 */
	public static boolean login( String n ) {
		
		JsonObject frm = Utils.getForm("login").get("signIn").getAsJsonObject();
		tuser = Utils.getTestUser(n);
		
		// - Set form fields - //
		JsonObject fs = frm.get("fields").getAsJsonObject();
		Iterator<String> it = fs.keySet().iterator();
		while( it.hasNext() ) {
			String k = it.next();
			WebElement f = dvr.findElement( By.xpath( fs.get( k ).getAsString() ) );
			f.clear();
			f.sendKeys( tuser.get( k ).getAsString() );
		}
				
		// - Locate/click 'Log In' button - //
		String xp = frm.get( "btns" ).getAsJsonObject().get("logIn").getAsString();
		dvr.findElement( By.xpath( xp ) ).click();
		
		// - Wait for page load complete (30 secs) - //
		Utils.waitPageLoadCmplete( 30 );
		
		// - Confirm login - //
		if( dvr.getTitle().equals( frm.get( "qualifier" ).getAsString() ) ) {
			System.out.println( "Test user " + tuser.get("user")
				.getAsString() + " logged in successfully!" );
			return true;
		}
		
		return false;
	}	
	
	
	/**
	 * Convenience method: launches AUT, logs in user (n), logs out user;
	 * returns true if AUT is launched and user log in/out are successful
	 * @author sdk
	 * return boolean
	*/
	public static boolean logInOut( String n ) {
    	return launchAUT() && login(n) && logout();
	}
	
	
	/**
	 * Logs out of the AUT; returns true to caller barring execution errors
	 * @return boolean
	 * @author sdk
	 */
	public static boolean logout() {
		
		JsonObject m = cfg.get("menus").getAsJsonObject()
				.get("settings").getAsJsonObject();
		
		String xp = m.get("btnLogout").getAsString();
		WebElement b = dvr.findElement( By.xpath( xp ) );
		jse = (JavascriptExecutor)dvr;
		jse.executeScript("arguments[0].click()", b);
		// - Confirm logout - //
		if( dvr.getTitle().equals(
				envs.get(defEnv).getAsJsonObject().get("qualifier").getAsString() ) ) {
			System.out.println( "Test user " + tuser.get("user")
				.getAsString() + " logged out successfully!" );
			return true;
		}
		return false;
	}
	
	
	/**
	 * Waits for AUT page to complete - specified by seconds (ss) passed to the method
	 * @param ss
	 * @author sdk
	 */
	public static void waitPageLoadCmplete( int ss ) { 
		new WebDriverWait(dvr, ss).until(
		          webDriver -> ((JavascriptExecutor) webDriver)
		          .executeScript("return document.readyState").equals("complete"));	
	}	
	
	
	/**
	 * Load/parse test account credentials from .xls(x) spreadsheet
	 * via path(p) passed to the method; returns JsonArray of test account users
	 * @param p
	 * @return JsonArray
	 * @throws Exception
	 */
	public static JsonArray getXlsxTestAccts(String p) throws Exception {
		
		try( InputStream is = new FileInputStream( p ) ) {
			
			System.out.println( ".xlsx file loaded!!" );
			
			HSSFWorkbook wb = new HSSFWorkbook( is );
			Sheet st = wb.getSheet("Test Accounts");
			
			String[] fs = new String[] {"Name","User ID","Pswd:"};
			ArrayList<Integer> idxs = new ArrayList<Integer>();
			for(String f : fs ) {
				idxs.add( getColIdxByName( f, st) );
			}
			
        	JsonArray jsa = new JsonArray();				
	        Iterator<Row> it = st.iterator();
	        while (it.hasNext()) {
	        	Row r = it.next();
	        	if( r.getRowNum() == 0 ) { continue; }
	        	JsonObject jso = new JsonObject();
	        	for( int i=0; i<idxs.size(); i++ ) {
	        		try {
		        		Cell c = r.getCell( idxs.get(i) );
			        	jso.addProperty( fs[i].replace(":", ""), c.getStringCellValue() );
	        		}catch( Exception x ) { }
	        	}
	        	// - Add jso to jsa - //
	        	if( jso.get("Name") != null ) { // - Bypass empty objects - //
	        		jsa.add( jso );
	        	}
	        }
	        
	        // System.out.println( jsa );
	        return jsa;
		}
	}
	
	
	/**
	 * Get/return column index for name (n) in xls(n) spreadsheet (st) params
	 * passed to the method
	 * @param n
	 * @param st
	 * @return int
	 * @author sdk
	 */
	public static int getColIdxByName(String n, Sheet st) {
		Row r = st.getRow(st.getFirstRowNum());
		Iterator<Cell> cs = r.iterator();
		while( cs.hasNext() ) {
       		 Cell c = cs.next();
       		if( c.getStringCellValue().equals(n) ) {
       			int idx = c.getColumnIndex();
       			// System.out.println( "Index for '" + n + "' located @ column: " + idx );
       			return idx;
       		}
		}
		return -1;
	}
	
	
	/**
	 * Get/return form (JsonObject) identified by form Id (fId) arg passed to the method
	 * @param fId
	 * @return JsonObject
	 */
	public static JsonObject getForm( String fId ) {
		return frms.get( fId ).getAsJsonObject();
	}
	
	
	/**
	 * Query test account users identified by name (n) arg passed to the method;
	 * returns test user (JsonObject) to caller if success or null otherwise
	 * @param n
	 * @return JsonObject
	 */
	public static JsonObject getTestUser( String n ) {
		
		Iterator<JsonElement> it = tusers.iterator();
		while( it.hasNext() ) {
			JsonObject o = (JsonObject) it.next();
			if( o.get( "user" ).getAsString().equals( n ) ) {
				return o;
			}
		}
		return null;
	}
	
	
	/**
	 * Considers kilsof or euthanise process; utilised for removing System processes
	 * (stragglers) consumed by the AUT - e.g., web drivers or other resources
	 * @author sdk
	 */
	public static void kilsof() {
		// - Iterate driver properties for driver processes; 
		// - Terminate System resources consumed by driver (if applicable) - //
		System.out.println( "kilsof process start..." );
		try {

		    // - Displace driver if applicable - //
		    if( dvr !=null ) { dvr.quit(); } 
		    
			// - Get processes array - //
			JsonArray ps = dvrProps.get( "procs" ).getAsJsonArray();
			// - Get euthanise command args - //
			JsonObject co = dvrProps.get( "euArgs" ).getAsJsonObject();
			Iterator<JsonElement> it = ps.iterator();
			while( it.hasNext() ) {
				String pId = it.next().getAsString();
				System.out.println( "Euthanising the following '" + pId + "'..." );
				String[] cmd = { // - Parse eu args - //
						co.get("a").getAsString(), co.get("s").getAsString(), 
						co.get("c").getAsString().replace( "[RES]", pId )
					};
				ProcessBuilder p = new ProcessBuilder( cmd );
				p.start(); // - Execute command - //
			}

		} catch( Exception x ) {
			x.printStackTrace();
		}
		finally {
		    try{ Thread.sleep( 1515 ); } catch(Exception x) {}
			System.out.println( "kilsof process end" );
		}
	}
	
	/**
	 * d2c or testMethodsExtractor
	 * @throws IOException
	 */
	public static ArrayList<String> d2c(String p) throws IOException {
	  ArrayList<String> tcs = new ArrayList<String>();
	  String cls = new String(Files.readAllBytes(Paths.get(p)));
	  String[] ms = cls.split("@Test");
	  for(int i=1; i<ms.length; i++) {
	    String tc = ms[i];
	    String l1 = tc.substring( tc.indexOf("void" ) );
	    String l2 = l1.substring( 0, l1.indexOf("(") );
	    String l3 = l2.substring(l2.indexOf(" "));
	    tcs.add( l3 );
	  }
      return tcs;
	}

	public static class WebServer {
		
		public static void start() throws IOException {
	        HttpServer server = HttpServer.create(new InetSocketAddress(7199), 0);
	        server.createContext("/", new MyHandler());
	        server.createContext("/executeTests", new ExecTestHandler());
	        server.setExecutor(null); // creates a default executor
	        server.start();	
		}
		
	    public static class ExecTestHandler implements HttpHandler {
	        @Override
	        public void handle(HttpExchange t) throws IOException {
	            String response = 
	            		"<div style='font-family:arial;"
	            		+ "text-align:center;font-weight:bold;'>"
	            				+ "Test(s) execution start..."
	            		+ "</div>";
	            t.sendResponseHeaders(200, response.length());
	            try(OutputStream os = t.getResponseBody()) {
		            os.write(response.getBytes());
					String[] cmd = {"cmd.exe", "/c", "mvn test -P testng"};
					ProcessBuilder p = new ProcessBuilder(cmd);
					try {
						//p.start().waitFor();
						response = 
								"<div style='font-family:arial;'></div>";
						os.write(response.getBytes());
					} catch (Exception e) {
						e.printStackTrace();
					}
	            }
	        }
	    }	
	    
	    public static class MyHandler implements HttpHandler {
	        @Override
	        public void handle(HttpExchange t) throws IOException {
	            String response = 
	            		"<div style='text-align:center;'>"
		            		+ "<a href='/executeTests' style='font-family:tahoma;'>"
		            				+ "Execute Tests..."
		            		+ "</a>"
	            		+ "</div>";
	            t.sendResponseHeaders(200, response.length());
	            OutputStream os = t.getResponseBody();
	            os.write(response.getBytes());
	            os.close();
	        }
	    }
	    
	    public static class LoadAppHandler implements HttpHandler {
	        @Override
	        public void handle(HttpExchange t) throws IOException {
	            String response = 
	            		"<div style='text-align:center;'>"
		            		+ "<a href='/executeTests' style='font-family:tahoma;'>"
		            				+ "Execute Tests..."
		            		+ "</a>"
	            		+ "</div>";
	            t.sendResponseHeaders(200, response.length());
	            OutputStream os = t.getResponseBody();
	            os.write(response.getBytes());
	            os.close();
	        }
	    }	    
	}

	public static void main(String[] args ) throws IOException {
	  String p = "C:/projects_sdk/cb/compass-portal/automation-test/"
	          + "src/test/java/com/cbrands/test/functional/opportunities/"
	          + "OpportunitiesSavedReportsTest.java";
	  // - Test PoC - //
	  p = "./src/test/java/framework/poc/test/TestAUT.java";
	  // System.out.println( d2c(p) );
	  WebServer.start();
	}
}
