import Requests from '../classes/Requests';

class Service {

    static async login(username , password) {
        let login_req = new Requests("service" , "auth");

        try {
            
            let resp = await login_req.get({
                    username: username,
                    password: password,
            })
            console.log(resp);

            localStorage.clear();
            localStorage.setItem('Token' , resp.Token);
            localStorage.setItem('RefreshToken' , resp.Data.refresh_token);
            
        } catch (err) {
            
            console.log(err.response.data)

            return false;
        }

        return true
    }

    static async register(username , password , email , phone = "") {
        let register_req = new Requests("service" , "register")
        
        try {
    
            let resp = await register_req.post({
                username: username,
                password: password,
                details:{
                        email: email,
                        phone: phone,
                        }
            })
            console.log(resp);
        }
        catch (err) {
            console.log(err.response.data)
            return false;
        }

        return true
    }
}

export default Service;