import React from 'react'
import './register-success.css';
import {
  CCol,
  CContainer,
  CRow,
  CImage,
} from '@coreui/react'

import img from './../../assets/login/locked.png'
const RegisterSuccess = () => {
  return (
    <div className="min-vh-100 d-flex flex-row align-items-center">
      <CContainer >
        <CRow >
          <CCol xs={12}
            className='header1'>
            <CImage src={img}
              className='img' />
            <h1>Register Success</h1>
          </CCol>
          <CCol xs={12} style={{ textAlign: 'center' }}>
            <p>Congratulations, Your account is created.</p>
            <p> We send a verification E-Mail</p>
            <p>Please verify your E-Mail to <a style={{ color: '#ff6464', fontSize: '32px' }}
              href="login">Login</a></p>


          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default RegisterSuccess
