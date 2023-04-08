import React , { useEffect, useRef } from 'react'
import { Link, useNavigate } from "react-router-dom";
import debi_logo from '../../img/icon2.png';
import ChartChoose from './panels/ChartChoose';
import Service from '../libraries/categories/Service'

export default function Navbar(props) {
  var navigate = useNavigate();

  useEffect(() => {
    document.addEventListener('click' , clickOutside , true)

    return () => { //?Remove when component closed
      document.removeEventListener('click' , clickOutside , true)
    }
  }, [])

  
  const refMenu = useRef(null);

  const clickOutside = (e) => {
    let menu_page = document.getElementById("menu_page");
    
    menu_page.classList.remove("!-translate-y-0");

    if(refMenu.current.contains(e.target)) { //? Click inside
      menu_page.classList.toggle("!-translate-y-0");
    }
  }
  
  const logout = async () => {
    let resp = await Service.logout();

    navigate("/giris");
  }

  return (
    
   <>
    <header className="shadow-navbar bg-black_light w-full fixed top-0 right-0 left-0 z-50">
      <div className="mx-auto items-center grid grid-cols-5">

          <nav id='nav-left' className="col-span-2 flex items-center text-base"></nav>


          <div className="col-span-1 items-center flex justify-center">
            <button>
              <a href="/"><img className='h-11 max-h-11' src={debi_logo} alt='DeBI Logo' /></a>
            </button>
          </div>

          <nav id='nav-right' className="col-span-2 flex items-center text-base justify-end">
            <div className="tooltip tooltip-bottom" data-tip="Menü">
              <button id="menu-btn" ref={refMenu} className={"nav-btn border-r-0 border-l items-center " + props.menu_btn}><i className="fa-solid fa-bars"></i></button>
            </div>
          </nav>

      </div>
    </header>

    <ChartChoose />

    <div id='menu_page' className="fixed top-11 w-64 bg-earie_black shadow-dropdown rounded-l rounded-tl-none z-10 transition -translate-y-48 duration-300 right-0">
      <Link className="avatar new-elm flex items-center border-b border-solid border-hr_gray" to="/ayarlar">
        <i className="fa-solid fa-user w-1/5 text-center text-lg ml-[-1px]"></i>
        <span className='w-4/5 truncate pl-2'>Hesap Bilgileri</span>
      </Link>
      <a>
        <button className='new-elm rounded-l rounded-tl-none' onClick={logout}>
          <i className="fa-solid fa-right-from-bracket w-1/5 text-center text-lg"></i>
          <span className='w-4/5 pl-2'>Çıkış Yap</span>
        </button>
      </a>
    </div>

   </>

  )
}
