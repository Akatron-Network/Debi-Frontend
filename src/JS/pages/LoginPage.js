import React , { useRef } from 'react'
import { useNavigate } from "react-router-dom";
import ParticlesComponent from '../components/ParticlesComponent'
import debi_logo from '../../img/ico.png';

import Service from '../libraries/categories/Service';

export default function LoginPage() {

  const cheackWarn = () => {
    
    let warnArr = [1 , 2 , 3]
    for(var id of warnArr) {

      if(!(document.getElementById('warn_' + id).classList.contains('hidden'))){
        document.getElementById('warn_' + id).classList.add('hidden');
      }

    }
  }

  const change = () => { //? Login Page Style

    cheackWarn();
    
    let signInContainer = document.getElementById('sign-in-container');
    let signUpContainer = document.getElementById('sign-up-container');
    let overlayContainer = document.getElementById('overlay-container');
    let overlay = document.getElementById('overlay');
    let overlayLeft = document.getElementById('overlay-left');
    let overlayRight = document.getElementById('overlay-right');

    signInContainer.classList.toggle("translate-x-[100%]");
    signUpContainer.classList.toggle("signUp-right-panel-active");
    overlayContainer.classList.toggle("-translate-x-[100%]");
    overlay.classList.toggle("translate-x-[50%]");
    overlayLeft.classList.toggle("translate-x-0");
    overlayRight.classList.toggle("translate-x-[20%]");
  }


  var navigate = useNavigate();
  
  const register_nicknameRef = useRef(null);
  const register_emailRef = useRef(null);
  const register_phoneRef = useRef(null);
  const register_passRef = useRef(null);
  const register_passAgainRef = useRef(null);
  
  const register = async () => {

    //* IF Control for empty inputs
    if (register_nicknameRef.current.value === '' || register_emailRef.current.value === '' || register_passRef.current.value === '' || register_passAgainRef.current.value === '') {
      
      document.getElementById('warn_1').classList.remove('hidden');
    }
    else {
      await Service.register(register_nicknameRef.current.value , register_emailRef.current.value , register_phoneRef.current.value , register_passRef.current.value)
      navigate("/");
    }
      
  }


  const login_nicknameRef = useRef(null);
  const login_passRef = useRef(null);
  var navigate = useNavigate();

  const login = async () => {

    //* IF Control for empty inputs
    if (login_nicknameRef.current.value === '' || login_passRef.current.value === '') {
      document.getElementById('warn_2').classList.remove('hidden');
    }
    else {

      let loginans = await Service.login(login_nicknameRef.current.value , login_passRef.current.value)

      if (loginans === false) {
        document.getElementById('warn_2').classList.add('hidden');
        document.getElementById('warn_3').classList.remove('hidden');
      }
      else {
        
        navigate("/");

      }

    }

  }


  return (
    <>
      <ParticlesComponent />

      <div className='flex flex-col items-center justify-center bg-darkest_jet h-screen overflow-hidden'>
        <div className="shadow-loginContainer h-[60%] rounded relative overflow-hidden w-[768px] max-w-full min-h-[480px] bg-darker_jet" id="container">
          <div className="form-container left-0 w-1/2 opacity-0 z-1" id='sign-up-container'>
            <form className='form' action="#">
              <h1 className='font-bold m-0 text-[2.5rem]'>Hesap Oluştur</h1>
              {/* <a href="#" className="social giris-a"><i className="fab fa-google-plus-g" /></a>
              <span className='text-xs'>ya da kayıt olmak için kendi email adresini kullanabilirsin</span> */}
              <input className='input placeholder:opacity-50 w-3/4' type="text" placeholder="Kullanıcı Adı*" ref={register_nicknameRef} />
              <input className='input placeholder:opacity-50 w-3/4' type="email" placeholder="Email*" ref={register_emailRef} />
              <input className='input placeholder:opacity-50 w-3/4' type="tel" placeholder="Telefon (Zorunlu Değil)" ref={register_phoneRef} />
              <input className='input placeholder:opacity-50 w-3/4' type="password" placeholder="Şifre*" ref={register_passRef} />
              <input className='input placeholder:opacity-50 w-3/4' type="password" placeholder="Şifre Tekrar*" ref={register_passAgainRef} />
              <div id='registerWarns'>
                <span id='warn_1' className='text-sm text-red-600 hidden'>Lütfen tüm gerekli bilgileri doldurun!</span>
              </div>
              <button className='button mt-2' onClick={register}>Kayıt Ol</button>
            </form>
          </div>
          <div className="form-container left-0 w-1/2 z-2" id='sign-in-container'>
            <form className='form' action="#">
              <h1 className='font-bold m-0 text-[2.5rem]'>Giriş Yap</h1>
              {/* <a href="#" className="social giris-a"><i className="fab fa-google-plus-g" /></a> */}
              {/* <span className='text-xs'>ya da hesabını kullanabilirsin</span> */}
              <input className='input placeholder:opacity-50 w-3/4' type="email" placeholder="Kullanıcı Adı" ref={login_nicknameRef} />
              <input className='input placeholder:opacity-50 w-3/4' type="password" placeholder="Şifre" ref={login_passRef} />
              <div id='loginWarns'>
                <span id='warn_2' className='text-sm text-red-600 hidden'>Lütfen tüm bilgileri doldurun!</span>
                <span id='warn_3' className='text-sm text-red-600 hidden'>Kullanıcı adı ya da şifre yanlış!</span>
              </div>
              {/* <a className='giris-a hover:text-sea_green' href="#">Şifreni mi unuttun?</a> */}
              <button className='button mt-2' onClick={login}>GİRİŞ YAP</button>
            </form>
          </div>
          <div className="absolute top-0 w-1/2 left-1/2 h-full overflow-hidden transition-transform ease-in-out duration-700 z-[100]" id='overlay-container'>
            <div className="bg-gradient-to-r from-green_pantone to-cadmium_green bg-no-repeat bg-cover text-platinium relative -left-full h-full w-[200%] translate-x-0 transition-transform duration-700" id='overlay'>
              <div className="overlay-panel" id='overlay-left'>
                <img src={debi_logo} alt="Debisis Logo" className="logo" />
                <h1 className="logo-title">Debisis</h1>
                <p className="logo-text">Detaylı Bilgi Sistemi</p>
                <button className="ghost button" onClick={change}>GİRİŞ YAP</button>
              </div>
              <div className="overlay-panel right-0 translate-x-0" id='overlay-right'>
                <img src={debi_logo} alt="Debisis Logo" className="logo" />
                <h1 className="logo-title">Debisis</h1>
                <p className="logo-text">Detaylı Bilgi Sistemi</p>
                <button className="ghost button" onClick={change}>Kayıt Ol</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
    
  )
}

