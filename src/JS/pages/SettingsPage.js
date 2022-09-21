import React from 'react'
import Navbar from '../components/Navbar'
import Pricing from '../components/Pricing'

import avatar from '../../img/ico.png'

export default function SettingPage() {
  return (
    <>
      <Navbar />

      <div className="container mx-auto mt-20 mb-12 h-fit w-[75%] ">
        <div className='grid grid-cols-3 gap-2'>

          <div className="bg-black_light rounded-md col-span-3 md:col-span-1 min-w-[192px] inline text-center p-4 h-fit">
            <img className="m-auto rounded-full w-1/2 mb-2" src={avatar} alt="Avatar" />
            <h3 className='font-righteous text-2xl text-cadmium_green'>Hakan Temur</h3>
            <h5 className='text-grayXgray'>hakan@akatron.net</h5>
            <h5 className='text-grayXgray pt-8'>Paket Bitiş Tarihi: <span className='text-platinium p-1 bg-cadmium_green rounded-md'>03.09.1997</span></h5>
          </div>

          <div className="bg-black_light rounded-md shadow-filepath p-3 col-span-3 md:col-span-2 min-w-[192px]">
            <h3 className='font-righteous text-2xl text-cadmium_green pl-1'>Kullanıcı Bilgileri</h3>
            <div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-2 pt-2 pb-3'>
              <div className="form-control w-full min-w-[170px]">
                <label className="label">
                  <span className="label-text">Kullanıcı Adı</span>
                </label>
                <input type="text" placeholder="Kullanıcı adı girin" className="input input-bordered w-full placeholder:opacity-50" />
              </div>
              <div className="form-control w-full min-w-[170px]">
                <label className="label">
                  <span className="label-text">Şifre</span>
                </label>
                <input type="text" placeholder="Şifre girin" className="input input-bordered w-full placeholder:opacity-50" />
              </div>
              <div className="form-control w-full min-w-[170px]">
                <label className="label">
                  <span className="label-text">Ad-Soyad</span>
                </label>
                <input type="text" placeholder="Ad-Soyad girin" className="input input-bordered w-full placeholder:opacity-50" />
              </div>
              <div className="form-control w-full min-w-[170px]">
                <label className="label">
                  <span className="label-text">Ünvan</span>
                </label>
                <input type="text" placeholder="Ünvan girin" className="input input-bordered w-full placeholder:opacity-50" />
              </div>
              <div className="form-control w-full min-w-[170px]">
                <label className="label">
                  <span className="label-text">Departman</span>
                </label>
                <input type="text" placeholder="Departman girin" className="input input-bordered w-full placeholder:opacity-50" />
              </div>
            </div>

            <h3 className='font-righteous text-2xl text-cadmium_green pl-1'>İletişim</h3>
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-2 pt-2">
              <div className="form-control w-full min-w-[170px]">
                <label className="label">
                  <span className="label-text">Telefon-1</span>
                </label>
                <input type="text" placeholder="Telefon-1 girin" className="input input-bordered w-full placeholder:opacity-50" />
              </div>
              <div className="form-control w-full min-w-[170px]">
                <label className="label">
                  <span className="label-text">Telefon-2</span>
                </label>
                <input type="text" placeholder="Telefon-2 girin" className="input input-bordered w-full placeholder:opacity-50" />
              </div>
              <div className="form-control w-full min-w-[170px]">
                <label className="label">
                  <span className="label-text">Mail</span>
                </label>
                <input type="text" placeholder="E-mail adresi girin" className="input input-bordered w-full placeholder:opacity-50" />
              </div>
              <div className="form-control w-full min-w-[170px]">
                <label className="label">
                  <span className="label-text">Adres</span>
                </label>
                <input type="text" placeholder="Adres girin" className="input input-bordered w-full placeholder:opacity-50" />
              </div>
            </div>
              <div className="mt-1 float-right">
                <button className='font-righteous bg-onyx mr-3 p-2 rounded-md text-grayXgray transition-all duration-300 hover:bg-onyx_light hover:text-platinium'>Sıfırla</button>
                <button className='font-righteous bg-cadmium_green p-2 rounded-md text-grayXgray transition-all duration-300 hover:bg-green_pantone hover:text-platinium'>Uygula</button>
              </div>
          </div>

        </div>
        
      </div>

      <Pricing />


    </>
  )
}
