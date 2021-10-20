class EditModule extends HTMLElement {
    moduleData;
    moduleStructure;
    root;
    constructor() {
        super();
        console.log("constructor called");
        this.root = this.attachShadow({
            mode: 'open'
        });
        const sendBtn = document.createElement("button");
        sendBtn.textContent = "senden";
        sendBtn.addEventListener("click", () => {
            this.sendData();
        });
        this.root.appendChild(sendBtn);
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
        this.moduleStructure = moduleStructure;
    }
    get moduleName() {
        return this._moduleName;
    }
    set moduleName(moduleName) {
        this._moduleName = moduleName;
    }
    render() {
        for (const boneName in this.moduleStructure) {
            const boneStructure = this.moduleStructure[boneName];
            const boneData = this.moduleData[boneName];
            var boneForm;
            switch (boneStructure.type) {
                case "string":
                    boneForm = new stringBone(boneStructure, boneData);
                    this.root.appendChild(boneForm.renderer(boneName));
                    break;
                case "date":
                    boneForm = new dateBone(boneStructure, boneData);
                    this.root.appendChild(boneForm.renderer(boneName));
                    break;
            }
        }
    }
    sendData() {
        console.log("send data");
        const data = {};
        this.root.querySelectorAll("input").forEach((inputElement) => {
            console.log(inputElement);
            data[inputElement.name] = inputElement.value;
        });
        fetch(`/json/${this.moduleName}/edit/${this.data.key}`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json"
            }
        }).then(res => {
            console.log(res);
        });
    }
}
