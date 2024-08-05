import React from "react";
import { WebLayout } from "./layout";
import { Separator } from "@/components/ui/separator"; // Import the separator component

const AboutUs = () => {
  return (
    
    <WebLayout>
      <div className="p-5 bg-gray-100">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="font-bold text-4xl mb-5 text-black-600 text-left">
            About Us
          </h1>

          <div className="space-y-8">
            <div>
              <h2 className="font-bold text-2xl text-yellow-500 text-left">
                Welcome to GiftRight!
              </h2>
              <p className="mt-2 text-gray-700 text-left">
                At GiftRight, we are dedicated to transforming the donation
                process to make it more efficient, transparent, and impactful.
                Our platform connects generous donors with deserving charities,
                providing a streamlined way to support specific needs and make a
                direct difference.
              </p>
            </div>

            <Separator className="my-4" />

            <div>
              <h2 className="font-bold text-2xl text-yellow-500 text-left">Why GiftRight?</h2>
              <p className="mt-2 text-gray-700 text-left">
                <b>Transparency:</b> Our platform ensures that donors know exactly where their donations are going and how they are being used.
              </p>
              <p className="mt-2 text-gray-700 text-left">
                <b>Efficiency:</b> By providing a Wishlist of specific items, charities receive exactly what they need without the hassle of sorting through unsuitable donations.
              </p>
              <p className="mt-2 text-gray-700 text-left">
                <b>Impact:</b> Every donation through GiftRight is tailored to meet the specific needs of each charity, making your contribution more meaningful and effective.
              </p>
            </div>

            <Separator className="my-4" />

            <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-8">
              <div className="w-full md:w-1/2">
                <h2 className="font-bold text-2xl text-yellow-500 text-left">Our Vision</h2>
                <p className="mt-2 text-gray-700 text-left">To inspire the art of giving</p>
                <Separator orientation="horizontal" className="my-4" />
                <h2 className="font-bold text-2xl text-yellow-500 text-left">Our Values</h2>
                <p className="mt-2 text-gray-700 text-left">Utility, Viability, Generosity, Sustainability, helping local vendors and upcoming professionals</p>
              </div>
              <Separator orientation="vertical" className="hidden md:block mx-4" />
              <div className="w-full md:w-1/2">
                <h2 className="font-bold text-2xl text-yellow-500 text-left">Our Mission</h2>
                <p className="mt-2 text-gray-700 text-left">
                  Our mission is to provide an innovative and efficient online gifting platform that simplifies the process of gift-giving while promoting sustainability and charitable giving. We strive to connect users with a wide range of products and services, including local vendors and professionals, and create opportunities for easy and meaningful gifting to loved ones and to causes that matter to our community.
                </p>
              </div>

           
            </div>

            <Separator className="my-8" />

            <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-8">
              <div className="w-full md:w-1/2">
                <h2 className="font-bold text-2xl text-yellow-500 text-left">For Donors:</h2>
                <ul className="mt-2 text-gray-700 text-left space-y-2">
                  <li><b>Browse Charities:</b> Explore our comprehensive list of registered charities or use our search feature to find causes that resonate with you.</li>
                  <li><b>View Wishlists:</b> Each charity has a Wishlist of items they need, ranging from food and clothing to medical supplies and educational materials.</li>
                  <li><b>Select and Donate:</b> Choose the items you wish to donate, add the charity's address during the purchase process, and complete the transaction. The items will be sent directly to the charity, ensuring they receive exactly what they need.</li>
                </ul>
              </div>
              <Separator orientation="vertical" className="hidden md:block mx-4" />
              <div className="w-full md:w-1/2">
                <h2 className="font-bold text-2xl text-yellow-500 text-left">For Charities:</h2>
                <ul className="mt-2 text-gray-700 text-left space-y-2">
                  <li><b>Contact Us:</b> Charities interested in joining GiftRight can reach out to our team via the "Contact Us" link on our website to get onboarded.</li>
                  <li><b>Create a Profile:</b> Once onboarded, create a detailed profile highlighting your mission, goals, and the impact you aim to achieve.</li>
                  <li><b>Build Your Wishlist:</b> List the items your charity needs most, ensuring donors can see and choose exactly how they can help.</li>
                </ul>
              </div>
            </div>

            <Separator className="my-8" />

            <div>
              <h2 className="font-bold text-2xl text-yellow-500 text-left">Join Us</h2>
              <p className="mt-2 text-gray-700 text-left">
                Whether you are a donor looking to make a meaningful impact or a charity in need of support, GiftRight is here to help. Together, we can create a more connected and compassionate world, one gift at a time.
                <br />
                Thank you for choosing GiftRight. Let's make a difference together.
              </p>
            </div>

            <Separator className="my-8" />

            <div>
              <h2 className="font-bold text-2xl text-yellow-500 text-left">Contact Us</h2>
              <p className="mt-2 text-gray-700 text-left">
                For more information or to get started, please reach out to us via the Contact Us link on our website. We look forward to working with you!
              </p>
            </div>

          
          </div>
        </div>
      </div>
    </WebLayout>

  );
};

export default AboutUs;
