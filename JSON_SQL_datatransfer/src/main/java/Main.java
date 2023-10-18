import com.databasetest.DBC;

public class Main {
    public static void main(String[] args){
        String jsonFilePath = "SecurityWebScanner/JSON_SQL_datatransfer/jsonfiles/userdata.json";

        DBC connection = new DBC();
        connection.dbc(jsonFilePath);
    }
}
