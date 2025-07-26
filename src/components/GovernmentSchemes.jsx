import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const colorClasses = {
  green: { border: "border-green-500", text: "text-green-900", link: "text-green-700" },
  yellow: { border: "border-yellow-500", text: "text-yellow-900", link: "text-yellow-700" },
  blue: { border: "border-blue-500", text: "text-blue-900", link: "text-blue-700" },
  teal: { border: "border-teal-500", text: "text-teal-900", link: "text-teal-700" },
  purple: { border: "border-purple-500", text: "text-purple-900", link: "text-purple-700" },
  orange: { border: "border-orange-500", text: "text-orange-900", link: "text-orange-700" },
  red: { border: "border-red-500", text: "text-red-900", link: "text-red-700" },
  lime: { border: "border-lime-500", text: "text-lime-900", link: "text-lime-700" },
};

export default function GovernmentSchemes() {
  const schemeRefs = useRef([]);

  const schemes = [
    {
      name: "PM-Kisan Samman Nidhi",
      desc: "Provides ₹6,000/year in 3 installments directly to farmers’ bank accounts to support their financial needs.",
      link: "https://pmkisan.gov.in",
      color: "green",
    },
    {
      name: "PM Fasal Bima Yojana",
      desc: "Crop insurance scheme covering losses due to natural calamities, pests & diseases.",
      link: "https://pmfby.gov.in",
      color: "yellow",
    },
    {
      name: "Kisan Credit Card (KCC)",
      desc: "Enables farmers to purchase seeds, fertilizers, pesticides & other inputs on credit at low interest.",
      link: "https://www.pmkisan.gov.in/Documents/KCC.pdf",
      color: "blue",
    },
    {
      name: "Soil Health Card Scheme",
      desc: "Provides farmers with soil quality reports to guide crop choice and fertilizer use.",
      link: "https://soilhealth.dac.gov.in",
      color: "teal",
    },
    {
      name: "E-NAM (National Agriculture Market)",
      desc: "Online trading platform for agricultural commodities to get better market access and prices.",
      link: "https://enam.gov.in",
      color: "purple",
    },
    {
      name: "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
      desc: "Aims to enhance irrigation coverage and improve water use efficiency.",
      link: "https://pmksy.gov.in",
      color: "orange",
    },
    {
      name: "Rashtriya Krishi Vikas Yojana (RKVY)",
      desc: "Assists states in agricultural development with financial support.",
      link: "https://rkvy.nic.in",
      color: "red",
    },
    {
      name: "National Mission on Sustainable Agriculture (NMSA)",
      desc: "Promotes sustainable practices and climate-resilient farming.",
      link: "https://nmsa.dac.gov.in",
      color: "lime",
    },
  ];

  const landLinks = [
    {
      name: "Maharashtra Bhulekh – View Khasra/7-12, B-1",
      link: "https://bhulekh.mahabhumi.gov.in",
    },
    {
      name: "Madhya Pradesh Bhulekh – Check Khasra, B-1, Naksha",
      link: "https://mpbhulekh.gov.in",
    },
    {
      name: "Uttar Pradesh Bhulekh – Check Khasra/Khatauni",
      link: "https://upbhulekh.gov.in",
    },
    {
      name: "Andhra Pradesh Bhulekh – View Adangal, 1-B",
      link: "https://apbhulekh.ap.gov.in",
    },
    {
      name: "Gujarat AnyRoR – Land Records, Khatadar",
      link: "https://anyror.gujarat.gov.in",
    },
  ];

  useEffect(() => {
  schemeRefs.current.forEach((ref, index) => {
    if (!ref) return;

    // Fade & Slide In on Scroll
    gsap.fromTo(
      ref,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: index * 0.15,
        ease: "sine.out",
        scrollTrigger: {
          trigger: ref,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );

    
  });
}, []);

  

  return (
    <div className="mt-10 min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 px-6 md:px-20 py-16 text-black relative z-10">
      <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-12 text-center drop-shadow-md">
        🌿 Government Schemes & Farmer Resources
      </h1>

      {/* Government Schemes Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {schemes.map((scheme, i) => {
          const color = colorClasses[scheme.color];
          return (
            <div
              key={i}
              ref={(el) => (schemeRefs.current[i] = el)}
              className={`bg-white/90 backdrop-blur-sm p-6 shadow-md rounded-xl border-l-4 ${color.border}`}
            >
              <h2 className={`text-2xl font-bold mb-2 ${color.text}`}>
                {scheme.name}
              </h2>
              <p className="text-gray-800 leading-relaxed">{scheme.desc}</p>
              <a
                href={scheme.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-3 inline-block font-medium hover:underline ${color.link}`}
              >
                ➡️ Visit Official Portal
              </a>
            </div>
          );
        })}
      </div>

      {/* Land Records Section */}
      <div>
        <h2 className="text-3xl font-bold text-green-900 mb-4 drop-shadow-sm">
          🗺️ Land Records & Online Services
        </h2>
        <ul className="list-disc pl-6 text-gray-800 space-y-3">
          {landLinks.map((item, i) => (
            <li key={i}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 hover:underline"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
