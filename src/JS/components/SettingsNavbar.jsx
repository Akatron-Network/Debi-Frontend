import React , { useEffect, useRef } from 'react'
import { Link, useNavigate } from "react-router-dom";
import debi_logo from '../../img/icon2.png';
import Service from '../libraries/categories/Service'

export default function Navbar(props) {
  var navigate = useNavigate();

  useEffect(() => {
    document.addEventListener('click' , clickOutside , true)

    return () => { //?Remove when component closed
      document.removeEventListener('click' , clickOutside , true)
    }
  }, [])

  
  const refNew = useRef(null);
  const refMenu = useRef(null);

  const clickOutside = (e) => {
    // let new_elm_list = document.getElementById("new_elm_list");
    let menu_page = document.getElementById("menu_page");
    
    // new_elm_list.classList.remove("!-translate-y-0");
    menu_page.classList.remove("!-translate-y-0");

    if(refNew.current.contains(e.target)) { //? Click inside
      // new_elm_list.classList.toggle("!-translate-y-0");
    }
    else if(refMenu.current.contains(e.target)) { //? Click inside
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

          <nav id='nav-left' className="col-span-2 flex items-center text-base">
            <div className="tooltip tooltip-bottom" data-tip="Öğe Oluştur">
              <label id="new_btn" ref={refNew} htmlFor="chart_choose" className={"nav-btn cursor-pointer items-center " + props.new_btn}><i className="fas fa-plus" /></label>
            </div>

            <button id="page-btn" className={"nav-btn w-60 flex items-center justify-between " + props.page_btn}>
              <span id="page-name">Ana Sayfa</span>
              <i className="fa-solid fa-chevron-down"></i>
            </button>
          </nav>


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

    {/* <div id='new_elm_list' className="fixed top-11 w-48 bg-earie_black shadow-dropdown z-10 -translate-y-48 transition duration-300">
      <button className='new-elm'>&nbsp;<i className="far fa-file-alt" aria-hidden="true"></i> &nbsp;Yeni Sayfa</button>
      <label className='new-elm items-center inline-flex cursor-pointer' htmlFor="chart_choose">&nbsp;<i className="fas fa-columns" aria-hidden="true"></i>&nbsp;&nbsp;Yeni Panel</label>
    </div> */}

    <div id='menu_page' className="fixed top-11 w-64 bg-earie_black shadow-dropdown rounded-l rounded-tl-none z-10 transition -translate-y-48 duration-300 right-0">
      <Link className="avatar new-elm flex items-center border-b border-solid border-hr_gray" to="/ayarlar">
        <i className="fa-solid fa-user w-1/5 text-center text-lg ml-[-1px]"></i>
        <span className='w-4/5 truncate pl-2'>Hesap Bilgileri</span>
      </Link>
      {/*
        <label className="swap swap-rotate new-elm items-center justify-start flex transition duration-500">
          <input type="checkbox" />
          <i className="fa-solid fa-sun swap-on fill-current w-1/5 text-center text-lg"></i>
          <i className="fa-solid fa-moon swap-off fill-current absolute text-center translate-x-[15px] text-lg"></i>
          <span className='w-4/5 pl-2'>Açık/Koyu Tema</span>
        </label>
      */}
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
