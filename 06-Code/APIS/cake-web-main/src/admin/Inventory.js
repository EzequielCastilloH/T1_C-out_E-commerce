import React, {useState, useEffect} from 'react'
import MainAdminPage from '../templates/MainAdminPage'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import api from '../api/Axios'

const InventoryPage = () => {

    const [products, setProducts] = useState([])
    document.title = "Products"
    
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await api.get('/products')
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
        <MainAdminPage>
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
                                        Price: ${p.price} 
                                    </Typography>
                                    <Typography variant="body2">
                                        Quantity: {p.quantity}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" variant="contained" color="secondary">Add</Button>
                                    <Button size="small" variant="contained">Edit</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                }
            </Grid>
        </MainAdminPage>
    )
}

export default InventoryPage