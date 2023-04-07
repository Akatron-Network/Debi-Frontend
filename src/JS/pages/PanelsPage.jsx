import React, { useEffect } from 'react'
import DragResizePanels from '../components/DragResizePanels'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';

export default function PanelsPage() {
  //! LOGIN CHECK ----------------------------------
  var navigate = useNavigate();

  const loginControl = async () => {
    try {
      let tkn = await Service.getProfile()
    } catch (error) {
      console.log(error);
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
