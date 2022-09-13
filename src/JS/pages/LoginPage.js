import React from 'react'
import ParticlesComponent from '../components/ParticlesComponent'
import debi_logo from '../../img/ico.png';

export default function LoginPage() {
  return (
    <>
      <ParticlesComponent />

      <div className='flex flex-col items-center justify-center bg-darkest_jet h-screen overflow-hidden'>
        <div className="shadow-loginContainer rounded-lg relative overflow-hidden w-[768px] max-w-full min-h-[480px] bg-darker_jet" id="container">
          <div className="form-container left-0 w-1/2 opacity-0 z-1" id='sign-up-container'>
            <form className='form' action="#">
              <h1 className='font-bold m-0 text-[2.5rem]'>Hesap Oluştur</h1>
              <div className="mx-0 my-5">
                <a href="#" className="social giris-a"><i className="fab fa-google-plus-g" /></a>
              </div>
              <span className='text-xs'>ya da kayıt olmak için kendi email adresini kullanabilirsin</span>
              <input className='input' type="text" placeholder="Ad-Soyad" />
              <input className='input' type="email" placeholder="Email" />
              <input className='input' type="password" placeholder="Şifre" />
              <button className='button' style={{marginTop: '8px'}}>Kayıt Ol</button>
            </form>
          </div>
          <div className="form-container left-0 w-1/2 z-2" id='sign-in-container'>
            <form className='form' action="#">
              <h1 className='font-bold m-0 text-[2.5rem]'>Giriş Yap</h1>
              <div className="social-container">
                <a href="#" className="social giris-a"><i className="fab fa-google-plus-g" /></a>
              </div>
              <span className='text-xs'>ya da hesabını kullanabilirsin</span>
              <input className='input' type="email" placeholder="Email" />
              <input className='input' type="password" placeholder="Şifre" />
              <a className='giris-a hover:text-sea_green' href="#">Şifreni mi unuttun?</a>
              <button className='button'>GİRİŞ YAP</button>
            </form>
          </div>
          <div className="absolute top-0 w-1/2 left-1/2 h-full overflow-hidden transition-transform ease-in-out duration-700 z-[100]" id='overlay-container'>
            <div className="bg-gradient-to-r from-green_pantone to-cadmium_green bg-no-repeat bg-cover text-platinium relative -left-full h-full w-[200%] translate-x-0 transition-transform duration-700" id='overlay'>
              <div className="overlay-panel" id='overlay-left'>
                <img src={debi_logo} alt="Debisis Logo" className="logo" />
                <h1 className="logo-title">Debisis</h1>
                <p className="logo-text">Detaylı Bilgi Sistemi</p>
                <button className="ghost button" onClick={() => signUp('left')}>GİRİŞ YAP</button>
              </div>
              <div className="overlay-panel right-0 translate-x-0" id='overlay-right'>
                <img src={debi_logo} alt="Debisis Logo" className="logo" />
                <h1 className="logo-title">Debisis</h1>
                <p className="logo-text">Detaylı Bilgi Sistemi</p>
                <button className="ghost button" onClick={() => signUp('right')}>Kayıt Ol</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    
  )
}


const signUp = (id) => {

  const signInContainer = document.getElementById('sign-in-container');
  const signUpContainer = document.getElementById('sign-up-container');
  const overlayContainer = document.getElementById('overlay-container');
  const overlay = document.getElementById('overlay');
  const overlayLeft = document.getElementById('overlay-left');
  const overlayRight = document.getElementById('overlay-right');

    if(id === 'right') {
      signInContainer.classList.add("translate-x-[100%]");
      signUpContainer.classList.add("signUp-right-panel-active");
      overlayContainer.classList.add("-translate-x-[100%]");
      overlay.classList.add("translate-x-[50%]");
      overlayLeft.classList.add("translate-x-0");
      overlayRight.classList.add("translate-x-[20%]");

    }
    else if(id === 'left') {
      signInContainer.classList.remove("translate-x-[100%]");
      signUpContainer.classList.remove("signUp-right-panel-active");
      overlayContainer.classList.remove("-translate-x-[100%]");
      overlay.classList.remove("translate-x-[50%]");
      overlayLeft.classList.remove("translate-x-0");
      overlayRight.classList.remove("translate-x-[20%]");

    }

}