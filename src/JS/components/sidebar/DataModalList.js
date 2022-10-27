import React from 'react'

export default function DataModalList() {

  const review = () => { //!Önizleme için gerekiyor
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

  }
  return (
    <>
      <div className='hrLine'>
        <div id="workspace-title" className="workspace-title mt">
          <span className="workspace-text">Veri Modelleri</span>
        </div>
      </div>

      <div className='my-4'>

        <label htmlFor="datamodal" className="btn tree-elm px-3"><i className="fa-solid fa-chart-line mr-2 p-[5px]" onClick={review}></i>Veri Modeli 1</label>
        {/* DATA MODELİ AÇMAK İÇİN BU BUTONU YERLEŞTİRDİK  */}
        <label htmlFor="datamodal" className="btn tree-elm px-3 text-sea_green hover:text-green_pantone" onClick={review}><i className="fa-solid fa-plus mr-2 p-[5px]"></i>Yeni Veri Modeli Ekle</label>
      </div>
    </>
  )
}
