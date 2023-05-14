import React, { useEffect } from 'react'
import DragResizePanels from '../components/DragResizePanels'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import Service from '../libraries/categories/Service';

export default function PanelsPage() {
  //! LOGIN CHECK ----------------------------------
  var navigate = useNavigate();

  const loginControl = async () => {
    try {
      let tkn = await Service.getProfile()

      let tutorial = JSON.stringify(tkn.Data.User.details.tutorial)
      localStorage.setItem("Tutorial", tutorial)

    } catch (error) {
      
      navigate("/giris")
    }
  }

  useEffect(() => {
    if (localStorage.Token !== undefined) { loginControl() }
    else { navigate("/giris") }
  }, [])
  //! --------------------------------------------

  return (
    <>
        <Navbar />
        <DragResizePanels />
    </>
  )
}
