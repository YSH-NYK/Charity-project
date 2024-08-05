import React from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export const WebLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="bg-[#F7FCFF]">{children}</main>
      <Footer />
    </div>
  );
};

export default WebLayout;
