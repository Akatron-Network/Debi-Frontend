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

export default function DataModal() {
  const modal_data = useContext(ModalContext);

  useEffect(() => {
    getColSelect();
  }, []);

  // useEffect(() => {
  //   setDataJSON({ ...dataJSON , query: modal_data.modalType.query });
  //   console.log(modal_data.modalType.query)
  
  // }, [modal_data.modalType])
  
  // useEffect(() => {
  //   //*Eğer modal açıldıysa burayı kontrol edecek ve ona göre editModal fonksiyonunda dataJSON düzenlenecek
  //   if (modal_data.modalChecked === true) {
  //     if (modal_data.modalType === "new") {
  //       console.log("New Modal");
  //       setDataJSON({
  //         collection_id: "",
  //         query: {
  //             table: "",
  //             alias: "O",
  //             select: {},
  //             where_plain: [],
  //             includes: {}
  //         }
  //       });
  //     } else {
  //       editModal();
  //     }
  //   }
  // }, [modal_data.modalChecked])
  

  const editModal = async () => {
    console.log(modal_data.modalType);
    // var modal_type = modal_data.modalType;

    // if (collections[0].db_scheme_id === modal_type.db_scheme_id) {
    //   dataColSelectRef.current.value = collections[0].collection_id; //* Koleksiyon adı
    // }
    // dataModalName.current.value = modal_type.model_name; //* Model adı
    console.log(dataJSON);
    // let rt = await colNameSelect(dataColSelectRef.current.value); //* Kaynak tablo getir

    // console.log(rt);
    // var dt = rt[1].filter((data) => (data.table === modal_type.query.table));
    // console.log(dt);
    // await chooseSource(modal_type.query.table, dt[0].category, dt[0].name, rt[0]); //* Kaynak tablo seçimi
    // await addRelatedTable(modal_type.query.table, "" ,rt[0]);
    

    // setDataJSON({ collection_id: collections[0].collection_id, query: modal_data.modalType.query });
  };

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
  //   //!Önizleme için gerekiyor
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
          //! Büyürken z-indeksleri geç ayarladığından dolayı biraz erteledim ki arkada kalmasın
          open_card.classList.add("!h-[150px]");
          open_card.classList.add("!w-[280px]");
        }, 300);
      }, 1000);
    } else {
      if (open_card.classList.contains("!h-[150px]")) {
        setTimeout(() => {
          //! Küçülürken z-indeksleri geç ayarladığından dolayı biraz erteledim ki önde kalmasın
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
        //! Buradaki setTimeout 'u mouseenter ve mouseleave çakışabiliyor ve hover sürekli aktif kalıyor diye koydum.
        open_card.classList.remove("!bg-middle_black");
        open_card.classList.remove("!border-onyx");
      }, 50);
    }
  };

  const source_table = () => {
    let source_table = document.getElementById("source_table");

    if (source_table.classList.contains("opacity-0")) {
      open_s_tbl();
    } else {
      close_s_tbl();
    }
  };

  const open_s_tbl = () => {
    let source_table = document.getElementById("source_table");

    source_table.classList.remove("hidden");

    setTimeout(function () {
      source_table.classList.remove("-translate-y-16");
      source_table.classList.remove("opacity-0");
    }, 1);
  };

  const close_s_tbl = () => {
    let source_table = document.getElementById("source_table");

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
      //! Burada ilk başta query ile böyle bir id var mı diye kontrol ettim eğer varsa(yani açık olanın üzerine tekrar tıklandıysa) direkt olarak silecek.
      //! Eğer bunlar olmazsa direkt olarak ilk başta tüm açık veya html e yazılmış gruplamaları silip tekrar baştan yazdırtacak.
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

  const dataColSelectRef = useRef({ value: "default" });
  const dataModalName = useRef("");
  const calcRef = useRef("");
  const transRef = useRef({});
  const calcColRef = useRef({});
  const calcColTrRef = useRef({});
  const calcColNameRef = useRef("");
  const colSelRef = useRef("default");
  const sourceTableInputRef = useRef({ value: "" });

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
  const [relations, setRelations] = useState({ inner: [], outer: [] });
  const [sourceTable, setSourceTable] = useState([]);
  const [tables, setTables] = useState({});

  const [conditionsJSON, setConditionsJSON] = useState([]);


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

  const getColSelect = async () => {
    //! Get collections
    let resp = await WorkspaceAll.getCollections();
    setCollections(resp.Data.owned_collections);
  };

  const colNameSelect = async (id) => {
    let col = await WorkspaceAll.getCollections(id); //! Get Gateway host
    let resp = await Data.getExplorer(id, col.Data.connector.gateway_host);

    source_table();

    setGatewayHost(col.Data.connector.gateway_host);
    setSourceTable(resp.Data);
    setFilteredData(resp.Data); //!We create filteredData for filtered datas, because we don't want change sourcetable
    console.log(dataJSON)
    setDataJSON({...dataJSON, collection_id: id})

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

  const chooseSource = async (table, category = "", nameTable = "" , gatewayHost) => {
    sourceTableInputRef.current.value = category + " / " + nameTable;

    //! Get table relations
    let resp = await Data.getExplorer(
      dataColSelectRef.current.value,
      gatewayHost,
      table,
      true
    );
    setRelations(resp.Data.relations);
    var result = [];

    setTables({
      ...tables,
      O: resp.Data,
    });

    setChosenTables(
      result.concat(<Collapses key={0} data={resp.Data} main={"main"} />) //! İlk tablo eklendiğinde gelen ana kolonlar vs için
    );

    setDataJSON({
      ...dataJSON,
      query: {
        ...dataJSON.query,
        table: table,
      },
    });

    close_s_tbl();
  };

  const addRelatedTable = async (table , rel_definition = "" , gatewayHost) => {
    let resp = await Data.getExplorer(
      dataColSelectRef.current.value,
      gatewayHost,
      table,
      false
    ); //! Get table relations
    
    const alias = getAlias(miscIncludes);
    setMiscIncludes([...miscIncludes , alias]);

    let keyID = getKeyID(chosenTables);
    
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
  };

  const dltRelatedTable = async (alias , keyID) => {
    console.log(keyID);
    
    if(alias !== "main") {
      delete dataJSON.query.includes[alias];
      setChosenTables(chosenTables.filter(item => item.key !== keyID.toString()))
    }

    delete calcModalCols[alias]
  }

  const addColumns = async (main , col_name , index) => {

    if(document.getElementById("elm_" + main + "_" + index).classList.contains("border-sea_green")) {
      if(main === "main") {
        console.log(dataJSON.query.select[col_name]);
        delete dataJSON.query.select[col_name];
      }
      else {
        console.log(dataJSON.query.includes[main].select[col_name]);
        delete dataJSON.query.includes[main].select[col_name];
      }
    } else {

      if(main === "main") {
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

    document.getElementById("sel_" + main + "_" + index).classList.toggle("hidden")
    document.getElementById("elm_" + main + "_" + index).classList.toggle("border-sea_green")
    document.getElementById("elm_" + main + "_" + index).classList.toggle("bg-middle_black")
  }

  const selColGroups = (main , col_name , index) => {

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
            [col_name]: group,
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
                [col_name]: group,
              }
            }
          }
        }
      })
    }

  }

  const refreshTable = async () => {
    let dt = {...dataJSON};
    dt.query['includes'] = Object.values(dt.query['includes']);
    
    let incold = {}
    for (let tb of dataJSON.query.includes) {
      incold[tb.alias] = tb
    }
    dataJSON.query.includes = incold
    
    let resp = await Data.postExecute(dt, gatewayHost);
    console.log(resp)

    setExecuteResp(resp.Data);
    setExecuteCols(Object.keys(resp.Data[0]).map((cols) => ({name: cols})))
    setExecuteRows(resp.Data.map((rows) => (Object.values(rows))))
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
    let dt = {...dataJSON};
    dt.query['includes'] = Object.values(dt.query['includes']);

    console.log(dt)
    let resp = await Data.postModel(dataModalName.current.value , collections[0].source_table , collections[0].db_scheme_id , dt.query);
    console.log(resp)

    if(resp.Success === true) {
      //Modal oluşturma ekranını kapat
      document.getElementById('datamodal').checked = false;
      modal_data.setModalChecked(false);
      clearModelInputs();
    }

  }

  const clearModelInputs = () => {
    //Modal ekleme ekranını kapattık
    modal_data.setModalChecked(false);

    //DataJSON sıfırladık
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

    //Inputları sıfırlıyoruz
    dataColSelectRef.current.value = "default";
    dataModalName.current.value = "";

    //Source table kapattık
    let source_table = document.getElementById("source_table");
    if (!source_table.classList.contains("opacity-0")) {
      close_s_tbl();
    }

    //İlişkili tabloları sildik
    sourceTableInputRef.current.value = "";
    setRelations({ inner: [], outer: [] });
    setTables({});
    setChosenTables([]);
    setExecuteCols([]);
    setExecuteRows([]);
    setCalcModalCols({});
  }

  const saveCalcCol = () => {
    //*Tüm harfleri tek tek döndürüp üzerine yazıyoruz.

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
    let convertedTransaction = ""

    for (var l in transaction) {
      let letter = transaction[l]
      if (calcCols.includes(letter)) { //Eğer calcCols yazılan harflerden birini içeriyorsa
        let realcol = calcColRef.current[letter].value
        if (calcColTrRef.current[letter].value !== "default") { //Eğer işlem default değilse
          realcol = calcColTrRef.current[letter].value + "(" + realcol + ")"
        }
        convertedTransaction += realcol
      } else {
        convertedTransaction += letter
      }
    }
    console.log(convertedTransaction)

    setAllTransCols([
      ...allTransCols ,
      {["{" + calcColNameRef.current.value + "}"] : convertedTransaction}
    ])
  }

  const clearCalcColInp = () => {
    document.getElementById('group_modal_warn_1').classList.add('hidden');

    setCalcCols([]);
    calcColNameRef.current.value = "";
    calcRef.current.value = "";
  }

  const cV = () => {
    //Bunu sadece value değiştirirken kullandım hata veriyordu. Alltrans kısmında
  }

  const data = {
    allTransCols, //Bu
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
    relations,
    calcRef,
    calcColRef,
    calcColTrRef,
    calcColNameRef,
    colSelRef,
    dataColSelectRef,
    sourceTableInputRef,
    miscIncludes,
    tables,
    addColumns,
    addCondition,
    addRelatedTable,
    checkbox,
    changeCondition,
    chooseColor,
    chooseSource,
    clearCalcColInp,
    clearTime,
    colNameSelect,
    compile,
    dltRelatedTable,
    open_s_tbl,
    removeCondition,
    saveCalcCol,
    selColGroups,
    setDataJSON,
    setCalcCols,
    setCalcModalCols,
    show_info,
    source_table,
    sourceTablesJSON,
  };

  return (
    <DataModalContext.Provider value={data}>
      <input type="checkbox" id="datamodal"  className="modal-toggle" />
      <div className="modal bg-modal_back">
        <div className="modal-box max-w-full h-screen p-4 grid grid-cols-5 gap-5 bg-darkest_jet rounded">
          <div className="md:col-span-2 col-span-5 bg-middle_black p-3 rounded shadow-md overflow-auto relative min-h-[570px] h-full">
            <ColSelect />

            <hr className="my-3 border-1 w-4/5 relative left-1/2 -translate-x-1/2 border-hr_gray" />

            <Input value={"Model Adı"} refName={dataModalName} />

            <SourceTable />

            <h1 className="text-lg text-platinium mt-3 mb-2 drop-shadow">
              İlişkili Tablolar
            </h1>

            <Relations />

            <hr className="my-3 border-1 w-4/5 relative left-1/2 -translate-x-1/2 border-hr_gray" />

            <h1 className="text-lg text-platinium mb-2 drop-shadow-lg">
              Seçilen Tablolar
            </h1>

            <div id="collapses">{chosenTables}</div>

              <div className="table_layout mt-2 p-2 max-h-[465px] border border-jet_mid">
                {allTransCols.map((col , index) => {
                  let name = Object.keys(col);
                  let name_last = name[0].replaceAll(/[{}]/g , "");

                  return(
                    <div key={index} className="form-control col-span-12">
                      <div className="input-group shadow-md">
                        <span className='bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%] xl:truncate'>{name_last}</span>
                        <input type="text" className="input my-0 input-bordered !rounded-r w-full h-auto pointer-events-none" ref={transRef} onChange={cV} value={Object.values(col)[0]} />
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
          </div>

          <div className="md:col-span-3 col-span-5 bg-middle_black p-3 rounded shadow-md relative min-h-[570px] h-full">
            <h1 className="text-xl text-platinium mb-2 drop-shadow-lg pl-2 inline-flex">
              Ön İzleme
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
                <Table />
              </div>
            </div>

            <div id="closeModalBtn" className="bottom-3 right-3 absolute">
              <label htmlFor="datamodal" onClick={clearModelInputs} className="gray-btn mr-2">
                Kapat
              </label>
              <button onClick={() => saveDataJSON()} className="green-btn">Kaydet</button>
            </div>
          </div>

          <RelationsAbsolute />
          <GroupModal />
        </div>
      </div>
    </DataModalContext.Provider>
  );
}
