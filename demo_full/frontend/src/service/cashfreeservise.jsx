import { load } from "@cashfreepayments/cashfree-js";
import axios from "axios";
import { useEffect  } from "react";

function Checkout() {
    // const [sessionId, setSessionId] = useState({});
    // useEffect( ()=>{
        
    // },[])
    var cashfree;

    useEffect(() => {
        async function initializeSDK() {
            try {
                cashfree = await load({ mode: "sandbox" });
                console.log("Cashfree SDK initialized");
            } catch (error) {
                console.error("Error initializing Cashfree SDK:", error);
            }
        }
        initializeSDK();
    }, []);


    // let cashfree;
    // var initializeSDK = async function () {          
    //     cashfree = await load({
    //         mode: "sandbox"
    //     });
    // }
    // initializeSDK();

    const doPayment = async () => {
      const response = await  axios.get('/api/create-order')
        // .then(response => {
        //     setSessionId(response.data.payment_session_id)
        //     })
        //   .catch((err)=>{
        //     console.log(err)
        //   })
        console.log(response.data)
        let checkoutOptions = {
            paymentSessionId: response.data.payment_session_id,
            redirectTarget: "_self",
        };

        cashfree.checkout(checkoutOptions)

    };

    return (
        <div className="row">
            <p>Click below to open the checkout page in current tab</p>
            <button type="submit" className="btn btn-primary" id="renderBtn" onClick={doPayment}>
                Pay Now
            </button>
        </div>
    );
}
export default Checkout;