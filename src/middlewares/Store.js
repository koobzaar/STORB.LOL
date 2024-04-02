import axios from "axios";
import tempCatalog from '../data/catalog.json'

/*This functions needs to be changed based on the back-end. 
This.catalog should be a function that returns the catalog from the back-end. Based on the current needs from the front-end
The backend should return:
id: number, name: string, imageURL: string, price: number, tier: 
curerntly the backend is returning:
id name price 
still needs:
imageURL, tier


The backend should return the catalog as a JSON object.

the problem is that the chromas is inside the champion_skin type, so it needs to be separated in the back-end, since the front-end is already prepared to receive it separated.
The category of return should be 'CHAMPION_SKIN_CHROMA'

*/

export default class Store {
    constructor(){
        this.catalog = tempCatalog;
        this.categories = this.getAvailablesCategories();
    }

    async setCatalog(){
        // This function expects a JSON object with the catalog - it is a API Request. It's the only async function because it needs to fetch the data from the back-end.
    }
    getFullCatalog() {
        return this.catalog
    }

    getCatalogByType(type) {
        if (!this.categories.includes(type)) {
            throw new Error(`Invalid type: ${type}. Must be one of ${this.categories.join(', ')}`);
        }
    
        return this.catalog.filter(item => item.type === type);
    }
    getAvailablesCategories() {
        const types = this.catalog.map(item => item.type);
        return [...new Set(types)];
    }
}
