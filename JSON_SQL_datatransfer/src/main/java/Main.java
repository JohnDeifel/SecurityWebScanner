//Author: Kaleb Austgen
import com.databasetest.DBC;
import com.google.gson.JsonObject;
import com.google.gson.JsonArray;

public class Main {
    public static void main(String[] args){
        //JsonParser jsonParser = new JsonParser();
        //String trimmed = jsonString.trim();
        //JsonElement jsonElement = jsonParser.parse(jsonString);
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

        JsonArray jsonArray = new JsonArray();
        jsonArray.add(websiteName);
        jsonArray.add(ipAddress);
        jsonArray.add(domain);
        jsonArray.add(timeAccessed);
        jsonArray.add(locationAccessed);
        jsonArray.add(reasonForBlock);
        System.out.println(jsonArray);
        int size = jsonArray.size();
        System.out.println(size);
        
        DBC connection = new DBC();
        connection.dbc(jsonArray);
    }
}
