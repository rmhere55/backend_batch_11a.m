// React code 

import { load } from "@cashfreepayments/cashfree-js";
import './App.css'

function App() {
  let cashfree;

  var initializeSDK = async function () {
    cashfree = await load({
      mode: "sandbox"
    });
  }
  initializeSDK();

  const doPayment = async () => {
    // Fetch payment session ID from backend
    const response = await fetch("/api/create-order", {
      method: "GET",
    });

    const data = await response.json();
    console.log(data)
    const paymentSessionId = data.paymentSessionId;

    let checkoutOptions = {
      paymentSessionId: paymentSessionId,
      redirectTarget: "_self",
    };
    cashfree.checkout(checkoutOptions);
  };
  return (
    <>
      <div className="row">
        <p>Click below to open the checkout page in current tab</p>
        <button type="submit" className="btn btn-primary" id="renderBtn" onClick={doPayment}>
          Pay Now
        </button>
      </div>
    </>
  )
}

export default App