import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import './../../assets/css/login.css';
import './register.css';

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
  CFormSelect
} from '@coreui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import img from './../../assets/login/locked.png'
const Register = () => {
  const navigate = useNavigate();
  const fullNameRef = useRef();
  const [questions, setQuestions] = useState();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [questionAnswer, setQuestionAnswer] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    fullNameRef.current.focus();
    getQuestions();
  }, []);
  const getQuestions = async () => {
    try {
      const response = await axios.get('/api/v1/questions',
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      setQuestions(response?.data)
    } catch (err) {
      console.log(err);
    }
  }
  const submit = async () => {
    setError(null);
    try {
      const response = await axios.post('/api/v1/auth/register',
        JSON.stringify({
          email, fullName, password,
          confirmPass, questionId, questionAnswer
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const status = response?.status;
      console.log('gg', status);
      console.log('77777', response);
      if (status) {
        navigate('/register-success');
      }
    } catch (err) {
      setError(['Sorry we have an internal error !']);
      setError(err.response.data.errors);
      console.log(err.response)
      //setError(response?.errors);
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
            <h1>Register</h1>
          </CCol>
          <CCol xs={12} style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline flow-root list-item' }}> {error && error.map((i, t) =>
              <p key={i} style={{ color: 'red', width: '300px' }}>{i}</p>
            )}</div>
            <CForm >
              <h6>Full Name</h6>
              <CInputGroup className="mb-3"
                style={{ justifyContent: 'center' }}
              >
                <CFormInput
                  className='input'
                  ref={fullNameRef}
                  placeholder="john doe"
                  aria-describedby="basic-addon2"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />

              </CInputGroup >
              <h6 style={{ margin: '30px 0 0 -290px' }}>E-Mail</h6>

              <CInputGroup className="mb-3"
                style={{ justifyContent: 'center' }}
              >

                <CFormInput
                  className='input'
                  placeholder="johndoe@email.com"
                  autoComplete="email"
                  type='email'
                  aria-describedby="basic-addon2"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)} />
              </CInputGroup >

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

                <CFormSelect aria-label="Default select example"
                  className='input'
                  onChange={(e) => setQuestionId(e.target.value)}
                >
                  <option
                    style={{ color: 'white' }}
                    key='0' value='0' hidden>Select Your Secure Question</option>
                  {questions?.map((item) =>
                    <option
                      style={{ color: 'white' }}
                      key={item.id} value={item.id}>{item.question}</option>
                  )

                  }
                </CFormSelect>
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
                  Register
                </CButton>
              </CInputGroup>
              <CInputGroup className="mb-4"
                style={{ justifyContent: 'center' }}>
                <p style={{
                  width: '100%',
                  color: 'white',
                }}>Already have an account!</p>
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

export default Register
