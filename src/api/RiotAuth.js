import axios from "axios";
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import https from 'https';

/**
 * Represents an authentication class for Riot API.
 */
export default class Auth {
    /**
     * Creates an instance of the Auth class.
     * @param {string} username - The username for authentication.
     * @param {string} password - The password for authentication.
     * @param {string} lang - The language for authentication.
     */
    constructor(username, password, lang) {
        this.username = username;
        this.password = password;
        this.lang = lang;
        this.authURL = 'https://auth.riotgames.com/api/v1/authorization';
        this.clientData = {
            "acr_values": "urn:riot:bronze",
            "claims": "",
            "client_id": "riot-client",
            "nonce": "oYnVwCSrlS5IHKh7iI16oQ",
            "redirect_uri": "http://localhost/redirect",
            "response_type": "token id_token",
            "scope": "openid link ban lol_region",
        };
        this.userData = {
            "language": this.lang,
            "password": this.password,
            "remember": "true",
            "type": "auth",
            "username": this.username,
        };
        this.cookieJar = new CookieJar();
        this.client = wrapper(axios.create({jar:this.cookieJar}));
        this.client.defaults.headers.common['User-Agent'] = 'RiotClient/58.0.0.4640299.4552318 Ithymarlaven (Windows;10;;Professional, x64)';
        this.client.defaults.headers.common['Accept-Language'] = 'en-US,en;q=0.9';
        this.client.defaults.headers.common['Accept'] = 'application/json, text/plain, */*';
        this.access_token = '';
        this.tokenId = '';
        this.httpsAgent = new https.Agent({ rejectUnauthorized: false });
    }
    
    /**
     * Authenticates the client.
     * @returns {Promise} A promise that resolves when the client is authenticated.
     */
    async authClient(){
        return await this.client.post(this.authURL, this.clientData);        
    }

    /**
     * Authenticates the user.
     * @returns {Promise} A promise that resolves when the user is authenticated.
     */
    async authUser(){
       return await this.client.put(this.authURL, this.userData);
    }

    /**
     * Authenticates the client and user.
     * Updates the credentials based on the provided URI.
     * @returns {Promise} A promise that resolves when the authentication is complete.
     */
    async authenticate(){
        await this.authClient();
        let userAuthentication = await this.authUser();
        //TODO - Remover o console.log após a porcaria do 429 sumir e checar se ta tudo ok
        console.log(userAuthentication.response.parameters.uri)
        let url = data2['response']['parameters']['uri'];
        this.updateCredentials(url);        
    }

    /**
     * Updates the access token and token ID based on the provided URI.
     * @param {URI} uri - The URI containing the access token and token ID.
     */
    updateTokens(uri){
        const token = uri.toString().split("access_token");
        this.access_token = token.toString().split('&')[0].replace('http://localhost/redirect#,=', '');
        this.tokenId = token.toString().split('&')[2].replace('id_token=', '');
        console.log(this.access_token);
        console.log(this.tokenId);
    }

    /**
     * Gets the access token.
     * @returns {string} The access token.
     */
    getAcessToken(){
        return this.access_token;
    }

    /**
     * Gets the token ID.
     * @returns {string} The token ID.
     */
    getTokenId(){
        return this.tokenId;
    }

    /**
     * Gets the bearer token.
     * @returns {string} The bearer token.
     */
    getBearerToken(){
        return 'Bearer ' + this.tokenId;
    }
}
