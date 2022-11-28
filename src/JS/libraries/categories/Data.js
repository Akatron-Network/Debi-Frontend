import Requests from '../classes/Requests';

class Data {
  static async postConnector(colID, type, content) {
    let postConnector_req = new Requests("data", "connector");

    try {
      let resp = await postConnector_req.post({
        collection_id: colID,
        connector_type: type,
        context: content,
      });

      return resp;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  static async putConnector(type, content, host) {
    let putConnector_req = new Requests("data", "connector", host + ":8001");

    var resp = await putConnector_req.put(
      {
        connector_type: type,
        context: content,
      },
      host !== undefined
    );
    return resp;
  }

  static async getExplorer(id, host, tbl_name = "", rel = false) {
    let getExplorer_req = new Requests("data", "explorer", host + ":8001");

    var resp = await getExplorer_req.get(
      {
        collection_id: id,
        table_name: tbl_name,
        include: {
          relations: rel,
        },
      },
      host !== undefined
    );

    return resp;
  }

  static async postExecute(data, host) {
    let postExecute_req = new Requests("data", "execute", host + ":8001");

    var resp = await postExecute_req.post(data, host !== undefined);

    return resp;
  }

  static async postModel(model_name, source_table, id, data) {
    let postModel_req = new Requests("data", "model");

    var resp = await postModel_req.post({
      model_name: model_name,
      source_table: source_table,
      db_scheme_id: id,
      query: data,
    });

    return resp;
  }

  static async putModel(model_id, model_name, source_table, id, data) {
    let putModel_req = new Requests("data", "model");

    var resp = await putModel_req.put({
      model_id: model_id,
      values: {
        model_name: model_name,
        source_table: source_table,
        db_scheme_id: id,
        query: data,
      }
    });

    return resp;
  }

  static async getModalList() {
    let getModalList_req = new Requests("data", "model");

    var resp = await getModalList_req.get();

    return resp;
  }

  static async getModel(id) {
    let getModel_req = new Requests("data", "model");

    var resp = await getModel_req.get({
      model_id: id
    });
    return resp;
  }

  static async dltModel(id) {
    let dltModel_req = new Requests("data", "model");

    var resp = await dltModel_req.delete({
      model_id: id
    });
    return resp;
  }



}

export default Data;