class ModuleList extends HTMLElement {
    moduleData: any;
    moduleStructure: any;
    _moduleName: any;
    root: ShadowRoot;
    constructor() {

        super();
        console.log("constructor called")
        this.root = this.attachShadow({
            mode: 'open'
        });


    }
    get data() {
        return this.moduleData;
    }
    set data(moduleData) {
        console.log("set data =>");
        console.log(moduleData);
        this.moduleData = moduleData;
    }
    get structure() {
        return this.moduleStructure;
    }

    set structure(moduleStructure) {
        console.log("set moduleStructure =>");
        console.log(moduleStructure);
        this.moduleStructure = moduleStructure
    }
    get moduleName() {
        return this._moduleName;
    }

    set moduleName(moduleName) {
        this._moduleName = moduleName
    }


    async render() // render List
    {
        this.createNewModuleTable();
        var head = document.getElementById("table-head");
        head.innerHTML = "";
        var bones = [];
        for (let s in this.moduleStructure) {
            let element = document.createElement("td");
            element.textContent = this.moduleStructure[s]["descr"] !== "" ? this.moduleStructure[s]["descr"] : s;
            bones.push(s);
            head.appendChild(element);
        }
        //Prepare Table Body
        var body = document.getElementById("table-body");
        body.innerHTML = "";
        for (let i in this.data) {
            var tr = document.createElement("tr");
            tr.addEventListener("click", (event) => {
                getSkelData(this.moduleName, this.moduleStructure, this.data[i]);
            })
            for (let boneName of bones) {
                let td = document.createElement("td");
                if (this.data[i][boneName]) { // Check of data is avalible
                    if (this.moduleStructure[boneName]["type"] == "file") {
                        td.textContent = this.data[i][boneName][this.moduleStructure[boneName]["viewString"]];
                    } else {
                        td.textContent = this.data[i][boneName];
                    }
                }
                else
                {
                    td.textContent = "-"
                }

                tr.appendChild(td);

            }
            body.appendChild(tr);

        }

    }
    createNewModuleTable() {
        clearBodyContent();
        let table = document.createElement("table");
        table.className = "styled-table";
        table.id = "module-list";
        let thead = document.createElement("thead");
        let tr = document.createElement("tr");
        tr.id = "table-head";
        thead.appendChild(tr);
        let tbody = document.createElement("tbody");
        tbody.id = "table-body";
        table.appendChild(thead);
        table.appendChild(tbody);
        document.getElementById("body-content").appendChild(table);
    }



}