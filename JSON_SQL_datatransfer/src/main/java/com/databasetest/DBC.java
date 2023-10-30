//******************************//
//Author: Kaleb Austgen
//Contributor: Allysa Cao, Verica Karanakova, Shambhawi Sharma
//Date Created: 9-13-2023
//Opens connection to our server and allows interaction of data between the website and server
//Then adds data to the table from a given JSON file
//******************************//
package com.databasetest;

import com.google.gson.JsonArray;

//Author: Kaleb Austgen
//DBC Class takes a jsonArray returns void
//Calls class to create connection to server
public class DBC {

    public void dbc(JsonArray jsonArray) {
        //Variables to connect to the server
        //jdbc:sqlserver://'hostname'\\'servername';databaseName='databasename';
        String url = "jdbc:sqlserver://ipro497.database.windows.net:1433;database=iprowebscanner;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30";
        String username = "test";
        String password = "Shambhawi@123";

        //Call DatabaseClass to connect to the server using the given variables
        DatabaseClass dbClass = new DatabaseClass(url, username, password);

        //Convert the jsonArray to a String[] array for the SQL injection
        String[] dataArray = new ReadJsonClass(jsonArray).createArrayFromJsonArray(jsonArray);

        // Call the insertDataFromJson method with the JsonArray and data array
        dbClass.insertDataFromJson(dataArray);
    
    }
}

