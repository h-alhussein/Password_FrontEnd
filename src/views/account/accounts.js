import React, { useState, useEffect } from 'react'
import {
  CCol,
  CRow,
  CButton,
  CInputGroup,
  CFormInput,CImage
} from '@coreui/react'
import AccountCard from '../../components/AccountCard'
import AddAccount from '../../components/AddAccount'
import { cilPlus,cilHeart } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import useAuth from "../../hooks/useAuth";
import axios from '../../axios';
import { useLocation } from 'react-router-dom';
import { IMAGE_URL } from '../../consts'
import png1 from 'src/assets/brand/react.jpg'

const Accounts = (state) => {
  const { auth } = useAuth();
  const [items, setItems] = useState([]);
  const [searchedItems, setsearchedItems] = useState([]);
  const location = useLocation();
  let parent={id:null}
  if(location.state)
   parent = location.state.parent;
 
  useEffect(() => {    
    getData();
  }, []);
  const getData = async () => {
  let url='/api/v1/accounts/'+parent.id;
  if(state.type)
  url=url='/api/v1/accounts/fav';
    try {
      const response = await axios.get(url,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth?.accessToken
          }
        }
      )
      setItems(response?.data)
      setsearchedItems(response?.data)
    } catch (err) {
      console.log(err);
    }
  }
  const search =  (txt) => {
    if(txt==='')
    setsearchedItems(items)
    else{
  let searched=items.filter(item=>item.name.toLowerCase().indexOf(txt.toLowerCase())!==-1)
  setsearchedItems(searched)
    }
  }
  const [visible, setVisible] = useState(false)

  return (
    <>
<AddAccount parentId={parent.id} visible={visible}
 setVisible={setVisible}  getData={getData}  />

      <CRow >
        <CCol md={3} style={{ marginBottom: '20px' }}>
          {parent.id&&<CButton style={{ borderRadius: "50%", background: '#112D57' }}
            onClick={(e) => { setVisible(true)}}  >
            <CIcon icon={cilPlus} size='lg'
              style={{ color: '#67F6EE' }}  />
          </CButton>}
        </CCol>
        <CCol md={9} style={{ marginBottom: '20px' }}>
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

              placeholder="search"
              autoComplete="search"
              aria-describedby="basic-addon2"
              onChange={(e)=>search(e.target.value)}
            />
          </CInputGroup >
        </CCol>
      </CRow>
      <CRow >
        <CCol >
        <div   style={{ display: 'grid', gridTemplateColumns: '90px auto' }}>
          {parent.imageId?
          <CImage src={ IMAGE_URL + parent.imageId }
                    style={{
                        width: '80px', height: '80px',
                        marginRight: '20px',
                        borderRadius: '20px'
                    }} />
                   : <CIcon size='xxl' icon={cilHeart}
                        style={{ color: 'red', margin: '12px' }}

                    ></CIcon>
                    
                    }
          <label style={{fontSize:'22px',fontWeight:'700',marginTop:'15px'}}>{parent.name?parent.name:'Favorite'}  Accounts</label>
          </div>
          {searchedItems.map((item, index) =>
            <AccountCard key={index} item={item}  parentId={parent.id} getData={getData}/>
          )}
        </CCol>
      </CRow>
    </>
  )
}

export default Accounts
