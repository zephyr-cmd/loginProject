"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

let images = [
  // "/image3.jpg",
  "/multi-speciality.jpeg",
  "/slider-01.jpg",
  "/slider-02.jpg",
  "/slider-04.jpg",
  "/slider-05.jpg",
];

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  let autoSlide = true;
  let autoSlideInterval = 5000;
  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);
  const prev = () =>
    setCurrentSlide((currentSlide) =>
      currentSlide == 0 ? images.length - 1 : currentSlide - 1
    );
  const next = () =>
    setCurrentSlide((currentSlide) =>
      currentSlide == images.length - 1 ? 0 : currentSlide + 1
    );

  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-50 w-full to-gray-100  md:h-1/2">
        <div className="overflow-hidden relative">
          <div
            className="flex transition-transform ease-in duration-500"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {[...images].map((image, index) => {
              {
                /* console.log("L-49, images----->", image); */
              }
              return (
                <div
                  key={index}
                  className="relative flex justify-center items-center min-w-full aspect-[4/2] rounded-xl"
                >
                  <Image
                    src={image}
                    alt=""
                    // height={500}
                    // width={500}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority="true"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="absolute inset-0 p-4 flex justify-between items-center text-2xl">
          <button
            onClick={prev}
            className="px-2 rounded-full shadow bg-white/30 text-gray-800 hover:bg-white/80"
          >
            &#60;
          </button>
          <button
            onClick={next}
            className="px-2 rounded-full shadow bg-white/30 text-gray-800 hover:bg-white/80"
          >
            &#62;
          </button>
        </div>
      </div>
    </>
  );
}

export default Carousel;
