import React , { useState , useRef , useEffect } from 'react'
import { MainContext, ModalContext, ChartContext } from '../components/context'
import WorkspaceAll from '../libraries/categories/Workspace';
import Data from '../libraries/categories/Data';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Filepath from '../components/Filepath';
import DataModal from '../components/datamodal/DataModal';
import { getAlias } from '../libraries/misc';
import Bar from '../components/panels/forms/Bar';
import TreeMap from '../components/panels/forms/TreeMap';
import Line from '../components/panels/forms/Line';
import Mark from '../components/panels/forms/Mark';
import Pie from '../components/panels/forms/Pie';
import Table from '../components/panels/forms/Table';
import Pivot from '../components/panels/forms/Pivot';


export default function MainPage() {

  const [collections, setCollections] = useState([]);
  const [folders, setFolders] = useState({directories: []});
  const [filesChildDirs, setFilesChildDirs] = useState({child_dirs: []});
  const [files, setFiles] = useState({pages: []});
  const [filepath, setFilePath] = useState([]);
  const [deleteItemRef, setDeleteItemRef] = useState({});
  const [deleteItemType, setDeleteItemType] = useState('');
  const [modalChecked, setModalChecked] = useState(false);
  const [modalType, setModalType] = useState({});

  const [treeCollections, setTreeCollections] = useState({owned: []});
	
	const getTreeCollections = async () => {
    let resp = await WorkspaceAll.getTrees();
    setTreeCollections(resp.Data);
    localStorage.setItem("Tree" , JSON.stringify(resp.Data))
    localStorage.setItem("TreeTime" , Date.now())
  }

  const getColWorks = async (col_id = undefined) => {
    let resp = await WorkspaceAll.getCollections(col_id);
    setCollections(resp.Data.owned_collections);
  }
  
  const getFolderWorks = async (col_id = undefined) => {
    let resp = await WorkspaceAll.getCollections(col_id);
    setFolders(resp.Data);
    setFilePath([{id: col_id, name: resp.Data.collection_name, url: "/" + col_id}]);
  }

	const getFileWorks = async (fold_id = undefined) => {
    let resp = await WorkspaceAll.getFolders(fold_id);
    console.log(resp);
		setFilesChildDirs(resp.Data)
		setFiles(resp.Data)
		setFilePath(resp.Data.path)
  }

  const deleteItems = async (del_type , id) => {
    if(del_type === 'collection') {
      let resp = await WorkspaceAll.deleteCollections(id);
      getColWorks();
    }
    else if(del_type === 'folder') {
      let resp = await WorkspaceAll.deleteFolders(id);

      if(resp.Data.parent_directory === null) {
        getFolderWorks(resp.Data.collection_id);
      }
      else {
        getFileWorks(resp.Data.parent_directory);
      }
    }
    else if(del_type === 'file') {
      let resp = await WorkspaceAll.deleteFiles(id);
      getFileWorks(resp.Data.directory_id);
    }
    
  }
    
  const colWorksNameRef = useRef({value : ""});
  const colWorksNickRef = useRef({value : ""});
  const colWorksPassRef = useRef({value : ""});
  const colWorksDBRef = useRef({value : ""});
  const colWorksSelectRef = useRef({value : ""});
  const colConnectorServerRef = useRef({value : ""});
  const colServerRef = useRef({value : ""});
  const colPortRef = useRef({value : ""});
  const colNameRef = useRef({value : ""});
  const foldNameRef = useRef({value : ""});
  const fileNameRef = useRef({value : ""});

  
  const [checkedConnector , setCheckedConnector] = useState(false);
  const [checkedExpress , setCheckedExpress] = useState(false);

  const clearRefs = (type) => {
    if(type === "koleksiyon") {
      maincontext_data.colNameRef.current.value = "";
      maincontext_data.colServerRef.current.value = "";
      maincontext_data.colConnectorServerRef.current.value = "";
      maincontext_data.colWorksNickRef.current.value = "";
      maincontext_data.colWorksPassRef.current.value = "";
      maincontext_data.colWorksDBRef.current.value = "";
      maincontext_data.colWorksSelectRef.current.value = "default";
      maincontext_data.colPortRef.current.value = "1433";

      if(checkedConnector) { setCheckedConnector(!checkedConnector) }
      if(checkedExpress) { setCheckedExpress(!checkedExpress) }

      if(document.getElementById('colWarn1').classList.contains('!block')) {
        document.getElementById('colWarn1').classList.remove('!block');
      }
      else if(document.getElementById('colWarn2').classList.contains('!block')) {
        document.getElementById('colWarn2').classList.remove('!block');
      }

    }
    else if(type === "klasör") {
      maincontext_data.foldNameRef.current.value = "";
      if(document.getElementById('foldWarn').classList.contains('!block')) {
        document.getElementById('foldWarn').classList.remove('!block');
      }
    }
    else if(type === "sayfa") {
      maincontext_data.fileNameRef.current.value = "";
      if(document.getElementById('fileWarn').classList.contains('!block')) {
        document.getElementById('fileWarn').classList.remove('!block');
      }
    }
  }
  
  const [modalList, setModalList] = useState([]);

  const getList = async () => {
    let resp = await Data.getModalList();
    setModalList(resp.Data.owned_models);
  }

  const deleteModel = async (id) => {
    let resp = await Data.dltModel(id);
    getList();
  }

  const maincontext_data = {
    collections,
    folders,
    files,
    filesChildDirs,
    colNameRef,
    foldNameRef,
    fileNameRef,
    checkedConnector,
    checkedExpress,
    colConnectorServerRef,
    colPortRef,
    colServerRef,
    colWorksNameRef,
    colWorksNickRef,
    colWorksPassRef,
    colWorksDBRef,
    colWorksSelectRef,
    filepath,
    deleteItemRef,
    deleteItemType,
    clearRefs,
    deleteItems,
    getColWorks,
    getFileWorks,
    getFolderWorks,
    setCheckedConnector,
    setCheckedExpress,
    setDeleteItemRef,
    setDeleteItemType,
    setFilePath,

    treeCollections,
    getTreeCollections,
    setTreeCollections,
  }

  const modal_data = {
    modalChecked,
    modalList,
    modalType,
    deleteModel,
    getList,
    setModalChecked,
    setModalType,
  }

  //* Panel Data Funcs------------------------------------------/

  const panelNameRef = useRef("");
  const modelNameRef = useRef("");
  const xColSelRef = useRef("default");
  const yColSelRef = useRef("default");

  const [colList, setColList] = useState([]);
  const [panelType, setPanelType] = useState("");
  const [chartForms, setChartForms] = useState();
  const [allAxis, setAllAxis] = useState([]);
  const [titleAxis, setTitleAxis] = useState([]);
  const [valueAxis, setValueAxis] = useState([]);
  const [panel, setPanel] = useState("");
  const [pageContent, setPageContent] = useState({page_data : {panels: []}});

  var ch_cards = ["bar", "treemap", "line", "mark", "gauge", "pie", "table", "pivot"];
  const chooseChart = (type) => {
    setPanel("");
    let card = document.getElementById(type + "_card");
    let panel_form = document.getElementById('panelForm')

    if(panel_form.classList.contains('hidden')) {
      panel_form.classList.remove('hidden')
      panel_form.classList.add('flex')
    }

    for(let a of ch_cards) {
      if(document.getElementById(a + "_card").classList.contains("border-transparent") === false) {
        document.getElementById(a + "_card").classList.remove("border-green_pantone");
        document.getElementById(a + "_card").classList.add("border-transparent");
      }
    }
    card.classList.remove("border-transparent");
    card.classList.add("border-green_pantone");

    if (type === "bar") {setChartForms(<Bar />)}
    else if (type === "treemap") {setChartForms(<TreeMap />)}
    else if (type === "line") {setChartForms(<Line />)}
    else if (type === "mark") {setChartForms(<Mark />)}
    else if (type === "pie") {setChartForms(<Pie />)}
    else if (type === "table") {setChartForms(<Table />)}
    else if (type === "pivot") {setChartForms(<Pivot />)}

    setPanelType(type);
  }

  const modelNameSelect = (id) => {
    id = parseInt(id);
    let query = {};
    let colList_temp = [];

    for(let a of modalList) { if (a.model_id === id) { query = a } }
    console.log(query);

    let arrMain = [];
    let keyMain = Object.keys(query.query.select)
    let valueMain = Object.values(query.query.select)
    for (let v in valueMain) {
      console.log(valueMain[v])
      console.log(keyMain[v])

      //* Toplam vb işlemler için kolonları 3 e bölerek isimlendirdik. Valuesi true gelenler, sum-min vs gelenler bir de içerisinde {} bulunduranlar olarak.
      if (valueMain[v] === true) {
        arrMain.push(keyMain[v])
      } else if (valueMain[v].includes("{")) {
        arrMain.push(valueMain[v].replaceAll("{" , "").replaceAll("}" , ""))
      } else {
        arrMain.push(keyMain[v] + "_" + valueMain[v])
      }
    }
    colList_temp = [{[query.query.table] : {columns: arrMain , alias: query.query.alias}}];

    let arrAlias = [];
    for(let b of query.query.includes) {
      let valueAlias =Object.values(b.select);
      let keyAlias =Object.keys(b.select);

      for (let v in valueAlias) {
        console.log(valueAlias[v])
        console.log(keyAlias[v])
        if (valueAlias[v] === true) {
          arrAlias.push(keyAlias[v])
        } else if (valueAlias[v].includes("{")) {
          arrAlias.push(valueAlias[v].replaceAll("{" , "").replaceAll("}" , ""))
        } else {
          arrAlias.push(keyAlias[v] + "_" + valueAlias[v])
        }
      }
      colList_temp.push({[b.table] : {columns: arrAlias , alias: b.alias}});
    }
    console.log(colList_temp);
    
    setColList(colList_temp);
  }

  const addAxis = (type = "") => {
    var al = "";

    if (type === "title") {
      al = getAlias(titleAxis);
      setTitleAxis([...titleAxis, al]);
    } else if (type === "value") {
      al = getAlias(valueAxis);
      setValueAxis([...valueAxis, al]);
    } else {
      al = getAlias(allAxis);
      setAllAxis([...allAxis, al]);
    }
  }

  const dltAxis = (alias , type = "") => {

    if (type === "title") {
      setTitleAxis(titleAxis.filter(item => item !== alias))
    } else if (type === "value") {
      setValueAxis(valueAxis.filter(item => item !== alias))
    } else {
      setAllAxis(allAxis.filter(item => item !== alias))
    }

  }

  const axisSel = (paneltype) => {
    let selColumns = {};

    if (paneltype === "bar" || paneltype === "line" || paneltype === "pie") {
      selColumns = {
        xAxis:{
          alias: chart_data.xColSelRef.current.value.split("/")[0],
          table: chart_data.xColSelRef.current.value.split("/")[1],
          col: chart_data.xColSelRef.current.value.split("/")[2],
        },
        yAxis:{
          alias: chart_data.yColSelRef.current.value.split("/")[0],
          table: chart_data.yColSelRef.current.value.split("/")[1],
          col: chart_data.yColSelRef.current.value.split("/")[2],
        }
      }
    } else if (paneltype === "treemap" || paneltype === "mark" || paneltype === "table") {
      //* Burada toplu olarak Y ekseni değerlerini topladık. İlk başta ana yColRef kullandığımız için daha sonrasında eklenen eksen varsa diye bi if koyduk
      let ax = [
        {
          alias: chart_data.yColSelRef.current.value.split("/")[0],
          table: chart_data.yColSelRef.current.value.split("/")[1],
          col: chart_data.yColSelRef.current.value.split("/")[2],
        }
      ];

      if (allAxis.length > 0) {
        for(var a of allAxis) {
          ax.push({
            alias: chart_data.yColSelRef.current[a].value.split("/")[0],
            table: chart_data.yColSelRef.current[a].value.split("/")[1],
            col: chart_data.yColSelRef.current[a].value.split("/")[2],
          })
        }
      }

      if (paneltype === "table") {
        selColumns = {
          yAxis:ax
        }

      } else {
        selColumns = {
          yAxis:ax,
          xAxis:{
            alias: chart_data.xColSelRef.current.value.split("/")[0],
            table: chart_data.xColSelRef.current.value.split("/")[1],
            col: chart_data.xColSelRef.current.value.split("/")[2],
          }
        }
      }
    } else if (paneltype === "pivot") {
      let ax = [
        {
          alias: chart_data.xColSelRef.current.value.split("/")[0],
          table: chart_data.xColSelRef.current.value.split("/")[1],
          col: chart_data.xColSelRef.current.value.split("/")[2],
        }
      ];
      
      let ay = [
        {
          alias: chart_data.yColSelRef.current.value.split("/")[0],
          table: chart_data.yColSelRef.current.value.split("/")[1],
          col: chart_data.yColSelRef.current.value.split("/")[2],
        }
      ];

      if(titleAxis.length > 0) {
        for(var a of titleAxis) {
          ax.push({
            alias: chart_data.xColSelRef.current[a].value.split("/")[0],
            table: chart_data.xColSelRef.current[a].value.split("/")[1],
            col: chart_data.xColSelRef.current[a].value.split("/")[2],
          })
        }
      }
      
      if(valueAxis.length > 0) {
        for(var a of valueAxis) {
          ay.push({
            alias: chart_data.yColSelRef.current[a].value.split("/")[0],
            table: chart_data.yColSelRef.current[a].value.split("/")[1],
            col: chart_data.yColSelRef.current[a].value.split("/")[2],
          })
        }
      }

      selColumns = {
        yAxis:ay,
        xAxis:ax,
      }
    }

    console.log(selColumns);

    return selColumns;
  }

  //Edit Panel-----------------------------------------------------------------------------------------------------------------
  let als = [];
  let alX = [];
  let alY = [];
  const editPanel = (panelID) => {
    console.log(panelID)
    for(let p of pageContent.page_data.panels) {
      if(p.PanelID === panelID) {
        //Chart choose
        chooseChart(p.PanelType);

        //ModelName
        modelNameRef.current.value = p.ModelID
        modelNameSelect(p.ModelID);

        //X-Y Axis (We use setTimeout because chooseChart sometimes came with delay)
        setTimeout(() => {
          setPanel(panelID);
          if (p.PanelType === "bar" || p.PanelType === "line" || p.PanelType === "pie") {
            console.log("a")

            xColSelRef.current.value = p.SelColumns.xAxis.alias + "/" + p.SelColumns.xAxis.table + "/" + p.SelColumns.xAxis.col
            yColSelRef.current.value = p.SelColumns.yAxis.alias + "/" + p.SelColumns.yAxis.table + "/" + p.SelColumns.yAxis.col
            
          } else if (p.PanelType === "treemap" || p.PanelType === "mark" || p.PanelType === 'table') {
            // setPanel(panelID);

            //Eğer table ise x olmuyor. Diğerlerinde ise ilk elemanı yazıyoruz daha sonra useeffect kısmında geri kalanı dolduruyoruz
            if (p.PanelType !== "table") { xColSelRef.current.value = p.SelColumns.xAxis.alias + "/" + p.SelColumns.xAxis.table + "/" + p.SelColumns.xAxis.col }
            yColSelRef.current.value = p.SelColumns.yAxis[0].alias + "/" + p.SelColumns.yAxis[0].table + "/" + p.SelColumns.yAxis[0].col

            for (let a of p.SelColumns.yAxis) {
              if (p.SelColumns.yAxis.length - 1 > als.length) { //Remove last alias
                als.push(getAlias(als))
              }
            }
            setAllAxis(als);
          } else if (p.PanelType === "pivot") {
            // setPanel(panelID);
            
            //İlk başta ilk elemanları dolduruyoruz daha sonrasında ise useEffect kısmında eğer varsa gerisini dolduruyoruz
            xColSelRef.current.value = p.SelColumns.xAxis[0].alias + "/" + p.SelColumns.xAxis[0].table + "/" + p.SelColumns.xAxis[0].col
            yColSelRef.current.value = p.SelColumns.yAxis[0].alias + "/" + p.SelColumns.yAxis[0].table + "/" + p.SelColumns.yAxis[0].col

            for (let x of p.SelColumns.xAxis) {
              if (p.SelColumns.xAxis.length - 1 > alX.length) { //Remove last alias
                alX.push(getAlias(alX))
              }
            }
            setTitleAxis(alX);

            for (let y of p.SelColumns.yAxis) {
              if (p.SelColumns.yAxis.length - 1 > alY.length) { //Remove last alias
                alY.push(getAlias(alY))
              }
            }
            setValueAxis(alY);


          }
        }, 300);
      }
    }
  }

  useEffect(() => { //We use useEffect because in editPanel setAllAxis etc. async. Didn't refresh immediately. When (allAxis , titleAxis , valueAxis) change, run this useEffect
    
    if (panel !== "" && allAxis.length > 0) { //If Panel and AllAxis aren't empty
      for (let p of pageContent.page_data.panels) {
        if (p.PanelID === panel) {

          for (let y in p.SelColumns.yAxis) {
            if (parseInt(y) === 0) {continue;}
            yColSelRef.current[allAxis[parseInt(y) - 1]].value = p.SelColumns.yAxis[parseInt(y)].alias + "/" + p.SelColumns.yAxis[parseInt(y)].table + "/" + p.SelColumns.yAxis[parseInt(y)].col
          }
        }
      }
    } else if (panel !== "" && (titleAxis.length > 0 || valueAxis.length > 0)) { //If titleAxis and valueAxis aren't empty
      for (let p of pageContent.page_data.panels) {
        if (p.PanelID === panel) {

          for (let x in p.SelColumns.xAxis) {
            if (parseInt(x) === 0) {continue;}
            xColSelRef.current[titleAxis[parseInt(x) - 1]].value = p.SelColumns.xAxis[parseInt(x)].alias + "/" + p.SelColumns.xAxis[parseInt(x)].table + "/" + p.SelColumns.xAxis[parseInt(x)].col
          }

          for (let y in p.SelColumns.yAxis) {
            if (parseInt(y) === 0) {continue;}
            yColSelRef.current[valueAxis[parseInt(y) - 1]].value = p.SelColumns.yAxis[parseInt(y)].alias + "/" + p.SelColumns.yAxis[parseInt(y)].table + "/" + p.SelColumns.yAxis[parseInt(y)].col
          }
        }
      }
    }

    
  }, [allAxis , titleAxis , valueAxis])
  //-------------------------------------------------------------------------------------------------------------------------------
  
  const dltPanel = (panelID) => {
    for (var p of pageContent.page_data.panels) {
      if (p.PanelID === panelID) {
        setPageContent({
          ...pageContent,
          page_data: {
            ...pageContent.page_data,
            panels: pageContent.page_data.panels.filter(item => item.PanelID !== panelID)
          }
        })
        
        WorkspaceAll.putFiles(pageContent.page_id , {
          page_data: {
            ...pageContent.page_data,
            panels: pageContent.page_data.panels.filter(item => item.PanelID !== panelID)
          }
        });
      }
    }
  }

  const getCoordinates = () => {
    let crd = {};
    if(panelType === "bar") {crd = { w: 4, h: 10, x: 0, y: 0, minW: 2, minH: 5}}
    else if(panelType === "treemap") {crd = { w: 4, h: 10, x: 0, y: 0, minW: 2, minH: 7}}
    else if(panelType === "line") {crd = { w: 4, h: 10, x: 4, y: 0, minW: 2, minH: 5}}
    else if(panelType === "mark") {crd = { w: 4, h: 10, x: 8, y: 0, minW: 2, minH: 7}}
    else if(panelType === "pie") {crd = { w: 4, h: 10, x: 0, y: 0, minW: 3, minH: 7}}
    else if(panelType === "table") {crd = { w: 4, h: 10, x: 0, y: 0, minW: 3, minH: 7}}
    else if(panelType === "pivot") {crd = { w: 4, h: 10, x: 0, y: 0, minW: 3, minH: 7}}
    return crd;
  }

  const savePanel = () => {
    let selColumns = axisSel(panelType);
    let panelIDs = [];
    let lastPanelID = panel;

    for(let p of pageContent.page_data.panels) {
      panelIDs.push(p.PanelID);
    }

    let coordinates = getCoordinates();
    
    if (panel === "") {
      lastPanelID = getAlias(panelIDs);
    }

    setPageContent({
      ...pageContent,
      page_data: {
        ...pageContent.page_data,
        panels: [
          ...pageContent.page_data.panels.filter(item => item.PanelID !== lastPanelID), //Son düzenleneni içerisinden çıkardık
          {
            PanelID: lastPanelID,
            PanelType: panelType,
            PanelName: panelNameRef.current.value,
            ModelID: parseInt(modelNameRef.current.value),
            SelColumns: selColumns,
            Coordinates: coordinates,
          }
        ]
      }
    })

    WorkspaceAll.putFiles(pageContent.page_id , {
      page_data: {
        ...pageContent.page_data,
        panels: [
          ...pageContent.page_data.panels.filter(item => item.PanelID !== lastPanelID), //Son düzenleneni içerisinden çıkardık
          {
            PanelID: lastPanelID,
            PanelType: panelType,
            PanelName: panelNameRef.current.value,
            ModelID: parseInt(modelNameRef.current.value),
            SelColumns: selColumns,
            Coordinates: coordinates,
          }
        ]
      }
    });

    document.getElementById('chart_choose').checked = false;
    clearPanelInputs();
  }

  const clearPanelInputs = () => {
    setPanel('');
    setChartForms(null);

    //Kolon listesi sıfırladık
    setColList([]);

    //Panel Form Listesini kaldırdık
    let panel_form = document.getElementById('panelForm')
    if(panel_form.classList.contains('flex')) {
      panel_form.classList.add('hidden');
      panel_form.classList.remove('flex');
    }

    //Panel Form inputlarını sıfırladık
    panelNameRef.current.value = "";
    modelNameRef.current.value = "default";

    //Seçili paneli kaldırdık
    for(let a of ch_cards) {
      if(document.getElementById(a + "_card").classList.contains("border-green_pantone")) {
        document.getElementById(a + "_card").classList.remove("border-green_pantone");
        document.getElementById(a + "_card").classList.add("border-transparent");
      }
    }

  }

  const savePage = async () => {
    
    document.getElementById('save-page-btn').innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
    document.getElementById('save-page-btn').disabled = true;

    let parse = JSON.parse(localStorage["rgl-8"])
    console.log(parse)

    let panels = [...pageContent.page_data.panels]

    for (let [index , a] of pageContent.page_data.panels.entries()) {
      for (let b of parse.layouts.lg) {

        if(a.PanelID === b.i) {

          panels[index] = {
            ...pageContent.page_data.panels[index],
            Coordinates: {
              w: b.w,
              h: b.h,
              x: b.x,
              y: b.y,
              minW: b.minW,
              minH:	b.minH,

            }
          }

          await WorkspaceAll.putFiles(pageContent.page_id, {page_data: {panels: panels}})

          setPageContent({
            ...pageContent,
            page_data: {
              ...pageContent.page_data,
              panels: panels
            }
          })
        }
      }
    }

    document.getElementById('save-page-btn').innerHTML = '<i class="fa-solid fa-check text-green_pantone"></i>';

    setTimeout(() => {
      document.getElementById('save-page-btn').innerHTML = '<i class="fa-solid fa-floppy-disk"></i>';
      document.getElementById('save-page-btn').disabled = false;
    }, 5000);
  }

  const chart_data = {
    allAxis,
    chartForms,
    colList,
    xColSelRef,
    yColSelRef,
    modelNameRef,
    panelNameRef,
    pageContent,
    titleAxis,
    valueAxis,
    panel,
    addAxis,
    axisSel,
    chooseChart,
    clearPanelInputs,
    dltAxis,
    dltPanel,
    editPanel,
    modelNameSelect,
    savePage,
    savePanel,
    setPageContent,
    setAllAxis,
    setTitleAxis,
    setValueAxis,
  }
  //* ----------------------------------------------------------/
  

  return (
    <MainContext.Provider value={maincontext_data}>
      <ModalContext.Provider value={modal_data}>
        <ChartContext.Provider value={chart_data}>
          <Navbar new_btn={"hidden"} page_btn={"hidden"} save_page_btn={"hidden"} />
          <Sidebar />
          <Filepath />

          <div className="pt-[89px] pb-10 pl-[100px] pr-[10px]">
            <Outlet />
          </div>

          <DataModal />
        </ChartContext.Provider>
      </ModalContext.Provider>
    </MainContext.Provider >
  )
}
