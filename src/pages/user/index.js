import React from "react";

import Header from "./Layouts/Header/Header";

import Footer from "./Layouts/Footer/Footer";
import "./index.css";

const User = ({ children }) => {
  //render

  return (
    <section className="Userpage">
      <Header></Header>

      <main>{children}</main>

      <Footer></Footer>
    </section>
  );
};

export default User;
