import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Typewriter } from "react-simple-typewriter";
import agroGif from "../assets/rice-field.gif";

gsap.registerPlugin(ScrollTrigger);

export default function WhyAgro360() {
  const textRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      imgRef.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <div className="relative bg-green-50 pt-0">
      {/* Top SVG Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 z-0">
        <svg
          className="relative block w-full h-[80px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#bbf7d0"
            d="M0,64L40,74.7C80,85,160,107,240,112C320,117,400,107,480,117.3C560,128,640,160,720,165.3C800,171,880,149,960,160C1040,171,1120,213,1200,218.7C1280,224,1360,192,1400,176L1440,160L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 flex flex-col md:flex-row items-center justify-center gap-12">
        <div ref={imgRef} className="md:w-1/2">
          <img
            src={agroGif}
            alt="Agro360"
            className="rounded-lg shadow-xl border-4 border-green-300"
          />
        </div>

        <div
          ref={textRef}
          className="md:w-1/2 bg-white/60 backdrop-blur-md border border-green-200 p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-4xl font-bold text-green-800 mb-6">
            <Typewriter
              words={[
                "Why Choose Agro360?",
                "Simplifying Farming!",
                "Your Smart Agri-Partner.",
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={2000}
            />
          </h2>
          <p className="text-lg text-gray-800 leading-relaxed">
            <span className="text-green-700 font-semibold">Agro360</span> is your all-in-one platform designed to revolutionize the way
            farming and agri-business is done. From buying and selling crops,
            fertilizers, pesticides, and seeds to getting expert advice for your
            domestic animals — Agro360 simplifies every step for both farmers and buyers.
          </p>
        </div>
      </div>

      {/* Bottom SVG Wave */}
      <div className="w-full overflow-hidden leading-none z-0">
        <svg
          className="relative block w-full h-[80px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#bbf7d0"
            d="M0,96L40,101.3C80,107,160,117,240,133.3C320,149,400,171,480,165.3C560,160,640,128,720,122.7C800,117,880,139,960,138.7C1040,139,1120,117,1200,122.7C1280,128,1360,160,1400,176L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
