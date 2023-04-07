import Requests from '../classes/Requests';

class WorkspaceAll {

    static async getCollections(id) {
        let getCollections_req = new Requests("workspace" , "collections");
        let resp = await getCollections_req.get({
            collection_id: id
        });
        return resp;
    }

    static async getFolders(id) {
        let getFolders_req = new Requests("workspace" , "directories");
        let resp = await getFolders_req.get({
            directory_id: id
        });
        return resp;
    }

    static async getFiles(id = undefined) {
        let getFiles_req = new Requests("workspace" , "pages");
        let resp = await getFiles_req.get({
            page_id: id
        });
        return resp;
    }

    static async putFiles(id = undefined , values = {}) {
        let getFiles_req = new Requests("workspace" , "pages");
        let resp = await getFiles_req.put({
            page_id: id,
            values: values
        });
        return resp;
    }

    static async postCollections(name , scheme) {
        let postCollections_req = new Requests("workspace" , "collections");
        let resp = await postCollections_req.post({
            collection_name: name,
            db_scheme_id: scheme,
        });
        
        return resp;
    }

    static async putCollections(id , dt) {
        let putCollections_req = new Requests("workspace" , "collections");
        let resp = await putCollections_req.put({
            collection_id: id,
            values: dt
        });

        return resp;
    }

    static async postExplorerSync(id) {
        let postExplorerSync_req = new Requests("data" , "explorer_sync");
        let resp = await postExplorerSync_req.post({
            collection_id: id,
        });
        
        return resp;
    }

    static async postFolders(colID , name , parent_dir) {
        let postFolders_req = new Requests("workspace" , "directories");
        let resp = await postFolders_req.post({
            collection_id: colID,
            directory_name: name,
            parent_directory: parent_dir,
            directory_expl: "Directory for the test requests"

        });
        
        return resp;
    }

    static async putFolders(id, dt) {
        let putFolders_req = new Requests("workspace" , "directories");
        let resp = await putFolders_req.put({
            directory_id: id,
            values: dt,
        });
        
        return resp;
    }

    static async postFiles(colID , foldID , name) {
        let postFiles_req = new Requests("workspace" , "pages");
        let resp = await postFiles_req.post({
            collection_id: colID,
            directory_id: foldID,
            page_name: name,
        });
        
        return resp;
    }

    static async putFiles(id, dt) {
        let putFiles_req = new Requests("workspace" , "pages");
        let resp = await putFiles_req.put({
            page_id: id,
            values: dt,
        });
        
        return resp;
    }

    static async deleteCollections(colID) {
        let deleteCollections_req = new Requests("workspace" , "collections");
        let resp = await deleteCollections_req.delete({
            collection_id: colID,
        });
        
        return resp;
    }

    static async deleteFolders(foldID) {
        let deleteCollections_req = new Requests("workspace" , "directories");
        let resp = await deleteCollections_req.delete({
            directory_id: foldID,
        });
        
        return resp;
    }

    static async deleteFiles(fileID) {
        let deleteCollections_req = new Requests("workspace" , "pages");
        let resp = await deleteCollections_req.delete({
            page_id: fileID,
        });
        
        return resp;
    }

    static async getTrees() {
        let getTrees_req = new Requests("workspace" , "tree");
        let resp = await getTrees_req.get();
        return resp;
    }

    static async getShare() {
        let getShare_req = new Requests("workspace" , "share");
        let resp = await getShare_req.get();
        
        return resp;
    }

    static async postShare(itemType , itemID , sharedTo , editable) {
        let postShare_req = new Requests("workspace" , "share");
        let resp = await postShare_req.post({
            shared_item_type: itemType,
            shared_item_id: itemID,
            shared_to: sharedTo,
            editable: editable
        });
        
        return resp;
    }

    static async deleteShare(type, id) {
        let deleteShare_req = new Requests("workspace" , "share");
        let resp = await deleteShare_req.delete({
            [type + "_share_id"] : id,
        });
        
        return resp;
    }

    static async getFavorites() {
        let getFavorites_req = new Requests("workspace" , "favs");
        let resp = await getFavorites_req.get();
        
        return resp;
    }

    static async postFavorites(id) {
        let postFavorites_req = new Requests("workspace" , "favs");
        let resp = await postFavorites_req.post({
            page_id: id
        });
        
        return resp;
    }

    static async deleteFavorites(id) {
        let deleteFavorites_req = new Requests("workspace" , "favs");
        let resp = await deleteFavorites_req.delete({
            page_id: id
        });
        
        return resp;
    }

    static async addTrialPack(id) {
        let trialPackPost_req = new Requests("workspace" , "trial_pack");
        let resp = await trialPackPost_req.post({
            collection_id: id
        });
        
        return resp;
    }

}

export default WorkspaceAll;