import React, { useState, useEffect } from 'react'
import '../../../assets/css/login.css';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CInputGroupText,
  CInputGroup,
  CFormInput,

} from '@coreui/react'
import { cilPlus, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import useAuth from "../../../hooks/useAuth";
import axios from '../../../axios';
import { COLORS, formatDate } from '../../../consts';
const Termine = () => {
  const section = 'termine';
  const { auth } = useAuth();
  const [colors2] = useState(COLORS);
  const [items, setItems] = useState([]);

  const [visible, setVisible] = useState(false)


  const [title, setTitle] = useState();
  const [v1, setV1] = useState();
  const [v2, setV2] = useState();
  const [v3, setV3] = useState();
  const [v4, setV4] = useState();

  const [titleValid, setTitleValid] = useState(false)





  useEffect(() => {
    fetchData(0);
  }, []);
  useEffect(() => {
    if (title && title.length > 0)
      setTitleValid(true)
    else setTitleValid(false)
  }, [title]);


  const fetchData = async () => {
    setItems([]);
    try {
      const response = await axios.get('/api/v1/items/' + section,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth?.accessToken
          }
        }
      )
      setItems(response?.data)
    } catch (err) {
      console.log(err);
    }
  }
  const openModal = () => {
    setTitle('');
    setV1();
    setV2();
    setV3();
    setV4();
    setTitleValid(false);
    setVisible(true);

  }
  const submit = async () => {
    setVisible(false);

    const formData = new FormData();
    formData.append(`title`, title);
    if (v1) formData.append(`values[0]`, formatDate(v1));
    if (v2) formData.append(`values[1]`, formatDate(v2));
    if (v3) formData.append(`values[2]`, formatDate(v3));
    if (v4) formData.append(`values[3]`, formatDate(v4));
    formData.append(`section`, section);


    const response = await axios.post('/api/v1/items',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + auth?.accessToken
        },
      });
    fetchData();
  }
  const removeItem = async (id) => {

    const response = await axios.delete('/api/v1/items/' + id,

      {
        headers: {
          'Authorization': 'Bearer ' + auth?.accessToken
        },
      });
    fetchData();
  }
  return (
    <>
      <CModal backdrop='static' visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>New Item</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CInputGroup className="mb-4">
              <CInputGroupText >Title</CInputGroupText>
              <CFormInput value={title}
                onChange={(e) => setTitle(e.target.value)} />
            </CInputGroup>
            <CInputGroup className="mb-4">
              <CInputGroupText >Date-1</CInputGroupText>
              <input value={v1} type='datetime-local'
                onChange={(e) => setV1(e.target.value)} />
            </CInputGroup>
            <CInputGroup className="mb-4">
              <CInputGroupText >Date-2</CInputGroupText>
              <input value={v2} type='datetime-local'
                onChange={(e) => setV2(e.target.value)} />
            </CInputGroup>
            <CInputGroup className="mb-4">
              <CInputGroupText >Date-3</CInputGroupText>
              <input value={v3} type='datetime-local'
                onChange={(e) => setV3(e.target.value)} />
            </CInputGroup>
            <CInputGroup className="mb-4">
              <CInputGroupText >Date-4</CInputGroupText>
              <input value={v4} type='datetime-local'
                onChange={(e) => setV4(e.target.value)} />
            </CInputGroup>
          </CForm>
        </CModalBody>
        <CModalFooter style={{ justifyContent: 'space-between' }}>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary"
            disabled={!titleValid}
            onClick={() => { submit() }}
          >Save  </CButton>
        </CModalFooter>
      </CModal>



      <CRow>
        <CCol md={4}>
          <CCard className="mb-4 text-center " style={{ width: 'fit-content' }}>
            <CCardHeader>
              <CButton color='primary' style={{ borderRadius: "50%" }}
                onClick={(e) => { openModal() }}
              >
                <CIcon icon={cilPlus} />

              </CButton>
            </CCardHeader>
          </CCard>

        </CCol>

        {items
          ? <>
            <CCol xs={12}>
              <CCard className="mb-4 text-center">
                <CCardHeader>
                  <h3 style={{ color: colors2[0] }}>Termine Items</h3>
                </CCardHeader>
                <CCardBody>

                  <CTable striped responsive>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Month</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Date-1</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Date-2</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Date-3</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Date-4</CTableHeaderCell>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>


                      {items && items.map((item, index) =>
                        <CTableRow key={index}>
                          <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                          <CTableDataCell>{item.title}</CTableDataCell>

                          <CTableDataCell >{item.values[0]}</CTableDataCell>
                          <CTableDataCell >{item.values[1]}</CTableDataCell>
                          <CTableDataCell >{item.values[2]}</CTableDataCell>
                          <CTableDataCell >{item.values[3]}</CTableDataCell>

                          <CTableDataCell scope="col"><CButton color=''
                            onClick={(e) => { removeItem(item.id) }}
                          > <CIcon className="text-warning" icon={cilTrash} /></CButton></CTableDataCell>
                        </CTableRow>)}

                    </CTableBody>
                  </CTable>

                </CCardBody>
              </CCard>
            </CCol></> : <>
            <CRow>
              <CCol md={6}>
                <CCard className="mb-4 text-center " style={{ width: 'fit-content' }}>
                  <CCardHeader>
                    <h3 style={{ color: 'red' }} >
                      Oops.. Sorry There is no data.
                    </h3>
                  </CCardHeader>
                </CCard>

              </CCol>
            </CRow>
          </>}

      </CRow>

    </>
  )
}


export default Termine
