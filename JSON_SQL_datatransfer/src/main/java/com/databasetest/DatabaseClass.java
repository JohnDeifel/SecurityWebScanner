/*
Author : Allysa Cao
// Contributor: Verica Karanakova
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
 */
public class DatabaseClass {
    private String url;
    private String username;
    private String password;
    
    public DatabaseClass(String url, String username, String password) {
        this.url = url;
        this.username = username;
        this.password = password;
    }
    public void insertDataFromJson(JsonArray jsonArray, String[] dataArray) {
    try {
        Connection connection = DriverManager.getConnection(url, username, password);
        System.out.println("Connected to the database");

        String sql = "INSERT INTO UserData (WebsiteName, IPAddress, Domain, TimeAccessed, LocationAccessed, ReasonForBlock) VALUES (?, ?, ?, ?, ?, ?)";
        PreparedStatement statement = connection.prepareStatement(sql);

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
