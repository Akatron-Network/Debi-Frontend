import React , { useContext , useEffect , useState } from 'react'
import { ModalContext } from '../context'
import Data from '../../libraries/categories/Data';

export default function DataModalList() {
  const modal_data = useContext(ModalContext);

  useEffect(() => {
    getList();
  }, [])

  const [modalList, setModalList] = useState([]);

  const getList = async () => {
    let resp = await Data.getModalList();
    console.log(resp)

    setModalList(resp.Data.owned_models);
  }

  const openModal = (modal_type) => { //!Önizleme için gerekiyor
    setTimeout(() => {
      let review_btn = document.getElementById('closeModalBtn');
      let review = document.getElementById('review');
      let tblReview = document.getElementById('tableReview');
      
      var review_btn_crd = review_btn.getBoundingClientRect();

      setTimeout(() => {
    
        let review_crd = review.getBoundingClientRect();
        review.style.height = (review_btn_crd.top - review_crd.top - 8) +'px';
    
      }, 1);
    
      setTimeout(() => {
      
        let review_crd = review.getBoundingClientRect();
        tblReview.style.height = (review_crd.height - 16) + 'px';
    
      }, 2);
  
    }, 200);

    if(modal_data.modalChecked === true) {
      modal_data.setModalChecked(false);
    } else {
      modal_data.setModalChecked(true);
    }

    modal_data.setModalType(modal_type);

  }
  return (
    <>
      <div className='hrLine'>
        <div id="workspace-title" className="workspace-title mt">
          <span className="workspace-text">Veri Modelleri</span>
        </div>
      </div>

      <div className='my-4'>

        {modalList.map((list) => (<label key={list.model_id} htmlFor="datamodal" className="btn tree-elm px-3" onClick={() => openModal(list)}><i className="fa-solid fa-chart-line mr-2 p-[5px]"></i>{list.model_name}</label>))}
        <label htmlFor="datamodal" className="btn tree-elm px-3 text-sea_green hover:text-green_pantone" onClick={() => openModal("new")}><i className="fa-solid fa-plus mr-2 p-[5px]"></i>Yeni Veri Modeli Ekle</label>
      </div>
    </>
  )
}
