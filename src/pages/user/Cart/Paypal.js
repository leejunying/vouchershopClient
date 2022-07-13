import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { Request_User } from "../../../API/api";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, clearItems } from "../../../Redux/Reducer/Cart";
const PaypalButton = (props) => {
  const initialOptions = {
    "client-id":
      "Af8rG_BzQB0X4GuvNvL0zQSv4J6KcynMmcPmCts-Nq6sRbQ8HBHm-71pIC1Q-nTXYGT3bApJkeNdQlBN",
    currency: "USD",
    intent: "capture",
  };

  const dispatch = useDispatch();
  const { total, cart, user } = props;

  var sendtotal = Math.floor(total / 23460);

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const handleApprove = (orderID) => {
    setPaidFor(true);
  };
  if (paidFor) {
    alert("Cảm ơn bạn đã mua hàng!");
  }
  if (error === true) {
    alert("Thanh toán thật bại!");
  }

  const saveData = () => {
    const payment = {
      userid: user._id,
      purchase_items: cart,
      total: total,
    };

    axios
      .post(Request_User.submitpaypal, payment, {
        headers: {
          token: `Basic ${user.accessToken}`,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          dispatch(clearItems([]));
        }
      });
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: sendtotal.toString(),
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          saveData();
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalButton;
