import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Dashboard from "./Pages/Dashboard";
import { SendMoney } from "./Pages/SendMoney";
import Update from "./Pages/Update";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/send" element={<SendMoney />}></Route>
          <Route path="/send" element={<SendMoney />}></Route>
          <Route path="/update" element={<Update />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
