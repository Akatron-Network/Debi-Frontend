import React , {useContext , useEffect} from 'react'
import chart_bar from '../../../img/chart-types/Chart Logos/bar.png';
import chart_gauge from '../../../img/chart-types/Chart Logos/gauge.png';
import chart_line from '../../../img/chart-types/Chart Logos/line.png';
import chart_markPoint from '../../../img/chart-types/Chart Logos/markPoint.png';
import chart_treemap from '../../../img/chart-types/Chart Logos/treemap.png';
import chart_pie from '../../../img/chart-types/Chart Logos/pie.png';
import chart_table from '../../../img/chart-types/Chart Logos/table.png';
import pivot_table from '../../../img/chart-types/Chart Logos/pivot-table.png';
import { ChartContext , MainContext, ModalContext } from '../context';
import Input from '../Input'
import ChartReview from './ChartReview';

export default function ChartChoose() {
  const chart_data = useContext(ChartContext);
  const modal_data = useContext(ModalContext);

  useEffect(() => {
    modal_data.getList();
    modal_data.getUnions();
    modal_data.getScripts();
  }, [])

  useEffect(() => {
    modal_data.getViews(chart_data.pageContent);
  }, [chart_data.pageContent.collection_id])
  

  return (
  <>
    <input type="checkbox" id="chart_choose" className="modal-toggle" />
    <div htmlFor="chart_choose" className="modal bg-modal_back">
      <div className="modal-box relative max-w-fit p-3 bg-side_black rounded grid grid-cols-7 gap-3 h-[80%]">
        <div className='col-span-1 overflow-auto relative rounded pr-[11px] shadow-inner'>
          <h1 className="text-lg text-platinium mb-2 drop-shadow">
            Panel Tipi
          </h1>
          <div className='grid grid-rows-8 grid-flow-row auto-rows-max gap-2'>
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
            <button disabled className='chart-type-cards opacity-50 cursor-default hover:bg-earie_black hover:text-grayXgray' id='gauge_card' onClick={() => chart_data.chooseChart("gauge")}>
                <img src={chart_gauge} alt="Gauge Chart" />
                <h1 className='chart-title'>Gösterge Grafiği</h1>
            </button>
          </div>
        </div>

        <div className='col-span-6'>
          <label htmlFor="chart_choose" className="btn gray-btn absolute right-3 top-3 z-10 w-8" onClick={chart_data.clearPanelInputs}><i className="fa-solid fa-xmark"></i></label>
          <div className='hidden' id='panelForm'>

            <div className='flex mb-2 border-b border-jet_mid shadow-md'>
              <button ref={chart_data.panelFeaturesButtonRef}
								className="text-lg text-platinium px-3 py-1 rounded-t transition duration-200 bg-jet_mid"
								onClick={() => chart_data.changePanelTab(chart_data.panelFeaturesButtonRef, chart_data.panelFeaturesRef)}>
                Panel Özellikleri
              </button>
              <button ref={chart_data.panelPreviewButtonRef}
								className="text-lg text-platinium px-3 py-1 ml-[1px] rounded-t transition duration-200 bg-earie_black hover:bg-darker_jet inline-flex items-center"
								onClick={() => {chart_data.changePanelTab(chart_data.panelPreviewButtonRef, chart_data.panelPreviewRef); chart_data.funcLoadForSpesific("loadingScreenTable_review", "errorScreenTable_review", chart_data.reviewChartTable)}}>
                Ön İzleme
              </button>

              <div ref={chart_data.previewButtonRef} onClick={() => chart_data.reviewChartTable()} className="tooltip tooltip-left absolute right-[51px] hidden" data-tip="Ön İzle">
								<button className="green-btn"><i className="fa-solid fa-rotate"></i></button>
              </div>
            </div>

            <div ref={chart_data.panelFeaturesRef} className='hidden'>
              <div className='mt-3 flex'>
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

                      {modal_data.modalList.length > 0 ? <option disabled value="hr_2">Modeller ------------------------------------</option> : undefined}
                      {modal_data.modalList.map((modal, index) => (
                        <option key={index} value={modal.model_id}>
                          {modal.model_name}
                        </option>
                      ))}

                      {modal_data.unionList.length > 0 ? <option disabled value="hr_2">Birleşik Modeller ---------------------------</option> : undefined}
                      {modal_data.unionList.map((union, index) => (
                        <option key={index} value={union.union_id + "_Union"}>
                          {union.union_name + " (Birleşik Model)"}
                        </option>
                      ))}

                      {modal_data.publicModalList.length > 0 ? <option disabled value="hr_2">Hazır Modeller ------------------------------</option> : undefined}
                      {modal_data.publicModalList.map((pmodal, index) => (
                        <option key={index} value={pmodal.model_id + "_Public"}>
                          {pmodal.model_name + " (Hazır Model)"}
                        </option>
                      ))}

                      {modal_data.scriptList.length > 0 ? <option disabled value="hr_2">Scriptler ------------------------------</option> : undefined}
                      {modal_data.scriptList.map((script, index) => (
                        <option key={index} value={script.id + "_Script"}>
                          {script.name + " (Script)"}
                        </option>
                      ))}

                      {modal_data.viewList.length > 0 ? <option disabled value="hr_2">Viewlar ------------------------------</option> : undefined}
                      {modal_data.viewList.map((view, index) => (
                        <option key={index} value={view.table + "_View"}>
                          {view.table + " (View)"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                {chart_data.chartForms}
              </div>
            </div>

            <div ref={chart_data.panelPreviewRef} className='hidden h-[68.6vh] mb-2'>
							<div className="w-full h-[inherit] bg-darker_jet rounded shadow-md border border-jet_mid p-2">
								<div className="w-full h-full border border-onyx rounded shadow-md overflow-auto">
									<ChartReview />
								</div>
							</div>
            </div>

            <div className="bottom-3 right-3 float-right">
              <label htmlFor="chart_choose" onClick={chart_data.clearPanelInputs} className="gray-btn mr-2">
                Kapat
              </label>
              <button className="green-btn" onClick={() => chart_data.funcLoad(chart_data.savePanel)}>Kaydet</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </>
  
  )
}
