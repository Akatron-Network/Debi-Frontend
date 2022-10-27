import Requests from '../classes/Requests';

class Data {

    static async postConnector(colID , type , content) {
        let postConnector_req = new Requests("data" , "connector" );

        try {
            let resp = await postConnector_req.post({
                collection_id: colID,
                connector_type: type,
                context: content
            });
            
            return resp;
        } catch (err) {
            console.log(err);
            return err;
            
        }
    }

    static async putConnector(type , content , host) {
        let putConnector_req = new Requests("data" , "connector", host);

          if(host !== undefined) {
            var resp = await putConnector_req.gatePut({
                connector_type: type,
                context: content
            });
          } else {
            var resp = await putConnector_req.put({
                connector_type: type,
                context: content
            });
          }
            
          return resp;
    }

    static async getExplorer(id , host) {
        let getExplorer_req = new Requests("data" , "explorer" , host);

          if(host !== undefined) {
            var resp = await getExplorer_req.gateGet({
              collection_id: id
            });
          } else {
            var resp = await getExplorer_req.put({
              collection_id: id
            });
          }
            
          return resp;
    }

}

export default Data;