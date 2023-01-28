import React, { useState, useRef } from 'react';
import { useEffect } from 'react';

export const Camera = () => {
    const cameraRef = useRef(null);
    const [permission, setPermission] = useState(null);
    const [imgUrl, setImgUrl] = useState(null);

    useEffect(() => {
        navigator.permissions.query({ name: "camera" }).then((permissionStatus) => {
            console.log("permissionStatus", permissionStatus); 
            setPermission(permissionStatus.state); // NOTE: Can have 3 states: prompt, denied, granted
            // sample obj 
            // name: "video_capture"
            // onchange: null
            // state: "denied"
        })
    
        navigator.mediaDevices
            .getUserMedia({
                video : true
            })
            .then((stream) => {
                cameraRef.current.srcObject = stream;
                cameraRef.current.play();
            })
    }, [])

    const captureImage = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = cameraRef.current.videoWidth;
        canvas.height = cameraRef.current.videoHeight;

        // draw the video frame to the canvas
        context.drawImage(cameraRef.current, 0, 0, canvas.width, canvas.height);

        // get the image data URL
        const imageDataUrl = canvas.toDataURL("image/png");
        setImgUrl(imageDataUrl);
    }

  return (
    <div>
        {!imgUrl ?(
            permission === "granted" ? (
                <video ref={cameraRef} onClick={captureImage} />
            ): (<h2>Camera permission denied</h2>)
        ) : (
            <img src={imgUrl} alt="Captured pic" />
        )}
    </div>
  )
}
