import Service from './service';
import Modal from 'modal-vanilla';

export default class PBModal {

    public open(content: unknown, header: boolean = true, footer: boolean = true,  ): any {
        let gallery = document.createElement('div');

        let openModal = new Modal({
          el: document.getElementById('modal'),
          content: content,
          header: header,
          footer: footer
        }).show();
    }
}