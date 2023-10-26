//******************************//
//Author: Kaleb Austgen
//Contributor: Allysa Cao, Verica Karanakova, Shambhawi Sharma
//Date Created: 9-13-2023
//Opens connection to our server and allows interaction of data between the website and server
//Then adds data to the table from a given JSON file
//******************************//
package com.databasetest;

import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

public class DBC {

    public void dbc(JsonArray jsonArray) {
        //jdbc:sqlserver://'hostname'\\'servername';databaseName='databasename';
        String url = "jdbc:sqlserver://ipro497.database.windows.net:1433;database=iprowebscanner;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30";
        String username = "test";
        String password = "Shambhawi@123";
        DatabaseClass dbClass = new DatabaseClass(url, username, password);

        //Provide the path to your JSON file
        //String jsonFilePath = "/Users/dieucao3011/SecurityWebScanner/JSON_SQL_datatransfer/jsonfiles/userdata.json";

        // Create a JsonParser to parse the JSON file
        //JsonParser jsonParser = new JsonParser();
        //JsonElement jsonElement = jsonParser.parse(jsonObject);
        /*
        // Create a FileReader to read the JSON file
        FileReader reader = new FileReader(jsonFilePath);

        // Use the JsonParser to parse the file and convert it to a JsonElement
        JsonElement jsonElement = jsonParser.parse(reader);
        */

        // Check if the parsed element is a JsonArray
        // Cast the element to a JsonArray
        // Create data array from the JSON array
        String[] dataArray = new ReadJsonClass(jsonArray).createArrayFromJsonArray(jsonArray);

        // Call the insertDataFromJson method with the JsonArray and data array
        dbClass.insertDataFromJson(dataArray);
    
    }
}

