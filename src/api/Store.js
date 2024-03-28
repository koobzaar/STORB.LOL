import axios from "axios";
import RiotAPI from "./RiotAPI";

export default class Store extends RiotAPI {
    constructor(username, password, lang) {
        super(username, password, lang);
        this.store = ''
    }
    /**
     * Gets the store data.
     * @returns {Promise<Object>} The store data.
     */
    async getStore() {
        return await axios.get(`https://br.store.leagueoflegends.com/storefront/v3/featured?language=pt_BR`, {
            headers: {
                'User-Agent': 'RiotClient/18.0.0 (rso-auth)',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.tokenId}`
            }
        }).then((response) => {
            this.store = response;
            return this.store;
        }).catch((response) => {
            return console.log('Unable to fetch store:'+response);
        });
    }
    
    
}