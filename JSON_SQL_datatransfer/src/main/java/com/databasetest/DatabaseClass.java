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


import com.google.gson.JsonArray;

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

    //Method that takes a jsonArray and array of strings
    public void insertDataFromJson(String[] dataArray) {
    try {
        //Creates the connection using the given url, username and password
        Connection connection = DriverManager.getConnection(url, username, password);
        System.out.println("Connected to the database");

        //Prepares the SQL statement to send to the server
        String sql = "INSERT INTO UserData (WebsiteName, IPAddress, Domain, TimeAccessed, LocationAccessed, ReasonForBlock) VALUES (?, ?, ?, ?, ?, ?)";
        PreparedStatement statement = connection.prepareStatement(sql);

        //Formats the data
        for (String data : dataArray) {
            var dataParts = data.split(",");
            for (int i = 1; i <= 6; i++) {
                statement.setString(i, dataParts[i - 1]);
            }

            int rows = statement.executeUpdate();

            if (rows > 0) {
                System.out.println("Rows have been inserted.");
            }
        }
        connection.close();
    } catch (SQLException e) {
        System.out.println("Connection failed, try again");
        e.printStackTrace();
    }
}
}
