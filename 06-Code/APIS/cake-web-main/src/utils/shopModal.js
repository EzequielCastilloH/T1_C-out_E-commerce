import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from '@mui/material/Input';
import Stack from '@mui/material/Stack';

const ShopModal = (props) => {
    const { product, open, handleClose } = props

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
                    <Input inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1, max: product.quantity}}  type='number' defaultValue='0'/>
                    <br/><br/>
                    <Typography variant="body2" color="text.secondary">
                        {product.quantity} units in stock
                    </Typography>
                    <br/><br/>
                    <Stack spacing={2}>
                        <Button variant="contained" color="success" >Shop</Button>
                        <Button variant="contained" color="error" onClick={handleClose}>Close</Button>
                    </Stack>
                </center>
            </Box>
        </Modal>
    )
}

export default ShopModal