import React , { useContext , useEffect } from 'react'
import { MainContext, ModalContext } from '../context'

export default function DataModalList() {
  const modal_data = useContext(ModalContext);
  const { funcLoadForSpesific, toastCreator, modelPageJoyrideClickStart,} = useContext(MainContext);

  useEffect(() => {
    funcLoadForSpesific("loadingScreenSidebar", "errorScreenSidebar", modal_data.getList);
    funcLoadForSpesific("loadingScreenSidebar", "errorScreenSidebar", modal_data.getUnions);
  }, [])

  const openModal = (modal_type, type) => { //!Önizleme için gerekiyor

    setTimeout(() => {
      let review_btn = document.getElementById('closeModalBtn');
      let review = document.getElementById('review');
      let tblReview = document.getElementById('tableReview');
      
      var review_btn_crd = review_btn.getBoundingClientRect();

      setTimeout(() => {
    
        let review_crd = review.getBoundingClientRect();
        review.style.height = (review_btn_crd.top - review_crd.top - 8) +'px';
    
      }, 10);
    
      setTimeout(() => {
      
        let review_crd = review.getBoundingClientRect();
        tblReview.style.height = (review_crd.height - 16) + 'px';
    
      }, 20);

      setTimeout(() => {
        toastCreator(modelPageJoyrideClickStart, "Model oluşturma ekranındaki tüm özellikleri keşfetmek için öğreticiyi çalıştırın!")
      }, 30);
  
    }, 200);

    if(modal_data.modalChecked !== true) {
      modal_data.setModalChecked(true);
    }

    modal_data.setModalType(modal_type);

    if (type === "public") { modal_data.setPublicCheck(true) }
    else { modal_data.setPublicCheck(false) }
  }

  const openUnionModal = (union_type) => { //!Önizleme için gerekiyor
    setTimeout(() => {
      let review_btn = document.getElementById('closeUnionModalBtn');
      let review = document.getElementById('unionReview');
      let tblReview = document.getElementById('unionTableReview');
      
      var review_btn_crd = review_btn.getBoundingClientRect();

      setTimeout(() => {
    
        let review_crd = review.getBoundingClientRect();
        review.style.height = (review_btn_crd.top - review_crd.top - 8) +'px';
    
      }, 10);
    
      setTimeout(() => {
      
        let review_crd = review.getBoundingClientRect();
        tblReview.style.height = (review_crd.height - 16) + 'px';
    
      }, 20);
  
    }, 200);

    if (union_type !== "new") {
      if (modal_data.unionEditChecked !== true) {
        modal_data.setUnionEditChecked(true);
        modal_data.setUnionInformations(union_type);
      }
    }
  }

  return (
    <>
      <div className='hrLine'>
        <div id="workspace-title" className="workspace-title items-center">
          <i className="fa-solid fa-chart-simple mr-2"></i>
          <span className="workspace-text">Veri Modelleri</span>
        </div>
      </div>

      <div className='my-4'>

        <div className='flex pl-[0.7rem] w-[94%] mt-4'>
					<h1 className='text-graysix'>Veri Modelleri</h1>
					<hr className="my-3 ml-2 border-1 w-[53%] border-onyx" />
				</div>

        {modal_data.modalList.map((list , index) => (
          <div className='mb-1' key={index}>
            <div className='tree-elm pl-3'>
              <label htmlFor="datamodal" className="w-[200px] cursor-pointer truncate flex items-center" onClick={() => openModal(list, "basic")}><i className="fa-solid fa-chart-line mr-2 p-[5px]"></i>{list.model_name}</label>
              <i className="fa-solid fa-xmark tree-cursor absolute right-3 mr-0 hover:text-red-600" onClick={() => funcLoadForSpesific("loadingScreenSidebar", "errorScreenSidebar", modal_data.deleteModel, list.model_id)}></i>
            </div>
          </div>
        ))}
        <label htmlFor="datamodal" className="btn tree-elm px-3 text-sea_green hover:text-green_pantone" onClick={() => openModal("new")}><i className="fa-solid fa-plus mr-2 p-[5px]"></i>Yeni Veri Modeli Ekle</label>
        
				<div className='flex pl-[0.7rem] w-[94%] mt-4'>
					<h1 className='text-graysix'>Birleşik Modeller</h1>
					<hr className="my-3 ml-2 border-1 w-[44%] border-onyx" />
				</div>

        {modal_data.unionList.map((list , index) => (
          <div className='mb-1' key={index}>
            <div className='tree-elm pl-3'>
              <label htmlFor="unionmodal" className="w-[200px] cursor-pointer truncate flex items-center" onClick={() => openUnionModal(list)}><i className="fa-solid fa-diagram-project mr-2 p-[5px]"></i>{list.union_name}</label>
              <i className="fa-solid fa-xmark tree-cursor absolute right-3 mr-0 hover:text-red-600" onClick={() => funcLoadForSpesific("loadingScreenSidebar", "errorScreenSidebar", modal_data.deleteUnion, list.union_id)}></i>
            </div>
          </div>
        ))}
        <label htmlFor="unionmodal" className="btn tree-elm px-3 text-sea_green hover:text-green_pantone" onClick={() => openUnionModal("new")}><i className="fa-solid fa-plus mr-2 p-[5px]"></i>Yeni Birleşik Model Ekle</label>
      
				<div className='flex pl-[0.7rem] w-[94%] mt-4'>
					<h1 className='text-graysix'>Hazır Modeller</h1>
					<hr className="my-3 ml-2 border-1 w-[50%] border-onyx" />
				</div>

        {modal_data.publicModalList.map((list , index) => (
          <div className='mb-1' key={index}>
            <div className='tree-elm pl-3'>
              <label htmlFor="datamodal" className="w-[200px] cursor-pointer truncate flex items-center" onClick={() => openModal(list, "public")}>
                <i className="fa-solid fa-chart-line mr-2 p-[5px]"></i>
                {list.model_name}
                <span className='text-xs text-onyx_light'>&nbsp; ({list.db_scheme_id})</span>
              </label>
              {/* <i className="fa-solid fa-xmark tree-cursor absolute right-3 mr-0 hover:text-red-600" onClick={() => modal_data.deleteModel(list.model_id)}></i> */}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
