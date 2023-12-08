import './App.css';
import imageFile from './img/pug.jpg'
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import {useEffect, useRef, useState} from "react";
import {pixelit} from "./pixelit";
const App = () => {


  const cropperRef = useRef(null);
  const [croppedImage, setCroppedImage] = useState(undefined)
  const croppedImageRef = useRef(undefined)
  const onCrop = () => {
    // const cropper = cropperRef.current?.cropper;
    // console.log(cropper.getCroppedCanvas().toDataURL("image/png"));
  };

  return <>
    <Cropper
        src="https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
        style={{ height: 400, width: "100%" }}
        // Cropper.js options
        initialAspectRatio={16 / 9}
        guides={false}
        crop={onCrop}
        ref={cropperRef}
    />

    <div>
      <button onClick={() => {
      const cropped = cropperRef.current?.cropper.getCroppedCanvas().toDataURL("image/png")
      setCroppedImage(cropped)
    }}>crop</button>
      <button onClick={() => {
        console.log("12", croppedImage.current)
        const config = {
          from : croppedImageRef.current,
          //defaults to document.getElementById("pixelitimg")
          scale : 15,
          //from 0-50, defaults to 8
          palette : [[255,255,255], [0,0, 0], [54,53, 53], [140,140, 140], [224,224, 224]],
          //defaults to a fixed pallete
          maxHeight: 30,
          //defaults to null
          maxWidth: 30,
          //defaults to null
        }

        const px = new pixelit(config)
        px.draw().pixelate().convertPalette()
      }}>show pixelated</button></div>

    {croppedImage !== undefined &&
        <div>
          <div className="croppedImageWrapper"><img className="croppedImage" ref={croppedImageRef} src={croppedImage} alt="Red dot" /></div>
          <div>
            <canvas id="pixelitcanvas"></canvas>
          </div>
        </div>



    }

  </>

}

export default App