import React from "react";
import { useRef, useState } from "react";

import { TUsersList, User, TSortMethod } from "../../types";

import { setSortedUsers } from "../../features/users/usersSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { useNavigate } from "react-router-dom";
import up from "../../assets/up.png";
import down from "../../assets/down.png";

function UsersList() {
  const sortedUsers = useAppSelector((state) => state.users.sortedUsers) || [];
  const status = useAppSelector((state) => state.users.status);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [sortMethod, setSortMethod] = useState<TSortMethod>({
    byName: false,
    byEmail: false,
    fromUp: true,
    fromDown: false,
  });

  const nameRef = useRef<HTMLTableHeaderCellElement>(null);
  const numberrangeRef = useRef<HTMLTableHeaderCellElement>(null);

  const sortByName = () => {
    if (!sortMethod.byName) {
      setSortMethod({
        byName: true,
        byEmail: false,
        fromDown: false,
        fromUp: true,
      });
    }
    let names = sortedUsers.map((user) => user.name).sort();
    if (sortMethod.fromDown) {
      names = names.reverse();
      setSortMethod((prev) => ({ ...prev, fromDown: false, fromUp: true }));
    } else if (sortMethod.fromUp) {
      setSortMethod((prev) => ({ ...prev, fromDown: true, fromUp: false }));
    }
    const result: any = names.map((name) => {
      //type???
      return sortedUsers.find((user) => user.name === name);
    });
    dispatch(setSortedUsers(result));
  };

  const sortByEmail = () => {
    if (!sortMethod.byEmail) {
      setSortMethod({
        byName: false,
        byEmail: true,
        fromDown: false,
        fromUp: true,
      });
    }
    let emails = sortedUsers.map((user) => user.email).sort();
    if (sortMethod.fromDown) {
      emails = emails.reverse();
      setSortMethod((prev) => ({ ...prev, fromDown: false, fromUp: true }));
    } else if (sortMethod.fromUp) {
      setSortMethod((prev) => ({ ...prev, fromDown: true, fromUp: false }));
    }
    const result: any = emails.map((email) => {
      //type???
      return sortedUsers.find((user) => user.email === email);
    });
    dispatch(setSortedUsers(result));
  };

  const handleSingleUser = (name: string) => {
    navigate(`/user/${name}`);
  };

  return (
    <main>
      {status === "loading" ? (
        <h2>...Loading</h2>
      ) : (
        <table>
          <thead>
            <tr className="tr">
              <th onClick={sortByName} className='active'>
                name{" "}
                <img
                  src={sortMethod.byName ? (sortMethod.fromUp ? up : down) : ""}
                  className='arrow'
                />
              </th>
              <th>phone</th>
              <th onClick={sortByEmail} className='active'>
                email{" "}
                <img
                  src={
                    sortMethod.byEmail ? (sortMethod.fromUp ? up : down) : ""
                  }
                  className='arrow'
                />
              </th>
              <th>country</th>
              <th>numberrange</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => {
              return (
                <tr
                  key={user.phone + user.name}
                  onClick={() => handleSingleUser(user.name)}
                  className="tr"
                >
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.country}</td>
                  <td>{user.numberrange}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default UsersList;
