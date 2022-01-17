import React, {useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import api from '../api/Axios'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Notification from './Alert';

const AddModal = (props) => {

    const reload = () => {
        window.location.reload(true);
    }

    const [name, setName] = React.useState("")
    const [quantityP, setQuantity] = React.useState("")
    const [priceP, setPrice] = React.useState("")
    

    const expressions  = {
        price: /^[0-9. ,]{1,5}$/, // numeros
        name: /^[a-zA-ZÀ-ÿ\s]{1,20}$/, // Letras y espacios, pueden llevar acentos.
          quantity: /^[0-9]{1,5}$/, // numeros
      }


      const [validationName, setValidationName] = useState("")
      const [errorName, setErrorName] = useState(false)
    
      const [validationPrice, setValidationPrice] = useState("")
      const [errorPrice, setErrorPrice] = useState(false)
    
      const [validationQuantity, setValidationQuantity] = useState("")
      const [errorQuantity, setErrorQuantity] = useState(false)
      
      const onChangeName = (e) =>{
        setName(e.target.value)
        console.log(name)
    
        if(expressions .name.test(name)){
    
          setValidationName("Correct Name of Product")
          setErrorName(false) 
        }else{
          setValidationName("Wrong Name...maximum 20 characters and only letters")
          setErrorName(true) 
        }
    
      }

      const onChangePrice = (e) =>{
        setPrice(e.target.value)
        console.log(priceP)
    
        if(expressions .price.test(priceP)){
    
          setValidationPrice("Correct Price")
          setErrorPrice(false) 
        }else{
          setValidationPrice("Wrong Price...maximum 5 characters and only numbers")
          setErrorPrice(true) 
        }
    
      }

      const onChangeQuantity = (e) =>{
        setQuantity(e.target.value)
        console.log(quantityP)
    
        if(expressions .quantity.test(quantityP)){
    
          setValidationQuantity("Correct Price")
          setErrorQuantity(false) 
        }else{
          setValidationQuantity("Wrong Quantity...maximum 5 characters and only numbers")
          setErrorQuantity(true) 
        }
    
      }

    const { user, open, handleClose } = props
    const [ prod, setProd ] = useState({name: ``, type: "", description: '', price: ``, quantity: ''})
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

    const handleSaveButton = (e) => {
      if(errorQuantity === true || errorName === true || errorQuantity === true ){
        alert("Wrong fields")
      }else{
        e.preventDefault()
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        api.post('/addProduct',prod,config)
        .then(response => {
            setMessage('Successful change!')
            setType('success')
            alert("Add Success")
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
                        Create a new product
                    </Typography>
                    <br/><br/>
                    <TextField 
                    onChange={(event) => setProd({...prod,name:event.target.value})}
                    id="outlined-basic" 
                    label="Name"
                    
                     variant="outlined" 
                     fullWidth="true" 
                     required
                     error = {errorName}
                     helperText = {validationName}
                     onBlur={(onChangeName)} 
                     autoFocus
                     />
                    <br/><br/>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Type" variant="outlined" required onChange={(event) => setProd({...prod,type:event.target.value})}>
                        <MenuItem value="bakery">Bakery</MenuItem>
                        <MenuItem value="dessert">Dessert</MenuItem>
                        <MenuItem value="cake">Cake</MenuItem>
                        </Select>
                    </FormControl>
                    <br/><br/>
                    <TextField onChange={(event) => setProd({...prod,description:event.target.value})}id="outlined-basic" label="Description" variant="outlined" fullWidth="true" required/>
                    <br/><br/>
                    <TextField 
                    onChange={(event) => setProd({...prod,price:event.target.value})}
                    id="outlined-basic" 
                    label="Price" 
                    variant="outlined" 
                    type="number" 
                    fullWidth="true" 
                    required
                    error = {errorPrice}
                    helperText = {validationPrice}
                    onBlur={(onChangePrice)}
                    />
                    <br/><br/>
                    <TextField onChange={(event) => setProd({...prod,quantity:event.target.value})}
                    id="outlined-basic" 
                    label="Quantity" 
                    variant="outlined" 
                    type="number" 
                    fullWidth="true" 
                    required
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

export default AddModal