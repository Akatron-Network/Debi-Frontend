import React , { useRef } from 'react'
import ParticlesComponent from '../components/ParticlesComponent'
import debi_logo from '../../img/ico.png';
import axios from 'axios';

export default function LoginPage() {

  const change = () => { //? Login Page Style
    
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

  const nicknameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passRef = useRef(null);
  const passAgainRef = useRef(null);
  

  const register = async () => {

    console.log(nicknameRef.current.value)
    console.log(emailRef.current.value)
    console.log(phoneRef.current.value)
    console.log(passRef.current.value)
    console.log(passAgainRef.current.value)

    
      // try {
      //   let resp = await axios.post('http://93.180.133.185:8000/api/functions/service/register/',
      //     {
      //       username: "Hakan",
      //       password: "123456",
      //       details: { email: "hakantemur63@gmail.com" }
      //     })
      //   console.log(resp);
      // }
      // catch (err) {
      //   console.log(err.response.data)
      // }
      
    }

  const login = async () => {
    console.log('login')

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
              <input className='input placeholder:opacity-50 w-3/4' type="text" placeholder="Kullanıcı Adı*" ref={nicknameRef} />
              <input className='input placeholder:opacity-50 w-3/4' type="email" placeholder="Email*" ref={emailRef} />
              <input className='input placeholder:opacity-50 w-3/4' type="tel" placeholder="Telefon (Zorunlu Değil)" ref={phoneRef} />
              <input className='input placeholder:opacity-50 w-3/4' type="password" placeholder="Şifre*" ref={passRef} />
              <input className='input placeholder:opacity-50 w-3/4' type="password" placeholder="Şifre Tekrar*" ref={passAgainRef} />
              <button className='button mt-2' onClick={register}>Kayıt Ol</button>
            </form>
          </div>
          <div className="form-container left-0 w-1/2 z-2" id='sign-in-container'>
            <form className='form' action="#">
              <h1 className='font-bold m-0 text-[2.5rem]'>Giriş Yap</h1>
              {/* <a href="#" className="social giris-a"><i className="fab fa-google-plus-g" /></a> */}
              {/* <span className='text-xs'>ya da hesabını kullanabilirsin</span> */}
              <input className='input placeholder:opacity-50 w-3/4' type="email" placeholder="Kullanıcı Adı" />
              <input className='input placeholder:opacity-50 w-3/4' type="password" placeholder="Şifre" />
              <a className='giris-a hover:text-sea_green' href="#">Şifreni mi unuttun?</a>
              <button className='button' onClick={login}>GİRİŞ YAP</button>
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