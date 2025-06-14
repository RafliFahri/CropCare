"use client";

// import Image from "next/image";
import { useState, useEffect } from "react";
import FloatingImageCard from "@/components/floating-image-card";
import { Button } from "@/components/ui/button";
import { DetectionResult } from '@/components/detection-result'
// Import AOS library
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS styles

export default function Home() {
  const [showCard, setShowCard] = useState(false);
  // const [showDetectionResult, setShowDetectionResult] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);

  useEffect(() => {
    // Initialize AOS when the component mounts
    AOS.init({
      duration: 1000, // Animation duration
      easing: 'ease-out', // Easing function
      once: true, // Animation happens once
    });
  }, []);

  // useEffect(()=>{
  //   console.log(predictionResult);
  // }, [predictionResult]);

  return (
    <div className="min-h-screen bg-[#f5f8f5]">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-3">
          <img
            src="../assets/user/img/logo.png"
            alt="Crop-Care Logo"
            className="h-10 w-auto ml-6"
          />
          <span className="text-2xl font-bold text-gray-700 ml-6">Crop-Care</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1
              className="text-4xl md:text-5xl font-bold tracking-tight ml-7"
              data-aos="fade-up" // Add AOS attribute for animation
            >
              Crop-Care
            </h1>
            <p
              className="text-base md:text-xl text-gray-600 leading-relaxed max-w-xl ml-7"
              data-aos="fade-up" // Add AOS attribute for animation
            >
              An AI-based plant disease detection application that helps farmers identify diseases
              quickly and accurately through leaf images, supporting early prevention and increasing
              crop yields.
            </p>

            <Button
              onClick={() => setShowCard(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 md:px-8 md:py-6 text-sm md:text-lg rounded-full ml-7"
              data-aos="fade-up" // Add AOS attribute for animation
            >
              Predict
            </Button>
          </div>
          <div className="hidden lg:block relative" data-aos="fade-left"> {/* Add AOS attribute for animation */}
            <div className="absolute inset-0 bg-green-600/10 rounded-full blur-3xl"></div>
            <img
              src="assets/user/img/bg1.png"
              alt="Crop-Care Hero"
              className="relative w-full max-w-[300px] md:max-w-[400px] mx-auto"
            />
          </div>
        </div>
        <div className="flex flex-center mt-10">
          {selectedImage && predictionResult && <DetectionResult imageUrl={selectedImage} isHealthy={predictionResult.isSehat}
            disease={predictionResult.penyakit} treatment={predictionResult.saran}
          />}
        </div>
        {/* Who We Are Section */}
        <section className="mt-16 bg-white py-12 md:py-16 shadow-md">
          <div className="px-4 md:px-16">
            <h2
              className="text-sm font-semibold text-gray-500 mb-2"
              data-aos="fade-up" // Add AOS attribute for animation
            >
              WHO WE ARE
            </h2>
            <h3
              className="text-2xl md:text-3xl font-bold tracking-tight mb-6"
              data-aos="fade-up" // Add AOS attribute for animation
            >
              Unleashing Potential with Creative Strategy
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Left Text Content */}
              <div className="space-y-6" data-aos="fade-up"> {/* Add AOS attribute for animation */}
                <p className="text-gray-600 leading-relaxed">
                  Plant diseases pose a serious challenge to global food security, often causing
                  reduced crop yields and financial losses for farmers. Traditional diagnosis,
                  which relies on expert visual inspection, is often slow and prone to errors.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Machine learning, especially deep learning, now offers a solution by detecting
                  patterns and symptoms of plant diseases through extensive image datasets. This
                  technology enables farmers to monitor crops quickly and accurately, helping to
                  prevent outbreaks at an early stage. As a result, crop yields can be improved,
                  supporting global food security amid growing challenges.
                </p>
              </div>
              {/* Right Image Content */}
              <div className="grid grid-cols-2 gap-4" data-aos="fade-up"> {/* Add AOS attribute for animation */}
                <img
                  src="../assets/user/img/about1.png"
                  alt="Cassava"
                  className="w-full rounded-lg object-cover"
                />
                <img
                  src="../assets/user/img/about2.png"
                  alt="QR Scanning"
                  className="w-full rounded-lg object-cover"
                />
                <img
                  src="../assets/user/img/about3.png"
                  alt="Corn"
                  className="w-full rounded-lg object-cover mt-[-4rem] md:mt-[-15rem]"
                  style={{ gridColumn: "2", gridRow: "2" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-16">
          <h2 className="text-xl md:text-2xl font-semibold text-green-600 mb-8 text-center" data-aos="fade-up">
            Check Our <span className="font-bold">Features</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-aos="fade-up">
            <div className="flex justify-center">
              <img src="../assets/user/img/features.png" alt="Feature Image" className="w-3/4 md:w-full rounded-lg" />
            </div>
            <div className="space-y-4" data-aos="fade-up">
              {["Increase in crop yields", "Early detection", "Epidemic prevention", "Support for global food security"].map(
                (feature, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="bg-green-600 text-white p-3 md:p-4 rounded-full">✓</div>
                    <p className="text-sm md:text-lg">{feature}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-16 bg-white py-12 md:py-16 shadow-md">
          <h2 className="text-3xl font-bold text-center mb-8" data-aos="fade-up"> {/* Add AOS attribute for animation */}
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up">
              <h3 className="text-lg font-semibold text-green-500 cursor-pointer">1. What type of soil is suitable for planting cassava and corn?</h3>
              <p className="text-gray-600 mt-2">These two plants are suitable for planting in loose soil, on the outskirts of the city, and have good drainage to prevent waterlogging.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up">
              <h3 className="text-lg font-semibold text-green-500 cursor-pointer">2. How to deal with pests that attack corn and cassava?</h3>
              <p className="text-gray-600 mt-2">Use organic or chemical pesticides as needed. Cassava is often affected by mites, while corn is susceptible to armyworms.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up">
              <h3 className="text-lg font-semibold text-green-500 cursor-pointer">3. Can cassava and corn be planted together?</h3>
              <p className="text-gray-600 mt-2">Yes, both can be planted together using the intercropping method, as long as the planting distance is arranged so that they do not compete with each other.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up">
              <h3 className="text-lg font-semibold text-green-500 cursor-pointer">4. How long does it take to harvest?</h3>
              <p className="text-gray-600 mt-2">Cassava is usually harvested in 9-12 months, while corn can be harvested in 3-4 months.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up">
              <h3 className="text-lg font-semibold text-green-500 cursor-pointer">5. What is the best fertilizer for cassava and corn?</h3>
              <p className="text-gray-600 mt-2">Compost or manure is very good for growth, combined with NPK fertilizer for maximum results.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-8 mt-16 text-center text-gray-600">
        <p>© 2024 Crop-Care. All Rights Reserved.</p>
      </footer>

      {/* Floating Image Card */}
      {showCard && <FloatingImageCard onClose={() => setShowCard(false)} imageResult={(image) => setSelectedImage(image)} predictionResult={(res) => setPredictionResult(res)}/>}
    </div>
  );
}
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
    // </main>