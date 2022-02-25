import React, {useState, useEffect} from 'react'
import MainAdminPage from '../templates/MainAdminPage'
import api from '../api/Axios'
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import { orange } from '@mui/material/colors';

const InvoicePage = () => {
    const [products, setProducts] = useState([])
    const [ rol, setRol ] = useState('')
    const [user, setUser] = useState({name: '', rol: '' ,token: '', username: ''})

    document.title = "Inovices"
    
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
            <Container sx={{display: 'flex', alignContent: 'center', justifyContent:' center', width: 900}}>
                <br/><br/>
                {
                    products.map(p =>
                        <Card sx={{mr: 6, mt: 10, width: 200, padding: 2}}>
                            <Typography variant="h6" gutterBottom component="div">
                                <b>{`Date: ${p.date}`}</b>
                            </Typography>
                            {
                                p.products.map(pr => 
                                <List component="nav">
                                    <ListItemText primary={`Product Name: ${pr.name}`} secondary={`Units: ${pr.newQuantity} ; Total: ${pr.total}`}/>
                                </List>
                                )
                            }
                        <Chip label={`Subtotal: ${p.subTotal} $`} color="success" variant="contained" /><br/><br/>
                        <Chip label={`Iva(12%): ${p.iva} $`} color="warning" variant="contained" /><br/><br/>
                        <Chip label={`Total: ${p.total} $`} color="error" variant="contained" /><br/><br/>
                       </Card>
                    )
                }
            </Container>
        </MainAdminPage>
    );

 }
 export default InvoicePage;