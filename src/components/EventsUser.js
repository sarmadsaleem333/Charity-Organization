import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
export default function EventsUser() {
  const navigate=useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      return 

    }
    else {
      navigate("/login_user")
    }
  }, [])
  return (
    <div>EventsUser</div>
  )
}
