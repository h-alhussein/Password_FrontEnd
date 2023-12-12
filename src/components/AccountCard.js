import React, { useState, useEffect } from 'react'
import {
    CImage,
    CCallout

} from '@coreui/react'
import { cilHeart, cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import png1 from 'src/assets/brand/react.jpg'
import AddAccount from './AddAccount'
import ViewAccount from './ViewAccount'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'animate.css';
import { IMAGE_URL } from '../consts'
import axios from '../axios';
import useAuth from "../hooks/useAuth";



const AccountCard = (state) => {

    const MySwal = withReactContent(Swal)
    const { auth } = useAuth();
    const [visible, setVisible] = useState(false)
    const [viewVisible, setViewVisible] = useState(false)
    const [favColor, setFavColor] = useState('gray')

    let url = '/api/v1/accounts/';

    useEffect(() => {
        if (state.item.fav) setFavColor('lime')

    }, [])


    const delItem = () => {

        MySwal.fire({
            title: 'Are you sure?',
            text: "You will delete Account " + state.item.name + "You won't be able to revert this!",
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
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + auth?.accessToken
                        },
                    }).then((res) => {
                        state.getData();
                        MySwal.fire({
                            text: "The Account " + state.item.name + ". Deleted Successfuly.",
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

    const changFav = async () => {
        if (favColor === 'gray') setFavColor('lime')
        else setFavColor('gray')

        await axios.post(url + 'fav?id=' + state.item.id, null,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth?.accessToken
                },
            })


    }
    return (
        <>
            <AddAccount visible={visible} setVisible={setVisible}
                type={state.type} getData={state.getData}
                item={state.item} parentId={state.parentId}

            />
            <ViewAccount visible={viewVisible} setVisible={setViewVisible}
                type={state.type} getData={state.getData}
                item={state.item} parentId={state.parentId}

            />

            <CCallout color="dark" onClick={(e) => {
                setViewVisible(true)
                console.log('setViewVisible')
            }}
                style={{ display: 'grid', gridTemplateColumns: '90px auto 150px' }}>
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
                            changFav()
                            e.stopPropagation();
                        }}
                    > <CIcon size='xl' icon={cilHeart}
                        style={{ color: favColor, margin: '12px' }}

                    ></CIcon></div>
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

export default AccountCard
