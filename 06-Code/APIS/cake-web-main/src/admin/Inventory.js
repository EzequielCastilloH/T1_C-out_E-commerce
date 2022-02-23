import React, {useState, useEffect} from 'react'
import MainAdminPage from '../templates/MainAdminPage'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import api from '../api/Axios'
import ErrorPage from '../public/ErrorPage'
import Modal from '../utils/EditModal'
import AddModal from '../utils/AddModal';
import { brown } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Banner from '../utils/Banner';
import QuantityModal from '../utils/QuantityModal';
import DeleteModal from '../utils/DeleteModal';

const InventoryPage = () => {
    const [products, setProducts] = useState([])
    const [ rol, setRol ] = useState('')
    const [selected, setSelected] = useState({})
    const [user, setUser] = useState({name: '', rol: '' ,token: '', username: ''})
    const [ isOpen, setOpen ] = useState(false)
    const [ isOpenAdd, setOpenAdd ] = useState(false)
    const [ isOpenQuantity, setIsOpenQuantity ] = useState(false)
    const [ isOpenDelete, setIsOpenDelete ] = useState(false)

    document.title = "Products"
    
    useEffect(() => {
        const userAuth = window.localStorage.getItem('authUser')
        if(userAuth){
            const us = JSON.parse(userAuth)
            setUser(us)
        }
    },[])

    useEffect(() => {
        setRol(user.rol)
        const fetchData = async () => {
            try{
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
                const response = await api.get('/products',config)
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

    const [ name, setName ] = useState('')
    const [ price, setPrice ] = useState('')
    const [ quantity, setQuantity ] = useState('')

    const ColorButtonEdit = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(brown[400]),
        backgroundColor: brown[400],
        '&:hover': {
          backgroundColor: brown[700],
        },
    }))
    
    const renderProductsComponent = () => {
        return(
            <MainAdminPage>
                <Banner linkImage="https://t3.ftcdn.net/jpg/04/85/52/28/240_F_485522816_zydL5SPa54Fu9e4KRuzNdIsITNivH7rt.jpg" description="Inventory"/>
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
                                                Price: ${p.price} 
                                            </Typography>
                                            <Typography variant="body2">
                                                Quantity: {p.quantity}
                                            </Typography>
                                        </CardContent>
                                        <ColorButtonEdit sx={{bottom: 5, right: 5, bgcolor:'#fffa85', color: 'black'}} size="small" variant="contained" onClick={() => {
                                            setSelected(p)
                                            setName(p.name)
                                            setPrice(p.price)                                       
                                            setOpen(true)
                                        }}>Price</ColorButtonEdit>
                                        <ColorButtonEdit sx={{bottom: 5, right: -10, bgcolor:'#bea58f', color: 'black'}} size="small" variant="contained" onClick={() => {
                                            setSelected(p)
                                            setName(p.name)
                                            setQuantity(p.quantity)                                      
                                            setIsOpenQuantity(true)
                                        }}>Quantity</ColorButtonEdit>
                                        
                                        <br/>
                                    </center>
                                    <br/>
                                </Card>
                            </Grid>
                        )
                    }
                </Grid>
                <Fab color="primary" aria-label="add" sx={{position: 'fixed', bottom: 30, right: 90, flexGrow: 1 ,bgcolor:'#67af78', color: 'white'}}>
                    <AddIcon onClick={() => {
                        setOpenAdd(true)
                    }} />
                </Fab>
                <Modal product={selected} name={name} price={price} user={user} handleClose={() => setOpen(false)} open={isOpen}/>
                <QuantityModal product={selected} name={name} quantity={quantity} user={user} handleClose={() => setIsOpenQuantity(false)} open={isOpenQuantity}/>
                <DeleteModal name={name} user={user} handleClose={() => setIsOpenDelete(false)} open={isOpenDelete}/>
                <AddModal product={selected} user={user} handleClose={() => setOpenAdd(false)} open={isOpenAdd}/>
            </MainAdminPage>
        )
    }

    return(
        <React.Fragment>
            {
                rol === 'admin'?
                renderProductsComponent():
                <ErrorPage title = "Unauthorized page" docTitle="Unauthorized page"/>  
            }
        </React.Fragment>
    )
}

export default InventoryPage