import React, { useEffect, useState } from 'react'
import Appbar from './components/Appbar'
import Balance from './components/Balance'
import Users from './components/Users'
import axios from 'axios'

function Dashboard() {
  const [balance , setBalance] = useState(0)
  useEffect(() => {
    const token = localStorage.getItem('token')

    try {
      const fetchbalance = async () => {
        const res = await axios.get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res)
        setBalance(res.data.balance)
      };
  
      fetchbalance()
      
    } catch (error) {

      console.log(error)
      
    }
  },[]);
  return (
    <div>
        <Appbar/>
        <Balance value={balance.toFixed(2)}/>
        <Users/>
    </div>
  )
}

export default Dashboard