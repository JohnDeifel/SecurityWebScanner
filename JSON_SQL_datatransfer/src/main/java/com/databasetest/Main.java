//******************************//
//Author: Kaleb Austgen
//Date Created: 9-13-2023
//Opens connection to our server and allows interaction of data between the website and server
//Then adds data to the table from a given JSON file
//******************************//

//Contributor: Mohamed Trigui
//Date modified: 10-2-2023


package com.databasetest;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import com.google.gson.JsonObject;

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

            // Assuming ip, domain, and location are the sensitive data strings
            //Write commands in SQL using strings
            String sql = "INSERT INTO UserData (WebsiteName, IPAddress, Domain, TimeAccessed, LocationAccessed, ReasonForBlock)" + " VALUES (?, ?, ?, ?, ?, ?)";
           
            //Create a statement object in your connection to prepare a command
            //Statement statement = connection.createStatement();

            //To add variables into the row, we use 'PreparedStatement'
                PreparedStatement statement = connection.prepareStatement(sql);

            //Creates data using our ReadJsonClass
            ReadJsonClass data = new ReadJsonClass(".\\jsonfiles\\userdata.json");

            try {
                //Calls the readFile method in our data object and puts it into a JsonObject called fileData
                //This allows us to put the created Json Object produced by readFile
                //And then call the createArray method using the Json Object to put all the data into an array
                JsonObject fileData = data.readFile();
                String[] dataArray = data.createArray(fileData);

                

                //We then use statement.setVariableType(index, VariableType) to add variables into the row
                //for (int i = 1, y = 0; i <= 6 && y <= 5; i++, y++) {
                //    statement.setString(i, dataArray[y]);
                //}

                // Encrypt sensitive data before insertion
                String encryptedIpAddress = EncryptionUtil.encrypt(dataArray[1]);
                String encryptedDomain = EncryptionUtil.encrypt(dataArray[2]);
                String encryptedLocation = EncryptionUtil.encrypt(dataArray[4]);

                statement.setString(1, dataArray[0]);
                statement.setString(2, encryptedIpAddress);
                statement.setString(3, encryptedDomain);
                statement.setString(4, dataArray[3]);
                statement.setString(5, encryptedLocation);
                statement.setString(6, dataArray[5]);

                
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
        } catch (Exception e) {
            System.out.println("Encryption failed");
            e.printStackTrace();
        }
    }
}

class EncryptionUtil {
    private static final String SECRET_KEY = "YourSecretKey"; // I will figure out a way to manage the keys
    private static final String ALGORITHM = "AES";

    public static String encrypt(String data) throws Exception {
        SecretKeySpec key = new SecretKeySpec(SECRET_KEY.getBytes(), ALGORITHM);
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, key);
        byte[] encryptedData = cipher.doFinal(data.getBytes());
        return Base64.getEncoder().encodeToString(encryptedData);
    }

    public static String decrypt(String encryptedData) throws Exception {
        SecretKeySpec key = new SecretKeySpec(SECRET_KEY.getBytes(), ALGORITHM);
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, key);
        byte[] decryptedData = cipher.doFinal(Base64.getDecoder().decode(encryptedData));
        return new String(decryptedData);
    }
}