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
    CFormTextarea,

} from '@coreui/react'
import { cilPlus, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import useAuth from "../../../hooks/useAuth";
import axios from '../../../axios';
import { COLORS } from '../../../consts';
const Datenschutz = () => {
    const section = 'datenschutz';
    const { auth } = useAuth();
    const [colors2] = useState(COLORS);
    const [items, setItems] = useState([]);

    const [visible, setVisible] = useState(false)


    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

    const [titleValid, setTitleValid] = useState(false)
    const [desValid, setDesValid] = useState(false)




    useEffect(() => {
        fetchData(0);
    }, []);
    useEffect(() => {
        if (title && title.length > 0)
            setTitleValid(true)
        else setTitleValid(false)
    }, [title]);
    useEffect(() => {
        if (description && description.length > 0)
            setDesValid(true)
        else setDesValid(false)
    }, [description]);

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
        setDescription('');
        setTitleValid(false);
        setDesValid(false);
        setVisible(true);

    }
    const submit = async () => {
        setVisible(false);
        const formData = new FormData();
        formData.append(`title`, title);
        formData.append(`description`, description);
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
                    'Content-Type': 'application/json',
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
                            <CInputGroupText >Description</CInputGroupText>
                            <CFormTextarea value={description}
                                onChange={(e) => setDescription(e.target.value)} />
                        </CInputGroup>


                    </CForm>
                </CModalBody>
                <CModalFooter style={{ justifyContent: 'space-between' }}>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>
                    <CButton color="primary"
                        disabled={!titleValid || !desValid}
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
                                    <h3 style={{ color: colors2[0] }}>Impressum Items</h3>
                                </CCardHeader>
                                <CCardBody>

                                    <CTable striped responsive>
                                        <CTableHead>
                                            <CTableRow>
                                                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                                <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                                                <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                                                <CTableHeaderCell scope="col"></CTableHeaderCell>
                                            </CTableRow>
                                        </CTableHead>
                                        <CTableBody>


                                            {items && items.map((item, index) =>
                                                <CTableRow key={index}>
                                                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                                    <CTableDataCell>{item.title}</CTableDataCell>
                                                    <CTableDataCell>{item.description}</CTableDataCell>

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

export default Datenschutz
