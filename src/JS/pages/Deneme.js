import React from 'react'

export default function Deneme() {
  return (
    <>
    <div>
      <label htmlFor="my-modal-5" onClick={resize} className="btn modal-button">open modal</label>
      
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal bg-modal_back">
        <div className="modal-box max-w-full h-screen p-4 grid grid-cols-5 gap-5 bg-darkest_jet">
          
          <div className="md:col-span-2 col-span-5 bg-middle_black p-3 rounded shadow-md overflow-auto h-full relative">
            
            <div className="form-control">
              <div className="input-group shadow-md">
                <span className='bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[30%]'>Model Adı</span>
                <input type="text" placeholder="Model adı girin" className="input my-0 input-bordered !rounded-r w-full h-auto" />
              </div>
            </div>

            <hr className='my-3 border-1 w-4/5 relative left-1/2 -translate-x-1/2 border-hr_gray'/>

            <div className="form-control">
              <div className="input-group z-30 shadow-md">
                <span className='bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[30%]'>Kaynak Tablo</span>
                <input type="text" onClick={source_table} className="w-full text-left truncate h-auto overflow-hidden input my-0 input-bordered transition duration-300" />
                <button onClick={source_table} className='bg-black_light px-2 py-[7px] !rounded-r border border-jet_mid justify-center min-w-[35px] transition duration-300 hover:bg-side_black hover:text-platinium'><i className="fa-sharp fa-solid fa-chevron-down "></i></button>
              </div>
            </div>
            
            <div id="source_table" className='max-h-[230px] overflow-auto z-20 left-3 right-3 mt-[-5px] w-[calc(100%_-_1.5rem)] bg-black_light shadow-lg rounded absolute border border-jet_mid border-r-0 opacity-0 transition duration-300 -translate-y-16 hidden'>
              <div className="overflow-x-auto rounded">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Job</th>
                      <th>Favorite Color</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>1</th>
                      <td>Cy Ganderton</td>
                      <td>Quality Control Specialist</td>
                      <td>Blue</td>
                    </tr>
                    <tr>
                      <th>2</th>
                      <td>Hart Hagerty</td>
                      <td>Desktop Support Technician</td>
                      <td>Purple</td>
                    </tr>
                    <tr>
                      <th>3</th>
                      <td>Brice Swyre</td>
                      <td>Tax Accountant</td>
                      <td>Red</td>
                    </tr>
                    <tr>
                      <th>3</th>
                      <td>Brice Swyre</td>
                      <td>Tax Accountant</td>
                      <td>Red</td>
                    </tr>
                    <tr>
                      <th>3</th>
                      <td>Brice Swyre</td>
                      <td>Tax Accountant</td>
                      <td>Red</td>
                    </tr>
                    <tr>
                      <th>3</th>
                      <td>Brice Swyre</td>
                      <td>Tax Accountant</td>
                      <td>Red</td>
                    </tr>
                    <tr>
                      <th>3</th>
                      <td>Brice Swyre</td>
                      <td>Tax Accountant</td>
                      <td>Red</td>
                    </tr>
                    <tr>
                      <th>3</th>
                      <td>Brice Swyre</td>
                      <td>Tax Accountant</td>
                      <td>Red</td>
                    </tr>
                    <tr>
                      <th>3</th>
                      <td>Brice Swyre</td>
                      <td>Tax Accountant</td>
                      <td>Red</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div onScroll={wheelResize} className='w-full h-72 bg-darker_jet mt-3 rounded shadow-md relative grid grid-cols-6 grid-flow-row auto-rows-max gap-2 p-2 overflow-auto border border-jet_mid border-r-0'>
              <div onMouseEnter={() => show_info(1 , 'in')} onMouseLeave={() => clearTime(1)} onClick={() => addRelatedTable(1)} id='card_elm_1' className="elm_info_cards">
                <h3 className='truncate'>AAAAAAAAAAAAAAAAAA</h3>
                <h3 className='truncate'>BBBBBBBBBBBBBBBBBB</h3>
                <h3 className='truncate'>CCCCCCCCCCCCCCCCCC</h3>
              </div>

              <div onMouseEnter={() => show_info(2 , 'in')} onMouseLeave={() => clearTime(2)} onClick={() => addRelatedTable(2)} id='card_elm_2' className="elm_info_cards"></div>
              <div onMouseEnter={() => show_info(3 , 'in')} onMouseLeave={() => clearTime(3)} onClick={() => addRelatedTable(3)} id='card_elm_3' className="elm_info_cards"></div>
              <div onMouseEnter={() => show_info(4 , 'in')} onMouseLeave={() => clearTime(4)} onClick={() => addRelatedTable(4)} id='card_elm_4' className="elm_info_cards"></div>
              <div onMouseEnter={() => show_info(5 , 'in')} onMouseLeave={() => clearTime(5)} onClick={() => addRelatedTable(5)} id='card_elm_5' className="elm_info_cards"></div>
              <div onMouseEnter={() => show_info(6 , 'in')} onMouseLeave={() => clearTime(6)} onClick={() => addRelatedTable(6)} id='card_elm_6' className="elm_info_cards"></div>
              <div onMouseEnter={() => show_info(7 , 'in')} onMouseLeave={() => clearTime(7)} onClick={() => addRelatedTable(7)} id='card_elm_7' className="elm_info_cards"></div>
              <div onMouseEnter={() => show_info(8 , 'in')} onMouseLeave={() => clearTime(8)} onClick={() => addRelatedTable(8)} id='card_elm_8' className="elm_info_cards"></div>
              <div onMouseEnter={() => show_info(9 , 'in')} onMouseLeave={() => clearTime(9)} onClick={() => addRelatedTable(9)} id='card_elm_9' className="elm_info_cards"></div>
              <div onMouseEnter={() => show_info(10 , 'in')} onMouseLeave={() => clearTime(10)} onClick={() => addRelatedTable(10)} id='card_elm_10' className="elm_info_cards"></div>
              <div onMouseEnter={() => show_info(11 , 'in')} onMouseLeave={() => clearTime(11)} onClick={() => addRelatedTable(11)} id='card_elm_11' className="elm_info_cards"></div>
              <div onMouseEnter={() => show_info(12 , 'in')} onMouseLeave={() => clearTime(12)} onClick={() => addRelatedTable(12)} id='card_elm_12' className="elm_info_cards"></div>
              <div onMouseEnter={() => show_info(13 , 'in')} onMouseLeave={() => clearTime(13)} onClick={() => addRelatedTable(13)} id='card_elm_13' className="elm_info_cards"></div>
              <div onMouseEnter={() => show_info(14 , 'in')} onMouseLeave={() => clearTime(14)} onClick={() => addRelatedTable(14)} id='card_elm_14' className="elm_info_cards"></div>
              <div onMouseEnter={() => show_info(15 , 'in')} onMouseLeave={() => clearTime(15)} onClick={() => addRelatedTable(15)} id='card_elm_15' className="elm_info_cards"></div>
              <div onMouseEnter={() => show_info(16 , 'in')} onMouseLeave={() => clearTime(16)} onClick={() => addRelatedTable(16)} id='card_elm_16' className="elm_info_cards"></div>
            </div>
            
            <hr className='my-3 border-1 w-4/5 relative left-1/2 -translate-x-1/2 border-hr_gray'/>

            <h1 className='text-xl text-platinium mb-2 drop-shadow-lg'>Seçilen Tablolar</h1>

            <div id="collapses">
              <div tabIndex={0} id='collapse_1' onClick={() => checkbox(1)} className="collapse collapse-plus collapse_extra">

                <input id='checkbox_1' type="checkbox"  className='!min-h-0 !py-2 !px-4' />
                <div className="collapse-title text-base font-medium !min-h-0 !py-2 !px-4 text-grayXgray">
                  Tablo Kolonları - I
                </div>
                
                <div className="collapse-content text-graysix">
                  <div className='table_layout'>
                    <div id='card_elm_1' className="table_col_cards">
                      <h4 className='text-sm'>SUBE_KODU</h4>
                      <span className='text-xs'>İlgili kaydın hangi şube kodunda yapıldığını gösterir.</span>
                    </div>
                    <div id='card_elm_2' className="table_col_cards"></div>
                    <div id='card_elm_3' className="table_col_cards"></div>
                    <div id='card_elm_4' className="table_col_cards"></div>
                    <div id='card_elm_5' className="table_col_cards"></div>
                  </div>
                </div>

              </div>

              <div tabIndex={0} id='collapse_2' onClick={() => checkbox(2)} className="collapse collapse-plus collapse_extra">
                <input id='checkbox_2' type="checkbox" className='!min-h-0 !py-2 !px-4' />
                <div className="collapse-title text-base font-medium !min-h-0 !py-2 !px-4 text-grayXgray">
                  Bas Bana Açılayım - 2
                </div>
                <div className="collapse-content text-graysix">
                  <p>Beni açtın - 2</p>
                </div>
              </div>

              <div tabIndex={0} id='collapse_3' onClick={() => checkbox(3)} className="collapse collapse-plus collapse_extra">
                <input id='checkbox_3' type="checkbox"  className='!min-h-0 !py-2 !px-4' />
                <div className="collapse-title text-base font-medium !min-h-0 !py-2 !px-4 text-grayXgray">
                  Bas Bana Açılayım - 3
                </div>
                <div className="collapse-content text-graysix">
                  <p>Beni açtın - 3</p>
                </div>
              </div>
              
            </div>

          </div>
          

          <div className="md:col-span-3 col-span-5 bg-middle_black p-3 rounded shadow-md relative h-full">
            <p className="">You've been selected for a chance to get one year of subscription to use Wikipedia for free!aaaaaaaaaaaaa aaaaaa</p>
            <div className="bottom-3 right-3 absolute">
              <label htmlFor="my-modal-5" className="gray-btn mr-2">Kapat</label>
              <button className='green-btn'>Kaydet</button>
            </div>
          </div>
          








          <div id='cards_for_info' className='absolute'>
            <div onMouseLeave={() => show_info(1)} onClick={() => addRelatedTable(1)} id="card_s_tbl_1" className='info_cards'>
                <h3 className='truncate'>AAAAAAAAAAAAAAAAAA</h3>
                <h3 className='truncate'>BBBBBBBBBBBBBBBBBB</h3>
                <h3 className='truncate'>CCCCCCCCCCCCCCCCCC</h3>
            </div>
            <div onMouseLeave={() => show_info(2)} onClick={() => addRelatedTable(2)} id="card_s_tbl_2" className='info_cards'></div>
            <div onMouseLeave={() => show_info(3)} onClick={() => addRelatedTable(3)} id="card_s_tbl_3" className='info_cards'></div>
            <div onMouseLeave={() => show_info(4)} onClick={() => addRelatedTable(4)} id="card_s_tbl_4" className='info_cards'></div>
            <div onMouseLeave={() => show_info(5)} onClick={() => addRelatedTable(5)} id="card_s_tbl_5" className='info_cards'></div>
            <div onMouseLeave={() => show_info(6)} onClick={() => addRelatedTable(6)} id="card_s_tbl_6" className='info_cards'></div>
            <div onMouseLeave={() => show_info(7)} onClick={() => addRelatedTable(7)} id="card_s_tbl_7" className='info_cards'></div>
            <div onMouseLeave={() => show_info(8)} onClick={() => addRelatedTable(8)} id="card_s_tbl_8" className='info_cards'></div>
            <div onMouseLeave={() => show_info(9)} onClick={() => addRelatedTable(9)} id="card_s_tbl_9" className='info_cards'></div>
            <div onMouseLeave={() => show_info(10)} onClick={() => addRelatedTable(10)} id="card_s_tbl_10" className='info_cards'></div>
            <div onMouseLeave={() => show_info(11)} onClick={() => addRelatedTable(11)} id="card_s_tbl_11" className='info_cards'></div>
            <div onMouseLeave={() => show_info(12)} onClick={() => addRelatedTable(12)} id="card_s_tbl_12" className='info_cards'></div>
            <div onMouseLeave={() => show_info(13)} onClick={() => addRelatedTable(13)} id="card_s_tbl_13" className='info_cards'></div>
            <div onMouseLeave={() => show_info(14)} onClick={() => addRelatedTable(14)} id="card_s_tbl_14" className='info_cards'></div>
            <div onMouseLeave={() => show_info(15)} onClick={() => addRelatedTable(15)} id="card_s_tbl_15" className='info_cards'></div>
            <div onMouseLeave={() => show_info(16)} onClick={() => addRelatedTable(16)} id="card_s_tbl_16" className='info_cards'></div>
          </div>

        </div>
      </div>
    </div>


    </>
  )
}


