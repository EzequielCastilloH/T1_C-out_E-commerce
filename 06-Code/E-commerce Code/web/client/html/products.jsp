<%-- 
    Document   : products
    Created on : Nov 30, 2021, 4:26:01 PM
    Author     : Adrian Burgos
--%>

<%@page import="org.json.simple.parser.*"%>
<%@page import="org.json.simple.*"%>
<%@page import="java.util.ArrayList"%>
<%@page import="ec.edu.espe.ecommerce.model.Product"%>
<%@page import="ec.edu.espe.ecommerce.controller.ProductController"%>
<%@page import="org.json.simple.JSONObject"%>
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
        <title>La Reina</title>
    </head>
    <body>
        <nav class="navbar nav-bar-main">
            <center><a class="navbar-brand"><img src="../../img/logo.png" width="80" heigth="9  0" alt="alt"/></a></center>
            <form class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success btn-search" type="submit">Search</button>
            </form>
            <div class="icons">
                <div class="right"></div>
                <ul class="left">
                    <li>
                        <i class="fas fa-tag"></i>
                    </li>
                    <li>
                        <i class="fas fa-shopping-bag"></i>
                    </li>
                    <li>
                        <i class="fas fa-door-closed none"></i>
                    </li>
                </ul>
            </div>
        </nav>
        <ul class="navbar-nav navbar nav-bar-secondary">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Bakery</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Desserts</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Cakes</a>
            </li>
        </ul>
        <%
            ProductController pController = new ProductController();
            JSONArray json = pController.getProducts();
            ArrayList<Object> listProducts;
            listProducts = pController.jsonToList(json);
            out.println("<div class='flex-container'>");
            for(int i=0;i<listProducts.size();i++){
                JSONParser parser = new JSONParser();
                JSONObject obj;
                try {
                    obj = (JSONObject)parser.parse(String.valueOf(listProducts.get(i)));
                    out.println("<div class='card' style='width: 18rem; height: 20rem;>");
                    out.println("<br><h5 class='card-title'>Name: "+obj.get("name")+"</h5>");
                    out.println("<br>Description: "+obj.get("description"));
                    out.println("<br>Quantity: "+obj.get("quantity"));
                    out.println("<br>Price: "+obj.get("price"));
                    out.println("<br>Type: "+obj.get("type")+"<hr><div align='center'><form action='buyProduct.jsp'>"
                            + "<button class='btn-delete' name='buy' value='"+(obj.get("id"))+"'type='submit'>Buy</button></form>"
                            + "</div></div>");
                 } catch(ParseException e) {
                    e.printStackTrace();
                 }
            }
            out.println("</div>");
        %>
    </body>
</html>
