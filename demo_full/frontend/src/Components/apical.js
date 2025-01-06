// import { useEffect, useState } from 'react'
//  import axios from 'axios'
import './App.css'
import Checkout from './service/cashfreeservise'


function apical() {
  // const [Jokes, setJokes] = useState([])

  // useEffect( ()=>{
  //   axios.get('/api/jokes')
  //   .then(response => {
  //     setJokes(response.data)
  //     })
  //   .catch((err)=>{
  //     console.log(err)
  //   })
  // })
  return (
    <>
    <h1>
      api call
    </h1>
    {/* <p> Jokes :- {Jokes.length}</p>
    {
      Jokes.map((joke) => (
        <div key={joke.id}>
          <h3> {joke.title}</h3> 
          <p>{joke.joke}</p>
          </div>
      ))
    } */}
    <Checkout/>

    
    </>
  )
}

export default apical
