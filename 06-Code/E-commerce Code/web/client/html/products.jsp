<%-- 
    Document   : products
    Created on : Nov 30, 2021, 4:26:01 PM
    Author     : Adrian Burgos
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
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
    </body>
</html>
