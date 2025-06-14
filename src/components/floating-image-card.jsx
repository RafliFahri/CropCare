"use client";

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Camera, X, AlertCircle, Leaf, Trash2 } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import CameraComponent from "@/components/camera-component";

const FloatingImageCard = ({ onClose, imageResult, predictionResult }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isCameraShow, setIsCameraShow] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // setSelectedImage(e.target.result)
        setSelectedImage({ dataURL: e.target.result, file });
        console.log(file);
        setShowWarning(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraUse = () => {
    setIsCameraShow(true);
  };

  const handleCapture = (image) => {
    setSelectedImage(image);
    setIsCameraShow(false);
    setShowWarning(false);
  };

  // Tambah Loading Effect setelah hasil keluar tutup card
  const handleDeteksi = async () => {
    if (!selectedImage || !selectedPlant) {
      setShowWarning(true);
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage.file); // Kirim file asli
    formData.append("type", selectedPlant.toLowerCase());

    try {
      const response = await fetch('/api', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Prediction API error');
      }

      const result = await response.json();
      console.log(result);
      imageResult(selectedImage.dataURL);
      predictionResult(result);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlantSelection = (plant) => {
    setSelectedPlant(plant);
    setShowWarning(false);
  };

  const handleDeleteImage = () => {
    setSelectedImage(null)
    setShowWarning(false)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[51]">
      <Card className="w-80 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        <CardContent className="p-6">
          {selectedImage ? (
            <div className="relative mb-4">
              <img
                src={selectedImage.dataURL}
                alt="Uploaded"
                className="w-full h-40 object-cover rounded"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleDeleteImage}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="w-full h-40 bg-gray-100 rounded mb-4 flex items-center justify-center">
              <p className="text-gray-500">Tidak ada gambar yang diupload</p>
            </div>
          )}
          <h2 className="text-lg font-semibold text-center mb-4">
            Bagaimana Anda ingin mendeteksi tanaman Anda?
          </h2>
          <div className="space-y-3">
            <div className="flex space-x-2">
              <Button
                variant={selectedPlant === 'Singkong' ? 'default' : 'outline'}
                // className="w-1/2"
                className={ `w-1/2 ${selectedPlant === "Singkong" ? "bg-green-500 hover:bg-green-600 text-white" : "" }` }
                onClick={() => handlePlantSelection('Singkong')}
              >
                <Leaf className="mr-2 h-4 w-4" /> Singkong
              </Button>
              <Button
                variant={selectedPlant === 'Jagung' ? 'default' : 'outline'}
                // className="w-1/2"
                className={ `w-1/2 ${selectedPlant === "Jagung" ? "bg-green-500 hover:bg-green-600 text-white" : ""}` }
                onClick={() => handlePlantSelection('Jagung')}
              >
                <Leaf className="mr-2 h-4 w-4" /> Jagung
              </Button>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => document.getElementById('fileInput').click()}
            >
              <Upload className="mr-2 h-4 w-4" /> Upload Image
            </Button>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <Button
              variant="outline"
              className="w-full"
              onClick={handleCameraUse}
            >
              <Camera className="mr-2 h-4 w-4" /> Use Camera
            </Button>
            <Button variant="default" className="w-full" onClick={handleDeteksi}>
              Deteksi
            </Button>
          </div>
          {showWarning && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {!selectedPlant
                  ? "Silakan pilih jenis tanaman terlebih dahulu."
                  : "Silakan unggah gambar terlebih dahulu sebelum mendeteksi."}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
      {isCameraShow && <CameraComponent onClose={() => setIsCameraShow(false)} onCapture={handleCapture} />}
    </div>
  );
};

export default FloatingImageCard;