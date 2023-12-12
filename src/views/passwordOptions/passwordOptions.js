import React, { useState, useEffect } from 'react'
import {
  CCol,
  CRow,
  CInputGroup,
  CFormInput, CCallout, CInputGroupText, CFormLabel, CFormCheck
} from '@coreui/react'
import useAuth from "../../hooks/useAuth";
import axios from '../../axios';
const PasswordOptions = () => {
  const { auth } = useAuth();
  const [item, setItem] = useState({
    length: 10,
    upperCase: true,
    digits: true,
    minus: true,
    space: false,
    underLine: true,
    special: true,
    brackets: false

  });
  const [passExample, setPassExample] = useState('');

  useEffect(() => {
    getData('');
    getData('/generate');
  }, []);
  const getData = async (path) => {
    let url = '/api/v1/passgenerator' + path;
    try {
      const response = await axios.get(url,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth?.accessToken
          }
        }
      )
      if (path)
        setPassExample(response?.data)
      else
        setItem(response?.data)

    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (passExample) {
      if (item.length > 9) save()
    }
  }, [item]);
  const onItemChang = (e) => {
    let value = e.target.value;
    if (value === 'on') value = e.target.checked;
    if ([e.target.name][0] === 'length') value = parseInt(value) || 0
    setItem({
      ...item,
      [e.target.name]: value
    })
  }
  const save = async () => {
    const response = await axios.post('/api/v1/passgenerator',
      item,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth?.accessToken
        },
      }
    )
    setPassExample(response?.data)
  }


  return (
    <>
      <CRow >
        <CCol>
          <CCallout color="dark" style={{ background: '#404040' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><h3 style={{ fontFamily: 'goblin' }}>Password Generator Options</h3>
              <p style={{ fontFamily: 'abee' }}>Here you can define Properties of generated Passwords</p></div>

          </CCallout>
        </CCol>
      </CRow>
      <CRow >
        <CCol sm={12}>
          <CFormLabel htmlFor="basic-url">Current Options</CFormLabel>
          <CInputGroup className="mb-3">
            <CInputGroupText id="basic-addon3">Length of generated Password</CInputGroupText>
            <CFormInput id="basic-url" aria-describedby="basic-addon3"
              type='number' min={8} value={item.length}
              name='length'
              onChange={(e) => onItemChang(e)}

            />
          </CInputGroup>


        </CCol>
        <CCol>
          <CCallout color="dark" style={{ background: '#1C1B1F' }}>
            <CRow >
              <CCol sm={6} style={{ marginBottom: '30px' }}>
                <CFormCheck style={{ fontWeight: '700' }} label="Upper Case"
                  name='upperCase'
                  onChange={(e) => onItemChang(e)}
                  defaultChecked={item.upperCase}
                />
                <CFormLabel style={{ fontWeight: '1', fontSize: '14px' }} >A,B,C,...</CFormLabel>
              </CCol>
              <CCol sm={6} style={{ marginBottom: '30px' }}>
                <CFormCheck style={{ fontWeight: '700' }} label="Digits"
                  name='digits'
                  onChange={(e) => onItemChang(e)}
                  defaultChecked={item.digits}
                />
                <CFormLabel style={{ fontWeight: '1', fontSize: '14px' }}
                >1,2,3,...</CFormLabel>
              </CCol>
              <CCol sm={6} style={{ marginBottom: '30px' }}>
                <CFormCheck style={{ fontWeight: '700' }} label="Space"
                  name='space'
                  onChange={(e) => onItemChang(e)}
                  defaultChecked={item.space}
                />
                <CFormLabel style={{ fontWeight: '1', fontSize: '14px' }}
                >  </CFormLabel>
              </CCol>
              <CCol sm={6} style={{ marginBottom: '30px' }}>
                <CFormCheck style={{ fontWeight: '700' }} label="Minus"
                  name='minus'
                  onChange={(e) => onItemChang(e)}
                  defaultChecked={item.minus}
                />
                <CFormLabel style={{ fontWeight: '1', fontSize: '14px' }}
                >-</CFormLabel>
              </CCol>
              <CCol sm={6} style={{ marginBottom: '30px' }}>
                <CFormCheck style={{ fontWeight: '700' }} label="UnderLine"
                  name='underLine'
                  onChange={(e) => onItemChang(e)}
                  defaultChecked={item.underLine}
                />
                <CFormLabel style={{ fontWeight: '1', fontSize: '14px' }}
                >_</CFormLabel>
              </CCol>
              <CCol sm={6} style={{ marginBottom: '30px' }}>
                <CFormCheck style={{ fontWeight: '700' }} label="Special"
                  name='special'
                  onChange={(e) => onItemChang(e)}
                  defaultChecked={item.special}
                />
                <CFormLabel style={{ fontWeight: '1', fontSize: '14px' }}
                >!, @, #, ...</CFormLabel>
              </CCol>
              <CCol sm={6} style={{ marginBottom: '30px' }}>
                <CFormCheck style={{ fontWeight: '700' }} label="Breckets"
                  name='brackets'
                  onChange={(e) => onItemChang(e)}
                  defaultChecked={item.brackets}
                />
                <CFormLabel style={{ fontWeight: '1', fontSize: '14px' }}
                > &#123; , [ , ( , ...</CFormLabel>
              </CCol>
            </CRow>

          </CCallout>
        </CCol>
        <CCol sm={12}>
          <CFormLabel htmlFor="basic-url">Password Example</CFormLabel>
          <CInputGroup className="mb-3">
            <CFormInput id="basic-url" aria-describedby="basic-addon3" disabled value={passExample} />
          </CInputGroup>


        </CCol>


      </CRow>
    </>
  )
}

export default PasswordOptions
