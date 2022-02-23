import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React,{useState} from 'react'
import axios from 'axios'
import Notification from '../utils/Alert';
import {useNavigate} from 'react-router-dom'

const Register = () => {

  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [userName, setUserName] = React.useState("")
  const [password, setPassword] = React.useState("")
  //VALIDATION FIELDS
  const expressions  = {
    username: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    name: /^[a-zA-ZÀ-ÿ\s]{1,30}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,17}$/, // 4 a 17 digitos.
      email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  }

  const [validationName, setValidationName] = useState("")
  const [errorName, setErrorName] = useState(false)

  const [validationEmail, setValidationEmail] = useState("")
  const [errorEmail, setErrorEmail] = useState(false)

  const [validationUserName, setValidationUserName] = useState("")
  const [errorUserName, setErrorUserName] = useState(false)

  const [validationPassword, setValidationPassword] = useState("")
  const [errorPassword, setErrorPassword] = useState(false)


  const onChangeName = (e) =>{
    setName(e.target.value)
    console.log(name)

    if(expressions .name.test(name)){

      setValidationName("Correct User")
      setErrorName(false) 
    }else{
      setValidationName("Wrong Name.!maximum 30 characters and only letters")
      setErrorName(true) 
    }

  }

  const onChangeEmail = (e) =>{
    setEmail(e.target.value)
    console.log(email)

    if(expressions .email.test(email)){

      setValidationEmail("Correct Email")
      setErrorEmail(false) 
    }else{
      setValidationEmail("Please Enter a valid email")
      setErrorEmail(true) 
    }

  }

  const onChangeUser = (e) =>{
    setUserName(e.target.value)
    console.log(userName)

    if(expressions .username.test(userName)){

      setValidationUserName("Correct User")
      setErrorUserName(false) 
    }else{
      setValidationUserName("Please Enter a valid user Max 16 characters")
      setErrorUserName(true) 
    }

  }

  const onChangePassword = (e) =>{
    setPassword(e.target.value)
    console.log(password)

    if(expressions .password.test(password)){

      setValidationPassword("Correct Password")
      setErrorPassword(false) 
    }else{
      setValidationPassword("Please Enter a valid password...Max 17 digits")
      setErrorPassword(true) 
    }

  }

  const theme = createTheme();
  const [user, setUser] = useState({
    name: '',
    email:'',
    username: '',
    password: '',
    rol: 'user'

  })
  const [ message, setMessage ] = useState({msg: '', type: ''})
  const [ open, setOpen ] = useState(false)
  const navigate = useNavigate()
  const handleRegister = (e) => {
   
    if(errorName === true || errorEmail === true || errorUserName === true || errorPassword === true ){
      alert("Wrong fields")
    }else{
    e.preventDefault()
    axios.post('http://localhost:3001/api/endpoints/add',user)
      .then(res => {
        
        setMessage({msg: 'Done!', type:'success'})
        alert("Register Success")
        setOpen(true)
        
      })
      .catch(err => {
        
        setMessage({msg: 'An error occurred with the registry', type:'error'})
        setOpen(true)
      })
    }
    }
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1530610476181-d83430b64dcd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y3JvaXNzYW50fGVufDB8fDB8fA%3D%3D&w=1000&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
          
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img src="https://github.com/EzequielCastilloH/T1_C-out_E-commerce/blob/main/06-Code/APIS/cake-web-main/src/img/a784f96a-e176-4e03-a812-c2b71afcb3ef.jpg?raw=true" width="200" height="200"/>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                
                variant="outlined"
                margin="normal"
                required
                fullWidth
                error = {errorName}
                helperText = {validationName}
                onBlur={(onChangeName)}
                label="Complete Name"
                name="name"
                value ={user.name}
                onChange={(event) => setUser({...user,name: event.target.value})}
                autoFocus
              />
              
              <TextField
              variant ="outlined"
               error = {errorEmail}
               helperText = {validationEmail}
               onBlur={(onChangeEmail)}
                margin="normal"
                required
                fullWidth
                label="Email"
                value={user.email}
                onChange={(event) => setUser({...user,email: event.target.value})}
              />
               
              <TextField
                variant ="outlined"
                error = {errorUserName}
                helperText = {validationUserName}
                onBlur={(onChangeUser)}
                margin="normal"
                required
                fullWidth
                label="Username"
                name="username"
                autoComplete="username"
                value={user.username}
                onChange = {(event) => setUser({...user,username: event.target.value})}
              />
              
              <TextField
                variant="outlined"
                error = {errorPassword}
                helperText = {validationPassword}
                onBlur={(onChangePassword)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={user.password}
                onChange={(event) => setUser({...user,password:event.target.value})}
              />
              {
                open?
                <Notification message={message.msg} type={message.type}/>:
                <></>
              }
              <br/>
              <Stack spacing={2} direction="row">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                  onClick={handleRegister}
                >
                  Register
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={() => navigate('/')}
                >
                  Back
                </Button>
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default Register;