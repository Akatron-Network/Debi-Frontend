import React , { useContext , useState , useEffect , useRef } from 'react'
import Table from './Table';
import Input from '../Input';
import WorkspaceAll from '../../libraries/categories/Workspace';
import Data from '../../libraries/categories/Data';
import { DataModalContext , ModalContext } from '../context'
import SourceTable from './SourceTable';
import Relations from './Relations';
import RelationsAbsolute from './RelationsAbsolute';
import Collapses from './Collapses';
import { getAlias , getKeyID } from '../../libraries/misc';
import ColSelect from './ColSelect';
import GroupModal from './GroupModal';
import ManuelRelatedTable from './ManuelRelatedTable';
import RenameColumns from './RenameColumns';

export default function DataModal() {
  const modal_data = useContext(ModalContext);
  console.log(modal_data)

  const dataColSelectRef = useRef({ value: "default" });
  const dataModalName = useRef("");
  const calcRef = useRef("");
  const transRef = useRef({});
  const calcColRef = useRef({});
  const calcColTrRef = useRef({});
  const calcColNameRef = useRef("");
  const colSelRef = useRef("default");
  const sourceTableInputRef = useRef({ value: "" });
  const modalSourceTableInputRef = useRef({ value: "" });
  const referencedColsRef = useRef("");
  const sourceColsRef = useRef("");
  const renamedTitleRef = useRef([]);
  const renamedInputRef = useRef("");

  const [chosenTables, setChosenTables] = useState([]);
  const [allTransCols, setAllTransCols] = useState([])
  const [calcCols, setCalcCols] = useState([]);
  const [calcModalCols, setCalcModalCols] = useState({});
  const [collections, setCollections] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [executeCols, setExecuteCols] = useState([]);
  const [executeResp, setExecuteResp] = useState([]);
  const [executeRows, setExecuteRows] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [gatewayHost, setGatewayHost] = useState("");
  const [miscIncludes, setMiscIncludes] = useState([]);
  const [relations, setRelations] = useState({ inner: [], outer: [] , extra: [] });
  const [modalRelations, setModalRelations] = useState({ inner: [], outer: []});
  const [sourceTable, setSourceTable] = useState([]);
  const [tables, setTables] = useState({});
  const [modalTables, setModalTables] = useState({});
  const [conditionsJSON, setConditionsJSON] = useState([]);
  const [renameState, setRenameState] = useState("");
  const [renameInputState, setRenameInputState] = useState("");


  const [dataJSON, setDataJSON] = useState({
    collection_id: "",
    query: {
        table: "",
        alias: "O",
        select: {},
        where_plain: [],
        includes: {}
    }
  });

  useEffect(() => {
    getColSelect();
  }, []);
  
  useEffect(() => {
    console.log(dataJSON);
    //*E??er modal a????ld??ysa buray?? kontrol edecek ve ona g??re editModal fonksiyonunda dataJSON d??zenlenecek
    if (modal_data.modalChecked === true) {
      if (modal_data.modalType === "new") {
        setInEdit(false);
        setDataJSON({
          collection_id: "",
          query: {
              table: "",
              alias: "O",
              select: {},
              where_plain: [],
              includes: {}
          }
        });
      } else {
        editModal();
      }
    }
  }, [modal_data.modalChecked])
  

  const [chsCols, setChsCols] = useState({})
  const [inEdit, setInEdit] = useState(false);
  const editModal = async () => {
    setInEdit(true);
    let modalJSON = modal_data.modalType;

    if ([].constructor === modalJSON.query.includes.constructor) { //* Includes liste mi de??il mi diye kontrol ediyoruz
      let newIncludes = {};
  
      for (let i of modalJSON.query.includes) {
        newIncludes[i.alias] = i
      }
      modalJSON.query.includes = newIncludes;

    }

    console.log(modalJSON)


    if (collections[0].db_scheme_id === modalJSON.db_scheme_id) {
      dataColSelectRef.current.value = collections[0].collection_id; //* Koleksiyon ad??
    }
    dataModalName.current.value = modalJSON.model_name; //* Model ad??

    let rt = await colNameSelect(dataColSelectRef.current.value); //* Kaynak tablo getir
    var dt = rt[1].filter((data) => (data.table === modalJSON.query.table)); //*Kaynak tablolardan bizimki ile ayn?? olan?? se??tik
    let chsTbls = [(await chooseSource(modalJSON.query.table, dt[0].category, dt[0].name, rt[0], undefined ,true))[0]]; //* Kaynak tablo se??imi

    let tblsTemp = {"O" : (await chooseSource(modalJSON.query.table, dt[0].category, dt[0].name, rt[0], undefined ,true))[1].Data}

    let chsColsTemp = {};
    chsColsTemp["O"] = (await chooseSource(modalJSON.query.table, dt[0].category, dt[0].name, rt[0], undefined ,true))[1].Data.source_table.columns; //* T??m kolonlar?? ??ektik aliaslar??na ??re sonras??nda se??ilileri ye??ile boyayaca????z

    let aliaslist = ["O"]
    for (let r in modalJSON.query.includes) { //* ??li??kili tablo ekleme
      let a = getAlias(aliaslist)
      aliaslist.push(a)
      chsTbls.push((await addRelatedTable(modalJSON.query.includes[r].table, "" , rt[0], true, a ))[0])
      chsColsTemp[r] = ((await addRelatedTable(modalJSON.query.includes[r].table, "" , rt[0], true, a ))[1].Data.source_table.columns)
      tblsTemp[r] = (await addRelatedTable(modalJSON.query.includes[r].table, "" , rt[0], true, a ))[1].Data;
    }
    setChsCols(chsColsTemp);
    setChosenTables(chsTbls);
    setTables(tblsTemp);

    setDataJSON({ collection_id: collections[0].collection_id, query: modal_data.modalType.query });
  };

  useEffect(() => {
    if (Object.keys(chsCols).length === 0) return;

    let transColTemp = [];
    for (let c in modal_data.modalType.query.select) {  //* for selected columns in source table
      let cval = modal_data.modalType.query.select[c]   //* column's val (true, 'sum' etc)
      let cindex = 0                                    //* Column's index in all columns of table
      for (let ac in chsCols['O']) {

        if (c.includes("|")) { //* E??er yeniden isimlendirilen bir tabloysa
          c = c.split("|")[0]
        }

        if (chsCols['O'][ac].name === c) { //* set c index
          cindex = ac
        }
      }

      if (!c.includes('{')) {
        document.getElementById('elm_main_' + cindex).classList.add("border-sea_green")
        document.getElementById("sel_main_" + cindex).classList.remove("hidden")
        document.getElementById("rename_main_" + cindex).classList.remove("hidden")

        if (cval !== true) {
          document.getElementById("sel_main_" + cindex).value = cval;
        }
      }
      else {
        transColTemp.push({[c] : cval})
      }
    }

    for (let incAlias in  modal_data.modalType.query.includes) {  //* for including tables incAlias = alias of alter table
      let incObj = modal_data.modalType.query.includes[incAlias]  //* table's object

      for (let c in incObj.select) {
        let cval = incObj.select[c]
        let cindex = 0
        for (let ac in chsCols[incAlias]) {

          if (c.includes("|")) { //* E??er yeniden isimlendirilen bir tabloysa
            c = c.split("|")[0]
          }

          if (chsCols[incAlias][ac].name === c) {
            cindex = ac
          }
        }
  
        if (!c.includes('{')) {
          document.getElementById('elm_'+ incAlias +'_' + cindex).classList.add("border-sea_green")
          document.getElementById("sel_" + incAlias + "_" + cindex).classList.remove("hidden")
          document.getElementById("rename_" + incAlias + "_" + cindex).classList.remove("hidden")

          if (cval !== true) {
            document.getElementById("sel_" + incAlias + "_" + cindex).value = cval;
          }
        } else {
          transColTemp.push({[c] : cval})
        }
      }
    }

    setAllTransCols(transColTemp);

    // console.log("a")
    // document.getElementById('elm_main_0').classList.add("hidden");

    console.log(dataJSON)
    //* Yeniden adland??r??lm???? bir kolon varsa yan??na yazd??rmak i??in
    let alias = "";
    // renamedTitleRef.current[props.main + "-" + col.name]
    if (Object.keys(dataJSON.query.select).length > 0) {
      alias = "main";
      for (let s of Object.keys(dataJSON.query.select)) {
        console.log(s)
        if (s.includes("|")) {
          let column = s.split("|")[0]
          let rename = s.split("|")[1]
          console.log(s.split("|")[0]);
          console.log(s.split("|")[1]);

          renamedTitleRef.current[alias + "-" + column].innerHTML = "(" + rename + ")";
        }
      }
    }

    for (let inc of Object.keys(dataJSON.query.includes)) {
      if (Object.keys(dataJSON.query.includes[inc].select).length > 0) {
        alias = inc;
        for (let s of Object.keys(dataJSON.query.includes[inc].select)) {
          if (s.includes("|")) {
            let columns = s.split("|")[0];
            let rename = s.split("|")[1];

            renamedTitleRef.current[alias + "-" + columns].innerHTML = "(" + rename + ")";
          }
        }
      }
    }
    
    document.getElementById('loadingScreen').checked = false;
  
  }, [chsCols])
  

  const resize = (id) => {
    setTimeout(function () {
      let open_card = document.getElementById("card_s_tbl_" + id);
      let card = document.getElementById("card_elm_" + id);
      let card_elm = card.getBoundingClientRect();

      open_card.style.width = card_elm.width + "px";
      open_card.style.height = card_elm.height + "px";

      coordinates(id);
    }, 210);
  };

  // const review = () => {
  //   //!??nizleme i??in gerekiyor
  //   let review_btn = document.getElementById("closeModalBtn");
  //   let review = document.getElementById("review");
  //   let tblReview = document.getElementById("tableReview");

  //   setTimeout(() => {
  //     let review_btn_crd = review_btn.getBoundingClientRect();
  //     let review_crd = review.getBoundingClientRect();

  //     review.style.height = review_btn_crd.top - review_crd.top - 8 + "px";
  //   }, 220);

  //   setTimeout(() => {
  //     let review_crd = review.getBoundingClientRect();
  //     tblReview.style.height = review_crd.height - 16 + "px";
  //   }, 230);
  // };

  const coordinates = (id) => {
    let open_card = document.getElementById("card_s_tbl_" + id);
    let card = document.getElementById("card_elm_" + id);
    let card_elm = card.getBoundingClientRect();

    if (id % 4 === 1) {
      open_card.style.left = "37px";
    } else if (id % 4 === 2) {
      open_card.style.left = 1 * card_elm.width + 1 * 8 + 37 + "px";
    } else if (id % 4 === 3) {
      open_card.style.left = 2 * card_elm.width + 2 * 8 + 37 + "px";
    } else if (id % 4 === 0) {
      open_card.style.left = 3 * card_elm.width + 3 * 8 + 37 + "px";
    }
    open_card.style.top = card_elm.y - 40 + "px";
  };

  var timer = 0;
  const show_info = (id, stat) => {
    resize(id);

    let open_card = document.getElementById("card_s_tbl_" + id);
    let card = document.getElementById("card_elm_" + id);

    open_card.classList.add("!bg-middle_black");
    open_card.classList.add("!border-onyx");

    if (stat === "in") {
      timer = setTimeout(function () {
        card.classList.toggle("!z-1");
        open_card.classList.toggle("!z-50");
        open_card.style.display = "block";

        setTimeout(() => {
          //! B??y??rken z-indeksleri ge?? ayarlad??????ndan dolay?? biraz erteledim ki arkada kalmas??n
          open_card.classList.add("!h-[150px]");
          open_card.classList.add("!w-[280px]");
        }, 300);
      }, 1000);
    } else {
      if (open_card.classList.contains("!h-[150px]")) {
        setTimeout(() => {
          //! K??????l??rken z-indeksleri ge?? ayarlad??????ndan dolay?? biraz erteledim ki ??nde kalmas??n
          open_card.style.display = "none";
          open_card.classList.toggle("!z-50");
          card.classList.toggle("!z-1");
        }, 300);

        open_card.classList.remove("!bg-middle_black");
        open_card.classList.remove("!border-onyx");
        open_card.classList.remove("!h-[150px]");
        open_card.classList.remove("!w-[280px]");
      }
    }
  };

  const clearTime = (id) => {
    clearTimeout(timer);
    let open_card = document.getElementById("card_s_tbl_" + id);

    if (open_card.classList.contains("!h-[200px]")) {
      return;
    } else {
      setTimeout(() => {
        //! Buradaki setTimeout 'u mouseenter ve mouseleave ??ak????abiliyor ve hover s??rekli aktif kal??yor diye koydum.
        open_card.classList.remove("!bg-middle_black");
        open_card.classList.remove("!border-onyx");
      }, 50);
    }
  };

  const source_table = (type) => {
    let source_table = document.getElementById("source_table");

    if(type !== undefined) {
      source_table = document.getElementById(type + "_source_table");
    }

    if (source_table.classList.contains("opacity-0")) {
      open_s_tbl(type);
    } else {
      close_s_tbl(type);
    }
  };

  const open_s_tbl = (type) => {
    let source_table = document.getElementById("source_table");

    if(type !== undefined) {
      source_table = document.getElementById(type + "_source_table");
    }

    source_table.classList.remove("hidden");

    setTimeout(function () {
      source_table.classList.remove("-translate-y-16");
      source_table.classList.remove("opacity-0");
    }, 1);
  };

  const close_s_tbl = (type) => {
    let source_table = document.getElementById("source_table");

    if(type !== undefined) {
      source_table = document.getElementById(type + "_source_table");
    }

    source_table.classList.add("-translate-y-16");
    source_table.classList.add("opacity-0");

    setTimeout(function () {
      source_table.classList.add("hidden");
    }, 300);
  };

  const checkbox = (id) => {
    var checkbox = document.getElementById("checkbox_" + id);
    var collapse = document.getElementById("collapse_" + id);

    if (checkbox.checked === true) {
      collapse.classList.add("!bg-jet");
    } else {
      collapse.classList.remove("!bg-jet");
    }
  };

  const changeCondition = (tbl, bound) => {
    let bounder = document.getElementById("tbl" + tbl + "_bounder" + bound);

    if (bounder.innerHTML === "VEYA") {
      bounder.innerHTML = "VE";
    } else {
      bounder.innerHTML = "VEYA";
    }
  };

  const chooseColor = (tbl, card) => {

    let classLenght = document.getElementsByClassName('choose_color');
    let query = document.querySelector('#chooseColor_t' + tbl + 'c' + card);
    let elm = document.getElementById('tbl' + tbl + '_card' + card);

    if (query !== null) {
      //! Burada ilk ba??ta query ile b??yle bir id var m?? diye kontrol ettim e??er varsa(yani a????k olan??n ??zerine tekrar t??kland??ysa) direkt olarak silecek.
      //! E??er bunlar olmazsa direkt olarak ilk ba??ta t??m a????k veya html e yaz??lm???? gruplamalar?? silip tekrar ba??tan yazd??rtacak.
      query.remove();
    } else {
      for (let i = 0; classLenght.length > i; i++) {
        classLenght[i].remove();
      }

      let ht = "";

      ht += "<div id='chooseColor_t" +  tbl + "c" + card + "' class='choose_color'><ul>";
      ht += "<h1 class='pb-1 pl-2 text-lg text-platinium'>Grupla</h1>";
      ht += "<hr class='border-1 pb-1 w-4/5 relative left-1/2 -translate-x-1/2 border-hr_gray'/>";
      ht += "<li class='group-btn'><button>Kolon-1</button></li>";
      ht += "<li class='group-btn'><button>Kolon-2</button></li>";
      ht += "<li class='group-btn'><button>Kolon-3</button></li></ul></div>";

      elm.insertAdjacentHTML("beforeend", ht);

      setTimeout(() => {
        let chooseColor = document.getElementById(
          "chooseColor_t" + tbl + "c" + card
        );
        chooseColor.classList.toggle("active");
      }, 10);
    }
  }

  const getColSelect = async () => {
    //! Get collections
    let resp = await WorkspaceAll.getCollections();
    console.log(resp)
    setCollections(resp.Data.owned_collections);
  };

  const colNameSelect = async (id) => {
    document.getElementById('loadingScreen').checked = true;

    let col = await WorkspaceAll.getCollections(id); //! Get Gateway host
    console.log(col)
    let resp = await Data.getExplorer(id, col.Data.connector.gateway_host);
    console.log(resp)

    source_table();

    setGatewayHost(col.Data.connector.gateway_host);
    setSourceTable(resp.Data);
    setFilteredData(resp.Data); //!We create filteredData for filtered datas, because we don't want change sourcetable
    setDataJSON({...dataJSON, collection_id: id})

    document.getElementById('loadingScreen').checked = false;
    return [col.Data.connector.gateway_host , resp.Data];
  };

  const sourceTablesJSON = (event) => {
    const searchWord = event.target.value.toLowerCase();
    const newFilter = sourceTable.filter((source) => {
      var condition = false;

      if (source.name !== undefined) {
        condition =
          source.table.toLowerCase().includes(searchWord) ||
          source.name.toLowerCase().includes(searchWord);
      } else {
        condition = source.table.toLowerCase().includes(searchWord);
      }

      return condition;
    });
    setFilteredData(newFilter);
  };

  const chooseSource = async (table, category = "", nameTable = "" , gatewayHost , type , edit = false) => {
    document.getElementById('loadingScreen').checked = true;

    //! Get table relations
    var resp = await Data.getExplorer(
      dataColSelectRef.current.value,
      gatewayHost,
      table,
      true
    );
    console.log(resp);

    if (type === "modal") { //Fazladan ili??kili tablo eklemek istedi??imizde bunu uygulayacak.

      modalSourceTableInputRef.current.value = category + " / " + nameTable;
      setModalRelations(resp.Data.relations);

      setModalTables({
        O: resp.Data,
      });

    } else {

      sourceTableInputRef.current.value = category + " / " + nameTable;
      setRelations({
        inner: resp.Data.relations.inner,
        outer: resp.Data.relations.outer,
        extra: [],
      });
      var result = [];
      
      if (edit) {
        close_s_tbl(type);
        return [<Collapses key={0} data={resp.Data} main={"main"} /> , resp] ;
      }

      setTables({
        ...tables,
        O: resp.Data,
      });
      
      setChosenTables(
        result.concat(<Collapses key={0} data={resp.Data} main={"main"} />) //! ??lk tablo eklendi??inde gelen ana kolonlar vs i??in
      );
  
      setDataJSON({
        ...dataJSON,
        query: {
          ...dataJSON.query,
          table: table,
        },
      });

    }
  
    close_s_tbl(type);
    setFilteredData(sourceTable); // soruceTablesJSON(yani kaynak tablolar?? aratt??????m??z yer) s??f??rlamak i??in yap??yoruz
    
    document.getElementById('loadingScreen').checked = false;
  };

  const addRelatedTable = async (table , rel_definition = "" , gatewayHost , edit = false, sAlias) => {
    document.getElementById('loadingScreen').checked = true;

    let resp = await Data.getExplorer(
      dataColSelectRef.current.value,
      gatewayHost,
      table,
      false
    ); //! Get table relations
    
    const alias = getAlias([...Object.keys(dataJSON.query.includes), "O"]);
    setMiscIncludes([...miscIncludes , alias]);

    let keyID = getKeyID(chosenTables);

    if (edit) {
      return [<Collapses key={sAlias ? sAlias : alias} keyID={keyID + 1} data={resp.Data} main={sAlias ? sAlias : alias} /> , resp];
    }

    setTables(
      {
        ...tables,
        [alias]: resp.Data
      }
    )

    setChosenTables(
      chosenTables.concat(<Collapses key={keyID + 1} keyID={keyID + 1} data={resp.Data} main={alias} />)
    );

    const includesJSON = {
      table: resp.Data.source_table.table,
      alias: alias,
      type: "INNER",
      on: {
        [rel_definition.referenced_column]: rel_definition.source_column
      },
      select: {
      },
      where_plain: []
    }

    setDataJSON({
      ...dataJSON,
      query: {
        ...dataJSON.query,
        includes: {...dataJSON.query.includes , [alias]: includesJSON},
      },
    });
    
    document.getElementById('loadingScreen').checked = false;
  };

  const dltRelatedTable = async (alias , keyID) => {
    if(alias !== "main") {
      delete dataJSON.query.includes[alias];
      setChosenTables(chosenTables.filter(item => item.key !== keyID.toString()))
    }

    delete calcModalCols[alias]
  }

  const addColumns = async (main , col_name , index) => {
    //+ DatePart'a main de ekle yani "datepart_" + main + "_" + index olsun
    let datepart = document.getElementById('datepart_' + index);
    let elm_main = document.getElementById("elm_" + main + "_" + index);
    
    if (datepart === null) {datepart = {classList: {contains: () => {}, toggle: () => {}}}}

    if (elm_main.classList.contains("border-sea_green") && datepart !== null) { //! SE????L?? HALDEYSE YAN?? SE????M KALDIRILIYORSA
      if (!datepart.classList.contains("!bg-onyx_light")) { //E??er tarihi par??ala dediysem ve normalde kolon se??iliyse hi??bir ??ey silmeyecek. Sadece gidip tarihleri de dataJSON a ekleyecek

        if(main === "main") {
          if (renamedTitleRef.current[main + "-" + col_name].innerHTML !== "") { // E??er yeniden adland??r??ld??ysa yeniden adland??r??lan?? silecek
            let title = col_name + "|"  + renamedTitleRef.current[main + "-" + col_name].innerHTML.replace("(" , "").replace(")" , "")
            console.log(title)
            delete dataJSON.query.select[title];
          } else {
            delete dataJSON.query.select[col_name];
          }
        }
        else {
          if (renamedTitleRef.current[main + "-" + col_name].innerHTML !== "") { // E??er yeniden adland??r??ld??ysa yeniden adland??r??lan?? silecek
            let title = col_name + "|"  + renamedTitleRef.current[main + "-" + col_name].innerHTML.replace("(" , "").replace(")" , "")
            console.log(title)
            delete dataJSON.query.includes[main].select[title];
          } else {
            delete dataJSON.query.includes[main].select[col_name];
          }
        }
      }
    }
    else { //! SE????L?? HALDE DE????LSE YAN?? YEN?? SE????LD??YSE

      if (datepart === null || (datepart !== null && !datepart.classList.contains("!bg-onyx_light"))) {
  
        if (main === "main") {
          setDataJSON({
            ...dataJSON,
            query: {
              ...dataJSON.query,
              select: {
                ...dataJSON.query.select,
                [col_name]: true,
              },
            }
          });
        } else {
          setDataJSON({
            ...dataJSON,
            query: {
              ...dataJSON.query,
              includes: {
                ...dataJSON.query.includes,
                [main]: {
                  ...dataJSON.query.includes[main],
                  select: {
                    ...dataJSON.query.includes[main].select,
                    [col_name]: true
                  }
                }
              }
            }
          })
        }
      }

    }
    
    if (elm_main.classList.contains("border-sea_green") && datepart.classList.contains("!bg-onyx_light")) {
      return;
    }
    else {
      document.getElementById("sel_" + main + "_" + index).classList.toggle("hidden")
      document.getElementById("rename_" + main + "_" + index).classList.toggle("hidden")
      elm_main.classList.toggle("border-sea_green")
      elm_main.classList.toggle("bg-middle_black")

      if (renamedTitleRef.current[main + "-" + col_name].innerHTML !== "") { renamedTitleRef.current[main + "-" + col_name].innerHTML = ""}
    }
  }

  const selColGroups = (main , col_name , index) => {
    let name = "";
    if (renamedTitleRef.current[main + "-" + col_name].innerHTML !== "") {
      let title = renamedTitleRef.current[main + "-" + col_name].innerHTML.replace("(" , "").replace(")" , "")
      console.log(title)
      name = col_name + "|" + title
    } else {
      name = col_name;
    }
    console.log(name);

    let selID = document.getElementById("sel_" + main + "_" + index);
    let group = selID.value;

    if (selID.value === "default") {
      group = true;
    }

    if(main === "main") {
      setDataJSON({
        ...dataJSON,
        query: {
          ...dataJSON.query,
          select: {
            ...dataJSON.query.select,
            [name]: group,
          },
        }
      });
    } else {
      setDataJSON({
        ...dataJSON,
        query: {
          ...dataJSON.query,
          includes: {
            ...dataJSON.query.includes,
            [main]: {
              ...dataJSON.query.includes[main],
              select: {
                ...dataJSON.query.includes[main].select,
                [name]: group,
              }
            }
          }
        }
      })
    }

  }

  const refreshTable = async () => {
    document.getElementById('loadingScreen').checked = true;

    let dt = {...dataJSON};
    dt.query['includes'] = Object.values(dt.query['includes']);
    console.log(dt);
    
    let incold = {}
    for (let tb of dataJSON.query.includes) {
      incold[tb.alias] = tb
    }
    console.log(incold)
    dataJSON.query.includes = incold
    
    dt.query["limit"] = 1000;
    console.log(dt)
    let resp = await Data.postExecute(dt, gatewayHost);
    console.log(resp)

    setExecuteResp(resp.Data);
    if (resp.Data.length > 0) setExecuteCols(Object.keys(resp.Data[0]).map((cols) => ({name: cols})))
    //* bo?? veri d??nd?? hatas?? d??nd??r
    setExecuteRows(resp.Data.map((rows) => (Object.values(rows))))
    
    document.getElementById('loadingScreen').checked = false;
  }

  const addCondition = (main) => {
    if (main === "main") {
      if (dataJSON.query.where_plain.length === 0) {
        setDataJSON({
          ...dataJSON,
          query: {
            ...dataJSON.query,
            where_plain: [{}],
          },
        });
      } else {
        setDataJSON({
          ...dataJSON,
          query: {
            ...dataJSON.query,
            where_plain: [...dataJSON.query.where_plain, "AND", {}],
          },
        });
      }
    } else {
      if (dataJSON.query.includes[main].where_plain.length === 0) {
        setDataJSON({
          ...dataJSON,
          query: {
            ...dataJSON.query,
            includes: {
              ...dataJSON.query.includes,
              [main]: {
                ...dataJSON.query.includes[main],
                where_plain: [{}],
              },
            },
          },
        });
      } else {
        setDataJSON({
          ...dataJSON,
          query: {
            ...dataJSON.query,
            includes: {
              ...dataJSON.query.includes,
              [main]: {
                ...dataJSON.query.includes[main],
                where_plain: [...dataJSON.query.includes[main].where_plain , "", {}],
              },
            },
          },
        });
      }
    }
  };

  const removeCondition = (alias , value) => {
    console.log(alias);
    console.log(value);
    if (alias === 'O') {

      let newconds = []
      for (let i in dataJSON.query.where_plain) {
        if (value === 0 && parseInt(i) === 1) { continue; }
        if (parseInt(i) !== value) { newconds.push(dataJSON.query.where_plain[i])}
        else if (value !== 0) { newconds.pop() }
      }

      setDataJSON({
        ...dataJSON,
        query: {
          ...dataJSON.query,
          where_plain: newconds,
        },
      })
    } else {

      let newconds = []
      for (let i in dataJSON.query.includes[alias].where_plain) {
        if (value === 0 && parseInt(i) === 1) { continue; }
        if (parseInt(i) !== value) { newconds.push(dataJSON.query.includes[alias].where_plain[i])}
        else if (value !== 0) { newconds.pop() }
      }

      setDataJSON({
        ...dataJSON,
        query: {
          ...dataJSON.query,
          includes: {
            ...dataJSON.query.includes,
            [alias]: {
              ...dataJSON.query.includes[alias],
              where_plain: newconds,
            },
          },
        },
      });

    }
    

  }

  const compile = (alias, value , refCol, refEq , refVal , refOpr) => {

    if(alias === "O") {
      var plain = dataJSON.query.where_plain

      if(value%2 === 0) {
        plain[value] = {[refCol]: {[refEq]: refVal}};
      } else {
        plain[value] = refOpr;
      }

      setDataJSON({
        ...dataJSON,
        query: {
          ...dataJSON.query,
          where_plain: plain,
        },
      })
    } else {
      var plain = dataJSON.query.includes[alias].where_plain

      if(value%2 === 0) {
        plain[value] = {[refCol]: {[refEq]: refVal}};
      } else {
        plain[value] = refOpr;
      }

      setDataJSON({
        ...dataJSON,
        query: {
          ...dataJSON.query,
          includes: {
            ...dataJSON.query.includes,
            [alias]: {
              ...dataJSON.query.includes[alias],
              where_plain: plain,
            },
          },
        },
      })
    }
  };

  const saveDataJSON = async () => {
    document.getElementById('loadingScreen').checked = true;

    console.log(inEdit)
    let dt = {...dataJSON};
    dt.query['includes'] = Object.values(dt.query['includes']);
    console.log(dt)

    var sch_id = "";
    for (let id of collections) {
      console.log(id.collection_id)
      console.log(parseInt(dt.collection_id))
      if (id.collection_id === parseInt(dt.collection_id)) { sch_id = id.db_scheme_id }
    }

    if (!inEdit) { //* Yeni olu??turuluyorsa
      var resp = await Data.postModel(dataModalName.current.value ,dataJSON.query.table , sch_id , dt.query);
      console.log(resp)
    } else { //* Edit halindeyse
      var resp = await Data.putModel(modal_data.modalType.model_id, dataModalName.current.value, dataJSON.query.table , sch_id , dt.query);
      console.log(resp)
    }

    if(resp.Success === true) {
      //Modal olu??turma ekran??n?? kapat, modal listesini yenile
      document.getElementById('datamodal').checked = false;
      modal_data.setModalChecked(false);
      modal_data.getList();
      clearModelInputs();
    }

    document.getElementById('loadingScreen').checked = false;
  }

  const clearModelInputs = () => {
    //Modal ekleme ekran??n?? kapatt??k
    modal_data.setModalChecked(false);

    //DataJSON s??f??rlad??k
    setDataJSON({
      collection_id: "",
      query: {
          table: "",
          alias: "O",
          select: {},
          where_plain: [],
          includes: {}
      }
    });

    //Inputlar?? s??f??rl??yoruz
    dataColSelectRef.current.value = "default";
    dataModalName.current.value = "";

    //Source table kapatt??k
    let source_table = document.getElementById("source_table");
    if (!source_table.classList.contains("opacity-0")) {
      close_s_tbl();
    }

    //??li??kili tablolar?? sildik
    sourceTableInputRef.current.value = "";
    setRelations({ inner: [], outer: [] , extra: [] });
    setModalRelations({ inner: [], outer: [] });
    setTables({});
    setMiscIncludes([]);
    setModalTables({});
    setChosenTables([]);
    setExecuteCols([]);
    setExecuteRows([]);
    setCalcModalCols({});
    setAllTransCols([]);
    setInEdit(false);
    setRenameState("");
    setRenameInputState("");
    renamedTitleRef.current = [];
    renamedInputRef.current.value = "";


  }

  const datepart = (col_name , alias , index) => {
    let datepart = document.getElementById('datepart_' + index);

    if(alias === "main") {
      alias = "O";
    }

    if (datepart.classList.contains("!bg-onyx_light")) { //E??er tarih zaten par??alanm????sa yani buton aktifse t??m par??alanm???? tarihleri silece??iz
      //setAllTransCols i??erisinden ????kard??k
      setAllTransCols(
        allTransCols.filter(col =>
        Object.keys(col)[0] !== Object.keys({["{" + col_name + "_YIL}"] : "DATEPART(yyyy ," + alias + "." + col_name + ")"})[0] &&
        Object.keys(col)[0] !==Object.keys({["{" + col_name + "_AY}"] :  "DATEPART(m ," + alias + "." + col_name + ")"})[0] &&
        Object.keys(col)[0] !==Object.keys({["{" + col_name + "_HAFTA}"] :  "DATEPART(ww ," + alias + "." + col_name + ")"})[0] &&
        Object.keys(col)[0] !==Object.keys({["{" + col_name + "_GUN}"] :  "DATEPART(d ," + alias + "." + col_name + ")"})[0]
      ))
      
      //T??m par??al?? tarih kolonlar??n?? dola??t??k ve se??ti??imize kar????l??k gelenleri kald??rd??k
      for (let a of allTransCols) {
        if (Object.keys(a)[0] === "{" + col_name + "_YIL}") {
          delete dataJSON.query.select[Object.keys(a)[0]]
        } else if (Object.keys(a)[0] === "{" + col_name + "_AY}") {
          delete dataJSON.query.select[Object.keys(a)[0]]
        } else if (Object.keys(a)[0] === "{" + col_name + "_HAFTA}") {
          delete dataJSON.query.select[Object.keys(a)[0]]
        } else if (Object.keys(a)[0] === "{" + col_name + "_GUN}") {
          delete dataJSON.query.select[Object.keys(a)[0]]
        }
      }

    } else {

      setAllTransCols([
        ...allTransCols ,
        {["{" + col_name + "_YIL}"] : "DATEPART(yyyy ," + alias + "." + col_name + ")"},
        {["{" + col_name + "_AY}"] :  "DATEPART(m ," + alias + "." + col_name + ")"},
        {["{" + col_name + "_HAFTA}"] :  "DATEPART(ww ," + alias + "." + col_name + ")"},
        {["{" + col_name + "_GUN}"] :  "DATEPART(d ," + alias + "." + col_name + ")"},
      ])
  
      setDataJSON({
        ...dataJSON,
        query: {
          ...dataJSON.query,
          select: {
            ...dataJSON.query.select,
            ["{" + col_name + "_YIL}"] : "DATEPART(yyyy , " + alias + "." + col_name + ")",
            ["{" + col_name + "_AY}"] :  "DATEPART(m , " + alias + "." + col_name + ")",
            ["{" + col_name + "_HAFTA}"] :  "DATEPART(ww , " + alias + "." + col_name + ")",
            ["{" + col_name + "_GUN}"] :  "DATEPART(d , " + alias + "." + col_name + ")",
          },
        }
      });

    }

    datepart.classList.toggle("!bg-onyx_light")
    datepart.classList.toggle("border-grayXgray")
    datepart.classList.toggle("!text-platinium")
  }

  const saveCalcCol = () => {
    //*T??m harfleri tek tek d??nd??r??p ??zerine yaz??yoruz.

    //Ayn?? ada sahip kolon olmamas?? i??in
    if(allTransCols.length > 0) {
      for(let n of allTransCols) {
        console.log(Object.keys(n)[0])
        console.log(Object.keys(n)[0].replaceAll(/[{}]/g , ""))

        if(Object.keys(n)[0].replaceAll(/[{}]/g , "") === calcColNameRef.current.value) {
          document.getElementById('group_modal_warn_1').classList.remove('hidden');
          return;
        }
      }
    }

    let transaction = calcRef.current.value;
    // let convertedTransaction = ""

    // for (var l in transaction) {
    //   let letter = transaction[l]
    //   if (calcCols.includes(letter)) { //E??er calcCols yaz??lan harflerden birini i??eriyorsa
    //     let realcol = calcColRef.current[letter].value
    //     if (calcColTrRef.current[letter].value !== "default") { //E??er i??lem default de??ilse
    //       realcol = calcColTrRef.current[letter].value + "(" + realcol + ")"
    //     }
    //     convertedTransaction += realcol
    //   } else {
    //     convertedTransaction += letter
    //   }
    // }

    for (let i in calcCols) { // Harfleri {} i??erisinde yaz??d??r??yoruz. {} i??inde olanlar?? i??leme alacak
      let l = calcCols[i];
      if (calcColTrRef.current[l].value !== "default") {
        transaction = transaction.replaceAll("{" + l + "}", calcColTrRef.current[l].value + "(" + calcColRef.current[l].value + ")")
      }
      else {
        transaction = transaction.replaceAll("{" + l + "}", calcColRef.current[l].value)
      }
    }

    setAllTransCols([
      ...allTransCols ,
      {["{" + calcColNameRef.current.value + "}"] : transaction}
    ])

    setDataJSON({
      ...dataJSON,
      query: {
        ...dataJSON.query,
        select: {
          ...dataJSON.query.select,
          ["{" + calcColNameRef.current.value + "}"] : transaction,
        },
      }
    });

    document.getElementById('groupmodal').checked = false;
    clearCalcColInp();
  }

  const dltAllTransCols = (name) => {
    setAllTransCols(allTransCols.filter(key => Object.keys(key)[0] !== name[0]))
    delete dataJSON.query.select[name];
  }

  const clearCalcColInp = () => {
    document.getElementById('group_modal_warn_1').classList.add('hidden');

    setCalcCols([]);
    calcColNameRef.current.value = "";
    calcRef.current.value = "";
  }

  const saveManRelTbl = () => {
    //relations i??erisine ekleyeceksin
    let ext = {};

    ext = {
      category: modalTables.O.source_table.category,
      details: modalTables.O.source_table.details,
      name: modalTables.O.source_table.name,
      priority: modalTables.O.source_table.priority,
      table: modalTables.O.source_table.table,
      table: modalTables.O.source_table.table,
      relation_definition: {
        referenced_column: referencedColsRef.current.value,
        single_record: true,
        source_column: sourceColsRef.current.value,
      }
    }

    setRelations({
      ...relations,
      extra: [...relations.extra , ext]
    })

    document.getElementById('manuelrelatedmodal').checked = false;
    clearManRelTblInp();
  }

  const clearManRelTblInp = () => {
    modalSourceTableInputRef.current.value = "";
    setModalTables({});
    setModalRelations({ inner: [], outer: [] });
  }

  const openRenameModal = (main, col_name) => {
    renamedInputRef.current.value = renamedTitleRef.current[main + "-" + col_name].innerHTML.replace("(" , "").replace(")" , "")
    console.log(renamedInputRef.current.value);
    setRenameState(main + "-" + col_name);
    setRenameInputState(renamedInputRef.current.value);
  }

  const renameColumns = () => {
    let dt = {...dataJSON}
    let alias = renameState.split("-")[0]
    let column = renameState.split("-")[1]
  
    if (alias === "main") { // Alias??na g??re yolunu belirledik
      var path = dt.query.select;
    } else {
      var path = dt.query.includes[alias].select
    }
    console.log(renamedInputRef)
    if (renamedInputRef.current.value === "") { //* Input e??er bo?? g??nderiliyorsa

      renamedTitleRef.current[renameState].innerHTML = "";
      path[column] = path[column + "|" + renameInputState]  // Bo?? g??nderildi??inde ek ismi kald??r??p eski halini koyduk yani CARI_KOD = true oldu
      delete path[column + "|" + renameInputState]; // Bo?? g??nderdi??inde ??nceden olu??turulan ??rn: CARI_KOD|DENEME = true nesnesini siliyoruz

    }
    else {  //* E??er input doluysa g??nderiliyorsa

      if (renamedTitleRef.current[renameState].innerHTML !== "") { // E??er daha ??ncesinde yaz??lan bir ??eyin ??zerine yaz??l??yorsa yani CARI_KOD|A yerine CARI_KOD|AAA yap??lacaksa
        console.log("a");
        path[column + "|" + renamedInputRef.current.value] = path[column + "|" + renameInputState];
        delete path[column + "|" + renameInputState];
      }
      else { // E??er daha ??ncesinde yaz??lan bir ??eyin yoksa ve ??zerine yaz??l??yorsa
        path[column + "|" + renamedInputRef.current.value] = path[column]; //renamedInputRef.current[renameState].value
        delete path[column];
      }

      renamedTitleRef.current[renameState].innerHTML = "(" + renamedInputRef.current.value + ")"; //renamedInputRef.current[renameState].value

    }

    setDataJSON(dt);
    document.getElementById('renameColumns').checked = false;
  }

  const cV = () => {
    //Bunu sadece value de??i??tirirken kulland??m hata veriyordu. AllTrans k??sm??nda
  }

  const data = {
    allTransCols, //Bunu kald??r
    calcCols,
    calcModalCols,
    conditions,
    conditionsJSON,
    collections,
    dataJSON,
    executeCols,
    executeResp,
    executeRows,
    filteredData,
    gatewayHost,
    modalRelations,
    relations,
    calcRef,
    calcColRef,
    calcColTrRef,
    calcColNameRef,
    colSelRef,
    dataColSelectRef,
    modalSourceTableInputRef,
    sourceTableInputRef,
    sourceColsRef,
    referencedColsRef,
    renamedTitleRef,
    miscIncludes,
    tables,
    modalTables,
    renameState,
    renamedInputRef,
    renameInputState,
    addColumns,
    addCondition,
    addRelatedTable,
    checkbox,
    changeCondition,
    chooseColor,
    chooseSource,
    clearCalcColInp,
    clearManRelTblInp,
    clearTime,
    colNameSelect,
    compile,
    datepart,
    dltRelatedTable,
    getColSelect, //Bunu daha detayl?? d??????n
    open_s_tbl,
    removeCondition,
    renameColumns,
    saveCalcCol,
    saveManRelTbl,
    selColGroups,
    setDataJSON,
    setCalcCols,
    setCalcModalCols,
    setRenameState,
    show_info,
    source_table,
    sourceTablesJSON,
    openRenameModal,
  };


  return (
    <DataModalContext.Provider value={data}>
      <input type="checkbox" id="datamodal"  className="modal-toggle" />
      <div className="modal bg-modal_back">
        <div className="modal-box max-w-full h-screen p-4 grid grid-cols-5 gap-5 bg-darkest_jet rounded">
          <div className="md:col-span-2 col-span-5 bg-middle_black p-3 rounded shadow-md overflow-auto relative min-h-[570px] h-full">
            <h1 className="text-lg text-platinium mb-2 drop-shadow">
              Model Olu??tur
            </h1>

            <Input value={"Model Ad??"} refName={dataModalName} />

            <hr className="my-3 border-1 w-4/5 relative left-1/2 -translate-x-1/2 border-hr_gray" />

            <ColSelect />

            <SourceTable />
            
            <div className='inline-flex items-center w-full justify-between'>
              <h1 className="text-lg text-platinium mt-3 mb-2 drop-shadow">
                ??li??kili Tablolar
              </h1>
              <div className="tooltip tooltip-left" data-tip="Yeni ??li??kili Tablo Ekle">
                <label htmlFor="manuelrelatedmodal" className="green-btn">
                  <i className="fa-solid fa-plus"></i>
                </label>
              </div>
            </div>

            <Relations />

            <hr className="my-3 border-1 w-4/5 relative left-1/2 -translate-x-1/2 border-hr_gray" />

            <h1 className="text-lg text-platinium mb-2 drop-shadow-lg">
              Se??ilen Tablolar
            </h1>

            <div id="collapses">{chosenTables}</div>

            {(chosenTables.length > 0) ? (
                <div className="table_layout mt-2 p-2 max-h-[465px] border border-jet_mid">
                  {allTransCols.map((col , index) => {
                    let name = Object.keys(col);
                    let name_last = name[0].replaceAll(/[{}]/g , "");

                    return(
                      <div key={index} className="form-control col-span-12">
                        <div className="input-group shadow-md">
                          <span className='bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%] xl:truncate'>{name_last}</span>
                          <input type="text" className="input my-0 input-bordered !rounded-none w-full h-auto pointer-events-none" ref={transRef} onChange={cV} value={Object.values(col)[0]} />
                          <button className="danger-btn h-auto w-[7%] !rounded-l-none !rounded-r" onClick={() => dltAllTransCols(name)}><i className="fa-solid fa-xmark"></i></button>
                        </div>
                      </div>
                    )
                  })}
                    <div className="col-span-12 text-center">
                      <label htmlFor="groupmodal" className="green-btn">
                        <i className="fa-solid fa-plus mr-2"></i>Hesap Kolonu Ekle
                      </label>
                    </div>
                </div>
              ) : undefined
            }
          </div>

          <div className="md:col-span-3 col-span-5 bg-middle_black p-3 rounded shadow-md relative min-h-[570px] h-full">
            <h1 className="text-xl text-platinium mb-2 drop-shadow-lg pl-2 inline-flex">
              ??n ??zleme
            </h1>
            <button
              className="green-btn float-right"
              onClick={() => refreshTable()}
            >
              <i className="fa-solid fa-rotate"></i>
            </button>
            <div
              id="review"
              className="w-full bg-darker_jet rounded shadow-md border border-jet_mid p-2"
            >
              <div
                id="tableReview"
                className="w-full border border-onyx rounded shadow-md overflow-auto"
              >
                <Table pagination={true} />
              </div>
            </div>

            <div id="closeModalBtn" className="bottom-3 right-3 absolute">
              <label htmlFor="datamodal" onClick={clearModelInputs} className="gray-btn mr-2">
                Kapat
              </label>
              <button onClick={() => saveDataJSON()} className="green-btn">Kaydet</button>
            </div>
          </div>

          <RenameColumns />
          <RelationsAbsolute />
          <GroupModal />
          <ManuelRelatedTable />
        </div>
      </div>
    </DataModalContext.Provider>
  );
}
