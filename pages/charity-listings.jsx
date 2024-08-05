import React, { useState, useEffect } from "react";
import { WebLayout } from "./layout";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import { useQuery } from "react-query";

export default function CharityListings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCharities, setFilteredCharities] = useState([]);

  // Fetch charity list from API
  const fetchCharityList = async () => {
    try {
      const res = await axios.get("/api/getCharity");
      console.log("Charity data received:", res.data); // Log the response data
      return res.data.charities; // Return charities directly
    } catch (error) {
      console.error("Error fetching charity list:", error);
      throw new Error("Failed to fetch charity list");
    }
  };

  const { data, isLoading, error } = useQuery("charity-list", fetchCharityList);

  useEffect(() => {
    if (data) {
      setFilteredCharities(
        data.filter((charity) =>
          charity.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [data, searchTerm]);

  return (
    <div>
      <Head>
        <title>Gift Right | Charity Listing</title>
      </Head>

      <WebLayout>
        <section className="p-7 h-full min-h-screen">
          <div className="mb-10">
            <input
              type="text"
              name="search"
              id="search"
              className="rounded-full p-2 border border-gray-300 shadow-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {isLoading ? (
            <div className="p-3 text-center font-semibold text-2xl">
              Loading...
            </div>
          ) : error ? (
            <div className="p-3 text-center text-red-500 font-semibold text-2xl">
              Error fetching data. Please try again later.
            </div>
          ) : (
            <>
              <div className="font-bold text-3xl mb-4">Charities</div>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                {filteredCharities.length === 0 ? (
                  <div className="text-red-500 text-center py-4 text-2xl font-semibold">
                    No Charities Found!
                  </div>
                ) : (
                  filteredCharities.map((item, index) => (
                    <Link href={`/charity-details/${item.id}`} key={index}>
                      <div className="cursor-pointer px-4 py-6 rounded-md shadow-lg flex items-center space-x-4 bg-slate-100 hover:bg-gray-100 transition-colors duration-200">
                        <div className="w-[80px] h-[80px] flex items-center justify-center bg-gray-100 rounded-full overflow-hidden">
                          <img
                            className="w-full h-full object-cover"
                            src={`/charity/${item.imgName || item.img_name}`} // Ensure image path
                            alt={item.name}
                          />
                        </div>

                        <div>
                          <h2 className="text-xl font-semibold capitalize mb-2">
                            {item.name}
                          </h2>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </>
          )}
        </section>
      </WebLayout>
    </div>
  );
}
