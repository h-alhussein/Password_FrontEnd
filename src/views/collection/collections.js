import React, { useState, useEffect } from 'react'
import {
  CCol,
  CRow,
  CButton,
  CInputGroup,
  CFormInput,CImage
} from '@coreui/react'
import MyCard from '../../components/MyCard'
import { cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import useAuth from "../../hooks/useAuth";
import axios from '../../axios';
import { IMAGE_URL } from '../../consts'
import AddItem from '../../components/AddItem'
import png1 from 'src/assets/brand/react.jpg'
const Collections = (state) => {
  const { auth } = useAuth();
  const [items, setItems] = useState([]);
  const [searchedItems, setsearchedItems] = useState([]);
  let type = 'Collection';
  let parentId = '';
  let parentName = '';

  if(state.type)
  type=(state.type)
  if(state.parent){
  parentId='/'+(state.parent.id)
  parentName=(state.parent.name)
 }
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
  let url='/api/v1/'+type.toLocaleLowerCase()+'s'+parentId;
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
  //search('')
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
<AddItem  visible={visible} setVisible={setVisible}
 type={type} getData={getData} action='Add'
collectionId={parentId.replace('/','')}

></AddItem>

      <CRow >
        <CCol md={3} style={{ marginBottom: '20px' }}>
          <CButton style={{ borderRadius: "50%", background: '#112D57' }}
            onClick={(e) => { setVisible(true)}}  >
            <CIcon icon={cilPlus} size='lg'
              style={{ color: '#67F6EE' }}  />
          </CButton>
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
         {state.parent&& <CImage src={state.parent ? IMAGE_URL + state.parent.imageId : png1}
                    style={{
                        width: '80px', height: '80px',
                        marginRight: '20px',
                        borderRadius: '20px'
                    }} />}
          <label style={{fontSize:'28px',fontWeight:'700',marginTop:'15px'}}>{parentName+' '+type+'s'}</label>
          </div>
          {searchedItems.map((item, index) =>
            <MyCard key={index} item={item} type={type} getData={getData} 
            parent={state.parent}></MyCard>
          )}
        </CCol>
      </CRow>
    </>
  )
}

export default Collections
