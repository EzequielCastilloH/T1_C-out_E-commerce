import React from 'react'
import { Button, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { ConstructionOutlined } from '@mui/icons-material'
import './estilo.css';

const Client = () => {
  return(
    <div class="login">
<div class="login-screen">
<div class="app-title">
<h1>Clients Registration</h1>
</div>

<div class="login-form">
<div class="login-form1">
 <div class="control-group">
 <TextField 
     size="large"
     sx={{width: 200,ny :3}}
     variant="standard"
     placeholder="Name of Client"
     
     
     />
         
         
 </div><br /><br />
 
 <div class="control-group">
 <TextField 
     size="large"
     sx={{width: 200,ny :3}}
     variant="standard"
     placeholder="Lastname of Client"
     
     
     />
     </div><br /><br />
   <div class="control-group">
 <TextField 
     size="large"
     sx={{width: 200,ny :3}}
     variant="standard"
     placeholder="Username of Client"
     
     
     />
</div><br /><br />
<div class="control-group">
 <TextField 
     size="large"
     sx={{width: 200,ny :3}}
     variant="standard"
     placeholder="Password"
     type="password"
     
     
     />
</div><br /><br />
<div class="control-group">
 <TextField 
     size="large"
     sx={{width: 200,ny :3}}
     variant="standard"
     placeholder="Phone"
     
     
     />
         
         
 </div><br /><br />
 <div class="control-group">
 <TextField 
     size="large"
     sx={{width: 200,ny :3}}
     variant="standard"
     placeholder="Email"
     
     
     />
         
         
 </div><br /><br />
 <div class="control-group">
 <TextField 
     size="large"
     sx={{width: 200,ny :3}}
     variant="standard"
     placeholder="Direction"
     
     
     />
         
         
 </div><br /><br />
 <div class="control-group">
 <TextField 
     size="large"
     sx={{width: 200,ny :3}}
     variant="standard"
     placeholder="Bank Account"
     
     
     />
         
         
 </div><br /><br />
         </div>
         
 
 <a class="btn btn-primary btn-large btn-block" href="#">SAVE</a>
 
</div>
</div>
</div>
   
)

}
export default Client
