import { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";

function SingleUser() {
  const users = useAppSelector((state) => state.users.usersData) || [];
  const [user, setUser] = useState<any>({});
  const { name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(users.find((user) => user.name === name));
  }, []);
  return (
    <div className="globalDiv">
      <div className="userCard">
        <div>
          <h2>{user.name}</h2>
          <p>
            <span>phone</span>: {user.phone}
          </p>
          <p>
            <span>email</span>: {user.email}
          </p>
          <p>
            <span>country</span>: {user.country}
          </p>
          <p>
            <span>numberrange</span>: {user.numberrange}
          </p>
        </div>
        <button className='backBtn' onClick={() => navigate("/")}>Back</button>
      </div>
    </div>
  );
}

export default SingleUser;
