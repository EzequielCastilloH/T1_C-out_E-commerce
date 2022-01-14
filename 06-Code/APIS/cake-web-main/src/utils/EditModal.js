import React, {useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import api from '../api/Axios'
import Notification from './Alert';
import {Link, useNavigate} from 'react-router-dom'

const EditModal = (props) => {
    const { product, user, open, name, price, handleClose } = props
    const [ pPrice, setpPrice] = useState('')
    const [ message, setMessage ] = useState('')
    const [ type, setType ] = useState('')
    const [ isOpen, setIsOpen ] = useState(true)
    const navigate = useNavigate()

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


    const handleSaveButton = (e) => {
        e.preventDefault()
        const prod = {
            name: name,
            price: pPrice
        }
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        api.put("/products/updateprice",prod, config)
        .then(response => {
            setMessage('Successful change!')
            setType('success')
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
                    <TextField onChange={(event) => setpPrice(event.target.value)} placeholder={price} id="outlined-number" label="New Price" type="number" InputLabelProps={{shrink: true,}} variant="outlined" defaultValue={price}/>
                    <br/><br/>
                    <Stack spacing={2}> 
                        <Button variant="contained" color="success" onClick={handleSaveButton}>Save</Button>
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

export default EditModal