import React from 'react'

export default function Deneme() {
  return (
    <>
    <div>
      <label htmlFor="my-modal-5" className="btn modal-button">open modal</label>
      
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal bg-modal_back">
        <div className="modal-box max-w-full h-screen p-4 grid grid-cols-5 gap-5 bg-darkest_jet">
          
          <div className="md:col-span-2 col-span-5 bg-middle_black p-3 rounded shadow-md overflow-auto h-full relative">
            
            <div className="form-control">
              <div className="input-group shadow-md">
                <span className='bg-black_light px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[30%]'>Model Adı</span>
                <input type="text" placeholder="Model adı girin" className="input my-0 input-bordered !rounded-r w-full h-auto" />
              </div>
            </div>

            <hr className='my-3 border-1 w-4/5 relative left-1/2 -translate-x-1/2 border-hr_gray'/>

            <div className="form-control">
              <div className="input-group z-2 shadow-md">
                <span className='bg-black_light px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[30%]'>Kaynak Tablo</span>
                <input type="text" onClick={source_table} className="w-full text-left truncate h-auto overflow-hidden input my-0 input-bordered transition duration-300" />
                <button onClick={source_table} className='bg-black_light px-2 py-[7px] !rounded-r border border-jet_mid justify-center min-w-[35px] transition duration-300 hover:bg-side_black hover:text-platinium'><i className="fa-sharp fa-solid fa-chevron-down "></i></button>
              </div>
            </div>
            

            <div id="source_table" className='max-h-[230px] overflow-auto z-1 left-3 right-3 mt-[-5px] w-[calc(100%_-_1.5rem)] bg-black_light shadow-lg rounded absolute border border-jet_mid border-r-0 opacity-0 transition duration-300 -translate-y-16 hidden'>
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

            <div className='w-full h-96 bg-darker_jet mt-2 rounded shadow-md relative grid grid-cols-6 gap-2 p-2 overflow-auto border border-jet_mid border-r-0'>

              <div onMouseEnter={() => hey(1)} onMouseLeave={() => hey(1)} className="relative lg:col-span-2 md:col-span-3 col-span-2 bg-side_black rounded shadow-md h-32 ">
                <div id="card_s_tbl_1" className='absolute bg-red-500 h-full w-full'></div>
              </div>

              <div id="card_s_tbl_2" className='lg:col-span-2 md:col-span-3 col-span-2 bg-side_black rounded shadow-md h-32'></div>
              <div id="card_s_tbl_3" className='lg:col-span-2 md:col-span-3 col-span-2 bg-side_black rounded shadow-md h-32'></div>
              <div id="card_s_tbl_4" className='lg:col-span-2 md:col-span-3 col-span-2 bg-side_black rounded shadow-md h-32'></div>
              <div id="card_s_tbl_5" className='lg:col-span-2 md:col-span-3 col-span-2 bg-side_black rounded shadow-md h-32'></div>
              <div id="card_s_tbl_6" className='lg:col-span-2 md:col-span-3 col-span-2 bg-side_black rounded shadow-md h-32'></div>
              <div id="card_s_tbl_7" className='lg:col-span-2 md:col-span-3 col-span-2 bg-side_black rounded shadow-md h-32'></div>
              <div id="card_s_tbl_8" className='lg:col-span-2 md:col-span-3 col-span-2 bg-side_black rounded shadow-md h-32'></div>
            </div>

          </div>

          <div className="md:col-span-3 col-span-5 bg-middle_black p-3 rounded shadow-md relative h-full">
            <p className="">You've been selected for a chance to get one year of subscription to use Wikipedia for free!aaaaaaaaaaaaa aaaaaa</p>
            <div className="bottom-3 right-3 absolute">
              <label htmlFor="my-modal-5" className="gray-btn mr-2">Kapat</label>
              <button className='green-btn'>Kaydet</button>
            </div>
          </div>

        </div>
      </div>
    </div>


    </>
  )
}

function hey(id) {
    document.getElementById('card_s_tbl_' + id).classList.toggle('h-24')
    document.getElementById('card_s_tbl_' + id).classList.toggle('w-24')
  console.log("a")
}

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
