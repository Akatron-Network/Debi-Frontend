import React from 'react'

export default function Toast(props) {
  return (
    <div id='toast' className="toast p-6 z-[10000] translate-x-[500px] transition-all duration-300">
      <div className="alert alert-info !rounded bg-cadmium_green text-normal shadow-card text-platinium text-base w-[330px]">
        <div className='flex flex-col gap-2'>
          <span className='tracking-wide'>{props.text}</span>
          <div className='w-full text-right text-md'>
            <button className='mr-2 gray-btn bg-transparent text-side_black border-none shadow-none hover:bg-transparent hover:text-platinium' onClick={() => props.dlt()}>Kapat</button>
            <button className='gray-btn bg-side_black hover:bg-darker_jet text-platinium' onClick={() => props.func()}>Öğreticiyi Çalıştır</button>
          </div>
        </div>
      </div>
    </div>
  )
}
