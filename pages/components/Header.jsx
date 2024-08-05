import Head from "next/head";
import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <div>
      <Head>
        <link rel="icon" href={"/giftRightLogo.png"} />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <section className="bg-white flex flex-col md:flex-row justify-between items-center p-5">
        <div className="flex justify-center md:justify-start w-full md:w-auto">
          <Link className="flex items-center font-semibold"href="/">
            <img className="h-12 w-auto cursor-pointer" src="/giftRightLogo.png" alt="logo" />
            <p>GiftRight</p>
          </Link>
        </div>

        <div className="mt-4 md:mt-0 flex justify-center md:justify-end w-full md:w-auto space-x-2 md:space-x-5 text-sm font-semibold text-gray-800">
          <div>
            <Link href="/" className="hover:text-yellow-500 transition-colors duration-200">
              Home
            </Link>
          </div>
          <div>
            <Link href="/charity-listings" className="hover:text-yellow-500 transition-colors duration-200">
              Charities
            </Link>
          </div>
          <div>
            <Link href="/about-us" className="hover:text-yellow-500 transition-colors duration-200">
              About Us
            </Link>
          </div>
          <div>
            <Link href="/faq" className="hover:text-yellow-500 transition-colors duration-200">
              FAQ
            </Link>
          </div>
          <div>
            <Link href="/contact" className="hover:text-yellow-500 transition-colors duration-200">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Header;
