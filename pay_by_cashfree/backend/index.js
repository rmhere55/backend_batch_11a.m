const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const { Cashfree } = require("cashfree-pg");

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Cashfree.XClientId = "TEST430329ae80e0f32e41a393d78b923034";
Cashfree.XClientSecret = "TESTaf195616268bd6202eeb3bf8dc458956e7192a85";
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

function generateOrderId() {
  const UniqueId = crypto.randomBytes(16).toString("hex");

  const hash = crypto.createHash("sha256");
  hash.update(UniqueId);
  const orderId = hash.digest("hex");
  return orderId.substring(0, 12);
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/payment", async (req, res) => {
  const orderId = "" + Date.now();

  try {
    var request = {
      order_amount: 1.0,
      order_currency: "INR",
      order_id: orderId,
      customer_details: {
        customer_id: "devstudio_user",
        customer_phone: "8474090589",
      },
      order_meta: {
        return_url: "http://localhost:3000/verify/" + orderId,
        payment_methods: "cc,dc,upi",
      },
    };

    Cashfree.PGCreateOrder("2023-08-01", request)
      .then((response) => {
        console.log("Order created successfully:", response.data);
        res.json(response.data);
      })
      .catch((error) => {
        console.error("Error:", error.response.data.message);
      });
  } catch (error) {
    console.error(error);
  }
});
app.get("/verify/:order_id", async (req, res) => {
  try {
    const { order_id } = req.params;
    if (!order_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Fetch and log order details
    Cashfree.PGOrderFetchPayments("2023-08-01", order_id)
      .then((response) => {
        console.log("Order fetched successfully:", response.data);
        let getOrderResponse = response.data; //Get Order API Response
        let orderStatus;

        if (
          getOrderResponse.filter(
            (transaction) => transaction.payment_status === "SUCCESS"
          ).length > 0
        ) {
          orderStatus = "Success";
        } else if (
          getOrderResponse.filter(
            (transaction) => transaction.payment_status === "PENDING"
          ).length > 0
        ) {
          orderStatus = "Pending";
        } else {
          orderStatus = "Failure";
        }
        res.send(orderStatus);
      })
      .catch((error) => {
        console.error("Error:", error.response?.data?.message || error.message);
        res.status(500).json({ message: "Failed to fetch order details" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
