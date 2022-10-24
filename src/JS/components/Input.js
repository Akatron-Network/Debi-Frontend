import React from 'react'

export default function Input(props) {
  return (
    <div className="form-control mb-2">
      <div className="input-group shadow-md">
        <span className='bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%] xl:truncate'>{props.value}</span>
        <input type="text" placeholder={props.value + " girin"} className="input my-0 input-bordered !rounded-r w-full h-auto" ref={props.refName} />
      </div>
    </div>
  )
}
