export default class DDragon {
    constructor() {
        this.baseURL = 'https://ddragon.leagueoflegends.com/cdn/11.16.1/data/pt_BR/champion.json';
        this.currentLeagueVersion = this.getCurrentLeagueVersion();
        this.lang = 'pt_BR';
    }

    async getChampions() {
        const response = await fetch(this.baseURL);
        const data = await response.json();
        return data.data;
    }

    async getCurrentLeagueVersion() {
        const response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
        const data = await response.json();
        this.currentLeagueVersion = data[0];
        return this.currentLeagueVersion;
    }
}