window.onresize = () => resize();

function wheelResize() {
  resize();
}

function coordinates(id) {
  let open_card = document.getElementById('card_s_tbl_' + id);
  let card = document.getElementById('card_elm_' + id);
  let card_elm = card.getBoundingClientRect();

  if(id !== 1) {

    if(id % 3 === 1) {
      open_card.style.left = '37px';
    }
    else if((id % 3 === 2)) {
      open_card.style.left = ((1 * card_elm.width) + (1 * 8)) + 37 + 'px' ;
    }
    else if((id % 3 === 0)) {
      open_card.style.left = ((2 * card_elm.width) + (2 * 8)) + 37 + 'px' ;
    }
    
  }
  else { open_card.style.left = '37px' }

  open_card.style.top =  (card_elm.y - 40) + 'px';
  
}

var timer = 0;
function show_info(id , stat) {
  let open_card = document.getElementById('card_s_tbl_' + id);
  let card = document.getElementById('card_elm_' + id);
  
  open_card.classList.add('!bg-middle_black');
  open_card.classList.add('!border-onyx');
  

  if(stat === 'in') {

    timer = setTimeout(function() {

      card.classList.toggle('!z-1');
      open_card.classList.toggle('!z-50');
      // open_card.style.opacity = '1';
      open_card.style.display = 'block';

      setTimeout(() => { //! Büyürken z-indeksleri geç ayarladığından dolayı biraz erteledim ki arkada kalmasın
        open_card.classList.add('!h-[200px]');
        open_card.classList.add('!w-[400px]');
      }, 300);

    }, 700);
    
  }
  else {

    if(open_card.classList.contains('!h-[200px]')) {

      setTimeout(() => { //! Küçülürken z-indeksleri geç ayarladığından dolayı biraz erteledim ki önde kalmasın
        // open_card.style.opacity = '0';
        open_card.style.display = 'none';
        open_card.classList.toggle('!z-50');
        card.classList.toggle('!z-1');
      }, 300);

      open_card.classList.remove('!bg-middle_black');
      open_card.classList.remove('!border-onyx');
      open_card.classList.remove('!h-[200px]');
      open_card.classList.remove('!w-[400px]');
    }
  }


}

