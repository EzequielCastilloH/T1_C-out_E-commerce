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
import { styled } from '@mui/material/styles';
import Banner from '../utils/Banner';

const DessertsPage = () => {
    const [products, setProducts] = useState([])
    const [user, setUser] = useState({name: '', rol: '' ,token: '', username: ''})
    const [rol, setRol ] = useState('')
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

    const [ name, setName ] = useState('')
    const [ price, setPrice ] = useState('')
    const [ quantity, setQuantity ] = useState('')

    products.forEach(p => delete p._id)

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText('#EF5350'),
        backgroundColor: '#EF5350',
        '&:hover': {
          backgroundColor: '#EF5350',
        },
    }))

    const setDay = (e) => {
        const today = new Date()
        const dateShop = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`
        return dateShop
    }

    const renderDessertComponent = () => {
        return(
            <MainUserPage>
                <Banner linkImage="https://t4.ftcdn.net/jpg/02/27/88/83/240_F_227888305_Ji8fPeditvKC5VAcyYSGZ4SYxOIA2FJC.jpg" description="Bakery"/>
                <Grid container spacing={3} sx={{m:'5px'}}>
                    {
                        products.map(p => 
                            <Grid item xs={4}>
                                <Card sx={{ maxWidth: 550 }}>
                                    <center>
                                        <CardContent sx={{ bgcolor:'#E7E5DF'}}>
                                            <Typography variant="h5" component="div">
                                                {p.name}
                                            </Typography>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                {p.description}
                                            </Typography>
                                            <Typography variant="body2">
                                                {p.price} $
                                            </Typography>
                                        </CardContent><br/>
                                        <ColorButton variant="contained" onClick={() => {setSelected(p) 
                                            setOpen(true)
                                            setName(p.name)
                                            setPrice(p.price)
                                            setQuantity(p.quantity)}}>Shop Now</ColorButton>
                                            <br/>
                                    </center>
                                    <br/>
                                </Card>
                            </Grid>
                        )
                    }
                </Grid>
                <Modal user={user} name={name} price={price} quantityParam={quantity} setDay={setDay} product = {selected} handleClose={() => setOpen(false)} open={isOpen}/>
            </MainUserPage>
        )
    }

    return(
        <React.Fragment>
            {
                rol === 'user'?
                renderDessertComponent():
                <ErrorPage title = "Unauthorized page" docTitle="Unauthorized page"/> 
            }
        </React.Fragment>
    )
}

export default DessertsPage