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
    let putConnector_req = new Requests("data", "connector", host);

    var resp = await putConnector_req.put(
      {
        connector_type: type,
        context: content,
      },
      host !== undefined
    );
    return resp;
  }

  static async getExplorer(id, host ) {
    let getExplorer_req = new Requests("data", "explorer", host + ":8001");

    var resp = await getExplorer_req.get(
      {
        collection_id: id,
      },
      host !== undefined
    );

    return resp;
  }

  static async getExplorer(id, host , tbl_name = "" , rel = false) {
    let getExplorer_req = new Requests("data", "explorer", host + ":8001");

    var resp = await getExplorer_req.get(
      {
        collection_id: id,
        table_name: tbl_name,
        include: {
          relations: rel
        }
      },
      host !== undefined
    );

    return resp;
  }
}

export default Data;