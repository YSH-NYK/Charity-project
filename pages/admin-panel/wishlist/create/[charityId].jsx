import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Head from "next/head";
import { AdminLayout } from "../../layout";
import axios from "axios";

const Create = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.charityId;

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

  const handleChange = (e) => {
    if (e.target.name == "image") {
      setFormData({
        ...FormData,
        charityId: id,
        image: e.target.files?.[0],
      });
    } else {
      setFormData({
        ...FormData,
        charityId: id,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`/api/createItem`, FormData, {
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
      }
    } catch (error) {
      alert("Server Downtime, Please Try Again Later!");
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>GiftRight | Create Item</title>
      </Head>

      <div className="p-5">
        <h1 className="text-2xl font-semibold">Create Item:</h1>

        <div className="mt-4">
          <form method="post" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <div>
                <label htmlFor="image">
                  Upload Image:<span className="text-red-500">*</span>
                </label>
                <input
                  onChange={handleChange}
                  type="file"
                  name="image"
                  id="image"
                  className="p-2 rounded-md border border-black w-full block"
                  placeholder="Upload Image"
                  required
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
                  step="0.01"
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
