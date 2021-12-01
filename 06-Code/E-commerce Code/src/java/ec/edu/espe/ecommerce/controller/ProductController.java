package ec.edu.espe.ecommerce.controller;

import com.mongodb.client.MongoDatabase;

import ec.edu.espe.ecommerce.model.Product;
import ec.edu.espe.ecommerce.utils.MongoDB;

import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
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
        this.mongo = new MongoDB();
        this.dataBase = this.mongo.conecction(this.user, this.pass, this.databaseName);   
    }
    
    /*public String getProducts(){
        String products = "";
        try {
            products = this.mongo.completeModel(this.col, this.dataBase);
            return products;
        } catch (ParseException ex) {
            Logger.getLogger(ProductController.class.getName()).log(Level.SEVERE, null, ex);
            return "No data";
        }
    }*/

    public JSONArray getProducts(){
        JSONArray products;
        try {
            products = this.mongo.completeModel(this.col, this.dataBase);
            return products;
        } catch (ParseException ex) {
            Logger.getLogger(ProductController.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }

    /*public JSONObject jsonToObject(String json){
        JSONParser parser = new JSONParser();
        JSONObject object;
        try{
            object = (JSONObject)parser.parse(json);
            return object;
        }catch(ParseException e){
            e.printStackTrace();
            return null;
        }
    }*/

    public ArrayList<Object> jsonToList(JSONArray json){
        ArrayList<Object> listProduct = new ArrayList<Object>();
        if(json != null){
            for(int i=0; i<json.size();i++){
                listProduct.add(json.get(i));
            }
        }
        return listProduct;
    }

    
}
