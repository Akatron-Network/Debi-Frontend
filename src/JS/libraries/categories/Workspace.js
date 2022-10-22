import Requests from '../classes/Requests';

class WorkspaceAll {

    static async getCollections(id) {
        let getCollections_req = new Requests("workspace" , "collections");

        try {
            let resp = await getCollections_req.get({
                collection_id: id
            });
            console.log(resp)
            return resp;
        } catch (err) {
            console.log(err);
            
        }
    }

    static async getFolders(id) {
        let getFolders_req = new Requests("workspace" , "directories");

        try {
            let resp = await getFolders_req.get({
                directory_id: id
            });
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

    static async postFolders(colID , name , parent_dir) {
        let postFolders_req = new Requests("workspace" , "directories");

        try {
            let resp = await postFolders_req.post({
                collection_id: colID,
                directory_name: name,
                parent_directory: parent_dir,
                directory_expl: "Directory for the test requests"

            });
            
            return resp;
        } catch (err) {
            console.log(err);
            
        }
    }

    static async postFiles(colID , foldID , name) {
        let postFiles_req = new Requests("workspace" , "pages");

        try {
            let resp = await postFiles_req.post({
                collection_id: colID,
                directory_id: foldID,
                page_name: name,
            });
            
            return resp;
        } catch (err) {
            console.log(err);
            
        }
    }

    static async deleteCollections(colID) {
        let deleteCollections_req = new Requests("workspace" , "collections");

        try {
            let resp = await deleteCollections_req.delete({
                collection_id: colID,
            });
            
            return resp;
        } catch (err) {
            console.log(err);
            
        }
    }

    static async deleteFolders(foldID) {
        let deleteCollections_req = new Requests("workspace" , "directories");

        try {
            let resp = await deleteCollections_req.delete({
                directory_id: foldID,
            });
            
            return resp;
        } catch (err) {
            console.log(err);
            
        }
    }

    static async deleteFiles(fileID) {
        let deleteCollections_req = new Requests("workspace" , "pages");

        try {
            let resp = await deleteCollections_req.delete({
                page_id: fileID,
            });
            
            return resp;
        } catch (err) {
            console.log(err);
            
        }
    }

    static async getTrees() {
        let getTrees_req = new Requests("workspace" , "tree");

        try {
            let resp = await getTrees_req.get();
            
            console.log(resp)
            return resp;
        } catch (err) {
            console.log(err);
            
        }
    }

}

export default WorkspaceAll;