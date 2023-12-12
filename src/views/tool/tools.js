

import React, { lazy, useEffect, useRef, useState } from 'react'
import {
  CCol,
  CRow,
  CInputGroup,
  CFormInput, CCallout, CInputGroupText, CFormLabel, CFormCheck, CButton,cilList, cilShieldAlt, CFormSelect, CForm
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilCloudDownload, cilCloudUpload } from '@coreui/icons'
import axios from 'src/axios'
import useAuth from 'src/hooks/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const Tools = () => {


  const { auth } = useAuth();
  const [groups, setGroups] = useState();
  const [groupID,setGroupID] = useState();
  const [collections, setCollections] = useState();
  const [collectionID,setCollectionID] = useState();
  const [exportError,setExportError]=useState();
  const [importError,setImportError]=useState();

  const MySwal = withReactContent(Swal)

  const [file,setFile]=useState(null);
  useEffect(() => {
  getGroups();
  getCollections();
  }, []);
  
  const getGroups = async () => {
    try {
      const response = await axios.get('/api/v1/collections/groups',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth?.accessToken
          }
        }
      )
      setGroups(response?.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getCollections = async () => {
    
    try {
      const response = await axios.get('/api/v1/collections',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth?.accessToken
          }
        }
      )
      setCollections(response?.data)
    } catch (err) {
      console.log(err)
    }
  }

  const collectionSubmit = async () => {
    
    setExportError(null)
    try {
      const response = await axios.get('/api/v1/accounts/csvexport/'+collectionID,
        {
          headers: {
            
            'Authorization': 'Bearer ' + auth?.accessToken,
            
          },responseType: 'blob',
        }
      )
      .then((obj)=>{
        console.log(obj)
        const url = URL.createObjectURL(obj.data);
        const a = document.createElement("a");
        a.href=url;
        a.download="export"+new Date().getTime()+".xlsx";
        a.style.display="none";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      })
      MySwal.fire({
        html: '<small style=\'font-size:18px  \'><strong>successfuly export</strong> .</small>',
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
    } catch (err) {
      setExportError("There is a Error, Please Try again later");
      setExportError(err.response.data);
    }
  }

  const groupSubmit = async () => {
    setImportError(null);
    
    const formData = new FormData();
      formData.append(`file`,file);   
    try {
    
   
      
  
      const response = await axios.post("/api/v1/accounts/"+ groupID,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + auth?.accessToken
          },
        });
        MySwal.fire({
          html: '<small style=\'font-size:18px  \'><strong>successfuly Import</strong> .</small>',
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
      }catch(err){
        setImportError("There is a Error");
        setImportError(err.response.data);
      }

      }
     


    return (      
            <CRow>
                  <CRow >
        <CCol>
          <CCallout color="dark" style={{ background: '#404040' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><h3 style={{ fontFamily: 'goblin' }}>Export your Accounts</h3>
              <p style={{ fontFamily: 'abee' }}>Here you can Export your Accounts to CSV-File</p></div>


            
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CFormSelect aria-label="Default select example"
                  className='input'
                  onChange={(e) => setCollectionID(e.target.value)}
                >
                  <option
                    style={{ color: 'white' }}
                    key='0' value='0' hidden>Select a Collection</option>
                  {collections?.map((item) =>
                    <option
                      style={{ color: 'white' }}
                      key={item.id} value={item.id}>{item.name}</option>  ) }
                </CFormSelect>
                <br />
                {exportError&&
              <p  style={{ color: 'red',fontSize:"18px", }}>{exportError}</p>
            }
                <br />      
              <CButton color="success"size="lg" onClick={(event) => {collectionSubmit()
            }} >  
              <CIcon style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} icon={cilCloudDownload} size="3xl"  />
              </CButton></div>
            
          </CCallout>
        </CCol>
        <CRow></CRow>
        <br/><br/>
        <br/><br/>

        <CCol>
          <CCallout color="dark" style={{ background: '#404040' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><h3 style={{ fontFamily: 'goblin' }}>import new Accounts</h3>
              <p style={{ fontFamily: 'abee' }}>Here you can Import  Accounts from CSV-File</p></div>
              
            
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CFormSelect aria-label="Default select example"
                  className='input'
                  onChange={(e) => setGroupID(e.target.value)}
                >
                  <option
                    style={{ color: 'white' }}
                    key='0' value='0' hidden>Select a Group</option>
                  {groups?.map((item) =>
                    <option
                      style={{ color: 'white' }}
                      key={item.id} value={item.id}>{item.name}</option>
                  )

                  }
                </CFormSelect>
                <br />
                {importError&&
              <p  style={{ color: 'red',fontSize:"18px", }}>{importError}</p>
            }
                <br />
                <CFormInput type='file'onChange={(event) => {
                  
                  setFile(event.target.files[0]);
                  
                  
                  }}/>
              
                  <br />
                <br />
            
              <CButton color="success"size="lg" onClick={(event) => {
              groupSubmit()}} >
                
              
              <CIcon style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} icon={cilCloudUpload} size="3xl"  />
              </CButton></div>

          </CCallout>
        </CCol>
                  </CRow>
            
          
      
            </CRow>
    )
    
}

export default Tools
