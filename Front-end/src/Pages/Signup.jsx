import React, { useState } from "react";
import Heading from "./components/Heading";
import SubHeading from "./components/SubHeading";
import InputBox from "./components/InputBox";
import { Button } from "./components/Button";
import BottomWarning from "./components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      console.log(firstname, lastname, password, email);
      const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      });
      console.log(res.data);
      navigate("/signin");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter Your information to create an account"} />
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
              setEmail(e.target.value);
            }}
            placeholder={"vishal@gmail.com"}
            label={"email"}
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
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
