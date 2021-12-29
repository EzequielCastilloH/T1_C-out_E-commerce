<%-- 
    Document   : getProducts
    Created on : Nov 30, 2021, 8:14:45 PM
    Author     : Adrian Burgos
--%>

<%@page import="ec.edu.espe.ecommerce.controller.ProductController"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <%
            ProductController pController = new ProductController();
            out.println(pController.getProducts());
        %>
    </body>
</html>
