import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Head from "next/head";
import { AdminLayout } from "../../layout";
import axios from "axios";

const Create = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.itemId;
  const [Item, setItem] = useState({});

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const [FormData, setFormData] = useState({
    itemName: "",
    description: "",
    link: "",
    price: "",
  });

  const getCharityItem = async (id) => {
    try {
      // const res = await axios.post(`/api/getOneItem`, {
      //   _id: id,
      // });
      const res = await axios.post(`/api/getOneItem`, {
        productId: id,
      });
      setItem(res.data.validItem);
      setFormData({
        itemName: res.data.validItem.name,
        description: res.data.validItem.description,
        link: res.data.validItem.link,
        price: res.data.validItem.price,
      });
    } catch (error) {
      alert("Item Not Found!");
    }
  };

  useEffect(() => {
    if (id) {
      getCharityItem(id);
    }
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({
        ...FormData,
        itemId: id,
        image: e.target.files?.[0],
      });
    } else {
      setFormData({
        ...FormData,
        itemId: id,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`/api/updateItem`, FormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status == 200) {
        setFormData({
          itemName: "",
          description: "",
          link: "",
          price: "",
        });

        router.push(`/admin-panel/wishlist/${Item.charityId}`);
      }
    } catch (error) {
      alert("Server Downtime, Please Try Again Later!");
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>GiftRight | Edit Item</title>
      </Head>

      <div className="p-5">
        <h1 className="text-2xl font-semibold">Edit Item:</h1>

        <div className="mt-4">
          <form method="post" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <div>
                <label htmlFor="image">Upload Image:</label>
                <input
                  onChange={handleChange}
                  type="file"
                  name="image"
                  id="image"
                  className="p-2 rounded-md border border-black w-full block"
                  placeholder="Upload Image"
                />
              </div>

              <div>
                <label htmlFor="itemName">
                  Item Name:<span className="text-red-500">*</span>
                </label>
                <input
                  onChange={handleChange}
                  value={FormData.itemName}
                  type="text"
                  name="itemName"
                  id="itemName"
                  className="p-2 rounded-md border border-black w-full block"
                  placeholder="Enter Item Name"
                  required
                />
              </div>

              <div>
                <label htmlFor="description">
                  Description:<span className="text-red-500">*</span>
                </label>
                <textarea
                  onChange={handleChange}
                  value={FormData.description}
                  name="description"
                  id="description"
                  className="p-2 rounded-md border border-black w-full block"
                  placeholder="Enter Description"
                  required
                ></textarea>
              </div>

              <div>
                <label htmlFor="link">
                  Item Link:<span className="text-red-500">*</span>
                </label>
                <input
                  onChange={handleChange}
                  value={FormData.link}
                  type="text"
                  name="link"
                  id="link"
                  className="p-2 rounded-md border border-black w-full block"
                  placeholder="Enter Link"
                  required
                />
              </div>

              <div>
                <label htmlFor="price">
                  Item Price:<span className="text-red-500">*</span>
                </label>
                <input
                  onChange={handleChange}
                  value={FormData.price}
                  type="number"
                  min={1}
                  name="price"
                  id="price"
                  className="p-2 rounded-md border border-black w-full block"
                  placeholder="Enter Price"
                  required
                />
              </div>

              <div className="flex justify-center space-x-2">
                <div>
                  <Link href={"/admin-panel/charity"}>
                    <button
                      type="button"
                      className="text-black py-1 px-2 rounded-md border border-black"
                    >
                      Close
                    </button>
                  </Link>
                </div>

                <div>
                  <button
                    type="submit"
                    className="text-white bg-green-400 hover:bg-green-500 py-1 px-2 rounded-md"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Create;
