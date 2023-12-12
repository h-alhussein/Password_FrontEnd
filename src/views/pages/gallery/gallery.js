import React, { useState, useEffect } from 'react'
import axios from '../../../axios';
import '../../../assets/css/login.css';
import useAuth from "../../../hooks/useAuth";
import {
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CRow,

} from '@coreui/react'


import { cilPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react'
import ShowImage from '../../../components/image';
const Gallery = () => {
    const section = 'gallery';
    const { auth } = useAuth();
    const [images, setImages] = useState([]);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        try {
            const response = await axios.get('/api/v1/items/' + section,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth?.accessToken
                    }
                });
            setImages(response.data)
        } catch (err) {
            console.log(err)
        }
    };

    const submit = async (img) => {
        const formData = new FormData();
        formData.append(`section`, section);
        formData.append(`image.file`, img);
        const response = await axios.post('/api/v1/items',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + auth?.accessToken
                },
            });

    }
    const removeItem = async (i) => {
        var id = '';
        images.map((item, index) => {
            if (i === index) id = item.id;
        })
        const response = await axios.delete('/api/v1/items/' + id,

            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth?.accessToken
                },
            });

    }
    return (

        <CContainer>
            <CRow className="justify-content-center ">
                <CCol md={11} lg={9} xl={7} className='mb-4' style={{ borderRadius: "50%" }}>
                    <CCard >
                        <CCardBody className='text-center'>
                            <h4 >Gallery</h4>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol md={11} lg={9} xl={7}>

                    <CRow>
                        <CCard style={{ borderRadius: "5%" }}>
                            <CCardBody >
                                <CRow>
                                    <ShowImage images={images} setImages={setImages}
                                        removeItem={removeItem} />
                                </CRow>
                                <CForm className='mt-5'>

                                    <input type="file" id="actual-btn" hidden
                                        onChange={(e) => {
                                            if (e.target.files[0]) {
                                                let x = new File([e.target.files[0]], e.target.value);
                                                setImages(current => [...current, { 'image': x }]);
                                                submit(x)
                                                e.target.value = null;
                                            }
                                        }}
                                    />
                                    <label htmlFor="actual-btn"
                                        style={{
                                            borderRadius: "50%", background: '#321fdb',
                                            height: '42px', width: '42px'
                                        }}
                                    ><CIcon icon={cilPlus} style={{ marginTop: '12px', color: '#dad8ef' }} /></label>

                                </CForm>
                            </CCardBody>

                        </CCard>
                    </CRow>

                </CCol>


            </CRow>
        </CContainer>

    )
}


export default Gallery