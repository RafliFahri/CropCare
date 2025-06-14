"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CameraIcon, X, Trash } from "lucide-react";
const CameraComponent = ({ onClose, onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [fileImage, setfileImage] = useState(null);

  useEffect(() => {
    startWebcam();
    return () => stopWebcam();
  }, []);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setMediaStream(stream);
    } catch (error) {
      console.error("Error accessing webcam", error);
    }
  };

  const stopWebcam = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      // const imageDataUrl = canvas.toDataURL("image/png");
      // setCapturedImage(imageDataUrl);
      // onCapture(imageDataUrl || capturedImage);
      // stopWebcam();
      canvas.toBlob((blob) => {
        const file = new File([blob], 'captured-image.png', { type: 'image/png' }); 
        const reader = new FileReader();
        reader.onload = (e) => {
          setCapturedImage(e.target.result); // Simpan data URL gambar 
          setfileImage({ dataURL: e.target.result, file });
        };
        reader.readAsDataURL(file); 
      }, 'image/png'); 
      stopWebcam(); 
    }
  };

  const resetState = () => {
    startWebcam();
    setCapturedImage(null);
  };

  const handleClose = () => {
    stopWebcam();
    onClose();
    onCapture(fileImage);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="relative w-full max-w-3xl">
        <div className="relative overflow-hidden">
          {capturedImage ? (
            <>
              <img src={capturedImage} className="w-full h-full object-cover" />
              <Button onClick={resetState} className="absolute top-4 right-4 p-3 rounded-full bg-white text-black hover:bg-gray-200">
                <Trash />
              </Button>
              <Button onClick={handleClose} className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-3 rounded-full bg-green-500 text-white hover:bg-green-600">
                Predict
              </Button>
            </>)
            : (
              <>
                <video ref={videoRef} autoPlay muted
                  className="w-full h-full object-cover" />
                <canvas ref={canvasRef} className="hidden" />
                <Button onClick={handleClose} className="absolute top-4 right-4 p-3 rounded-full bg-white text-black hover:bg-gray-200">
                  <X />
                </Button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <Button onClick={captureImage} className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600">
                    <CameraIcon />
                  </Button>
                </div>
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default CameraComponent;