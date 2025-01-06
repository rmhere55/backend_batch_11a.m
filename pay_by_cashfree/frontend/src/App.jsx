
// import axios from 'axios'
// import './App.css'
// import { load } from "@cashfreepayments/cashfree-js";
// import { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';




// function App() {

//   let cashfree;
//     var initializeSDK = async function () {          
//         cashfree = await load({
//             mode: "sandbox"
//         });
//     }
//     initializeSDK();
     
//     const [oderId , setOderId]  = useState("")


//   const getSessionId = async ()=>{
//     const response = await axios.get('http://localhost:3000/payment')
//    if (response.data && response.data.payment_session_id)
//     {
//       console.log(response.data)
//       setOderId(response.data.order_id)
//     return response.data.payment_session_id
//    }


//   }
// const verifyPayment = async ()=>{
//   try {
    
//     const response = await axios.post('http://localhost:3000/verify', {
//       // payment_session_id: getSessionId(),
//       order_id: oderId
      

//       })
//       if(response && response.data){
//         alert("payment verified ")
//       }
//   } catch (error) {
//     console.error(error)

    
//   }
// }
// // "session_l3Sm4SdboeNb61gVOUWbKb9mQgSk66yS86xo-vFFYJpw7I325mA3mw4j4QgKRqbzYDAdF0sTI7oMFqSbE2ASwnNAbsIZDOgPNX-5xDKcSieESb_zt8poVB4payment" 

//   const handleClick = async (e)=>{
//     e.preventDefault()
//     try {
//       let sessionId = await getSessionId();
//       console.log(sessionId);
      
//       let checkoutOptions = {
//         paymentSessionId: sessionId ,
//         redirectTarget: "_self",
//     };
//     cashfree.checkout(checkoutOptions)
//     // .then((res) =>{
//     //   console.log("payment successful ")
//     // });
//     verifyPayment(oderId)

//     } catch (error) {
//        console.error( "error" , error)
//     }
//   }

//   return (
//     <>
//     <h1>
//       CashFree Payment Gateways

//     </h1>
//     <div>
//       <button onClick={handleClick}>
//         Pay Now 
//       </button>
//     </div>
//     </>
//   )
// }

// export default App




import axios from 'axios';
import './App.css';
import { load } from '@cashfreepayments/cashfree-js';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function PaymentPage() {
  let cashfree;
  const initializeSDK = async () => {
    cashfree = await load({
      mode: 'sandbox',
    });
  };
  initializeSDK();

  const [orderId, setOrderId] = useState('');

  const getSessionId = async () => {
    const response = await axios.get('http://localhost:3000/payment');
    if (response.data && response.data.payment_session_id) {
      console.log(response.data);
      setOrderId(response.data.order_id);
      return response.data.payment_session_id;
    }
  };

  const verifyPayment = async () => {
    try {
      const response = await axios.post('http://localhost:3000/verify', {
        order_id: orderId,
      });
      if (response && response.data) {
        alert('Payment verified');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      let sessionId = await getSessionId();
      console.log(sessionId);

      let checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: '_self',
      };
      cashfree.checkout(checkoutOptions);

      verifyPayment(orderId);
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <>
      <h1>CashFree Payment Gateway</h1>
      <div>
        <button onClick={handleClick}>Pay Now</button>
      </div>
      <Link to="/success">Go to Success Page</Link>
    </>
  );
}

function SuccessPage() {
  return (
    <div>
      <h1>Payment Successful!</h1>
      <Link to="/">Go Back to Payment</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaymentPage />} />
        <Route path="/order-status/:order_id" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;

