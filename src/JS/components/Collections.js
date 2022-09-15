import React from 'react'

export default function Collections() {
  return (
    <>
        <div className="py-[89px] pl-[100px] pr-[38px]">
          
          <h2 className="workspace-titles">Koleksiyonlar</h2>
          <div className="flex flex-wrap flex-row">
            <div className="col-card flex-1">
              <div className="card">
                <button className="dlt-btn">
                  <i className="fa-solid fa-xmark"></i>
                </button>
                <div className="card-bg" />
                <div className="col-content">
                  <h4>AkatronAkatron 1</h4>
                </div>
              </div>
            </div>
            <div className="col-card flex-1">
              <div className="card">
                <button className="dlt-btn">
                  <i className="fa-solid fa-xmark"></i>
                </button>
                <div className="card-bg" />
                <div className="col-content">
                  <h4>Akatron 2</h4>
                </div>
              </div>
            </div>
            <div className="col-card flex-1">
              <div className="card">
                <button className="dlt-btn">
                  <i className="fa-solid fa-xmark"></i>
                </button>
                <div className="card-bg" />
                <div className="col-content">
                  <h4>Akatron 3</h4>
                </div>
              </div>
            </div>
            <div id="addCollection" className="col-card add flex-1 xsm:grow-0">
              <div className="card">
                <div className="col-content">
                  <i className="fas fa-plus" style={{fontSize: '60px', color: 'var(--platinium)'}} />
                </div>
              </div>
            </div>
          </div>

          <hr className="hrCols"></hr>

          <h2 className="workspace-titles">Klasörler</h2>

          <div className="flex flex-wrap flex-row">
            
            <div className="fold-card flex-1">
              <div className="card">
                <button className="dlt-btn">
                  <i className="fa-solid fa-xmark"></i>
                </button>
                <div className="card-bg fold-bg"></div>
                <div className="col-content fold-content">
                  <h5>Klasör 1</h5>
                </div>
              </div>
            </div>
            
            <div id="addFolder" className="fold-card add flex-1 xsm:grow-0">
              <div className="card">
                <div className="col-content">
                  <i className="fas fa-plus" style={{fontSize: '60px', color: 'var(--platinium)'}} />
                </div>
              </div>
            </div>
          </div>

          <hr className="hrCols"></hr>

          <h2 className="workspace-titles">Sayfalar</h2>

          <div className="flex flex-wrap flex-row">
            
            <div className="fold-card flex-1">
              <div className="card">
                <button className="dlt-btn">
                  <i className="fa-solid fa-xmark"></i>
                </button>
                <div className="card-bg file-bg"></div>
                <div className="col-content fold-content">
                  <h5>Sayfa 1</h5>
                </div>
              </div>
            </div>
            
            <div id="addFile" className="fold-card add flex-1">
              <div className="card">
                <div className="col-content">
                  <i className="fas fa-plus" style={{fontSize: '60px', color: 'var(--platinium)'}} />
                </div>
              </div>
            </div>
          </div>


        </div>
    
    
    </>
  )
}
