import React, {useState, useEffect} from 'react'
import MainUserPage from '../templates/MainUserPage'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import api from '../api/Axios'

const BakeryPage = () => {
    const [products, setProducts] = useState([])
    document.title = "Cakes"
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await api.post('/products/cakes',{type: 'bakery'})
                setProducts(response.data)
            }catch(err){
                if(err.response){
                    console.log(err.response.data)
                    console.log(err.response.status)
                    console.log(err.response.headers)
                }else{
                    console.log(`Error: ${err.message}`)
                }
            }
        }
        fetchData()
    }, [])

    products.forEach(p => delete p._id)

    return(
        <MainUserPage>
            <Grid container spacing={3} sx={{m:'5px'}}>
                {
                    products.map(p => 
                        <Grid item xs={4}>
                            <Card sx={{ maxWidth: 550 }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {p.name}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {p.description}
                                    </Typography>
                                    <Typography variant="body2">
                                        {p.price} $
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" variant="contained">Shop Now</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                }
            </Grid>
        </MainUserPage>
    )
}

export default BakeryPage