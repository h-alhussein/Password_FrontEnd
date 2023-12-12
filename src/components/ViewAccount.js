import React, {  } from 'react'
import {
  CImage,
  CButton,
  CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
  CInputGroup} from '@coreui/react'
import png1 from 'src/assets/images/p1.jpg'
import 'animate.css';
import { IMAGE_URL } from "../consts";
import InputText from "./inputText";
import ViewAccountAttr from "./ViewAccountAttr";
const ViewAccount = (state) => {

  return (
    <>
      <CModal
        backdrop="static"
        visible={state.visible}
        onClose={() => { state.setVisible(false); }}
        style={{ color: 'white', background: 'rgb(39, 43, 96)' }}
      >
        <CModalHeader >
          <CModalTitle >{'Account ' + state.item.name}</CModalTitle>
        </CModalHeader>
        <CModalBody >
          <CInputGroup className="mb-3"
            style={{ justifyContent: 'center' }}
          >

            <CImage width='80px' src={state.item && state.item.imageId ?
              IMAGE_URL + state.item.imageId : png1}
              style={{ maxHeight: '80px', width: 'auto', borderRadius: '12px', }} />

          </CInputGroup>

          <InputText title='Account Name' value={state.item.name} view={true} />
          <ViewAccountAttr title='Username' value={state.item.username} />
          <ViewAccountAttr title='Paddword' value={state.item.password} />
          <ViewAccountAttr title='Website' value={state.item.website} />



          <InputText title='Notes' value={state.item.notes} view={true} />



        </CModalBody>
        <CModalFooter>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <CButton color="secondary" onClick={() => { state.setVisible(false); }}>
              Close
            </CButton>
          </div>
        </CModalFooter>
      </CModal>
    </>)
}

export default ViewAccount
