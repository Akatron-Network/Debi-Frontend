import axios from 'axios';

class Requests {

    constructor(category , func_name, host = "93.180.133.185:8000") {
        this.host = host;
        this.category = category;
        this.func_name = func_name;

        this.url = "http://" + this.host + "/api/functions/" + this.category + "/" + this.func_name + "/";

    }

    async get(data) {

        let resp = await axios.get(this.url, data)
        return resp.data;
    }

    async post(data) {

        let resp = await axios.post(this.url, data)
        console.log(resp)
        return resp.data;

    }

}

export default Requests;
