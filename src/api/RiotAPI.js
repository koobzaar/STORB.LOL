import Auth from './RiotAuth';

export default class RiotAPI extends Auth {
    constructor(username, password) {
        super(username, password);
        this.currentLeagueVersion = this.getCurrentLeagueVersion();
        this.lang = 'pt_BR';
        this.storeURL = `https://br.store.leagueoflegends.com/storefront/v3/featured?language=${this.lang}`;
        this.championsURL = `https://ddragon.leagueoflegends.com/cdn/${this.currentLeagueVersion}/data/${this.lang}/champion.json`;
    }

    async getCurrentLeagueVersion() {
        const response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
        const data = await response.json();
        this.currentLeagueVersion = data[0];
        return this.currentLeagueVersion;
    }

    async getChampions() {
        const response = await fetch(this.baseURL);
        const data = await response.json();
        return data.data;
    }

    async getLeagueStore(){
        this.client.get(this.storeURL, {
            headers: {
                'User-Agent': 'RiotClient/18.0.0 (rso-auth)',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.getBearerToken()}`
            }
        }).then((response) => {
            return response.data;
        }).catch((response) => {
            throw new Error(response.data);
        });
    }
    
}

module.exports = {
    RiotAPI
}