import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Notification from '../utils/Alert'
import axios from 'axios'
import Example from './Example'

const Login = () => {
  const theme = createTheme();

  const [user, setUser] = useState({username: '', password:'', token: ''})
  const [ errorMessage, setErrorMessage ] = useState('')
  const [ notificationOpen, setOpen ] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/api/endpoints/login',user)
      .then(res => {
        window.localStorage.setItem('authUser', JSON.stringify(res.data))
        if(res.data.rol === 'user'){
          navigate('/products')
        }else{
          navigate('/inventory')
        }
      })
      .catch(err => {
        setErrorMessage('Wrong username or password!')
        setOpen(true)
      })
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
            backgroundImage: '../img/pan.jpg',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ><Example></Example></Grid>
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
            <Typography component="h3" variant="h3">
              Login
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="email"
                value={user.username}
                onChange = {(event) => setUser({...user,username: event.target.value})}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={user.password}
                onChange={(event) => setUser({...user,password:event.target.value})}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              {
                notificationOpen?
                <Notification type="error" message={errorMessage}/>:
                <></>
              }
              <Grid container>
                <Grid item>
                  <Link to='/register'>
                    {"Don't have an account? Register now"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default Login;