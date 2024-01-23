import React, { useContext } from 'react'
import { BaseURLContext } from './AuthContext'
import { NavLink, useNavigate } from 'react-router-dom'
import LoginCard from '../pages/LoginPage'

const PrivateRoute = ({children}) => {
    const token  = localStorage.getItem('token')
    const navigate = useNavigate()
    
     if(token){
        return children
     }
     else{
        return <LoginCard/>
     }
}

export default PrivateRoute
