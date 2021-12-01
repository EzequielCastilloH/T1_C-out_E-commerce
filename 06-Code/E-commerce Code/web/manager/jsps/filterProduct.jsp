<%-- 
    Document   : filterProduct
    Created on : 1 dic. 2021, 10:34:51
    Author     : mateo
--%>

<%@page import="org.json.simple.parser.ParseException"%>
<%@page import="org.json.simple.JSONObject"%>
<%@page import="org.json.simple.parser.JSONParser"%>
<%@page import="java.util.ArrayList"%>
<%@page import="org.json.simple.JSONArray"%>
<%@page import="ec.edu.espe.ecommerce.controller.ProductController"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
        <link rel="stylesheet" href="../css/style.css">
        <title>JSP Page</title>
    </head>
    <body>
        <div class="flex-container">
        <%
            String type;
            type = request.getParameter("filter");
            ProductController pController = new ProductController();
            JSONArray json = pController.filterOfProduct(type);
            ArrayList<Object> listProducts;
            listProducts = pController.jsonToList(json);
            for(int i=0;i<listProducts.size();i++){
                JSONParser parser = new JSONParser();
                JSONObject obj;
                try {
                    obj = (JSONObject)parser.parse(String.valueOf(listProducts.get(i)));
                    out.println("<div>Id: "+obj.get("id"));
                    out.println("<br>Name: "+obj.get("name"));
                    out.println("<br>Description: "+obj.get("description"));
                    out.println("<br>Quantity: "+obj.get("quantity"));
                    out.println("<br>Price: "+obj.get("price"));
                    out.println("<br>Type: "+obj.get("type")+"<hr><div align='center'><form action='editProduct.jsp'><button"
                            + " class='btn-delete' name='edit' value='"+(obj.get("id"))+"'type='submit'>Edit</button></form><form action='deleteProduct.jsp'>"
                            + "<button class='btn-delete' name='delete' value='"+(obj.get("id"))+"'type='submit'>Delete</button></form>"
                            + "</div></div>");
                 } catch(ParseException e) {
                    e.printStackTrace();
                 }
            }
        %>
         </div>
    </body>
</html>
