import React from "react";
import {useState} from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setSortedUsers } from "../../features/users/usersSlice";

import {useNavigate} from 'react-router-dom';

import {User} from '../../types';
function AddUser() {
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [email,setEmail] = useState('');
    const [country,setCountry] = useState('');
    const [numberrange,setNumberrange] = useState(0);

    const dispatch = useAppDispatch();
    const sortedUsers = useAppSelector(state => state.users.sortedUsers);
    const allUsers = useAppSelector(state => state.users.usersData);

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/')
    }

    const handleSubmit = () => {
        const newUser:User = {
            name,
            phone,
            email,
            country,
            numberrange,
        }
        switch ('') {
            case (name.trim()): {
                return alert('fill all inputs');
            }
            case (phone.trim()): {
                return alert('fill all inputs');
            }
            case (email.trim()): {
                return alert('fill all inputs');
            }
            case (country.trim()): {
                return alert('fill all inputs');
            }
            
        }
       const newUsersList = [...allUsers,newUser];
       dispatch(setSortedUsers(newUsersList));
       localStorage.setItem('usersList', JSON.stringify(newUsersList));
       handleCancel();
    }
    
  return (
    <div className="globalAddDiv">
      <div className="secondGlobDiv">
        <h2>New User</h2>
        <div className="inputsParent">
          <input value = {name} onChange={(e)=> setName(e.target.value)} type='text' placeholder="name" />
          <input value = {phone} onChange={(e)=> setPhone(e.target.value)} type='text' placeholder="phone" />
          <input value = {email} onChange={(e)=> setEmail(e.target.value)} type='email' placeholder="email" />
          <input value = {country} onChange={(e)=> setCountry(e.target.value)} type='text' placeholder="country" />
          <input value = {numberrange} onChange={(e)=> setNumberrange(+e.target.value)} type='number' placeholder="numberrange" />
        </div>
        <div className="buttonsParent">
          <button  className='button' onClick={handleCancel}>cancel</button>
          <button className='button' onClick={handleSubmit}>submit</button>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
