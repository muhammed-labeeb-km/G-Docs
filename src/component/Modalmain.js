import TextField from '@mui/material/TextField';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './Modalmain.css'
import { addDoc, collection,onSnapshot  } from 'firebase/firestore';
import { dataStore } from './firebase';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function Modalmain(props) {

    const {open,setOpen,heading,setHeading} = props

    const handleClose = () => setOpen(false);
  
    const collectionRef = collection(dataStore,'docs')

    const newDocs = () => {

      if(heading !=''){
        addDoc(collectionRef,{
          title:heading
          }).then(() => {
            alert('Data Added')
            handleClose()
            setHeading('')
        })
        .catch(() => {
            alert('Cannot add, error occured')
        })  
      }else{
        alert("Input is Empty")
      }
 
    }

    


  return (
    <div>
    
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>

      <div className='modal-component'>
        <TextField onChange={(e)=>{setHeading(e.target.value)}} value={heading} id="outlined-basic" className='main-textFiels'  label="Add Title" variant="outlined" /> 
        
        <div className='btn-div'>
        <Button onClick={()=>{newDocs()}}  style={{color:'grey',borderColor:'grey'}} variant="outlined">ADD</Button>
        </div>

      </div>

      </Box>
    </Modal>
    </div>
  )
}

export default Modalmain
