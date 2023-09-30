//******************************//
//Author: Kaleb Austgen
//Date Created: 9-13-2023
//Class that parses the given Json file into something we can put in our database
//******************************//

package com.databasetest;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonParseException;

public class ReadJsonClass {

    //Private variable
    private String filename; 

    //Constructor makes ReadJsonClass
    public ReadJsonClass(String filename) {
        this.filename = filename;
    }

    //Reads the file and returns a json object of the data
    public JsonObject readFile() throws IOException, JsonParseException, FileNotFoundException {
        //Creates a new JsonParser object to read the json file
        JsonParser jsonparser = new JsonParser();

        //Creates a FileReader object to read the inputted filename
        FileReader reader = new FileReader(filename);

        //Uses JsonParser to parse the file, and puts into a Java Object then returns
        Object obj = jsonparser.parse(reader);

        //Turns the given object into a JsonObject
        JsonObject jsonObject = (JsonObject) obj;
        return jsonObject;
    }

    //Creates strings for each column in our database, takes the json data and puts into an array
    public String[] createArray(JsonObject jsonObject) {
        //String creation
        String websiteNameQuote = jsonObject.get("WebsiteName").toString();
        String macAddressQuote = jsonObject.get("MacAddress").toString();
        String domainQuote = jsonObject.get("Domain").toString();
        String timeAccessedQuote = jsonObject.get("TimeAccessed").toString();
        String locationAccessedQuote = jsonObject.get("LocationAccessed").toString();
        String reasonForBlockQuote = jsonObject.get("ReasonForBlock").toString();

        //Removing the quotes from the strings using substring
        String websiteName = websiteNameQuote.substring(1, websiteNameQuote.length() -1);
        String macAddress = macAddressQuote.substring(1, macAddressQuote.length() -1);
        String domain = domainQuote.substring(1, domainQuote.length() -1);
        String timeAccessed = timeAccessedQuote.substring(1, timeAccessedQuote.length() -1);
        String locationAccessed = locationAccessedQuote.substring(1, locationAccessedQuote.length() -1);
        String reasonForBlock = reasonForBlockQuote.substring(1, reasonForBlockQuote.length() -1);

        //Array Creation
        String[] jsonData = {websiteName, macAddress, domain, timeAccessed, locationAccessed, reasonForBlock};
        //Returns the array
        return jsonData;
    }
}