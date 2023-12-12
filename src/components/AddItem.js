import React, { useState, useEffect } from 'react'
import {
  CImage,
  CButton,
  CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
  CInputGroup, CFormInput
} from '@coreui/react'
import png1 from 'src/assets/images/p1.jpg'
import axios from '../axios';
import useAuth from "../hooks/useAuth";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'animate.css';
import { IMAGE_URL } from "../consts";

const AddItem = (state) => {
  const MySwal = withReactContent(Swal)
  const { auth } = useAuth();
  const [id, setId] = useState()
  const [image, setImage] = useState()
  const [name, setName] = useState()
  const [title, setTitle] = useState('Add New ')
  const [msg, setMsg] = useState(' Saved ')

  let parentId = 'none'
  let url = '/api/v1/collections';

  useEffect(() => {
    if (state.item) {
      setTitle('Update ')
      setMsg(' Updated ')
      setName(state.item.name)
      setId(state.item.id)

    }
  }, []);



  const submit = async () => {
    if (state.type === 'Group') {
      parentId = (state.collectionId)
      url = ('/api/v1/groups')
    }
   
    const formData = new FormData();
    formData.append(`name`, name);
    if (image)
      formData.append(`image`, image);
    if (state.type === 'Group')
      formData.append(`collectionId`, parentId);
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
        setName(null)
        setImage(null)

    }
    state.setVisible(false)
    
    state.getData()
    MySwal.fire({
      html: '<small style=\'font-size:18px  \'>The ' + state.type + ' <strong>' +
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
        onClose={() => state.setVisible(false)}
        style={{ color: 'white', background: 'rgb(39, 43, 96)' }}
      >
        <CModalHeader onClose={() => state.setVisible(false)}>
          <CModalTitle >{title + state.type + '.'}</CModalTitle>
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
          <h6 style={{
            fontFamily: "bebas_neue",
            color: 'white',
            margin: '30px 0 0 65px'
          }}> {state.type + ' Name'}</h6>
          <CInputGroup className="mb-3"
            style={{ justifyContent: 'center' }}
          >
            <CFormInput
              style={{
                background: "#4a4d65", color: '#b3b3b3',
                borderWidth: '2px', borderColor: '#ffffff',
                borderRadius: '12px',
                maxWidth: '350px'
              }}

              placeholder={state.type + ' Name'}
              aria-describedby="basic-addon2"
              value={name}
              onChange={(e) => { setName(e.target.value) }}
            />
          </CInputGroup >

        </CModalBody>
        <CModalFooter>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <CButton color="secondary" onClick={() => state.setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary" onClick={() => submit()}>Save</CButton>
          </div>
        </CModalFooter>
      </CModal>
    </>)
}

export default AddItem
