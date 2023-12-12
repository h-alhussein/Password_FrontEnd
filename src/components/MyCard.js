import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    CImage,
    CCallout

} from '@coreui/react'
import { cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import png1 from 'src/assets/brand/react.jpg'
import AddItem from './AddItem'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'animate.css';
import { IMAGE_URL } from '../consts'
import axios from '../axios';
import useAuth from "../hooks/useAuth";



const MyCard = (state) => {
    const MySwal = withReactContent(Swal)
    const { auth } = useAuth();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false)
    let url = '/api/v1/collections/';
    let msg = '. All Goups And Accounts in this Colliction Will be deleted too. ';
    let child = '/groups'
    if (state.type === 'Group') {
        url = ('/api/v1/groups/')
        msg = '. All Accounts in this Group Will be deleted too. ';
        child = '/accounts'
    }

    const delItem = () => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You will delete " + state.type + " " + state.item.name + msg + "You won't be able to revert this!",
            icon: 'question',
            iconHtml: '؟',
            position: 'top',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            background: '#4d1504',
            color: 'white',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(url + state.item.id,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': 'Bearer ' + auth?.accessToken
                        },
                    }).then((res) => {
                        state.getData();
                        MySwal.fire({
                            text: "The " + state.type + " " + state.item.name + ". Deleted Successfuly.",
                            showConfirmButton: false,
                            position: 'top',
                            timer: 5000,
                            background: '#153e03',
                            color: 'white',
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        })
                    })
            }
        })
    }



    return (
        <>
            <AddItem visible={visible} setVisible={setVisible}
                type={state.type} getData={state.getData}
                item={state.item} parentId={state.parentId}

            ></AddItem>

            <CCallout color="dark" onClick={(e) => {
                navigate(child, { state: { parent: state.item } })
            }}
                style={{ display: 'grid', gridTemplateColumns: '90px auto 100px' }}>
                <CImage src={state.item.imageId ? IMAGE_URL + state.item.imageId : png1}
                    style={{
                        width: '80px', height: '80px',
                        marginRight: '20px',
                        borderRadius: '20px'
                    }} />

                <div style={{ margin: 'auto', marginLeft: '0' }}
                >{state.item.name ? state.item.name : "Empty Name"}</div>
                <div style={{ display: 'flex', paddingLeft: '10px' }}>
                    <div className='div1'
                        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                        onClick={(e) => {
                            setVisible(true)
                            e.stopPropagation();
                        }}
                    > <CIcon size='xl' icon={cilPencil}
                        style={{ color: '#67F6EE', margin: '12px' }}

                    ></CIcon></div>
                    <div className='div1'
                        style={{
                            width: '50px', height: '50px',
                            borderRadius: '50%',

                        }}
                        onClick={(e) => {
                            delItem();
                            e.stopPropagation();
                        }}
                    >
                        <CIcon size='xl' icon={cilTrash}
                            style={{ color: 'red', margin: '12px' }}
                        ></CIcon>
                    </div></div>
            </CCallout>
        </>
    )
}

export default MyCard
