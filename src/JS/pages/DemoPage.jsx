import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Service from '../libraries/categories/Service';
import Loading from '../components/Loading';

export default function DemoPage() {
  var navigate = useNavigate();
  
  useEffect(() => {
    loginDemo()
  }, [])

  const loginDemo = async () => {
    document.getElementById('loadingScreen').checked = true;
    let login = await Service.login("Test" , "debitest")
    
    if (login === false) {
      navigate("/giris") 
    }
    else {
      navigate("/");
    }
    document.getElementById('loadingScreen').checked = false;
  }
  
  return (
    <>
      <Loading />
    </>
  )
}
