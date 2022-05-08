import React, { useEffect, useState } from "react";

import Contacts from "../Contacts";

import { BrowserRouter as Router, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Cart from "../../../Components/Cart/Cart.js";

import { clientLogin } from "../../../Redux/Reducer/Account";
import { Commonfc } from "../../../Ultis/Commonfunction";
import {
  addItem,
  decreaseItem,
  increaseItem,
  removeItem,
} from "../../../Redux/Reducer/Cart";
import Grid from "@mui/material/Grid";
import Banner from "../../../Components/Banner/Banner";

import CardItem from "../Vounchers/Card/index";
const Home = () => {
  //define using
  const dispatch = useDispatch();
  const state = useSelector((state) => (state = state));

  //init value

  let testproducts = [
    {
      Slug: "Stay&Swing1",
      Key: "CV",
      Name: "Stay & Swing",
      Status: "MỚi",
      Img_url:
        "https://assets.digilink.vn/uploads/2022/03/mat-2_1647999560.jpg",
      Category: ["Combo Voucher"],
      Stock: 100,
      Price_options: { Price: "13128000" },
    },
    {
      Slug: "Stay&Swing2",
      Key: "CV",
      Name: "Fly, Stay & Swing",
      Status: "MỚi",
      Img_url:
        "https://assets.digilink.vn/uploads/2022/03/mat-2_1647999560.jpg",
      Category: ["Combo Voucher"],
      Stock: 100,
      Price_options: { Price: "139390" },
    },
  ];

  let test = [
    {
      key: "01",
      name: "voucher1",
      img_url: "hkt333.com",
    },

    {
      key: "02",
      name: "voucher2",
      img_url: "hkt2222.com",
    },
  ];

  //init state

  //Effect

  //mount

  console.log(state["cart"]["items"]);
  return (
    <div>
      <section className="Slider">
        <Banner></Banner>
      </section>
      <section className="Main-menu">





      </section>
      <section className="Vouchers-box">
        <Grid container className="Box-container">

          
        </Grid>
      </section>
    </div>
  );
};

export default Home;
