import React , { useState , useRef , useEffect } from 'react'
import { MainContext, ModalContext, ChartContext, ShareContext } from '../components/context'
import WorkspaceAll from '../libraries/categories/Workspace';
import Data from '../libraries/categories/Data';
import { Outlet, useNavigate } from 'react-router-dom';
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
import Loading from '../components/Loading'
import Error from '../components/Error'
import ShareModal from '../components/share/ShareModal';
import Service from '../libraries/categories/Service';


export default function MainPage() {
  //! LOGIN CHECK ----------------------------------
  var navigate = useNavigate();

  const loginControl = async () => {
    try {
      let tkn = await Service.getProfile()
    } catch (error) {
      navigate("/giris")
    }

    await gatewayCheck();
  }

  const gatewayCheck = async () => {
    let gw_control = await Service.getPing();

    if (gw_control.Success) { setGatewayClientCheck(true) }
    else { setGatewayClientCheck(false) }
  }

  useEffect(() => {
    if (localStorage.Token !== undefined) { loginControl() }
    else { navigate("/giris") }
  }, [])
  //! --------------------------------------------

  //! FUNCLOAD -----------------------------------
  
  const [errorText, setErrorText] = useState({code: "", message: "", response: ""});

  const funcLoad = async (func, ...arg) => {
    try {
      document.getElementById('loadingScreen').checked = true;

      let rt = await func(...arg)

      document.getElementById('loadingScreen').checked = false;

      return rt;
      
    } catch (error) {
      document.getElementById('loadingScreen').checked = false;
      document.getElementById('errorScreen').checked = true;

      let response = undefined;
      if(error.response !== undefined && error.response !== null) response = error.response.data.Data
      setErrorText({code: error.code, message: error.message, response: response})
    }
  }

  const funcLoadForSpesific = async (loading_id, error_id, func, ...arg) => {
    try {
      document.getElementById(loading_id).checked = true;

      let rt = await func(...arg)

      document.getElementById(loading_id).checked = false;

      return rt;
      
    } catch (error) {
      document.getElementById(loading_id).checked = false;
      document.getElementById(error_id).checked = true;

      let response = undefined;
      if(error.response !== undefined && error.response !== null) response = error.response.data.Data
      setErrorText({code: error.code, message: error.message, response: response})
    }
  }

  //! --------------------------------------------
  
  const [collections, setCollections] = useState([]);
  const [folders, setFolders] = useState({directories: []});
  const [filesChildDirs, setFilesChildDirs] = useState({child_dirs: []});
  const [files, setFiles] = useState({pages: []});
  const [filepath, setFilePath] = useState([]);
  const [checkInPage, setCheckInPage] = useState(false);
  const [deleteItemRef, setDeleteItemRef] = useState({});
  const [deleteItemType, setDeleteItemType] = useState('');
  const [modalChecked, setModalChecked] = useState(false);
  const [unionEditChecked, setUnionEditChecked] = useState(false);
  const [gatewayClientCheck, setGatewayClientCheck] = useState(false);
  const [modalType, setModalType] = useState({});
  const [unionInformations, setUnionInformations] = useState({});
  const [allFavorites, setAllFavorites] = useState([]);

  const [editCollectionDetails, setEditCollectionDetails] = useState({});
  const [editFolderDetails, setEditFolderDetails] = useState({});
  const [editFileDetails, setEditFileDetails] = useState({});

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
		setFilesChildDirs(resp.Data)
		setFiles(resp.Data)
		setFilePath(resp.Data.path)
  }

  const deleteItems = async (del_type , id) => {
    if(del_type === 'collection') {
      let resp = await WorkspaceAll.deleteCollections(id);
      await funcLoad(getColWorks);
    }
    else if(del_type === 'folder') {
      let resp = await WorkspaceAll.deleteFolders(id);

      if(resp.Data.parent_directory === null) {
        await funcLoad(getFolderWorks, resp.Data.collection_id);
      }
      else {
        await funcLoad(getFileWorks, resp.Data.parent_directory);
      }
    }
    else if(del_type === 'file') {
      let resp = await WorkspaceAll.deleteFiles(id);
      await funcLoad(getFileWorks, resp.Data.directory_id);
    }
    setTimeout(() => {
      getTreeCollections();
    }, 750);
    funcLoad(getFavorites);    
  }

  const getCollectionDetails = (dt) => {
    setEditCollectionDetails(dt);
    colNameRef.current.value = dt.collection_name;
    colWorksSelectRef.current.value = dt.connector.connector_type;
    colWorksNickRef.current.value = dt.connector.context.user;
    colWorksPassRef.current.value = dt.connector.context.password;
    colWorksDBRef.current.value = dt.connector.context.database;
    colServerRef.current.value = dt.connector.context.server;
    colPortRef.current.value = dt.connector.context.port;

    if (dt.connector.context.options.instancename !== undefined) {
      setCheckedExpress(true)
    }

    if (dt.connector.gateway_host !== null) {
      setCheckedConnector(true)
    }
  }

  useEffect(() => {
    if (Object.keys(editCollectionDetails).length > 0) {
      if (editCollectionDetails.connector.gateway_host !== null) {
        colConnectorServerRef.current.value = editCollectionDetails.connector.gateway_host;
      }
    }
  }, [editCollectionDetails])
  
	const getFolderDetails = (dt) => {
    setEditFolderDetails(dt);
    foldNameRef.current.value = dt.directory_name		
	}
  
	const getFileDetails = (dt) => {
    setEditFileDetails(dt);
    fileNameRef.current.value = dt.page_name		
	}

  const getFavorites = async () => {
    let favs = await WorkspaceAll.getFavorites();

    if (favs !== undefined) {
      for (let f of favs.Data) {
        for (let c of Object.keys(favoriteRef.current)) {
          if (f.page_id === parseInt(c) && (favoriteRef.current[f.page_id] !== null)) { //. Check null of ref currents
            favoriteRef.current[f.page_id].classList.add("text-yellow-500")          
          }
        }
      }

      setAllFavorites(favs.Data);
    }
  }

  const favoriteFile = async (id, type = undefined) => {

    //f Check type. If delete from sidebar type = delete. If fav/delete from page btn we'll check again
    if (type === "delete") {
      let del = await WorkspaceAll.deleteFavorites(id);
      if (favoriteRef.current[id] !== null && favoriteRef.current[id] !== undefined) {
        favoriteRef.current[id].classList.remove("text-yellow-500")
      }
    }
    else {
      if (favoriteRef.current[id].classList.contains("text-yellow-500")) {
        let del = await WorkspaceAll.deleteFavorites(id);
        favoriteRef.current[id].classList.remove("text-yellow-500")
      }
      else {
        let fav = await WorkspaceAll.postFavorites(id);
        favoriteRef.current[id].classList.add("text-yellow-500")
      }
    }
    await getFavorites();

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
  const [checkedTrialPack , setCheckedTrialPack] = useState(true);
  const [checkedExpress , setCheckedExpress] = useState(false);
  const [checkedConnection, setCheckedConnection] = useState(false)
  const [publicCheck, setPublicCheck] = useState(false);

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
      setCheckedTrialPack(true);
      setCheckedExpress(false);
      setEditCollectionDetails({})
      
      let warns = ["1" , "2" , "3"]

      for (let w of warns) {
        document.getElementById('colWarn' + w).classList.remove('!block');
      }

    }
    else if(type === "klasör") {
      setEditFolderDetails({})
      foldNameRef.current.value = "";
      if(document.getElementById('foldWarn').classList.contains('!block')) {
        document.getElementById('foldWarn').classList.remove('!block');
      }
    }
    else if(type === "sayfa") {
      setEditFileDetails({})
      fileNameRef.current.value = "";
      if(document.getElementById('fileWarn').classList.contains('!block')) {
        document.getElementById('fileWarn').classList.remove('!block');
      }
    }
  }
  
  const [modalList, setModalList] = useState([]);
  const [publicModalList, setPublicModalList] = useState([]);

  const getList = async () => {
    let resp = await Data.getModalList();
    
    setModalList(resp.Data.owned_models);
    setPublicModalList(resp.Data.public_models);
  }

  const deleteModel = async (id) => {
    let resp = await Data.dltModel(id);
    await getList();
  }

  const [unionList, setUnionList] = useState([]);

  const getUnions = async () => {
    let resp = await Data.getUnionList();
    setUnionList(resp.Data.owned_unions);
  }

  const deleteUnion = async (id) => {
    let resp = await Data.dltUnion(id);
    await getUnions();
  }

  const [viewList, setViewList] = useState([]);

  //! Paylaşımda gözükmüyor
  const getViews = async (content = {}) => {
    if(!Object.keys(content).includes("collection")) return;

    // let resp = await WorkspaceAll.getCollections(col_id); //Normalde content yerine col_id göndeeriyorduk

    // if (resp.Data.owned_collections) return;
    let gateway = content.collection.connector.gateway_host;

    let view_resp = await Data.getExplorer(content.collection_id, gateway, undefined, false, true, true);

    let tempViews = []

    for (let tbl of view_resp.Data) {
      if (tbl.type === 'VIEW') tempViews.push(tbl)
    }

    setViewList(tempViews);
  }

  //* Panel Data Funcs------------------------------------------/

  const panelNameRef = useRef("");
  const modelNameRef = useRef("");
  const xColSelRef = useRef("default");
  const yColSelRef = useRef("default");
  const xColSelGroupRef = useRef("default");
  const yColSelGroupRef = useRef("default");
  const conditionInput = useRef([]);
  const conditionInput2 = useRef([]);
  const conditionColumnSelect = useRef([]);
  const conditionTransactionSelect = useRef([]);
  const sortColumnSelect = useRef([]);
  const sortColumnTypeSelect = useRef([]);
  const dataColumnRef = useRef([]);
  const favoriteRef = useRef([]);
  const panelFeaturesRef = useRef();
  const panelPreviewRef = useRef();
  const panelFeaturesButtonRef = useRef();
  const panelPreviewButtonRef = useRef();
  const previewButtonRef = useRef();

  const [colList, setColList] = useState([]);
  const [panelType, setPanelType] = useState("");
  const [chartForms, setChartForms] = useState();
  const [chartTypesForReview, setChartTypesForReview] = useState();
  const [allAxis, setAllAxis] = useState([]);
  const [titleAxis, setTitleAxis] = useState([]);
  const [valueAxis, setValueAxis] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [panelSort, setPanelSort] = useState([]);
  const [panel, setPanel] = useState("");
  const [pageContent, setPageContent] = useState({page_data : {panels: [], dragresize: false}});
  const [panelEdit, setPanelEdit] = useState(false);
  const [allPanelsDragResize, setAllPanelsDragResize] = useState(false);
  const [error, setError] = useState("Hata")
  const [yAxisReview, setYAxisReview] = useState([]);
  const [yDatasReview, setYDatasReview] = useState([]);
  const [sumReview, setSumReview] = useState(0);

  useEffect(() => {
    setAllPanelsDragResize(pageContent.page_data.dragresize)
  }, [pageContent])

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

    if (type === "bar") {setChartForms(<Bar />); setChartTypesForReview("bar")}
    else if (type === "treemap") {setChartForms(<TreeMap />); setChartTypesForReview("treemap")}
    else if (type === "line") {setChartForms(<Line />); setChartTypesForReview("line")}
    else if (type === "mark") {setChartForms(<Mark />); setChartTypesForReview("mark")}
    else if (type === "pie") {setChartForms(<Pie />); setChartTypesForReview("pie")}
    else if (type === "table") {setChartForms(<Table />); setChartTypesForReview("table")}
    else if (type === "pivot") {setChartForms(<Pivot />); setChartTypesForReview("pivot")}

    if (panelFeaturesRef.current.classList.contains('hidden')) { panelFeaturesRef.current.classList.remove('hidden') }
    if (!panelPreviewRef.current.classList.contains('hidden')) { panelPreviewRef.current.classList.add('hidden') }
    if (!previewButtonRef.current.classList.contains('hidden')) { previewButtonRef.current.classList.add('hidden') }

    if (!panelFeaturesButtonRef.current.classList.contains('bg-jet_mid')) {
      panelFeaturesButtonRef.current.classList.remove('bg-earie_black')
      panelFeaturesButtonRef.current.classList.remove('hover:bg-darker_jet')
      panelFeaturesButtonRef.current.classList.add('bg-jet_mid')
    }

    if (panelPreviewButtonRef.current.classList.contains('bg-jet_mid')) {
      panelPreviewButtonRef.current.classList.remove('bg-jet_mid')
      panelPreviewButtonRef.current.classList.add('bg-earie_black')
      panelPreviewButtonRef.current.classList.add('hover:bg-darker_jet')
    }
    
    setYAxisReview([]);
    setYDatasReview([]);
    setSumReview(0)

    setPanelType(type);
  }

  const changePanelTab = (btnRef, tabRef) => {
    let btns = [panelFeaturesButtonRef, panelPreviewButtonRef] //. Buttons
    let tabs = [panelFeaturesRef, panelPreviewRef] //. Tabs

    for (let a of btns) {                                      //. Change buttons css to default
      if (a.current.classList.contains('bg-jet_mid')) {
        a.current.classList.remove('bg-jet_mid')
        a.current.classList.add('bg-earie_black')
        a.current.classList.add('hover:bg-darker_jet')
      }
    }

    btnRef.current.classList.remove('bg-earie_black')
    btnRef.current.classList.remove('hover:bg-darker_jet')
    btnRef.current.classList.add('bg-jet_mid')

    for (let t of tabs) {                                      //. Change buttons css to default
      if (!t.current.classList.contains('hidden')) {
        t.current.classList.add('hidden')
      }
    }

    tabRef.current.classList.remove('hidden')

    if (tabRef === panelPreviewRef) {
      previewButtonRef.current.classList.remove('hidden')
    }
    else if (tabRef !== panelPreviewRef && !previewButtonRef.current.classList.contains('hidden')) {
      previewButtonRef.current.classList.add('hidden')
    }
  }

  const reviewChartTable = async () => {
    //! SAVE PANEL KISMINDAN YAPACAKSIN ORADAN YOLA ÇIK!!!!!!!
    let col = pageContent.collection.connector.gateway_host
    let selGroup = axisGroupSel(panelType)
    let selColumns = axisSel(panelType);

    if (modelNameRef.current.value === "default") return

    // WherePlain i çekmek için burada gerekli şeyleri belirledik ve listeye dahil ettik
    let where_plain = []
    for (let c of conditions) {
      if (c !== "AND") { // "" yani AND olanlar için kontrol
        let sel = conditionColumnSelect.current[c].value.split("/")[2]
        let tr = conditionTransactionSelect.current[c].value
        let inp = conditionInput.current[c].value

        if (!conditionInput2.current[c].classList.contains("hidden")) {
          let inp2 = conditionInput2.current[c].value
          var wp = {[sel] : {[tr] : inp + "' AND '" + inp2}}; // Örn: where_plain: [{"BORC_SUM": {"bte": 2000}}]
        }
        else {
          var wp = {[sel] : {[tr] : inp}}; // Örn: where_plain: [{"BORC_SUM": {"bte": 2000}}]
        }
        where_plain.push(wp);
      } 
      else {
        where_plain.push("AND")
      }
    }
    if (where_plain.length === 0) where_plain = undefined;

    let order = {}
    for (let o of panelSort) {
      let col = sortColumnSelect.current[o].value.split("/")[2]
      let type = sortColumnTypeSelect.current[o].value
      order = {
        ...order,
        [col] : type
      }
    }
    if (Object.keys(order).length === 0) order = undefined;

    if (modelNameRef.current.value.includes("_Union")) {
      var respData = await Data.postExecute({union_id: modelNameRef.current.value.replace("_Union" , "") , collection_id: pageContent.collection_id, where_plain: where_plain, order: order}, col);
    } 
    else if (modelNameRef.current.value.includes("_View")) {

      let view_id = modelNameRef.current.value.replace("_View" , "")
      let query = {table: view_id , where_plain: where_plain, order: order, select: selGroup}
      var respData = await Data.postExecute({collection_id: pageContent.collection_id, query}, col);
  
    } 
    else {
      var respData = await Data.postExecute({model_id: modelNameRef.current.value , collection_id: pageContent.collection_id, where_plain: where_plain, order: order, columns: selGroup}, col);
    }

    let yAxisTemp = [];
    var data = [];

    yAxisTemp = Object.keys(respData.Data[0])
  
    for(let d of respData.Data) {
      let el = []
      for(let y of yAxisTemp) {
        el.push(d[y]);
      }
      data.push(el);
    }

    //. Sayı olan kolonları ayırdım sıralarına göre yani 2.kolondakilerin toplamı 12312, 1.kolondakilerin toplamı 12312 gibi {2: 12312, 1: 12312}
    let last_sum = {};
    
    for (let n of data) {
      for (let num in n) {
        if ((typeof(n[num]) === 'number')) {
          if (last_sum[num] === undefined) last_sum[num] = 0;

          if (Object.keys(last_sum).length !== 0) {
            last_sum = {
              ...last_sum,
              [num]: last_sum[num] + n[num]
            }
          }
          else {
            last_sum = {
              ...last_sum,
              [num]: n[num]
            }
          }
          setSumReview(last_sum)
        }
      }
    }

    setYDatasReview(data);
    setYAxisReview(yAxisTemp)

  }

  const modelNameSelect = (id) => {
    let first_id = id;
    let query = {};
    let colList_temp = [];

    if (first_id.includes("Union")) { // Union mu yoksa düz model mi diye kontrol ediyoruz

      id = parseInt(id);
      for(let a of unionList) { if (a.union_id === id) { query = a } }
      var keyMain = Object.keys(query.columns)
      var valueMain = Object.values(query.columns)

    } else if (first_id.includes("View")) {
      let arr = [];

      id = id.split("_View")[0]
      for(let a of viewList) { if (a.table === id) { query = a } }
      
      for(let b of query.columns) {
        arr.push(b.name)
      }
      
      var keyMain = Object.keys(arr)
      var valueMain = Object.values(arr)

    } else if (first_id.includes("Public")) {

      id = parseInt(id);
      for(let a of publicModalList) { if (a.model_id === id) { query = a } }
      var keyMain = Object.keys(query.query.select)
      var valueMain = Object.values(query.query.select)
    
    } else {

      id = parseInt(id);
      for(let a of modalList) { if (a.model_id === id) { query = a } }
      var keyMain = Object.keys(query.query.select)
      var valueMain = Object.values(query.query.select)

    }

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
    } else if (first_id.includes("View")) {
      colList_temp = [{[query.table] : {columns: [...valueMain] , alias: query.table}}];
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
          alias: xColSelRef.current.value.split("/")[0],
          table: xColSelRef.current.value.split("/")[1],
          col: (xColSelGroupRef.current.value === "default") ? xColSelRef.current.value.split("/")[2] : xColSelRef.current.value.split("/")[2] + "_" + xColSelGroupRef.current.value,
        },
        yAxis:{
          alias: yColSelRef.current.value.split("/")[0],
          table: yColSelRef.current.value.split("/")[1],
          col: (yColSelGroupRef.current.value === "default") ? yColSelRef.current.value.split("/")[2] : yColSelRef.current.value.split("/")[2] + "_" + yColSelGroupRef.current.value,
        }
      }
    } else if (paneltype === "treemap" || paneltype === "mark" || paneltype === "table") {
      //* Burada toplu olarak Y ekseni değerlerini topladık. İlk başta ana yColRef kullandığımız için daha sonrasında eklenen eksen varsa diye bi if koyduk
      let ax = [
        {
          alias: yColSelRef.current.value.split("/")[0],
          table: yColSelRef.current.value.split("/")[1],
          col: (yColSelGroupRef.current.value === "default") ? yColSelRef.current.value.split("/")[2] : yColSelRef.current.value.split("/")[2] + "_" + yColSelGroupRef.current.value,
        }
      ];

      if (allAxis.length > 0) {
        for(var a of allAxis) {
          ax.push({
            alias: yColSelRef.current[a].value.split("/")[0],
            table: yColSelRef.current[a].value.split("/")[1],
            col: (yColSelGroupRef.current[a].value === "default") ? yColSelRef.current[a].value.split("/")[2] : yColSelRef.current[a].value.split("/")[2] + "_" + yColSelGroupRef.current[a].value,
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
            alias: xColSelRef.current.value.split("/")[0],
            table: xColSelRef.current.value.split("/")[1],
            col: (xColSelGroupRef.current.value === "default") ? xColSelRef.current.value.split("/")[2] : xColSelRef.current.value.split("/")[2] + "_" + xColSelGroupRef.current.value,
          }
        }
      }
    } else if (paneltype === "pivot") {

      if (dataColumnRef.current.classList.contains('!border-sea_green')) {
        var ax = [
          {
            alias: xColSelRef.current.value.split("/")[0],
            table: xColSelRef.current.value.split("/")[1],
            col: (xColSelGroupRef.current.value === "default") ? xColSelRef.current.value.split("/")[2] : xColSelRef.current.value.split("/")[2] + "_" + xColSelGroupRef.current.value,
            dataColumn: true,
          }
        ];
      }
      else {
        var ax = [
          {
            alias: xColSelRef.current.value.split("/")[0],
            table: xColSelRef.current.value.split("/")[1],
            col: (xColSelGroupRef.current.value === "default") ? xColSelRef.current.value.split("/")[2] : xColSelRef.current.value.split("/")[2] + "_" + xColSelGroupRef.current.value,
            dataColumn: false,
          }
        ];
      }
      
      let ay = [
        {
          alias: yColSelRef.current.value.split("/")[0],
          table: yColSelRef.current.value.split("/")[1],
          col: (yColSelGroupRef.current.value === "default") ? yColSelRef.current.value.split("/")[2] : yColSelRef.current.value.split("/")[2] + "_" + yColSelGroupRef.current.value,
        }
      ];

      if(titleAxis.length > 0) {
        for(var a of titleAxis) {
          if (dataColumnRef.current[a].classList.contains('!border-sea_green')) {
            ax.push({
              alias: xColSelRef.current[a].value.split("/")[0],
              table: xColSelRef.current[a].value.split("/")[1],
              col: (xColSelGroupRef.current[a].value === "default") ? xColSelRef.current[a].value.split("/")[2] : xColSelRef.current[a].value.split("/")[2] + "_" + xColSelGroupRef.current[a].value,
              dataColumn: true,
            })
          }
          else {
            ax.push({
              alias: xColSelRef.current[a].value.split("/")[0],
              table: xColSelRef.current[a].value.split("/")[1],
              col: (xColSelGroupRef.current[a].value === "default") ? xColSelRef.current[a].value.split("/")[2] : xColSelRef.current[a].value.split("/")[2] + "_" + xColSelGroupRef.current[a].value,
              dataColumn: false,
            })            
          }
        }
      }
      
      if(valueAxis.length > 0) {
        for(var a of valueAxis) {
          ay.push({
            alias: yColSelRef.current[a].value.split("/")[0],
            table: yColSelRef.current[a].value.split("/")[1],
            col: (yColSelGroupRef.current[a].value === "default") ? yColSelRef.current[a].value.split("/")[2] : yColSelRef.current[a].value.split("/")[2] + "_" + yColSelGroupRef.current[a].value,
          })
        }
      }

      selColumns = {
        yAxis:ay,
        xAxis:ax,
      }
    }

    return selColumns;
  }

  const axisGroupSel = (paneltype) => {
    let selGroups = {};

    if (paneltype === "bar" || paneltype === "line" || paneltype === "pie") {
      selGroups = {
        [xColSelRef.current.value.split("/")[2]]: (xColSelGroupRef.current.value === "default") ? true : xColSelGroupRef.current.value,
        [yColSelRef.current.value.split("/")[2]]: (yColSelGroupRef.current.value === "default") ? true : yColSelGroupRef.current.value
      }
    } 
    else if (paneltype === "treemap" || paneltype === "mark" || paneltype === "table") {
      //* Burada toplu olarak Y ekseni değerlerini topladık. İlk başta ana yColRef kullandığımız için daha sonrasında eklenen eksen varsa diye bi if koyduk

      if (paneltype === "table") {
        selGroups = {
          [yColSelRef.current.value.split("/")[2]]: (yColSelGroupRef.current.value === "default") ? true : yColSelGroupRef.current.value
        }

        for(var a of allAxis) {
          selGroups = {
            ...selGroups,
            [yColSelRef.current[a].value.split("/")[2]]: (yColSelGroupRef.current[a].value === "default") ? true : yColSelGroupRef.current[a].value,
          }
        }

      } else {
        selGroups = {
          [xColSelRef.current.value.split("/")[2]]: (xColSelGroupRef.current.value === "default") ? true : xColSelGroupRef.current.value,
          [yColSelRef.current.value.split("/")[2]]: (yColSelGroupRef.current.value === "default") ? true : yColSelGroupRef.current.value
        }

        for(var a of allAxis) {
          selGroups = {
            ...selGroups,
            [yColSelRef.current[a].value.split("/")[2]]: (yColSelGroupRef.current[a].value === "default") ? true : yColSelGroupRef.current[a].value,
          }
        }
      }
    } 
    else if (paneltype === "pivot") {

      selGroups = {
        [xColSelRef.current.value.split("/")[2]]: (xColSelGroupRef.current.value === "default") ? true : xColSelGroupRef.current.value,
        [yColSelRef.current.value.split("/")[2]]: (yColSelGroupRef.current.value === "default") ? true : yColSelGroupRef.current.value
      }
      
      if(titleAxis.length > 0) {
        for(var a of titleAxis) {
          selGroups = {
            ...selGroups,
            [xColSelRef.current[a].value.split("/")[2]]: (xColSelGroupRef.current[a].value === "default") ? true : xColSelGroupRef.current[a].value,
          }
        }
      }
    
      if(valueAxis.length > 0) {
        for(var a of valueAxis) {
          selGroups = {
            ...selGroups,
            [yColSelRef.current[a].value.split("/")[2]]: (yColSelGroupRef.current[a].value === "default") ? true : yColSelGroupRef.current[a].value,
          }
        }
      }
    }

    return selGroups;
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

  const dataColumnSelect = (alias) => {
    // Veri Kolonu olacaksa eğer butonun çevresi yeşil yanacak
    if (alias !== "O") {
      dataColumnRef.current[alias].classList.toggle('!border-sea_green')
    }
    else {
      dataColumnRef.current.classList.toggle('!border-sea_green')
    }
  }

  const getColList = (colList) => {
    let cols = []
    for (let t of colList) {
      let t_name = Object.keys(t)[0]
      let t_cols = t[Object.keys(t)[0]]['columns']
      let t_als = t[Object.keys(t)[0]]['alias']

      t_cols.map(c => {cols.push({
        table_name: t_name,
        column: (c.includes('|')) ? c.substring(c.indexOf('|') + 1) : c,
        alias: t_als
      })})

    }
    return cols.sort((a,b) => {
      if (a.column < b.column) return -1
    })
  }

  const refreshPage = async () => {
    let resp = await WorkspaceAll.getFiles(filepath[filepath.length - 1].id);
    
    if(resp.Data.page_data === null) {
      resp.Data.page_data = { panels: [] }
    }
    
    // setFilePath(resp.Data.path);
    // setCheckInPage(true);
    setPageContent(resp.Data);
  }

  const changeCondType = (type, cond) => {
    if (type === "btw" || type === "nbtw") {
      conditionInput.current[cond].classList.remove("!col-span-4")
      conditionInput.current[cond].classList.add("!col-span-2")
      conditionInput2.current[cond].classList.remove("hidden")
      conditionInput.current[cond].placeholder = "Küçük Değer"
    }
    else {
      conditionInput.current[cond].classList.remove("!col-span-2")
      conditionInput.current[cond].classList.add("!col-span-4")
      conditionInput2.current[cond].classList.add("hidden")
      conditionInput.current[cond].placeholder = "Değer giriniz"
    }
  }

  //* Edit Panel-----------------------------------------------------------------------------------------------------------------
  let als = [];
  let alX = [];
  let alY = [];
  let group = ["default", "SUM", "AVG", "MAX", "MIN"];
  const editPanel = (panelID) => {
    for(let p of pageContent.page_data.panels) {
      if(p.PanelID === panelID) {
        setPanelEdit(true); // For using useState

        // Chart choose
        chooseChart(p.PanelType);

        //PanelName
        panelNameRef.current.value = p.PanelName;

        // ModelName
        modelNameRef.current.value = p.ModelID
        modelNameSelect(p.ModelID);

        setPanel(panelID);
        // X-Y Axis (We use setTimeout because chooseChart sometimes came with delay)
        setTimeout(() => {
          if (p.PanelType === "bar" || p.PanelType === "line" || p.PanelType === "pie") {

            for (let g of group) {
              if(p.SelColumns.xAxis.col.includes("_" + g)) {
                let newCol = p.SelColumns.xAxis.col.replace(("_" + g) , "")             
                xColSelRef.current.value = p.SelColumns.xAxis.alias + "/" + p.SelColumns.xAxis.table + "/" + newCol
                xColSelGroupRef.current.value = g
                break;
              }
              else {
                xColSelRef.current.value = p.SelColumns.xAxis.alias + "/" + p.SelColumns.xAxis.table + "/" + p.SelColumns.xAxis.col
              }
            }
            
            for (let g of group) {
              if(p.SelColumns.yAxis.col.includes("_" + g)) {
                let newCol = p.SelColumns.yAxis.col.replace(("_" + g) , "")
                
                yColSelRef.current.value = p.SelColumns.yAxis.alias + "/" + p.SelColumns.yAxis.table + "/" + newCol
                yColSelGroupRef.current.value = g
                break;
              }
              else {
                yColSelRef.current.value = p.SelColumns.yAxis.alias + "/" + p.SelColumns.yAxis.table + "/" + p.SelColumns.yAxis.col
              }
            }
            
          } 
          else if (p.PanelType === "treemap" || p.PanelType === "mark" || p.PanelType === 'table') {

            //Eğer table ise x olmuyor. Diğerlerinde ise ilk elemanı yazıyoruz daha sonra useeffect kısmında geri kalanı dolduruyoruz
            if (p.PanelType !== "table") {
              for (let g of group) {
                if (p.SelColumns.xAxis.col.includes("_" + g)) {
                  let newCol = p.SelColumns.xAxis.col.replace(("_" + g) , "")
                  xColSelRef.current.value = p.SelColumns.xAxis.alias + "/" + p.SelColumns.xAxis.table + "/" + newCol
                  xColSelGroupRef.current.value = g
                  break;
                }
                else {
                  xColSelRef.current.value = p.SelColumns.xAxis.alias + "/" + p.SelColumns.xAxis.table + "/" + p.SelColumns.xAxis.col
                }
              }
            }

            for (let g of group) {
              if(p.SelColumns.yAxis[0].col.includes("_" + g)) {
                let newCol = p.SelColumns.yAxis[0].col.replace(("_" + g) , "")
                yColSelRef.current.value = p.SelColumns.yAxis[0].alias + "/" + p.SelColumns.yAxis[0].table + "/" + newCol
                yColSelGroupRef.current.value = g
                break;
              }
              else {
                yColSelRef.current.value = p.SelColumns.yAxis[0].alias + "/" + p.SelColumns.yAxis[0].table + "/" + p.SelColumns.yAxis[0].col
              }
            }

            for (let a of p.SelColumns.yAxis) {
              if (p.SelColumns.yAxis.length - 1 > als.length) { //Remove last alias
                als.push(getAlias(als))
              }
            }
            setAllAxis(als);
          } 
          else if (p.PanelType === "pivot") {            
            //İlk başta ilk elemanları dolduruyoruz daha sonrasında ise useEffect kısmında eğer varsa gerisini dolduruyoruz
            for (let g of group) {
              if(p.SelColumns.xAxis[0].col.includes("_" + g)) {
                let newCol = p.SelColumns.xAxis[0].col.replace(("_" + g) , "")

                xColSelRef.current.value = p.SelColumns.xAxis[0].alias + "/" + p.SelColumns.xAxis[0].table + "/" + newCol
                xColSelGroupRef.current.value = g

                break;
              }
              else {
                xColSelRef.current.value = p.SelColumns.xAxis[0].alias + "/" + p.SelColumns.xAxis[0].table + "/" + p.SelColumns.xAxis[0].col
              }
            }

            for (let g of group) {
              if(p.SelColumns.yAxis[0].col.includes("_" + g)) {
                let newCol = p.SelColumns.yAxis[0].col.replace(("_" + g) , "")

                yColSelRef.current.value = p.SelColumns.yAxis[0].alias + "/" + p.SelColumns.yAxis[0].table + "/" + newCol
                yColSelGroupRef.current.value = g

                break;
              }
              else {
                yColSelRef.current.value = p.SelColumns.yAxis[0].alias + "/" + p.SelColumns.yAxis[0].table + "/" + p.SelColumns.yAxis[0].col
              }
            }

            for (let x of p.SelColumns.xAxis) {
              if (p.SelColumns.xAxis.length - 1 > alX.length) { //Remove last alias
                alX.push(getAlias(alX))
              }

              if (p.SelColumns.xAxis[0].dataColumn === true) {
                dataColumnRef.current.classList.remove('!border-jet_mid')
                dataColumnRef.current.classList.add('!border-sea_green')
              }
            }
            setTitleAxis(alX);

            for (let y of p.SelColumns.yAxis) {
              if (p.SelColumns.yAxis.length - 1 > alY.length) { //Remove last alias
                alY.push(getAlias(alY))
              }

              if (p.SelColumns.yAxis[0].dataColumn === true) {
                dataColumnRef.current.classList.remove('!border-jet_mid')
                dataColumnRef.current.classList.add('!border-sea_green')
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

  useEffect(() => { //+ToDo(inside) ----- We use useEffect because in editPanel setAllAxis etc. async. Didn't refresh immediately. When (panelEdit) change, run this useEffect
    if (panel !== "") {
      if (allAxis.length > 0) { //If Panel and AllAxis aren't empty
        for (let p of pageContent.page_data.panels) {
          if (p.PanelID === panel) {
  
            for (let y in p.SelColumns.yAxis) {
              if (parseInt(y) === 0) {continue;}

              for (let g of group) {

                if(p.SelColumns.yAxis[parseInt(y)].col.includes("_" + g)) {
                  let newCol = p.SelColumns.yAxis[parseInt(y)].col.replace(("_" + g) , "")

                  yColSelRef.current[allAxis[parseInt(y) - 1]].value = p.SelColumns.yAxis[parseInt(y)].alias + "/" + p.SelColumns.yAxis[parseInt(y)].table + "/" + newCol
                  yColSelGroupRef.current[allAxis[parseInt(y) - 1]].value = g
                  break;
                }
                else {
                  yColSelRef.current[allAxis[parseInt(y) - 1]].value = p.SelColumns.yAxis[parseInt(y)].alias + "/" + p.SelColumns.yAxis[parseInt(y)].table + "/" + p.SelColumns.yAxis[parseInt(y)].col
                }

              }
            }
          }
        }
      } 
      else if (titleAxis.length > 0 || valueAxis.length > 0) { //If titleAxis and valueAxis aren't empty
        for (let p of pageContent.page_data.panels) {
          if (p.PanelID === panel) {
  
            for (let x in p.SelColumns.xAxis) {
              if (parseInt(x) === 0) {continue;}
              
              for (let g of group) {

                if(p.SelColumns.xAxis[parseInt(x)].col.includes("_" + g)) {
                  let newCol = p.SelColumns.xAxis[parseInt(x)].col.replace(("_" + g) , "")
                  xColSelRef.current[titleAxis[parseInt(x) - 1]].value = p.SelColumns.xAxis[parseInt(x)].alias + "/" + p.SelColumns.xAxis[parseInt(x)].table + "/" + newCol
                  xColSelGroupRef.current[titleAxis[parseInt(x) - 1]].value = g
                  
                  break;
                }
                else {
                  xColSelRef.current[titleAxis[parseInt(x) - 1]].value = p.SelColumns.xAxis[parseInt(x)].alias + "/" + p.SelColumns.xAxis[parseInt(x)].table + "/" + p.SelColumns.xAxis[parseInt(x)].col
                }
              }
              
              if (p.SelColumns.xAxis[parseInt(x)].dataColumn === true) {
                dataColumnRef.current[titleAxis[parseInt(x) - 1]].classList.remove('!border-jet_mid')
                dataColumnRef.current[titleAxis[parseInt(x) - 1]].classList.add('!border-sea_green')
              }
            }
  
            for (let y in p.SelColumns.yAxis) {
              if (parseInt(y) === 0) {continue;}
              
              for (let g of group) {

                if(p.SelColumns.yAxis[parseInt(y)].col.includes("_" + g)) {
                  let newCol = p.SelColumns.yAxis[parseInt(y)].col.replace(("_" + g) , "")
                  yColSelRef.current[valueAxis[parseInt(y) - 1]].value = p.SelColumns.yAxis[parseInt(y)].alias + "/" + p.SelColumns.yAxis[parseInt(y)].table + "/" + newCol
                  yColSelGroupRef.current[valueAxis[parseInt(y) - 1]].value = g
                  break;
                }
                else {
                  yColSelRef.current[valueAxis[parseInt(y) - 1]].value = p.SelColumns.yAxis[parseInt(y)].alias + "/" + p.SelColumns.yAxis[parseInt(y)].table + "/" + p.SelColumns.yAxis[parseInt(y)].col
                }
              }
            }
          }
        }
      }
  
      if (conditions.length > 0) {
        for (let p of pageContent.page_data.panels) {
          if (p.PanelID === panel) {
  
            setTimeout(() => {
              for (let cond in conditions) { //+ Burada 2 kere dönüyor. İleride daha iyi yazabilir misin bak
                if (conditions[cond] !== "AND") {
                  for (let wp in p.WherePlain){
                    if (cond > p.WherePlain.length) return; // Conditions daha fazla elemana sahip olursa diye bir kontrol koyduk. Böylelikle whereplain' in uzunluğu kadar döndürecek döngüyü
                    
                    conditionColumnSelect.current[conditions[cond]].value = Object.keys(p.WherePlain[cond])[0]; // Kolonları bulduk
                    conditionTransactionSelect.current[conditions[cond]].value = Object.keys(Object.values(p.WherePlain[cond])[0])[0]; // Kolonların işlemlerini bulduk

                    if ((Object.values(Object.values(p.WherePlain[cond])[0])[0]).includes("' AND '")) { // Eğer btw ya da nbtw ise düzenlerken ona göre değişecek
                      changeCondType(Object.keys(Object.values(p.WherePlain[cond])[0])[0], conditions[cond])
                      conditionInput.current[conditions[cond]].value = (Object.values(Object.values(p.WherePlain[cond])[0])[0]).split("' AND '")[0]; // Kolonların işlem değerlerini bulduk
                      conditionInput2.current[conditions[cond]].value = (Object.values(Object.values(p.WherePlain[cond])[0])[0]).split("' AND '")[1]; // Kolonların işlem değerlerini bulduk
                    }
                    else {
                      conditionInput.current[conditions[cond]].value = Object.values(Object.values(p.WherePlain[cond])[0])[0]; // Kolonların işlem değerlerini bulduk
                    }
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
  
      if (panelSort.length > 0) {
        for (let p of pageContent.page_data.panels) {
          if (p.PanelID === panel) {  
            setTimeout(() => {  
              for (let sort in panelSort) {
                sortColumnSelect.current[panelSort[sort]].value = Object.keys(p.Order)[sort]        //Kolon adını bulduk
                sortColumnTypeSelect.current[panelSort[sort]].value = Object.values(p.Order)[sort]  // Kolonların sıralamalarını bulduk
              }            
            }, 300);
          }
        }
      }
    }

    setTimeout(() => { //+ When we set panelEdit false, useEffect run again.
      setPanelEdit(false);
    }, 500);

  }, [panelEdit]) // Eğer allAxis , titleAxis , valueAxis , conditions , panelSort koyarsan bir şey silindiğinde çöküyor
                  // O yüzden panelEdit koyman lazım fakat o zaman da başka hata veriyor
  //* ---------------------------------------------------------------------------------------------------------------------------
  
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
    // GroupSelect' i çekmek için
    let selGroup = axisGroupSel(panelType)

    let selColumns = axisSel(panelType);
    let panelIDs = [];
    let lastPanelID = panel;
    let wherePlain = [];
    let order = {};

    for(let p of pageContent.page_data.panels) {
      panelIDs.push(p.PanelID);
    }

    // Düzenleme yapılınca ve tekrar kaydedilince koordinatların son yerlerini de kaydediyoruz
    if (panel !== "") {
      let parse = JSON.parse(localStorage["rgl-8"])

      for (let b of parse.layouts.lg) {
        for(let p of pageContent.page_data.panels) {
          if(p.PanelID === b.i) {
            let crd = {
              w: b.w,
              h: b.h,
              x: b.x,
              y: b.y,
              minW: b.minW,
              minH:	b.minH,
            }
            var coordinates = crd;
          }
        }
      }
    }
    else {
      var coordinates = getCoordinates();
      lastPanelID = getAlias(panelIDs);
    }

    // WherePlain i çekmek için burada gerekli şeyleri belirledik ve listeye dahil ettik
    for (let c of conditions) {
      if (c !== "AND") { // "" yani AND olanlar için kontrol
        let sel = conditionColumnSelect.current[c].value //.split("/")[2]
        let tr = conditionTransactionSelect.current[c].value
        let inp = conditionInput.current[c].value

        if (!conditionInput2.current[c].classList.contains("hidden")) {
          let inp2 = conditionInput2.current[c].value
          var wp = {[sel] : {[tr] : inp + "' AND '" + inp2}}; // Örn: where_plain: [{"BORC_SUM": {"bte": 2000}}]
        }
        else {
          var wp = {[sel] : {[tr] : inp}}; // Örn: where_plain: [{"BORC_SUM": {"bte": 2000}}]
        }
        wherePlain.push(wp);
      } 
      else {
        wherePlain.push("AND")
      }
    }
    
    // Order' ı çekmek için burada gerekli şeyleri belirledik ve order objesini oluşturduk
    for (let o of panelSort) {
      let col = sortColumnSelect.current[o].value //.split("/")[2]
      let type = sortColumnTypeSelect.current[o].value
      order = {
        ...order,
        [col] : type
      }
    }

    let last_dt = {
      PanelID: lastPanelID,
      PanelType: panelType,
      PanelName: panelNameRef.current.value,
      ModelID: modelNameRef.current.value,
      SelColumns: selColumns,
      Coordinates: coordinates,
      WherePlain: wherePlain,
      Order: order,
      GroupSelect: selGroup,
    }

    if (modelNameRef.current.value.includes("Union")) {
      last_dt = {
        PanelID: lastPanelID,
        PanelType: panelType,
        PanelName: panelNameRef.current.value,
        UnionID: modelNameRef.current.value.replace("_Union" , ""),
        SelColumns: selColumns,
        Coordinates: coordinates,
        WherePlain: wherePlain,
        Order: order,
        GroupSelect: selGroup,
      }
    }
  
    setPageContent({
      ...pageContent,
      page_data: {
        ...pageContent.page_data,
        panels: [
          ...pageContent.page_data.panels.filter(item => item.PanelID !== lastPanelID), //Son düzenleneni içerisinden çıkardık
          last_dt,
        ],
        dragresize: allPanelsDragResize,
      }
    })

    WorkspaceAll.putFiles(pageContent.page_id , {
      page_data: {
        ...pageContent.page_data,
        panels: [
          ...pageContent.page_data.panels.filter(item => item.PanelID !== lastPanelID), //Son düzenleneni içerisinden çıkardık
          last_dt,
        ],
        dragresize: allPanelsDragResize,
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

    if (localStorage["rgl-8"] !== undefined) {
      let parse = JSON.parse(localStorage["rgl-8"])

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
  
            await WorkspaceAll.putFiles(pageContent.page_id, {page_data: {panels: panels, dragresize: allPanelsDragResize}})
  
            setPageContent({
              ...pageContent,
              page_data: {
                ...pageContent.page_data,
                panels: panels,
                dragresize: allPanelsDragResize
              }
            })
          }
        }
      }
    }

    document.getElementById('save-page-btn').innerHTML = '<i class="fa-solid fa-check text-green_pantone"></i>';

    setTimeout(() => {
      document.getElementById('save-page-btn').innerHTML = '<i class="fa-solid fa-floppy-disk"></i>';
      document.getElementById('save-page-btn').disabled = false;
    }, 5000);
  }

  const errorHandler = (err) => {
    setError(err)
  }

  //* ----------------------------------------------------------/

  //* OPEN-CLOSE SIDEBAR ---------------------------------------/

	const opClSideBar = () => {
	
		let allsidepanel = document.getElementById('allsidepanel');
		let open_close_btn = document.getElementById('open_close_btn');
	
			if(open_close_btn.style.transform === 'rotateZ(180deg)') {
				allsidepanel.style.transform = 'translateX(0px)';
				allsidepanel.classList.remove("w-full" , "!bg-none_opacity");
				open_close_btn.style.transform = 'rotateZ(0deg)';
			}
	
			else {
				allsidepanel.style.transform = 'translateX(250px)';
				allsidepanel.classList.add("w-full" , "!bg-none_opacity");
				open_close_btn.style.transform = 'rotateZ(180deg)';
			}
	}

  //* ----------------------------------------------------------/

  //* SHARE ----------------------------------------------------/
  const shareUsernameRef = useRef("");
  const shareAuthRef = useRef("");
  const shareItemRef = useRef("");

  const [sharedCollections, setSharedCollections] = useState([]);
  const [sharedDirectories, setSharedDirectories] = useState([]);
  const [sharedPages, setSharedPages] = useState([]);
  const [shareModalOPCL, setShareModalOPCL] = useState(false);
  const [btnShowHide, setBtnShowHide] = useState(true);
  const [table, setTable] = useState([]);
  const [shareItemInfo, setShareItemInfo] = useState(
    {
      shared_item_type: "",
      shared_item_id: undefined,
    }
  );
  const [iShareItems, setIShareItems] = useState(
    {
      shared_collections: [],
      shared_directories: [],
      shared_pages: [],
    }
  );
  
  const getShare = async () => {
    let col = await WorkspaceAll.getCollections();
    let dir = await WorkspaceAll.getFolders();
    let page = await WorkspaceAll.getFiles();

    setSharedCollections(col.Data.shared_collections)
    setSharedDirectories(dir.Data.shared_directories)
    setSharedPages(page.Data.shared_pages)
  }

  const postShare = async () => {
    if (shareUsernameRef.current.value !== "") {  //. Checked Username Input
      let resp = await WorkspaceAll.postShare(shareItemInfo.shared_item_type , shareItemInfo.shared_item_id , shareUsernameRef.current.value , shareAuthRef.current.checked)

      await getIShare();

      clearShareModal();
    }
  }

  const deleteShare = async (type, id) => {
    let resp = await WorkspaceAll.deleteShare(type, id);

    await getIShare();
  }

  const getTable = () => { //. Check type, get jsx and set result in setTable
    let dt = shareItemInfo;
    let resp = [];

    if (dt.shared_item_type === "COLLECTION") {
            
      iShareItems.shared_collections.map((col, index) => {

        if (dt.shared_item_id === col.collection.collection_id) {
          resp.push(
            <tr key={index} className="bg-earie_black border-b border-jet_mid transition duration-200 hover:bg-darker_jet hover:text-platinium">
              <th className="px-2 py-1 truncate">{col.shared_to}</th>
              <th className="px-2 py-1 truncate text-right">
                {/* <button onClick={() => editShare("collection", col.collection_share_id)} className='hover:text-sea_green transition duration-300 px-1 mr-1'><i className="fa-solid fa-pen-to-square"></i></button> */}
                <button onClick={() => funcLoad(deleteShare, "collection", col.collection_share_id)} className='hover:text-red-600 transition duration-300 px-1'><i className="fa-solid fa-xmark"></i></button>
              </th>
            </tr>
          )
        }

      })

    }
    else if (dt.shared_item_type === "DIRECTORY") {
            
      iShareItems.shared_directories.map((dir, index) => {

        if (dt.shared_item_id === dir.directory.directory_id) {
          resp.push(
            <tr key={index} className="bg-earie_black border-b border-jet_mid transition duration-200 hover:bg-darker_jet hover:text-platinium">
              <th className="px-2 py-1 truncate">{dir.shared_to}</th>
              <th className="px-2 py-1 truncate text-right">
                {/* <button onClick={() => editShare("directory", dir.directory_share_id)} className='hover:text-sea_green transition duration-300 px-1 mr-1'><i className="fa-solid fa-pen-to-square"></i></button> */}
                <button onClick={() => funcLoad(deleteShare, "directory", dir.directory_share_id)} className='hover:text-red-600 transition duration-300 px-1'><i className="fa-solid fa-xmark"></i></button>
              </th>
            </tr>
          )
        }

      })
      
    }
    else if (dt.shared_item_type === "PAGE") {
            
      iShareItems.shared_pages.map((page, index) => {

        if (dt.shared_item_id === page.page.page_id) {
          resp.push(
            <tr key={index} className="bg-earie_black border-b border-jet_mid transition duration-200 hover:bg-darker_jet hover:text-platinium">
              <th className="px-2 py-1 truncate">{page.shared_to}</th>
              <th className="px-2 py-1 truncate text-right">
                {/* <button onClick={() => editShare("page", page.page_share_id)} className='hover:text-sea_green transition duration-300 px-1 mr-1'><i className="fa-solid fa-pen-to-square"></i></button> */}
                <button onClick={() => funcLoad(deleteShare, "page", page.page_share_id)} className='hover:text-red-600 transition duration-300 px-1'><i className="fa-solid fa-xmark"></i></button>
              </th>
            </tr>
          )
        }

      })      
      
    }

    setTable(resp);
  }

  const getIShare = async () => {
    let resp = await WorkspaceAll.getShare();

    setIShareItems(
      {
        shared_collections: resp.Data.shared_collections,
        shared_directories: resp.Data.shared_directories ,
        shared_pages: resp.Data.shared_pages ,
      }
    )
  }

  useEffect(() => { //. use useEffect because iShareItems neccesary for getTable
    getTable();
  }, [iShareItems])
  
  const openShareModal = (type, id, name) => {
    if (type === "COLLECTION") {
      shareItemRef.current.innerHTML = " (" + name + " - Koleksiyon)"
    }
    else if (type === "DIRECTORY") {
      shareItemRef.current.innerHTML = " (" + name + " - Dosya)"
    }
    else if (type === "PAGE") {
      shareItemRef.current.innerHTML = " (" + name + " - Sayfa)"
    }

    getIShare();

    setShareItemInfo(
      {
        shared_item_type: type,
        shared_item_id: id,
      }
    )

    setShareModalOPCL(true); //. Check share modal open-close
  }
  
  const clearShareModal = () => {
    shareUsernameRef.current.value = "";
    shareAuthRef.current.checked = false;
  }

  const closeShareModal = () => {
    setShareModalOPCL(false); //. Check share modal open-close
    clearShareModal();
  }
  //* ----------------------------------------------------------/

  //* CONTEXT DATAS ----------------------------------------------------/ 

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
    checkedTrialPack,
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
    editCollectionDetails,
    editFolderDetails,
    editFileDetails,
    shareItemInfo,
    checkInPage,
    favoriteRef,
    allFavorites,
    errorText,
    gatewayClientCheck,
    setAllFavorites,
    getFavorites,
    favoriteFile,
    setCheckInPage,
    clearRefs,
    deleteItems,
    gatewayCheck,
    getCollectionDetails,
    getFolderDetails,
    getFileDetails,
    getColWorks,
    getFileWorks,
    getFolderWorks,
    setCheckedConnector,
    setCheckedTrialPack,
    setCheckedConnection,
    setCheckedExpress,
    setDeleteItemRef,
    setDeleteItemType,
    setDbSchemas,
    setChoosenSchema,
    setFilePath,
    openShareModal,

    treeCollections,
    getTreeCollections,
    setTreeCollections,

    funcLoad,
    funcLoadForSpesific,
  }

  const modal_data = {
    modalChecked,
    unionEditChecked,
    modalList,
    publicModalList,
    modalType,
    unionInformations,
    unionList,
    viewList,
    publicCheck,
    deleteModel,
    deleteUnion,
    getList,
    getUnions,
    getViews,
    setModalChecked,
    setPublicCheck,
    setUnionEditChecked,
    setUnionInformations,
    setModalType,
    setUnionList,
    setViewList,
  }

  const chart_data = {
    allAxis,
    allPanelsDragResize,
    chartForms,
    chartTypesForReview,
    colList,
    conditions,
    pageContent,
    panelSort,
    titleAxis,
    valueAxis,
    panel,
    btnShowHide,
    errorText,
    yAxisReview,
    yDatasReview,
    sumReview,

    conditionColumnSelect,
    conditionInput,
    conditionInput2,
    conditionTransactionSelect,
    dataColumnRef,
    xColSelRef,
    yColSelRef,
    xColSelGroupRef,
    yColSelGroupRef,
    modelNameRef,
    panelFeaturesButtonRef,
    panelFeaturesRef,
    panelNameRef,
    panelPreviewButtonRef,
    panelPreviewRef,
    previewButtonRef,
    sortColumnSelect,
    sortColumnTypeSelect,

    addAxis,
    addCondition,
    addSort,
    axisSel,
    changeCondType,
    changePanelTab,
    chooseChart,
    clearPanelInputs,
    dataColumnSelect,
    deleteCondition,
    deleteSort,
    dltAxis,
    dltPanel,
    editPanel,
    funcLoad,
    funcLoadForSpesific,
    getColList,
    modelNameSelect,
    refreshPage,
    reviewChartTable,
    savePage,
    savePanel,
    setPageContent,
    setAllAxis,
    setAllPanelsDragResize,
    setTitleAxis,
    setValueAxis,
  }

  const share_data = {
    shareModalOPCL,
    iShareItems,
    btnShowHide,
    sharedCollections,
    sharedDirectories,
    shareItemInfo,
    sharedPages,
    table,

    shareAuthRef,
    shareItemRef,
    shareUsernameRef,

    closeShareModal,
    getIShare,
    getShare,
    opClSideBar,
    openShareModal,
    postShare,
    setBtnShowHide,
  }

  //* ----------------------------------------------------------/

  return (
    <MainContext.Provider value={maincontext_data}>
      <ModalContext.Provider value={modal_data}>
        <ChartContext.Provider value={chart_data}>
          <ShareContext.Provider value={share_data}>
            <Navbar page_btn={"hidden"} save_page_btn={"hidden"} />
            <Sidebar />
            <Filepath/>

            <div className="pt-[92px] pb-10 pl-[100px] pr-[10px]">
              <Outlet />
            </div>

            <DataModal />
            <UnionDataModal />
            <ShareModal />
            <Loading />
            <Error />
          </ShareContext.Provider>
        </ChartContext.Provider>
      </ModalContext.Provider>
    </MainContext.Provider >
  )
}
