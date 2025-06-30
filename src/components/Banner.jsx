"use client";


import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import { useAppContext } from "@/context/AppContext";
import { bannerData } from '@/Data';
import Loading from './Loading';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true); 
  const { router } = useAppContext();

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (bannerData.length === 0 || loading) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [bannerData.length, loading]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (bannerData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center">
        No banners available
      </div>
    );
  }

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {bannerData.map((slide, index) => (
          <div
            key={slide.id}
            style={{
              backgroundColor:
                index === 0
                  ? "lightgreen"
                  : index === 1
                    ? "lightblue"
                    : "#E6E9F2",
            }}
            className="flex flex-col-reverse md:flex-row items-center justify-between py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
          >
            <div className="md:pl-8 mt-10 md:mt-0">
              <p className="md:text-base text-green-600 pb-1">{slide.offer}</p>
              <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold">
                {slide.title}
              </h1>
              <div className="flex items-center mt-4 md:mt-6">
                <button
                  onClick={() => router.push("/all-products")}
                  className="md:px-10 px-7 md:py-2.5 py-2 bg-green-600 rounded-full text-white font-medium"
                >
                  {slide.buttonText1}
                </button>
                <button
                  onClick={() => router.push("/all-products")}
                  className="group flex items-center gap-2 px-6 py-2.5 font-medium"
                >
                  {slide.buttonText2}
                  <FaArrowRight className="group-hover:translate-x-1 transition" />
                </button>
              </div>
            </div>
            <div className="flex items-center flex-1 justify-center">
              <Image
                className="md:w-96 w-48"
                src={slide.imgSrc}
                width={300}
                height={500}
                alt={`Slide ${index + 1}`}
                priority={false}
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {bannerData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${currentSlide === index ? "bg-green-600" : "bg-gray-500/30"
              }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
