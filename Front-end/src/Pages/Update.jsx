import React, { useState } from "react";
import Heading from "./components/Heading";
import SubHeading from "./components/SubHeading";
import InputBox from "./components/InputBox";
import { Button } from "./components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BottomWarning from "./components/BottomWarning";

function Update() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem('token')

  async function handleSubmit() {
    try {
      console.log(firstname, lastname, password);
      const res = await axios.put(
        "http://localhost:3000/api/v1/user/update",
        {
          firstname: firstname,
          lastname: lastname,
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"update info"} />
          <SubHeading label={"Enter Your information to update an account"} />
          <InputBox
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
            placeholder={"vishal"}
            label={"First name"}
          />
          <InputBox
            onChange={(e) => {
              setLastname(e.target.value);
            }}
            placeholder={"borle"}
            label={"Last name"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder={"password"}
            label={"password"}
          />
          <div className="pt-4">
            <Button label={"Sign up"} onClick={handleSubmit} />
          </div>
          <BottomWarning label = {"changed mind"} buttonText = {"Get back"} to ={"/dashboard"}/>
        </div>
      </div>
    </div>
  );
}

export default Update;
