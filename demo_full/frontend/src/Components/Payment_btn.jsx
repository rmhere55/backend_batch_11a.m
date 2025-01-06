import axios from "axios"
import { useEffect } from "react"


const Payment_btn = () => {
    useEffect(()=>{
  axios.get('https://example.com/api/endpoint')
    }, [])
  return (
    <div> 
        <button className="btn btn-primary">Pay Now</button>

    </div>
  )
}

export default Payment_btn