import React, {useState, useEffect} from 'react'
import MainUserPage from '../templates/MainUserPage'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import api from '../api/Axios'
import ErrorPage from '../public/ErrorPage'
import Modal from '../utils/shopModal'
import { brown } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

const BakeryPage = () => {
    const [products, setProducts] = useState([])
    const [user, setUser] = useState({name: '', rol: '' ,token: '', username: ''})
    const [rol, setRol] = useState('')
    const [selected, setSelected] = useState({})
    const [ isOpen, setOpen ] = useState(false)

    useEffect(() => {
        const userAuth = window.localStorage.getItem('authUser')
        if(userAuth){
            const us = JSON.parse(userAuth)
            setUser(us)
        }
    },[])

    document.title = "Bakery"

    useEffect(() => {
        setRol(user.rol)
        const fetchData = async () => {
            try{
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
                const response = await api.post('/products/cakes',{type: 'bakery'},config)
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
    }, [user])

    products.forEach(p => delete p._id)

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(brown[400]),
        backgroundColor: brown[400],
        '&:hover': {
          backgroundColor: brown[700],
        },
    }))
    
    const renderBakeryComponent = () => {
        return(
            <MainUserPage>
                <Grid container spacing={3} sx={{m:'5px'}}>
                    {
                        products.map(p => 
                            <Grid item xs={4}>
                                <Card sx={{ maxWidth: 550 }}>
                                    <center>
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
                                        <ColorButton size="small" variant="contained" onClick={() => {setSelected(p) 
                                        setOpen(true)}}>Shop Now</ColorButton>
                                        <br/>
                                    </center>
                                    <br/>
                                </Card>
                            </Grid>
                        )
                    }
                </Grid>
                <Modal product = {selected} handleClose={() => setOpen(false)} open={isOpen}/>
            </MainUserPage>
        )
    }

    return(
        <React.Fragment>
            {
                rol === 'user'?
                renderBakeryComponent():
                <ErrorPage title = "Unauthorized page" docTitle="Unauthorized page"/>                    
            }
        </React.Fragment>
    )
}

export default BakeryPage