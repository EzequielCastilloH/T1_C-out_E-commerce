import React, {useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import api from '../api/Axios'
import Notification from './Alert';

const EditModal = (props) => {

    const [priceP, setPriceP] = React.useState("")

    const expressions  = {
        price: /^[0-9. ,]{1,5}$/, // numeros
        
      }

    const [validationPrice, setValidationPrice] = useState("")
    const [errorPrice, setErrorPrice] = useState(false)


    const onChangePrice = (e) =>{
        setPriceP(e.target.value)
        console.log(priceP)
    
        if(expressions .price.test(priceP)){
    
          setValidationPrice("Correct Price")
          setErrorPrice(false) 
        }else{
          setValidationPrice("Wrong Price...maximum 5 characters and only numbers")
          setErrorPrice(true) 
        }
    
      }


    const { product, user, open, name, price, handleClose } = props
    const [ pPrice, setpPrice] = useState('')
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
        if(errorPrice === true ){
            alert("Wrong fields")
          }else{
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
                    
                    required 
                    placeholder={price}
                    id="outlined-number" 
                    label="New Price" 
                    type="number" 
                    InputLabelProps={{shrink: true,}} 
                    variant="outlined" 
                    defaultValue={price}
                    error = {errorPrice}
                    helperText = {validationPrice}
                    onBlur={(onChangePrice)}
                    onChange={(event) => setpPrice(event.target.value)} 
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

export default EditModal