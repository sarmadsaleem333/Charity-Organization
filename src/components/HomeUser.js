import React, { useEffect } from 'react'
import Cover from './Cover'
import Cards from './Cards'
import { useNavigate } from 'react-router-dom'

export default function HomeUser() {
  const navigate=useNavigate();
  useEffect(() => {
    if(localStorage.getItem("token")){
      return
    }
    else{
      navigate("/login_user")
    }
  }, [])
  
  return (
    <div><Cover />
      <Cards />
    </div>
  )
}
