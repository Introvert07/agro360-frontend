import React, { useRef } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import WhyAgro360 from "./components/WhyAgro360";
import FertilizersInfo from "./components/FertilizerInfo";
import CropScheduler from "./components/CropScheduler";
import GovernmentSchemes from "./components/GovernmentSchemes";
import AgriBazaar from "./components/AgriBazaar";
import CropDoctor from "./components/CropDoctor";
import Register from "./components/Register";
import Login from "./components/Login";
import Footer from "./components/Footer"; // ✅ Import Footer

export default function App() {
  const fertilizerRef = useRef();
  const cropRef = useRef();
  const marketRef = useRef();
  const schemeRef = useRef();
  const cropDoctorRef = useRef();

  return (
    <div className="bg-white text-gray-800 flex flex-col min-h-screen">
      <Navbar
        scrollTo={{
          fertilizerRef,
          cropRef,
          marketRef,
          schemeRef,
          cropDoctorRef,
        }}
      />

      <div className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section id="home">
                  <Home />
                </section>
                <section id="why-agro360">
                  <WhyAgro360 />
                </section>
              </>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/fertilizers" element={<FertilizersInfo />} />
          <Route path="/crop-scheduler" element={<CropScheduler />} />
          
          <Route path="/agri-bazaar" element={<AgriBazaar />} />
          <Route path="/schemes" element={<GovernmentSchemes />} />
          <Route path="/crop-doctor" element={<CropDoctor />} />
        </Routes>
      </div>

      <Footer /> {/* ✅ Add Footer here */}
    </div>
  );
}
