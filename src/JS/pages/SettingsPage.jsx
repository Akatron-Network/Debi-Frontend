import React, { useRef, useEffect, useState } from 'react'
import SettingsNavbar from '../components/SettingsNavbar'
import Pricing from '../components/Pricing'
import avatar from '../../img/ico.png'
import Service from '../libraries/categories/Service'

export default function SettingPage() {

  const userNicknameRef = useRef("")
  const userPasswordRef = useRef("")
  const userNameRef = useRef("")
  const userSurnameRef = useRef("")
  const userTitleRef = useRef("")
  const userDepartmentRef = useRef("")
  const userPhoneIRef = useRef("")
  const userPhoneIIRef = useRef("")
  const userEmailRef = useRef("")
  const userAddressRef = useRef("")

  const [key, setKey] = useState(false)

  const [userInfJSON, setUserInfJSON] = useState(
    {
      details: {
        username: "",
        name: "",
        surname: "",
        email: "",
        title: "",
        department: "",
        phone: "",
        phone2: "",
        address: "",
        city: "",
        province: "",
        portalcode: "",
        country: ""
      }
    }
  )

  useEffect(() => {
    getUserInformations();
  }, [])

  const getUserInformations = async () => {

    let resp = await Service.getProfile();
    let user = resp.Data.User;

    userNicknameRef.current.value = user.details.username
    userNameRef.current.value = user.details.name
    userSurnameRef.current.value = user.details.surname
    userTitleRef.current.value = user.details.title
    userDepartmentRef.current.value = user.details.department
    userPhoneIRef.current.value = user.details.phone
    userPhoneIIRef.current.value = user.details.phone2
    userEmailRef.current.value = user.details.email
    userAddressRef.current.value = user.details.address

    setUserInfJSON({
      details: user.details
    })
  }

  const applyInformations = async (e) => {
    e.preventDefault();

    if (userEmailRef.current.value === "") {
      checkWarn(2)
      return;
    }

    let last_info = {
      details: {
        name:  userNameRef.current.value,
        surname:  userSurnameRef.current.value,
        email:  userEmailRef.current.value,
        title:  userTitleRef.current.value,
        department:  userDepartmentRef.current.value,
        phone:  userPhoneIRef.current.value,
        phone2:  userPhoneIIRef.current.value,
        address:  userAddressRef.current.value,
        city:  "",
        province:  "",
        portalcode:  "",
        country:  "",
      }
    };

    if (key === false) {
      setUserInfJSON(last_info)

    } else {

      last_info["password"] = userPasswordRef.current.value
      setUserInfJSON(last_info)
    }

    console.log(last_info)
    let resp = await Service.postProfile(last_info);
    console.log(resp);
    
    checkWarn(1)
  }

  const userKeyOpenClose = (e) => {
    setKey(!key);
    e.preventDefault();
  }

  const checkWarn = (id) => {
    let warnArr = [1, 2]

    for (let w of warnArr) {
      document.getElementById('userWarn_' + w).classList.add('hidden');
    }

    document.getElementById('userWarn_' + id).classList.remove('hidden');

    setTimeout(() => {
      document.getElementById('userWarn_' + id).classList.add('hidden');
    }, 10000);
  }
  console.log(userInfJSON);

  return (
    <>
      <SettingsNavbar new_btn={"hidden"} page_btn={"hidden"} />

      <div className="container mx-auto mt-20 mb-12 h-fit w-[75%] ">
        <div className='grid grid-cols-3 gap-2'>

          <div className="bg-black_light rounded col-span-3 md:col-span-1 min-w-[192px] inline text-center p-4 h-fit">
            <img className="m-auto rounded-full w-1/2 mb-2" src={avatar} alt="Avatar" />
            <h3 className='font-righteous text-2xl text-cadmium_green'>{(userInfJSON.details.name === undefined ? "" : userInfJSON.details.name) + " " + (userInfJSON.details.surname === undefined ? "" : userInfJSON.details.surname)}</h3>
            <h4 className='text-grayXgray'>{userInfJSON.details.title === undefined ? "" : userInfJSON.details.title}</h4>
            {/* <h5 className='text-onyx_light text-sm'>{userInfJSON.details.email === undefined ? "" : userInfJSON.details.email}</h5> */}
            {/* <h5 className='text-grayXgray pt-8'>Paket Bitiş Tarihi: <span className='text-platinium p-1 bg-cadmium_green rounded'>03.09.1997</span></h5> */}
          </div>

          <form className="bg-black_light rounded shadow-filepath p-3 col-span-3 md:col-span-2 min-w-[192px]">
            <h3 className='font-righteous text-2xl text-cadmium_green pl-1'>Kullanıcı Bilgileri</h3>
            <div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-2 pt-2 pb-3'>
              <div className="form-control w-full min-w-[170px]">
                <label className="label">
                  <span className="label-text">Kullanıcı Adı</span>
                </label>
                <input type="text" placeholder="Kullanıcı adı girin" className="input input-bordered w-full opacity-30 pointer-events-none" ref={userNicknameRef} />
              </div>
              <div className="form-control w-full min-w-[170px]">
                <label className="label">
                  <span className="label-text">Şifre <span className='text-xs text-onyx_light'>(Kilit kapalıyken girilen şifre kaydedilmez)</span></span>
                </label>
                <div className="input-group shadow-md">
                  {key === false ?
                    <>
                    <input type="password" placeholder="********" className="input input-bordered w-full opacity-30 pointer-events-none" ref={userPasswordRef} />
                    <button onClick={(e) => userKeyOpenClose(e)} className='bg-black_light text-grayXgray my-2 hover:text-platinium hover:bg-middle_black transition duration-300 !rounded-l-none border border-jet_mid justify-center w-[13%] xl:truncate'>
                      <i className="fa-solid fa-lock"></i>
                    </button>
                    </>
                    :
                    <>
                    <input type="password" placeholder="Şifre girin" className="input input-bordered w-full" ref={userPasswordRef} />
                    <button onClick={(e) => userKeyOpenClose(e)} data-tip="Çalışma Alanı" className='bg-black_light text-grayXgray my-2 hover:text-platinium hover:bg-middle_black transition duration-300 !rounded-l-none border border-jet_mid justify-center w-[13%] xl:truncate'>
                      <i className="fa-solid fa-lock-open"></i>
                    </button>
                    </>
                  }
                  
                </div>
              </div>
              <div className="form-control w-full min-w-[170px]">
                <label className="label">
                  <span className="label-text">İsim</span>
                </label>
                <input type="text" defaultValue="" placeholder="İsim girin" className="input input-bordered w-full" ref={userNameRef} />
              </div>
              <div className="form-control w-full min-w-[170px]">
                <label className="label">
                  <span className="label-text">Soyisim</span>
                </label>
                <input type="text" defaultValue="" placeholder="Soyisim girin" className="input input-bordered w-full" ref={userSurnameRef} />
              </div>
              <div className="form-control w-full min-w-[170px]">
                <label className="label">
                  <span className="label-text">Ünvan</span>
                </label>
                <input type="text" placeholder="Ünvan girin" className="input input-bordered w-full" ref={userTitleRef} />
              </div>
              <div className="form-control w-full min-w-[170px]">
                <label className="label">
                  <span className="label-text">Departman</span>
                </label>
                <input type="text" placeholder="Departman girin" className="input input-bordered w-full" ref={userDepartmentRef} />
              </div>
            </div>

            <h3 className='font-righteous text-2xl text-cadmium_green pl-1'>İletişim</h3>
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-2 pt-2">
              <div className="form-control w-full min-w-[170px]">
                <label className="label">
                  <span className="label-text">Telefon-1</span>
                </label>
                <input type="text" placeholder="Telefon-1 girin" className="input input-bordered w-full" ref={userPhoneIRef} />
              </div>
              <div className="form-control w-full min-w-[170px]">
                <label className="label">
                  <span className="label-text">Telefon-2</span>
                </label>
                <input type="text" placeholder="Telefon-2 girin" className="input input-bordered w-full" ref={userPhoneIIRef} />
              </div>
              <div className="form-control w-full min-w-[170px]">
                <label className="label">
                  <span className="label-text">Mail<span className='text-red-500'>*</span></span>
                </label>
                <input type="text" placeholder="E-mail adresi girin" className="input input-bordered w-full" ref={userEmailRef} />
              </div>
              <div className="form-control w-full min-w-[170px]">
                <label className="label">
                  <span className="label-text">Adres</span>
                </label>
                <input type="text" placeholder="Adres girin" className="input input-bordered w-full" ref={userAddressRef} />
              </div>
            </div>
            <h1 id='userWarn_1' className='text-sm text-right p-1 pt-2 hidden text-green-600'>Değişiklikler başarıyla kaydedildi.</h1>
            <h1 id='userWarn_2' className='text-sm text-right p-1 pt-2 hidden text-red-600'>Lütfen gerekli(*) olan tüm bilgileri doldurunuz.</h1>
            <div className="mt-1 float-right">
              <button type='reset' className='gray-btn mr-2'>Sıfırla</button>
              <button type='submit' onClick={(e) => applyInformations(e)} className='green-btn'>Uygula</button>
            </div>
          </form>

        </div>
        
      </div>

      {/* <Pricing /> */}


    </>
  )
}
