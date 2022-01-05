import React, {useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import api from '../api/Axios'

const AddModal = (props) => {
    const { user, open, handleClose } = props
    const [ prod, setProd ] = useState({name: ``, type: "", description: '', price: ``, quantity: ''})

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
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        api.post('/addProduct',prod,config)
        .then(res => {
            console.log(res)
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
                        Create a new product
                    </Typography>
                    <br/><br/>
                    <TextField onChange={(event) => setProd({...prod,name:event.target.value})}id="outlined-basic" label="Name" variant="outlined" />
                    <br/><br/>
                    <TextField onChange={(event) => setProd({...prod,type:event.target.value})}id="outlined-basic" label="Type" variant="outlined" />
                    <br/><br/>
                    <TextField onChange={(event) => setProd({...prod,description:event.target.value})}id="outlined-basic" label="Description" variant="outlined" />
                    <br/><br/>
                    <TextField onChange={(event) => setProd({...prod,price:event.target.value})}id="outlined-basic" label="Price" variant="outlined" />
                    <br/><br/>
                    <TextField onChange={(event) => setProd({...prod,quantity:event.target.value})}id="outlined-basic" label="Quantity" variant="outlined" />
                    <br/><br/>
                    <Stack spacing={2}>
                        <Button variant="contained" color="success" onClick={handleSaveButton}>Save</Button>
                        <Button variant="contained" color="error" onClick={handleClose}>Close</Button>
                    </Stack>
                </center>
            </Box>
        </Modal>
    )
}

export default AddModal