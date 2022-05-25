import React, { useState, useEffect } from 'react';
import { ModalContext, ModalProvider, ModalRoot } from 'react-multi-modal';

import ReportModal from './CreateReport';
const axios = require('axios').default;

const ReportModalManager = (props) => {
    const { showModal, hideModal } = React.useContext(ModalContext);
    const [report, setReport] = useState(props.report);

    const showReportModal = async () => {
        //console.log("lab", lab)
        showModal({
            component: ReportModal,
            modalProps: {
                data: report,
            },
        });

    }
    console.log("the report from userreprot to reportmodal is ",report)

    function handleDelete(id) {
        var retVal = window.confirm("Do you want to Delete ?");
        if (retVal == true) {
            axios.delete(`report/?id=${id}`)
                .then(res => {
                    // console.log("delete response",res);
                    if (res.status == 200) {
                        alert(res.data);
                        props.setReport({})
                    }
                })
        } else {
            return
        }
    }
    useEffect(() => {

    }, [report])
    return (
        <div>
            <button className='btn btn-primary m-3' onClick={showReportModal}>Update </button>
            <button className='btn btn-danger' onClick={(e) => handleDelete(report.id)} >Delete</button>
        </div>
    );



}
export default ReportModalManager;