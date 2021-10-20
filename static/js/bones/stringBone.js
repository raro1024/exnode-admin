class stringBone extends Bone {
    constructor(structrure, data) {
        super(structrure, data);
    }
    renderer(boneName) {
        console.log("Render string bone");
        let containter = super.renderer(boneName);
        return containter;
    }
}
