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
import { cilCopy, cilReload } from '@coreui/icons'
const ViewAccountAttr = (state) => {
  const MySwal = withReactContent(Swal)

  useEffect(() => {
   
  }, []);
  const setDataToClipBaord =  (data) => {
    navigator.clipboard.writeText(data);
    MySwal.fire({
      html: '<small style=\'font-size:14px  \'>'+state.title+' <strong>' +
        '</strong> Copied successfuly.</small>',
      showConfirmButton: false,
      position: 'center',
      timer: 1500,
      background: '#cecaca',
      color: 'black',
      width:200,
      showClass: {
        popup: 'animate__animated animate__fadeIn'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut'
      }
    }
    )

  }


  return (
    <>    

          <h5 style={{
            fontFamily: "bebas_neue",
            color: 'white',
            margin: '30px 0 0 65px'
          }}>{state.title}</h5>
          <CInputGroup className="mb-3" >
            <CButton type="button" color="secondary" variant="ghost"              
             style={{borderRadius:'40%'}} id="button-addon1"
             onClick={()=>setDataToClipBaord(state.value)}
             >
                <CIcon icon={cilCopy} size="xl" />
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
              value={state.value}
             disabled
            /> 
              
          </CInputGroup >

         
    </>)
}

export default ViewAccountAttr
