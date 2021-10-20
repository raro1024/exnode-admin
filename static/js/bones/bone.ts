class Bone
{
    _value: any;
    structrure:any;
    constructor(structrure,data)
    {
        this._value =data;
        this.structrure =structrure;
    }
    renderer(boneName) {

        let outerBone=document.createElement("div");
        
        if(this.structrure.multiple && this._value)
        {
            for(let i =0;i<this._value.length;i++)
            {
                outerBone.appendChild(this.createBone(boneName,i));
            }
        }
        else
        {
            outerBone.appendChild(this.createBone(boneName));
           
        }
        outerBone.hidden=!this.structrure.visible;
        return outerBone;
       
    }
    createBone(boneName,i=0)
    {
        
        let container=document.createElement("div");
        container["class"]="boneContainer";
        container.setAttribute("data-multiple",`${this.structrure.multiple?true:false}`);
        //Create Label
        let inputLabel=document.createElement("label");
        inputLabel["for"]="id";
        inputLabel["id"]=boneName+"-label";
        inputLabel.textContent=this.structrure.descr?this.structrure.descr:boneName;
        container.appendChild(inputLabel);
        //Create input
        let input=document.createElement("input");
        input["id"]=boneName;
        input["name"]=boneName+(this.structrure.multiple?"."+i:"");

        input["placeholder"]=this.structrure.descr;
        if(this.structrure.required)
        {
            input["required"]=true;
        }

        if(this._value)
        {
            if(this.structrure.multiple)
            {
                input["value"]=this._value[i];
            }
            else
            {
                input["value"]=this._value;
            }
            
        }
        container.appendChild(input);
        return container;

    }
}