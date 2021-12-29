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

    public JSONArray getProducts(){
        JSONArray products;
        try {
            products = this.mongo.toJSONArray(this.col, this.dataBase);
            return products;
        } catch (ParseException ex) {
            Logger.getLogger(ProductController.class.getName()).log(Level.SEVERE, null, ex);
            return null;
        }
    }

    public ArrayList<Object> jsonToList(JSONArray json){
        ArrayList<Object> listProduct = new ArrayList<Object>();
        if(json != null){
            for(int i=0; i<json.size();i++){
                listProduct.add(json.get(i));
            }
        }
        return listProduct;
    }
    
    public void deleteProduct(int id){
        this.mongo.delete(this.col,"id",id,this.dataBase);
    }
    
    public JSONArray filterOfProduct(String type) throws ParseException{
        JSONArray find = new JSONArray();
        find = this.mongo.findJSONArray(this.col,"type",type,this.dataBase);
        return find;
    }
}
