import React, { useState, useEffect } from 'react'
import {
  CImage,
  CButton,
  CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
  CInputGroup, CFormInput,CInputGroupText
} from '@coreui/react'
import png1 from 'src/assets/images/p1.jpg'
import axios from '../axios';
import useAuth from "../hooks/useAuth";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'animate.css';
import { IMAGE_URL } from "../consts";
import  InputText from "./inputText";
import CIcon from '@coreui/icons-react';
import { cilReload } from '@coreui/icons'
const AddAccount = (state) => {
  const MySwal = withReactContent(Swal)
  const { auth } = useAuth();
  const [id, setId] = useState()
  const [image, setImage] = useState()
  const [name, setName] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [website, setWebsite] = useState()
  const [notes, setNotes] = useState()


  const [title, setTitle] = useState('Add New Account.')
  const [msg, setMsg] = useState(' Saved ')

  let parentId = state.parentId;
  let url = '/api/v1/accounts';

  useEffect(() => {
    if (state.item) {
      setTitle('Update Account '+state.item.name)
      setMsg(' Updated ')      

    }
    setData()
  }, []);
  useEffect(() => {    
    setData()
  }, [state.item]);
  const setData =  () => {
    if (state.item) {     
      setName(state.item.name)
      setId(state.item.id)
      setUsername(state.item.username)
      setWebsite(state.item.website)
      setPassword(state.item.password)
      setNotes(state.item.notes)

    }else {
      setName(null)
      setImage(null)
      setUsername(null)
      setWebsite(null)
      setNotes(null)
      generatePassword()
    }

  }

  const generatePassword = async () => {
    const response = await axios.get('/api/v1/passgenerator/generate',      
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth?.accessToken
        },
      });
      if(response)
      setPassword(response.data)

   }

  const submit = async () => {   
    const formData = new FormData();
    formData.append(`name`, name);
    formData.append(`username`, username);
    formData.append(`password`, password);
    formData.append(`website`, website);
    formData.append(`notes`, notes);
    if (image)
      formData.append(`image`, image);    
      formData.append(`groupId`, parentId);
    if (state.item) {
      const response = await axios.put(url + '/' + id,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + auth?.accessToken
          },
        });
    } else {
      const response = await axios.post(url,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + auth?.accessToken
          },
        });     

    }
    
    state.setVisible(false)
    state.getData()
    setData()
    
    MySwal.fire({
      html: '<small style=\'font-size:18px  \'>The Account <strong>' +
        name + '</strong> ' + msg + 'successfuly.</small>',
      showConfirmButton: false,
      position: 'top',
      timer: 3000,
      background: '#153e03',
      color: 'white',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }
    )


  }






  return (
    <>
      <CModal
        backdrop="static"
        visible={state.visible}
        onClose={() => {state.setVisible(false);setData();}}
        style={{ color: 'white', background: 'rgb(39, 43, 96)' }}
      >
        <CModalHeader >
          <CModalTitle >{title }</CModalTitle>
        </CModalHeader>
        <CModalBody >
          <CInputGroup className="mb-3"
            style={{ justifyContent: 'center' }}
          >
            <input type="file" id="actual-btn" hidden
              onChange={(e) => {
                if (e.target.files[0]) {
                  let x = new File([e.target.files[0]], e.target.value);
                  setImage(x);
                  e.target.value = null;
                }
              }} />
            <label htmlFor="actual-btn">
              {image
                ? <CImage width='80px' src={URL.createObjectURL(image)}
                  style={{ maxHeight: '80px', width: 'auto', borderRadius: '12px', }} />
                : <CImage width='80px' src={state.item && state.item.imageId ? IMAGE_URL + state.item.imageId : png1}
                  style={{ maxHeight: '80px', width: 'auto', borderRadius: '12px', }} />}
            </label>
          </CInputGroup>

<InputText title='Account Name' value={name} setValue={setName} />
<InputText title='Username' value={username} setValue={setUsername} />


          <h5 style={{
            fontFamily: "bebas_neue",
            color: 'white',
            margin: '30px 0 0 65px'
          }}>Password</h5>
          <CInputGroup className="mb-3"
           
          >
            <CButton type="button" color="secondary" variant="ghost"              
             style={{borderRadius:'40%'}} id="button-addon1"
             onClick={()=>generatePassword()}
             >
                <CIcon icon={cilReload} size="xl" />
                </CButton>
            <CFormInput
              style={{
                background: "#4a4d65", color: '#b3b3b3',
                borderWidth: '2px', borderColor: '#ffffff',
                borderRadius: '12px',
                maxWidth: '350px',
                marginLeft:'10px'               
              }}              
              aria-describedby="basic-addon2"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
            />
              
          </CInputGroup >

          <InputText title='WebSite' value={website} setValue={setWebsite} />
<InputText title='Notes' value={notes} setValue={setNotes} />



        </CModalBody>
        <CModalFooter>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <CButton color="secondary" onClick={() => {state.setVisible(false);setData()}}>
              Close
            </CButton>
            <CButton color="primary" onClick={() => submit()}>Save</CButton>
          </div>
        </CModalFooter>
      </CModal>
    </>)
}

export default AddAccount
