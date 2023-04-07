import React from 'react'

export default function LoadingForCharts(props) {
  return (
    <>
      <input type="checkbox" id={props.id} className="modal-toggle" />
      <div className="modal bg-modal_back">
        <div className="text-center">
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
          <div className="modal-action justify-center">
            <label htmlFor={props.id} className="gray-btn hidden">Kapat!</label>
          </div>
        </div>
      </div>
    </>
  )
}
