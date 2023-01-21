import React from 'react';

export default function Deneme() {

  return (

    <div className='p-20'>
      <div className="panels">
        <div className="panels-title w-full shadow-md">
          <h1>DENEME</h1>
          <div>
            <button className="danger-btn float-right w-6 ml-[2px] bg-transparent shadow-none border-none hover:bg-middle_black text-[17px]" ><i className="fa-solid fa-xmark"></i></button>
            <label htmlFor="chart_choose" className="danger-btn float-right w-6 bg-transparent shadow-none border-none hover:bg-middle_black text-base"><i className="fa-solid fa-pen-to-square"></i></label>
          </div>
        </div>
        <span>


        <div className="relative overflow-x-auto shadow-md pt-[54px]">
          <table className="w-full text-sm text-left text-grayXgray">
              <thead className="text-xs text-cultured uppercase bg-jet_shadow border-b border-onyx_middle">
                  <tr>
                      <th scope="col" className="px-2 py-3">
                          Product name
                      </th>
                      <th scope="col" className="px-2 py-3">
                          Color
                      </th>
                      <th scope="col" className="px-2 py-3">
                          Category
                      </th>
                      <th scope="col" className="px-2 py-3">
                          Price
                      </th>
                  </tr>
              </thead>
              <tbody>
                <tr className="bg-jet_light border-b border-onyx transition duration-200 hover:bg-onyx hover:text-platinium">
                  <th className="px-2 py-1">
                    Apple MacBook Pro 1
                  </th>
                  <td className="px-2 py-1">
                    Sliver
                  </td>
                  <td className="px-2 py-1">
                    Laptop
                  </td>
                  <td className="px-2 py-1">
                    $2999
                  </td>
                </tr>
                <tr className="bg-jet_light border-b border-onyx transition duration-200 hover:bg-onyx hover:text-platinium">
                  <th className="px-2 py-1">
                    Apple MacBook Pro 1
                  </th>
                  <td className="px-2 py-1">
                    Sliver
                  </td>
                  <td className="px-2 py-1">
                    Laptop
                  </td>
                  <td className="px-2 py-1">
                    $2999
                  </td>
                </tr>
                <tr className="bg-jet_light border-b border-onyx transition duration-200 hover:bg-onyx hover:text-platinium">
                  <th className="px-2 py-1">
                    Apple MacBook Pro 1
                  </th>
                  <td className="px-2 py-1">
                    Sliver
                  </td>
                  <td className="px-2 py-1">
                    Laptop
                  </td>
                  <td className="px-2 py-1">
                    $2999
                  </td>
                </tr>
              </tbody>
          </table>
      </div>




        </span>
      </div>

    </div>

  )
}
