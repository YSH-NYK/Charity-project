import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { AdminLayout } from "../../layout";
import Head from "next/head";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast"; // Import the useToast hook

const Edit = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.charityId;
  const [charity, setCharity] = useState({});
  const [formData, setFormData] = useState({
    institudeName: "",
    address: "",
    about: "",
    contact1: "",
    contact2: "",
    email: "",
    image: null,
  });

  const { toast } = useToast(); // Use the useToast hook

  const getCharityItem = async (id) => {
    try {
      const res = await axios.post(`/api/getOneCharity`, {
        charityId: id,
      });

      setCharity(res.data.validCharity);
      setFormData({
        institudeName: res.data.validCharity.name,
        address: res.data.validCharity.address,
        about: res.data.validCharity.about,
        contact1: res.data.validCharity.contact1,
        contact2: res.data.validCharity.contact2,
        email: res.data.validCharity.email,
        image: null,
      });
    } catch (error) {
      showToast("error", "Charity Not Found!");
    }
  };

  useEffect(() => {
    if (id) {
      getCharityItem(id);
    }
  }, [id]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("id", id);
    formDataToSend.append("institudeName", formData.institudeName);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("about", formData.about);
    formDataToSend.append("contact1", formData.contact1);
    formDataToSend.append("contact2", formData.contact2);
    formDataToSend.append("email", formData.email);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const res = await axios.post("/api/updateCharity", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        showToast("success", "Charity updated successfully!");
        router.push("/admin-panel/charity");
      }
    } catch (error) {
      showToast("error", "Failed to update charity.");
    }
  };

  const showToast = (type, message) => {
    toast({
      description: message,
      variant: type === "error" ? "destructive" : "default",
    });
  };

  return (
    <AdminLayout>
      <Head>
        <title>GiftRight | Edit Charity</title>
      </Head>

      <div className="p-5">
        <h1 className="text-2xl font-semibold">Edit Charity Institute:</h1>

        <div className="mt-4">
          <form method="post" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <div>
                <label htmlFor="image">Upload Image:</label>
                <input
                  type="file"
                  onChange={handleChange}
                  name="image"
                  id="image"
                  className="p-2 rounded-md border border-black w-full block"
                  placeholder="Upload Image"
                />
              </div>

              <div>
                <label htmlFor="institudeName">
                  Institute Name:<span className="text-red-500">*</span>
                </label>
                <input
                  onChange={handleChange}
                  value={formData.institudeName}
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
                  value={formData.address}
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
                  value={formData.about}
                  name="about"
                  id="about"
                  className="p-2 rounded-md border border-black w-full block"
                  placeholder="Enter Description"
                  required
                ></textarea>
              </div>

              <div>
                <label htmlFor="email">
                  Email Id:<span className="text-red-500">*</span>
                </label>
                <input
                  onChange={handleChange}
                  value={formData.email}
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
                    value={formData.contact1}
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
                    value={formData.contact2}
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

export default Edit;
