export default class Ui {

    title_menu: string;
    options_menu: any;

    constructor(title_menu, options_menu) {
        this.title_menu = title_menu;
        this.options_menu = options_menu;
    }

    container(items): any {
        
        const container = document.createElement("div");
        container.classList.add("container");

        container.appendChild(this.sidebar());
        container.appendChild(this.setSearchResult(items));

        return container;
    }

    sidebar(): any {
        
        const sidebar = document.createElement("div");   
        sidebar.classList.add("sidebar");

        sidebar.appendChild(this.sidebar_menu());
        sidebar.appendChild(this.sidebar_upload());

        return sidebar;
    }

    sidebar_menu(): any {

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

    search(): any {
        const search = document.createElement("div");

        search.classList.add("search-container");
        search.appendChild(this.searchField());

        return search;
    }
    
    searchField(): any {
        const search_field = document.createElement("div");
        const search_input = document.createElement("input");

        search_input.setAttribute('type', 'text');
        search_input.setAttribute('placeholder', 'Search on');
        search_field.classList.add("search-container__field");
        search_field.appendChild(search_input);
        
        return search_field;

    }

    resultList(items): any {

        const search_result = document.createElement("div");
        search_result.classList.add('search-container__result');

        const result_list = document.createElement('ul');

        items.forEach(function(item){
            const result_item = document.createElement("li");
            const result_image = document.createElement("img");

            result_image.setAttribute("src", item.image.small);

            result_item.appendChild(result_image);
            result_list.appendChild(result_item);
        });
        
        search_result.appendChild(result_list);

        return search_result;
    }

    updateResult(items): any {
        const container = document.createElement("div");
        const search = document.getElementsByClassName("search-container__result")[0];
   
        search.remove();

        container.appendChild(this.setSearchResult(items));
        
        return container;
    }

    sidebar_upload(): any {
        const upload_area = document.createElement("div");
        const upload_button = document.createElement("input");
        upload_button.setAttribute('type', 'file');
        upload_area.classList.add("sidebar__upload_button");
        upload_area.appendChild(upload_button);

        return upload_area;
    }

    setSearchResult(items): any {
        const search = this.search();
        console.log('set ******', items);
        search.appendChild(this.resultList(items));

        return search;
    }

    

    getAllFuncs(toCheck) {
        var props = [];
        var obj = toCheck;
        do {
            props = props.concat(Object.getOwnPropertyNames(obj));
        } while (obj = Object.getPrototypeOf(obj));
    
        return props.sort().filter(function(e, i, arr) { 
           if (e!=arr[i+1] && typeof toCheck[e] == 'function') return true;
        });
    }

    setEngine(): any {

    }
}