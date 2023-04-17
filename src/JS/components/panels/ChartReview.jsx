import React, { useContext } from 'react'
import { ChartContext } from '../context';
import LoadingForCharts from '../../charts/modals/LoadingForCharts';
import ErrorForCharts from '../../charts/modals/ErrorForCharts';

export default function ChartReview() {
  const {yAxisReview, yDatasReview, sumReview, errorText} = useContext(ChartContext);

  function currencyFormat(num) {
      return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      .replaceAll('.', '|').replaceAll(',', '.').replaceAll('|', ',')
  }

  return (
    <>
      <table className="w-full text-sm text-left text-grayXgray relative top-0 left-[1px] border-spacing-[inherit] border-separate">
        <thead className="text-xs text-cultured uppercase ">
          <tr>
            {yAxisReview.map((col, index) => {
              let type = "";
              if (col.includes("_SUM")) {
                col = col.split("_SUM")[0]
                type = " (Toplam)"
              }
              else if (col.includes("_AVG")) {
                col = col.split("_AVG")[0]
                type = " (Ortalama)"
              }
              else if (col.includes("_MIN")) {
                col = col.split("_MIN")[0]
                type = " (Minimum)"
              }
              else if (col.includes("_MAX")) {
                col = col.split("_MAX")[0]
                type = " (Maksimum)"
              }

              return(
                <th key={index} scope="col" className="px-2 py-3 top-0 sticky bg-darkest_jet border-b border-b-onyx_middle border-t border-t-jet_mid">{col}<span className='text-onyx_middle text-xs normal-case'>{type}</span></th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {yDatasReview.map((row, index) => {
            return(
              <tr key={index} className="bg-jet transition duration-200 hover:bg-onyx hover:text-platinium">
                {row.map((rowInside, index) => {
                  if (yAxisReview[index].includes("TARIH") || typeof(rowInside) !== 'number') {
                    return(
                      <th key={index} className="px-2 py-1 font-normal border-b border-onyx truncate">
                        {rowInside}
                      </th>
                    )
                  }
                  else {
                    return(
                      <th key={index} className="px-2 py-1 font-normal border-b border-onyx truncate text-right">
                        {typeof(rowInside) === 'number' ? currencyFormat(rowInside) : rowInside}
                      </th>
                    )
                  }
                })}
              </tr>
            )
          })}

          <tr>
            {yAxisReview.map((col, index) => {
              if(typeof(sumReview[index]) === 'number' && !col.includes("TARIH_") && !col.includes("KOD")) {
                return(
                  <th key={index} className='px-2 py-2 bottom-0 sticky bg-darkest_jet font-light text-center text-platinium border-t border-onyx_middle'><span className='float-right text-sea_green'>{currencyFormat(sumReview[index])}</span></th>
                )
              }
              else {
                return(
                  <th key={index} className='px-2 py-2 bottom-0 sticky bg-darkest_jet border-t border-onyx_middle'></th>
                )
              }
            })}
          </tr>
        </tbody>
      </table>
      
      <LoadingForCharts id={"loadingScreenTable_review"} />
      <ErrorForCharts id={"errorScreenTable_review"} error={errorText} />
    </>
  )
}
