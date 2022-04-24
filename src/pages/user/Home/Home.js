import React, { useEffect, useState } from "react";

import Contacts from "../Contacts";

import { BrowserRouter as Router, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { clientLogin } from "../../../Redux/Reducer/Account";
import { Commonfc } from "../../../Ultis/Commonfunction";
import {
  addItem,
  decreaseItem,
  increaseItem,
  removeItem,
} from "../../../Redux/Reducer/Cart";
const Home = () => {
  //define using
  const dispatch = useDispatch();
  const state = useSelector((state) => (state = state));

  //init value

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
      {test.map((item, indx) => {
        return (
          <div key={indx}>
            <img src={item.img_url}></img>

            <h1>{item.name}</h1>

            <button
              onClick={() => {
                dispatch(addItem({ ...item, value: 0 }));
              }}
            >
              Buy It Now
            </button>

            <button
              onClick={() => {
                dispatch(increaseItem(item.key));
              }}
            >
              PLUS
            </button>

            <button
              onClick={() => {
                dispatch(decreaseItem(item.key));
              }}
            >
              Subject
            </button>

            <button
              onClick={() => {
                dispatch(removeItem(indx));
              }}
            >
              PLUS
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
