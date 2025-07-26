import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Image Imports
import wheatImg from "../assets/wheat.jpg";
import riceImg from "../assets/rice.jpg";
import maizeImg from "../assets/maize.jpg";
import cottonImg from "../assets/cotton.jpg";
import mustardImg from "../assets/mustard.jpg";
import groundnutImg from "../assets/groundnut.jpg";
import sugarcaneImg from "../assets/sugarcane.jpg";
import bajraImg from "../assets/bajra.jpg";
import soybeanImg from "../assets/soyabean.jpg";
import barleyImg from "../assets/barley.jpg";
import tomatoImg from "../assets/tomato.jpg";
import onionImg from "../assets/onion.jpg";

// Register plugin
gsap.registerPlugin(ScrollTrigger);

const cropData = [
  {
    name: "Wheat",
    season: "November – April",
    soil: "Loamy, Black",
    water: "4–6 irrigations (Moderate)",
    image: wheatImg,
  },
  {
    name: "Rice",
    season: "June – November",
    soil: "Clayey, Wetlands",
    water: "High (requires standing water)",
    image: riceImg,
  },
  {
    name: "Maize",
    season: "June – September",
    soil: "Well-drained Loamy",
    water: "Moderate (3–4 irrigations)",
    image: maizeImg,
  },
  {
    name: "Cotton",
    season: "April – October",
    soil: "Black Soil",
    water: "Moderate to High",
    image: cottonImg,
  },
  {
    name: "Mustard",
    season: "October – March",
    soil: "Sandy Loam",
    water: "Low to Moderate",
    image: mustardImg,
  },
  {
    name: "Groundnut",
    season: "June – October",
    soil: "Sandy Loam, Red Soil",
    water: "Moderate",
    image: groundnutImg,
  },
  {
    name: "Sugarcane",
    season: "October – March",
    soil: "Loamy, Alluvial",
    water: "High (frequent irrigations)",
    image: sugarcaneImg,
  },
  {
    name: "Bajra (Pearl Millet)",
    season: "June – September",
    soil: "Sandy, Dry Soil",
    water: "Low (Drought-tolerant)",
    image: bajraImg,
  },
  {
    name: "Soybean",
    season: "June – October",
    soil: "Black Cotton Soil",
    water: "Moderate",
    image: soybeanImg,
  },
  {
    name: "Barley",
    season: "November – April",
    soil: "Well-drained Loam",
    water: "Low to Moderate",
    image: barleyImg,
  },
  {
    name: "Tomato",
    season: "October – February / June – September",
    soil: "Well-drained Sandy Loam",
    water: "Moderate, frequent",
    image: tomatoImg,
  },
  {
    name: "Onion",
    season: "October – March",
    soil: "Loamy Soil",
    water: "Moderate",
    image: onionImg,
  },
];

export default function CropScheduler() {
  const [search, setSearch] = useState("");
  const cropRefs = useRef([]);

  useEffect(() => {
    cropRefs.current.forEach((el, index) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "ease.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });
  }, []);

  const filteredCrops = cropData.filter(
    (crop) =>
      crop.name.toLowerCase().includes(search.toLowerCase()) ||
      crop.season.toLowerCase().includes(search.toLowerCase()) ||
      crop.soil.toLowerCase().includes(search.toLowerCase()) ||
      crop.water.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className=" mt-10 min-h-screen bg-gradient-to-br from-green-50 to-white px-6 md:px-20 py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-8 text-center tracking-wide">
        🌾 Crop Scheduler
      </h1>

      <div className="mb-10 text-center">
        <input
          type="text"
          placeholder="🔍 Search by crop, soil, season..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div className="space-y-16">
        {filteredCrops.map((crop, index) => (
          <div
            key={index}
            ref={(el) => (cropRefs.current[index] = el)}
            className={`flex flex-col md:flex-row ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } items-center gap-8 md:gap-16 opacity-0`}
          >
            <div className="md:w-1/2">
              <div className="bg-green-100 shadow-lg rounded-xl p-6 border-l-8 border-green-500 transition-transform duration-500 hover:scale-[1.03]">
                <h2 className="text-2xl font-bold text-green-800 mb-2">{crop.name}</h2>
                <p><strong>🌱 Season:</strong> {crop.season}</p>
                <p><strong>🧪 Soil Type:</strong> {crop.soil}</p>
                <p><strong>💧 Water Requirement:</strong> {crop.water}</p>
              </div>
            </div>
            <div className="md:w-1/2 text-center">
              <img
                src={crop.image}
                alt={crop.name}
                className="rounded-lg shadow-lg w-full h-auto object-cover transition duration-500 hover:scale-105"
              />
            </div>
          </div>
        ))}

        {filteredCrops.length === 0 && (
          <p className="text-center text-gray-500 mt-10">❌ No matching crops found.</p>
        )}
      </div>
    </div>
  );
}
