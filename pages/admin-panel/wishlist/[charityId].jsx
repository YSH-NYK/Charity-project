import Link from "next/link";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { AdminLayout } from "../layout";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { PencilIcon, TrashIcon } from "@/components/Icons"; // Import custom icons
import { Button, buttonVariants } from "@/components/ui/button"; // Import Shadcn button
import { Switch } from "@/components/ui/switch"; // Import Shadcn switch

function Wishlist() {
  const router = useRouter();
  const params = useParams();
  const id = params?.charityId;
  const [Item, setItem] = useState([]);
  const { toast } = useToast();

  const getItems = async (id) => {
    try {
      const res = await axios.post(`/api/getItems`, {
        charityId: id,
      });

      setItem(res.data.products);
    } catch (error) {
      toast({
        title: "Error",
        description: "Server Downtime, Please Try Again Later!",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (id) {
      getItems(id);
    }
  }, [id]);

  const handleActivity = async (ItemId, isActive) => {
    try {
      await axios.post("/api/changeItemActivity", {
        itemId: ItemId,
        isActive: !isActive,
      });

      getItems(id);
      toast({
        title: "Success",
        description: "Activity changed successfully!",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change Activity!",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (ItemId) => {
    try {
      await axios.post("/api/deleteItem", {
        itemId: ItemId,
      });

      getItems(id);
      toast({
        title: "Success",
        description: "Item deleted successfully!",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete Item!",
        variant: "destructive",
      });
    }
  };

  const getImageSrc = (img) => {
    if (/^(http|https):\/\//.test(img)) {
      return img;
    }
    return `/product/${img}`;
  };

  return (
    <AdminLayout>
      <Head>
        <title>Admin | Wishlist</title>
      </Head>

      <div className="p-3">
        <div className="flex justify-between py-3 border-b-2 border-black">
          <div>
            <p>Items currently wishlisted</p>
          </div>

          <div className="space-x-2">
            <Link href={`/admin-panel/wishlist/createAPI/${id}`}>
              <Button
                variant="outline"
                className="bg-green-400 hover:bg-green-500 text-black"
              >
                Add Through API
              </Button>
            </Link>

            <Link href={`/admin-panel/wishlist/create/${id}`}>
              <Button
                variant="outline"
                className="bg-green-400 hover:bg-green-500 text-black"
              >
                Add
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-3">
          <table className="w-full">
            <tbody>
              {Item.map((item, index) => (
                <tr className="border-b-2 border-gray-500" key={index}>
                  <td className="py-5">
                    <div className="w-16 h-16 rounded-md bg-black">
                      <img
                        className="w-full h-full rounded-md"
                        src={getImageSrc(item.img_name || item.imgName)}
                        alt="Product Image"
                      />
                    </div>
                  </td>
                  <td className="py-5">
                    <div>
                      <h2 className="text-lg font-semibold capitalize">
                        {item.name}
                      </h2>
                    </div>
                  </td>
                  <td className="py-5">
                    <div>
                      <h2 className="text-lg font-semibold">£ {item.price}</h2>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex justify-center space-x-3 items-center">
                      <div>
                        <Link href={`/admin-panel/wishlist/edit/${item.id}`}>
                          <Button variant="ghost">
                            <TrashIcon />
                          </Button>
                        </Link>
                      </div>

                      <div>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(item.id)}
                        >
                          <PencilIcon />
                        </Button>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div>
                      <Switch
                        checked={item.is_active}
                        onCheckedChange={() =>
                          handleActivity(item.id, item.is_active)
                        }
                        className={`${
                          item.is_active
                            ? "bg-green-400 hover:bg-green-500"
                            : "bg-yellow-400 hover:bg-yellow-500"
                        }`}
                      >
                        {item.is_active ? "Active" : "In-Active"}
                      </Switch>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Toaster />
    </AdminLayout>
  );
}

export default Wishlist;
