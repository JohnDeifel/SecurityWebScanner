import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonParseException;

public class ReadJson {

    public static String[] ReadData(String filename) throws IOException, JsonParseException, FileNotFoundException {

    
        //Uses Class from JSONParser dependency
        JsonParser jsonparser = new JsonParser();

        //Loads json file into the reader
        FileReader reader = new FileReader(".\\jsonfiles\\userdata.json");

        //Parses the json file and puts into a java object
        Object obj = jsonparser.parse(reader);

        //Makes a new JsonObject variable out of the java object obj
        JsonObject jsonObject = (JsonObject) obj;

        //Makes all the JsonObjects into strings so we can transfer the data
        String websiteName = jsonObject.get("WebsiteName").toString();
        String ipAddress = jsonObject.get("IPAddress").toString();
        String domain = jsonObject.get("Domain").toString();
        String timeAccessed = jsonObject.get("TimeAccessed").toString();
        String locationAccessed = jsonObject.get("LocationAccessed").toString();
        String reasonForBlock = jsonObject.get("ReasonForBlock").toString(); 

        //Creates an array to store the data in
        String[] jsonData = new String[6];
        //return (websiteName + macAddress + domain + timeAccessed + locationAccessed + reasonForBlock);
        //Populates jsonData array with the string data parsed from the Json file
        jsonData[0] = websiteName;
        jsonData[1] = ipAddress;
        jsonData[2] = domain;
        jsonData[3] = timeAccessed;
        jsonData[4] = locationAccessed;
        jsonData[5] = reasonForBlock;

        //Returns the array
        return jsonData;

    }
}