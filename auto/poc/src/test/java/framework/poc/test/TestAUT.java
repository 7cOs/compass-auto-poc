package framework.poc.test;

import org.testng.annotations.Test;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import junit.framework.Assert;

import org.testng.annotations.BeforeTest;

import java.util.Iterator;

import org.testng.annotations.AfterClass;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;

public class TestAUT extends framework.poc.AUT {

  @BeforeClass
  public void beforeTest() {
	  init( getProcCfg() );
  }

  @AfterMethod
  public void afterTest() {	
    kilsof();
  }
 
  @Test
  public void testLaunchDriver() {
	  launchDriver();
  }
  
 @Test
  public void testLogInOutUser() {
	  // - Fetch random test user account - //
	  Assert.assertEquals(true, logInOut( tusers.get(0)
			  .getAsJsonObject().get("user").getAsString() ) );
  }

  @Test
  public void testLogInOutUsers() throws Exception {
		
    	// - Load test user accounts xlsx - //
    	JsonArray jsa = getXlsxTestAccts( pTusers );
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
    		// - Update testUsers accounts in data.json - //
    		tusers.add( u );
    	}
    	
		// - Execute tests proper - //
    	Iterator<JsonElement> it = tusers.iterator();
    	while( it.hasNext() ) {
    		JsonObject o = it.next().getAsJsonObject();
    		logInOut( o.get( "user" ).getAsString() );
    		// if( dvr != null ) { dvr.quit(); }
    		kilsof();
    	}
	} 
}