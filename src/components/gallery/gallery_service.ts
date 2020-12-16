import Api from './api';

export default class GalleryService {

   public findUnsplash( search ): any {
       let request = new Api();

       return request.take('unsplash?page=0&limit=5&search=happy', 'djska');
   }

   public findGiphy( search ): any {
        let request = new Api();

        return request.take('unsplash?page=0&limit=5&search=happy', 'djska');
    }
}