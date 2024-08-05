import React from "react";
import { WebLayout } from "../layout";
import Link from "next/link";
import Head from "next/head";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  Card,
  CardFooter,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const getImageSrc = (img, type = "charity") => {
  // Check if the URL is absolute
  if (/^(http|https):\/\//.test(img)) {
    return img;
  }

  // Determine the base directory based on the type
  let baseDir = "";
  if (type === "charity") {
    baseDir = "/charity/";
  } else if (type === "product") {
    baseDir = "/product/";
  }

  // Handle relative paths for different types of images
  return `${baseDir}${img}`;
};

const CharityDetails = () => {
  const router = useRouter();
  const { charityId } = router.query;

  const fetchCharityDetails = async (charityId) => {
    try {
      const res = await axios.post("/api/getOneCharity", { charityId });
      return res.data;
    } catch (error) {
      console.error("Error fetching charity details:", error);
      throw new Error("Failed to fetch charity details");
    }
  };

  const { data, isLoading, isError } = useQuery(
    ["charity-details", charityId],
    () => fetchCharityDetails(charityId),
    {
      enabled: !!charityId, // Ensures the query runs only if charityId is available
    }
  );

  if (isLoading) {
    return (
      <WebLayout>
        <div className="p-3 text-center font-semibold text-2xl">Loading...</div>
      </WebLayout>
    );
  }

  if (isError) {
    return (
      <WebLayout>
        <div className="p-3 text-center font-semibold text-2xl text-red-500">
          Failed to load charity details
        </div>
      </WebLayout>
    );
  }

  return (
    <div>
      <Head>
        <title>Gift Right | Charity Details</title>
      </Head>

      <WebLayout>
        <section className="p-7 h-full min-h-screen">
          <div className="flex justify-start py-10 px-5 items-center border-b border-black space-x-5">
            <div>
              <div className="size-[150px] rounded-md bg-black">
                <img
                  className="w-full h-full rounded-md"
                  src={getImageSrc(data?.validCharity.img_name)} // Use the public/charity/ directory
                  alt="charity-pic"
                />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl capitalize font-bold">
                {data?.validCharity.name}
              </h1>
              <p className="font-semibold">
                Charity Id: {data?.validCharity.id}
              </p>

              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-yellow-500" />
                <p className="font-semibold capitalize">
                  {data?.validCharity.address}
                </p>
              </div>

              <div className="mt-3">
                <Link
                  target="blank"
                  href={`mailto:${data?.validCharity.email}`}
                >
                  <Button variant="outline">Contact</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="py-10 px-7">
            <h2 className="text-4xl font-bold">About</h2>
            <p className="mt-5 capitalize">{data?.validCharity.about}</p>
          </div>

          <div className="py-10 px-7">
            <h2 className="text-4xl font-bold">Wishlist</h2>
            <p className="capitalize">
              Your generosity in donating the following items will be highly
              appreciated
            </p>

            {data?.productList.length === 0 ? (
              <div className="text-red-500 text-center py-4 text-2xl font-semibold">
                No Products Found!
              </div>
            ) : (
              <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-2">
                {data?.productList.map((item, index) => (
                  <Card key={index} className="w-full max-w-sm aspect-square">
                    <CardHeader className="relative overflow-hidden flex items-center justify-center h-[70%] rounded-t-md">
                      <img
                        className="object-cover w-full h-full absolute top-0 left-0 rounded-t-md"
                        src={getImageSrc(item.img_name, "product")} // Use the public/product/ directory
                        alt="product-pic"
                      />
                    </CardHeader>

                    <CardContent className="flex flex-col justify-center items-center p-3 h-[30%]">
                      <CardTitle className="text-xl font-semibold capitalize text-center">
                        {item.name.length > 20
                          ? `${item.name.slice(0, 20)}...`
                          : item.name}
                      </CardTitle>
                      <Link href={`/product-details/${item.id}`}>
                        <Button className="mt-2" variant="yellow">Proceed To Gift</Button>
                      </Link>
                    </CardContent>
                    <CardFooter></CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </WebLayout>
    </div>
  );
};

export default CharityDetails;
