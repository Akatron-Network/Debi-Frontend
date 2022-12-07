import React , { useContext , useEffect } from 'react'
import { UnionDataModalContext , ModalContext } from '../context'

export default function DataModalList() {
  const modal_data = useContext(ModalContext);

  useEffect(() => {
    modal_data.getList();
    modal_data.getUnions();
  }, [])

  const openModal = (modal_type) => { //!Önizleme için gerekiyor
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
  
    }, 200);

    if(modal_data.modalChecked !== true) {
      modal_data.setModalChecked(true);
    }

    modal_data.setModalType(modal_type);
    console.log(modal_type)
  }

  const openUnionModal = (modal_type) => { //!Önizleme için gerekiyor
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

    // if(modal_data.modalChecked !== true) {
    //   modal_data.setModalChecked(true);
    // }

    // modal_data.setModalType(modal_type);
    // console.log(modal_type)
  }

  return (
    <>
      <div className='hrLine'>
        <div id="workspace-title" className="workspace-title mt">
          <span className="workspace-text">Veri Modelleri</span>
        </div>
      </div>

      <div className='my-4'>

        {modal_data.modalList.map((list , index) => (
          <div className='mb-1' key={index}>
            <div className='tree-elm pl-3'>
              <label htmlFor="datamodal" className="w-[200px] cursor-pointer truncate flex items-center" onClick={() => openModal(list)}><i className="fa-solid fa-chart-line mr-2 p-[5px]"></i>{list.model_name}</label>
              <i className="fa-solid fa-xmark tree-cursor absolute right-3 mr-0 hover:text-danger_light" onClick={() => modal_data.deleteModel(list.model_id)}></i>
            </div>
          </div>
        ))}
        <label htmlFor="datamodal" className="btn tree-elm px-3 text-sea_green hover:text-green_pantone" onClick={() => openModal("new")}><i className="fa-solid fa-plus mr-2 p-[5px]"></i>Yeni Veri Modeli Ekle</label>
        
        <hr className="my-3 border-1 w-4/5 relative left-1/2 -translate-x-1/2 border-hr_gray" />

        {modal_data.unionList.map((list , index) => (
          <div className='mb-1' key={index}>
            <div className='tree-elm pl-3'>
              <label htmlFor="default" className="w-[200px] cursor-pointer truncate flex items-center" onClick={() => openUnionModal(list)}><i className="fa-solid fa-diagram-project mr-2 p-[5px]"></i>{list.union_name}</label>
              <i className="fa-solid fa-xmark tree-cursor absolute right-3 mr-0 hover:text-danger_light" onClick={() => modal_data.deleteUnion(list.union_id)}></i>
            </div>
          </div>
        ))}
        <label htmlFor="unionmodal" className="btn tree-elm px-3 text-sea_green hover:text-green_pantone" onClick={() => openUnionModal("new")}><i className="fa-solid fa-plus mr-2 p-[5px]"></i>Yeni Birleşik Model Ekle</label>
      </div>
    </>
  )
}
