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
import { brown } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';

const InvoicePage = () => {

    const [products, setProducts] = useState([])
    const [ rol, setRol ] = useState('')
    const [user, setUser] = useState({name: '', rol: '' ,token: '', username: ''})
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
                const response = await api.get('/invoice',config)
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
    return(
        <MainAdminPage>
            <Grid container spacing={3} sx={{m:'5px'}}>
                {
                    products.map(p => 
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    <ListItem alignItems="flex-start">
                                        
                                        <ListItemText 
                                            primary= {p.name}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography variant="body2">
                                                        Date:                                                        
                                                    </Typography>
                                                        {p.date}
                                                    <Typography variant="body2">
                                                        Quantity:                                                        
                                                    </Typography>
                                                        {p.quantity}
                                                    <Typography variant="body2">
                                                        Total amount:                                                        
                                                    </Typography>
                                                        {p.totalMoney}
                                                </React.Fragment>
                                            }
                                        />
                                        
                                    </ListItem>
                                <Divider variant="inset" component="li" />
                        </List>
                    )
                }
            </Grid>
        </MainAdminPage>
    );

 }
 export default InvoicePage;