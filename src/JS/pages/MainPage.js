import React , { useState , useRef , useEffect } from 'react'
import { MainContext, ModalContext, ChartContext, UnionDataModalContext } from '../components/context'
import WorkspaceAll from '../libraries/categories/Workspace';
import Data from '../libraries/categories/Data';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Filepath from '../components/Filepath';
import DataModal from '../components/datamodal/DataModal';
import UnionDataModal from '../components/uniondatamodal/UnionDataModal';
import { getAlias } from '../libraries/misc';
import Bar from '../components/panels/forms/Bar';
import TreeMap from '../components/panels/forms/TreeMap';
import Line from '../components/panels/forms/Line';
import Mark from '../components/panels/forms/Mark';
import Pie from '../components/panels/forms/Pie';
import Table from '../components/panels/forms/Table';
import Pivot from '../components/panels/forms/Pivot';
import Error from '../components/Error'
import Loading from '../components/Loading'


export default function MainPage() {

  const [collections, setCollections] = useState([]);
  const [folders, setFolders] = useState({directories: []});
  const [filesChildDirs, setFilesChildDirs] = useState({child_dirs: []});
  const [files, setFiles] = useState({pages: []});
  const [filepath, setFilePath] = useState([]);
  const [deleteItemRef, setDeleteItemRef] = useState({});
  const [deleteItemType, setDeleteItemType] = useState('');
  const [modalChecked, setModalChecked] = useState(false);
  const [unionEditChecked, setUnionEditChecked] = useState(false);
  const [modalType, setModalType] = useState({});
  const [unionInformations, setUnionInformations] = useState({});

  const [treeCollections, setTreeCollections] = useState({owned: []});
	
	const getTreeCollections = async () => {
    let resp = await WorkspaceAll.getTrees();
    if (resp === undefined || resp === null) return;
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
    setTimeout(() => {
      getTreeCollections();
    }, 750);
    
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
  const checkDBSchemaRef = useRef([])
  
  const [dbSchemas, setDbSchemas] = useState([])
  const [choosenSchema, setChoosenSchema] = useState("");
  const [checkedConnector , setCheckedConnector] = useState(false);
  const [checkedExpress , setCheckedExpress] = useState(false);
  const [checkedConnection, setCheckedConnection] = useState(false)

  const clearRefs = (type) => {
    if(type === "koleksiyon") {
      colNameRef.current.value = "";
      colServerRef.current.value = "";
      colConnectorServerRef.current.value = "";
      colWorksNickRef.current.value = "";
      colWorksPassRef.current.value = "";
      colWorksDBRef.current.value = "";
      colWorksSelectRef.current.value = "default";
      colPortRef.current.value = "1433";
      checkDBSchemaRef.current.value = [];
      setDbSchemas([]);
      setChoosenSchema("");
      setCheckedConnector(false);
      setCheckedConnection(false);
      setCheckedExpress(false);

      
      let warns = ["1" , "2" , "3"]

      for (let w of warns) {
        document.getElementById('colWarn' + w).classList.remove('!block');
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

  const deleteModel = async (id) => {
    let resp = await Data.dltModel(id);
    getList();
  }

  const [unionList, setUnionList] = useState([]);

  const getUnions = async () => {
    let resp = await Data.getUnionList();
    console.log(resp)
    setUnionList(resp.Data.owned_unions);
  }

  const deleteUnion = async (id) => {
    let resp = await Data.dltUnion(id);
    getUnions();
  }

  const maincontext_data = {
    collections,
    dbSchemas,
    folders,
    files,
    filesChildDirs,
    colNameRef,
    choosenSchema,
    checkDBSchemaRef,
    foldNameRef,
    fileNameRef,
    checkedConnector,
    checkedConnection,
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
    setCheckedConnection,
    setCheckedExpress,
    setDeleteItemRef,
    setDeleteItemType,
    setDbSchemas,
    setChoosenSchema,
    setFilePath,

    treeCollections,
    getTreeCollections,
    setTreeCollections,
  }

  const modal_data = {
    modalChecked,
    unionEditChecked,
    modalList,
    modalType,
    unionInformations,
    unionList,
    deleteModel,
    deleteUnion,
    getList,
    getUnions,
    setModalChecked,
    setUnionEditChecked,
    setUnionInformations,
    setModalType,
    setUnionList,
  }

  //* Panel Data Funcs------------------------------------------/

  const panelNameRef = useRef("");
  const modelNameRef = useRef("");
  const xColSelRef = useRef("default");
  const yColSelRef = useRef("default");
  const conditionInput = useRef([]);
  const conditionColumnSelect = useRef([]);
  const conditionTransactionSelect = useRef([]);
  const sortColumnSelect = useRef([]);
  const sortColumnTypeSelect = useRef([]);

  const [colList, setColList] = useState([]);
  const [panelType, setPanelType] = useState("");
  const [chartForms, setChartForms] = useState();
  const [allAxis, setAllAxis] = useState([]);
  const [titleAxis, setTitleAxis] = useState([]);
  const [valueAxis, setValueAxis] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [panelSort, setPanelSort] = useState([]);
  const [panel, setPanel] = useState("");
  const [pageContent, setPageContent] = useState({page_data : {panels: []}});

  var ch_cards = ["bar", "treemap", "line", "mark", "gauge", "pie", "table", "pivot"];
  const chooseChart = (type) => {
    clearPanelInputs();
    setPanel("");
    let card = document.getElementById(type + "_card");
    let panel_form = document.getElementById('panelForm')

    if(panel_form.classList.contains('hidden')) {
      panel_form.classList.remove('hidden')
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
    console.log(id);
    let first_id = id;
    let query = {};
    let colList_temp = [];

    if (first_id.includes("Union")) { // Union mu yoksa düz model mi diye kontrol ediyoruz

      id = parseInt(id);
      for(let a of unionList) { if (a.union_id === id) { query = a } }
      var keyMain = Object.keys(query.columns)
      var valueMain = Object.values(query.columns)

    } else {

      id = parseInt(id);
      for(let a of modalList) { if (a.model_id === id) { query = a } }
      var keyMain = Object.keys(query.query.select)
      var valueMain = Object.values(query.query.select)

    }

    console.log(query);

    let arrMain = [];
    for (let v in valueMain) {
      //* Toplam vb işlemler için kolonları 3 e bölerek isimlendirdik. Valuesi true gelenler, sum-min vs gelenler bir de içerisinde {} bulunduranlar olarak.
      if (valueMain[v] === true) {
        arrMain.push(keyMain[v])
      } else if (keyMain[v].includes("{")) {
        arrMain.push(keyMain[v].replaceAll("{" , "").replaceAll("}" , ""))
      } else {
        arrMain.push(keyMain[v] + "_" + valueMain[v])
      }
    }

    if (first_id.includes("Union")) { // Union mu yoksa düz model mi diye kontrol ediyoruz
      colList_temp = [{[query.union_name] : {columns: [...valueMain, "CATEGORY"] , alias: query.union_id}}];
    } else {
      colList_temp = [{[query.query.table] : {columns: arrMain , alias: query.query.alias}}];

      for(let b of query.query.includes) {
        let arrAlias = [];
        let valueAlias =Object.values(b.select);
        let keyAlias =Object.keys(b.select);
  
        for (let v in valueAlias) {
          if (valueAlias[v] === true) {
            arrAlias.push(keyAlias[v])
          } else if (keyAlias[v].includes("{")) {
            arrAlias.push(keyAlias[v].replaceAll("{" , "").replaceAll("}" , ""))
          } else {
            arrAlias.push(keyAlias[v] + "_" + valueAlias[v])
          }
        }
        colList_temp.push({[b.table] : {columns: arrAlias , alias: b.alias}});
      }
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

  const addCondition = () => {
    var con = "";

    con = getAlias(conditions);
    if (conditions.length > 0) {
      setConditions([...conditions, "AND", con]);
    } else {
      setConditions([...conditions, con]);
    }
  }

  const deleteCondition = (alias) => {
    let cond = [...conditions];
    
    // Bir indeks belirledik ve duruma göre bu indexleri diziden çıkardık. filter metodu yerine bunu kullandık çünkü AND leri de silmeliydik
    const index = cond.indexOf(alias);
    if (index > -1) {

      if (index === 0) {
        cond.splice((index), 2);
      } else {
        cond.splice(index, 1);
        cond.splice((index - 1), 1);
      }
    }

    setConditions(cond)
    // setConditions(conditions.filter(item => item !== alias))
  }

  const addSort = () => {
    var sort = "";

    sort = getAlias(panelSort);
    setPanelSort([...panelSort, sort]);
  }

  const deleteSort = (alias) => {
    setPanelSort(panelSort.filter(item => item !== alias))
  }

  //Edit Panel-----------------------------------------------------------------------------------------------------------------
  let als = [];
  let alX = [];
  let alY = [];
  const editPanel = (panelID) => {
    console.log(panelID)
    for(let p of pageContent.page_data.panels) {
      if(p.PanelID === panelID) {
        // Chart choose
        chooseChart(p.PanelType);

        // ModelName
        modelNameRef.current.value = p.ModelID
        modelNameSelect(p.ModelID);

        setPanel(panelID);
        // X-Y Axis (We use setTimeout because chooseChart sometimes came with delay)
        setTimeout(() => {
          if (p.PanelType === "bar" || p.PanelType === "line" || p.PanelType === "pie") {

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

        // Koşullar
        let plainAlias = [];
        for (let cond of p.WherePlain) {
          let con = getAlias(plainAlias);

          if (cond === "AND") {
            plainAlias.push("AND")
          } else {
            plainAlias.push(con)
          }

        }
        console.log(plainAlias)
        setConditions(plainAlias);

        // Sıralama
        let sortAlias = [];
        for (let sort of Object.keys(p.Order)) {
          let al = getAlias(sortAlias);
          sortAlias.push(al)
        }
        setPanelSort(sortAlias);
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

    if (panel !== "" && conditions.length > 0) {
      for (let p of pageContent.page_data.panels) {
        if (p.PanelID === panel) {

          setTimeout(() => {
            for (let cond in conditions) { //+ Burada 2 kere dönüyor. İleride daha iyi yazabilir misin bak
              if (conditions[cond] !== "AND") {
                for (let wp in p.WherePlain){
                  if (cond > p.WherePlain.length) return; // Conditions daha fazla elemana sahip olursa diye bir kontrol koyduk. Böylelikle whereplain' in uzunluğu kadar döndürecek döngüyü

                  conditionColumnSelect.current[conditions[cond]].value = Object.keys(p.WherePlain[cond])[0]; // Kolonları bulduk
                  conditionTransactionSelect.current[conditions[cond]].value = Object.keys(Object.values(p.WherePlain[cond])[0])[0]; // Kolonların işlemlerini bulduk
                  conditionInput.current[conditions[cond]].value = Object.values(Object.values(p.WherePlain[cond])[0])[0]; // Kolonların işlem değerlerini bulduk
                }
              }
            }
  
            for (let sort in panelSort) {
              sortColumnSelect.current[panelSort[sort]].value = Object.keys(p.Order)[sort]        //Kolon adını bulduk
              sortColumnTypeSelect.current[panelSort[sort]].value = Object.values(p.Order)[sort]  // Kolonların sıralamalarını bulduk
            }
            
          }, 300);
        }
      }
    }

  }, [allAxis , titleAxis , valueAxis , conditions , panelSort])
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
    let wherePlain = [];
    let order = {};

    for(let p of pageContent.page_data.panels) {
      panelIDs.push(p.PanelID);
    }

    let coordinates = getCoordinates();
    
    if (panel === "") {
      lastPanelID = getAlias(panelIDs);
    }

    // WherePlain i çekmek için burada gerekli şeyleri belirledik ve listeye dahil ettik
    for (let c of conditions) {
      if (c !== "AND") { // "" yani AND olanlar için kontrol
        let sel = conditionColumnSelect.current[c].value //.split("/")[2]
        let tr = conditionTransactionSelect.current[c].value
        let inp = conditionInput.current[c].value
  
        let wp = {[sel] : {[tr] : inp}}; // Örn: where_plain: [{"BORC_SUM": {"bte": 2000}}]
        wherePlain.push(wp);
      } else {
        wherePlain.push("AND")
      }
    }
    console.log(wherePlain)

    // Order' ı çekmek için burada gerekli şeyleri belirledik ve order objesini oluşturduk
    for (let o of panelSort) {
      let col = sortColumnSelect.current[o].value //.split("/")[2]
      let type = sortColumnTypeSelect.current[o].value
      order = {
        ...order,
        [col] : type
      }
    }
    console.log(order);
  
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
            ModelID: modelNameRef.current.value,
            SelColumns: selColumns,
            Coordinates: coordinates,
            WherePlain: wherePlain,
            Order: order,
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
            ModelID: modelNameRef.current.value,
            SelColumns: selColumns,
            Coordinates: coordinates,
            WherePlain: wherePlain,
            Order: order,
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

    //Koşul listesini sıfırladık
    setConditions([]);
    conditionInput.current = [];
    conditionColumnSelect.current = [];
    conditionTransactionSelect.current = [];

    //Sıralama listesini sıfırladık
    setPanelSort([]);
    sortColumnSelect.current = [];
    sortColumnTypeSelect.current = [];

    //Kolon listesi sıfırladık
    setColList([]);

    //Panel Form Listesini kaldırdık
    let panel_form = document.getElementById('panelForm')
    if(!panel_form.classList.contains('hidden')) {
      panel_form.classList.add('hidden');
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

  const [error, setError] = useState("Hata")
  const errorHandler = (err) => {
    setError(err)
  }

  const chart_data = {
    allAxis,
    chartForms,
    colList,
    conditions,
    pageContent,
    panelSort,
    titleAxis,
    valueAxis,
    panel,

    conditionColumnSelect,
    conditionInput,
    conditionTransactionSelect,
    xColSelRef,
    yColSelRef,
    modelNameRef,
    panelNameRef,
    sortColumnSelect,
    sortColumnTypeSelect,

    addAxis,
    addCondition,
    addSort,
    axisSel,
    chooseChart,
    clearPanelInputs,
    deleteCondition,
    deleteSort,
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
            <UnionDataModal />
            {/* <Loading /> */}
            {/* <Error err={error} /> */}
        </ChartContext.Provider>
      </ModalContext.Provider>
    </MainContext.Provider >
  )
}
