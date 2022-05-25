import React, { useEffect } from "react";
import firebase from 'firebase/app';
import 'firebase/storage';
import useStorage from '../../firebase/useStorage';

const ProgressBar = ({ file, setFile, sendUrl }) => {
    const { progress, url, error } = useStorage(file);
    const elementRef = React.createRef();
   // console.log(progress, url);

    useEffect(() => {
        if(url){
            setFile(null);
        }
        if (progress === 100) {
            sendUrl(url);
        } else
            sendUrl("");
    }, [progress,setFile,url])
    return (
        <div className="progress-bar bg-success m-3" role="progressbar"
            style={{ width: progress + '%' }}
            aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"
        >{Math.round(progress)} % complete</div>
    )
}
export default ProgressBar;