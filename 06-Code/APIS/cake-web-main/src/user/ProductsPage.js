import React, {useState, useEffect} from 'react'
import MainUserPage from '../templates/MainUserPage'
import api from '../api/Axios'
import ErrorPage from '../public/ErrorPage'

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
                <img class="logo" src="../img/home.jpg" width="300" height="300"/>
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