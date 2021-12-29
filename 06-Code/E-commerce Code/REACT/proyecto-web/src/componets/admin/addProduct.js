import React from 'react'
import { Button, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { ConstructionOutlined } from '@mui/icons-material'
import './estilo.css';

const addProduct = () => {
  return(
    <div class="login">
<div class="login-screen">
<div class="app-title">
<h1>Product Registration</h1>
</div>

<div class="login-form">
 <div class="control-group">
 <TextField 
     size="large"
     sx={{width: 200,ny :3}}
     variant="standard"
     placeholder="Name of product"
     
     
     />
         
         
 </div><br /><br />
 
 <div class="control-group">
 <TextField 
     size="large"
     sx={{width: 200,ny :3}}
     variant="standard"
     placeholder="Price of product"
     
     
     />
     </div><br /><br />
   <div class="control-group">
 <TextField 
     size="large"
     sx={{width: 200,ny :3}}
     variant="standard"
     placeholder="Stock of product"
     
     
     />
</div><br /><br />
<div class="control-group">
 <TextField 
     size="large"
     sx={{width: 200,ny :3}}
     variant="standard"
     placeholder="Type of product"
     
     
     />
</div><br /><br />
<div class="control-group">
 <TextField 
     size="large"
     sx={{width: 200,ny :3}}
     variant="standard"
     placeholder="Description of product"
     
     
     />
         
         
 </div><br /><br />

         
         
 
 <a class="btn btn-primary btn-large btn-block" href="#">SAVE</a>
 
</div>
</div>
</div>
   
)

}
export default addProduct