import React,{useContext, useEffect, useState} from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { ProductContext } from './ProductContext'
import { styled } from '@mui/material/styles';
import api from '../api/Axios'
import Notification from './Alert';

const ListProducts = (props) => {
    const { user, open, handleClose, setDay } = props
    const { productsToShop, setProductsToShop } = useContext(ProductContext)
    const [ day, setDate ] = useState('')
    const [ message, setMessage ] = useState('')
    const [ type, setType ] = useState('')
    const [total, setTotal] = useState(0)
    const [iva, setIva] = useState(0)
    const [subTotal, setSubTotal] = useState(0)

    useEffect(() => {
        setDate(setDay())
    })

    useEffect(() => {
        const calculateSubTotal = (products) => {
            let subtotal = 0
            products.map(p => {
                subtotal = subtotal + p.total
            })
            setSubTotal(subtotal)
            return subtotal
        }
        
        const calculateIva = (products) => {
            const subtotal = calculateSubTotal(products)
            setIva(subtotal * 0.12)
            return subtotal * 0.12
        }
        
        const calculateTotal = (products) => {
            const subtotal = calculateSubTotal(products)
            const iva = calculateIva(products)
            setTotal(subtotal + iva)
            return subtotal + iva
        }
        calculateSubTotal(productsToShop)
        calculateIva(productsToShop)
        calculateTotal(productsToShop)
    })

    const style = {
        position: 'absolute',
        top: '55%',
        left: '90%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        height: 600,
        bgcolor: 'background.paper',
        borderRadius: 5,
        p: 4,
        boxShadow: 3 
    };
    
    const Div = styled('div')(({ theme }) => ({
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
        alignContent: 'center',
        justifyContent: 'center',
        display: 'flex'
    }));

    const calculateToPay = (product) => {
        const res =  product.newQuantity * product.prodPrice
        return res
    }

    const onShopClick = (e) => {
        e.preventDefault()
        let invoiceToSend = {
            date: day,
            productsToShop: productsToShop
        }
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        api.post('/invoice/add',invoiceToSend,config)
        .then(res => {
            productsToShop.map(p=>
                api.put('/products/updateShop',{name: p.name, newQuantity: p.newQuantity, quantity: p.quantity},config)
                .then(response => {console.log('Update OK')})
                .catch(error => {
                    setMessage(`Error with update of a product ${p.name}`)
                    setType('error')
                })
            )
            setMessage("Purchase Made")
            setType('success')
            setProductsToShop([])
        })
        .catch(err => {
            setMessage('There were problems when making the purchase')
            setType('error')
        })
    }

    return(
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            hideBackdrop = {true} 
            onClose={handleClose}
        >
            <Box sx={style}>
                <List sx={{height: 500}}>
                    <Div>{"Shopping Cart"}</Div>
                    {
                        productsToShop.map(p => 
                            <ListItem disablePadding>
                                <ListItemText primary={p.name} secondary={`Units: ${p.newQuantity}  Total: ${calculateToPay(p)}`}/>
                            </ListItem>
                        )
                    }
                    <hr/>
                    <p><b>Sub Total: </b>{`${subTotal}`}</p>
                    <p><b>Iva: </b>{`${iva} $`}</p>
                    <p><b>Total: </b>{`${total} $`}</p>
                </List><br/><br/>
                <Stack spacing={2} direction="row" sx={{display: 'flex', alignContent:'center', justifyContent: 'center'}}>
                    <Button variant="contained" color="success" onClick={onShopClick}>Shop</Button>
                    <Button variant="contained" color="error" onClick={handleClose}>Close</Button>
                </Stack><br/>
                <Notification type={type} message={message} />
            </Box>
        </Modal>
    )
}

export default ListProducts