import { Cashfree } from "cashfree-pg"; 

Cashfree.XClientId = "TEST430329ae80e0f32e41a393d78b923034";
Cashfree.XClientSecret = "TESTaf195616268bd6202eeb3bf8dc458956e7192a85";
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

export const  createorder = async()=>{

    var request = {
        "order_amount": 1.00,
        "order_currency": "INR",
        "order_id": "order_"+ Date.now(),
        "customer_details": {
            "customer_id": "devstudio_user",
            "customer_phone": "8474090589"
        },
        "order_meta": {
            "return_url": "https://www.cashfree.com/devstudio/preview/pg/web/popupCheckout?order_id={order_id}",
                    "payment_methods": "cc,dc,upi"
        }
    };
    
     const response   = await Cashfree.PGCreateOrder("2023-08-01", request)
    // .then((response) => {
    //     // console.log('Order created successfully:',response.data );
        return response.data.payment_session_id;
  
    // })
    // .catch((error) => {
    //     console.error('Error:', error.response.data.message);
    // });
    

}


 





