import React , { useState , useRef } from 'react'
import { MainContext, ModalContext, ChartContext } from '../components/context'
import WorkspaceAll from '../libraries/categories/Workspace';
import Data from '../libraries/categories/Data';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Filepath from '../components/Filepath';
import DataModal from '../components/datamodal/DataModal';
import Bar from '../components/panels/forms/Bar';
import { getAlias } from '../libraries/misc';


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
    console.log(resp)

    setModalList(resp.Data.owned_models);
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
  }

  const modal_data = {
    modalChecked,
    modalList,
    modalType,
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
  const [pageContent, setPageContent] = useState({page_data : {panels: []}});

  var ch_cards = ["bar", "treemap", "line", "mark", "gauge", "pie", "table", "pivot"];
  const chooseChart = (type) => {
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

    setPanelType(type);
  }

  const modelNameSelect = (id) => {
    id = parseInt(id);
    let query = {};
    let colList_temp = [];

    for(let a of modalList) { if (a.model_id === id) { query = a } }
    console.log(query);

    colList_temp = [{[query.query.table] : {columns: Object.keys(query.query.select) , alias: query.query.alias}}];

    for(let b of query.query.includes) {
      colList_temp.push({[b.table] : {columns: Object.keys(b.select) , alias: b.alias}});
    }
    console.log(colList_temp)
    
    setColList(colList_temp);
  }

  const axisSel = () => {
    let selColumns = {xAxis:{} , yAxis:{}};

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

    return selColumns;
  }

  const getCoordinates = () => {
    let crd = {};
    if(panelType === "bar") {crd = { w: 4, h: 10, x: 0, y: 0, minW: 2, minH: 5}}
    console.log(crd)
    return crd;
  }

  const savePanel = () => {
    let selColumns = axisSel();
    let panelIDs = [];

    for(let p of pageContent.page_data.panels) {
      panelIDs.push(p.PanelID);
    }

    let coordinates = getCoordinates();

    let content_temp = pageContent;

    content_temp.page_data.panels.push({
      PanelID: getAlias(panelIDs),
      PanelType: panelType,
      PanelName: panelNameRef.current.value,
      ModelID: parseInt(modelNameRef.current.value),
      SelColumns: selColumns,
      Coordinates: coordinates,
    });

    setPageContent(content_temp);

    WorkspaceAll.putFiles(content_temp.page_id , {page_data: content_temp.page_data});
  }

  const chart_data = {
    chartForms,
    colList,
    xColSelRef,
    yColSelRef,
    modelNameRef,
    panelNameRef,
    pageContent,
    axisSel,
    chooseChart,
    modelNameSelect,
    savePanel,
    setPageContent,
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
