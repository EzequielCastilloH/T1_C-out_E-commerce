import React, {useState, useEffect} from 'react'
import MainUserPage from '../templates/MainUserPage'
import api from '../api/Axios'
import ErrorPage from '../public/ErrorPage'
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import {Link, useNavigate} from 'react-router-dom'

const ProductsPage = () => {
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
                const response = await api.get('/products',config)
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
                    <Card sx={{width: '1200px', marginTop: '20px', boxShadow: 3}}>
                        <img class="logo" src="https://github.com/EzequielCastilloH/T1_C-out_E-commerce/blob/main/06-Code/APIS/cake-web-main/src/img/home.jpg?raw=true" width="1200" height="600"/>
                        <Link to="/products/bakery">
                            <Button variant="contained" color="error" sx={{marginLeft: '10px'}} >Bakery</Button>
                        </Link>
                        <Link to="/products/dessert">
                            <Button variant="contained" color="error" sx={{marginLeft: '10px'}} >Desserts</Button>
                        </Link>
                        <Link to="/products/cakes">
                            <Button variant="contained" color="error" sx={{marginLeft: '10px'}} >Cakes</Button><br/><br/>
                        </Link>
                    </Card>
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