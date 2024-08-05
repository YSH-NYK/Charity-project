import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { WebLayout } from "./layout";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import RotatingBanner from "./RotatingBanner";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [Charity, setCharity] = useState([]);

  const getHighlights = async () => {
    try {
      const res = await axios.get(`/api/getHighlights`);
      console.log("Fetched highlights:", res.data); // Debugging: Log fetched data
      setCharity(res.data.highlights);
    } catch (error) {
      console.log("Failed To Get Highlights!", error); // Debugging: Log error details
    }
  };

  useEffect(() => {
    getHighlights();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Gift Right | Home</title>
      </Head>

      <WebLayout>
        <RotatingBanner />

        <section className="p-5">
          <h2 className="text-3xl font-bold mb-5">Highlighted Charities</h2>
          <div className="mt-3 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {Charity.length === 0 && (
              <p className="text-center text-gray-500">No highlighted charities available.</p>
            )}
            {Charity.map((item, index) => (
              <Link href={`/charity-details/${item.id}`} key={index}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-4">
                    <div className="w-full h-32 sm:h-48 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center mx-auto mb-4">
                      <img
                        className="w-full h-full object-cover"
                        src={
                          item.imgName
                            ? `/charity/${item.imgName}`
                            : item.img_name
                            ? `/charity/${item.img_name}`
                            : "/default-image.jpg" // Fallback image if none provided
                        }
                        alt="icon"
                      />
                    </div>

                    <h2 className="text-xl font-semibold mb-2 truncate">{item.name}</h2>
                    <p className="text-gray-600 text-sm line-clamp-2">{item.about}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </WebLayout>
    </div>
  );
}
