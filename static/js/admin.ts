

//load all skelnames form the server and show it in side bar
document.addEventListener("DOMContentLoaded",()=>{
    customElements.define('edit-module', EditModule);
})

var moduleStructure=[];
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
    })
});
async function getModuleData(moduleName) {
    console.log(moduleName)
    let data = await listModuleData(moduleName);
    console.log("fetched data=>");
    console.log(data);
    //Prepare Table Head
    var head = document.getElementById("table-head");
    head.innerHTML = "";
    var bones = [];
    for (let s in data["structure"]) {
        let element = document.createElement("td");
        element.textContent = data["structure"][s]["descr"] !== "" ? data["structure"][s]["descr"] : s;
        bones.push(s);
        head.appendChild(element);
    }
    moduleStructure=data["structure"];
    //Prepare Table Body
    var body = document.getElementById("table-body");
    body.innerHTML = "";
    for (let i in data["values"]) {
        var tr = document.createElement("tr");
        tr.addEventListener("click", (event) => {
            getSkelData(moduleName,data["values"][i]);
        })
        for (let b of bones) {
            let td = document.createElement("td");
            if(data["structure"][b]["type"]=="file")
            {
                td.textContent = data["values"][i][b][data["structure"][b]["viewString"]];
            }
            else
            {
                td.textContent = data["values"][i][b];
            }
            
            tr.appendChild(td);

        }
        body.appendChild(tr);
        
    }
}
async function listModuleData(moduleName) {
    return fetch(`/json/${moduleName}/list`).then(resp => resp.json())
}
function getSkelData(moduleName,data)
{
    console.log("key=>"+data.key);
    var table = document.getElementById("module-list");//hidde table
    table.hidden=true;
    //Start to cerate edit form
    console.log(data);
    console.log(moduleStructure);
    var body_content =document.getElementById("body-content");
    var editForm = document.createElement("edit-module") as EditModule;
    editForm.data=data;
    editForm.structure=moduleStructure;
    editForm.moduleName=moduleName;
    editForm.render();
    body_content.appendChild(editForm);
    


}