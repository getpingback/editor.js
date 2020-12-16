import GaleryService from './gallery_service';
import PBModal from './modal';
import Ui from './ui';

export default class GalleryModal {

    ui: any;
    modal: any;
    service: any;

    constructor() {
        this.ui = new Ui('Image options:', ['Giphy', 'Unsplash']);
        this.modal = new PBModal();
        this.service = new GaleryService();
    }

    public open (): any {       
        const content = this.ui.container(this.items());
        this.find();
        this.modal.open(content, true, false);

        this.listenerEngine();        
    }

    search(): any {
        const result = this.ui.updateResult(this.items());
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

    find(): any {
        return this.service.findUnsplash();
    }

    items(): any {
        return {
            "page": 0,
            "limit": 5,
            "rows": [
                {
                    "title": null,
                    "alt": null,
                    "author": "Chewy",
                    "id": "59TTmbSL1Yw",
                    "embed": "https://images.unsplash.com/photo-1601758064955-a4a16da74a86?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=MXwxNjg2Mjl8MXwxfHNlYXJjaHwxfHxoYXBweXxlbnwwfHx8&ixlib=rb-1.2.1&q=80&w=1080",
                    "source": "unsplash",
                    "sourceAddress": "https://unsplash.com/",
                    "image": {
                        "original": "https://images.unsplash.com/photo-1601758064955-a4a16da74a86?crop=entropy&cs=srgb&fm=jpg&ixid=MXwxNjg2Mjl8MXwxfHNlYXJjaHwxfHxoYXBweXxlbnwwfHx8&ixlib=rb-1.2.1&q=85",
                        "small": "https://images.unsplash.com/photo-1601758064955-a4a16da74a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxNjg2Mjl8MXwxfHNlYXJjaHwxfHxoYXBweXxlbnwwfHx8&ixlib=rb-1.2.1&q=80&w=400",
                        "preview": "https://images.unsplash.com/photo-1601758064955-a4a16da74a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxNjg2Mjl8MXwxfHNlYXJjaHwxfHxoYXBweXxlbnwwfHx8&ixlib=rb-1.2.1&q=80&w=200"
                    }
                },
                {
                    "title": "success",
                    "alt": "man wearing red long-sleeved shirt standing beside wall",
                    "author": "bruce mars",
                    "id": "AndE50aaHn4",
                    "embed": "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=MXwxNjg2Mjl8MHwxfHNlYXJjaHwyfHxoYXBweXxlbnwwfHx8&ixlib=rb-1.2.1&q=80&w=1080",
                    "source": "unsplash",
                    "sourceAddress": "https://unsplash.com/",
                    "image": {
                        "original": "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?crop=entropy&cs=srgb&fm=jpg&ixid=MXwxNjg2Mjl8MHwxfHNlYXJjaHwyfHxoYXBweXxlbnwwfHx8&ixlib=rb-1.2.1&q=85",
                        "small": "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxNjg2Mjl8MHwxfHNlYXJjaHwyfHxoYXBweXxlbnwwfHx8&ixlib=rb-1.2.1&q=80&w=400",
                        "preview": "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxNjg2Mjl8MHwxfHNlYXJjaHwyfHxoYXBweXxlbnwwfHx8&ixlib=rb-1.2.1&q=80&w=200"
                    }
                },
                {
                    "title": null,
                    "alt": "woman in green jacket raising her hands",
                    "author": "Clay Banks",
                    "id": "POzx_amnWJw",
                    "embed": "https://images.unsplash.com/photo-1545315003-c5ad6226c272?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=MXwxNjg2Mjl8MHwxfHNlYXJjaHwzfHxoYXBweXxlbnwwfHx8&ixlib=rb-1.2.1&q=80&w=1080",
                    "source": "unsplash",
                    "sourceAddress": "https://unsplash.com/",
                    "image": {
                        "original": "https://images.unsplash.com/photo-1545315003-c5ad6226c272?crop=entropy&cs=srgb&fm=jpg&ixid=MXwxNjg2Mjl8MHwxfHNlYXJjaHwzfHxoYXBweXxlbnwwfHx8&ixlib=rb-1.2.1&q=85",
                        "small": "https://images.unsplash.com/photo-1545315003-c5ad6226c272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxNjg2Mjl8MHwxfHNlYXJjaHwzfHxoYXBweXxlbnwwfHx8&ixlib=rb-1.2.1&q=80&w=400",
                        "preview": "https://images.unsplash.com/photo-1545315003-c5ad6226c272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxNjg2Mjl8MHwxfHNlYXJjaHwzfHxoYXBweXxlbnwwfHx8&ixlib=rb-1.2.1&q=80&w=200"
                    }
                },
                {
                    "title": "Happy Face",
                    "alt": "woman holding balloons",
                    "author": "Lidya Nada",
                    "id": "_0aKQa9gr4s",
                    "embed": "https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=MXwxNjg2Mjl8MHwxfHNlYXJjaHw0fHxoYXBweXxlbnwwfHx8&ixlib=rb-1.2.1&q=80&w=1080",
                    "source": "unsplash",
                    "sourceAddress": "https://unsplash.com/",
                    "image": {
                        "original": "https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?crop=entropy&cs=srgb&fm=jpg&ixid=MXwxNjg2Mjl8MHwxfHNlYXJjaHw0fHxoYXBweXxlbnwwfHx8&ixlib=rb-1.2.1&q=85",
                        "small": "https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxNjg2Mjl8MHwxfHNlYXJjaHw0fHxoYXBweXxlbnwwfHx8&ixlib=rb-1.2.1&q=80&w=400",
                        "preview": "https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxNjg2Mjl8MHwxfHNlYXJjaHw0fHxoYXBweXxlbnwwfHx8&ixlib=rb-1.2.1&q=80&w=200"
                    }
                },
                {
                    "title": "Yelow",
                    "alt": "woman holding brown umbrella",
                    "author": "Edu Lauton",
                    "id": "TyQ-0lPp6e4",
                    "embed": "https://images.unsplash.com/photo-1457131760772-7017c6180f05?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=MXwxNjg2Mjl8MHwxfHNlYXJjaHw1fHxoYXBweXxlbnwwfHx8&ixlib=rb-1.2.1&q=80&w=1080",
                    "source": "unsplash",
                    "sourceAddress": "https://unsplash.com/",
                    "image": {
                        "original": "https://images.unsplash.com/photo-1457131760772-7017c6180f05?crop=entropy&cs=srgb&fm=jpg&ixid=MXwxNjg2Mjl8MHwxfHNlYXJjaHw1fHxoYXBweXxlbnwwfHx8&ixlib=rb-1.2.1&q=85",
                        "small": "https://images.unsplash.com/photo-1457131760772-7017c6180f05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxNjg2Mjl8MHwxfHNlYXJjaHw1fHxoYXBweXxlbnwwfHx8&ixlib=rb-1.2.1&q=80&w=400",
                        "preview": "https://images.unsplash.com/photo-1457131760772-7017c6180f05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxNjg2Mjl8MHwxfHNlYXJjaHw1fHxoYXBweXxlbnwwfHx8&ixlib=rb-1.2.1&q=80&w=200"
                    }
                }
            ],
            "total": 7498,
            "pages": 1500
        };
    }
}