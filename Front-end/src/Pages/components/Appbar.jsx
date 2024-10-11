import React from "react";
import { useNavigate } from "react-router-dom";

function Appbar() {
  const navigate = useNavigate()
  const name = localStorage.getItem('name')
  return (
    <div className=" shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">PaytM App</div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">{name}</div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl"
          onClick={()=>{
            navigate('/update')
          }}
          >{name[0]}</div>
        </div>
      </div>
    </div>
  );
}

export default Appbar;
