import React from 'react'

export default function Filepath() {
  return (
    <>
    <div id="file_path_top" className="w-[calc(100%_-_70px)] h-[45px] top-11 left-[70px] absolute px-5 bg-shadow_green shadow-filepath">
        <button id="file-path_top_text" className="file-path-top-text">
            Akatron Network
        </button>

        <button className=" file-path-top-text" style={{pointerEvents: 'none'}}>
            <i className="fas fa-angle-right" />
        </button>

        <button id="file-path_top_text" className="file-path-top-text">
            FrontEnd
        </button>

        <button className=" file-path-top-text" style={{pointerEvents: 'none'}}>
            <i className="fas fa-angle-right" />
        </button>

        <button id="file-path_top_text" className="file-path-top-text">
            madafaka.js
        </button>
    </div>
    
    </>
  )
}
