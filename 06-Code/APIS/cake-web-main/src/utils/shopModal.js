import React,{useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import api from '../api/Axios'

const ShopModal = (props) => {
    const { user, product, open, handleClose, setDay, name, price, quantityParam } = props
    const [ total, setTotal ] = useState(0)
    const [ prodName, setName] = useState('')
    const [ newQuantity, setQ ] = useState(0)
    const [ day, setDate ] = useState('')

    useEffect(() => {
        setName(name)
        setDate(setDay())
    })

    useEffect(() => {
        const totalPrice = newQuantity*price
        setTotal(totalPrice)
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

    
    const onShopClick = (e) => {
        e.preventDefault()
        const productToInvoice = {
            name: prodName,
            date: day,
            newQuantity: newQuantity,
            totalMoney: total
        }
        console.log(`cantidad: ${newQuantity}`)
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        api.post('/invoice/add',productToInvoice,config)
        .then(res => {
            api.put('/products/update',{name: productToInvoice.name, newQuantity: productToInvoice.newQuantity, quantity: quantityParam},config)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        })
        .catch(err => {
            console.log(err)
        })
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
                    <Input onChange={(event) => setQ(event.target.value)} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1, max: product.quantity}}  type='number' defaultValue='0'/>
                    <br/><br/>
                    <Typography variant="body2" color="text.secondary">
                        {product.quantity} units in stock
                    </Typography>
                    <br/><br/>
                    <Stack spacing={2}>
                        <Button variant="contained" color="success" onClick={onShopClick}>Shop</Button>
                        <Button variant="contained" color="error" onClick={handleClose}>Close</Button>
                    </Stack>
                </center>
            </Box>
        </Modal>
    )
}

export default ShopModal