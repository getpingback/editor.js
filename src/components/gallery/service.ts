import Api from './api';

export default class Service {

    api: any;

    constructor(key) {
        this.api = new Api(key);
    }

    findUnsplash( search = 'random', page = 1, limit = 20 ): any {
        return this.api.take(`unsplash?page=${page}&limit=${limit}&search=${search}`);
   }

    findGiphy( search = 'random', page = 1, limit = 20 ): any {
        return this.api.take(`gifs?page=${page}&limit=${limit}&search=${search}`);
    }
}