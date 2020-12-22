export default class Ui {

    title_menu: string;
    options_menu: any;

    constructor(title_menu, options_menu) {
        this.title_menu = title_menu;
        this.options_menu = options_menu;
    }

    container() {
        const container = document.createElement("div");
        container.classList.add("container");

        return container;
    }

    sidebar() {
        const sidebar = document.createElement("div");   
        sidebar.classList.add("sidebar");

        return sidebar;
    }

    menu() {
        const sidebar_menu = document.createElement("div");
        const title = document.createElement("h2");
        const menu_list = document.createElement("ul");

        title.append(document.createTextNode(this.title_menu));

        menu_list.appendChild(title);
        
        sidebar_menu.classList.add("sidebar__menu");

        this.options_menu.forEach(function(name){
            
            let action = document.createElement("a");
            let item = document.createElement("li");
            
            action.appendChild(document.createTextNode(name));
            action.classList.add('engine-option');
            action.setAttribute('data-engine', name.toLowerCase());

            item.appendChild(action);
            
            menu_list.appendChild(item);
        
        });

        sidebar_menu.appendChild(menu_list);

        return sidebar_menu;
    }
    
    menuItens() {
        const sidebar_menu = document.createElement("div");
        const title = document.createElement("h2");
        const menu_list = document.createElement("ul");

        title.append(document.createTextNode(this.title_menu));

        menu_list.appendChild(title);
        
        sidebar_menu.classList.add("sidebar__menu");

        this.options_menu.forEach(function(name){
            
            let action = document.createElement("a");
            let item = document.createElement("li");
            
            action.appendChild(document.createTextNode(name));
            action.classList.add('engine-option');
            action.setAttribute('data-engine', name.toLowerCase());

            item.appendChild(action);
            
            menu_list.appendChild(item);
        
        });

        sidebar_menu.appendChild(menu_list);

        return sidebar_menu;
    }

    searchBox() {
        const search = document.createElement("div");
        search.classList.add("search-container");

        return search;
    }

    searchField() {
        const search_field = document.createElement("div");
        const search_input = document.createElement("input");

        search_input.setAttribute('type', 'text');
        search_input.setAttribute('placeholder', 'Search on');
        search_field.classList.add("search-container__field");
        search_field.appendChild(search_input);
        
        return search_field;
    }

    searchResult( items ) {
        const search_result = document.createElement("div");
        search_result.classList.add('search-container__result');

        const result_list = document.createElement('ul');

        items.forEach(function(item){
            result_list.appendChild(this.searchResultItem(item));
        });
        
        search_result.appendChild(result_list);

        return search_result;
    }
    
    searchResultItem( obj ) {
        const item = document.createElement("li");
        const image = document.createElement("img");

        image.setAttribute("src", obj.image.small);
        item.appendChild(image);
        
        return item;
    }

    uploadArea() {
        
    }

    uploadButton() {
        const upload_area = document.createElement("div");
        const upload_button = document.createElement("input");
        upload_button.setAttribute('type', 'file');
        upload_area.classList.add("sidebar__upload_button");
        upload_area.appendChild(upload_button);

        return upload_area;
    }
}