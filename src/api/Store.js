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
        return await this.client.get(this.storeURL, {
            headers: {
                'User-Agent': 'RiotClient/18.0.0 (rso-auth)',
                'Accept': 'application/json',
                'Authorization': this.getBearerToken()
            }
        }).then((response) => {
            this.store = response.data;
            return this.store;
        }).catch((response) => {
            return console.log('Unable to fetch store:'+response.data);
        });
    }
    
    
}