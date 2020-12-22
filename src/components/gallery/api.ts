import { faSearch } from '@fortawesome/pro-light-svg-icons';
import axios from 'axios';

export default class Api {

    key: string;
    base_url: string;

    constructor(key) {
        this.key = key;
        this.base_url = 'http://lvh.me:5000/utils/';
    }
    
    public take(endpoint: string): any {
        
        return new Promise( async (resolve, reject) => {            
            await axios.get( this.base_url + endpoint).then( (response) => {
                resolve(response.data);
            });
        })
    }
}