class numericBone extends Bone {
    constructor(structrure, data) {
        super(structrure, data)
    }
    renderer(boneName) {
        console.log("Render date bone")
        let containter = super.renderer(boneName);
        containter.querySelectorAll("input").forEach((element) => {
            element.type = "numeric";
            element.value = this._value
            if (this.structrure.max) {
                element["max"] = this.structrure.max;
            }
            if (this.structrure.min) {
                element["min"] = this.structrure.min;
            }
        });
        return containter;
    }

}