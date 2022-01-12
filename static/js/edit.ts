class EditModule extends HTMLElement {
    moduleData: any;
    moduleStructure: any;
    _moduleName: any;
    root: ShadowRoot;
    _key: any;
    constructor() {

        super();
        this._key;
        this.root = this.attachShadow({
            mode: 'open'
        });
        const sendBtn = document.createElement("button");
        sendBtn.textContent = "senden";
        sendBtn.addEventListener("click", () => {
            this.sendData()
        });
        this.root.appendChild(sendBtn);

    }
    get key()
    {
        return this._key;
    }
    set key(key)
    {
        this._key=key;
    }
    get data() {
        return this.moduleData;
    }
    set data(moduleData) {
        if(!moduleData)return; //Leave Function instantly 
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


    render() // render all Bones
    {
        for (const boneName in this.moduleStructure) {
            const boneStructure = this.moduleStructure[boneName];
            const boneData = this.moduleData ? this.moduleData[boneName] : this.moduleStructure[boneName]._value;
            var boneForm;
            switch (boneStructure.type) {
                case "string":
                    boneForm = new stringBone(boneStructure, boneData);
                    break;
                case "date":
                    boneForm = new dateBone(boneStructure, boneData);

                    break;
                case "numeric":
                    boneForm = new numericBone(boneStructure, boneData);
                    break;
                case "file":
                    boneForm = new fileBone(boneStructure, boneData);
                    break;

            }
            this.root.appendChild(boneForm.renderer(boneName));

        }

    }
    sendData() {
        console.log("send data");
        const data = {}
        this.root.querySelectorAll("input").forEach((inputElement) => {
            console.log(inputElement);
            data[inputElement.name] = inputElement.value;

        });
        fetch(`/json/${this.moduleName}/edit/${this.key}`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json"
            }
        }).then(res => {
            this.closeForm();
        });
    }
    closeForm() {

    }
}