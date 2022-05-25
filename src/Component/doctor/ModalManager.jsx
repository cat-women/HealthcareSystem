import React, { useState, useEffect } from 'react'
import { ModalContext, ModalProvider, ModalRoot } from 'react-multi-modal';

import LabModal from '../lab/CreateLab';
import ReportModal from '../report/CreateReport';
const axios = require('axios').default;

const MainContent = (props) => {

    const { showModal, hideModal } = React.useContext(ModalContext);
    const [loading, setLoading] = useState(false)
    const [lab, setLab] = useState(props.lab);
    const [report, setReport] = useState(props.report);

    const showLabModal = async () => {
        //console.log("lab", lab)
        showModal({
            component: LabModal,
            modalProps: {
                data: lab,
                
            },
        });

    }


    function showReportModal() {
        console.log("report to be uplaoded  ", report)
        showModal({
            component: ReportModal,
            modalProps: {
                data:report,
            },
        });
    }

    return (
        <div>
            <button className='btn btn-primary m-3' onClick={showLabModal}>Create lab report </button>
            <button className='btn btn-primary m-3' onClick={showReportModal}>Make Report</button>
            
        </div>
    );



}
export default MainContent;