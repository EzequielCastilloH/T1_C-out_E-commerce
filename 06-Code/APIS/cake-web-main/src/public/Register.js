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
  const theme = createTheme();
  const [user, setUser] = useState({
    name: '',
    email:'',
    username: '',
    password: '',
    rol: 'user',
    hasError: false,
    hasErrorN: false,
    hasErrorP: false,
    hasErrorU: false,
  });
  const emailRegexp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);
  const nameRegexp = new RegExp(/[A-Za-z]+/);
  const [ message, setMessage ] = useState({msg: '', type: ''})
  const [ open, setOpen ] = useState(false)
  const navigate = useNavigate()
  
  const handleRegister = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8081/api/endpoints/add',user)
      .then(res => {
        setMessage({msg: 'Done!', type:'success'})
        setOpen(true)
        
      })
      .catch(err => {
        setMessage({msg: 'An error occurred with the registry', type:'error'})
        setOpen(true)
      })
  }
  function handleBlur() {
    /*
      1. Evaluamos de manera síncrona
      si el valor del campo no es un correo valido.
      2. Recordar que este método se llama
      cada vez que abandonamos el campo y evita
      que el usuario reciba un error sin haber terminado
      de poner el valor.
    */
    const hasError = !emailRegexp.test(user.email);
    setUser((prevState) => ({ ...prevState, hasError }));
  }
  function handleBlurN() {
    /*
      1. Evaluamos de manera síncrona
      si el valor del campo no es un correo valido.
      2. Recordar que este método se llama
      cada vez que abandonamos el campo y evita
      que el usuario reciba un error sin haber terminado
      de poner el valor.
    */
    const hasErrorN = !nameRegexp.test(user.name);
    setUser((prevState) => ({ ...prevState, hasErrorN }));
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
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value ={user.name}
                onChange={(event) => setUser({...user,name: event.target.value})}
                
                onBlur={handleBlurN} 
                
                 aria-errormessage="nameErrorID"
                 aria-invalid={user.hasErrorN}
                autoFocus
              />
              <p
                 id="msgID"
                aria-live="assertive"
                style={{ visibility: user.hasErrorN ? "visible" : "hidden" }}
               >
                 Please enter a valid name
                </p>
              
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
               
                autoComplete="email"
                value={user.email}
                onChange={(event) => setUser({...user,email: event.target.value})}
                onBlur={handleBlur} 
                
                 aria-errormessage="emailErrorID"
                 aria-invalid={user.hasError}
              />
              <p
        id="msgID"
        aria-live="assertive"
        style={{ visibility: user.hasError ? "visible" : "hidden" }}
      >
        Please enter a valid email
      </p>
              <TextField
                
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={user.username}
                onChange = {(event) => setUser({...user,username: event.target.value})}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
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