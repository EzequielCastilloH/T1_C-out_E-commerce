import React from 'react'
import Typography from '@mui/material/Typography';

const ErrorPage = (props) => {
    const {docTitle, title} = props
    document.title= docTitle 
    return(
        <React.Fragment>
                <center>
                    <Typography sx={{color: '#d32f2f'}} variant="h2" component="div" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="button" display="block" gutterBottom>
                        Please try it again
                    </Typography>
                    <br/>
                    <br/>
                    <img src='https://conectemos.com/wp-content/uploads/2021/03/error-401.png' width='700' height='700'/>
                </center>
        </React.Fragment>
    )
}

export default ErrorPage