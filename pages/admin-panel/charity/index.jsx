import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "@/components/Icons";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

function Dashboard() {
  const router = useRouter();
  const [charities, setCharities] = useState([]);
  const { toast } = useToast();

  const getCharities = async () => {
    try {
      const res = await axios.post(`/api/getCharity`);
      setCharities(res.data.charities);
    } catch (error) {
      showToast("error", "Server Downtime, Please Try Again Later!");
    }
  };

  const showToast = (type, message) => {
    toast({
      description: message,
      variant: type === "error" ? "destructive" : "default",
    });
  };

  useEffect(() => {
    getCharities();
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const handleActivity = async (id, is_active) => {
    try {
      await axios.post("/api/changeCharityActivity", {
        charityId: id,
        is_active: !is_active,
      });
      showToast("success", "Activity changed successfully!");
      getCharities();
    } catch (error) {
      showToast("error", "Failed to change Activity!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.post("/api/deleteCharity", { charityId: id });
      showToast("success", "Charity deleted successfully!");
      getCharities();
    } catch (error) {
      showToast("error", "Failed to delete Charity!");
    }
  };

  const handleHighlight = async (id) => {
    try {
      await axios.post("/api/highlightCharity", { charityId: id });
      showToast("success", "Highlight Status Changed!");
      getCharities();
    } catch (error) {
      showToast("error", "Failed to change Highlight!");
    }
  };

  return (
    <div>
      <Head>
        <title>Admin | Charity Listing</title>
      </Head>
      <div className="p-3">
        <div className="flex justify-between py-3 border-b-2 border-black">
          <h1 className="text-2xl font-semibold">Charity Listing:</h1>
          <Link href={"/admin-panel/charity/create"}>
            <Button
              variant="default"
              size="sm"
              className="bg-green-400 hover:bg-green-500 text-black"
            >
              Add
            </Button>
          </Link>
        </div>

        <div className="mt-3">
          <table className="w-full">
            <tbody>
              {charities.length > 0 ? (
                charities.map((item) => (
                  <tr className="border-b-2 border-gray-500" key={item.id}>
                    <td className="py-5">
                      <div className="w-16 h-16 rounded-md bg-black">
                        <img
                          className="w-full h-full rounded-md"
                          src={`/charity/${item.img_name}`}
                          alt="pic"
                        />
                      </div>
                    </td>
                    <td className="py-5">
                      <div>
                        <h2 className="text-2xl font-semibold capitalize">
                          {item.name}
                        </h2>
                        <p>
                          <b>Charity Id:</b> {item.id}
                        </p>
                      </div>
                    </td>
                    <td className="py-5">
                      <div className="text-center">
                        <input
                          type="checkbox"
                          name="highLight"
                          id="highLight"
                          onChange={() => handleHighlight(item.id)}
                          checked={item.highlighted === 1}
                        />
                        <p className="mt-1">Highlight Charity</p>
                      </div>
                    </td>
                    <td className="py-5">
                      <div className="flex justify-center space-x-3 items-center">
                        <Link href={`/admin-panel/wishlist/${item.id}`}>
                          <Button
                            variant="yellow"
                            size="sm"
                            className="text-black"
                          >
                            Item Wishlist
                          </Button>
                        </Link>
                        <Link href={`/admin-panel/charity/edit/${item.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-black"
                          >
                            <TrashIcon />
                          </Button>
                        </Link>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="text-black"
                          onClick={() => handleDelete(item.id)}
                        >
                          <PencilIcon />
                        </Button>
                      </div>
                    </td>
                    <td className="py-5">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`activity-switch-${item.id}`}
                          checked={item.is_active}
                          onCheckedChange={() =>
                            handleActivity(item.id, item.is_active)
                          }
                        />
                        <Label htmlFor={`activity-switch-${item.id}`}>
                          {item.is_active ? "Active" : "In-Active"}
                        </Label>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No charities found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
