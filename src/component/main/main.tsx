import React from "react";
import { useEffect, useRef, useState } from "react";

import UsersList from "../usersList/usersList";
import Searching from "../searching/seraching";

import { useNavigate } from "react-router-dom";
import { TUsersList, User, TSortMethod } from "../../types";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {localStorageUsers} from '../../features/users/usersSlice';

function Main() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(localStorageUsers())
    },[])
  const navigate = useNavigate();
  function handleBtn() {
    navigate("/addUser");
  }

  return (
    <div className="main_global_div">
      <h1>Users List</h1>
      <Searching />
      <UsersList />
      <button className="addBtn" onClick={handleBtn}>Add User</button>
    </div>
  );
}
export default Main;
