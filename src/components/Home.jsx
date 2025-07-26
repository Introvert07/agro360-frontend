import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  FaTractor,
  FaStore,
  FaLeaf,
  FaCalendarAlt,
  FaRegListAlt,
  FaLanguage,
} from "react-icons/fa";

import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import slide4 from "../assets/slide4.jpg";
import slide5 from "../assets/slide5.jpg";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    title: "🌾 Empowering Farmers with AI",
    desc: "Snap a photo, get instant diagnosis. Our AI-powered Crop Doctor identifies diseases, pests, and nutrient deficiencies from leaf images — giving real-time solutions to protect your yield and reduce losses.",
    image: slide1,
  },
  {
    title: "🧠 Smart Farm Planning",
    desc: "No more guesswork. Get automated irrigation and fertilizer schedules tailored to your crop type, soil quality, and live weather data — ensuring optimal growth with minimum resource usage.",
    image: slide2,
  },
  {
    title: "🛒 AgriBazaar",
    desc: "Connect directly with other verified farmers and agri-retailers. Buy or sell seeds, fertilizers, tools, and harvests without middlemen. Transparent, secure, and farmer-friendly online marketplace.",
    image: slide3,
  },
  {
    title: "🏛️ Government Schemes",
    desc: "Find government schemes, subsidies, insurance, and financial support based on your state, crop type, and farmer category. Everything you’re eligible for — in one place, explained simply.",
    image: slide4,
  },
  {
    title: "🌱 Modern Fertilizer Knowledge",
    desc: "Access a curated library of modern fertilizers, micronutrients, and organic options. Understand their usage, benefits, and crop-specific impact — helping you make smart, sustainable choices.",
    image: slide5,
  },
];

const features = [
  {
    icon: <FaRegListAlt className="text-green-600 text-3xl" />,
    title: "Crop Doctor (AI)",
    desc: "Diagnose crop diseases instantly using image or form input.",
  },
  {
    icon: <FaCalendarAlt className="text-green-600 text-3xl" />,
    title: "Smart Scheduler",
    desc: "Auto-generated watering & fertilizer plans based on crop & weather.",
  },
  {
    icon: <FaStore className="text-green-600 text-3xl" />,
    title: "AgriBazaar",
    desc: "Buy/sell seeds, fertilizers & tools directly with other farmers.",
  },
  {
    icon: <FaTractor className="text-green-600 text-3xl" />,
    title: "Govt Scheme Finder",
    desc: "Discover schemes & subsidies based on your location & crop type.",
  },
  {
    icon: <FaLeaf className="text-green-600 text-3xl" />,
    title: "Fertilizer Info Hub",
    desc: "Explore modern fertilizers & their usage for better yield.",
  },
  {
    icon: <FaLanguage className="text-green-600 text-3xl" />,
    title: "Multilingual + Voice Input",
    desc: "Available in Hindi, English and soon with voice support.",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const total = slides.length;
  const featureRef = useRef([]);

  useEffect(() => {
    featureRef.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          delay: i * 0.1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(timer);
  }, [total]);

  const goToSlide = (index) => setCurrent(index);

  

  return (
    <div className=" pt-10 min-h-screen bg-white text-gray-800 overflow-x-hidden relative">
  
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 md:px-10 bg-[radial-gradient(ellipse_at_top_left,_#bbf7d0,_#f0fdf4,_#ffffff)] z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            key={current}
            className="space-y-6 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-700 leading-snug tracking-tight">
              <span className="block text-green-800 drop-shadow-lg">
                {slides[current].title}
              </span>
            </h1>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              {slides[current].desc}
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/crop-doctor"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg flex items-center gap-2"
                >
                  Diagnosis Plant
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/fertilizers"
                  className="bg-white text-gray-800 border border-gray-300 px-6 py-3 rounded-lg font-semibold shadow-sm hover:shadow-md flex items-center gap-2"
                >
                   All Fertilizer
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            key={slides[current].image}
            className="relative w-full h-60 sm:h-80 md:h-[26rem] rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <div className="absolute -inset-2 bg-gradient-to-br from-green-300 via-green-100 to-green-300 rounded-[2rem] blur-xl z-0 animate-pulse" />
            <img
              src={slides[current].image}
              alt={slides[current].title}
              className="relative z-10 w-full h-full object-cover rounded-3xl"
            />
          </motion.div>
        </div>

        {/* Dot Navigation */}
        <div className="flex justify-center mt-8 gap-3">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.2 }}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                current === index
                  ? "bg-green-600 scale-125"
                  : "bg-gray-300 hover:bg-green-400"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Bottom Decorative SVG */}
  <div className="w-full overflow-hidden leading-none z-0">
  <svg
    viewBox="0 0 1440 320"
    className="w-full h-32 md:h-48"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <path
      fill="#bbf7d0"
      fillOpacity="1"
      d="M0,224L60,202.7C120,181,240,139,360,133.3C480,128,600,160,720,186.7C840,213,960,235,1080,208C1200,181,1320,107,1380,69.3L1440,32V320H1380C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320H0Z"
    />
  </svg>
</div>



      {/* Features Section */}
      <section className="relative py-20 px-4 bg-[radial-gradient(ellipse_at_top_right,_#bbf7d0,_#f0fdf4,_#ffffff)] z-10">
        <div className="absolute top-[-6rem] left-[-6rem] w-[20rem] h-[20rem] bg-green-200 rounded-full blur-3xl opacity-30 animate-pulse z-0"></div>

        <div className="relative max-w-6xl mx-auto text-center z-10">
          <h2 className="text-4xl font-extrabold text-green-700 mb-12 drop-shadow-sm">
            🌿 What Can You Do With Agro360?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                key={index}
                ref={(el) => (featureRef.current[index] = el)}
                className="bg-white hover:bg-green-50 border border-transparent hover:border-green-500 transition-all rounded-2xl p-6 shadow-md hover:shadow-xl cursor-pointer transform hover:-translate-y-1"
              >
                <div className="mb-4 text-green-600 text-4xl">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
