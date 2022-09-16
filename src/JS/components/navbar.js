import React from 'react'
import debi_logo from '../../img/icon2.png';
import { Button, Paper, Text, Group, CloseButton } from '@mantine/core';

export default function Navbar() {

  return (
    
   <>
    <header className="shadow-navbar bg-black_light w-full fixed top-0 right-0 left-0 z-50">
      <div className="mx-auto items-center grid grid-cols-5">

          <nav id='nav-left' className="col-span-2 flex items-center text-base">
            <div className="tooltip tooltip-bottom" data-tip="Öğe Oluştur">
              <button id="new_btn" onClick={newbtn} className="nav-btn"><i className="fas fa-plus" /></button>
            </div>

            <button id="page-btn" className="nav-btn w-60 flex items-center justify-between">
              <span id="page-name">Ana Sayfa</span>
              <i className="fa-solid fa-chevron-down"></i>
            </button>
          </nav>


          <div className="col-span-1 items-center flex justify-center">
            <img className='h-11 max-h-11' src={debi_logo} alt='DeBI Logo' />
          </div>

          <nav id='nav-right' className="col-span-2 flex items-center text-base justify-end">
            <div className="tooltip tooltip-bottom" data-tip="Kaydet">
              <button id="save-page-btn" onClick={save_page} className="nav-btn border-r-0 border-l"><i className="fa-solid fa-floppy-disk"></i></button>
            </div>
            <div className="tooltip tooltip-bottom" data-tip="Menü">
              <button id="menu-btn" onClick={menu_page} className="nav-btn border-r-0 border-l"><i className="fa-solid fa-bars"></i></button>
            </div>
          </nav>

      </div>
    </header>

    <div id='new_elm_list' className="absolute top-11 w-48 bg-earie_black shadow-dropdown z-10 -translate-y-48 transition duration-300">
      <button className='new-elm'>&nbsp;<i className="far fa-file-alt" aria-hidden="true"></i> &nbsp;Yeni Sayfa</button>
      <button className='new-elm'>&nbsp;<i className="fas fa-columns" aria-hidden="true"></i> &nbsp;Yeni Panel</button>
     </div>

      <div id='menu_page' className="absolute top-11 w-64 bg-earie_black shadow-dropdown z-10 transition -translate-y-48 duration-300 right-0">
        <button className="avatar new-elm flex items-center border-b border-solid border-hr_gray">
          <div className="h-full mask mask-squircle w-1/5">
            <img src="https://placeimg.com/192/192/people" />
          </div>
          <span className='w-4/5 truncate pl-2'>
            Hakan Temur
          </span>
        </button>
        <label className="swap swap-rotate new-elm items-center justify-start flex transition duration-500">
          <input type="checkbox" />
          <i className="fa-solid fa-sun swap-on fill-current w-1/5 text-center text-lg"></i>
          <i className="fa-solid fa-moon swap-off fill-current absolute text-center translate-x-[15px] text-lg"></i>
          <span className='w-4/5 pl-2'>Açık/Koyu Tema</span>
        </label>
        <button className='new-elm'><i className="fa-solid fa-right-from-bracket w-1/5 text-center text-lg"></i><span className='w-4/5 pl-2'>Çıkış Yap</span></button>
        
      </div>

   </>

  )
}


const newbtn = () => {
  var new_elm_list = document.getElementById("new_elm_list");
  new_elm_list.classList.toggle("-translate-y-0");
};

const menu_page = () => {
  var menu_page = document.getElementById("menu_page");
  menu_page.classList.toggle("-translate-y-0");
    
};

const save_page = () => {
    
};

window.addEventListener('click', function(e){
  var menu_page = document.getElementById("menu_page");
  var menu_btn = document.getElementById("menu-btn");
  var new_btn = document.getElementById("new_btn");
  var new_elm_list = document.getElementById("new_elm_list");

  if (!menu_page.contains(e.target) && !menu_btn.contains(e.target)){
    menu_page.classList.remove("-translate-y-0");
  }

  if (!new_btn.contains(e.target)){
    new_elm_list.classList.remove("-translate-y-0");
  }
});