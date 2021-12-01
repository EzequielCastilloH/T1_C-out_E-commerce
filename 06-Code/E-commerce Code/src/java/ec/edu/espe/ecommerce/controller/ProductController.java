package ec.edu.espe.ecommerce.controller;

import com.mongodb.client.MongoDatabase;
import ec.edu.espe.ecommerce.utils.MongoDB;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.simple.parser.ParseException;

/**
 *
 * @author Team 1 C-Out
 */
public class ProductController {
    private MongoDB mongo;
    private String user;
    private String pass;
    private String databaseName;
    private MongoDatabase dataBase;
    private String col;
    
    public ProductController(){
        this.user = "root";
        this.pass = "24681012";
        this.databaseName = "Bakery";
        this.col = "Products";
        this.mongo.getInstance();
    }
    
    public String getProducts(){
        String toReturn= "";
        this.dataBase = this.mongo.conecction(this.user, this.pass, this.databaseName);   
        try {
            toReturn = this.mongo.completeModel(this.col, this.dataBase);
            return toReturn;
        } catch (ParseException ex) {
            Logger.getLogger(ProductController.class.getName()).log(Level.SEVERE, null, ex);
            return "No data";
        }
    }
}
