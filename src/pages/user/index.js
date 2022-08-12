import React from "react";

import Header from "./Layouts/Header/Header";

import Footer from "./Layouts/Footer/Footer";
import "./index.css";

const User = ({ children }) => {
  //render

  return (
    <section style={{ position: "relative" }} className="Userpage">
      <Header></Header>

      <main
        style={{
          position: "relative",
          zIndex: "0",
          minHeight: "500px",
          backgroundColor: "white",
        }}
      >
        {children}
      </main>

      <Footer></Footer>
    </section>
  );
};

export default User;
