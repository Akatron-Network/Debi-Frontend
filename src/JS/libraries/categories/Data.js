import Requests from '../classes/Requests';

class Data {
  static async postConnector(colID, type, gateway, gateway_host, content) {
    let postConnector_req = new Requests("data", "connector");

    try {
      let resp = await postConnector_req.post({
        collection_id: colID,
        gateway: gateway,
        gateway_host: gateway_host,
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
    let putConnector_req = new Requests("data", "connector", (host) ? host + ":8001" : undefined);

    var resp = await putConnector_req.put(
      {
        connector_type: type,
        context: content,
      },
      (host !== undefined && host !== null)
    );
    return resp;
  }

  static async getExplorer(id, host, tbl_name = "", rel = false, view = false, col = false) {
    let getExplorer_req = new Requests("data", "explorer", (host) ? host + ":8001" : undefined);

    var resp = await getExplorer_req.get(
      {
        collection_id: id,
        table_name: tbl_name,
        include: {
          relations: rel,
          views: view,
          columns: col,
        },
      },
      (host !== undefined && host !== null)
    );

    return resp;
  }

  static async postExecute(data, host) {
    let postExecute_req = new Requests("data", "execute", (host) ? host + ":8001" : undefined);

    var resp = await postExecute_req.post(data, (host !== undefined && host !== null));

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

  static async getUnionList() {
    let getUnionList_req = new Requests("data", "union");

    var resp = await getUnionList_req.get();

    return resp;
  }

  static async postUnion(data) {
    let postUnion_req = new Requests("data", "union");

    var resp = await postUnion_req.post(data);
    return resp;
  }

  static async putUnion(union_id, data) {
    let putUnion_req = new Requests("data", "union");

    var resp = await putUnion_req.put({
      union_id: union_id,
      values: data,
    });

    return resp;
  }

  static async dltUnion(id) {
    let dltUnion_req = new Requests("data", "union");

    var resp = await dltUnion_req.delete({
      union_id: id
    });
    return resp;
  }

}

export default Data;