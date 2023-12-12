import React, { useState, useEffect } from 'react'
import { useSearchParams } from "react-router-dom";
import axios from '../../axios';
import './register-success.css';
import {
  CCol,
  CContainer,
  CRow,
  CImage,
} from '@coreui/react'

import img from './../../assets/login/locked.png'
const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [msg, setMsg] = useState('');
  let code = searchParams.get("code");
  useEffect(() => {
    submit();
  }, []);
  const submit = async () => {
    try {
      const response = await axios.post('/api/v1/auth/verify-email/' + code,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const status = response?.status;
      console.log('1- ', status);
      console.log('2- ', response);
      setMsg(response?.data)
    } catch (err) {
      console.log('3- ', err);
      setMsg('Sorry we have an internal error !');
      setMsg(err?.response.data)
    }
  }


  return (
    <div className="min-vh-100 d-flex flex-row align-items-center">
      <CContainer >
        <CRow >
          <CCol xs={12}
            className='header1'>
            <CImage src={img}
              className='img' />
            <h1>Verify Email</h1>
          </CCol>
          <CCol xs={12} style={{ textAlign: 'center' }}>
            <p>{msg}</p>

            <a style={{ color: '#ff6464', fontSize: '32px' }}
              href="login">Login</a>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default VerifyEmail
