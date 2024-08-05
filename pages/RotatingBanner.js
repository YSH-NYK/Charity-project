import { useState, useEffect } from "react";
import Link from "next/link";

const RotatingBanner = () => {
  const [backgroundImage, setBackgroundImage] = useState("/bannerimage1.jpg");

  useEffect(() => {
    const images = [
      "/bannerimage1.jpg",
      "/bannerimage2.jpg",
      "/bannerimage3.jpg",
      "/bannerimage4.jpg",
      "/bannerimage5.jpg",
      "/bannerimage6.jpg"
    ];
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      setBackgroundImage(images[currentIndex]);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="relative w-full h-[55vw] overflow-hidden ">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-background-image duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="relative z-10 flex justify-start items-center h-full p-3 sm:p-5 bg-black bg-opacity-20">
        <div className="pl-2 sm:pl-4">
          <p className="text-xl xs:text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-5 lg:mb-8">
            GiftRight
          </p>
          <Link
            href="/charity-listings"
            className="bg-yellow-400 text-black py-1 px-2 xs:py-2 xs:px-4 sm:py-3 sm:px-6 rounded-md text-xs xs:text-sm sm:text-lg font-semibold hover:bg-yellow-500 transition-colors duration-200"
          >
            Explore Charities
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RotatingBanner;