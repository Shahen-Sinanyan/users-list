import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import "./component/main/style.css";
import "./component/searching/style.css";
import "./component/usersList/style.css";
import "./component/singleUser/style.css";
import "./component/addUser/style.css";
import { usersData } from "./data";

import Main from "./component/main/main";
import AddUser from "./component/addUser/addUser";
import SingleUser from "./component/singleUser/singleUser";

function App() {
  useEffect(() => {
    function addToLocalStorage() {
      if (localStorage.getItem("usersList") === null) {
        localStorage.setItem("usersList", JSON.stringify(usersData));
      }
    }
    addToLocalStorage();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/addUser" element={<AddUser />}></Route>
        <Route path="/user/:name" element={<SingleUser />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
