import axios from 'axios';

class Requests {

    constructor(category , func_name, host = "93.180.133.185:8000") {
        this.host = host;
        this.category = category;
        this.func_name = func_name;

        this.url = "http://" + this.host + "/api/functions/" + this.category + "/" + this.func_name + "/";
        this.gateURL = "http://" + this.host + "/fn/" + this.category + "/" + this.func_name + "/";

    }

    async get(data, gateReq = false) {

        let resp = await axios({
            method: 'get',
            url: (gateReq) ? this.gateURL : this.url,
            params: data,
            headers: {Token: localStorage.Token, "Content-Type": "application/json"}
        })
        return resp.data;
    }

    async post(data, gateReq = false) {

        let resp = await axios({
            method: 'post',
            url: (gateReq) ? this.gateURL : this.url,
            data:data,
            headers: {Token: localStorage.Token, "Content-Type": "application/json"}
        })
        console.log(resp)
        return resp.data;

    }

    async put(data, gateReq = false) {

        let resp = await axios({
            method: 'put',
            url: (gateReq) ? this.gateURL : this.url,
            data:data,
            headers: {Token: localStorage.Token, "Content-Type": "application/json"}
        })
        console.log(resp)
        return resp.data;
    }

    async delete(data, gateReq = false) {

        let resp = await axios({
            method: 'delete',
            url: (gateReq) ? this.gateURL : this.url,
            data:data,
            headers: {Token: localStorage.Token, "Content-Type": "application/json"}
        })
        console.log(resp)
        return resp.data;

    }

}

export default Requests;
