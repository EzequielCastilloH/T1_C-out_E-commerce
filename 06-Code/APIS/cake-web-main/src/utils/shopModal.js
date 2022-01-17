import React,{useState, useEffect, useContext} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import api from '../api/Axios'
import Notification from './Alert';
import { ProductContext } from './ProductContext';

const ShopModal = (props) => {
    const { user, product, open, handleClose, setDay, name, price, quantityParam } = props
    const [ total, setTotal ] = useState(0)
    const [ prodName, setName] = useState('')
    const [ newQuantity, setQ ] = useState(0)
    const [ prodPrice, setPrice ] = useState(0)
    const [ day, setDate ] = useState('')
    const [ message, setMessage ] = useState('')
    const [ type, setType ] = useState('')
    const [ isOpen, setIsOpen ] = useState(true)
    const { productsToShop, setProductsToShop } = useContext(ProductContext)

    useEffect(() => {
        setName(name)
        setDate(setDay())
        setPrice(price)
    })

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        borderRadius: 5,
        p: 4,
    };

    const reload = () => {
        window.location.reload(true);
    }
    
    const onAddToShopClick = (e) => {
        e.preventDefault()
        const productToInvoice = {
            name: prodName,
            newQuantity: newQuantity,
            prodPrice: prodPrice,
            quantity: quantityParam,
            total: 0
        }
        productsToShop.push(productToInvoice)
        setMessage('Added to cart!')
        setType('success')
    }
    
    return(
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <center>
                    <Typography variant="h5" component="div">
                        {product.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {product.price} $
                    </Typography>
                    <Typography variant="body2">
                        {product.description}
                    </Typography>
                    <Input 
                    size='25'
                    onChange={(event) => setQ(event.target.value)} 
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1, max: product.quantity}}  
                    type='number' 
                    />
                    <br/><br/>
                    <Typography variant="body2" color="text.secondary">
                        {product.quantity} units in stock
                    </Typography>
                    <br/><br/>
                    <Stack spacing={2}>
                        <Button variant="contained" color="success" onClick={onAddToShopClick}>Add to Shopping Cart</Button>
                        <Button variant="contained" color="error" onClick={handleClose}>Close</Button>
                    </Stack>
                    <br/>
                    {
                        isOpen?
                        <Notification type={type} message={message} />:
                        <></>
                    }
                </center>
            </Box>
        </Modal>
    )
}

export default ShopModal