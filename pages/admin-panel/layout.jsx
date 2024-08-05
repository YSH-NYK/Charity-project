import React from "react";
import AdminHeader from "../components/AdminHeader";

export const AdminLayout = ({ children }) => {
  return (
    <div>
      <AdminHeader />
      <main className="bg-[#F7FCFF]">{children}</main>
    </div>
  );
};

export default AdminLayout;
