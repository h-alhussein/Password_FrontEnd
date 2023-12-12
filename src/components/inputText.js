import React, {  } from 'react'
import {
  
  CInputGroup, CFormInput
} from '@coreui/react'
import 'animate.css';

const InputText = (state) => {




  return (
    <>
      
          <h5 style={{
            fontFamily: "bebas_neue",
            color: 'white',
            margin: '30px 0 0 65px'
          }}>{state.title}</h5>
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

              disabled={state.view}
              aria-describedby="basic-addon2"
              value={state.value}
              onChange={(e) => { state.setValue(e.target.value) }}
            />
          </CInputGroup >



    </>)
}

export default InputText
