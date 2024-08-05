import React from "react";
import { WebLayout } from "../layout";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "react-query";
import { Button } from "@/components/ui/button"; // Import Shadcn button component

const getImageSrc = (img) => {
  // Check if the URL is absolute
  if (/^(http|https):\/\//.test(img)) {
    return img;
  }
  // Handle relative paths
  return `/product/${img}`;
};

const ProductDetails = () => {
  const router = useRouter();
  const { productId } = router.query;

  const fetchProductDetails = async (productId) => {
    const res = await axios.post(`/api/getOneItem`, { productId });
    return res.data;
  };

  const { data, isLoading } = useQuery(
    ["product-details", productId],
    () => fetchProductDetails(productId),
    {
      enabled: !!productId, // Ensures the query runs only if productId is available
    }
  );

  return (
    <div>
      <Head>
        <title>Gift Right | Product Details</title>
      </Head>

      <WebLayout>
        {isLoading ? (
          <div className="p-3 text-center font-semibold text-2xl">
            Loading...
          </div>
        ) : (
          <section className="p-7 h-full min-h-screen py-10 px-5">
            {" "}
            {/* Increased left and right padding */}
            <div className="mb-5">
              <div className="size-[250px] lg:hidden md:hidden block mx-auto rounded-md bg-black">
                <img
                  className="w-full h-full rounded-md"
                  src={getImageSrc(data?.validItem.img_name)}
                  alt="img"
                />
              </div>
            </div>
            <div className="flex justify-start space-x-5">
              {" "}
              {/* Increased space between elements */}
              <div>
                <div className="lg:size-[500px] md:size-[300px] lg:block md:block hidden mx-auto rounded-md bg-black">
                  <img
                    className="w-full h-full rounded-md"
                    src={getImageSrc(data?.validItem.img_name)}
                    alt="img"
                  />
                </div>
              </div>
              <div>
                <div>
                  <h1 className="text-4xl font-bold capitalize">
                    {data?.validItem.name}
                  </h1>
                  <p className="text-xl font-semibold pt-3">
                    £ {data?.validItem.price}
                  </p>

                  <div className="my-7">
                    <p className="font-bold text-xl">Description</p>
                    <p>{data?.validItem.description}</p>
                  </div>

                  <div>
                    <a
                      href={`${data?.validItem.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="yellow" className="mt-2">
                        Proceed To Gift
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </WebLayout>
    </div>
  );
};

export default ProductDetails;
