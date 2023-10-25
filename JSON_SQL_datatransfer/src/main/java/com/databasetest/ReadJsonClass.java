//******************************//
//Author: Kaleb Austgen
// Co-author: Allysa Cao
//Date Created: 9-13-2023
//Class that parses the given Json file into something we can put in our database
//******************************//

package com.databasetest;


import com.google.gson.JsonObject;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;

public class ReadJsonClass {

    //Private variable
    private JsonArray jsonArray;

    //Constructor makes ReadJsonClass
    public ReadJsonClass(JsonArray jsonArray) {
        this.jsonArray = jsonArray;
    }

    //Reads the file and returns a json object of the data
    public String[] createArrayFromJsonArray(JsonArray jsonArray) {
        int size = jsonArray.size();
        String[] result = new String[size];

        for (int i = 0; i < size; i++) {
            JsonObject jsonObject = jsonArray.get(i).getAsJsonObject();
            String[] dataArray = createArray(jsonObject);
            result[i] = String.join(",", dataArray);
        }

        return result;
    }

    //Creates strings for each column in our database, takes the json data and puts into an array
   public String[] createArray(JsonObject jsonObject) {
    String[] jsonData = {
        getStringValue(jsonObject, "WebsiteName"),
        getStringValue(jsonObject, "MacAddress"),
        getStringValue(jsonObject, "Domain"),
        getStringValue(jsonObject, "TimeAccessed"),
        getStringValue(jsonObject, "LocationAccessed"),
        getStringValue(jsonObject, "ReasonForBlock")
    };
    return jsonData;
}

    private String getStringValue(JsonObject jsonObject, String key) {
        JsonElement element = jsonObject.get(key);
        if (element != null) {
            return element.getAsString();
        }
        return "";
}
}