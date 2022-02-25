import React, {useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import api from '../api/Axios'
import Notification from './Alert';

const QuantityModal = (props) => {

   

    const [quantityP, setQuantity] = React.useState("")

    const expressions  = {
        
        quantity: /^[0-9]{1,5}$/, // numeros
      }

      const [validationQuantity, setValidationQuantity] = useState("")
      const [errorQuantity, setErrorQuantity] = useState(false)
      
      const onChangeQuantity = (e) =>{
        setQuantity(e.target.value)
        console.log(quantityP)
    
        if(expressions .quantity.test(quantityP)){
    
          setValidationQuantity("Correct Quantity")
          setErrorQuantity(false) 
        }else{
          setValidationQuantity("Wrong Quantity...maximum 5 characters and only numbers")
          setErrorQuantity(true) 
        }
    
      }


    const { product, user, open, name, quantity, handleClose } = props
    const [ pQuantity, setPQuantity ] = useState('')
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
        if(errorQuantity === true ){
            alert("Wrong fields")
          }else{
        e.preventDefault()
        const prod = {
            name: name,
            quantity: pQuantity
        }
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        api.put("/products/update",prod, config)
        .then(response => {
            setMessage('Successful change!')
            setType('success')
            //alert("Prices changed succesfully")
            reload()
        })
        .catch(error => {
            setMessage('There were problems when making the changes')
            setType('error')
        })
    }
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
                    <TextField 
                    onChange={(event) => setPQuantity(event.target.value)} 
                    required 
                    placeholder={quantity} 
                    id="outlined-number" 
                    label="New Quantity" 
                    type="number" 
                    InputLabelProps={{shrink: true,}} 
                    variant="outlined" 
                    defaultValue={quantity}
                    error = {errorQuantity}
                    helperText = {validationQuantity}
                    onBlur={(onChangeQuantity)}
                    />
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

export default QuantityModal