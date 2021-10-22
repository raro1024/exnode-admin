const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

//load all skelnames form the server and show it in side bar
document.addEventListener("DOMContentLoaded", () => {
    customElements.define('edit-module', EditModule);
    customElements.define('module-list', ModuleList);
})

fetch("/admin/getmodules").then((resp) => {
    resp.json().then(data => {
        console.log(data);

        var sidebar = document.querySelector("#skelname-sidebar");
        for (let i = 0; i < data["modules"].length; i++) {
            let ele = document.createElement("div");
            ele.textContent = data["modules"][i];
            ele.id = data["modules"][i];
            ele.addEventListener("click", (event) => {
                getModuleData(ele.id);
            })
            sidebar.appendChild(ele);
        }
        if (urlParams.has("module")) //call Module
        {

            if (urlParams.has("key")) {
                fetch(`/json/${urlParams.get("module")}/edit/${urlParams.get("key")}`).then(resp=>
                    resp.json().then((moduleStructure)=>{
                        console.log("get by key")
                        console.log( urlParams.get("module"),moduleStructure)
                        createEditForm( urlParams.get("module"),moduleStructure);

                }));
            } else {
                getModuleData(urlParams.get("module"));
            }
        }
    });

});

async function getModuleData(moduleName) {
    console.log("get modules data");
    urlSetter(moduleName)

    let data =await listModuleData(moduleName);
    var body_content = document.getElementById("body-content");
    body_content.innerHTML="";
    var moduleList = document.createElement("module-list") as ModuleList;
    moduleList.moduleName=moduleName;
    moduleList.structure= data["structure"];
    moduleList.data= data["values"];
    moduleList.render();
    body_content.appendChild(moduleList);

    
}
async function listModuleData(moduleName) {
    return fetch(`/json/${moduleName}/list`).then(resp => resp.json())
}
function getSkelData(moduleName,moduleStructure, data) {
    console.log("key=>" + data.key);
    var table = document.getElementById("module-list"); //hidde table
    table.hidden = true;
    //Start to cerate edit form
    urlSetter(moduleName,data.key)
    createEditForm(moduleName,moduleStructure,data);
    
}
function createEditForm(name,structure,data=undefined)
{
    var body_content = document.getElementById("body-content");
    body_content.innerHTML="";
    var editForm = document.createElement("edit-module") as EditModule;
    editForm.data = data;
    editForm.structure = structure;
    editForm.moduleName = name;
    editForm.render();
    editForm.closeForm=()=>{
        clearBodyContent();
        getModuleData(name);
        
    }
    body_content.appendChild(editForm);
}
//Create a new Module Table

function clearBodyContent()
{
    document.getElementById("body-content").innerHTML="";
}
function urlSetter(module,key=undefined)
{
    if (module)
    {
        if(key)
        {
            window.history.pushState(null, "", window.location.origin+window.location.pathname+"?module="+module+"&key="+key);
        }
        else
        {
            window.history.pushState(null, "", window.location.origin+window.location.pathname+"?module="+module);
        }
      
    }
    
}