//******************************//
//Author: Kaleb Austgen
//Contributor: Allysa Cao, Verica Karanakova
//Date Created: 9-13-2023
//Class that parses the given Json file into something we can put in our database
//******************************//

package com.databasetest;


import com.google.gson.JsonObject;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;

public class ReadJsonClass {

    //Private variable
    protected JsonArray jsonArray;

    //Constructor makes ReadJsonClass
    public ReadJsonClass(JsonArray jsonArray) {
        this.jsonArray = jsonArray;
    }


    //Edited: Kaleb Austgen
    //10-29-22
    //Takes a jsonArray and formats it into a string array
    public String[] createArrayFromJsonArray(JsonArray jsonArray) {
        int size = jsonArray.size();
        String[] result = new String[size];

        //Debug
        System.out.println(result.length);

        
        for (int i = 0; i < size; i++) {
            //Gets each jsonObject within the jsonArray
            JsonObject jsonObject = jsonArray.get(i).getAsJsonObject();

            //Creates a string[] array containing the jsonObjects
            String[] dataArray = createArray(jsonObject);

            //Uses a StringBuilder to append all the jsonObjects to the dataArray
            StringBuilder joinedData = new StringBuilder();
            for (String data : dataArray) {

                //If data is not empty, append it to joinedData
                if (data != null && !data.isEmpty()) {
                    //If there is no data then append a comma
                    if (joinedData.length() > 0) {
                        joinedData.append(",");
                    }
                    joinedData.append(data);
                }
            }
            //Return all the data and stringify it
            result[i] = joinedData.toString();
        }
        return result;
    }

    //Creates strings for each column in our database, takes the json data and puts into an array
   public String[] createArray(JsonObject jsonObject) {
    String[] jsonData = {
        getStringValue(jsonObject, "WebsiteName"),
        getStringValue(jsonObject, "IPAddress"),
        getStringValue(jsonObject, "Domain"),
        getStringValue(jsonObject, "TimeAccessed"),
        getStringValue(jsonObject, "LocationAccessed"),
        getStringValue(jsonObject, "ReasonForBlock")
    };
    return jsonData;
} 

    //Takes a jsonObject and a key (name of that "row" in the json object)
    //and returns it as a string
    private String getStringValue(JsonObject jsonObject, String key) {
        JsonElement element = jsonObject.get(key);
        if (element != null) {
            return element.getAsString();
        }
        return "";
    }
}