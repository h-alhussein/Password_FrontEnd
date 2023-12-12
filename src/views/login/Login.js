import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from './../../axios';
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
const Login = () => {

  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const usernameRef = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validName, setValidName] = useState(false);
  const [validPass, setValidPass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const showPass = () => {
    setShowPassword(!showPassword);
  }
  useEffect(() => { usernameRef.current.focus(); }, []);
  useEffect(() => {
    setValidName(true);
    const mailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if ((mailRegx.test(username))) setValidName(true);
  }, [username]);
  useEffect(() => {
    setValidPass(false);
    if (password && password.length >= 2)
      setValidPass(true);
  }, [password]);

  const submit = async () => {
    setError(false);
    try {
      const response = await axios.post('/api/v1/auth/login',
        JSON.stringify({ email: username, password }),
        {
          headers: {
            'Content-Type': 'application/json',
            "Accept-Language": "en-US,en;"
          },
        }
      )
      const accessToken = response?.data.access_token;
      console.log(response)
      if (accessToken) {
        setAuth({ username, password, accessToken });
        navigate('/collections');
      }
      else {
        setError(true);
        setErrMsg(response?.data.msg);
      }
    } catch (err) {
      setError(true);
      setErrMsg(err.response?.data);
      setErrMsg('Sorry we have an internal error !');
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
            <h1 style={{ fontFamily: "bebas_neue", color: 'white', textAlign: 'center' }}>LOGIN</h1>
          </CCol>
          <CCol xs={12} style={{ textAlign: 'center' }}>
            <CForm >
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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </CInputGroup >
              <h6 style={{
                fontFamily: "bebas_neue",
                color: 'white',
                margin: '30px 0 0 -270px'
              }}>Password</h6>

              <CInputGroup className="mb-4"
                style={{ justifyContent: 'center' }}
              >
                <CFormInput
                  style={{
                    background: "#4a4d65", color: '#b3b3b3',
                    borderWidth: '2px', borderColor: '#ffffff',
                    borderRight: 'none', borderRadius: '12px',
                    borderBottomRightRadius: '0',
                    borderTopRightRadius: '0',

                    maxWidth: '304px'
                  }}
                  type={showPassword ? 'text' : "password"}
                  placeholder="Password"
                  autoComplete='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <CInputGroupText style={{
                  background: '#4a4d65', borderWidth: '2px',
                  borderColor: '#ffffff', borderRadius: '12px',
                  borderLeft: 'none',
                  borderBottomLeftRadius: '0',
                  borderTopLeftRadius: '0',
                }}
                  onClick={() => showPass()}>
                  <i onClick={() => showPass()} style={{ color: '#ff6464' }}>
                    {<FontAwesomeIcon
                      icon={showPassword ? faEye : faEyeSlash} />}</i>
                </CInputGroupText>
              </CInputGroup>
              <p className={!error ? 'valid' : 'err'}>{errMsg}</p>

              <CInputGroup className="mb-4"
                style={{ justifyContent: 'center' }}
              >
                <a style={{ color: '#ff6464', }}
                  href="forget-password">Forget Password</a>

              </CInputGroup>
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
                  disabled={!validName || !validPass}
                  onClick={() => { submit() }}
                >
                  Login
                </CButton>
              </CInputGroup>
              <CInputGroup className="mb-4"
                style={{ justifyContent: 'center' }}
              >
                <p style={{
                  width: '100%',
                  color: 'white',
                }}>Don&apos;t have account yet?</p>
                <a style={{ color: '#ff6464', }}
                  href="register">Register</a>
              </CInputGroup>
            </CForm>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
