class dateBone extends Bone
{
    constructor(structrure,data)
    {
        super(structrure,data)
    }
    renderer(boneName) {
        console.log("Render date bone")
        let containter = super.renderer(boneName);
        containter.querySelectorAll("input").forEach((element)=>
        {
            console.log("Elel");
            console.log(element);
            element.type="date";
            element.value=this.prepareData(this._value)
        })
        return containter;
    }
    prepareData(_val)
    {
        _val=this.convertData(_val);

        switch(this.getType()){
            case "date":
                return _val.toISOString().split('T')[0];
            case "time":
                return _val
            case "datetime-local":
                return  _val.toISOString().split(".")[0];    
        }
        

    }
    getType() {
        if (this.structrure.time) {
            if (this.structrure.date) {
                return "datetime-local";
            } else {
                return "time";
            }
        }
        //Fallback if nothing is returned ??
        return "date"
    }
    convertData(_val)
    {
        if(!this.structrure.date && this.structrure.time)
        {
            return _val; // ??
        }
        return new Date(_val);   
    }
}