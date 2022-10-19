import Requests from '../classes/Requests';

class WorkspaceAll {

    static async getCollections() {
        let getCollections_req = new Requests("workspace" , "collections");

        try {
            let resp = await getCollections_req.get();
            console.log(resp)
            return resp;
        } catch (err) {
            console.log(err);
            
        }
    }

    static async getFolders() {
        let getFolders_req = new Requests("workspace" , "directories");

        try {
            let resp = await getFolders_req.get();
            console.log(resp)
            return resp;
        } catch (err) {
            console.log(err);
            
        }
    }

    static async getFiles() {
        let getFiles_req = new Requests("workspace" , "pages");

        try {
            let resp = await getFiles_req.get();
            console.log(resp)
            return resp;
        } catch (err) {
            console.log(err);
            
        }
    }

    static async postCollections(name) {
        let postCollections_req = new Requests("workspace" , "collections");

        try {
            let resp = await postCollections_req.post({
                collection_name: name,
            });

            
            return resp;
        } catch (err) {
            console.log(err);
            
        }
    }
    static async postFolders(colID , name) {
        let postFolders_req = new Requests("workspace" , "directories");

        try {
            let resp = await postFolders_req.post({
                collection_id: colID,
                directory_name: name,
                directory_expl: "Directory for the test requests"
            });

            return resp;
        } catch (err) {
            console.log(err);
            
        }
    }
    static async postFiles(name) {
        let postFiles_req = new Requests("workspace" , "pages");

        try {
            let resp = await postFiles_req.post({
                collection_name: name,
            });
            
            return resp;
        } catch (err) {
            console.log(err);
            
        }
    }

}

export default WorkspaceAll;