import React, { useEffect, useState } from "react";
import { AdminLayout } from "../layout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Head from "next/head";
import axios from "axios";

const Create = () => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const [FormDataItem, setFormDataItem] = useState({
    institudeName: "",
    address: "",
    about: "",
    contact1: "",
    contact2: "",
    email: "",
  });

  const handleChange = (e) => {
    if (e.target.name == "image") {
      setFormDataItem({
        ...FormDataItem,
        image: e.target.files?.[0],
      });
    } else {
      setFormDataItem({
        ...FormDataItem,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`/api/createCharity`, FormDataItem, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status == 200) {
        setFormDataItem({
          institudeName: "",
          address: "",
          about: "",
          contact1: "",
          contact2: "",
          email: "",
        });

        router.push("/admin-panel/charity");
      }
    } catch (error) {
      alert("Server Downtime, Please Try Again Later!");
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>GiftRight | Create Charity</title>
      </Head>

      <div className="p-5">
        <h1 className="text-2xl font-semibold">Create Charity Institude:</h1>

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
                <label htmlFor="institudeName">
                  Institude Name:<span className="text-red-500">*</span>
                </label>
                <input
                  onChange={handleChange}
                  value={FormDataItem.institudeName}
                  type="text"
                  name="institudeName"
                  id="institudeName"
                  className="p-2 rounded-md border border-black w-full block"
                  placeholder="Enter Name"
                  required
                />
              </div>

              <div>
                <label htmlFor="address">
                  Address:<span className="text-red-500">*</span>
                </label>
                <input
                  onChange={handleChange}
                  value={FormDataItem.address}
                  type="text"
                  name="address"
                  id="address"
                  className="p-2 rounded-md border border-black w-full block"
                  placeholder="Enter Address"
                  required
                />
              </div>

              <div>
                <label htmlFor="about">
                  About Charity:<span className="text-red-500">*</span>
                </label>
                <textarea
                  onChange={handleChange}
                  value={FormDataItem.about}
                  name="about"
                  id="about"
                  className="p-2 rounded-md border border-black w-full block"
                  placeholder="Enter Name"
                  required
                ></textarea>
              </div>

              <div>
                <label htmlFor="email">
                  Email Id:<span className="text-red-500">*</span>
                </label>
                <input
                  onChange={handleChange}
                  value={FormDataItem.email}
                  type="email"
                  name="email"
                  id="email"
                  className="p-2 rounded-md border border-black w-full block"
                  placeholder="Enter Email Id"
                  required
                />
              </div>

              <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-2">
                <div>
                  <label htmlFor="contact1">
                    Contact Number 1:<span className="text-red-500">*</span>
                  </label>
                  <input
                    onChange={handleChange}
                    value={FormDataItem.contact1}
                    type="number"
                    min={1}
                    name="contact1"
                    id="contact1"
                    className="p-2 rounded-md border border-black w-full block"
                    placeholder="Enter Contact Number 1"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contact2">
                    Contact Number 2:<span className="text-red-500">*</span>
                  </label>
                  <input
                    onChange={handleChange}
                    value={FormDataItem.contact2}
                    type="number"
                    min={1}
                    name="contact2"
                    id="contact2"
                    className="p-2 rounded-md border border-black w-full block"
                    placeholder="Enter Contact Number 2"
                    required
                  />
                </div>
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
