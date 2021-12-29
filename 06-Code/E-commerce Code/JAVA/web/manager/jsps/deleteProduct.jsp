<%-- 
    Document   : deleteProduct
    Created on : 1 dic. 2021, 06:19:14
    Author     : mateo
--%>

<%@page import="ec.edu.espe.ecommerce.controller.ProductController"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="refresh" content="3; url=productInventory.jsp">
        <title>La Reina</title>
    </head>
    <body>
        <h1>Your product has been deleted!</h1>
        <%
            int id;
            id = Integer.parseInt(request.getParameter("delete"));
            ProductController pController = new ProductController();
            pController.deleteProduct(id);
        %>
    </body>
</html>
