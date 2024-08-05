import Link from "next/link";
import React from "react";
import { InstaIcon, FbIcon, TikIcon, LinkdnIcon, WhatIcon } from "@/components/Icons";

export const Footer = () => {
  return (
    <div>
      <section>
        <div className="p-5 bg-white">
          <div className="size-20 w-20 h-auto mx-auto rounded-md mb-4">
            <img
              src="/giftRightLogo.png"
              alt="logo"
              className="w-full h-full rounded-md"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3 text-sm font-semibold text-center">
            <Link href={"/"} className="flex-shrink-0">
              Home
            </Link>
            <Link href={"/charity-listings"} className="flex-shrink-0">
              Charities
            </Link>
            <Link href={"/about-us"} className="flex-shrink-0">
              About Us
            </Link>
            <Link href={"/faq"} className="flex-shrink-0">
              FAQ
            </Link>
            <Link href={"/contact"} className="flex-shrink-0">
              Contact
            </Link>
          </div>

          <div className="my-3">
            <h2 className="text-center text-xl font-bold mb-3">Follow Us:</h2>

            <div className="flex justify-center space-x-5 flex-wrap">
              <Link href={"#"} className="flex-shrink-0">
                <TikIcon />
              </Link>
              <Link href={"#"} className="flex-shrink-0">
                <FbIcon />
              </Link>
              <Link href={"#"} className="flex-shrink-0">
                <WhatIcon />
              </Link>
              <Link href={"#"} className="flex-shrink-0">
                <InstaIcon />
              </Link>
              <Link href={"#"} className="flex-shrink-0">
                <LinkdnIcon />
              </Link>
            </div>
          </div>

          <div className="text-center font-semibold text-sm">
            Gift Right© 2024 All rights reserved.
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
