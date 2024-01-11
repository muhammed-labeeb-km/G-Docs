import React, { useState } from 'react'
import './Doc.css'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modalmain from './Modalmain';
import { useEffect } from 'react';
import { addDoc, collection,onSnapshot,doc,deleteDoc  } from 'firebase/firestore';
import { dataStore } from './firebase';
import { Link } from 'react-router-dom';

function Doc(props) {

  const {dataStore,setTry,tryed} = props
  // console.log(tryed);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    const [heading,setHeading] = useState('')

    const collectionRef = collection(dataStore,'docs')
    const [dataOfDocs,setDataOfDocs] = useState([])
    
    const getData = () => {
      onSnapshot(collectionRef, (data) => {
        setDataOfDocs(data.docs.map((doc) => {
              return {...doc.data(), id: doc.id}
          }))
      })
  }

  const deleteThisDoc = async(i) => {
    const documentToDelete = doc(collectionRef, i.id);
    await deleteDoc(documentToDelete);
  }

  useEffect(() => {
    getData()
  }, []);





  return (
    <div className='mainComp'>
   
      <Typography color='textSecondary' variant="h3" gutterBottom style={{fontWeight:'bolder'}}>
        DOCS APP
      </Typography>
     
      <Button
      onClick={handleOpen}
        style={{color:'grey',borderColor:'grey'}}
        variant="outlined">Add A DOCUMENT
        </Button>
        
      <div className='doc-align' >
      {
        dataOfDocs.map(i=>(
          <div className='document-thumbnail' key={i.id} >
          <div className='thum-top' >
          <div>
            {i.title}
          </div>
          <div className='for-btn' >
          <Link to={`/type/${i.id}`} >
          <button onClick={()=>setTry({__html: i.docsDesc})} >🖋</button>
          </Link>
          <button onClick={()=>{deleteThisDoc(i)}} >🗑</button>
          </div>
          </div>
          <div>
          <div dangerouslySetInnerHTML={{__html: i.docsDesc}} style={{border:'none',color:'grey',userSelect: 'none',outline:'none'}} />

          </div>
          </div>
        ))
      }
      </div>

        <Modalmain open={open} setOpen={setOpen} heading={heading} setHeading={setHeading}  />

    </div>
  )
}

export default Doc
