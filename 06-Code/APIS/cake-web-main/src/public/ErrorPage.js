import React from 'react'
import Typography from '@mui/material/Typography';
import {Link, useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button';

const ErrorPage = (props) => {
    const {docTitle, title} = props
    const navigate = useNavigate()
    document.title= docTitle 
    return(
        <React.Fragment>
                <center>
                    <Typography sx={{color: '#d32f2f'}} variant="h2" component="div" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="button" display="block" gutterBottom>
                        Please try it again <br/>
                        <Button variant="contained" onClick={() => {
                        window.localStorage.removeItem('authUser')
                        navigate('/')
                        }
                        }>Return to the login page</Button>
                    </Typography>
                    <br/>
                    <br/>
                    <img src='https://conectemos.com/wp-content/uploads/2021/03/error-401.png' width='700' height='700'/>
                </center>
        </React.Fragment>
    )
}

export default ErrorPage