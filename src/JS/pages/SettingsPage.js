import React from 'react'
import Navbar from '../components/Navbar'

export default function SettingPage() {
  return (
    <>
      <Navbar />

      <div className="container mx-auto mt-20 h-[300px] w-[70%] sm:w-[80%]">
        <div className='grid grid-cols-3 gap-4'>
          <div className="bg-black_light rounded-md col-span-3 sm:col-span-1 h-24">
            
          </div>

          <div className="bg-black_light rounded-md shadow-filepath p-4 col-span-3 sm:col-span-2  grid lg:grid-cols-2 sm:grid-cols-1 gap-4 min-w-[234px]">
              <div className="form-control w-full min-w-[170px] col-span">
                <label className="label">
                  <span className="label-text">Kullanıcı Adı</span>
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered w-full" />
              </div>
              <div className="form-control w-full min-w-[170px]">
                <label className="label">
                  <span className="label-text">Şifre</span>
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered w-full" />
              </div>
              <div className="form-control w-full min-w-[170px]">
                <label className="label">
                  <span className="label-text">Ad-Soyad</span>
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered w-full" />
              </div>
              <div className="form-control w-full min-w-[170px]">
                <label className="label">
                  <span className="label-text">Mail</span>
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered w-full" />
              </div>
              <div className="form-control w-full min-w-[170px]">
                <label className="label">
                  <span className="label-text">Ünvan</span>
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered w-full" />
              </div>
              <div className="form-control w-full min-w-[170px]">
                <label className="label">
                  <span className="label-text">Departman</span>
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered w-full" />
              </div>
              <div className="form-control w-full min-w-[170px]">
                <label className="label">
                  <span className="label-text">Telefon-1</span>
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered w-full" />
              </div>
              <div className="form-control w-full min-w-[170px]">
                <label className="label">
                  <span className="label-text">Telefon-2</span>
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered w-full" />
              </div>
              <div className="form-control w-full min-w-[170px]">
                <label className="label">
                  <span className="label-text">Adres</span>
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered w-full" />
              </div>
          </div>

        </div>
      </div>


    </>
  )
}
