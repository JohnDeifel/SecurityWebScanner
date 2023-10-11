//******************************//
//Author: Kaleb Austgen
//Date Created: 9-13-2023
//Opens connection to our server and allows interaction of data between the website and server
//Then adds data to the table from a given JSON file
//******************************//


package com.databasetest;

import java.io.IOException;

import com.google.gson.JsonObject;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.PreparedStatement;;

public class Main {

    public static void main(String[] args) {

        //jdbc:sqlserver://'hostname'\\'servername';databaseName='databasename';
        String url = "jdbc:sqlserver://ipro497.database.windows.net:1433;database=iprowebscanner;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30";
        String username = "test";
        String password = "Shambhawi@123";

        try {
            //Connection object using the DriverManager to get a connection, takes a URL, username and password
            Connection connection = DriverManager.getConnection(url, username, password);
            System.out.println("Connected to WebScannerTest");

            //Write commands in SQL using strings
            String sql = "INSERT INTO UserData (WebsiteName, MacAddress, Domain, TimeAccessed, LocationAccessed, ReasonForBlock)" + " VALUES (?, ?, ?, ?, ?, ?)";

            //Create a statement object in your connection to prepare a command
            //Statement statement = connection.createStatement();

            //Creates data using our ReadJsonClass
            ReadJsonClass data = new ReadJsonClass(".\\jsonfiles\\userdata.json");
            try {
                //Calls the readFile method in our data object and puts it into a JsonObject called fileData
                //This allows us to put the created Json Object produced by readFile
                //And then call the createArray method using the Json Object to put all the data into an array
                JsonObject fileData = data.readFile();
                String[] dataArray = data.createArray(fileData);

                //To add variables into the row, we use 'PreparedStatement'
                PreparedStatement statement = connection.prepareStatement(sql);

                //We then use statement.setVariableType(index, VariableType) to add variables into the row
                for (int i = 1, y = 0; i <= 6 && y <= 5; i++, y++) {
                    statement.setString(i, dataArray[y]);
                }
                //Adds the statement to our table
                int rows = statement.executeUpdate();

                //Checks to make sure rows are greater than 0, and tells the user if it was added or not
                if (rows > 0) {
                    System.out.println("Row has been inserted.");
                }

                connection.close();
            }
            //Catches any exceptions if finding the JSON file fails
            catch(IOException e) {
                System.out.println(e.toString());
                System.out.println("Could not find file name");
            }
        }
        //Catches any exceptions to the connection using the SQLException Library
        catch (SQLException e) {
            System.out.println("Connection failed, try again");
            e.printStackTrace();
        }
    }
}