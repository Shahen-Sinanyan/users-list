import React from "react";
import { useState, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { setSortedUsers } from "../../features/users/usersSlice";

import { TUsersList, User } from "../../types";

function Searching() {
  const users = useAppSelector((state) => state.users.usersData) || [];
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState<string>("");
  const [searched, setSearched] = useState<User[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    searchAmongUsers();
  }, [inputValue]);

  useEffect(() => {
    inputRef.current!.focus();
  }, []);
  const searchAmongUsers = () => {
    let trimedValue = inputValue.trim().toLowerCase();
    let result: TUsersList = [];
    if (trimedValue) {
      result = users.filter((user) =>
        user.name.toLowerCase().includes(trimedValue)
      );
    }
    setSearched(result);
  };
  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleGo = () => {
    dispatch(setSortedUsers(searched));
    setInputValue("");
  };

  return (
    <div className="searchBlockMainDiv">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => handleInputValue(e)}
        className="searchInput"
        placeholder="Search by name"
      />
      <button
        onClick={handleGo}
        disabled={inputValue.trim() ? false : true}
        className="goBtn"
      >
        Go!
      </button>
      {!!searched.length && (
        <div className="serchList">
          {searched.map((user) => {
            return (
              <div key={user.phone + user.name} className="singleSearchUser">
                {user.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Searching;
