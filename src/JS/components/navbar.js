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
              <button onClick={newbtn} onBlur={newbtn_act} className="nav-btn"><i className="fas fa-plus" /></button>
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
              <button id="menu-btn" onClick={menu_page}  className="nav-btn border-r-0 border-l"><i className="fa-solid fa-bars"></i></button>
            </div>
          </nav>

      </div>
    </header>

    <div id='new_elm_list' className="absolute top-11 w-48 bg-earie_black shadow-dropdown z-10 -translate-y-48 transition duration-300">
      <button className='new-elm'>&nbsp;<i className="far fa-file-alt" aria-hidden="true"></i> &nbsp;Yeni Sayfa</button>
      <button className='new-elm'>&nbsp;<i className="fas fa-columns" aria-hidden="true"></i> &nbsp;Yeni Panel</button>
     </div>

      <div id='menu_page' className="absolute top-11 w-48 bg-earie_black shadow-dropdown z-10 transition -translate-y-48 duration-300 right-0">
        <button className="avatar new-elm flex items-center">
          <div className="h-full mask mask-squircle">
            <img src="https://placeimg.com/192/192/people" />
          </div>
          &nbsp; Hakan Temur
        </button>
        <label className="swap swap-rotate new-elm items-center justify-end flex transition duration-500">
          <input type="checkbox" />
          <i className="fa-solid fa-sun swap-on fill-current"></i>
          <i className="fa-solid fa-moon swap-off fill-current"></i>
          &nbsp; Tema Değiştir
        </label>
        <button className='new-elm'>&nbsp;<i className="fas fa-columns" aria-hidden="true"></i> &nbsp;Çıkış Yap</button>
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

const newbtn_act = () => {
  var new_elm_list = document.getElementById("new_elm_list");

  if(new_elm_list.classList.contains('-translate-y-0')) {
    new_elm_list.classList.toggle("-translate-y-0");
  }
};

const save_page = () => {
    
};