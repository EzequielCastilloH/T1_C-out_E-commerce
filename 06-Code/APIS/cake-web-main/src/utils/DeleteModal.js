import React, {useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import api from '../api/Axios'
import Notification from './Alert';

const DeleteModal = (props) => {
    const { product, user, open, name, handleClose } = props
    const [ message, setMessage ] = useState('')
    const [ type, setType ] = useState('')
    const [ isOpen, setIsOpen ] = useState(true)

    const style = {
        position: 'absolute',
        top: '50%', 
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        borderRadius: 5,
        p: 4,
    }

    const reload = () => {
        window.location.reload(true);
    }

    const handleSaveButton = (e) => {
        e.preventDefault()
        const prod = {
            name: name
        }
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        api.delete("/products/deleteProduct",prod, config)
        .then(response => {
            setMessage('Deleted successfully!')
            setType('success')
            //alert("Prices changed succesfully")
            reload()
        })
        .catch(error => {
            setMessage('There were problems when making the changes')
            setType('error')
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
                        {name}
                    </Typography>
                    <br/><br/>
                    Are you sure you want to delete this product?
                    <br/><br/>
                    <Stack spacing={2}> 
                        <Button variant="contained" color="success" onClick={handleSaveButton}>Yes</Button>
                        <Button variant="contained" color="error" onClick={handleClose}>Close</Button>
                    </Stack>
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

export default DeleteModal