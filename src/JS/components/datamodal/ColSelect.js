import React, { useContext } from "react";
import { DataModalContext } from "../context";

export default function ColSelect() {
  const data = useContext(DataModalContext);

  return (
    <div className="form-control mb-2">
      <div className="input-group shadow-md">
        <span className="bg-black_light text-grayXgray px-2 py-[7px] !rounded-l border border-jet_mid justify-center min-w-[35%] xl:truncate">
          Koleksiyon Adı
        </span>
        <select
          defaultValue="default"
          className="condition_select max-w-[65%] !rounded-l-none"
          ref={data.dataColSelectRef}
          onChange={() => data.colNameSelect(data.dataColSelectRef.current.value)}
        >
          <option disabled value="default">
            Bir koleksiyon seçin...
          </option>

          {data.collections.map((collection) => (
            <option
              key={collection.collection_id.toString()}
              value={collection.collection_id}
            >
              {collection.collection_name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
