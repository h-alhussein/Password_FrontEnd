import React from 'react'
import '../assets/css/login.css';
import {
    CCol,
    CButton,
    CImage
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons';

const ShowImage = (state) => {
    const removeItem = (i) => {
        console.log(i);
        state.removeItem(i);

        let x = -1;
        let deleteLi = state.images.filter(p => ++x !== i);
        state.setImages(deleteLi);

    }

    return (
        <>
            {state.images ? state.images.map((item, index) =>
                <CCol sm={6} key={index} className='mb-4'>                    
                    {item.imageId
                        ? <CImage width='150px' src={item.imageId}
                            style={{ maxHeight: '150px', width: 'auto' }} />
                        : <CImage width='150px' src={URL.createObjectURL(item.image)}
                            style={{ maxHeight: '150px', width: 'auto' }} />}
                    <CButton color='' style={{ borderRadius: "50%" }}
                        onClick={() => removeItem(index)} >
                        <CIcon icon={cilTrash} style={{ width: '100%', marginTop: '-120px', color: '#a4a3b3' }}
                        />
                    </CButton>
                </CCol>
            )
                : <></>}

        </>
    )
}


export default ShowImage