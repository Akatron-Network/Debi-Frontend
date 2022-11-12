import React , {useContext , useEffect} from 'react'
import chart_bar from '../../../img/chart-types/Chart Logos/bar.png';
import chart_gauge from '../../../img/chart-types/Chart Logos/gauge.png';
import chart_line from '../../../img/chart-types/Chart Logos/line.png';
import chart_markPoint from '../../../img/chart-types/Chart Logos/markPoint.png';
import chart_treemap from '../../../img/chart-types/Chart Logos/treemap.png';
import chart_pie from '../../../img/chart-types/Chart Logos/pie.png';
import chart_table from '../../../img/chart-types/Chart Logos/table.png';
import pivot_table from '../../../img/chart-types/Chart Logos/pivot-table.png';
import { ChartContext , ModalContext } from '../context';
import Input from '../Input'

export default function ChartChoose() {
  const chart_data = useContext(ChartContext);
  const modal_data = useContext(ModalContext);

  useEffect(() => {
    modal_data.getList();
  }, [])

  return (
  <>
    <input type="checkbox" id="chart_choose" className="modal-toggle" />
    <div htmlFor="chart_choose" className="modal bg-modal_back">
      <div className="modal-box relative max-w-fit h-fit p-3 bg-side_black rounded">
        <h1 className="text-lg text-platinium mb-2 drop-shadow">
          Panel Özellikleri
        </h1>
        <hr className="mt-2 mb-3 border-1 w-full relative left-1/2 -translate-x-1/2 border-hr_gray" />
        <h1 className="text-base text-platinium mb-2 drop-shadow">
          Panel Tipi
        </h1>
        <div className='grid grid-cols-8 grid-flow-row auto-rows-max gap-3'>
          <button className='chart-type-cards' id='bar_card' onClick={() => chart_data.chooseChart("bar")}>
              <img src={chart_bar} alt="Bar Chart" />
              <h1 className='chart-title'>Bar Grafiği</h1>
          </button>
          <button className='chart-type-cards' id='treemap_card' onClick={() => chart_data.chooseChart("treemap")}>
              <img src={chart_treemap} alt="Tree Chart" />
              <h1 className='chart-title'>Gruplu Bar Grafiği</h1>
          </button>
          <button className='chart-type-cards' id='line_card' onClick={() => chart_data.chooseChart("line")}>
              <img src={chart_line} alt="Line Chart" />
              <h1 className='chart-title'>Çizgi Grafiği</h1>
          </button>
          <button className='chart-type-cards' id='mark_card' onClick={() => chart_data.chooseChart("mark")}>
              <img src={chart_markPoint} alt="Mark Chart" />
              <h1 className='chart-title'>Gruplu Çizgi Grafiği</h1>
          </button>
          <button className='chart-type-cards' id='gauge_card' onClick={() => chart_data.chooseChart("gauge")}>
              <img src={chart_gauge} alt="Gauge Chart" />
              <h1 className='chart-title'>Gösterge Grafiği</h1>
          </button>
          <button className='chart-type-cards' id='pie_card' onClick={() => chart_data.chooseChart("pie")}>
              <img src={chart_pie} alt="Pie Chart" />
              <h1 className='chart-title'>Pasta Grafiği</h1>
          </button>
          <button className='chart-type-cards' id='table_card' onClick={() => chart_data.chooseChart("table")}>
              <img src={chart_table} alt="Table Chart" />
              <h1 className='chart-title'>Tablo</h1>
          </button>
          <button className='chart-type-cards' id='pivot_card' onClick={() => chart_data.chooseChart("pivot")}>
              <img src={pivot_table} alt="Pivot Table Chart" />
              <h1 className='chart-title'>Pivot Tablo</h1>
          </button>
        </div>
        
        <div className='hidden mt-3' id='panelForm'>
          <div className='w-1/2 mr-[6px]'>
            <Input value={"Panel Adı"} refName={chart_data.panelNameRef}/>
          </div>

          <div className="form-control mb-2 w-1/2 ml-[6px]">
            <div className="input-group shadow-md">
              <span className="bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%] xl:truncate">
                Model Adı
              </span>
              <select
                defaultValue="default"
                className="condition_select max-w-[65%] !rounded-l-none"
                ref={chart_data.modelNameRef}
                onChange={() => chart_data.modelNameSelect(chart_data.modelNameRef.current.value)}
              >
                <option disabled value="default">
                  Bir model seçin...
                </option>

                {modal_data.modalList.map((modal) => (
                  <option key={modal.model_id.toString()} value={modal.model_id}>
                    {modal.model_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          {chart_data.chartForms}
        </div>

        <div className="bottom-3 right-3 mt-2 float-right">
          <label htmlFor="chart_choose" className="gray-btn mr-2">
            Kapat
          </label>
          <button className="green-btn" onClick={chart_data.savePanel}>Kaydet</button>
        </div>
        

      </div>
    </div>
  </>
  
  )
}
