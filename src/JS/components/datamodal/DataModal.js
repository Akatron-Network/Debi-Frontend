import React, { useEffect, useRef, useState } from 'react'
import Table from '../Table';
import Input from '../Input';
import WorkspaceAll from '../../libraries/categories/Workspace';
import Data from '../../libraries/categories/Data';
import { DataModalContext } from '../context'
import SourceTable from './SourceTable';
import Relations from './Relations';
import RelationsAbsolute from './RelationsAbsolute';
import Collapses from './Collapses';
import Condition from './Condition';
import getAlias from '../../libraries/misc';

export default function DataModal() {

  useEffect(() => {
    window.addEventListener("resize", review);
    getColSelect();

    return () => {
      window.removeEventListener("resize", review);
    };
  }, []);

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

  const review = () => {
    //!Önizleme için gerekiyor
    let review_btn = document.getElementById("closeModalBtn");
    let review = document.getElementById("review");
    let tblReview = document.getElementById("tableReview");

    setTimeout(() => {
      let review_btn_crd = review_btn.getBoundingClientRect();
      let review_crd = review.getBoundingClientRect();

      review.style.height = review_btn_crd.top - review_crd.top - 8 + "px";
    }, 220);

    setTimeout(() => {
      let review_crd = review.getBoundingClientRect();
      tblReview.style.height = review_crd.height - 16 + "px";
    }, 230);
  };

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
      }, 700);
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
  const dataModalName = useRef({ value: "" });
  const sourceTableInputRef = useRef({ value: "" });

  const [chosenTables, setChosenTables] = useState([]);
  const [collections, setCollections] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [gatewayHost, setGatewayHost] = useState("");
  const [miscIncludes, setMiscIncludes] = useState([]);
  const [relations, setRelations] = useState({ inner: [], outer: [] });
  const [sourceTable, setSourceTable] = useState([]);

  const [dataJSON, setDataJSON] = useState({
    collection_id: "",
    query: {
        table: "",
        alias: "",
        select: {},
        where: undefined,
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

    setGatewayHost(col.Data.connector.gateway_host);
    setSourceTable(resp.Data);
    setFilteredData(resp.Data); //!We create filteredData for filtered datas, because we don't want change sourcetable
    setDataJSON({...dataJSON , collection_id: id})
    
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

  const chooseSource = async (table, category, nameTable) => {
    sourceTableInputRef.current.value = category + " / " + nameTable;

    let resp = await Data.getExplorer(
      dataColSelectRef.current.value,
      gatewayHost,
      table,
      true
    ); //! Get table relations
    setRelations(resp.Data.relations);
    
    setChosenTables(
      chosenTables.concat(<Collapses keyID={chosenTables.length} data={resp.Data} main={"main"} />) //! İlk tablo eklendiğinde gelen ana kolonlar vs için
    );
    
    setDataJSON({
      ...dataJSON,
      query: {
        ...dataJSON.query,
        table: table,
      }
    });

    close_s_tbl();
  };

  const addRelatedTable = async (index, table , rel_definition) => {
    let resp = await Data.getExplorer(
      dataColSelectRef.current.value,
      gatewayHost,
      table,
      true
    ); //! Get table relations
    
    const alias = getAlias(miscIncludes);
    setMiscIncludes(alias);
    
    setChosenTables(
      chosenTables.concat(<Collapses keyID={chosenTables.length} data={resp.Data} main={alias} />)
    );

    const includesJSON = {
      table: resp.Data.source_table.table,
      type: "INNER",
      on: {
        [rel_definition.referenced_column]: rel_definition.source_column
      },
      select: {
      },
      where: undefined
    }

    setDataJSON({
      ...dataJSON,
      query: {
        ...dataJSON.query,
        includes: {...dataJSON.query.includes , [alias]: includesJSON},
      },
    });
  };

  const addColumns = async (main , col_name , index) => {

    document.getElementById("elm_" + main + "_" + index).classList.toggle("border-sea_green")
    document.getElementById("elm_" + main + "_" + index).classList.toggle("bg-middle_black")

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

  const addCondition = () => {

    setConditions(
      conditions.concat(<Condition key={conditions.length} />)
    );
  }

  const refreshTable = async () => {
    let dt = dataJSON;
    dt.query['includes'] = Object.values(dt.query['includes']);
    console.log(dt)

    let resp = await Data.postExecute(dt, gatewayHost);
    console.log(resp)

  }

  const data = {
    conditions,
    dataColSelectRef,
    dataJSON,
    sourceTableInputRef,
    filteredData,
    gatewayHost,
    relations,
    addColumns,
    addCondition,
    addRelatedTable,
    checkbox,
    changeCondition,
    chooseColor,
    chooseSource,
    clearTime,
    open_s_tbl,
    setDataJSON,
    show_info,
    source_table,
    sourceTablesJSON,
  };

  return (

    <DataModalContext.Provider value={data}>

      <input type="checkbox" id="datamodal" className="modal-toggle" />
      <div className="modal bg-modal_back">
        <div className="modal-box max-w-full h-screen p-4 grid grid-cols-5 gap-5 bg-darkest_jet rounded">

          <div className="md:col-span-2 col-span-5 bg-middle_black p-3 rounded shadow-md overflow-auto relative min-h-[570px] h-full">

            <div className="form-control mb-2">
              <div className="input-group shadow-md">
                <span className='bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%] xl:truncate'>Koleksiyon Adı</span>
                <select defaultValue='default' className="condition_select max-w-[65%] !rounded-l-none" ref={dataColSelectRef} onChange={() => colNameSelect(dataColSelectRef.current.value)}>
                  <option disabled value="default">Bir koleksiyon seçin...</option>

                  {collections.map((collection) => (
                    <option key={collection.collection_id.toString()} value={collection.collection_id}>{collection.collection_name}</option>
                  ))}

                </select>
              </div>
            </div>

            <hr className='my-3 border-1 w-4/5 relative left-1/2 -translate-x-1/2 border-hr_gray' />

            <Input value={"Model adı"} refname={dataModalName} />

            <SourceTable />

            <h1 className='text-lg text-platinium mt-3 mb-2 drop-shadow'>İlişkili Tablolar</h1>

            <Relations />

            <hr className='my-3 border-1 w-4/5 relative left-1/2 -translate-x-1/2 border-hr_gray' />

            <h1 className='text-lg text-platinium mb-2 drop-shadow-lg'>Seçilen Tablolar</h1>

            <div id="collapses">{chosenTables}</div>

          </div>


          <div className="md:col-span-3 col-span-5 bg-middle_black p-3 rounded shadow-md relative min-h-[570px] h-full">

            <h1 className='text-xl text-platinium mb-2 drop-shadow-lg pl-2 inline-flex'>Ön İzleme</h1>
            <button className='green-btn float-right' onClick={() => refreshTable()}><i className="fa-solid fa-rotate"></i></button>
            <div id='review' className='w-full bg-darker_jet rounded shadow-md border border-jet_mid p-2'>
              <div id='tableReview' className='w-full border border-onyx rounded shadow-md overflow-auto'>
                <Table />
              </div>
            </div>

            <div id='closeModalBtn' className="bottom-3 right-3 absolute">
              <label htmlFor="datamodal" className="gray-btn mr-2">Kapat</label>
              <button className='green-btn'>Kaydet</button>
            </div>
          </div>

          <RelationsAbsolute />

        </div>
      </div>
    </DataModalContext.Provider>

  )
}
