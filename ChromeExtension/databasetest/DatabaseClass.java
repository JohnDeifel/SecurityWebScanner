/*
Author : Allysa Cao
Contributor: Verica Karanakova, Kaleb Austgen
Date Created: 10-16-2023
DatabaseClass: connection to the database with JsonArray
 */
package com.databasetest;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

/**
 *
 * @author dieucao3011
 * Edited 25th October
 * Takes three strings needed to connect to the database, the URL, username and password
 * Prepares the SQL statement to add values into the database by feeding it a SQL command to add a row
 */
public class DatabaseClass {
    private String url;
    private String username;
    private String password;
    
    //Constructor
    public DatabaseClass(String url, String username, String password) {
        this.url = url;
        this.username = username;
        this.password = password;
    }

    //Edited: Kaleb Austgen
    //Date: 10-29-22
    //Method that takes a String[] array and then executes the update to the SQL server
    public void insertDataFromJson(String[] dataArray) {
    try {
        //Creates the connection using the given url, username and password
        Connection connection = DriverManager.getConnection(url, username, password);
        System.out.println("Connected to the database");

        //Prepares the SQL statement to send to the server
        String sql = "INSERT INTO UserData (WebsiteName, IPAddress, Domain, TimeAccessed, LocationAccessed, ReasonForBlock) VALUES (?, ?, ?, ?, ?, ?)";
        PreparedStatement statement = connection.prepareStatement(sql);

        //Debug
        for (int i = 0; i < 6; i++) {
            System.out.println(dataArray[i]);

        }
        //Iterates through dataArray - array that contains all the jsonArray data to give to the SQL update
        for (String data : dataArray) {
            int size = dataArray.length;

            //Debug
            System.out.println(dataArray.length);
            System.out.println(data);

            //Debug
            System.out.println("dataParts length: " + dataArray.length);


            for (int i = 1; i <= size; i++) {
                //Debug
                System.out.println("Setting index " + i + " with value: " + dataArray[i - 1]);

                //Stringifies the array
                statement.setString(i, dataArray[i - 1]);
            }

            
        }
        int rows = statement.executeUpdate();

        if (rows > 0) {
            System.out.println("Rows have been inserted.");
        }
        
        connection.close();
    } catch (SQLException e) {
        System.out.println("Connection failed, try again");
        e.printStackTrace();
    }
}
}
