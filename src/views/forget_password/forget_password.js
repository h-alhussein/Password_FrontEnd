import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import './login.css';
import useAuth from '../../hooks/useAuth';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
  CImage
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import img from './../../assets/login/locked.png'
const Forget_password = () => {

  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const usernameRef = useRef();
  const [email, setEemail] = useState('');
  const [validName, setValidName] = useState(false);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => { usernameRef.current.focus(); }, []);
  useEffect(() => {
    setValidName(true);
    const mailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if ((mailRegx.test(email))) setValidName(true);
  }, [email]);
  const submit = async () => {
    setError(false);
    try {
      const response = await axios.post('/api/v1/auth/forget-password',
        JSON.stringify({ email }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (response?.data) {
        setSuccess(true);
        setSuccessMsg(response?.data);
      }

    } catch (err) {
      setError(true);
      setErrMsg(err.response?.data);
    }
  }

  return (

    <div className="min-vh-100 d-flex flex-row align-items-center">
      <CContainer >
        <CRow >
          <CCol xs={12}
            style={{ marginBottom: '40px', textAlign: 'center' }}>
            <CImage width='150px' src={img}
              style={{ marginBottom: '20px', maxHeight: '150px', width: 'auto' }} />
            <h1 style={{ fontFamily: "bebas_neue", color: 'white', textAlign: 'center' }}>Forget Password</h1>
          </CCol>
          <CCol xs={12} style={{ textAlign: 'center' }}>
            <CForm >
              {success
                ?
                <div style={{ display: 'inline flow-root list-item' }}>
                  <p style={{ color: 'green', width: '300px' }}>{successMsg}</p>
                </div>
                :
                <>
                  <div style={{ display: 'inline flow-root list-item' }}>
                    <p style={{ color: 'red', width: '300px' }}>{errMsg}</p>
                  </div>
                  <h6 style={{
                    fontFamily: "bebas_neue",
                    color: 'white',
                    margin: '30px 0 0 -290px'

                  }}>E-Mail</h6>

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
                      ref={usernameRef}
                      placeholder="johndoe@email.com"
                      autoComplete="username"
                      aria-describedby="basic-addon2"
                      value={email}
                      onChange={(e) => setEemail(e.target.value)}
                    />

                  </CInputGroup >
                  <CInputGroup className="mb-4"
                    style={{ justifyContent: 'center' }}
                  >
                    <CButton style={{
                      backgroundColor: "#ff6464",
                      width: '350px',
                      fontFamily: "bebas_neue",
                      fontSize: '22px',
                      color: 'white',
                      border: 'none', borderRadius: '12px',
                    }}
                      className="px-4"
                      disabled={!validName}
                      onClick={() => { submit() }}
                    >
                      Send E-Mail
                    </CButton>
                  </CInputGroup>
                </>}
              <CInputGroup className="mb-4"
                style={{ justifyContent: 'center' }}
              >
                <a style={{ color: '#ff6464', }}
                  href="login">Login</a>
              </CInputGroup>
            </CForm>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Forget_password
