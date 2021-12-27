import React,{useEffect} from 'react'
import {Route, Routes, useNavigate } from 'react-router-dom'
import UserList from './UserList';
import EditUser from '../Public/signUp';
import Navbar from '../Navbar';

function User() {
    const navigate=useNavigate()
    useEffect(()=>{
        navigate('userList')
    },[])
    return ( <>
          <Navbar/>
        <Routes>
            <Route path="/userList" element={<UserList/>}/>
            <Route path="/editUser/:id" element={<EditUser/>} />
        </Routes>
    
    </> );
}

export default User;