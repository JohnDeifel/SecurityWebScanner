//******************************//
//Author: Kaleb Austgen
//Date: 10-29-22
//Purpose: Main test class to simulate the frontend code
//Creates an array of jsonObjects to feed into the rest of the backend code
//******************************//
import com.databasetest.DBC;
import com.google.gson.JsonObject;
import com.google.gson.JsonArray;

//testing class
public class Main {
    public static void main(String[] args){
        //JsonObject instances with the value of column name and value or a row name
        JsonObject websiteName = new JsonObject();
        websiteName.addProperty("WebsiteName", "AnotherExample.com");

        JsonObject ipAddress = new JsonObject();
        ipAddress.addProperty("IPAddress", "8.8.8.8");

        JsonObject domain = new JsonObject();
        domain.addProperty("Domain", "ITWORKS");

        JsonObject timeAccessed = new JsonObject();
        timeAccessed.addProperty("TimeAccessed", "2:15pm, 10-26-23");

        JsonObject locationAccessed = new JsonObject();
        locationAccessed.addProperty("LocationAccessed", "Denver, Colorado");

        JsonObject reasonForBlock = new JsonObject();
        reasonForBlock.addProperty("ReasonForBlock", "Account Suspicion");

        //Add each object to the created jsonArray
        JsonArray jsonArray = new JsonArray();
        jsonArray.add(websiteName);
        jsonArray.add(ipAddress);
        jsonArray.add(domain);
        jsonArray.add(timeAccessed);
        jsonArray.add(locationAccessed);
        jsonArray.add(reasonForBlock);
        //Debug
        System.out.println(jsonArray);
        int size = jsonArray.size();
        //Debug
        System.out.println(size);
        
        //Call DBC
        DBC connection = new DBC();
        connection.dbc(jsonArray);
    }
}
