import axios from "axios";
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import https from 'https';
import { Cookie } from "next/font/google";

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
        this.client;
        this.access_token = '';
        this.tokenId = '';
        this.httpsAgent = new https.Agent({ rejectUnauthorized: false });
    }
    
    /**
     * Authenticates the client.
     * @returns {Promise} A promise that resolves when the client is authenticated.
     */
    async _authClient(){
        let response = await this.client.post(this.authURL, this.clientData).then((response) => {
            console.log("Success")
            return response;
        }).catch((response) => {
            console.log("Error")
        });
        return response;    
    }

    /**
     * Authenticates the user.
     * @returns {Promise} A promise that resolves when the user is authenticated.
     */
    async _authUser(){
        let response = await this.client.put(this.authURL, this.userData).then((response) => {
            console.log("Success")
            return response;
        }).catch((response) => {
            console.log("Error")
        });
        return response
    }

    updateHeaders(){
        this.client.defaults.headers.common['User-Agent'] = 'RiotClient/58.0.0.4640299.4552318 Ithymarlaven (Windows;10;;Professional, x64)';
        this.client.defaults.headers.common['Accept-Language'] = 'en-US,en;q=0.9';
        this.client.defaults.headers.common['Accept'] = 'application/json, text/plain, */*';
    }
    /**
     * Authenticates the client and user.
     * Updates the credentials based on the provided URI.
     * @returns {Promise} A promise that resolves when the authentication is complete.
     */
    async authenticate(){
        const jar = new CookieJar();
        this.client = wrapper(axios.create({ jar }));
        this.updateHeaders();
        let clientAuth = await this._authClient();
        let userAuthentication = await this._authUser();

        let url = userAuthentication['data']['response']['parameters']['uri'];
        console.log(url)
        this._updateTokens(url); 
     

    }

    

    /**
     * Updates the access token and token ID based on the provided URI.
     * @param {URI} uri - The URI containing the access token and token ID.
     */
    _updateTokens(uri){
        const token = uri.toString().match(/access_token=((?:[a-zA-Z]|\d|\.|-|_)*).*id_token=((?:[a-zA-Z]|\d|\.|-|_)*).*expires_in=(\d*)/);
        this.access_token = token[1];
        this.tokenId = token[2]

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
