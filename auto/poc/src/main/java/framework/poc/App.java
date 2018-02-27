package framework.poc;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.stream.JsonReader;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;

import org.apache.*;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;


public class App 
{
	public static JsonObject cfg = null;
	public static JsonObject envs = null;
	public static String defDvr = null;
	public static String defEnv = null;
	public static String defEnvUrl = null;
	public static String pTusers = null;
	public static JsonObject frms = null;
	public static JsonObject data = null;
	public static JsonArray tusers = null;
	public static JsonObject tuser = null;
	
	public static WebDriver dvr = null;
	public static JavascriptExecutor jse = null;
	
	
	// - Intialise process - //
	// - Let c = config object - //
	public static void init( JsonObject c ) throws Exception {
		
		// - Load AUT config - //
		BufferedReader f = new BufferedReader( new FileReader( c.get("cp").getAsString() ) );
		cfg = new JsonParser().parse( f ).getAsJsonObject();
		
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
		defDvr = cfg.get("dvrProps").getAsJsonObject().get("def").getAsString();
		
		// - Get/Set default test environment name & URL - //
		envs = cfg.get("envs").getAsJsonObject();
		defEnv = envs.get("def").getAsString();
		defEnvUrl = envs.get(defEnv).getAsJsonObject().get("url").getAsString();
		
		// - Set path test users file - //
		pTusers = cfg.get("pathTestAccts").getAsString();
		
		// - Get/Set frms object - //
		frms = cfg.get("forms").getAsJsonObject();
				
		// - Load test data - //
		f = new BufferedReader( new FileReader( c.get("dp").getAsString() ) );
		data = new JsonParser().parse( f ).getAsJsonObject();
		
		// - Get/set test users - //
		tusers = data.get("testUsers").getAsJsonArray();
	}
	
	// - Let d = driver name - //
	public static WebDriver launchDriver( String d ) {
		switch(d) {
		case "ch":
			dvr = new ChromeDriver();
			break;
		case "ie":
			dvr = new InternetExplorerDriver();
			break;
		}
		return dvr;
	}
	
	// - Let d = driver name - //
	public static WebDriver launchDriver() {
		// - Use default driver - //
		return launchDriver( defDvr );
	}
		
	// - Launch driver (uses def dvr & env url set in config) - //
	public static boolean launchAUT() {
		launchDriver().get(defEnvUrl);
		String t = envs.get(defEnv).getAsJsonObject().get("qualifier").getAsString();
		return dvr.getTitle().equals( t );
	}
	
	// - Let n = username - //
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
	
	
	// - Let n = test user name - //
	public static boolean logInOut( String n ) {
    	return launchAUT() && login(n) && logout();
	}
	
	
	public static boolean logInOutMulti() throws Exception {
		
    	// - Load test user accounts xlsx - //
    	JsonArray jsa = Utils.getTestAccts( pTusers );
    	for( int i=0; i<jsa.size(); i++ ) {
    		JsonObject o = jsa.get(i).getAsJsonObject();
    		JsonObject u = new JsonObject();
    		Iterator<String> it = o.keySet().iterator();
    		while(it.hasNext()) {
    			String k = it.next();
    			if( k.equals( "User ID" ) ) {
    				u.addProperty("user", o.get(k).getAsString() );
    			}else if(  k.equals( "Pswd" ) ) {
    				u.addProperty("pswd", o.get(k).getAsString() );
    			}
    		}
    		// - Update testUsers - //
    		tusers.add( u );
    	}
    	
		// - Execute tests proper - //
    	Iterator<JsonElement> it = tusers.iterator();
    	while( it.hasNext() ) {
    		JsonObject o = it.next().getAsJsonObject();
    		logInOut( o.get( "user" ).getAsString() );
    		if( dvr != null ) { dvr.quit(); }
    	}
    	
		return false;
	}
	
	
    public static void main( String[] args ) throws Exception
    {

    	// - Initialise process... - //
    	JsonObject c = new JsonObject();
    		c.addProperty( "cp", "./res/config.json" );
    		c.addProperty( "dp", "./res/data.json" );
    	init( c );
    	
    	// - Test log in/out single test user - //
    	logInOut( "chris.williams@cbrands.com" );
    	
    	// - Test log in/out multi-test users - //
    	logInOutMulti();
    	
    	// - Exit AUT; end test - //
    	if( dvr != null ) { dvr.quit(); }
    	
    }
    
    
    public static class Utils {
    	
    	
    	static JsonArray getTestAccts(String p) throws Exception {
    		
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
    	
    	
    	static int getColIdxByName(String n, Sheet st) {
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
    	
    	
    	static JsonObject getForm( String fId ) {
    		return frms.get( fId ).getAsJsonObject();
    	}
    	
    	
    	static JsonObject getTestUser( String n ) {
    		
    		Iterator<JsonElement> it = tusers.iterator();
    		while( it.hasNext() ) {
    			JsonObject o = (JsonObject) it.next();
    			if( o.get( "user" ).getAsString().equals( n ) ) {
    				return o;
    			}
    		}
    		return null;
    	}
    	
    	
    	static void waitPageLoadCmplete( int ss ) { 
    		new WebDriverWait(dvr, ss).until(
  		          webDriver -> ((JavascriptExecutor) webDriver)
  		          .executeScript("return document.readyState").equals("complete"));	
    	}
    	
    }
}
