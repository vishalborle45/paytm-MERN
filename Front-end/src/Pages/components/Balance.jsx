import axios from "axios";
import React, { useEffect } from "react";

function Balance({ value }) {

  return (
    <div className="flex px-4 pt-2">
      <div className="font-bold text-lg">Your Balance</div>
      <div className=" font-medium ml-4 text-lg">Rs {value}</div>
    </div>
  );
}

export default Balance;
