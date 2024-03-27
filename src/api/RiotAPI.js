import Auth from './RiotAuth';

/**
 * Represents the RiotAPI class.
 * @extends Auth
 */
export default class RiotAPI extends Auth {
    /**
     * Creates an instance of RiotAPI.
     * @param {string} username - The username.
     * @param {string} password - The password.
     * @param {string} lang - The language.
     */
    constructor(username, password, lang) {
        super(username, password);
        this.currentLeagueVersion = this.getCurrentLeagueVersion();
        this.lang = lang;
        this.championsURL = `https://ddragon.leagueoflegends.com/cdn/${this.currentLeagueVersion}/data/${this.lang}/champion.json`;
        this.storeURL = `https://br.store.leagueoflegends.com/storefront/v3/featured?language=${this.lang}`;
    }

    /**
     * Gets the current League of Legends version.
     * @returns {Promise<string>} The current League of Legends version.
     */
    async getCurrentLeagueVersion() {
        const response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
        const data = await response.json();
        this.currentLeagueVersion = data[0];
        return this.currentLeagueVersion;
    }

    /**
     * Gets the champions data.
     * @returns {Promise<Object>} The champions data.
     */
    async getChampions() {
        const response = await fetch(this.baseURL);
        const data = await response.json();
        return data.data;
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
                'Authorization': `Bearer ${this.bearerToken}`
            }
        }).then((response) => {
            return response.data;
        }).catch((response) => {
            return console.log(response.data);
        });
    }

    /**
     * Updates the language used for API requests and updates the corresponding URLs.
     * @param {string} lang - The language code to be set.
     */
    updateLang(lang) {
        this.lang = lang;
        this.championsURL = `https://ddragon.leagueoflegends.com/cdn/${this.currentLeagueVersion}/data/${this.lang}/champion.json`;
        this.storeURL = `https://br.store.leagueoflegends.com/storefront/v3/featured?language=${this.lang}`;
    }
}
