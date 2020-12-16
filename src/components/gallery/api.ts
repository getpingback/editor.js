import axios from 'axios';

export default class Api {

    key: string;
    api: string;
    searchResult: any;

    constructor() {
        this.key = " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBbnNlbG1vIiwiZW1haWwiOiJhbnNlbG1vamFjeW50aG9AZ21haWwuY29tIiwicm9sZSI6InB1Ymxpc2hlciIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYwNjkxNzc0OSwiZXhwIjoxNjA5NTA5NzQ5fQ.UkSOl3rHHnMHCTfihir5dK660lMwe98kEx6ru6xOvzs";
        this.api = 'http://lvh.me:5000/utils/';
    }

    public take(endpoint: string, key: string): any {
        
        const request = axios.get(this.api + endpoint).then( (response) => {
            this.searchResult = response.data;
            console.log('THEN', response); 
        });

        console.log('RESPOSE->', request);
        return this.searchResult;
    }
}