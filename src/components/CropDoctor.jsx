import React from "react";
import { motion } from "framer-motion";
import CropDoctorAPI from "./CropDoctorAPI";

const CropDoctor = () => {
  return (
    <>
   <section className="flex flex-col sm:pt-24 max-md:pt-10">
        <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="pt-10 relative min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center sm:px-6 px-2 py-16"
    >
      {/* Shimmer background text */}
      <div className="absolute text-[120px] md:text-[200px] font-black text-green-100 opacity-20 select-none pointer-events-none -z-10">
        CROP
      </div>

      <div className="text-center max-w-3xl sm:p-6 px-2 py-4 rounded-3xl bg-white/80 shadow-2xl border border-green-100 backdrop-blur-sm">
        <h1 className="text-2xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 to-lime-500 bg-clip-text text-transparent mb-4">
          🌾 Crop Doctor
        </h1>

        <p className="text-green-700 font-semibold text-lg mb-2 animate-pulse">
          We’re building something amazing...
        </p>

        <p className="text-gray-700 text-md md:text-lg mb-6 leading-relaxed">
          Upload a photo of your crop and our smart system will detect diseases, suggest the best remedies, and recommend fertilizers tailored to your plant’s needs.
        </p>

        <ul className="text-left text-gray-600 text-base space-y-2 px-4 md:px-10">
          <li className="hover:scale-[1.02] transition-all duration-300">
            📷 Upload crop photo
          </li>
          <li className="hover:scale-[1.02] transition-all duration-300">
            🧬 Disease diagnosis with AI
          </li>
          <li className="hover:scale-[1.02] transition-all duration-300">
            🌿 Smart fertilizer recommendations
          </li>
          <li className="hover:scale-[1.02] transition-all duration-300">
            👨‍⚕️ Agriculture expert consultation
          </li>
        </ul>

    <CropDoctorAPI/>


        <div className="mt-8">
          <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-sm shadow-md animate-pulse">
            🚧 Feature under development
          </span>
        </div>
      </div>
    </motion.div>

   </section>
    </>
 
  );
};

export default CropDoctor;
