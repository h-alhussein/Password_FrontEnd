import React, { useState, useRef, useEffect } from 'react'
import axios from '../../axios';
import './../../assets/css/login.css';
import './resert_password.css';
import { useSearchParams } from "react-router-dom";

import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CImage,

} from '@coreui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import img from './../../assets/login/locked.png'
const Resert_Password = () => {
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [question, setQuestion] = useState('');
  const [questionAnswer, setQuestionAnswer] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [searchParams] = useSearchParams();
  let resetCode = searchParams.get("code");
  console.log(resetCode)

  useEffect(() => {
    getQuestion();
  }, []);
  const getQuestion = async () => {
    try {
      const response = await axios.get('/api/v1/auth/secure-question/' + resetCode,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      setQuestion(response?.data)
    } catch (err) {
      console.log(err);
    }
  }
  const submit = async () => {
    setError(null);
    try {
      const response = await axios.post('/api/v1/auth/reset-password',
        JSON.stringify({ password, confirmPass, resetCode, questionAnswer }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const status = response?.status;
      if (status) {
        setSuccess(true);
        setSuccessMsg(response?.data);
      }
    } catch (err) {
      setError(['Sorry we have an internal error !']);
      if (err.response.data.errors)
        setError(err.response.data.errors);
      else setError([err.response.data]);
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
            <h1>Reaet Password</h1>
          </CCol>
          <CCol xs={12} style={{ textAlign: 'center' }}>

            <CForm >
              {success
                ?

                <>
                  <div style={{ display: 'inline flow-root list-item' }}>
                    <p style={{ color: 'green', width: '300px' }}>{successMsg}</p>
                  </div>
                  <CInputGroup className="mb-4"
                    style={{ justifyContent: 'center' }}>
                    <a style={{ color: '#ff6464', }}
                      href="login">Login</a>
                  </CInputGroup>
                </>
                : <>
                  <div style={{ display: 'inline flow-root list-item' }}> {error && error.map((i, t) =>
                    <p key={i} style={{ color: 'red', width: '300px', fontSize: '16px' }}>{i}</p>
                  )}</div>

                  <h6>Password</h6>

                  <CInputGroup className="mb-4"
                    style={{ justifyContent: 'center' }} >

                    <CFormInput
                      className='input pass'

                      type={showPassword ? 'text' : "password"}
                      placeholder="Password"
                      autoComplete='off'
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)} />
                    <CInputGroupText className='eye'
                      onClick={() => setShowPassword(!showPassword)}>
                      <i style={{ color: '#ff6464' }}>
                        {<FontAwesomeIcon
                          icon={showPassword ? faEye : faEyeSlash} />}</i>
                    </CInputGroupText>
                  </CInputGroup>
                  <h6 style={{ margin: '30px 0 0 -230px' }}  >Confirm Password</h6>

                  <CInputGroup className="mb-4"
                    style={{ justifyContent: 'center' }}>
                    <CFormInput className='input'
                      style={{ maxWidth: '304px' }}
                      type={showPassword2 ? 'text' : "password"}
                      placeholder="Confirm Password"
                      autoComplete='off'
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)} />
                    <CInputGroupText className='eye'
                      onClick={() => setShowPassword2(!showPassword2)}>
                      <i style={{ color: '#ff6464' }}>
                        {<FontAwesomeIcon
                          icon={showPassword2 ? faEye : faEyeSlash} />}</i>
                    </CInputGroupText>
                  </CInputGroup>
                  <h6 style={{ margin: '30px 0 0 -230px' }} >Secure Question</h6>
                  <CInputGroup className="mb-4"
                    style={{ justifyContent: 'center' }}>
                    <CFormInput className='input'
                      placeholder="Secure Question"
                      autoComplete='none'
                      value={question} />
                  </CInputGroup>


                  <h6 style={{ margin: '30px 0 0 -230px' }}>Question Answer</h6>

                  <CInputGroup className="mb-4"
                    style={{ justifyContent: 'center' }}>
                    <CFormInput className='input'
                      placeholder="Your Answer"
                      autoComplete='none'
                      value={questionAnswer}
                      required
                      onChange={(e) => setQuestionAnswer(e.target.value)} />
                  </CInputGroup>
                  <CInputGroup className="mb-4"
                    style={{ justifyContent: 'center' }} >
                    <CButton className="px-4 btn1"
                      onClick={() => { submit() }} >
                      Resert_Password
                    </CButton>
                  </CInputGroup>
                </>
              }
            </CForm>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Resert_Password
