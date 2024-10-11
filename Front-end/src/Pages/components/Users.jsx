import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";


function Users() {

    const [filter, setFilter] = useState('')
    const [users, setUsers] = useState([])
  

    useEffect(()=>{
      const fetchUser = async ()=>{
        console.log(filter)

        try {
          const token = localStorage.getItem('token')
          const res = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`,{
            headers : {
              Authorization : `Bearer ${token}`
            }
          })
          console.log(res.data)
          setUsers(res.data.user)
          
        } catch (error) {
          console.log(error)
        }
      }

      fetchUser()
      
    },[filter])

    

  return <div className="px-4">
    <div className="font-bold mt-6 text-lg"> 
        Users
    </div>
    <div className="my-2">
        <input className="w-full px-2 py-2 my-2 border rounded border-slate-200" type="text" placeholder="Search users..." onChange={(e)=>{
            setFilter(e.target.value)
        }} />
    </div>
    <div>{users.map((user)=>(<User key={user._id} user = {user}/>))}</div>
  </div>;
}

function User({ user }) {
  const navigate = useNavigate()
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2 ">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstname[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {user.firstname} {user.lastname}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <Button onClick={(e)=>{
           navigate("/send?id=" + user._id + "&name=" + user.firstname);
        }} label= {"Send Money"} />
      </div>
    </div>
  );
}

export default Users;
