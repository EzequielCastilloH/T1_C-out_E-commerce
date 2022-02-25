import React from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Banner = (props) => {
    const { linkImage, description } = props
    return(
        <React.Fragment>
            <Card sx={{ boxShadow: 'none' }}>
                <CardMedia
                    component="img"
                    height="150"
                    image={linkImage}
                    alt="image description"
                />
                <CardContent>
                    <Typography variant="h4" color="text.secondary" sx={{textAlign: 'center', color: '#c8972b', fontWeight: 'bold'}}>
                        {description}
                    </Typography>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default Banner