function clearTime(id) {
  clearTimeout(timer);
  
  let open_card = document.getElementById('card_s_tbl_' + id);


  if(open_card.classList.contains('!h-[200px]')) {
    return;
  }
  else {
    setTimeout(() => { //! Buradaki setTimeout 'u mouseenter ve mouseleave çakışabiliyor ve hover sürekli aktif kalıyor diye koydum.
      open_card.classList.remove('!bg-middle_black');
      open_card.classList.remove('!border-onyx');
    }, 50);
  }

}

function resize() {
    let allCards = [1 , 2 , 3 , 4 , 5 , 6 , 7, 8 , 9 , 10 , 11 , 12 , 13 , 14 , 15 , 16];

    setTimeout(function(){
    
      for(var id of allCards) {
        let open_card = document.getElementById('card_s_tbl_' + id);
        let card = document.getElementById('card_elm_' + id);
        let card_elm = card.getBoundingClientRect();
    
        open_card.style.width = card_elm.width + "px";
        open_card.style.height = card_elm.height + "px";


        coordinates(id);
      }
    },200)

};

function source_table() {

  let source_table = document.getElementById('source_table');

  if (source_table.classList.contains('opacity-0')) { open_s_tbl() } else { close_s_tbl() }
}

function open_s_tbl() {

  let source_table = document.getElementById('source_table');

  source_table.classList.toggle('hidden');

  setTimeout(function(){
    source_table.classList.toggle('-translate-y-16');
    source_table.classList.toggle('opacity-0');
  }, 1);

}

function close_s_tbl() {

  let source_table = document.getElementById('source_table');

  setTimeout(function(){
    source_table.classList.toggle('hidden');
  }, 300);
  
  source_table.classList.toggle('-translate-y-16');
  source_table.classList.toggle('opacity-0');

}

function checkbox(id) {
  var checkbox = document.getElementById('checkbox_' + id)
  var collapse = document.getElementById('collapse_' + id)

  if(checkbox.checked === true) {
    collapse.classList.add('!bg-jet');
  }
  else {
    collapse.classList.remove('!bg-jet');
  }
}

function addRelatedTable(id) {
  let open_card = document.getElementById('card_s_tbl_' + id);
  let card = document.getElementById('card_elm_' + id);
}
