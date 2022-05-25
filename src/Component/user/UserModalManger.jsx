import React, { useState, useEffect } from 'react';
import { ModalContext, ModalProvider, ModalRoot } from 'react-multi-modal';

import LabModal from '../lab/CreateLab';


const axios = require('axios').default;

const MainContent = (props) => {

    const { showModal, hideModal } = React.useContext(ModalContext);
    const [lab, setLab] = useState(props.lab);

    const showLabModal = async () => {
        //console.log("lab", lab)
        showModal({
            component: LabModal,
            modalProps: {
                data: lab,
            },
        });

    }

    function handleDelete(id) {
        var retVal = window.confirm("Do you want to Delete ?");
        if (retVal == true) {

            axios.delete(`lab/?id=${id}`)
                .then(res => {
                    // console.log("delete response",res);
                    if (res.status == 200) {
                        alert(res.data);
                        //alert("data deleted ");
                        //window.location.reload();
                        props.setLab({})
                    }
                })
        } else {
            return
        }
    }
    useEffect(() => {

    }, [lab])
    return (
        <div>
            <button className='btn btn-primary m-3' onClick={showLabModal}>Update </button>
            <button className='btn btn-danger' onClick={(e) => handleDelete(lab.id)} >Delete</button>
        </div>
    );



}
export default MainContent;