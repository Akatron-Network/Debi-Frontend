import React from 'react'
import chart_bar from '../../img/chart-types/Chart Logos/bar.png';
import chart_gauge from '../../img/chart-types/Chart Logos/gauge.png';
import chart_line from '../../img/chart-types/Chart Logos/line.png';
import chart_markPoint from '../../img/chart-types/Chart Logos/markPoint.png';
import chart_treemap from '../../img/chart-types/Chart Logos/treemap.png';
import chart_pie from '../../img/chart-types/Chart Logos/pie.png';
import chart_table from '../../img/chart-types/Chart Logos/calendar.png';

export default function ChartChoose() {
  return (
  <>
    <input type="checkbox" id="my-modal-4" className="modal-toggle" />
    <label htmlFor="my-modal-4" className="modal bg-modal_back">
        <div className="modal-box relative max-w-fit h-fit p-3 grid grid-cols-6 grid-flow-row auto-rows-max gap-3 bg-black_light rounded">
            <button className='chart-type-cards'>
                <img src={chart_bar} alt="Bar Chart" />
                <h1 className='text-center pt-1'>Bar Grafiği</h1>
            </button>
            <button className='chart-type-cards'>
                <img src={chart_treemap} alt="Bar Chart" />
                <h1 className='text-center pt-1'>Gruplu Bar Grafiği</h1>
            </button>
            <button className='chart-type-cards'>
                <img src={chart_line} alt="Bar Chart" />
                <h1 className='text-center pt-1'>Çizgi Grafiği</h1>
            </button>
            <button className='chart-type-cards'>
                <img src={chart_markPoint} alt="Bar Chart" />
                <h1 className='text-center pt-1'>Gruplu Çizgi Grafiği</h1>
            </button>
            <button className='chart-type-cards'>
                <img src={chart_gauge} alt="Bar Chart" />
                <h1 className='text-center pt-1'>Gösterge Grafiği</h1>
            </button>
            <button className='chart-type-cards'>
                <img src={chart_pie} alt="Bar Chart" />
                <h1 className='text-center pt-1'>Pasta Grafiği</h1>
            </button>
            <button className='chart-type-cards'>
                <img src={chart_table} alt="Bar Chart" />
                <h1 className='text-center pt-1'>Tablo</h1>
            </button>
        </div>
    </label>
  </>
  
  )
}
