//******************************//
//Author: Kaleb Austgen
// Co-author: Allysa Cao
//Date Created: 9-13-2023
//Opens connection to our server and allows interaction of data between the website and server
//Then adds data to the table from a given JSON file
//******************************//


package com.databasetest;

import java.io.IOException;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import com.google.gson.JsonElement;

import java.io.FileReader;

public class Main {

    public static void main(String[] args) {

        //jdbc:sqlserver://'hostname'\\'servername';databaseName='databasename';
        String url = "jdbc:sqlserver://ipro497.database.windows.net:1433;database=iprowebscanner;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30";
        String username = "test";
        String password = "Shambhawi@123";
        DatabaseClass dbClass = new DatabaseClass(url, username, password);

        // Provide the path to your JSON file
        String jsonFilePath = "/Users/dieucao3011/SecurityWebScanner/JSON_SQL_datatransfer/jsonfiles/userdata.json";

        // Create a JsonParser to parse the JSON file
        JsonParser jsonParser = new JsonParser();

        try {
            // Create a FileReader to read the JSON file
            FileReader reader = new FileReader(jsonFilePath);

            // Use the JsonParser to parse the file and convert it to a JsonElement
            JsonElement jsonElement = jsonParser.parse(reader);

            // Check if the parsed element is a JsonArray
            if (jsonElement.isJsonArray()) {
                // Cast the element to a JsonArray
                JsonArray jsonArray = jsonElement.getAsJsonArray();

                // Create data array from the JSON array
                String[] dataArray = new ReadJsonClass(jsonArray).createArrayFromJsonArray(jsonArray);

                // Call the insertDataFromJson method with the JsonArray and data array
                dbClass.insertDataFromJson(jsonArray, dataArray);
            } else {
                // Handle the case where the parsed data is not a JsonArray
                System.out.println("The JSON data is not an array.");
                System.out.println("JSON Content: " + jsonElement);
            }
        } catch (IOException e) {
            System.out.println("Could not read the JSON file: " + e.getMessage());
        }
    }
}