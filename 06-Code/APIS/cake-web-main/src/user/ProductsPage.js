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
import Box from '@mui/material/Box';
import { brown } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SpeedDial from '@mui/material/SpeedDial';
import ListProducts from '../utils/ListProducts';
import Banner from '../utils/Banner';

const ProductsPage = () => {
    const [ rol, setRol ] = useState('')
    const [products, setProducts] = useState([])
    const [selected, setSelected] = useState({})
    const [user, setUser] = useState({name: '', rol: '' ,token: '', username: ''})
    const [ isOpen, setOpen ] = useState(false)
    const [ isCartOpen, setCartOpen ] = useState(false)

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

    
    const renderProductsComponent = () => {
        return(
            <MainUserPage>
                <center>
                <img class="logo" src="https://github.com/EzequielCastilloH/T1_C-out_E-commerce/blob/main/06-Code/E-commerce%20Code/JAVA/web/img/logo.png?raw=true" width="300" height="300"/>
                </center>
            </MainUserPage>
        )
    }

    return(
        <React.Fragment>
            {
                rol === 'user'?
                renderProductsComponent():
                <ErrorPage title = "Unauthorized page" docTitle="Unauthorized page"/>                    
            }
        </React.Fragment>
    )
}
export default ProductsPage