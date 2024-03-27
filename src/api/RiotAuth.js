import axios from "axios";
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

export default class Auth {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.authURL = 'https://auth.riotgames.com/api/v1/authorization';
        this.clientData = {
            'client_id': 'lol',
            'nonce': 'oYnVwCSrlS5IHKh7iI17oQ',
            'redirect_uri': 'http://localhost/redirect',
            'response_type': 'token id_token',
            'scope': 'openid link ban lol_region',
            'claims': ''
        };
        this.userData = {
            'type': 'auth',
            'username': this.username,
            'password': this.password
        };
        this.CookieJar = new CookieJar();
        this.client = wrapper(axios.create({ jar: this.CookieJar }));
        this.token = '';
        this.access_token = '';
        this.bearerToken = '';
        
    }
    async authClient(){
        await this.client.post(this.authURL, this.clientData, { jar: this.CookieJar, withCredentials: true });
    }

    async authUser(){
        await this.client.put(this.authURL, this.userData, { jar: this.CookieJar, withCredentials: true }).then((response) => {
            this.token = response.response.parameters.uri.split("access_token");
            this.access_token = token.toString().split('&')[0].replace('http://localhost/redirect#,=', '');
            this.bearerToken = token.toString().split('&')[2].replace('id_token=', '');
        });
    }
    
    async authenticate(){
        await this.authClient();
        await this.authUser();
    }

    getAcessToken(){
        return this.access_token;
    }

    getBearerToken(){
        return this.bearerToken;
    }
}

module.exports = { 
    Auth 
};