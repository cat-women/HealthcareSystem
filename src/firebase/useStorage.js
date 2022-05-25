import { useState, useEffect } from "react";
import { storage } from "./config";

const useStorage = (file) => {

    const [progress, setProress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);


    useEffect(() => {
        const storageRef = storage.ref(`images/${file.name}`);
        storageRef.put(file)
            .on('state-changed', (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProress(progress);
            }, (err) => {
                setError(err);  
            }, async () => {
                const url = await storageRef.getDownloadURL();
                setUrl(url);
            });
    }, [file]);
    return { progress, url, error };

}

export default useStorage;