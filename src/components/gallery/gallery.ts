import Service from './service';
import PBModal from './pbmodal';
import Ui from './ui';

export default class Gallery {

    ui: any;
    modal: any;
    service: any;

    constructor() {
        this.ui = new Ui('Image options:', ['Giphy', 'Unsplash', 'My own gallery']);
        this.modal = new PBModal();
        this.service = new Service(" eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBbnNlbG1vIiwiZW1haWwiOiJhbnNlbG1vamFjeW50aG9AZ21haWwuY29tIiwicm9sZSI6InB1Ymxpc2hlciIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYwNjkxNzc0OSwiZXhwIjoxNjA5NTA5NzQ5fQ.UkSOl3rHHnMHCTfihir5dK660lMwe98kEx6ru6xOvzs");
    }

    init (): any {       

        const content = this.ui.container();

        this.find('cat', 1).then( (response) => {
            this.ui.updateResult(response.rows );
        }); 

        this.modal.open(content, true, false);

        this.listenerEngine();       
        
    }

    switchEngine(index): any {
        const action = document.getElementsByClassName('engine-option');
        console.log(action);
    }

    listenerEngine(): void {
        const action = document.getElementsByClassName('engine-option');

        for ( let i=0; i < action.length; i++) {
            action[i].addEventListener("click", this.switchEngine(i));
        }
        
    }

    find(search, page): any {
        return this.service.findUnsplash(search, page);
    }
}