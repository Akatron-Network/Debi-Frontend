import Requests from '../classes/Requests';

class Service {

    static async login(username , password) {
        let login_req = new Requests("service" , "auth");

        try {
            
            let resp = await login_req.get({
                    username: username,
                    password: password,
            })

            localStorage.clear();
            localStorage.setItem('Token' , resp.Token);
            localStorage.setItem('RefreshToken' , resp.Data.refresh_token);
            localStorage.setItem('Username' , username)
            
        } catch (err) {
            
            console.log(err.response.data)

            return false;
        }

        return true
    }

    static async register(username , password , email , key) {
        let register_req = new Requests("service" , "register")
        
        try {
    
            let resp = await register_req.post({
                username: username,
                password: password,
                key: key,
                details:{
                        email: email,
                        }
            })
            
        }
        catch (err) {
            console.log(err.response.data)
            return false;
        }

        return true
    }

    static async logout() {
        let logout_req = new Requests("service" , "auth");

        try {
            
            let resp = await logout_req.delete({
                    Token: localStorage.getItem("Token"),
            })

            localStorage.clear();
            
        } catch (err) {
            
            console.log(err.response.data)

            return false;
        }

        return true
    }

    static async getProfile() {
      let getProfile_req = new Requests("service" , "profile");

      let resp = await getProfile_req.get()

      return resp
    }

    static async postProfile(data) {
      let postProfile_req = new Requests("service" , "profile");

      let resp = await postProfile_req.post(data)

      return resp
    }
}

export default Service;